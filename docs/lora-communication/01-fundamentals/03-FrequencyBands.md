# Frequency Bands

> Regional regulations and ISM bands for LoRa.

## ISM Bands Overview

ISM (Industrial, Scientific, and Medical) bands are portions of the radio spectrum reserved for unlicensed use.

## Regional Allocations

### Europe (EU868)

| Channel | Frequency | Bandwidth | Duty Cycle |
|---------|-----------|-----------|------------|
| 0 | 868.1 MHz | 125 kHz | 1% |
| 1 | 868.3 MHz | 125 kHz | 1% |
| 2 | 868.5 MHz | 125 kHz | 1% |
| 3 | 867.1 MHz | 125 kHz | 1% |
| 4 | 867.3 MHz | 125 kHz | 1% |
| 5 | 867.5 MHz | 125 kHz | 1% |
| 6 | 867.7 MHz | 125 kHz | 1% |
| 7 | 867.9 MHz | 125 kHz | 1% |

**Maximum TX Power**: 14 dBm (25 mW) EIRP

### United States (US915)

| Channel Type | Frequency Range | Count |
|-------------|-----------------|-------|
| Uplink 125kHz | 902.3 - 914.9 MHz | 64 |
| Uplink 500kHz | 903.0 - 914.2 MHz | 8 |
| Downlink 500kHz | 923.3 - 927.5 MHz | 8 |

**Maximum TX Power**: 30 dBm (1 W) EIRP
**No duty cycle** (FCC Part 15 FHSS rules)

### Asia (AS923)

| Region | Frequencies |
|--------|-------------|
| AS923-1 | 923.2, 923.4 MHz |
| AS923-2 | 921.4, 921.6 MHz |
| AS923-3 | 916.6, 916.8 MHz |

**Maximum TX Power**: 16 dBm
**Duty Cycle**: Varies by country

### Australia (AU915)

Same as US915 but with different regulatory authority (ACMA).

## Duty Cycle Explained

Duty cycle limits how much time you can transmit:

```
Duty Cycle = Time on Air / Period

1% duty cycle:
- 36 seconds TX per hour
- Important for EU compliance
```

### Calculating Airtime

```python
def airtime_ms(sf, bw, payload_bytes, cr=1, preamble=8, header=True, crc=True):
    """Calculate LoRa packet airtime in milliseconds"""
    t_sym = (2**sf) / bw * 1000  # Symbol time in ms

    # Preamble time
    t_preamble = (preamble + 4.25) * t_sym

    # Payload symbols
    pl = payload_bytes
    h = 0 if header else 1
    de = 1 if sf >= 11 else 0
    crc_val = 1 if crc else 0

    payload_symbols = 8 + max(
        ceil((8*pl - 4*sf + 28 + 16*crc_val - 20*h) / (4*(sf - 2*de))) * (cr + 4),
        0
    )

    t_payload = payload_symbols * t_sym

    return t_preamble + t_payload
```

## Module Selection by Region

| Module | Frequency | Regions |
|--------|-----------|---------|
| SX1276 | 137-1020 MHz | All (configurable) |
| SX1278 | 137-525 MHz | 433 MHz regions |
| RFM95 | 868/915 MHz | EU, US, AU |
| RFM96 | 433 MHz | Asia, some EU |

## Legal Compliance

1. **Use correct frequency** for your region
2. **Respect duty cycle** limits
3. **Don't exceed power** limits
4. **Register with authorities** if required
5. **Use compliant antennas**

## Interference Considerations

| Frequency | Common Interference |
|-----------|---------------------|
| 433 MHz | Car remotes, weather stations |
| 868 MHz | Smart meters, alarms |
| 915 MHz | WiFi (5GHz nearby), cordless phones |

## Best Practices

1. **Channel hopping**: Spread transmissions across channels
2. **Adaptive data rate**: Use minimum SF for range needed
3. **Time sync**: Coordinate transmissions in dense networks
4. **Listen before talk**: Where regulations require
