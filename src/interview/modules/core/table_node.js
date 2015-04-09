var Substance = require('substance');

var TableNode = Substance.Document.Node.extend({
  name: "table",
  properties: {
    "rows": ["array", "string"]
  },
  getRows: function() {
    var doc = this.getDocument();
    return Substance.map(this.rows, function(id) {
      return doc.get(id);
    }, this);
  }
});

module.exports = TableNode;