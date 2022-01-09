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

**PUT** /v1/games/flappydronie/played
- TODO

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
