from pydantic import BaseSettings

class Settings(BaseSettings):
    xbee_usb_port: str
    xbee_baudrate: int
    
    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'


settings = Settings() # type: ignore