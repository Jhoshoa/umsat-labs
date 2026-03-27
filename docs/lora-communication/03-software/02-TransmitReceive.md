# Transmit/Receive

> Basic LoRa communication examples.

## Simple Transmitter

```cpp
#include <SPI.h>
#include <LoRa.h>

#define LORA_CS   5
#define LORA_RST  14
#define LORA_DIO0 26

int counter = 0;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  Serial.println("LoRa Transmitter");

  LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);

  if (!LoRa.begin(868E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }

  // Configure for range vs speed
  LoRa.setSpreadingFactor(7);
  LoRa.setSignalBandwidth(125E3);
  LoRa.setCodingRate4(5);
  LoRa.setTxPower(17);

  Serial.println("LoRa Transmitter Ready");
}

void loop() {
  Serial.print("Sending packet: ");
  Serial.println(counter);

  LoRa.beginPacket();
  LoRa.print("Hello #");
  LoRa.print(counter);
  LoRa.endPacket();

  counter++;
  delay(2000);
}
```

## Simple Receiver

```cpp
#include <SPI.h>
#include <LoRa.h>

#define LORA_CS   5
#define LORA_RST  14
#define LORA_DIO0 26

void setup() {
  Serial.begin(115200);
  while (!Serial);

  Serial.println("LoRa Receiver");

  LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);

  if (!LoRa.begin(868E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }

  // Must match transmitter settings
  LoRa.setSpreadingFactor(7);
  LoRa.setSignalBandwidth(125E3);
  LoRa.setCodingRate4(5);

  Serial.println("LoRa Receiver Ready");
}

void loop() {
  int packetSize = LoRa.parsePacket();

  if (packetSize) {
    Serial.print("Received packet: '");

    while (LoRa.available()) {
      Serial.print((char)LoRa.read());
    }

    Serial.print("' RSSI: ");
    Serial.print(LoRa.packetRssi());
    Serial.print(" dBm, SNR: ");
    Serial.print(LoRa.packetSnr());
    Serial.println(" dB");
  }
}
```

## Interrupt-Based Receiver

More efficient, non-blocking reception:

```cpp
#include <SPI.h>
#include <LoRa.h>

#define LORA_CS   5
#define LORA_RST  14
#define LORA_DIO0 26

volatile bool receivedFlag = false;

void onReceive(int packetSize) {
  receivedFlag = true;
}

void setup() {
  Serial.begin(115200);

  LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);

  if (!LoRa.begin(868E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }

  LoRa.onReceive(onReceive);
  LoRa.receive(); // Put in receive mode

  Serial.println("Receiver ready (interrupt mode)");
}

void loop() {
  if (receivedFlag) {
    receivedFlag = false;

    String message = "";
    while (LoRa.available()) {
      message += (char)LoRa.read();
    }

    Serial.print("Message: ");
    Serial.print(message);
    Serial.print(" | RSSI: ");
    Serial.println(LoRa.packetRssi());

    LoRa.receive(); // Re-enable receive mode
  }

  // Do other work here
}
```

## Binary Data Transmission

For sensor data, use structured packets:

```cpp
// Transmitter
struct SensorPacket {
  uint8_t nodeId;
  float temperature;
  float humidity;
  uint16_t battery;
};

void sendSensorData() {
  SensorPacket packet;
  packet.nodeId = 1;
  packet.temperature = 23.5;
  packet.humidity = 65.2;
  packet.battery = 3750; // mV

  LoRa.beginPacket();
  LoRa.write((uint8_t*)&packet, sizeof(packet));
  LoRa.endPacket();
}

// Receiver
void receiveSensorData() {
  int packetSize = LoRa.parsePacket();

  if (packetSize == sizeof(SensorPacket)) {
    SensorPacket packet;
    LoRa.readBytes((uint8_t*)&packet, sizeof(packet));

    Serial.printf("Node %d: Temp=%.1f, Hum=%.1f, Bat=%d mV\n",
      packet.nodeId,
      packet.temperature,
      packet.humidity,
      packet.battery);
  }
}
```

## Acknowledgment Protocol

Reliable transmission with ACK:

```cpp
#define ACK_TIMEOUT 2000
#define MAX_RETRIES 3

bool sendWithAck(const char* message) {
  for (int retry = 0; retry < MAX_RETRIES; retry++) {
    // Send message
    LoRa.beginPacket();
    LoRa.print(message);
    LoRa.endPacket();

    // Wait for ACK
    unsigned long start = millis();
    while (millis() - start < ACK_TIMEOUT) {
      int packetSize = LoRa.parsePacket();
      if (packetSize) {
        String response = "";
        while (LoRa.available()) {
          response += (char)LoRa.read();
        }
        if (response == "ACK") {
          return true; // Success!
        }
      }
    }

    Serial.printf("Retry %d/%d\n", retry + 1, MAX_RETRIES);
  }

  return false; // Failed after retries
}
```
