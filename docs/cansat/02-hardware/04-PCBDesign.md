# PCB Design

> Custom circuit board design for the CanSat.

## Design Requirements

- **Form factor**: Circular, 60mm diameter
- **Layers**: 2 layers (top and bottom)
- **Thickness**: 1.6mm standard
- **Copper weight**: 1oz

## Design Tools

**KiCad 7.0** is used for schematic capture and PCB layout.

### Project Structure

```
cansat-pcb/
├── cansat.kicad_pro    # Project file
├── cansat.kicad_sch    # Schematic
├── cansat.kicad_pcb    # PCB layout
├── gerbers/            # Manufacturing files
├── bom/                # Bill of materials
└── docs/               # Documentation
```

## Schematic Design

### Power Section
- USB-C input for charging
- TP4056 charge controller
- AMS1117-3.3 voltage regulator
- Reverse polarity protection

### MCU Section
- ESP32-WROOM-32 module
- Auto-reset circuit
- Boot mode selection

### Sensor Section
- I2C pull-up resistors (4.7k)
- Decoupling capacitors (100nF)
- ESD protection

### RF Section
- LoRa module footprint
- SMA antenna connector
- Impedance matching (50 ohm)

## PCB Layout Guidelines

### Layer Stack
| Layer | Content |
|-------|---------|
| Top | Components, signals |
| Bottom | Ground plane, signals |

### Design Rules

| Parameter | Value |
|-----------|-------|
| Min trace width | 0.2mm |
| Min spacing | 0.2mm |
| Via drill | 0.3mm |
| Via diameter | 0.6mm |

### RF Considerations
- Keep LoRa antenna trace away from noisy signals
- 50 ohm impedance for antenna feed
- Ground plane under RF section

## Manufacturing

### Gerber Files
Export the following layers:
- Top Copper (F.Cu)
- Bottom Copper (B.Cu)
- Top Silkscreen (F.SilkS)
- Bottom Silkscreen (B.SilkS)
- Top Solder Mask (F.Mask)
- Bottom Solder Mask (B.Mask)
- Drill file (PTH + NPTH)
- Board outline (Edge.Cuts)

### Recommended Manufacturers
- JLCPCB (budget, fast)
- PCBWay (quality, assembly)
- OSH Park (USA, purple)

## Assembly

### Reflow Soldering
1. Apply solder paste (stencil)
2. Place components (pick and place)
3. Reflow in oven (peak 245°C)
4. Inspect and rework if needed

### Hand Soldering Order
1. Smallest SMD components first
2. ICs and modules
3. Connectors
4. Through-hole components
