var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Components
var Writer = require("substance-writer");
var Dashboard = require("./dashboard");

// Writer Configuration
// -------------------
// 
// Register extensions

var SubjectsExtension = require("./extensions/subjects");
var EntitiesExtension = require("./extensions/entities");



// Writer Configuration
var writerConfig = {
  extensions: [
    SubjectsExtension,
    EntitiesExtension
  ]
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