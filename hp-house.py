import network     #import des fonction lier au wifi
import urequests   #import des fonction lier au requetes http
import utime       #import des fonction lier au temps
import ujson       #import des fonction lier aà la convertion en Json
from machine import Pin, PWM

wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

ssid = 'IIM_Private'
password = 'Creatvive_Lab_2023'
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "http://10.2.165.38:3000/"

ledpin = [22, 21, 20]
leds = []

gryf = [255, 0, 0]
slyt = [0, 255, 0]
rave = [0, 0, 255]
huff = [255, 255, 0]
nd = [255, 255, 255]
for e in ledpin :
    leds.append(PWM(Pin(e, mode=Pin.OUT)))

for e in leds :
    e.freq(1_000)
    e.duty_u16(0)
    
def turnoff():
    for e in leds:
        e.duty_u16(0)

def setcolor(c) :
    div = 65534/255
    div = int(div)
    i = 0
    for e in leds :
        e.duty_u16(c[i]*div)
        i+=1

while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

while(True):
    try:
        print("GET")
        r = urequests.get(url) # lance une requete sur l'url
        print(r.json()) # traite sa reponse en Json
        house = r.json()
        if house == "Gryffindor" :
            setcolor(gryf)
        elif house == "Slytherin" :
            setcolor(slyt)
        elif house == "Ravenclaw" :
            setcolor(rave)
        elif house == "Hufflepuff" :
            setcolor(huff)
        else :
            for i in range(10) :
                setcolor(nd)
                utime.sleep(0.1)
                turnoff()
                utime.sleep(0.1)
        r.close() # ferme la demande
        utime.sleep(1)  
    except Exception as e:
        print(e)
