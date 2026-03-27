---
displayed_sidebar: loraSidebar
---

# Fundamentals

> Understanding LoRa technology and theory.

## Contents

| # | Topic | Description |
|---|-------|-------------|
| 1 | [LoRa Basics](./01-LoRaBasics.md) | Modulation and physical layer |
| 2 | [LoRaWAN](./02-LoRaWAN.md) | Network protocol |
| 3 | [Frequency Bands](./03-FrequencyBands.md) | Regional regulations |

## What is LoRa?

LoRa (Long Range) is a proprietary spread spectrum modulation technique derived from CSS (Chirp Spread Spectrum). It enables long-range, low-power wireless communication.

## Key Concepts

### Chirp Spread Spectrum
- Frequency sweeps (chirps) encode data
- Resistant to multipath and interference
- Below noise floor operation

### Link Budget
```
Received Power = TX Power + TX Gain + RX Gain - Path Loss
Link Budget = TX Power - Receiver Sensitivity
```

### Time on Air
The duration of a LoRa packet transmission depends on:
- Payload size
- Spreading factor
- Bandwidth
- Coding rate

## LoRa vs LoRaWAN

| Aspect | LoRa | LoRaWAN |
|--------|------|---------|
| Layer | Physical | Network |
| Scope | Point-to-point | Star network |
| Complexity | Simple | Complex |
| Security | None built-in | AES-128 |
| Use Case | Custom networks | IoT at scale |

## Prerequisites

- Basic RF concepts
- Arduino/embedded programming
- Understanding of digital communication
