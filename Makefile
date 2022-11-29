# Команды для NPM
start:
	npm start

update-win:
	npm run update:packages:windows

update-lin:
	npm run update:packages:linux


# Команды для Docker
docker-build: 
	docker build -t netman-web-app-crm-image:latest .

docker-run:
	docker run -d -p 3000:3000 --env-file .env --rm --name netman-web-app-crm netman-web-app-crm-image:latest

docker-run-dev:
	docker run -d -p 3000:3000 -v "C:\Projects\DevelopmentProjects\rental-housing\web-app-client:/netman-web-app-crm" -v /netman-web-app-crm/node_modules --env-file .env --rm --name netman-web-app-crm netman-web-app-crm-image:latest 

docker-stop:
	docker stop netman-web-app-crm

docker-start:
	docker start netman-web-app-crm