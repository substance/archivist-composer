var MetadataPanel = require("./metadata_panel");
var SelectPrisonPanel = require("./select_prison_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "metadata",
  panels: [
    MetadataPanel,
    SelectPrisonPanel
  ],
  stateHandlers: stateHandlers,
  tools: []
};
