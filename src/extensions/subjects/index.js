"use strict";

var SubjectsPanel = require("./subjects_panel");
var loadSubjects = require("./load_subjects");

module.exports = {
	name: "subjects",
	panels: [
		SubjectsPanel,
	],
	transitions: [
		loadSubjects
	]
};
