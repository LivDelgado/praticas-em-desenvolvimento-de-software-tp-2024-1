restart: stop start

setup: build start migrate

start:
	docker-compose up -d

stop:
	docker-compose down

migrate:
	docker exec -it api sh -c "npm run migrations"

logs:
	docker-compose logs --follow

build:
	docker-compose build

ps:
	docker-compose ps

