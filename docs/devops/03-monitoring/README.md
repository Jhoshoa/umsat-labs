---
displayed_sidebar: devopsSidebar
---

# Monitoring

> Observability stack for infrastructure and applications.

## Contents

| # | Topic | Description |
|---|-------|-------------|
| 1 | [Prometheus](./01-Prometheus.md) | Metrics collection |
| 2 | [Grafana](./02-Grafana.md) | Visualization dashboards |

## Observability Pillars

```plantuml
@startuml
skinparam monochrome false

rectangle "Observability" {
  rectangle "Metrics" as M
  rectangle "Logs" as L
  rectangle "Traces" as T
}

note right of M : Numbers over time\nPrometheus, InfluxDB
note right of L : Event records\nLoki, ELK Stack
note right of T : Request flows\nJaeger, Zipkin

@enduml
```

## Stack Overview

| Component | Purpose | Tool |
|-----------|---------|------|
| Metrics | Collect measurements | Prometheus |
| Visualization | Dashboards | Grafana |
| Logs | Aggregate logs | Loki |
| Alerting | Notifications | Alertmanager |
| Tracing | Distributed tracing | Jaeger |

## Architecture

```plantuml
@startuml
skinparam monochrome false

rectangle "Applications" {
  [Service A] as SA
  [Service B] as SB
  [Service C] as SC
}

rectangle "Collection" {
  [Prometheus] as PROM
  [Loki] as LOKI
}

rectangle "Storage" {
  database "Time Series DB" as TSDB
  database "Log Storage" as LOGS
}

rectangle "Visualization" {
  [Grafana] as GRAF
}

rectangle "Alerting" {
  [Alertmanager] as ALERT
  [PagerDuty] as PD
  [Slack] as SLACK
}

SA --> PROM : Metrics
SB --> PROM : Metrics
SC --> PROM : Metrics

SA --> LOKI : Logs
SB --> LOKI : Logs
SC --> LOKI : Logs

PROM --> TSDB
LOKI --> LOGS

TSDB --> GRAF
LOGS --> GRAF

PROM --> ALERT
ALERT --> PD
ALERT --> SLACK

@enduml
```

## Quick Start with Docker Compose

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana

  alertmanager:
    image: prom/alertmanager:latest
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml

volumes:
  prometheus-data:
  grafana-data:
```

## Key Metrics to Monitor

### System Metrics
- CPU usage
- Memory usage
- Disk I/O
- Network traffic

### Application Metrics
- Request rate
- Error rate
- Response latency
- Active connections

### Business Metrics
- User signups
- Orders placed
- Revenue
- Conversion rate

## Golden Signals

Google's four golden signals for monitoring:

1. **Latency**: Time to serve requests
2. **Traffic**: Demand on the system
3. **Errors**: Rate of failed requests
4. **Saturation**: How "full" the system is
