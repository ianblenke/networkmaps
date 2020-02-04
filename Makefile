up:
	docker-compose build
	docker-compose up --force-recreate -d

logs:
	docker-compose logs -f

down:
	docker-compose down -f

