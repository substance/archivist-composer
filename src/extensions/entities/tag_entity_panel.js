var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Tag Entity Panel
// ----------------

var TagEntityPanel = function(props) {
  Component.call(this, props);
};

TagEntityPanel.Prototype = function() {

  this.render = function() {
    return $$("div", {className: "tag-entity-panel-component"},
      $$('div', {html: "TODO: IMPLEMENT TAG ENTITY PANEL"})
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