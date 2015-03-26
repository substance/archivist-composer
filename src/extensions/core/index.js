"use strict";

var ContainerNode = require("./nodes/container_node");
var TextNode = require("./nodes/text_node");

module.exports = {
  name: "core",
  nodes: {
    "container": ContainerNode,
    "text": TextNode,
  },
  panels: [
    // TODO: TOCPanel
  ],
  // referenceHandler: referenceHandler,
  transitions: [
  ],
  tools: [
    // TODO: 
  	// TagEntityTool
    // StrongTool
    // EmphasisTool
    // LinkTool
  ]
};
