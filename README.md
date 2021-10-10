# Inventory-app

## Home Inventory Management Application.

First To start the docker compose file run. This will run a Two docker containers One is localstack that is used for testing AWS S3 bucket. The second is a Postgress database with adminer as a visual for the database. Now you will need to rename the .env.sample file to .env. This will load the enviroment varibles for both the node application and Docker Files
```
docker-compose up
```

Now we need to Create the database but luckily this is pretty easy with knex. For this we will need to install knex globaly.

```
npm install -g knex
```
So now we have knex installed globaly it's time to create the tables in the database. This can be done by running the Knex Miagrate function
```
knex migrate:latest
```
Alright They tables are now created. If you want i have create some Demo Seed data that you can seed the database with.

To seed the database we need to run the knex seed:run command

```
knex seed:run
```
