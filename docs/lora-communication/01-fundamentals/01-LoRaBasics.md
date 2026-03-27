# LoRa Basics

> Understanding LoRa modulation and physical layer.

## Chirp Spread Spectrum

LoRa uses CSS (Chirp Spread Spectrum) modulation where the carrier frequency continuously varies.

### Up-Chirp
Frequency increases from f_min to f_max over symbol time.

### Down-Chirp
Frequency decreases from f_max to f_min over symbol time.

## Key Parameters

### Spreading Factor (SF)

| SF | Chips/Symbol | Sensitivity | Data Rate | Range |
|----|-------------|-------------|-----------|-------|
| 6 | 64 | -118 dBm | 9.38 kbps | Short |
| 7 | 128 | -123 dBm | 5.47 kbps | Medium |
| 8 | 256 | -126 dBm | 3.13 kbps | Medium |
| 9 | 512 | -129 dBm | 1.76 kbps | Long |
| 10 | 1024 | -132 dBm | 0.98 kbps | Long |
| 11 | 2048 | -134.5 dBm | 0.54 kbps | Very Long |
| 12 | 4096 | -137 dBm | 0.29 kbps | Maximum |

Higher SF = More range, slower data rate

### Bandwidth (BW)

| Bandwidth | Use Case |
|-----------|----------|
| 7.8 kHz | Maximum range |
| 10.4 kHz | Long range |
| 15.6 kHz | Long range |
| 20.8 kHz | Medium range |
| 31.25 kHz | Medium range |
| 41.7 kHz | Medium range |
| 62.5 kHz | Balanced |
| 125 kHz | Standard (common) |
| 250 kHz | Higher data rate |
| 500 kHz | Maximum data rate |

### Coding Rate (CR)

Error correction overhead:

| CR | Overhead | Robustness |
|----|----------|------------|
| 4/5 | 1.25x | Low |
| 4/6 | 1.50x | Medium |
| 4/7 | 1.75x | High |
| 4/8 | 2.00x | Maximum |

## Data Rate Calculation

```
Data Rate = SF * (BW / 2^SF) * CR

Example (SF7, BW125, CR4/5):
DR = 7 * (125000 / 128) * 0.8 = 5468.75 bps
```

## Time on Air

Symbol time:
```
T_sym = 2^SF / BW

Example (SF7, BW125):
T_sym = 128 / 125000 = 1.024 ms
```

## Link Budget

```
Link Budget = TX Power (dBm) - Receiver Sensitivity (dBm)

Example (17 dBm TX, SF7):
Link Budget = 17 - (-123) = 140 dB
```

## Free Space Path Loss

```
FSPL (dB) = 20*log10(d) + 20*log10(f) - 147.55

At 1 km, 868 MHz:
FSPL = 20*log10(1000) + 20*log10(868e6) - 147.55
FSPL = 60 + 178.77 - 147.55 = 91.22 dB
```

## Practical Considerations

1. **Line of Sight**: Dramatically improves range
2. **Antenna Height**: Higher = better coverage
3. **Interference**: Urban areas have more noise
4. **Weather**: Rain/humidity affects higher frequencies
