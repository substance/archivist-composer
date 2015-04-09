var Substance = require('substance');

var TableRow = Substance.Document.Node.extend({
  name: "table_row",
  properties: {
    "cells": ["array", "string"]
  }
});

module.exports = TableRow;