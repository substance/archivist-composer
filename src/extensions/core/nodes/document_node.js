
var SubstanceNode = require('substance-document').Node;

var DocumentNode = SubstanceNode.extend({
  name: "document",
  properties: {
    "guid": "string",
    "creator": "string",
    "title": "string",
    "abstract": "string"
  }
});

module.exports = DocumentNode;
