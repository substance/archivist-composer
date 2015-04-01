var Document = require("substance-document");

function initialize(doc) {
  doc.references = doc.addIndex('referenceByTarget', Document.Index.create({
    type: "reference",
    property: "target"
  }));
}

module.exports = initialize;
