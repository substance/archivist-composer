var Substance = require('substance');

var TableCell = Substance.Document.Node.extend({
  name: "table_row",
  properties: {
    "colspan": "number",
    "rowspan": "number",
    "content": "string"
  }
});

module.exports = TableCell;