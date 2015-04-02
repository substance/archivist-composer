"use strict";

var ContainerComponent = require("./components/container_component");
var TextComponent = require("./components/text_component");
var AnnotationComponent = require("./components/annotation_component");

module.exports = {
  name: "core",
  components: {
    "container": ContainerComponent,
    "text": TextComponent,
    "annotation": AnnotationComponent
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
