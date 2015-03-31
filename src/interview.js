"use strict";

var Substance = require('substance');
var SubstanceDocument = require("substance-document");
var CoreExtension = require("./extensions/core");
var SubjectsExtension = require("./extensions/subjects");
var EntitiesExtension = require("./extensions/entities");

var extensions = [
  CoreExtension,
  SubjectsExtension,
  EntitiesExtension
];

var Interview = function(data) {
  var schema = new SubstanceDocument.Schema({ "id": "substance-interview", "version": "0.1.0" });
  Substance.each(extensions, function(ext) {
    schema.addNodes(ext.nodes);
  });
  // parent
  SubstanceDocument.call(this, schema, data);

  // indexes
  this.references = this.addIndex('referenceByTarget', SubstanceDocument.AbstractIndex.extend({
    select: function(node) {
      return node.isInstanceOf("reference");
    },
    // this actually would not be necessary as it is the default impl
    getKey: function(node) {
      return node.id;
    }
  }));
  // Index subject references (multi-annotations)
  this.subjectReferencesIndex = this.addIndex('subjectReferencesIndex', SubstanceDocument.AbstractIndex.extend({
    select: function(node) {
      return node.isInstanceOf("subject_reference");
    },
    // getKey: function(node) {
    //   return node.id;
    // }
  }));
/*
  // As an example: this would create a subject -> subject_reference index:
  // Index subject references (multi-annotations)
  var subject2subjectReferences = this.addIndex('subject2references', SubstanceDocument.AbstractIndex.extend({
    // take all subject_references...
    select: function(node) {
      return node.isInstanceOf("subject_reference");
    },
    // ... use the target value as key; but key is not a single one, it has multiple values
    getKey: function(node) {
      return node.target;
    },
    // ... so we need to override 'create' and 'delete' to insert/remove multiple entries
    create: function(keys, node) {
      Substance.each(keys, function(id) {
        this.index.set([id, node.id], node);
      }, this);
    },
    delete: function(keys) {
      Substance.each(keys, function(id) {
        this.index.delete([id, node.id]);
      }, this);
    },
  }));
*/

  // Index only entity references (regular annotations)
  this.entityReferencesIndex = this.addIndex('entityReferencesIndex', SubstanceDocument.AbstractIndex.extend({
    select: function(node) {
      return node.isInstanceOf("entity_reference");
    },
    getKey: function(node) {
      return [node.target, node.id];
    }
  }));
};

Interview.Prototype = function() {};

Substance.inherit(Interview, SubstanceDocument);

module.exports = Interview;