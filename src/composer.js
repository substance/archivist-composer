var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

var Writer = require("substance-writer");

var Dashboard = require("./dashboard");

// Writer Configuration
// -------------------
// 
// Custom Panels, factories, etc.


// Extensions
// --------------
//
// - Entities Extension
//    - entity panel,
//    - add entity panel
//    - tag entity tool
//    - writer transitions

// Subjects Extension

var EntitiesExtension = require("./extensions/entities");
var SubjectsExtension = require("./extensions/subjects");


// Writer Configuration
var writerConfig = {
  extensions: [
    EntitiesExtension,
    SubjectsExtension
  ],
  // A factory method for creating a panel definition
  createPanel: function(writer) {
    if (writer.state.contextId === "entities") {
      $$(SubjectsPanel, writer.panelData["subjects"]);
    } else if (writer.state.contextId === "entities") {
      $$(EntitiesPanel, writer.panelData["entities"]);
    }
  }
};

var SAMPLE_DOC = [
  {type: "paragraph", content: "Paragraph 1"},
  {type: "paragraph", content: "Paragraph 2"},
  {type: "paragraph", content: "Paragraph 3"}
];


// The Composer Component
// ----------------

var Composer = function(props) {
  Component.call(this, props);
};

Composer.Prototype = function() {

  this.componentDidMount = function() {
    $(this.el).on('click', '.composer-menu a', _.bind(this._toggleMenu, this));
  };

  this._toggleMenu = function(e) {
    e.preventDefault();
    var newContext = $(e.currentTarget).attr("data-context");
    this.setState({
      id: newContext
    });
  };

  this.getInitialState = function() {
    return {"id": "writer"};
  };

  this.render = function() {
    // Menu
    var menuElement = $$("div", {className: "composer-menu"},
      $$('a', {
        href: "#",
        text: "Dashboard",
        "data-context": "dashboard",
        className: this.state.id === "dashboard" ? "active": ""
      }),
      $$('a', {
        href: "#",
        text: "Writer", 
        "data-context": "writer",
        className: this.state.id === "writer" ? "active": ""
      })
    );

    // Context (Dashboard vs writer)
    var contextEl;
    if (this.state.id === "dashboard") {
      contextEl = $$(Dashboard, {ref: "dashboard"});
    } else if (this.state.id === "writer") {
      contextEl = $$(Writer, {
        config: writerConfig,
        doc: SAMPLE_DOC,
        ref: "writer",
      });
    } else {
      contextEl = $$('div', {text: "loading doc"});
    }

    return $$("div", {className: "composer-component"},
      menuElement,
      $$("div", {className: "composer-container"},
        contextEl
      )
    );
  };
};


Composer.Prototype.prototype = Component.prototype;
Composer.prototype = new Composer.Prototype();

module.exports = Composer;