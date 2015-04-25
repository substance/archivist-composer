var Substance = require('substance');

var TableRow = Substance.Document.Node.extend({
  name: "table_row",
  properties: {
    "cells": ["array", "id"]
  },
  getCells: function() {
    var doc = this.getDocument();
    return Substance.map(this.cells, function(id) {
      return doc.get(id);
    }, this);
  }
});

TableRow.static.components = ['cells']

module.exports = TableRow;