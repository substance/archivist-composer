"use strict";

var Substance = require('substance');
var Document = require("substance-document");
var CoreExtension = require("./extensions/core");
var SubjectsExtension = require("./extensions/subjects");
var EntitiesExtension = require("./extensions/entities");

var extensions = [
  CoreExtension,
  SubjectsExtension,
  EntitiesExtension
];

var Interview = function(data) {
  var schema = new Document.Schema({ "id": "substance-interview", "version": "0.1.0" });
  Substance.each(extensions, function(ext) {
    schema.addNodes(ext.nodes);
  });
  // parent
  Document.call(this, schema, data);

  // indexes
  this.references = this.addIndex('referenceByTarget', Document.Index.create({
    type: "reference",
    property: "target"
  }));

  // Index subject references (multi-annotations)
  this.subjectReferencesIndex = this.addIndex('subjectReferencesIndex', Document.Index.create({
    type: "subject_reference",
    property: "id"
  }));

  // Index only entity references (regular annotations)
  this.entityReferencesIndex = this.addIndex('entityReferencesIndex', Document.Index.create({
    type: "entity_reference",
    property: "id"
  }));
};

Interview.Prototype = function() {};

Substance.inherit(Interview, Document);

module.exports = Interview;
