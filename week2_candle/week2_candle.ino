#include <Adafruit_NeoPixel.h>


const int neoPixelPin = 5;  // control pin
const int pixelCount = 7;   // number of pixels
int change = 10;             // increment to change hue by

// set up strip:
Adafruit_NeoPixel strip = Adafruit_NeoPixel(pixelCount, neoPixelPin, NEO_GRBW + NEO_KHZ800);

int h = 3800;  // hue hue<2000, reder
int s = 250;  // saturation
int minB = 60;  // intensity - min
int maxB = 210; // intensity - max
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

float brightnessPhase[pixelCount];  
float phaseIncrement[pixelCount];  

void setup() {
  strip.begin();  // initialize pixel strip
  strip.clear();  // turn all LEDs off
  strip.show();   // update strip

  randomSeed(analogRead(0));  //learned this from chat,randomize initial number

  for (int pixel = 0; pixel < pixelCount; pixel++) {
    brightnessPhase[pixel] = random(0, 2 * PI * 100) / 100.0;   
    phaseIncrement[pixel] = random(20,50) / 100.0;  //5-15 very slow, higher the better. 20-50 seems ideal combining 60 - 220.
  }
}

void loop() {

  //brightness
   unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

  for (int pixel = 0; pixel < pixelCount; pixel++) {
  
   brightnessPhase[pixel] += phaseIncrement[pixel];
      if (brightnessPhase[pixel] >= 2 * PI) {
        brightnessPhase[pixel] -= 2 * PI; 
      }

      // Serial.print("Pixel ");
      // Serial.print(pixel);
      // Serial.print(": brightnessPhase = ");
      // Serial.println(brightnessPhase[pixel], 4);

    float brightnessSin = sin(brightnessPhase[pixel]);  
  
    int brightness = map(brightnessSin * 1000, -1000, 1000, minB, maxB); 
  //color

    int hue = h + random(-hRange / 2, hRange / 10);  // randomize, 2000-3980
   // Serial.println(hue);
   // int brightness = random(minB, maxB);    //randomize
    
    // if (pixel >= 7) {  //control each light 
    //   brightness = random(minB + 80, maxB); //cannot just random ig
    // }

    long color = strip.ColorHSV(hue, s, brightness);
    strip.setPixelColor(pixel, color);
  }

  }
 
  strip.show();
  delay(100); 

}