var MetadataPanel = require("./metadata_panel");
var SelectLocationPanel = require("./select_location_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "metadata",
  panels: [
    MetadataPanel,
    SelectLocationPanel
  ],
  stateHandlers: stateHandlers,
  tools: []
};
