---
displayed_sidebar: loraSidebar
---

# Projects

> Practical LoRa implementation examples.

## Contents

| # | Topic | Description |
|---|-------|-------------|
| 1 | [Point-to-Point](./01-PointToPoint.md) | Basic two-node communication |
| 2 | [Mesh Network](./02-MeshNetwork.md) | Multi-hop networking |

## Project Ideas

### Beginner
- Door/window sensor
- Simple weather station
- Panic button

### Intermediate
- GPS tracker
- Multi-sensor node
- Remote display

### Advanced
- LoRaWAN gateway
- Mesh network
- Agricultural monitoring system

## Common Components

| Component | Purpose | Cost |
|-----------|---------|------|
| ESP32 | Main controller | $5-10 |
| SX1276 module | LoRa transceiver | $5-8 |
| DHT22 | Temperature/humidity | $4 |
| BMP280 | Pressure/altitude | $3 |
| GPS NEO-6M | Location | $10 |
| Solar panel 6V | Power | $10 |
| 18650 battery | Energy storage | $5 |

## Project Structure

```
project/
├── src/
│   └── main.cpp
├── include/
│   ├── config.h
│   └── protocol.h
├── lib/
│   └── custom_libs/
├── test/
├── platformio.ini
└── README.md
```
