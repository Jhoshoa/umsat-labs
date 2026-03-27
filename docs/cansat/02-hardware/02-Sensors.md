# Sensors

> Sensor selection and integration guide.

## Sensor Suite

### BMP280 - Barometric Pressure

| Parameter | Value |
|-----------|-------|
| Pressure Range | 300-1100 hPa |
| Pressure Accuracy | ±1 hPa |
| Temperature Range | -40°C to +85°C |
| Interface | I2C / SPI |
| I2C Address | 0x76 or 0x77 |

```cpp
#include <Adafruit_BMP280.h>

Adafruit_BMP280 bmp;

void initBMP280() {
  if (!bmp.begin(0x76)) {
    Serial.println("BMP280 not found!");
    return;
  }

  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,
                  Adafruit_BMP280::SAMPLING_X2,  // temp
                  Adafruit_BMP280::SAMPLING_X16, // pressure
                  Adafruit_BMP280::FILTER_X16,
                  Adafruit_BMP280::STANDBY_MS_500);
}

float getAltitude() {
  return bmp.readAltitude(1013.25); // Sea level pressure
}
```

### DHT22 - Temperature & Humidity

| Parameter | Value |
|-----------|-------|
| Temperature Range | -40°C to +80°C |
| Temperature Accuracy | ±0.5°C |
| Humidity Range | 0-100% RH |
| Humidity Accuracy | ±2% RH |
| Sample Rate | 0.5 Hz |

```cpp
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void initDHT() {
  dht.begin();
}

float getTemperature() {
  return dht.readTemperature();
}

float getHumidity() {
  return dht.readHumidity();
}
```

### MPU6050 - IMU

| Parameter | Value |
|-----------|-------|
| Accelerometer Range | ±2g, ±4g, ±8g, ±16g |
| Gyroscope Range | ±250, ±500, ±1000, ±2000 °/s |
| Interface | I2C |
| I2C Address | 0x68 |

### NEO-6M - GPS

| Parameter | Value |
|-----------|-------|
| Channels | 50 |
| Update Rate | 5 Hz max |
| Position Accuracy | 2.5m CEP |
| TTFF (Cold) | 27s |
| Interface | UART (9600 baud) |

```cpp
#include <TinyGPS++.h>
#include <HardwareSerial.h>

TinyGPSPlus gps;
HardwareSerial gpsSerial(2);

void initGPS() {
  gpsSerial.begin(9600, SERIAL_8N1, GPS_RX, GPS_TX);
}

void readGPS() {
  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }
}
```

## I2C Bus Configuration

All I2C devices share the same bus:

| Device | Address | Speed |
|--------|---------|-------|
| BMP280 | 0x76 | 400kHz |
| MPU6050 | 0x68 | 400kHz |
