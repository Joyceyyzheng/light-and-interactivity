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


  //read potentiometer value
  int sensorValue = analogRead(A0);


  //calc average
  total -= readings[readIndex];
  readings[readIndex] = sensorValue;
  total += readings[readIndex];
  readIndex = (readIndex + 1) % numReadings;

  average = total / numReadings;

  int lightValue = map(average, 0, 1023, 0, 255);

  Serial.println(lightValue);

  analogWrite(3, lightValue);
  delay(100);
}
