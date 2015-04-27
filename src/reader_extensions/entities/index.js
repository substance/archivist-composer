var EntitiesPanel = require("./entities_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "entities",
  panels: [
    EntitiesPanel
  ],
  stateHandlers: stateHandlers,
  tools: [
  ]
};
