
var $$ = React.createElement;
var Writer = require("substance-writer");
var Interview = require('./interview');
var EXAMPLE_DOC = require("../data/sample_doc");

// Writer Configuration
// -------------------
//
// Register extensions

var CoreExtension = require("./extensions/core");
var SubjectsExtension = require("./extensions/subjects");
var EntitiesExtension = require("./extensions/entities");

// Writer Configuration
var writerConfig = {
  extensions: [
    CoreExtension,
    SubjectsExtension,
    EntitiesExtension
  ]
};

var Composer = React.createClass({
  displayName: "Composer",
  getInitialState: function() {
    return {"id": "writer"};
  },
  render: function() {
    // Menu
    var menuElement = $$("div", {className: "composer-menu"},
      $$('a', {
        href: "#",
        "data-context": "dashboard",
        className: this.state.id === "dashboard" ? "active": ""
      }, "Dashboard"),
      $$('a', {
        href: "#",
        "data-context": "writer",
        className: this.state.id === "writer" ? "active": ""
      }, "Writer")
    );

    // Context (Dashboard vs writer)
    var contextEl;

    contextEl = $$(Writer, {
      config: writerConfig,
      doc: new Interview(EXAMPLE_DOC),
      id: "writer", //reusable singleton!
    });

    return $$("div", {className: "composer-component"},
      menuElement,
      $$("div", {className: "composer-container"},
        contextEl
      )
    );
  }
});

module.exports = Composer;