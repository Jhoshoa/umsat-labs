# Module Selection

> Choosing the right LoRa module for your project.

## SX127x Family

### SX1276
- **Frequency**: 137-1020 MHz (configurable)
- **Max Power**: +20 dBm
- **Sensitivity**: -148 dBm (SF12)
- **Interface**: SPI
- **Best for**: General purpose, 868/915 MHz

### SX1278
- **Frequency**: 137-525 MHz
- **Max Power**: +20 dBm
- **Sensitivity**: -148 dBm (SF12)
- **Interface**: SPI
- **Best for**: 433 MHz applications

### SX1279
- **Frequency**: 137-960 MHz
- **Max Power**: +20 dBm
- **Best for**: Wide frequency range

## SX126x Family (Newer)

### SX1262
- **Frequency**: 150-960 MHz
- **Max Power**: +22 dBm
- **Sensitivity**: -148 dBm
- **Current**: 4.6 mA RX (vs 10.8 mA SX1276)
- **Best for**: Battery-powered, long range

### SX1268
- **Frequency**: 410-810 MHz
- **Best for**: Sub-GHz applications

## Popular Breakout Boards

### Ra-02 (AI-Thinker)

```
Features:
- SX1278 chip
- 433 MHz
- Onboard antenna connector (IPEX)
- Low cost (~$4)

Pinout:
| Pin | Function |
|-----|----------|
| VCC | 3.3V |
| GND | Ground |
| SCK | SPI Clock |
| MISO | SPI Data Out |
| MOSI | SPI Data In |
| NSS | Chip Select |
| DIO0 | Interrupt |
| RST | Reset |
```

### RFM95W (HopeRF)

```
Features:
- SX1276 chip
- 868/915 MHz
- High quality
- Good documentation

Pinout:
| Pin | Function |
|-----|----------|
| 3.3V | Power |
| GND | Ground |
| DIO0-5 | Digital I/O |
| SCK/MISO/MOSI/NSS | SPI |
| ANT | Antenna |
| RST | Reset |
```

### Heltec WiFi LoRa 32 V3

```
Features:
- ESP32-S3 + SX1262
- Built-in 0.96" OLED
- WiFi + BLE
- USB-C
- Battery connector

Price: ~$18
```

## Comparison Table

| Feature | SX1276 | SX1262 | LLCC68 |
|---------|--------|--------|--------|
| Max TX Power | +20 dBm | +22 dBm | +22 dBm |
| RX Current | 10.8 mA | 4.6 mA | 4.6 mA |
| Sleep Current | 1 μA | 160 nA | 160 nA |
| Spreading Factor | 6-12 | 5-12 | 5-11 |
| Price | Low | Medium | Low |

## Selection Criteria

1. **Frequency band**: Match your region
2. **Power requirements**: Battery vs mains
3. **Range needed**: Higher SF = more range
4. **Data rate**: Higher BW = more throughput
5. **Cost**: Volume pricing considerations
6. **Availability**: Supply chain reliability

## Recommended Configurations

### Long Range Sensor Node
- Module: SX1262
- MCU: ESP32-C3 or nRF52840
- Antenna: 1/4 wave whip
- Power: LiPo + solar

### Gateway
- Module: SX1276/SX1301 (multi-channel)
- MCU: Raspberry Pi
- Antenna: Outdoor omnidirectional
- Power: PoE or mains

### Portable Tracker
- Module: LLCC68
- MCU: STM32L0
- Antenna: Flexible PCB
- Power: CR2032 or small LiPo
