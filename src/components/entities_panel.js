var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Entities Panel extension
// ----------------

var ENTITIES = [
  {
    "type": "location",
    "name": "Linz"
  },
  {
    "type": "location",
    "name": "Moscow"
  }
];

var EntitiesPanel = function(props) {
  Component.call(this, props);
};

EntitiesPanel.Prototype = function() {

  this.render = function() {
    return $$("div", {className: "entities-panel-component"},
      $$("div", {html: "I AM THE ENTITIES PANEL"})
    );
  };
};


EntitiesPanel.loadEntities = function(writer, cb) {
  writer.panelData["entities"] = ENTITIES;
  cb(null);
};

EntitiesPanel.handleWriterTransition = function(writer, oldState, newState, cb) {
  if (oldState.contextId !== newState.contextId && newState.contextId === "entities") {
    EntitiesPanel.loadEntities(writer, cb);
    return true;
  }

  return false; // Not handled here
};

EntitiesPanel.Prototype.prototype = Component.prototype;
EntitiesPanel.prototype = new EntitiesPanel.Prototype();

module.exports = EntitiesPanel;