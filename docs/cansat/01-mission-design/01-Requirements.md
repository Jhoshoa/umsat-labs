# Mission Requirements

> Defining the requirements and constraints for the CanSat mission.

## Functional Requirements

### Primary Mission
1. **FR-001**: The CanSat shall measure atmospheric pressure during descent
2. **FR-002**: The CanSat shall measure temperature at 1Hz minimum
3. **FR-003**: The CanSat shall transmit telemetry to ground station
4. **FR-004**: The CanSat shall record GPS position

### Secondary Mission
1. **FR-101**: The system shall capture images during descent
2. **FR-102**: The system shall measure UV radiation levels

## Non-Functional Requirements

### Performance
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | Telemetry rate | 1 Hz minimum |
| NFR-002 | RF range | 1 km minimum |
| NFR-003 | Battery life | 2 hours minimum |

### Physical Constraints
| Parameter | Constraint |
|-----------|------------|
| Diameter | Max 66mm |
| Height | Max 115mm |
| Mass | Max 350g |

## Verification Matrix

| Requirement | Verification Method |
|-------------|---------------------|
| FR-001 | Altitude chamber test |
| FR-002 | Thermal chamber test |
| FR-003 | Range test |
| FR-004 | GPS accuracy test |

## References

- Competition rules document
- Previous mission reports
