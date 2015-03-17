"use strict";

var SubjectsPanel = require("./subjects_panel");
var TagSubjectTool = require("./tag_subject_tool");
var loadSubjects = require("./load_subjects");
var referenceHandler = require("./reference_handler");

module.exports = {
  name: "subjects",
  panels: [
    SubjectsPanel,
  ],
  referenceHandler: referenceHandler,
  transitions: [
    // loadSubjects
  ],
  tools: [
  	TagSubjectTool
  ]
};
