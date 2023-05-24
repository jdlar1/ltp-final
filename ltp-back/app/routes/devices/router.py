import time
from typing import cast

from fastapi import APIRouter
from digi.xbee.devices import RemoteXBeeDevice

from app.xbee import xbee


router = APIRouter()


@router.get("/me")
def get_info():
    
    role = xbee.get_role()
    hardware_version = xbee.get_hardware_version()
    
    if role is not None:
        role = role.name
    
    if hardware_version is not None:
        hardware_version = hardware_version.name  
    
    return {
        "node_id":  xbee.get_node_id(),
        "role": role,
        "hardware_version": hardware_version,
    }
    
@router.get("/network")
def get_network():
    
    xnet = xbee.get_network()
    
    xnet.start_discovery_process()
    
    while xnet.is_discovery_running():
        time.sleep(0.2)
        
    nodes = cast(list[RemoteXBeeDevice], xnet.get_devices())
    
    response = [
        {
            "address": str(n.get_64bit_addr()),
            "role": n.get_role().name if n.get_role() is not None else None, # type: ignore
            "hardware_version": n.get_hardware_version().name if n.get_hardware_version() is not None else None, # type: ignore
        } for n in nodes
    ]
    
    return response
