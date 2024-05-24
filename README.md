<p align="center">
  <a href="https://astuto.io/?utm_campaign=github_logo&utm_source=github.com">
    <img width="400" src="./images/logo-and-name.png" />
  </a>
</p>
<p align="center">
  <a href="https://www.producthunt.com/posts/astuto?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-astuto" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=179870&theme=neutral&period=daily" alt="Astuto - An open source customer feedback tool 🦊 | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>
  <br>
  <p align="center" style="font-size:20pt">
    <a href="https://feedback.astuto.io/">✨ Try it out</a>
    &nbsp;•&nbsp;
    <a href="https://astuto.io/?utm_campaign=github_learnmore&utm_source=github.com">📖 Learn more</a>
  </p>
</p>

Astuto is an open source customer feedback tool. It helps you collect, manage and prioritize feedback from your customers, so you can build a better product.

<a href="https://feedback.astuto.io/">
  <img src="./images/hero-image.png" />
</a>

## Get started

### Hosted

We offer a hosted solution, so you don't have to provision your own server. This is the easiest and fastest way to get started: you can sign up and start collecting feedback in a few minutes.

[Start your 7-day free trial](https://login.astuto.io/signup) without entering any payment method, then it's 15 €/month with annual subscription or 20 €/month with monthly subscription. [Learn more on astuto.io](https://astuto.io/?utm_campaign=github_getstarted&utm_source=github.com).

With the paid plan:

- You avoid deployment hassles like renting a server, issuing SSL certificates, configuring a mail server and managing updates
- You get some OAuth providers out of the box: Google, Facebook and GitHub are ready to log your users in, no configuration needed
- You get priority support
- You support open source and get our eternal gratitude :)

### Self-hosted

0. Ensure you have Docker and Docker Compose installed
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
3. Edit the environment variables to fit your needs. You can find more information about env variables in the [documentation](https://docs.astuto.io/deploy-docker#2-edit-the-environment-variables-in-the-docker-compose-file).
4. Run `docker compose pull`
5. Run `docker compose up`
6. You should now have a running instance of Astuto on port 3000. A default user account has been created with credentials email: `admin@example.com`, password: `password`.

**Note**: if you are on Linux and you encounter permission denied errors when running Docker commands, try to run them as administrator.

## Documentation

Check out [docs.astuto.io](https://docs.astuto.io/) to learn how to deploy Astuto, configure custom OAuth providers, customize appearance and more!

## Contributing

There are many ways to contribute to Astuto, not just coding. Proposing features, reporting issues, translating to a new language or improving documentation are a few examples! Please read our [contributing guidelines](https://github.com/riggraz/astuto/blob/main/CONTRIBUTING.md) to learn more.

## Credits

Astuto logo and all image assets are credited [here](https://astuto.io/credits).

A huge thank you to code contributors

<a href="https://github.com/riggraz/astuto/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=riggraz/astuto" />
</a>

and [translation contributors](https://crowdin.com/project/astuto/members)!