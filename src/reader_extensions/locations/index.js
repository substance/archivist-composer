var LocationsPanel = require("./locations_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "locations",
  panels: [
    LocationsPanel
  ],
  stateHandlers: stateHandlers,
  tools: [
  ]
};
