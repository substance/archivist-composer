var PersonsPanel = require("./persons_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "persons",
  panels: [
    PersonsPanel
  ],
  stateHandlers: stateHandlers,
  tools: [
  ]
};
