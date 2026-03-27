# Network Protocol

> Custom protocols for LoRa networks.

## Protocol Design

A well-designed protocol ensures reliable communication in multi-node networks.

## Simple Protocol Structure

```cpp
struct LoRaPacket {
  uint8_t header;        // Protocol version + flags
  uint8_t srcAddr;       // Source address
  uint8_t dstAddr;       // Destination address
  uint8_t packetId;      // Sequence number
  uint8_t payloadLen;    // Payload length
  uint8_t payload[240];  // Data
  uint8_t checksum;      // Error detection
};
```

### Header Byte Format

```
Bit 7-6: Protocol version (00 = v1)
Bit 5:   ACK required
Bit 4:   Is ACK packet
Bit 3-0: Packet type
```

### Packet Types

```cpp
enum PacketType {
  PKT_DATA      = 0x01,
  PKT_ACK       = 0x02,
  PKT_BEACON    = 0x03,
  PKT_JOIN_REQ  = 0x04,
  PKT_JOIN_RESP = 0x05,
  PKT_PING      = 0x06,
  PKT_PONG      = 0x07
};
```

## Implementation

### Packet Builder

```cpp
class LoRaProtocol {
private:
  uint8_t nodeAddr;
  uint8_t packetCounter;

public:
  LoRaProtocol(uint8_t addr) : nodeAddr(addr), packetCounter(0) {}

  void sendData(uint8_t dest, uint8_t* data, uint8_t len, bool ackReq = true) {
    LoRaPacket pkt;

    pkt.header = 0x00;  // Version 0
    if (ackReq) pkt.header |= 0x20;
    pkt.header |= PKT_DATA;

    pkt.srcAddr = nodeAddr;
    pkt.dstAddr = dest;
    pkt.packetId = packetCounter++;
    pkt.payloadLen = len;
    memcpy(pkt.payload, data, len);
    pkt.checksum = calculateChecksum(&pkt);

    transmit(&pkt);
  }

  void sendAck(uint8_t dest, uint8_t packetId) {
    LoRaPacket pkt;

    pkt.header = 0x10 | PKT_ACK;  // Is ACK packet
    pkt.srcAddr = nodeAddr;
    pkt.dstAddr = dest;
    pkt.packetId = packetId;
    pkt.payloadLen = 0;
    pkt.checksum = calculateChecksum(&pkt);

    transmit(&pkt);
  }

private:
  void transmit(LoRaPacket* pkt) {
    size_t len = 6 + pkt->payloadLen;
    LoRa.beginPacket();
    LoRa.write((uint8_t*)pkt, len);
    LoRa.endPacket();
  }

  uint8_t calculateChecksum(LoRaPacket* pkt) {
    uint8_t sum = 0;
    uint8_t* data = (uint8_t*)pkt;
    for (int i = 0; i < 5 + pkt->payloadLen; i++) {
      sum ^= data[i];
    }
    return sum;
  }
};
```

### Packet Parser

```cpp
bool parsePacket(LoRaPacket* pkt) {
  int size = LoRa.parsePacket();
  if (size < 6) return false;

  pkt->header = LoRa.read();
  pkt->srcAddr = LoRa.read();
  pkt->dstAddr = LoRa.read();
  pkt->packetId = LoRa.read();
  pkt->payloadLen = LoRa.read();

  if (pkt->payloadLen > 240) return false;

  for (int i = 0; i < pkt->payloadLen; i++) {
    pkt->payload[i] = LoRa.read();
  }

  pkt->checksum = LoRa.read();

  // Verify checksum
  uint8_t calc = calculateChecksum(pkt);
  return calc == pkt->checksum;
}
```

## Addressing Scheme

```
Address 0x00: Broadcast (all nodes)
Address 0x01: Gateway/Master
Address 0x02-0xFE: End nodes
Address 0xFF: Reserved
```

## Complete Node Example

```cpp
#include <SPI.h>
#include <LoRa.h>

#define MY_ADDRESS 0x02
#define GATEWAY_ADDRESS 0x01

LoRaProtocol protocol(MY_ADDRESS);

void setup() {
  Serial.begin(115200);

  LoRa.setPins(5, 14, 26);
  if (!LoRa.begin(868E6)) {
    while (1);
  }

  Serial.printf("Node 0x%02X ready\n", MY_ADDRESS);
}

void loop() {
  // Check for incoming packets
  LoRaPacket pkt;
  if (parsePacket(&pkt)) {
    // Check if for us
    if (pkt.dstAddr == MY_ADDRESS || pkt.dstAddr == 0x00) {
      handlePacket(&pkt);
    }
  }

  // Send sensor data every 30 seconds
  static unsigned long lastSend = 0;
  if (millis() - lastSend > 30000) {
    float temp = readTemperature();
    protocol.sendData(GATEWAY_ADDRESS, (uint8_t*)&temp, sizeof(temp));
    lastSend = millis();
  }
}

void handlePacket(LoRaPacket* pkt) {
  uint8_t type = pkt->header & 0x0F;

  switch (type) {
    case PKT_DATA:
      Serial.printf("Data from 0x%02X\n", pkt->srcAddr);
      if (pkt->header & 0x20) {  // ACK required
        protocol.sendAck(pkt->srcAddr, pkt->packetId);
      }
      break;

    case PKT_ACK:
      Serial.printf("ACK from 0x%02X\n", pkt->srcAddr);
      break;

    case PKT_PING:
      protocol.sendPong(pkt->srcAddr);
      break;
  }
}
```

## Best Practices

1. **Unique addresses**: Ensure no address conflicts
2. **Packet IDs**: Detect duplicates
3. **Timeouts**: Handle lost packets
4. **Retries**: Implement exponential backoff
5. **Checksums**: Verify data integrity
