var SubjectsPanel = require("./subjects_panel");
var ShowSubjectReferencePanel = require("./show_subject_reference_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "subjects",
  panels: [
    SubjectsPanel,
    ShowSubjectReferencePanel
  ],
  stateHandlers: stateHandlers,
  tools: [
  ]
};
