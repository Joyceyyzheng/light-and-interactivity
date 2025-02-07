//sine wave
float phase = 0;        
float phaseIncrement = 0.05;  


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  
  // int sensor = analogRead (A0)/4;
  //   analogzWrite(5,sensor);
  // )

  //read potentiometer value
  int sensorValue = analogRead(A0);
  int lightValue = map(sensorValue, 0,1024,0,255);

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
