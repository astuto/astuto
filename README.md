<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/riggraz/astuto?color=black&style=flat">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/riggraz/astuto?color=black&style=flat">
  <br>
</p>

---

- [What is Astuto?](#what-is-astuto)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Post-installation notes](#post-installation-notes)
- [Contributing](#contributing)

---

## What is Astuto?

Astuto is self-hosted customer feedback tool. It helps you collect, manage and prioritize feedback from your users.
It has been heavely inspired by [Canny.io](https://canny.io/) ("astuto", indeed, is the italian translation of the word "canny").

<img src="./images/featured-image.png" />

## Features

* Collect and manage feedback
* Boards, to divide different types of feedback
* Roadmap, to let your users know what you're working on
* Comments, to discuss with your customers
* Notifications, to inform post owner of comments
* Feedback labels, to inform about the state of a certain feedback
* Feedback updates, to notify your users with news regarding a certain feedback
* Completely customizable (i.e. you can add/edit/remove as many boards, feedback statuses as you want; you can configure the roadmap the way you want; etc.)
* Admin panel (multiple admins/moderators allowed)
* Dark mode

## Requirements

* Docker ([installation instructions](https://docs.docker.com/install/))
* Docker Compose ([installation instructions](https://docs.docker.com/compose/install/))

## Installation

**Note**: it is strongly suggested to run Astuto on Linux or macOS. As of today, Windows is likely to [cause problems](https://github.com/riggraz/astuto/wiki/Common-problems#standard_init_linuxgo211-exec-user-process-caused-no-such-file-or-directory). If you want to try anyway, follow along with the [Windows users installation guide](https://github.com/riggraz/astuto/wiki/Installation-for-Windows-users).

1. Ensure that you have the required software installed.
2. Clone this repository.
3. In Astuto's root directory, create a file named `.env` and fill it with the required environment variables (see `.env-example` for an example and check [this wiki page](https://github.com/riggraz/astuto/wiki/Required-environment-variables) for an explanation of the variables).
4. Run `script/docker-update-and-run.sh`.
5. You should now have a running instance of Astuto at `localhost:3000`. A default user account has been created with credentials email: `admin@example.com`, password: `password`.

## Post-installation notes

* **If you run into any problems take a look at the [common problems page](https://github.com/riggraz/astuto/wiki/Common-problems)**.
* When you want to launch Astuto you have to run `script/docker-run.sh`. If you installed new gems, packages or updated the database schema, you first need to run `script/docker-update.sh` and then `script/docker-run.sh`. You can run them together with `script/docker-update-and-run.sh`.
* You can always run `script/docker-update-and-run.sh` if unsure whether you should update or not. However, please note that `script/docker-update-and-run.sh` takes more time to run than `script/docker-run.sh`.
* If you changed some environment variables in `.env` you have to restart the instance for these changes to take effect.

## Contributing

Astuto is licensed under the [GNU GPLv3](https://github.com/riggraz/astuto/blob/master/LICENSE) license. You are welcome to contribute:
* Join the [Discord channel](https://discord.gg/SrtUMRp) to get in touch.
* You can find a [todo list](https://github.com/riggraz/astuto/projects/1) of what we would like to work on right now.
* You should take a look at the [contribution guidelines](https://github.com/riggraz/astuto/wiki/Contribution-Guidelines).
* You should take a look at the [technologies](https://github.com/riggraz/astuto/wiki/Technologies) used to build Astuto.
* You can run the test suite by typing `rspec` inside the `web` container. Before you can run `rspec`, you need to uncomment the Google Chrome installation lines in `docker/app/Dockerfile` and run `./script/docker-update-and-run.sh`.
* If you just have some suggestions you can [create an issue](https://github.com/riggraz/astuto/issues), [email us directly](mailto:riccardo.graziosi97@gmail.com) or [text us in our Discord server](https://discord.gg/SrtUMRp).
