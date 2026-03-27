# Telemetry

> Data packet format and transmission protocol.

## Packet Structure

### Binary Format (Recommended)

```cpp
#pragma pack(push, 1)
struct TelemetryPacket {
  uint8_t  sync[2];       // 0xAA, 0x55 - Sync bytes
  uint8_t  packetType;    // 0x01 = telemetry
  uint32_t timestamp;     // Milliseconds since boot
  uint8_t  state;         // Flight state enum
  int16_t  altitude;      // Altitude in decimeters (x0.1m)
  int16_t  temperature;   // Temp in 0.01°C
  uint16_t pressure;      // Pressure in 0.1 hPa
  uint8_t  humidity;      // Humidity 0-100%
  int32_t  latitude;      // Lat * 1e7
  int32_t  longitude;     // Lon * 1e7
  uint8_t  battery;       // Battery % (0-100)
  int16_t  accelX;        // Acceleration X (mg)
  int16_t  accelY;        // Acceleration Y (mg)
  int16_t  accelZ;        // Acceleration Z (mg)
  uint8_t  checksum;      // XOR of all bytes
};
#pragma pack(pop)
```

**Total size**: 32 bytes

### Checksum Calculation

```cpp
uint8_t calculateChecksum(TelemetryPacket &packet) {
  uint8_t *data = (uint8_t*)&packet;
  uint8_t checksum = 0;
  for (int i = 0; i < sizeof(packet) - 1; i++) {
    checksum ^= data[i];
  }
  return checksum;
}

bool validateChecksum(TelemetryPacket &packet) {
  return packet.checksum == calculateChecksum(packet);
}
```

## Encoding Functions

```cpp
TelemetryPacket createPacket() {
  TelemetryPacket packet;

  packet.sync[0] = 0xAA;
  packet.sync[1] = 0x55;
  packet.packetType = 0x01;
  packet.timestamp = millis();
  packet.state = currentState;

  // Scale values for transmission
  packet.altitude = (int16_t)(altitude * 10);        // m to dm
  packet.temperature = (int16_t)(temperature * 100); // C to 0.01C
  packet.pressure = (uint16_t)(pressure * 10);       // hPa to 0.1hPa
  packet.humidity = (uint8_t)humidity;
  packet.latitude = (int32_t)(lat * 1e7);
  packet.longitude = (int32_t)(lon * 1e7);
  packet.battery = getBatteryPercent();

  packet.checksum = calculateChecksum(packet);
  return packet;
}
```

## Decoding Functions

```cpp
void decodePacket(TelemetryPacket &packet) {
  // Validate sync bytes
  if (packet.sync[0] != 0xAA || packet.sync[1] != 0x55) {
    return; // Invalid packet
  }

  // Validate checksum
  if (!validateChecksum(packet)) {
    return; // Corrupted packet
  }

  // Decode values
  float altitude = packet.altitude / 10.0f;
  float temperature = packet.temperature / 100.0f;
  float pressure = packet.pressure / 10.0f;
  float latitude = packet.latitude / 1e7;
  float longitude = packet.longitude / 1e7;

  // Process data...
}
```

## Transmission Rate

At 1 Hz with 32-byte packets:
- Data rate needed: 32 * 8 = 256 bps
- SF7/BW125 provides: ~5.5 kbps
- Duty cycle: ~5% (well under legal limits)

## Error Handling

1. **CRC Error**: LoRa hardware CRC
2. **Checksum Error**: Application checksum
3. **Timeout**: No packet for 5 seconds
4. **Out of Range**: Monitor RSSI < -120 dBm
