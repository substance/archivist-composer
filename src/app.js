var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// The main composer
var Composer = require("./components/composer");


// The Composer Application
// -------------------
// 
// TODO: maybe we can get rid of this boilerplate
// 
// would maybe be nicer to start a new app generically, like this:
// 
// var app = new Application({
//   rootComponent: Composer,
//   data: null,
//   // state: state,
//   el: document.body
// });

var ComposerApp = function(options) {
  Application.call(this, options);

  this.el = document.body; // use options.el
  this.rootElement = $$(Composer);
};

ComposerApp.Prototype = function() {

};


ComposerApp.Prototype.prototype = Application.prototype;
ComposerApp.prototype = new ComposerApp.Prototype();

module.exports = ComposerApp;
