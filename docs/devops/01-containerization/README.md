---
displayed_sidebar: devopsSidebar
---

# Containerization

> Docker and container orchestration.

## Contents

| # | Topic | Description |
|---|-------|-------------|
| 1 | [Docker](./01-Docker.md) | Container basics |
| 2 | [Docker Compose](./02-DockerCompose.md) | Multi-container apps |
| 3 | [Kubernetes](./03-Kubernetes.md) | Container orchestration |

## Why Containers?

- **Consistency**: Same environment everywhere
- **Isolation**: Dependencies don't conflict
- **Portability**: Run anywhere Docker runs
- **Efficiency**: Lighter than VMs
- **Scalability**: Easy to scale horizontally

## Container vs VM

```
┌─────────────────────────────────┐
│        Virtual Machines         │
├─────────┬─────────┬─────────────┤
│  App A  │  App B  │    App C    │
├─────────┼─────────┼─────────────┤
│ Guest OS│ Guest OS│   Guest OS  │
├─────────┴─────────┴─────────────┤
│         Hypervisor              │
├─────────────────────────────────┤
│         Host OS                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│          Containers             │
├─────────┬─────────┬─────────────┤
│  App A  │  App B  │    App C    │
├─────────┴─────────┴─────────────┤
│       Container Runtime         │
├─────────────────────────────────┤
│         Host OS                 │
└─────────────────────────────────┘
```

## Prerequisites

- Linux, macOS, or Windows with WSL2
- Docker Desktop or Docker Engine
- Basic command line knowledge
