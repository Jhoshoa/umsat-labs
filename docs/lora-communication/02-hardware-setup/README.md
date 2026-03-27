---
displayed_sidebar: loraSidebar
---

# Hardware Setup

> Modules, antennas, and wiring for LoRa projects.

## Contents

| # | Topic | Description |
|---|-------|-------------|
| 1 | [Module Selection](./01-ModuleSelection.md) | Choosing the right LoRa module |
| 2 | [Antenna Design](./02-AntennaDesign.md) | Antenna types and construction |
| 3 | [Wiring](./03-Wiring.md) | Connections and circuits |

## Common Hardware

### LoRa Modules

| Module | Frequency | Interface | Price |
|--------|-----------|-----------|-------|
| SX1276 | 868/915 MHz | SPI | $3-5 |
| RFM95W | 868/915 MHz | SPI | $8-12 |
| Ra-02 | 433 MHz | SPI | $4-6 |
| RYLR896 | 868/915 MHz | UART | $12-15 |

### Development Boards

| Board | MCU | LoRa | Features |
|-------|-----|------|----------|
| Heltec WiFi LoRa 32 | ESP32 | SX1276 | OLED, WiFi |
| TTGO LoRa32 | ESP32 | SX1276 | OLED, Battery |
| Adafruit Feather M0 | SAMD21 | RFM95 | LiPo charging |
| RAK4631 | nRF52840 | SX1262 | BLE, low power |

## Basic Setup

```
[MCU] ----SPI---- [LoRa Module] ---- [Antenna]
  |
  +-- Power (3.3V)
  +-- Serial Debug
```

## Tools Required

- Soldering iron
- Wire strippers
- Multimeter
- SWR meter (optional, for antennas)
- USB cable
- Breadboard/PCB
