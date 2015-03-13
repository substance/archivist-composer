var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Entities Panel extension
// ----------------

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


EntitiesPanel.contextId = "entities";

EntitiesPanel.Prototype.prototype = Component.prototype;
EntitiesPanel.prototype = new EntitiesPanel.Prototype();

module.exports = EntitiesPanel;