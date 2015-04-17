var DocumentNode = require("./document_node");
var TextNode = require("./text_node");
var initialize = require("./initialize");

module.exports = {
  nodes: [DocumentNode, TextNode],
  initialize: initialize
};
