# 🐦`Flappy Dronie`

> Created for the [Dronies Contest](https://twitter.com/DroniesNFT/status/1471944344009543682) (Category: `Coding/Web`)

<img src="https://raw.githubusercontent.com/bennodev19/dronies-watch/master/static/website-capture.png" alt="Website Image">

## 🌝 Design

The design is heavily inspired by [droniesnft.com](https://droniesnft.com)
as this is a fan project for them.
You can find the particular design for this website 
and all its included games in [this](https://www.figma.com/file/pVgHta34xTBu2XbidHpmDo/?node-id=21%3A959) Figma File.


## 📄 Sprite Sheets

### 🐦 Flappy Dronie
<img src="https://raw.githubusercontent.com/bennodev19/dronies-watch/master/client/src/assets/games/flappydronie/sheet.png" alt="Flappy Dronie Spritesheet">

## 👾 Deploy Architecture

<img src="https://raw.githubusercontent.com/bennodev19/dronies-watch/master/static/deploy-architecture.png" alt="Deploy Architecture">

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

### Transfer Files to Server via `FileZilla`
- https://docs.digitalocean.com/products/droplets/how-to/transfer-files/#:~:text=Transfer%20Files%20with%20FileZilla,-Once%20connected%20to&text=Right%2Dclick%20the%20file%20you,download%20to%20your%20local%20machine.

### SSL Certification with [`Certbot`](https://certbot.eff.org/)
- https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal

### Setup `NGINX` Docker Container
- https://www.youtube.com/watch?v=hxngRDmHTM0
