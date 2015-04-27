var MetadataPanel = require("./metadata_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "metadata",
  panels: [
    MetadataPanel
  ],
  stateHandlers: stateHandlers,
  tools: []
};
