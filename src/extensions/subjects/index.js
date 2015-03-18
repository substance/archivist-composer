"use strict";

var SubjectsPanel = require("./subjects_panel");
var TagSubjectTool = require("./tag_subject_tool");
var referenceHandler = require("./reference_handler");

module.exports = {
  name: "subjects",
  panels: [
    SubjectsPanel,
  ],
  referenceHandler: referenceHandler,
  transitions: [
  ],
  tools: [
  	TagSubjectTool
  ]
};
