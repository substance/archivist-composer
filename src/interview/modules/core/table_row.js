var Substance = require('substance');

var TableRow = Substance.Document.Node.extend({
  name: "table_row",
  properties: {
    "cells": ["array", "string"]
  },
  getCells: function() {
    var doc = this.getDocument();
    return Substance.map(this.cells, function(id) {
      return doc.get(id);
    }, this);
  }
});

module.exports = TableRow;