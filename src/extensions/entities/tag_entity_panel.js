var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Entity types

// Example of a sub view
// ----------------

var EntityView = function(props) {
  Component.call(this, props);
};

EntityView.Prototype = function() {

  this.render = function() {
    var className = ["entity"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
      $$("div", {className: "name", html: this.props.name})
    );
  };
};

EntityView.Prototype.prototype = Component.prototype;
EntityView.prototype = new EntityView.Prototype();


// Entities Panel extension
// ----------------

var TagEntityPanel = function(props) {
  Component.call(this, props);
};

TagEntityPanel.Prototype = function() {

  // this.getEntityElement = function(entity) {
  //   if (entity.type === "prison") {
  //     console.log(Prison);
  //     return $$(Prison, entity); 
  //   }
  //   console.error('No view component for ', entity.type);
  // };

  this.render = function() {
    var entityNodes = this.props.entities.map(function(entity, index) {
      return $$(EntityView, entity);
    });

    return $$("div", {className: "panel tag-entity-panel-component"},
      $$('div', {className: "search", html: "search"},
        $$('input', {type: "text"})
      ),
      $$('div', {className: "entities"},
        entityNodes
      )
    );
  };
};

TagEntityPanel.panelName = "Tag Entities";
TagEntityPanel.contextId = "tagentity";
TagEntityPanel.icon = "fa-bullseye";

// No toggle shown
TagEntityPanel.isDialog = true;

TagEntityPanel.Prototype.prototype = Component.prototype;
TagEntityPanel.prototype = new TagEntityPanel.Prototype();

module.exports = TagEntityPanel;