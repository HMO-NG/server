# Start DB Only
```bash
docker compose -f docker/docker-compose.yaml up db -d
```

# Start Application
```bash
docker compose -f docker/docker-compose.yaml up -d
```

# Stop Application
```bash
docker compose -f docker/docker-compose.yaml down
```