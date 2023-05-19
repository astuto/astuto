// Entry point for the build script in your package.json

// turbolinks
require("turbolinks").start();

// react-rails
var componentRequireContext = require.context("./components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

// bootstrap (js only)
require('bootstrap/js/dist/alert');
require('bootstrap/js/dist/button');
require('bootstrap/js/dist/collapse');
require('bootstrap/js/dist/dropdown');
require('bootstrap/js/dist/util');

// i18n-js translations
require('./translations/index.js.erb');