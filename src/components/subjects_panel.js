var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Entities Panel extension
// ----------------

var SUBJECTS = [
  {
    "name": "Subject 1"
  },
  {
    "name": "Subject 2"
  }
];

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

// Writer transition handling
// --------------
// 

SubjectsPanel.loadSubjects = function(writer, cb) {
  writer.panelData["entities"] = SUBJECTS;
  cb(null);
};

SubjectsPanel.handleWriterTransition = function(writer, oldState, newState, cb) {
  if (oldState.contextId !== newState.contextId && newState.contextId === "subjects") {
    SubjectsPanel.loadSubjects(writer, cb);
    return true;
  }
  return false; // Not handled here
};

SubjectsPanel.Prototype.prototype = Component.prototype;
SubjectsPanel.prototype = new SubjectsPanel.Prototype();

module.exports = SubjectsPanel;