"use strict";

var SubjectsPanel = require("./subjects_panel");
var EditSubjectReferencePanel = require("./edit_subject_reference_panel");
var TagSubjectTool = require("./tag_subject_tool");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "subjects",
  nodes: {
    // TODO: SubjectReferenceNode
  },
  panels: [
    SubjectsPanel,
    EditSubjectReferencePanel
  ],
  stateHandlers: stateHandlers,
  transitions: [
  ],
  tools: [
  	TagSubjectTool
  ]
};
