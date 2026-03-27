# Point-to-Point Communication

> Building a simple two-node LoRa link.

## Project Overview

Create a wireless sensor link between two nodes:
- **Node A**: Sensor node (outdoor)
- **Node B**: Receiver/display (indoor)

## Hardware Required

### Node A (Transmitter)
- ESP32 DevKit
- SX1276 LoRa module
- DHT22 temperature/humidity sensor
- 18650 LiPo battery
- Solar panel (optional)
- Weatherproof enclosure

### Node B (Receiver)
- ESP32 DevKit
- SX1276 LoRa module
- 0.96" OLED display
- USB power

## Wiring

### Node A
```
ESP32          SX1276         DHT22
─────          ──────         ─────
3.3V ──────── VCC
GND  ──────── GND  ───────── GND
GPIO5 ─────── NSS
GPIO18 ────── SCK
GPIO19 ────── MISO
GPIO23 ────── MOSI
GPIO14 ────── RST
GPIO26 ────── DIO0
GPIO4  ─────────────────────── DATA
3.3V   ─────────────────────── VCC
```

### Node B
```
ESP32          SX1276         OLED
─────          ──────         ────
3.3V ──────── VCC  ───────── VCC
GND  ──────── GND  ───────── GND
GPIO5 ─────── NSS
GPIO18 ────── SCK
GPIO19 ────── MISO
GPIO23 ────── MOSI
GPIO14 ────── RST
GPIO26 ────── DIO0
GPIO21 ─────────────────────── SDA
GPIO22 ─────────────────────── SCL
```

## Transmitter Code

```cpp
#include <SPI.h>
#include <LoRa.h>
#include <DHT.h>

#define LORA_CS   5
#define LORA_RST  14
#define LORA_DIO0 26
#define DHT_PIN   4
#define DHT_TYPE  DHT22

DHT dht(DHT_PIN, DHT_TYPE);

struct SensorData {
  uint8_t nodeId;
  float temperature;
  float humidity;
  float battery;
  uint32_t uptime;
};

void setup() {
  Serial.begin(115200);

  // Initialize LoRa
  LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(868E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }

  LoRa.setSpreadingFactor(9);  // Good range
  LoRa.setTxPower(17);

  // Initialize DHT
  dht.begin();

  Serial.println("Transmitter ready");
}

void loop() {
  SensorData data;
  data.nodeId = 1;
  data.temperature = dht.readTemperature();
  data.humidity = dht.readHumidity();
  data.battery = readBattery();
  data.uptime = millis() / 1000;

  // Validate readings
  if (isnan(data.temperature) || isnan(data.humidity)) {
    Serial.println("Sensor read failed!");
    delay(5000);
    return;
  }

  // Send data
  Serial.printf("Sending: T=%.1f H=%.1f B=%.2f\n",
                data.temperature, data.humidity, data.battery);

  LoRa.beginPacket();
  LoRa.write((uint8_t*)&data, sizeof(data));
  LoRa.endPacket();

  // Sleep for 30 seconds
  delay(30000);
}

float readBattery() {
  int raw = analogRead(34);
  return (raw / 4095.0) * 3.3 * 2;  // Voltage divider
}
```

## Receiver Code

```cpp
#include <SPI.h>
#include <LoRa.h>
#include <Wire.h>
#include <U8g2lib.h>

#define LORA_CS   5
#define LORA_RST  14
#define LORA_DIO0 26

U8G2_SSD1306_128X64_NONAME_F_HW_I2C display(U8G2_R0, U8X8_PIN_NONE);

struct SensorData {
  uint8_t nodeId;
  float temperature;
  float humidity;
  float battery;
  uint32_t uptime;
};

SensorData lastData;
int rssi = 0;
unsigned long lastReceive = 0;

void setup() {
  Serial.begin(115200);

  // Initialize display
  display.begin();
  display.setFont(u8g2_font_6x10_tf);
  showStatus("Starting...");

  // Initialize LoRa
  LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(868E6)) {
    showStatus("LoRa FAILED!");
    while (1);
  }

  LoRa.setSpreadingFactor(9);

  showStatus("Waiting...");
  Serial.println("Receiver ready");
}

void loop() {
  int packetSize = LoRa.parsePacket();

  if (packetSize == sizeof(SensorData)) {
    LoRa.readBytes((uint8_t*)&lastData, sizeof(lastData));
    rssi = LoRa.packetRssi();
    lastReceive = millis();

    Serial.printf("Received: T=%.1f H=%.1f RSSI=%d\n",
                  lastData.temperature, lastData.humidity, rssi);

    updateDisplay();
  }

  // Check for timeout
  if (millis() - lastReceive > 120000 && lastReceive > 0) {
    showStatus("No signal!");
  }
}

void updateDisplay() {
  display.clearBuffer();

  // Title
  display.setFont(u8g2_font_7x13B_tf);
  display.drawStr(0, 12, "SENSOR NODE 1");

  // Data
  display.setFont(u8g2_font_6x10_tf);

  char buf[32];
  sprintf(buf, "Temp: %.1f C", lastData.temperature);
  display.drawStr(0, 28, buf);

  sprintf(buf, "Humidity: %.1f %%", lastData.humidity);
  display.drawStr(0, 40, buf);

  sprintf(buf, "Battery: %.2f V", lastData.battery);
  display.drawStr(0, 52, buf);

  sprintf(buf, "RSSI: %d dBm", rssi);
  display.drawStr(0, 64, buf);

  display.sendBuffer();
}

void showStatus(const char* msg) {
  display.clearBuffer();
  display.setFont(u8g2_font_7x13B_tf);
  display.drawStr(0, 32, msg);
  display.sendBuffer();
}
```

## Testing

1. Upload transmitter code to Node A
2. Upload receiver code to Node B
3. Place nodes within line of sight
4. Monitor Serial output on both
5. Verify display shows sensor data

## Range Testing

| Distance | RSSI | Status |
|----------|------|--------|
| 10m | -50 dBm | Excellent |
| 100m | -80 dBm | Good |
| 500m | -100 dBm | OK |
| 1000m | -115 dBm | Marginal |

## Power Optimization

For battery operation on Node A:

```cpp
#include "esp_sleep.h"

void enterDeepSleep(int seconds) {
  esp_sleep_enable_timer_wakeup(seconds * 1000000ULL);
  esp_deep_sleep_start();
}
```
