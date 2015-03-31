"use strict";

var EntitiesPanel = require("./entities_panel");
var TagEntityPanel = require("./tag_entity_panel");
var TagEntityTool = require("./tag_entity_tool");
var stateHandlers = require("./state_handlers");
var EntityReference = require('./nodes/entity_reference');

module.exports = {
  name: "entities",
  nodes: [ EntityReference ],
  panels: [
    EntitiesPanel,
    TagEntityPanel
  ],
  stateHandlers: stateHandlers,
  tools: [
    TagEntityTool
  ]
};
