var Document = require("substance-document");

function initialize(doc) {
  // Index only entity references (regular annotations)
  doc.entityReferencesIndex = doc.addIndex('entityReferencesIndex', Document.Index.create({
    type: "entity_reference",
    property: "id"
  }));
}

module.exports = initialize;
