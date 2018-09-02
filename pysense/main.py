# main.py -- put your code here!
from sensor import Sensor
import time
import _thread
devAdd = 'devAdd'
netKey = "netKey"
appKey = "appKey"

s = Sensor(devAdd, netKey, appKey)

def send_message(s):
    while True:
        s.send(s.params())
        time.sleep(60)


_thread.start_new_thread(send_message,[s])
