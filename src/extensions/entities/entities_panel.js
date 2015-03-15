var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Example of a sub view
// ----------------

var EntityView = function(props) {
  Component.call(this, props);
};

EntityView.Prototype = function() {

  this.render = function() {
    return $$("div", {className: "entity"},
      $$("div", {className: "name", html: this.props.name})
    );
  };
};

EntityView.Prototype.prototype = Component.prototype;
EntityView.prototype = new EntityView.Prototype();


// Entities Panel extension
// ----------------

var EntitiesPanel = function(props) {
  Component.call(this, props);
};

EntitiesPanel.Prototype = function() {

  this.render = function() {

    var entityNodes = this.props.entities.map(function(entity, index) {
    	return $$(EntityView, entity)
    });

    return $$("div", {className: "entities-panel-component"},
      entityNodes
    );
  };
};


EntitiesPanel.panelName = "Entities";
EntitiesPanel.contextId = "entities";
EntitiesPanel.icon = "fa-bullseye";

EntitiesPanel.Prototype.prototype = Component.prototype;
EntitiesPanel.prototype = new EntitiesPanel.Prototype();

module.exports = EntitiesPanel;