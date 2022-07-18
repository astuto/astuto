# Contributing guidelines

Thanks for taking the time to contribute 😁

We would like the Astuto community to be a welcoming environment for both seasoned programmers and absolute beginners. The following guidelines should help you get started regardless of your skill level.

## How to contribute

There are many ways to contribute to Astuto, not just coding. In this section we list the most common ones:

- **Getting involved in the community**: we love to hear opinions about our product. Dropping a comment on an open issue or pull request or joining the discussion on the [Discord server](https://discord.com/invite/SrtUMRp) is an easy yet impactful way to contribute.
- **Reporting bugs or proposing features**:  [open a new issue](https://github.com/riggraz/astuto/issues/new) on GitHub. Before posting, check if a similar issue has already been reported. Try to be concise but also unambiguous.
- **Translating Astuto into a new language**: we want Astuto to speak all languages and we need contributors to achieve this goal! If you're interested, join [our Crowdin project](https://crwd.in/astuto), the platform we use to manage translations.
- **Coding**: [open a pull request](https://github.com/riggraz/astuto/pulls) with your bug fix or feature implementation. Before diving into coding, you may find [the coding and testing section](#coding-and-testing) useful.

If you still have any doubt, feel free to [join our Discord](https://discord.com/invite/SrtUMRp) and drop a message! And remember: there are no stupid questions 😉

## Translations

If you're interested in translating, we suggest to visit and register to [our Crowdin project](https://crwd.in/astuto), the place where we manage translations. If the language you want to contribute is not present in Crowdin, just open an issue on GitHub and let us know!

### Translations structure

Locales are stored in YAML files under `config/locales`. Translations are splitted in 3 files:

- `[lang].yml`: the main locale file. Contains translation strings for the frontend, backend, mailers, etc.
- `activerecord/activerecord.[lang].yml`: contains Rails ActiveRecord translations, i.e. translations for model names, properties and validation error messages.
- `devise/devise.[lang].yml`: contains translations for the authentication system (which is based on Devise gem). It is likely that you'll find ready-made translations for your language at [this page](https://github.com/heartcombo/devise/wiki/I18n), so this step usually consist in a simple copy-paste!

## Coding and testing

First of all, you need to follow [the installation instructions](https://github.com/riggraz/astuto#installation) to have a working local instance of Astuto.

### Technologies

Depending on the task you're working on, you need to know one or more of these technologies:

- [Ruby on Rails](https://rubyonrails.org/): Ruby framework for the backend
- [React](https://reactjs.org/): UI library used for most of the frontend views
- [Redux](https://redux.js.org/): state management library for React
- [TypeScript](https://www.typescriptlang.org/)

### Project structure

The project is broadly structured as follows:

- `app`
  - `models`: Rails ActiveRecord models. These models are mapped by ActiveRecord to database tables.
  - `controllers`: Rails controllers. Web requests will be handled here. Here you can query the database, return HTML/JSON, etc. We try to keep controllers as small as possible.
  - `views`: Rails views. Some of these views render HTML directly, whereas others render React components. Ideally, we'd like to move the entire frontend to React.
  - `javascript`
    - `actions`: Redux actions
    - `components`: React components
    - `containers`: React components that connect to Redux state. See [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) to learn more.
    - `reducers`: Redux reducers
    - `stylesheets`: all CSS files are stored here
  - `mailers`: mail templates that are sent to notify users
  - `workflows`: classes that contains some complex logic. Usually that logic was originally in a controller, but has been refactored and delegated to a workflow. In fact, workflows are usually called inside controllers.
  - `policies`: policies used by [Pundit](https://github.com/varvet/pundit) for resource authorization
- `config`
  - `locales`: locales files for internationalization. See [this section](#translations) for additional information.
  - `routes.rb`: backend routes, i.e. mapping requests to controller actions
- `db`
  - `migrate`: contains migration files
  - `schema.rb`: database schema
- `spec`: RSpec tests

### Rails console

If you need to work with the Rails console, just attach a shell to the `web` container. From there, type `rails c` to run the console. You may notice that every query you run (e.g. `Post.all`) fails with error `Current::MissingCurrentTenant (Current tenant is not set)`: that's because Astuto implements multi tenancy at the database level. In order to fix this error, supposing you're in single tenant mode, just run `Current.tenant = Tenant.first` as the first command inside the Rails console. After that, everything should work as expected.

### Specs (tests)

Tests are done using RSpec, a testing framework for Ruby on Rails:

- To execute all specs, run `rspec` command inside the `web` container. System specs relies on Google Chrome to run, so you may need to rebuild Astuto image uncommenting lines 9-11 in Dockerfile.
- If you want to run all specs except for system specs, you can run the script `script/rspec-no-system-specs.sh`.
