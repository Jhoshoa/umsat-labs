# Docker

> Container platform fundamentals.

## Installation

### Windows
1. Enable WSL2
2. Download Docker Desktop
3. Install and restart

### Linux (Ubuntu)
```bash
# Remove old versions
sudo apt remove docker docker-engine docker.io containerd runc

# Install prerequisites
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# Add user to docker group
sudo usermod -aG docker $USER
```

## Basic Commands

### Image Management
```bash
# Pull image from registry
docker pull nginx:latest

# List images
docker images

# Remove image
docker rmi nginx:latest

# Build image
docker build -t myapp:v1 .
```

### Container Management
```bash
# Run container
docker run -d --name web -p 80:80 nginx

# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop web

# Remove container
docker rm web

# View logs
docker logs web

# Execute command in container
docker exec -it web bash
```

## Dockerfile

```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Define startup command
CMD ["node", "server.js"]
```

### Multi-stage Build

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## Best Practices

### 1. Use Specific Tags
```dockerfile
# Good
FROM node:18.17-alpine

# Avoid
FROM node:latest
```

### 2. Minimize Layers
```dockerfile
# Good
RUN apt-get update && apt-get install -y \
    package1 \
    package2 \
    && rm -rf /var/lib/apt/lists/*

# Avoid
RUN apt-get update
RUN apt-get install -y package1
RUN apt-get install -y package2
```

### 3. Use .dockerignore
```
node_modules
.git
.env
*.log
Dockerfile
docker-compose.yml
```

### 4. Non-root User
```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

## Networking

```bash
# Create network
docker network create mynetwork

# Run container on network
docker run -d --network mynetwork --name db postgres

# Connect existing container
docker network connect mynetwork web
```

## Volumes

```bash
# Create volume
docker volume create mydata

# Mount volume
docker run -v mydata:/data myapp

# Bind mount (development)
docker run -v $(pwd):/app myapp
```

## Docker Registry

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag myapp:v1 username/myapp:v1

# Push to registry
docker push username/myapp:v1
```
