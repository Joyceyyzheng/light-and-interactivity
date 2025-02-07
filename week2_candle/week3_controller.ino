//sine wave
float phase = 0;        
float phaseIncrement = 0.05;  

//doing average
const int numReadings = 10;  
int readings[numReadings];   
int readIndex = 0;          
int total = 0;              
int average = 0;  


void setup() {
 
  Serial.begin(9600);

  //initializing
   for (int i = 0; i < numReadings; i++) {
    readings[i] = 0;
  }
}

void loop() {
  
  // int sensor = analogRead (A0)/4;
  //   analogzWrite(5,sensor);
  // )

  //read potentiometer value
  int sensorValue = analogRead(A0);
  int lightValue = map(sensorValue, 0,1024,0,255);

  //calc average
  total -= readings[readIndex];         
  readings[readIndex] = sensorValue;        
  total += readings[readIndex];          
  readIndex = (readIndex + 1) % numReadings; 

  average = total / numReadings;

  // Serial.println(lightValue);
  // analogWrite(3, lightValue);

  //add sine value 
  int waveAmplitude = lightValue / 2;
  float sineValue = sin(phase);  
  int waveValue = sineValue * waveAmplitude; 

  int finalValue = lightValue + waveValue;
  finalValue = constrain(finalValue, 0, 255);//constrain it

  phase += phaseIncrement;
  if (phase >= 2 * PI) {
  phase -= 2 * PI;  
  }

  //light output
  Serial.println(finalValue);
  analogWrite(3, finalValue);
 
  delay(100);  

  
  
}
