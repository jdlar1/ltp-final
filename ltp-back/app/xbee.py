from fastapi.logger import logger
from digi.xbee.devices import XBeeDevice

from .settings import settings

xbee = XBeeDevice(settings.xbee_usb_port, settings.xbee_baudrate)
logger.info(f"XBee device: {xbee}")