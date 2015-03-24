var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// The main composer
var Composer = require("./composer");
var WriterNodes = require('substance-writer').Nodes

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
  // TODO: discuss how to configure a component registry
  // Note: having this allows to lookup and create components
  // by name, such as components for custom nodes
  options.components = _.extend(WriterNodes, options.components);

  Application.call(this, options);

  this.el = document.body; // use options.el
  this.rootElement = $$(Composer, {id: "composer"});
};

ComposerApp.Prototype = function() {

};


ComposerApp.Prototype.prototype = Application.prototype;
ComposerApp.prototype = new ComposerApp.Prototype();

module.exports = ComposerApp;
