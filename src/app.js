var $$ = React.createElement;
var Interview = require('./interview');
var Writer = require("substance-writer");

var EXAMPLE_DOC = require("../data/sample_doc");

// Writer Configuration
var writerModules = require("./writer_modules");

var Composer = React.createClass({
  displayName: "Composer",
  render: function() {
    return $$(Writer, {
      config: {
        extensions: writerModules
      },
      doc: new Interview(EXAMPLE_DOC),
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

