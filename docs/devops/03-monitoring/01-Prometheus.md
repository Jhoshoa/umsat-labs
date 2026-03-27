# Prometheus

> Open-source metrics collection and alerting.

## Overview

Prometheus is a time-series database designed for reliability and scalability in monitoring systems.

## Architecture

```
┌──────────────────────────────────────────┐
│                Prometheus                 │
├──────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Scraper │  │  TSDB   │  │ HTTP    │  │
│  │         │  │         │  │ Server  │  │
│  └────┬────┘  └────┬────┘  └────┬────┘  │
│       │            │            │        │
└───────┼────────────┼────────────┼────────┘
        │            │            │
        ▼            ▼            ▼
   ┌────────┐   ┌────────┐   ┌────────┐
   │ Target │   │ Storage│   │ Grafana│
   │  /app  │   │  Disk  │   │ Alerts │
   └────────┘   └────────┘   └────────┘
```

## Configuration

### prometheus.yml
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

rule_files:
  - "alerts/*.yml"

scrape_configs:
  # Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node exporter
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

  # Application
  - job_name: 'myapp'
    static_configs:
      - targets: ['myapp:8080']
    metrics_path: /metrics

  # Kubernetes service discovery
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
```

## Metric Types

### Counter
Cumulative value that only increases.

```python
from prometheus_client import Counter

request_counter = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

# Usage
request_counter.labels(
    method='GET',
    endpoint='/api/users',
    status='200'
).inc()
```

### Gauge
Value that can go up or down.

```python
from prometheus_client import Gauge

active_connections = Gauge(
    'active_connections',
    'Number of active connections'
)

# Usage
active_connections.inc()
active_connections.dec()
active_connections.set(42)
```

### Histogram
Observations bucketed by value.

```python
from prometheus_client import Histogram

request_latency = Histogram(
    'http_request_duration_seconds',
    'Request latency in seconds',
    buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 5.0]
)

# Usage
with request_latency.time():
    process_request()
```

### Summary
Similar to histogram, calculates percentiles.

```python
from prometheus_client import Summary

request_size = Summary(
    'request_size_bytes',
    'Request size in bytes'
)

# Usage
request_size.observe(len(request.body))
```

## PromQL Queries

### Basic Queries
```promql
# Current value
http_requests_total

# With labels
http_requests_total{method="GET", status="200"}

# Rate (requests per second)
rate(http_requests_total[5m])

# Increase over time
increase(http_requests_total[1h])
```

### Aggregations
```promql
# Sum by label
sum(rate(http_requests_total[5m])) by (endpoint)

# Average
avg(node_memory_usage_bytes) by (instance)

# Top 5
topk(5, rate(http_requests_total[5m]))
```

### Common Patterns
```promql
# Error rate
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))

# 95th percentile latency
histogram_quantile(0.95, rate(http_request_duration_bucket[5m]))

# Memory usage percentage
100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))
```

## Alert Rules

```yaml
# alerts/app.yml
groups:
  - name: application
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: High error rate detected
          description: Error rate is {{ $value | humanizePercentage }}

      - alert: HighLatency
        expr: |
          histogram_quantile(0.95, rate(http_request_duration_bucket[5m])) > 1
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: High latency detected
          description: 95th percentile latency is {{ $value }}s
```

## Instrumenting Applications

### Node.js
```javascript
const client = require('prom-client');

// Enable default metrics
client.collectDefaultMetrics();

// Custom metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5]
});

// Middleware
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});
```
