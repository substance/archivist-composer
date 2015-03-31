"use strict";

var SubjectsPanel = require("./subjects_panel");
var EditSubjectReferencePanel = require("./edit_subject_reference_panel");
var TagSubjectTool = require("./tag_subject_tool");
var stateHandlers = require("./state_handlers");

var SubjectReference = require('./nodes/subject_reference');

module.exports = {
  name: "subjects",
  nodes: [
    SubjectReference
  ],
  panels: [
    SubjectsPanel,
    EditSubjectReferencePanel
  ],
  stateHandlers: stateHandlers,
  tools: [
  	TagSubjectTool
  ]
};
