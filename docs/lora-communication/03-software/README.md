---
displayed_sidebar: loraSidebar
---

# Software

> Libraries, code examples, and firmware for LoRa.

## Contents

| # | Topic | Description |
|---|-------|-------------|
| 1 | [Library Setup](./01-LibrarySetup.md) | Installing LoRa libraries |
| 2 | [Transmit/Receive](./02-TransmitReceive.md) | Basic communication |
| 3 | [Network Protocol](./03-NetworkProtocol.md) | Custom protocols |

## Development Environments

### Arduino IDE
- Easy to start
- Limited debugging
- Good for beginners

### PlatformIO
- Professional tooling
- Library management
- Debugging support
- Recommended for serious projects

## Essential Libraries

| Library | Platform | Purpose |
|---------|----------|---------|
| LoRa (Sandeep) | Arduino | Basic LoRa |
| RadioLib | Arduino/PIO | Advanced, multi-chip |
| LMIC | Arduino | LoRaWAN |
| arduino-lmic | ESP32 | LoRaWAN for ESP |

## Quick Start

```cpp
#include <LoRa.h>

void setup() {
  Serial.begin(115200);

  if (!LoRa.begin(868E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }

  Serial.println("LoRa ready!");
}

void loop() {
  // Transmit
  LoRa.beginPacket();
  LoRa.print("Hello LoRa!");
  LoRa.endPacket();

  delay(5000);
}
```
