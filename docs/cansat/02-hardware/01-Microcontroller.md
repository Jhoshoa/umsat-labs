# Microcontroller

> ESP32 setup and configuration for the CanSat flight computer.

## ESP32 Overview

The ESP32-WROOM-32 serves as the flight computer for our CanSat. It provides sufficient processing power, memory, and I/O for all mission requirements.

## Specifications

| Feature | Value |
|---------|-------|
| CPU | Xtensa LX6 Dual-Core @ 240MHz |
| RAM | 520KB SRAM |
| Flash | 4MB |
| WiFi | 802.11 b/g/n |
| Bluetooth | BLE 4.2 |
| GPIO | 34 pins |
| ADC | 18 channels (12-bit) |
| Operating Voltage | 3.3V |

## Pin Mapping

```cpp
// I2C Pins
#define I2C_SDA 21
#define I2C_SCL 22

// SPI Pins (LoRa)
#define LORA_CS   5
#define LORA_SCK  18
#define LORA_MISO 19
#define LORA_MOSI 23
#define LORA_RST  14
#define LORA_DIO0 26

// GPS UART
#define GPS_RX 16
#define GPS_TX 17

// Status LED
#define LED_PIN 2

// Buzzer
#define BUZZER_PIN 25
```

## Development Environment

### PlatformIO Configuration

```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
lib_deps =
    sandeepmistry/LoRa@^0.8.0
    adafruit/Adafruit BMP280 Library@^2.6.6
    adafruit/DHT sensor library@^1.4.4
    mikalhart/TinyGPSPlus@^1.0.3
```

## Boot Configuration

The ESP32 requires specific boot pin states:

| Pin | Boot Mode |
|-----|-----------|
| GPIO0 | HIGH = Run, LOW = Flash |
| GPIO2 | No pull (can be used) |
| GPIO15 | No pull (debugging) |

## Power Considerations

- Operating voltage: 3.3V (via regulator)
- Deep sleep current: ~10uA
- Active current: ~80mA average
- WiFi disabled during flight (power saving)
