"use strict";

var EntitiesPanel = require("./entities_panel");
var TagEntityPanel = require("./tag_entity_panel");
var TagEntityTool = require("./tag_entity_tool");
var referenceHandler = require("./reference_handler");


module.exports = {
  name: "entities",
  panels: [
    EntitiesPanel,
    TagEntityPanel
  ],
  referenceHandler: referenceHandler,
  transitions: [
  ],
  tools: [
  	TagEntityTool
  ]
};
