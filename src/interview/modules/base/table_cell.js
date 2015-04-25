var Substance = require('substance');

var TableCell = Substance.Document.Node.extend({
  name: "table_cell",
  properties: {
    // "head" or "data"
    "cellType": "string",
    "colspan": "number",
    "rowspan": "number",
    "content": "string"
  }
});

TableCell.static.components = ['content']

module.exports = TableCell;
