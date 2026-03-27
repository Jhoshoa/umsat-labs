# Radio Protocol

> LoRa configuration and communication setup.

## LoRa Module: SX1276

The SX1276 provides LoRa modulation with configurable parameters.

## Configuration

```cpp
#include <LoRa.h>

// Pin definitions
#define LORA_CS   5
#define LORA_RST  14
#define LORA_DIO0 26

void initLoRa() {
  LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);

  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }

  // Configure for range vs speed
  LoRa.setSpreadingFactor(7);      // 7-12, higher = more range
  LoRa.setSignalBandwidth(125E3);  // 7.8E3 to 500E3
  LoRa.setCodingRate4(5);          // 5-8, error correction
  LoRa.setTxPower(17);             // 2-20 dBm
  LoRa.enableCrc();                // Enable CRC check

  Serial.println("LoRa initialized!");
}
```

## Parameter Trade-offs

| Parameter | Low Value | High Value |
|-----------|-----------|------------|
| Spreading Factor | Fast, short range | Slow, long range |
| Bandwidth | Long range, slow | Short range, fast |
| Coding Rate | Fast, less robust | Slow, more robust |

## Recommended Settings

### Long Range (Competition)
```cpp
LoRa.setSpreadingFactor(10);
LoRa.setSignalBandwidth(125E3);
LoRa.setCodingRate4(8);
// ~300 bps, ~10 km range
```

### Balanced (Default)
```cpp
LoRa.setSpreadingFactor(7);
LoRa.setSignalBandwidth(125E3);
LoRa.setCodingRate4(5);
// ~5.5 kbps, ~2 km range
```

### High Speed (Testing)
```cpp
LoRa.setSpreadingFactor(6);
LoRa.setSignalBandwidth(500E3);
LoRa.setCodingRate4(5);
// ~37.5 kbps, ~500m range
```

## Transmission

```cpp
void sendPacket(TelemetryPacket &packet) {
  LoRa.beginPacket();
  LoRa.write((uint8_t*)&packet, sizeof(packet));
  LoRa.endPacket();
}
```

## Reception

```cpp
void receivePacket() {
  int packetSize = LoRa.parsePacket();
  if (packetSize == sizeof(TelemetryPacket)) {
    TelemetryPacket packet;
    LoRa.readBytes((uint8_t*)&packet, sizeof(packet));

    // Get signal quality
    int rssi = LoRa.packetRssi();
    float snr = LoRa.packetSnr();

    processPacket(packet, rssi, snr);
  }
}
```

## Antenna

**Type**: 1/4 wave monopole
**Length**: λ/4 = 300 / 433 / 4 = 17.3 cm

For ground station, use a directional Yagi antenna for improved range.
