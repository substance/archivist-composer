var DefinitionsPanel = require("./definitions_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "definitions",
  panels: [
    DefinitionsPanel
  ],
  stateHandlers: stateHandlers,
  tools: [
  ]
};
