'use strict';

var Substance = require('substance');
var $$ = React.createElement;
var Interview = require('./interview');
var Writer = require("substance-writer");

var EXAMPLE_DOC = require("../data/sample_doc");

// Writer Configuration
var writerModules = require("./writer_modules");

var doc = new Interview(EXAMPLE_DOC);
window.doc = doc;

// Prepare local cache
window.cache = {};

// extract a component factory from writerModules and expose it via 'context'
var componentFactory = new Substance.Factory();
Substance.each(writerModules, function(module) {
  Substance.each(module.components, function(ComponentClass, name) {
    componentFactory.add(name, ComponentClass);
  });
});

var globalContext = {
  componentFactory: componentFactory
};

var Composer = React.createClass({
  displayName: "Composer",

  childContextTypes: {
    componentFactory: React.PropTypes.object
  },

  getChildContext: function() {
    return globalContext;
  },

  render: function() {
    return $$(Writer, {
      config: {
        modules: writerModules
      },
      doc: doc,
      id: "writer"
    });
  },

});

var app = {
  start: function() {
    React.render(
      $$(Composer),
      document.body
    );
  }
};

module.exports = app;

