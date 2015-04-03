"use strict";

var ContainerComponent = require("./components/container_component");
var TextComponent = require("./components/text_component");

module.exports = {
  name: "core",
  components: {
    "container": ContainerComponent,
    "text": TextComponent
  },
  panels: [
    // TODO: TOCPanel
  ],
  tools: [
    // TODO:
    // StrongTool
    // EmphasisTool
    // LinkTool
  ]
};
