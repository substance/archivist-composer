"use strict";

var ContainerComponent = require("./components/container_component");
var TextComponent = require("./components/text_component");
var SaveTool = require("./save_tool");

var stateHandlers = require("./state_handlers");

module.exports = {
  name: "core",
  components: {
    "container": ContainerComponent,
    "text": TextComponent
  },
  panels: [
    // TODO: TOCPanel
    
  ],
  stateHandlers: stateHandlers,
  tools: [
    SaveTool
    // TODO:
    // StrongTool
    // EmphasisTool
    // LinkTool
  ]
};
