
var SubstanceNode = require('substance-document').Node;

var TextNode = SubstanceNode.extend( {
  name: "text",
  parent: "content"
} );

module.exports = TextNode;
