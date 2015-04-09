var $$ = React.createElement;
var TextProperty = require('./text_property');

var TableComponent = React.createClass({

  displayName: "TableComponent",

  renderCellComponents: function(cells) {
    var cellComponents = [];
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var tagName = (cell.cellType==="head")?"th":"td";
      var cellAttributes = {
        "data-id": cell.id,
        colSpan: cell.colspan,
        rowSpan: cell.rowspan
      };
      cellComponents.push(
        $$(tagName, cellAttributes,
          $$(TextProperty, {
            doc: this.props.doc,
            path: [cell.id, "content"],
            writerCtrl: this.props.writerCtrl
          })
        )
      );
    }
    return cellComponents;
  },

  renderRowComponents: function(rows) {
    var rowComponents = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var cells = row.getCells();
      var cellComponents = this.renderCellComponents(cells);
      rowComponents.push(
        $$("tr", { "data-id": row.id }, cellComponents)
      );
    }
    return rowComponents;
  },

  render: function() {
    var rows = this.props.node.getRows();
    var rowComponents = this.renderRowComponents(rows);
    return $$("table", { className: "content-node table", "data-id": this.props.node.id },
      rowComponents
    );
  }
});

module.exports = TableComponent;
