# Library Setup

> Installing and configuring LoRa libraries.

## Arduino IDE Setup

### Install LoRa Library

1. Open Arduino IDE
2. Go to **Sketch → Include Library → Manage Libraries**
3. Search for "LoRa"
4. Install "LoRa by Sandeep Mistry"

### Install ESP32 Board Support

1. Go to **File → Preferences**
2. Add to Additional Board URLs:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. Go to **Tools → Board → Board Manager**
4. Search and install "esp32"

## PlatformIO Setup

### platformio.ini

```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200

lib_deps =
    sandeepmistry/LoRa@^0.8.0

; Optional: RadioLib for advanced features
; lib_deps =
;     jgromes/RadioLib@^6.1.0
```

### For Heltec WiFi LoRa 32

```ini
[env:heltec_wifi_lora_32_V3]
platform = espressif32
board = heltec_wifi_lora_32_V3
framework = arduino
monitor_speed = 115200

lib_deps =
    sandeepmistry/LoRa@^0.8.0
    olikraus/U8g2@^2.34.22
```

## Library Comparison

### LoRa (Sandeep Mistry)

**Pros:**
- Simple API
- Well documented
- Good for beginners

**Cons:**
- Limited features
- Only SX127x support

```cpp
#include <LoRa.h>

LoRa.begin(868E6);
LoRa.setSpreadingFactor(7);
LoRa.setSignalBandwidth(125E3);
```

### RadioLib

**Pros:**
- Multiple chip support (SX126x, SX127x, etc.)
- Advanced features
- Active development

**Cons:**
- More complex API
- Larger code size

```cpp
#include <RadioLib.h>

SX1276 radio = new Module(CS, DIO0, RST, DIO1);
radio.begin(868.0, 125.0, 7, 5, 0x12, 17);
```

### LMIC (LoRaWAN)

**Pros:**
- Full LoRaWAN stack
- Class A/B/C support
- OTAA and ABP

**Cons:**
- Complex configuration
- Large memory footprint
- Requires careful timing

```cpp
#include <lmic.h>
#include <hal/hal.h>

// OTAA keys
static const u1_t PROGMEM APPEUI[8] = { ... };
static const u1_t PROGMEM DEVEUI[8] = { ... };
static const u1_t PROGMEM APPKEY[16] = { ... };
```

## Verification Test

After installation, run this test sketch:

```cpp
#include <SPI.h>
#include <LoRa.h>

#define LORA_CS   5
#define LORA_RST  14
#define LORA_DIO0 26

void setup() {
  Serial.begin(115200);
  while (!Serial);

  Serial.println("LoRa Library Test");

  LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);

  if (!LoRa.begin(868E6)) {
    Serial.println("FAILED - Check wiring!");
    while (1);
  }

  Serial.println("SUCCESS - LoRa initialized!");
  Serial.print("Frequency: 868 MHz, ");
  Serial.println("Ready to communicate.");
}

void loop() {
  Serial.println("Sending test packet...");

  LoRa.beginPacket();
  LoRa.print("TEST");
  LoRa.endPacket();

  Serial.println("Packet sent!");
  delay(5000);
}
```

Expected output:
```
LoRa Library Test
SUCCESS - LoRa initialized!
Frequency: 868 MHz, Ready to communicate.
Sending test packet...
Packet sent!
```
