## 🔨 Config Files

### `.env.server`

```text
# Express App Server Details
APP_PORT=9000
APP_AFTER_OAUTH2_REDIRECT_URI=https://dronies.watch/lab
APP_BASE_URL=https://api.dronies.watch
APP_JSON_PAYLOAD_SECRET={NICE_256BIT_KEY}
APP_CORS_ORIGIN=https://dronies.watch

# Discord OAuth2 Client Details
DISCORD_APPLICATION_ID={YOUR_APPLICATION_ID}
DISCORD_CLIENT_SECRET={YOUR_CLIENT_SECRET}

# Postgres & TypeORM Connection Options
DB_HOST=dronies-watch-db # https://stackoverflow.com/questions/33357567/econnrefused-for-postgres-on-nodejs-with-dockers
DB_PORT=5001
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=dronies_watch
DB_SYNC=true
DB_ENCRYPT_SECRET={NICE_256BIT_KEY}

# Cookie & Session Options
SESSION_SECRET={NICE_256BIT_KEY}
```

### `.env.db`

```text
POSTGRES_USER=postgres # The PostgreSQL user (useful to connect to the database)
POSTGRES_PASSWORD=postgres # The PostgreSQL password (useful to connect to the database)
POSTGRES_DB=dronies_watch # The PostgreSQL default database (automatically created at first launch)
```

---

## 👨‍💻 Get Started

### What Container?
> https://www.docker.com/resources/what-container

A container is a standard unit of software that packages up code
and all its dependencies so the application runs quickly and reliably
from one computing environment to another.
A Docker container image is a lightweight, standalone, executable package of software
that includes everything needed to run an application: code, runtime, system tools,
system libraries and settings.

<img src="https://raw.githubusercontent.com/bennodev19/dronies-watch/master/static/docker-containers.png" alt="Docker Containers">

### Docker Hub?
> https://hub.docker.com/

Package and publish apps and plugins as containers in Docker Hub for easy download and deployment.

### Create `ssh` key

```shell
> cd dronies-watch
> mkdir .ssh # is git ignored
> ssh-keygen
```

### Connect to Server via `ssh`

```shell
ssh -i [SSH-KEY-NAME] root@[IP-ADDRESS]

# Example
> cd donries-watch/.ssh
> ssh -i digital-ocean-droplet root@164.92.235.98
```

### Transfer Files to Server (Droplet) via `FileZilla`
- https://docs.digitalocean.com/products/droplets/how-to/transfer-files/#:~:text=Transfer%20Files%20with%20FileZilla,-Once%20connected%20to&text=Right%2Dclick%20the%20file%20you,download%20to%20your%20local%20machine.

### SSL Certification with [`Certbot`](https://certbot.eff.org/)
- https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal

### Install and Setup `NGINX`
- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
- https://blog.logrocket.com/how-to-run-a-node-js-server-with-nginx/
- https://www.youtube.com/watch?v=hf8wUUrGCgU&list=LL&index=1&t=1746s
- https://www.youtube.com/watch?v=MP3Wm9dtHSQ

### Free `SSL` Certificates with `Certbot`
- https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
