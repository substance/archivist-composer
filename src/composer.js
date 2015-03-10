var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");


var SAMPLE_DOC = [
  {type: "paragraph", content: "Paragraph 1"},
  {type: "paragraph", content: "Paragraph 2"},
  {type: "paragraph", content: "Paragraph 3"}
];

// The Dashboard Component
// ----------------

var Dashboard = function(props) {
  Component.call(this, props);
};

Dashboard.Prototype = function() {

  this.render = function() {
    return $$("div", {className: "dashboard-component"},
      $$("div", {html: "I AM THE DASHBOARD"})
    );
  };
};

Dashboard.Prototype.prototype = Component.prototype;
Dashboard.prototype = new Dashboard.Prototype();


// Paragraph
// ----------------

var Paragraph = function(props) {
  Component.call(this, props);
};

Paragraph.Prototype = function() {

  this.render = function() {
    return $$("p", {html: this.props.node.content});
  };
};

Paragraph.Prototype.prototype = Component.prototype;
Paragraph.prototype = new Paragraph.Prototype();


// The Content Panel
// ----------------

var ContentPanel = function(props) {
  Component.call(this, props);
};

ContentPanel.Prototype = function() {

  this.render = function() {
    return $$("div", {className: "content-panel-component"},
      $$("div", {className: "nodes"},
        $$(Paragraph, {className: "paragraph", node: this.props.doc[0], ref: "p1"}),
        $$(Paragraph, {className: "paragraph", node: this.props.doc[1], ref: "p2"}),
        $$(Paragraph, {className: "paragraph", node: this.props.doc[2], ref: "p3"})
      )
    );
  };
};

ContentPanel.Prototype.prototype = Component.prototype;
ContentPanel.prototype = new ContentPanel.Prototype();


// The Writer Component
// ----------------

var Writer = function(props) {
  Component.call(this, props);
};

Writer.Prototype = function() {

  this.render = function() {
    return $$("div", {className: "writer-component"},
      $$(ContentPanel, {doc: this.props.doc, ref: "contentpanel"})
    );
  };
};

Writer.Prototype.prototype = Component.prototype;
Writer.prototype = new Writer.Prototype();


// The Mother Component
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
    } else {
      contextEl = $$(Writer, {doc: SAMPLE_DOC, ref: "writer"});
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
  this.rootComponent = Composer;
};

ComposerApp.Prototype = function() {

};


ComposerApp.Prototype.prototype = Application.prototype;
ComposerApp.prototype = new ComposerApp.Prototype();

module.exports = ComposerApp;
