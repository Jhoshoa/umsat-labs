---
sidebar_position: 3
---

# Wiring

> Connection diagrams and circuits for LoRa modules.

## SPI Connection Basics

LoRa modules communicate via SPI (Serial Peripheral Interface):

| Signal | Description | Direction |
|--------|-------------|-----------|
| SCK | Serial Clock | MCU → Module |
| MOSI | Master Out, Slave In | MCU → Module |
| MISO | Master In, Slave Out | Module → MCU |
| NSS/CS | Chip Select | MCU → Module |

## ESP32 + SX1276 Wiring

```
ESP32                    SX1276/RFM95
─────                    ────────────
3.3V  ──────────────────  VCC
GND   ──────────────────  GND
GPIO5 ──────────────────  NSS (CS)
GPIO18 ─────────────────  SCK
GPIO19 ─────────────────  MISO
GPIO23 ─────────────────  MOSI
GPIO14 ─────────────────  RST
GPIO26 ─────────────────  DIO0
GPIO33 ─────────────────  DIO1 (optional)
                          ANT ──── [Antenna]
```

### Code Configuration

```cpp
// Pin definitions for ESP32
#define LORA_CS   5
#define LORA_RST  14
#define LORA_DIO0 26
#define LORA_SCK  18
#define LORA_MISO 19
#define LORA_MOSI 23

void setup() {
  SPI.begin(LORA_SCK, LORA_MISO, LORA_MOSI, LORA_CS);
  LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);
  LoRa.begin(868E6);
}
```

## Arduino Uno + RFM95

```
Arduino Uno              RFM95W
───────────              ──────
3.3V ───────────────────  VIN
GND  ───────────────────  GND
D10  ───────────────────  CS
D13  ───────────────────  SCK
D12  ───────────────────  MISO
D11  ───────────────────  MOSI
D9   ───────────────────  RST
D2   ───────────────────  G0 (DIO0)
                          ANT ──── [Antenna]
```

**Note**: Arduino Uno is 5V, but RFM95 is 3.3V. Use a logic level converter or 3.3V Arduino.

## Arduino Nano + Ra-02

```
Arduino Nano             Ra-02 (SX1278)
────────────             ─────────────
3.3V ───────────────────  VCC
GND  ───────────────────  GND
D10  ───────────────────  NSS
D13  ───────────────────  SCK
D12  ───────────────────  MISO
D11  ───────────────────  MOSI
D9   ───────────────────  RST
D2   ───────────────────  DIO0
```

## STM32 (Blue Pill) + SX1276

```
STM32F103                SX1276
─────────                ──────
3.3V ───────────────────  VCC
GND  ───────────────────  GND
PA4  ───────────────────  NSS
PA5  ───────────────────  SCK
PA6  ───────────────────  MISO
PA7  ───────────────────  MOSI
PB0  ───────────────────  RST
PA1  ───────────────────  DIO0
```

## Power Considerations

### Voltage Levels
- Most LoRa modules: **3.3V only**
- Do NOT connect to 5V directly
- Use regulator if powered from higher voltage

### Current Requirements

| State | Current |
|-------|---------|
| Sleep | < 1 μA |
| Idle | 1.5 mA |
| RX | 10-12 mA |
| TX (+13dBm) | 28 mA |
| TX (+17dBm) | 85 mA |
| TX (+20dBm) | 120 mA |

### Decoupling Capacitors

Place near VCC pin:
- 100nF ceramic
- 10μF electrolytic (optional for stability)

## Schematic

```
                    ┌─────────────────┐
     3.3V ─────────┤VCC          MISO├──── GPIO19
                   │                  │
     GND  ─────────┤GND          MOSI├──── GPIO23
                   │                  │
     GPIO5 ────────┤NSS           SCK├──── GPIO18
                   │                  │
     GPIO14 ───────┤RST          DIO0├──── GPIO26
                   │                  │
     100nF ┤├──────┤VCC          DIO1├──── (optional)
           │       │                  │
     GND ──┴───────┤GND           ANT├──── Antenna
                   │                  │
                   └─────────────────┘
                        SX1276
```

## Troubleshooting

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| No communication | Wrong pins | Verify SPI wiring |
| Init fails | No power | Check 3.3V supply |
| Short range | Bad antenna | Check antenna connection |
| Intermittent | Loose wires | Solder connections |
| Overheating | Overcurrent | Check for shorts |
