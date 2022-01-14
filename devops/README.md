### `.env.server`

```text
# Express App Server Details
APP_PORT=9000
APP_AFTER_OAUTH2_REDIRECT_URI=https://dronies.watch/lab
APP_BASE_URL=https://api.dronies.watch
APP_JSON_PAYLOAD_SECRET="NICE_KEY" # 256bit
APP_CORS_ORIGIN=https://dronies.watch

# Discord OAuth2 Client Details
DISCORD_APPLICATION_ID={YOUR_APPLICATION_ID}
DISCORD_CLIENT_SECRET={YOUR_CLIENT_SECRET}

# Postgres & TypeORM Connection Options
DB_HOST=db # https://stackoverflow.com/questions/33357567/econnrefused-for-postgres-on-nodejs-with-dockers
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=dronies_watch
DB_SYNC=true
DB_ENCRYPT_SECRET="NICE_KEY" # 256bit

# Cookie & Session Options
SESSION_SECRET="NICE_KEY" # 256bit
```

### `.env.db`

```text
POSTGRES_USER=postgres # The PostgreSQL user (useful to connect to the database)
POSTGRES_PASSWORD=postgres # The PostgreSQL password (useful to connect to the database)
POSTGRES_DB=dronies_watch # The PostgreSQL default database (automatically created at first launch)
```
