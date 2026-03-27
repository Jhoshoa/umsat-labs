# Grafana

> Visualization and dashboarding platform.

## Installation

### Docker
```bash
docker run -d \
  --name grafana \
  -p 3000:3000 \
  -v grafana-storage:/var/lib/grafana \
  grafana/grafana:latest
```

### Access
- URL: http://localhost:3000
- Default login: admin/admin

## Data Sources

### Adding Prometheus

1. Go to Configuration → Data Sources
2. Click "Add data source"
3. Select "Prometheus"
4. Set URL: `http://prometheus:9090`
5. Click "Save & Test"

## Dashboard JSON

### Basic Dashboard
```json
{
  "dashboard": {
    "title": "Application Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "gridPos": { "x": 0, "y": 0, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{endpoint}}"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "gauge",
        "gridPos": { "x": 12, "y": 0, "w": 6, "h": 8 },
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100"
          }
        ],
        "options": {
          "thresholds": {
            "steps": [
              { "color": "green", "value": 0 },
              { "color": "yellow", "value": 1 },
              { "color": "red", "value": 5 }
            ]
          }
        }
      },
      {
        "title": "Latency (p95)",
        "type": "stat",
        "gridPos": { "x": 18, "y": 0, "w": 6, "h": 8 },
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_bucket[5m]))"
          }
        ],
        "options": {
          "unit": "s"
        }
      }
    ]
  }
}
```

## Panel Types

### Time Series
Best for metrics over time.

```json
{
  "type": "timeseries",
  "targets": [
    {
      "expr": "rate(http_requests_total[5m])",
      "legendFormat": "{{instance}}"
    }
  ],
  "fieldConfig": {
    "defaults": {
      "custom": {
        "lineWidth": 2,
        "fillOpacity": 10
      }
    }
  }
}
```

### Stat Panel
Single value display.

```json
{
  "type": "stat",
  "targets": [
    {
      "expr": "sum(up)"
    }
  ],
  "options": {
    "colorMode": "value",
    "graphMode": "area"
  }
}
```

### Gauge
Percentage or threshold-based.

```json
{
  "type": "gauge",
  "targets": [
    {
      "expr": "avg(node_cpu_seconds_total{mode=\"idle\"})"
    }
  ],
  "fieldConfig": {
    "defaults": {
      "min": 0,
      "max": 100,
      "thresholds": {
        "mode": "absolute",
        "steps": [
          { "color": "red", "value": 0 },
          { "color": "yellow", "value": 50 },
          { "color": "green", "value": 80 }
        ]
      }
    }
  }
}
```

### Table
Tabular data display.

```json
{
  "type": "table",
  "targets": [
    {
      "expr": "topk(10, rate(http_requests_total[5m]))",
      "format": "table"
    }
  ],
  "transformations": [
    {
      "type": "organize",
      "options": {
        "renameByName": {
          "Value": "Requests/s"
        }
      }
    }
  ]
}
```

## Variables

### Query Variable
```json
{
  "name": "instance",
  "type": "query",
  "query": "label_values(up, instance)",
  "refresh": 1
}
```

Usage in queries:
```promql
rate(http_requests_total{instance="$instance"}[5m])
```

### Interval Variable
```json
{
  "name": "interval",
  "type": "interval",
  "options": {
    "values": ["1m", "5m", "15m", "30m", "1h"]
  }
}
```

Usage:
```promql
rate(http_requests_total[$interval])
```

## Alerting

### Creating Alert Rule

1. Edit panel → Alert tab
2. Create alert rule
3. Define conditions:

```yaml
# Alert condition
when: avg()
of: query(A, 5m, now)
is above: 0.9
```

### Notification Channels

Configure in Alerting → Notification channels:

- Email
- Slack
- PagerDuty
- Webhook
- Microsoft Teams

### Alert Annotations

```yaml
summary: "High CPU usage on {{ $labels.instance }}"
description: "CPU usage is {{ $value | printf \"%.2f\" }}%"
runbook_url: "https://wiki.example.com/runbooks/high-cpu"
```

## Provisioning

### Datasources
```yaml
# provisioning/datasources/prometheus.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
```

### Dashboards
```yaml
# provisioning/dashboards/default.yml
apiVersion: 1

providers:
  - name: 'default'
    folder: ''
    type: file
    disableDeletion: false
    editable: true
    options:
      path: /var/lib/grafana/dashboards
```

## Docker Compose Setup

```yaml
services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - ./provisioning:/etc/grafana/provisioning
      - ./dashboards:/var/lib/grafana/dashboards
      - grafana-data:/var/lib/grafana
```
