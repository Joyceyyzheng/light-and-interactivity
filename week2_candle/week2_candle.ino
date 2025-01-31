#include <Adafruit_NeoPixel.h>

//steps - fade
//amplitude and brightness - 
//color 

//分开控制每个LED 看单独的behavior color or flickering, 分开看每个属性怎样最好 a range of property for each 属性
//timing & faded curve 

const int neoPixelPin = 5;  // control pin
const int pixelCount = 7;   // number of pixels
int change = 10;             // increment to change hue by

// set up strip:
Adafruit_NeoPixel strip = Adafruit_NeoPixel(pixelCount, neoPixelPin, NEO_GRBW + NEO_KHZ800);

int h = 3800;  // hue hue<2000, reder
int s = 250;  // saturation
int minB = 80;  // intensity - min
int maxB = 180; // intensity - max
int fadeStep = 1;
int hRange = 1800; //2000-5600

//defs for looping each one
// unsigned long interval = 2000;  
// unsigned long previousMillis = 0;  
// int currentPixel = 0;  

//blue fire
int bluePixel = 3;
int blueBrightness = 0;
int blueChange = 1;

//sine curve
unsigned long interval = 50;  
unsigned long previousMillis = 0; 
float brightnessPhase = 0;  

void setup() {
  strip.begin();  // initialize pixel strip
  strip.clear();  // turn all LEDs off
  strip.show();   // update strip

  randomSeed(analogRead(0));  //learned this from chat,randomize initial number

  
}

void loop() {

  //brightness
   unsigned long currentMillis = millis();

  
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

  
    brightnessPhase += 0.5;  // brightness changing speed ⚠️
    if (brightnessPhase >= 2 * PI) {
      brightnessPhase -= 2 * PI; 
    }

    float brightnessSin = sin(brightnessPhase);  
    Serial.print(brightnessSin);
    Serial.println();
    int brightness = map(brightnessSin * 1000, -1000, 1000, minB, maxB); 



  //color

   for (int pixel = 0; pixel < pixelCount; pixel++) {
   
    int hue = h + random(-hRange / 2, hRange / 4);  // randomize, 2000-4250
   // int brightness = random(minB, maxB);    //randomize
    
    // if (pixel >= 7) {  //control each light 
    //   brightness = random(minB + 80, maxB); //cannot just random ig
    // }

    long color = strip.ColorHSV(2200, s, brightness);
    strip.setPixelColor(pixel, color);
  }

  }
 
  strip.show();
  
  delay(100); 


}