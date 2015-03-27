var $$ = React.createElement;
var _ = require("underscore");

// The main composer
var Composer = require("./composer");

var app = {
  start: function() {
    React.render(
      $$(Composer, {
        author: "Hello World"
      }),
      document.body
    );
  }
};

module.exports = app;

