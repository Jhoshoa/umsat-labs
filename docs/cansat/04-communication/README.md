---
displayed_sidebar: cansatSidebar
---

# Communication

> RF protocols and telemetry system.

## Contents

| # | Topic | Description |
|---|-------|-------------|
| 1 | [Radio Protocol](./01-RadioProtocol.md) | LoRa configuration |
| 2 | [Telemetry](./02-Telemetry.md) | Data transmission format |

## Overview

The CanSat uses LoRa (Long Range) radio technology for telemetry transmission. This provides reliable long-range communication with low power consumption.

## System Architecture

```plantuml
@startuml
skinparam monochrome false

rectangle "CanSat (TX)" {
  [ESP32] as MCU_TX
  [SX1276] as LORA_TX
  [Antenna] as ANT_TX
}

rectangle "Ground Station (RX)" {
  [ESP32] as MCU_RX
  [SX1276] as LORA_RX
  [Antenna] as ANT_RX
  [USB] as USB
}

rectangle "Computer" {
  [Ground Software] as SW
}

MCU_TX --> LORA_TX : SPI
LORA_TX --> ANT_TX
ANT_TX ..> ANT_RX : 433MHz
ANT_RX --> LORA_RX
LORA_RX --> MCU_RX : SPI
MCU_RX --> USB : Serial
USB --> SW

@enduml
```

## RF Specifications

| Parameter | Value |
|-----------|-------|
| Frequency | 433.0 MHz |
| Modulation | LoRa |
| Bandwidth | 125 kHz |
| Spreading Factor | 7 |
| Coding Rate | 4/5 |
| TX Power | +17 dBm |
| Link Budget | 148 dB |

## Link Budget Calculation

```
Link Budget = TX Power + TX Antenna Gain + RX Antenna Gain - Path Loss - Margin

At 1 km distance:
Path Loss = 20 * log10(4 * π * d / λ)
Path Loss = 20 * log10(4 * π * 1000 / 0.69) ≈ 85 dB

Available: 17 + 2 + 2 - 85 = -64 dBm
Sensitivity: -148 dBm (SF7, BW125)
Margin: 84 dB ✓
```
