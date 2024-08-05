start-db:
	docker compose -f docker/docker-compose.yaml up db -d

start-app:
	docker compose -f docker/docker-compose.yaml up -d

stop:
	docker compose -f docker/docker-compose.yaml down

prune:
	docker buildx prune -f --verbose

config:
	docker compose -f docker/docker-compose.yaml config