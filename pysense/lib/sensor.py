import pycom
import json
from network import LoRa
from pysense import Pysense
from LTR329ALS01 import LTR329ALS01
from SI7006A20 import SI7006A20
import socket
import ubinascii
import binascii
import struct


class Sensor:
    def __init__(self,dev_addr, nwk_swkey, app_swkey):
        #Initialise pyscan
        py = Pysense()
        self.light_sensor = LTR329ALS01(py)
        self.air_sensor = SI7006A20(py)

        # Initialise LoRa in LORAWAN mode.
        self.lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.EU868)

        # create an ABP authentication params
        dev_addr = struct.unpack(">l", binascii.unhexlify(dev_addr))[0]
        nwk_swkey = ubinascii.unhexlify(nwk_swkey)
        app_swkey = ubinascii.unhexlify(app_swkey)

        # join a network using ABP (Activation By Personalization)
        self.lora.join(activation=LoRa.ABP, auth=(dev_addr, nwk_swkey, app_swkey))

        # create a LoRa socket
        self.s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)

        # set the LoRaWAN data rate
        self.s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)

        # make the socket blocking
        # (waits for data to be sent and for the 2 receive windows to expire)
        self.s.setblocking(True)

    #get light value 
    def light(self):
        return self.light_sensor.light()
  
    #get temperatur value
    def temperature(self):
        return self.air_sensor.temperature()
    #get humidity value
    def humidity(self):
        return self.air_sensor.humidity()
    
    #get sensor data reading
    def params(self):
        data = {
                "light": self.light(),
                "temperature": self.temperature(),
                "humidity": self.humidity()
               }
        print(data)
        return json.dumps(data)

    #send data to loragateway
    def send(self, data):
        # send some data
        self.s.send(data)

        # make the socket non-blocking
        # (because if there's no data received it will block forever...)
        self.s.setblocking(False)

        # get any data received (if any...)
        data = self.s.recv(64)
        print(data)


