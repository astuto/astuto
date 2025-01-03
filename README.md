<p align="center">
  <a href="https://astuto.io/?utm_campaign=github_logo&utm_source=github.com">
    <img width="400" src="./images/logo-and-name.png" />
  </a>
</p>
<p align="center">
  <a href="https://www.producthunt.com/posts/astuto?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-astuto" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=179870&theme=neutral&period=daily" alt="Astuto - An open source customer feedback tool 🦊 | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>
  <br>
  <h3 align="center">
    <a href="https://feedback.astuto.io/">✨ Try it out</a>
    &nbsp;•&nbsp;
    <a href="https://astuto.io/?utm_campaign=github_learnmore&utm_source=github.com">📖 Learn more</a>
  </h3>
</p>

Astuto is an open source customer feedback tool. It helps you collect, manage and prioritize feedback from your customers, so you can build a better product.

<a href="https://feedback.astuto.io/">
  <img src="./images/hero-image.png" />
</a>

## Features

- **Roadmap**: show users what you're working on
- **Simple Sign In**: let users log in with email or any OAuth2 provider
- **Webhooks**: integrate with your existing tools (e.g. Jira, Trello, Slack)
- **API**: programmatically manage your feedback space with our REST API
- **Moderation Queue**: decide whether to show new feedback immediately or request approval
- **Anonymous Feedback**: enable unregistered users to publish feedback
- **... and more**: invitation system, brand customization, recap emails for administrators, private site settings, and more!

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

Read the [Deploy with Docker instructions](https://docs.astuto.io/deploy-docker) for the most comprehensive and up to date guide on installing and configuring Astuto.

What you find below are minimal instructions to get you started as quickly as possible:

0. Ensure you have Docker and Docker Compose installed
1. Create an empty folder
2. Inside that folder, create a `docker-compose.yml` file with the following content:
```
services:
  db:
    image: postgres:14.5
    environment: &db-env
      POSTGRES_USER: yourpostgresusername
      POSTGRES_PASSWORD: yourpostgrespassword
    volumes:
      - dbdata:/var/lib/postgresql/data
  web:
    image: riggraz/astuto:latest
    environment:
      <<: *db-env
      BASE_URL: http://yourwebsite.com
      SECRET_KEY_BASE: yoursecretkeybase
    ports:
      - "3000:3000"
    depends_on:
      - db
    
volumes:
  dbdata:
```
3. Edit the environment variables to fit your needs. You can find more information about env variables in the [documentation](https://docs.astuto.io/deploy-docker/#2-edit-environment-variables).
4. Run `docker compose pull && docker compose up`
5. You should now have a running instance of Astuto on port 3000. A default user account has been created with credentials email: `admin@example.com`, password: `password`.

## Documentation

Check out [docs.astuto.io](https://docs.astuto.io/) to learn how to deploy Astuto, configure custom OAuth providers and webhooks, use our REST API and more!

## Contributing

There are many ways to contribute to Astuto, not just coding. Proposing features, reporting issues, translating to a new language or improving documentation are a few examples! Please read our [contributing guidelines](https://github.com/riggraz/astuto/blob/main/CONTRIBUTING.md) to learn more.

## Credits

Astuto logo and all image assets are credited [here](https://astuto.io/credits).

A huge thank you to code contributors

<a href="https://github.com/riggraz/astuto/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=riggraz/astuto" />
</a>

and [translation contributors](https://crowdin.com/project/astuto/members)!
