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

var Composer = React.createClass({
  displayName: "Composer",
  render: function() {
    return $$(Writer, {
      config: {
        modules: writerModules
      },
      doc: doc,
      id: "writer"
    });
  }
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

