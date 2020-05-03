#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "";
const char* password = "";
const int goodLed = 4;
const int badLed = 2;
void setup () {
    pinMode(goodLed, OUTPUT);
    pinMode(badLed, OUTPUT);

    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print("Connecting..");
    }
}
 
void loop() {
    if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://europe-west1-thomasmaclean.cloudfunctions.net/getSetBuildFail"); 
    int httpCode = http.GET();                                                               
    if (httpCode > 0) { 
        String payload = http.getString(); 
    if(payload.indexOf("false") > 0) {
        Serial.println("all is ok"); 
            digitalWrite(goodLed, HIGH);
                digitalWrite(badLed, LOW);
        }
    if(payload.indexOf("true") > 0) {
        Serial.println("BUILD IS FAILING!!!!!!"); 
            digitalWrite(badLed, HIGH);
                digitalWrite(goodLed, LOW);
        }
    }
    http.end();
    }
    delay(10000);    
}