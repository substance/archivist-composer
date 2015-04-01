var SubstanceNode = require('substance-document').Node;

var ContentNode = SubstanceNode.extend({
  name: "content",
  properties: {
    content: "string"
  }
});

module.exports = ContentNode;