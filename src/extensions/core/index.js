"use strict";

var DocumentNode = require('./nodes/document_node');
var ContentNode = require('./nodes/content_node');
var TextNode = require('./nodes/text_node');
var Reference = require('./nodes/reference');

var ContainerComponent = require("./components/container_component");
var TextComponent = require("./components/text_component");

module.exports = {
  name: "core",
  nodes: [
    DocumentNode, ContentNode, TextNode, Reference
  ],
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
