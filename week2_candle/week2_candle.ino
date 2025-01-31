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

int h = 2000;  // hue
int s = 255;  // saturation
int minB = 50;  // intensity - min
int maxB = 220; // intensity - max
int fadeStep = 1;
int hRange = 2000;

//defs for looping each one
unsigned long interval = 2000;  
unsigned long previousMillis = 0;  
int currentPixel = 0;  

//blue fire
int bluePixel = 3;
int blueBrightness = 0;
int blueChange = 1;

void setup() {
  strip.begin();  // initialize pixel strip
  strip.clear();  // turn all LEDs off
  strip.show();   // update strip

   randomSeed(analogRead(0));  //learned this from chat,randomize initial number
}

void loop() {

   for (int pixel = 0; pixel < pixelCount; pixel++) {
   
    int hue = h + random(-hRange / 2, hRange / 2);  // randomize
    int brightness = random(minB, maxB);    //randomize

    
    if (pixel >= 5) {  
      brightness = random(minB + 80, maxB);
    }

   
    long color = strip.ColorHSV(hue, 255, brightness);
    strip.setPixelColor(pixel, color);
  }

  // //main part - orange, red
  // for (int pixel = 0; pixel < pixelCount; pixel++) {
  //   if (pixel != bluePixel) {  
  //     long color = strip.ColorHSV(h, s, i);
  //     strip.setPixelColor(pixel, color);
  //   }
  // }

  // //blue part 
  // blueBrightness += blueChange; 
  // if (blueBrightness > 200 || blueBrightness < 50) {
  //   blueChange = -blueChange;  
  // }
  // strip.setPixelColor(bluePixel, h, 0, 100); 

  strip.show();

  //  i -= fadeStep;
  // if (i <= 100 || i >= 180) {
  //   fadeStep = -fadeStep;  
  // }

  
  delay(80); 


}