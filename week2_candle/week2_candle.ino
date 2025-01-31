#include <Adafruit_NeoPixel.h>

const int neoPixelPin = 5;  // control pin
const int pixelCount = 7;   // number of pixels
int change = 10;             // increment to change hue by

// set up strip:
Adafruit_NeoPixel strip = Adafruit_NeoPixel(pixelCount, neoPixelPin, NEO_GRBW + NEO_KHZ800);

int h = 1000;  // hue
int s = 155;  // saturation
int i = 105;  // intensity

//defs for looping each one
unsigned long interval = 2000;  
unsigned long previousMillis = 0;  
int currentPixel = 0;  

void setup() {
  strip.begin();  // initialize pixel strip
  strip.clear();  // turn all LEDs off
  strip.show();   // update strip
}

void loop() {

   unsigned long currentMillis = millis(); // current time

    if (currentMillis - previousMillis >= interval) {
      previousMillis = currentMillis;
  // create a single color from hue, sat, intensity:
  long color = strip.ColorHSV(h, s, i);
    strip.setPixelColor(currentPixel, color);
    strip.show();
    currentPixel++;

     if (currentPixel >= pixelCount) {
      currentPixel = 0;  
      strip.clear();     
      strip.show();
    }
  }

  // loop over all the pixels:
  // for (int pixel = 0; pixel < pixelCount; pixel++) {
  //   strip.setPixelColor(pixel, color);
  //   strip.show();  // update the strip
  //   delay(100);
  // }

  // increment hue to fade from red (0) to reddish orange (15) and back:
  h = h + change;
  if (h < 0 || h > 4400) {
    change = -change;
  }
}