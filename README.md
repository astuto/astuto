<p align="center"><img width="400" src="./images/logo-and-name.png" /></p>
<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/riggraz/astuto?color=black&style=flat">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/riggraz/astuto?color=black&style=flat">
  <br>
  <a href="https://www.producthunt.com/posts/astuto?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-astuto" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=179870&theme=dark&period=daily" alt="Astuto - An open source customer feedback tool 🦊 | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>
</p>

<h3 align="center"><a href="http://65.21.148.99:3000/">Try the demo out</a></h3>
<h5 align="center">To login as administrator:<br />email: admin@example.com | pass: password</h5>

## What is Astuto?

Astuto is a free, open source, self-hosted customer feedback tool. It helps you collect, manage and prioritize feedback from your users. It has been heavely inspired by [Canny.io](https://canny.io/) ("astuto", indeed, is the italian translation of the word "canny").

<img src="./images/featured-image.png" />

## Features

* Collect and manage feedback
* Create custom boards and statuses, to better organize feedback
* Customize your roadmap, to let your users know what you're working on
* Many more...

## Requirements

* Docker ([installation instructions](https://docs.docker.com/install/))
* Docker Compose ([installation instructions](https://docs.docker.com/compose/install/))

## Installation

### DockerHub image (fastest, for production)

1. Create an empty folder
2. Inside that folder, create a `docker-compose.yml` file with the following content:
```
version: '3.4'
services:
  db:
    image: postgres:14.5
    environment:
      POSTGRES_USER: yourpostgresusername
      POSTGRES_PASSWORD: yourpostgrespassword
    volumes:
      - dbdata:/var/lib/postgresql/data
  web:
    image: riggraz/astuto:latest
    environment:
      POSTGRES_USER: yourpostgresusername
      POSTGRES_PASSWORD: yourpostgrespassword
      BASE_URL: http://yourwebsite.com
      SECRET_KEY_BASE: yoursecretkeybase
    ports:
      - "3000:3000"
    depends_on:
      - db
    
volumes:
  dbdata:
```
3. Edit the environment variables to fit your needs
4. Run `docker-compose pull`
5. Run `docker-compose up`
6. You should now have a running instance of Astuto on port 3000. A default user account has been created with credentials email: `admin@example.com`, password: `password`.

### GitHub repository (for development)

**Note**: this installation method is suggested for developers and contributors. If you just want to deploy your Astuto instance or try it out, we recommend to follow the above DockerHub installation instructions.

See [contributing guidelines](https://github.com/riggraz/astuto/blob/main/CONTRIBUTING.md).

## Contributing

You are welcome to contribute:
* Read our [contributing guidelines](https://github.com/riggraz/astuto/blob/main/CONTRIBUTING.md)
* Join the [Discord channel](https://discord.gg/SrtUMRp) to get in touch

A huge thank you to all people who contributed:

<a href="https://github.com/riggraz/astuto/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=riggraz/astuto" />
</a>
