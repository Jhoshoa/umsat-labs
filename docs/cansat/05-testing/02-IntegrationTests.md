# Integration Tests

> System-level testing procedures.

## End-to-End Telemetry Test

### Objective
Verify complete data flow from sensors through transmission to ground station.

### Setup
1. CanSat powered and running
2. Ground station connected and receiving
3. Serial monitor for debugging

### Procedure

```cpp
void integrationTest() {
  Serial.println("=== Integration Test ===");

  // Initialize all systems
  initSensors();
  initLoRa();
  initGPS();

  // Collect and transmit 10 packets
  for (int i = 0; i < 10; i++) {
    // Read all sensors
    float altitude = bmp.readAltitude(1013.25);
    float temperature = bmp.readTemperature();
    float pressure = bmp.readPressure() / 100.0;
    float humidity = dht.readHumidity();

    // Create packet
    TelemetryPacket packet = createPacket();

    // Transmit
    sendPacket(packet);

    Serial.printf("Sent packet %d: Alt=%.1f T=%.1f P=%.1f H=%.1f\n",
                  i, altitude, temperature, pressure, humidity);

    delay(1000);
  }
}
```

## Range Test

### Objective
Verify communication range meets 1 km requirement.

### Procedure
1. Set up ground station at fixed location
2. Walk away with CanSat transmitting
3. Record RSSI at various distances

### Test Points

| Distance | Expected RSSI | Pass Criteria |
|----------|---------------|---------------|
| 100m | > -80 dBm | Packets received |
| 500m | > -100 dBm | Packets received |
| 1000m | > -115 dBm | Packets received |
| 1500m | > -125 dBm | Some packets |

### Logging Script

```python
import serial
import csv
from datetime import datetime

def log_rssi(port, filename):
    ser = serial.Serial(port, 115200)
    with open(filename, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['timestamp', 'rssi', 'snr', 'packets'])

        packet_count = 0
        while True:
            line = ser.readline().decode().strip()
            if 'RSSI' in line:
                rssi = extract_rssi(line)
                snr = extract_snr(line)
                packet_count += 1
                writer.writerow([datetime.now(), rssi, snr, packet_count])
                print(f"RSSI: {rssi}, SNR: {snr}, Packets: {packet_count}")
```

## Drop Test

### Objective
Verify mechanical integrity and sensor operation during impact.

### Procedure
1. Drop CanSat from 2m height onto grass
2. Verify all sensors still reading
3. Check physical damage
4. Repeat 5 times

### Checklist

- [ ] No visible damage
- [ ] All sensors responding
- [ ] Battery secure
- [ ] Antenna intact
- [ ] SD card retained

## Environmental Test

### Temperature Test

| Condition | Temperature | Duration | Pass Criteria |
|-----------|-------------|----------|---------------|
| Cold | -10°C | 30 min | System operational |
| Hot | +50°C | 30 min | System operational |

### Vibration Test
Simulate rocket vibration for 5 minutes at 20-200 Hz.

## Test Results Template

```markdown
## Integration Test Report

**Date**: YYYY-MM-DD
**Tester**: Name
**Firmware Version**: X.Y.Z

### Test Results

| Test | Result | Notes |
|------|--------|-------|
| Telemetry E2E | PASS/FAIL | |
| Range 1km | PASS/FAIL | RSSI: -XXX dBm |
| Drop Test | PASS/FAIL | |
| Cold Test | PASS/FAIL | |

### Issues Found
1. Issue description
2. Issue description

### Recommendations
1. Recommendation
2. Recommendation
```
