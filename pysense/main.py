# main.py -- put your code here!
from sensor import Sensor

devAdd = ''
netKey = ""
appKey = ""

s = Sensor(devAdd, netKey, appKey)
s.send(s.params())
