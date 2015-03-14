"use strict";

var EntitiesPanel = require("./entities_panel");
var TagEntityTool = require("./tag_entity_tool");
var loadEntities = require("./load_entities");

module.exports = {
  name: "entities",
  panels: [
    EntitiesPanel,
  ],
  transitions: [
    loadEntities
  ],
  tools: [
  	TagEntityTool
  ]
};
