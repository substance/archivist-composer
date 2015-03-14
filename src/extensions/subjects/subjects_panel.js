var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Entities Panel extension
// ----------------

var SubjectsPanel = function(props) {
  Component.call(this, props);
};

SubjectsPanel.Prototype = function() {

  this.render = function() {
    return $$("div", {className: "entities-panel-component"},
      $$("div", {html: "I AM THE SUBJECTS PANEL"})
    );
  };
};

SubjectsPanel.panelName = "Subjects";
SubjectsPanel.contextId = "subjects";
SubjectsPanel.icon = "fa-tag";


SubjectsPanel.Prototype.prototype = Component.prototype;
SubjectsPanel.prototype = new SubjectsPanel.Prototype();

module.exports = SubjectsPanel;