"use strict";

var EntitiesPanel = require("./entities_panel");
var TagEntityPanel = require("./tag_entity_panel");
var TagEntityTool = require("./tag_entity_tool");
var entitiesTransition = require("./entities_transition");
var tagEntityTransition = require("./tag_entity_transition");
var referenceHandler = require("./reference_handler");


module.exports = {
  name: "entities",
  panels: [
    EntitiesPanel,
    TagEntityPanel
  ],
  referenceHandler: referenceHandler,
  transitions: [
    // entitiesTransition,
    tagEntityTransition
  ],
  tools: [
  	TagEntityTool
  ]
};
