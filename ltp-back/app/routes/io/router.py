import asyncio
import datetime
import time
import json
from typing import cast
from pathlib import Path

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from digi.xbee.devices import RemoteXBeeDevice, XBee64BitAddress
from digi.xbee.io import IOLine, IOMode, IOValue


from app.xbee import xbee


XBEE_CONFIG_FILE = Path(__file__).parent.parent.parent / "xbee_config.json"

router = APIRouter()
xbee_config = json.loads(XBEE_CONFIG_FILE.read_text())


@router.get("/configure")
def configure():
    for device in xbee_config["devices"]:
        remote = RemoteXBeeDevice(
            xbee, XBee64BitAddress.from_hex_string(device["address"]))
        for io_config in device["io"]:
            remote.set_io_configuration(
                getattr(IOLine, io_config["pin"]),
                getattr(IOMode, io_config["mode"]),
            )

    return xbee_config


@router.websocket("/live/{address}")
async def live(address: str, websocket: WebSocket):
    adresses = [device["address"] for device in xbee_config["devices"]]

    if address not in adresses:
        await websocket.close()
        return

    remote = RemoteXBeeDevice(xbee, XBee64BitAddress.from_hex_string(address))

    await websocket.accept()

    async def read_from_socket(websocket: WebSocket) -> None:
        async for data in websocket.iter_json():
            apply_state(remote, data)

    asyncio.create_task(read_from_socket(websocket))

    while True:
        states = read_states(remote, config=xbee_config)
        await websocket.send_json(states)
        await asyncio.sleep(2)


def read_states(remote: RemoteXBeeDevice, *,  config: dict) -> dict:
    states = {}
    date = datetime.datetime.now()

    address = remote.get_64bit_addr()
    device_config = list(filter(lambda device: device["address"] == str(
        remote.get_64bit_addr()), config["devices"]))[0]

    for io_line in device_config["io"]:
        if io_line["mode"] == "ADC":
            value = remote.get_adc_value(
                getattr(IOLine, io_line["pin"])
            )

            states[io_line["pin"]] = {
                "value": eval(io_line["expression"], {"x": value}),
                "mode": io_line["mode"],
                "date": date.isoformat(),
            }

        if io_line["mode"] == "DIGITAL_IN":
            value = remote.get_dio_value(
                getattr(IOLine, io_line["pin"])
            )

            states[io_line["pin"]] = {
                "value": False if value == IOValue.LOW else True,
                "mode": io_line["mode"],
                "date": date.isoformat(),
            }
        
        if io_line["mode"] in ["DIGITAL_OUT_LOW", "DIGITAL_OUT_HIGH"]:
            value = remote.get_dio_value(
                getattr(IOLine, io_line["pin"])
            )

            print(f"Reading {io_line['pin']} as {value}")

            states[io_line["pin"]] = {
                "value": False if value == IOValue.LOW else True,
                "mode": io_line["mode"],
                "date": date.isoformat(),
            }

    return states


def apply_state(remote: RemoteXBeeDevice, state: dict):

    print(state)

    pin = getattr(IOLine, state["pin"])
    state_value = IOValue.LOW if not state["value"] else IOValue.HIGH

    print(f"Setting {pin} to {state_value}")
    
    remote.set_dio_value(pin, state_value)
