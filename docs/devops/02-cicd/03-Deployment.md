# Deployment Strategies

> Safe and reliable deployment techniques.

## Deployment Patterns

### 1. Rolling Deployment

Gradually replace old instances with new ones.

```yaml
# Kubernetes rolling update
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Max extra pods during update
      maxUnavailable: 0  # Always maintain full capacity
```

**Pros**: Zero downtime, resource efficient
**Cons**: Mixed versions during rollout

### 2. Blue-Green Deployment

Maintain two identical environments, switch traffic instantly.

```
┌─────────────┐     ┌─────────────┐
│   Blue      │     │   Green     │
│   (Live)    │     │   (Idle)    │
│   v1.0      │     │   v1.1      │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └────────┬──────────┘
                │
         ┌──────┴──────┐
         │   Router    │
         │   (Switch)  │
         └─────────────┘
```

```yaml
# Blue deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: blue

---
# Green deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: green

---
# Service (switch by updating selector)
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
    version: blue  # Change to 'green' to switch
```

**Pros**: Instant rollback, full testing before switch
**Cons**: Double resources required

### 3. Canary Deployment

Route small percentage of traffic to new version.

```
                Traffic Split
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────┴────┐            ┌─────┴─────┐
    │  95%    │            │    5%     │
    │ Stable  │            │  Canary   │
    │  v1.0   │            │   v1.1    │
    └─────────┘            └───────────┘
```

```yaml
# Using Istio VirtualService
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp
spec:
  hosts:
    - myapp
  http:
    - route:
        - destination:
            host: myapp
            subset: stable
          weight: 95
        - destination:
            host: myapp
            subset: canary
          weight: 5
```

**Pros**: Low risk, real user testing
**Cons**: Complex routing, monitoring required

### 4. Feature Flags

Deploy code disabled, enable for specific users.

```typescript
// Feature flag check
if (featureFlags.isEnabled('new-checkout', user)) {
  return <NewCheckout />;
}
return <LegacyCheckout />;
```

**Pros**: Decouple deploy from release, A/B testing
**Cons**: Code complexity, flag management

## Rollback Strategies

### Automatic Rollback

```yaml
# GitHub Actions with rollback
- name: Deploy
  run: |
    kubectl apply -f k8s/
    kubectl rollout status deployment/myapp --timeout=5m
  continue-on-error: true
  id: deploy

- name: Rollback on failure
  if: steps.deploy.outcome == 'failure'
  run: |
    kubectl rollout undo deployment/myapp
```

### Kubernetes Rollback

```bash
# View rollout history
kubectl rollout history deployment/myapp

# Rollback to previous version
kubectl rollout undo deployment/myapp

# Rollback to specific revision
kubectl rollout undo deployment/myapp --to-revision=2
```

## Health Checks

### Kubernetes Probes

```yaml
spec:
  containers:
    - name: myapp
      livenessProbe:
        httpGet:
          path: /health
          port: 8080
        initialDelaySeconds: 30
        periodSeconds: 10

      readinessProbe:
        httpGet:
          path: /ready
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 5

      startupProbe:
        httpGet:
          path: /startup
          port: 8080
        failureThreshold: 30
        periodSeconds: 10
```

### Health Endpoint

```typescript
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: checkDatabase(),
      redis: checkRedis(),
      memory: checkMemory()
    }
  };

  const isHealthy = Object.values(health.checks)
    .every(check => check.status === 'ok');

  res.status(isHealthy ? 200 : 503).json(health);
});
```

## Deployment Checklist

- [ ] All tests passing
- [ ] Security scan completed
- [ ] Database migrations ready
- [ ] Feature flags configured
- [ ] Monitoring alerts set up
- [ ] Rollback plan documented
- [ ] Team notified
- [ ] On-call engineer aware
