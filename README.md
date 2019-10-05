# Astuto

Astuto is a free, open source, self-hosted customer feedback tool.
It has been heavely inspired by [Canny.io](https://canny.io/) ("astuto", indeed, is the italian translation of the word "canny").
You can check out a demo [here](#).

## Requirements

* Docker (installation instructions [here](https://docs.docker.com/v17.09/engine/installation/))
* Docker Compose (installation instructions [here](https://docs.docker.com/compose/install/))

## Installation

1. Ensure that you have the required software installed.
2. Download Astuto from [here](#) or by cloning this repo.
3. In the root directory, create a file named `.env` and write the required environment variables (see file `.env-example` for an example and check [this page](https://github.com/riggraz/astuto/wiki/Required-environment-variables) for an explanation of the variables).
4. Run `script/docker-update-and-run.sh`.
5. You should now have a running instance of Astuto, check it out at `localhost:3000`. A default user account has been created with credentials email: `admin@example.com`, password: `password`.

## Post-installation notes

* When you want to launch Astuto you have to run `script/docker-run.sh`. If you installed new gems, packages or updated the database schema, you first need to run `script/docker-update.sh` and then `script/docker-run.sh`. You can run them together with `script/docker-update-and-run.sh`.
* You can always run `script/docker-update-and-run.sh` if unsure whether you should update or not. However, please note that `script/docker-update-and-run.sh` takes more time to run than `script/docker-run.sh`.
* If you changed some environment variables in `.env` you have to restart the instance for these changes to take effect.

## Contributing

You are welcome to contribute:
* [Here](https://github.com/riggraz/astuto/wiki/Improving-Astuto) you can find a todo list of what we would like to work on next.
* [Here](https://github.com/riggraz/astuto/wiki/Contribution-Guidelines) you can take a look at the contributing guidelines.
* [Here](https://github.com/riggraz/astuto/wiki/Technologies) you can take a look at the technologies used to build Astuto. Don't wory, you do not need to know each of them!
* You can run the test suite by typing `rspec`.
* If you just have some suggestions you can [create an issue](https://github.com/riggraz/astuto/issues) or [email us directly](mailto:riccardo.graziosi97@gmail.com).