# Antenna Design

> Antenna types and construction for LoRa.

## Antenna Fundamentals

### Wavelength Calculation

```
λ = c / f

At 868 MHz: λ = 299792458 / 868000000 = 0.345 m = 34.5 cm
At 433 MHz: λ = 299792458 / 433000000 = 0.692 m = 69.2 cm
At 915 MHz: λ = 299792458 / 915000000 = 0.328 m = 32.8 cm
```

### Common Antenna Lengths

| Type | Formula | 868 MHz | 433 MHz | 915 MHz |
|------|---------|---------|---------|---------|
| 1/4 Wave | λ/4 | 8.6 cm | 17.3 cm | 8.2 cm |
| 1/2 Wave | λ/2 | 17.3 cm | 34.6 cm | 16.4 cm |
| 5/8 Wave | 5λ/8 | 21.6 cm | 43.3 cm | 20.5 cm |

## Antenna Types

### 1/4 Wave Monopole

**Simplest and most common**

```
Construction:
1. Cut wire to λ/4 length
2. Solder to antenna pad/connector
3. Requires ground plane (PCB, metal surface)

Gain: 0 dBi (with ground plane)
Pattern: Omnidirectional (horizontal)
```

### Dipole

**Better performance, no ground plane needed**

```
      λ/4
    ←─────→
    ═══════╤═══════
           │
         Feed
           │
    ═══════╧═══════
    ←─────→
      λ/4

Gain: 2.15 dBi
Pattern: Omnidirectional (figure-8 vertical)
```

### Ground Plane Antenna

**Improved 1/4 wave with radials**

```
        │ Vertical element (λ/4)
        │
    ────┼────  4 radials at 45°
   /    │    \
  /     │     \

Gain: ~2 dBi
Pattern: Omnidirectional with lower angle
```

### Yagi-Uda

**Directional, high gain**

```
   Reflector  Driven  Directors
      │        │      │  │  │
      │        │      │  │  │
      │        │      │  │  │
      │        │      │  │  │
      ←────────────────────→
              Direction

Gain: 6-15 dBi (depends on elements)
Pattern: Directional beam
```

## DIY Antenna Construction

### Simple 1/4 Wave Whip (868 MHz)

Materials:
- Solid core wire (1.5-2mm diameter)
- SMA connector

Steps:
1. Cut wire to 86mm (with 5mm for soldering)
2. Strip 5mm insulation
3. Solder to SMA center pin
4. Ensure vertical orientation

### Coaxial Collinear

Higher gain omnidirectional:

```
      86mm    86mm    86mm
    ┌─────┐ ┌─────┐ ┌─────┐
    │     │ │     │ │     │  Outer conductor
    │     │ │     │ │     │
    ╞═════╡ ╞═════╡ ╞═════╡  Inner conductor
          ↑       ↑
        Phasing sections

Gain: ~5 dBi
```

## Antenna Matching

### SWR (Standing Wave Ratio)

| SWR | Power Loss | Status |
|-----|------------|--------|
| 1.0 | 0% | Perfect |
| 1.5 | 4% | Good |
| 2.0 | 11% | Acceptable |
| 3.0 | 25% | Poor |
| 5.0 | 44% | Bad |

### Impedance Matching
LoRa modules expect 50Ω antenna impedance.

## Commercial Antennas

| Type | Gain | Use Case | Price |
|------|------|----------|-------|
| Rubber duck | 2 dBi | Portable | $5-10 |
| Fiberglass omni | 5-8 dBi | Gateway outdoor | $30-60 |
| Yagi | 10-15 dBi | Point-to-point | $40-80 |
| Panel | 8-12 dBi | Building coverage | $50-100 |

## Installation Tips

1. **Height matters**: Every meter of height = ~3dB gain
2. **Clear line of sight**: Avoid obstructions
3. **Vertical orientation**: For omni antennas
4. **Weatherproof**: Use outdoor-rated for exterior
5. **Lightning protection**: Ground properly
