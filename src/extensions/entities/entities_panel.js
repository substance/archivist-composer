var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Entity types
var Prison = require("./entity_types/prison");
var Toponym = require("./entity_types/toponym");
var Person = require("./entity_types/person");
var Definition = require("./entity_types/definition");

// Entities Panel extension
// ----------------

var EntitiesPanel = function(props) {
  Component.call(this, props);
};

EntitiesPanel.Prototype = function() {

  this.getEntityElement = function(entity) {
    if (entity.type === "prison") {
      return $$(Prison, entity); 
    } else if (entity.type === "toponym") {
      return $$(Toponym, entity); 
    } else if (entity.type === "person") {
      return $$(Person, entity); 
    } else if (entity.type === "definition") {
      return $$(Definition, entity); 
    }
    throw new Error('No view component for '+ entity.type);
  };

  this.render = function() {
    var getElem = this.getEntityElement.bind(this);
    var entityNodes = this.props.entities.map(function(entity, index) {
      return getElem(entity);
    });

    return $$("div", {className: "panel entities-panel-component"},
      $$('div', {className: 'entities'},
        entityNodes
      )
    );
  };
};

EntitiesPanel.panelName = "Entities";
EntitiesPanel.contextId = "entities";
EntitiesPanel.icon = "fa-bullseye";


// Factory method for creation of a new subject panel using properties derived from writer
// state
EntitiesPanel.create = function(writer) {
  var props = writer.panelData["entities"];
  props["id"] = "entitiespanel";
  return $$(EntitiesPanel, props);
};


EntitiesPanel.Prototype.prototype = Component.prototype;
EntitiesPanel.prototype = new EntitiesPanel.Prototype();

module.exports = EntitiesPanel;