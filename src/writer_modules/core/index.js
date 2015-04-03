"use strict";

var ContainerComponent = require("./components/container_component");
var TextComponent = require("./components/text_component");

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
    // TODO:
    // StrongTool
    // EmphasisTool
    // LinkTool
  ]
};
