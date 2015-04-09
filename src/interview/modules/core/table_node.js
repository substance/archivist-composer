var Substance = require('substance');

var TableNode = Substance.Document.Node.extend({
  name: "table",
  properties: {
    "rows": ["array", "string"]
  }
});

module.exports = TableNode;