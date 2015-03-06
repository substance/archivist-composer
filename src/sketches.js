"use strict";

var _ = require("underscore");
var Application = require("substance-application");
var Component = require("substance-application").Component;
var $$ = require("substance-application").$$;

// ContentPanel Component
// --------------

var ContentPanel = function() {
  Component.call(this);
};

ContentPanel.Prototype = function() {

  // returns a Virtual DOM Tree
  // ----------

  this.render = function() {
    var contentNodes = _.map(this.props.nodes, function(node) {
      return $$("p", null, node.content);
    });

    return (
      $$("div", {className: "content-panel"},
        contentNodes
      )
    );
  };
};

// LocationsPanel Component
// --------------
// 
// stateless, derives its data from writercomponent

LocationsPanel.Prototype = function() {

  // returns a Virtual DOM Tree
  // ----------

  this.render = function() {
    return (
      $$("div", {className: "content-panel"}, "HELLO LOCATIONS")
    );
  };
};

// Writer Component
// --------------

var Writer = function() {
  Component.call(this);


  // Event handlers
  // ------------

  this.on('click', '.toggle-panel', _.bind(this._togglePanel, this));
};

Writer.Prototype = function() {

  this._togglePanel = function(e) {
    var newContext = $(e.currentTarget).attr("data-context");
    this.setState({
      contextId: newContext
    });
  };

  this.getInitialState = function() {
    "id": "main",
    "contextId": "toc"
  };

  this.render = function() {
    // Using panel definitions, specified by hosting context
    contextPanelClass = this.app.getFactory("panel").create(this.state.contextId); // FACTORY METHOD!
    var contextPanel = $$(contextPanelClass, {data: this.data, ref: "contextPanel"});

    return (
      $$("div", {className: "writer-component"},
        $$("div", {className: "panels"},
          $$(ContentPanel, {content: "some content", ref: "contentPanel", handleContextSwitch: this.handleContextSwitch}),
          contextPanel
        )
      )
    );
  };
};

// The Mother Component
// ----------------

var Composer = function() {
  Component.call(this);
};

Composer.Prototype = function() {

  // Hook into component transition
  // ----------------
  // 
  // Component gets re-rendered afterwards, except `cb(null, {skip: true});` is passed

  this.transition = function(old,new, cb) {
    // Load document
    if (new.id === "writer" && old.documentId !== new.documentId {
      this.loadDocument(new.documentId, cb);
    }

    // Load dashboard
    if (new.id === "dashboard") {
      this.loadDashboard(cb);
    }
  };

  this.loadDashboard = function(cb) {
    this.data = FETCHED_DAHSBOARD_DATA;
    cb(null);
  };

  this.loadDocument = function(cb) {
    this.data = new Substance.Document(JSON_DOC);
    cb(null);
  };

  this.render = function() {
    // Using panel definitions, specified by hosting context
    if (this.state.id === "dashboard") {
      return $$(Dashboard, {data: this.data, ref: "dashboard"});
    } else if (this.state.id === "writer") {
      return $$(Writer, {data: this.data, ref: "writer"});
    }
  };
};

// Boot the application using a seed state, could also be derived from a hash-fragment
// -------------

// var state = [
//   {id: "writer", "documentId": "doc25"}, // Composer state
//   {id: "main", "contextId": "locations", "locationId": "location_2"} // Writer state
// ];

var state = {
  "app": {"id": "writer", "documentId": "doc25"},
  "writer": {"id": "main", "locations", "nodeId": "location_2"}
};

app.id=writer.documentId=doc25;writer.id=main.loctaions.nodeId=location_2

var app = new Application({
  rootComponent: Composer,
  data: null,
  // state: state,
  el: document.body
});

// app.registerFactory("asdfa", f)

app.start();

// usually derived from hashfragment, or based on initial-states set by each component
app.setState(state);






var Application = function(state) {
  this.state = state;
  this.getStateFromHashFragment();

  // Global view registry
  this.views = {
    "view1": {
      el: 
      instance:
    }
  };
};

Application.Prototype = function() {

  this.getStateFromHashFragment = function() {
    // TODO: implement
  };

  this.start = function() {

  };

  this.renderViews = function() {

  }

  this.renderView = function() {

    var 
  };
};





var View = function() {

};


View.Prototype = function() {
  this.render 
};


