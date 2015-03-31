
var SubstanceNode = require('substance-document').Node;

var TextNode = SubstanceNode.extend( {
  name: "content",
  properties: {
    content: "string"
  }
} );

module.exports = TextNode;
