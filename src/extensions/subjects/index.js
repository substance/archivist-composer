"use strict";

var SubjectsPanel = require("./subjects_panel");
var TagSubjectPanel = require("./tag_subject_panel");
var TagSubjectTool = require("./tag_subject_tool");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "subjects",
  nodes: {
    // TODO: SubjectReferenceNode
  },
  panels: [
    SubjectsPanel,
    TagSubjectPanel
  ],
  stateHandlers: stateHandlers,
  transitions: [
  ],
  tools: [
  	TagSubjectTool
  ]
};
