var Document = require("substance-document");

function initialize(doc) {
  doc.subjectReferencesIndex = doc.addIndex('subjectReferencesIndex', Document.Index.create({
    type: "subject_reference",
    property: "id"
  }));
};

module.exports = initialize;
