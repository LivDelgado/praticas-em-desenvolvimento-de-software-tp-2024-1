restart: stop start

setup: build start migrate

create-migrations: build start generate-migrations

present: setup seed

start:
	docker-compose up -d

stop:
	docker-compose down

generate-migrations:
	docker exec -it api sh -c "npm run generate-migration migrations/$(migrationName)" 

migrate:
	docker exec -it api sh -c "npm run migrations"

logs:
	docker-compose logs --follow

build:
	docker-compose build

ps:
	docker-compose ps

seed:
	docker exec -it postgres sh -c "psql < seed.sql"
	
