# Unit Tests

> Individual component testing procedures.

## Sensor Tests

### BMP280 Test

**Objective**: Verify pressure and temperature readings

```cpp
void testBMP280() {
  Serial.println("=== BMP280 Test ===");

  // Check sensor presence
  if (!bmp.begin(0x76)) {
    Serial.println("FAIL: BMP280 not found");
    return;
  }
  Serial.println("PASS: BMP280 detected");

  // Read values
  float pressure = bmp.readPressure() / 100.0F;
  float temperature = bmp.readTemperature();

  // Validate ranges
  if (pressure > 800 && pressure < 1100) {
    Serial.printf("PASS: Pressure = %.1f hPa\n", pressure);
  } else {
    Serial.printf("FAIL: Pressure out of range: %.1f\n", pressure);
  }

  if (temperature > -40 && temperature < 85) {
    Serial.printf("PASS: Temperature = %.1f C\n", temperature);
  } else {
    Serial.printf("FAIL: Temperature out of range: %.1f\n", temperature);
  }
}
```

### GPS Test

**Objective**: Verify GPS lock and position accuracy

```cpp
void testGPS() {
  Serial.println("=== GPS Test ===");

  unsigned long start = millis();
  bool gotFix = false;

  while (millis() - start < 120000) { // 2 minute timeout
    while (gpsSerial.available()) {
      gps.encode(gpsSerial.read());
    }

    if (gps.location.isValid()) {
      gotFix = true;
      break;
    }
  }

  if (gotFix) {
    Serial.printf("PASS: GPS fix in %lu seconds\n",
                  (millis() - start) / 1000);
    Serial.printf("  Lat: %.6f\n", gps.location.lat());
    Serial.printf("  Lng: %.6f\n", gps.location.lng());
    Serial.printf("  Satellites: %d\n", gps.satellites.value());
  } else {
    Serial.println("FAIL: GPS timeout");
  }
}
```

### LoRa Test

**Objective**: Verify LoRa transmission and reception

```cpp
void testLoRaTX() {
  Serial.println("=== LoRa TX Test ===");

  for (int i = 0; i < 10; i++) {
    LoRa.beginPacket();
    LoRa.print("TEST");
    LoRa.print(i);
    int result = LoRa.endPacket();

    if (result == 1) {
      Serial.printf("PASS: Packet %d sent\n", i);
    } else {
      Serial.printf("FAIL: Packet %d failed\n", i);
    }
    delay(1000);
  }
}
```

## Power Tests

### Battery Voltage

```cpp
void testBattery() {
  Serial.println("=== Battery Test ===");

  float voltage = readBatteryVoltage();
  int percent = getBatteryPercent();

  Serial.printf("Voltage: %.2f V\n", voltage);
  Serial.printf("Percent: %d%%\n", percent);

  if (voltage >= 3.7) {
    Serial.println("PASS: Battery fully charged");
  } else if (voltage >= 3.3) {
    Serial.println("WARN: Battery partially charged");
  } else {
    Serial.println("FAIL: Battery low");
  }
}
```

## Running All Tests

```cpp
void runAllTests() {
  Serial.println("==============================");
  Serial.println("   CANSAT UNIT TESTS");
  Serial.println("==============================\n");

  testBMP280();
  Serial.println();

  testGPS();
  Serial.println();

  testLoRaTX();
  Serial.println();

  testBattery();
  Serial.println();

  Serial.println("==============================");
  Serial.println("   TESTS COMPLETE");
  Serial.println("==============================");
}
```
