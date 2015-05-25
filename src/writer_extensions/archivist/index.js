"use strict";

var stateHandlers = require("./state_handlers");
var ContentEditor = require("./content_editor");

module.exports = {
  components: {
    "container": ContentEditor,
  },
  name: "archivist",
  panels: [],
  stateHandlers: stateHandlers,
  tools: []
};
