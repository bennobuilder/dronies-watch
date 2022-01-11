# 💾 Backend
> api.dronies.watch

## 🍪 Session

This backend uses `Discord OAuth2` for authentications,
and reaches back to `Session` (valid for `7 days`) 
for further user assignment and authentication.
The session logic is inspired of the (`Discord OAuth2 Implementation Tutorial`)[https://github.com/stuyy/discord-oauth2-implementation] repository.

### Example Cookie for `Postman`
```
DISCORD_OAUTH_SESSION_ID=s%3ADIEAWKI3fYvmaeLLQuNMcu_1WWqc0kAC.%2Foy9fri87cjVzjCTyuWVasqpZ2%2BngZMEsaE%2FdtMb6QQ; Path=/; Expires=Fri, 08 Jul 2022 09:27:17 GMT;
```

## 🚊 Routes

**GET** /v1/auth/discord/login
- Redirects to the Discord login page.

**GET** /v1/auth/discord/redirect
- Discord redirects to this route once the user clicks the "Authorize" button on Discord's platform.

**GET** /v1/auth/discord/revoke
- Revokes the access token. This unauthorizes the access token from further use on behalf of the authenticated user.

**GET** /v1/user/current
- Retrieves the authenticated user data.

**POST** /v1/games/flappydronie/played
- TODO

## Installation & Instructions
Do you wish to use this code?
Please follow the following instructions on how to set everything up.

**Pre-requisites:**
- Clone this repository
- Run npm install or yarn install
  - Use the sample below as a `.env` or `.env.local` boilerplate. 
    Don't share the value of your variables publicly as these include critical information.
    ```text
    # Express App Server Details
    PORT=9000
    AFTER_OAUTH2_REDIRECT_URI=http://localhost:3000/lab
    BASE_URL=http://localhost:%s
    JSON_PAYLOAD_SECRET="NICE_KEY" # 256bit
    
    # Discord OAuth2 Client Details
    DISCORD_APPLICATION_ID={YOUR_APPLICATION_ID}
    DISCORD_CLIENT_SECRET={YOUR_CLIENT_SECRET}
    DISCORD_REDIRECT_URL=http://localhost:9000/%s/auth/discord/redirect
    
    # Postgres & TypeORM Connection Options
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_NAME=dronies_watch
    DB_SYNC=true
    DB_ENCRYPT_SECRET="NICE_KEY" # 256bit
    
    # Cookie & Session Options
    SESSION_SECRET="NICE_KEY" # 256bit
    ```

## 👨‍🎓 Learnings

### How to Deploy a Heroku Backend to a Netlify Subdomain
- https://mokkapps.de/blog/how-to-deploy-a-heroku-backend-to-a-netlify-subdomain/

### OAuth2 w/ Discord From Scratch
- https://discord.com/developers/docs/topics/oauth2
- https://www.youtube.com/watch?v=RP0P_zGdvj8
- https://www.youtube.com/watch?v=NtS5BkqS6M0

### What is Bearer token and How it works?
- https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/

### How to have value in string represented by %s and then replaced with a value
- https://stackoverflow.com/questions/3318621/javascript-how-to-have-value-in-string-represented-by-s-and-then-replaced-with/35754033

### How to change PostgreSQL user password?
- https://stackoverflow.com/questions/12720967/how-to-change-postgresql-user-password

### Typeorm
- https://typeorm.io/#/
- https://www.youtube.com/watch?v=NtS5BkqS6M0&t=204s
- https://www.youtube.com/watch?v=xt6etYGbPpo

### Writing middleware for use in Express apps
- https://expressjs.com/en/guide/writing-middleware.html#writing-middleware-for-use-in-express-apps

### Error Handler Middleware
- https://www.becomebetterprogrammer.com/how-to-use-error-handler-middleware-with-express-js-and-typescript/

### Secure Express Backend
- https://expressjs.com/en/advanced/best-practice-security.html

### Redis
TODO
- https://adostes.medium.com/adding-a-redis-cache-to-an-express-app-455c834becd1

### Create rate limiter and consume points on every request
- https://adostes.medium.com/adding-a-redis-cache-to-an-express-app-455c834becd1

### TypeORM Relations between Tables
- https://www.youtube.com/watch?v=rKgZLVgdvAY
- https://orkhan.gitbook.io/typeorm/docs/relations
- https://stackoverflow.com/questions/61361008/typeorm-insert-with-relationid

### How to deploy multiple apps in monorepo with Heroku
- https://michaellin.me/deploy-multiple-apps-in-monorepo-to-heroku/

### Deploying a PostgreSQL database on Heroku
- https://www.youtube.com/watch?v=80oty2v4HsE
  ```text
  // Connect to Heroku Database from local end machine
  psql --host=ec2-34-255-225-151.eu-west-1.compute.amazonaws.com --port=5432 --username=htozchapbteyzi --password --dbname=dbuea1u652cemv
  ```

### Unable to connect to Heroku Postgres
```
There was an error initializing DB: no pg_hba.conf entry for host "x", user "y", database "z", SSL off
```
https://community.n8n.io/t/unable-to-connect-to-heroku-postgres-in-0-104-0/4721

### Learn Docker - DevOps with Node.js & Express
- https://www.youtube.com/watch?v=9zUHg7xjIqQ

### CORS: credentials mode is 'include'
- https://stackoverflow.com/questions/42803394/cors-credentials-mode-is-include
- http://50linesofco.de/post/2017-03-06-cors-a-guided-tour
- https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
