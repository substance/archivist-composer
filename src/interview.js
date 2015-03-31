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
  this.references = this.addIndex('referenceByTarget', new SubstanceDocument.AbstractIndex({
    select: function(node) {
      return node.isInstanceOf("reference");
    },
    getKey: function(node) {
      return node.id;
    }
  }));
  // Index subject references (multi-annotations)
  this.subjectReferencesIndex = this.addIndex('subjectReferencesIndex', new SubstanceDocument.AbstractIndex({
    select: function(node) {
      return node.isInstanceOf("subject_reference");
    },
    getKey: function(node) {
      return [node.target, node.id];
    }
  }));
  // Index only entity references (regular annotations)
  this.entityReferencesIndex = this.addIndex('entityReferencesIndex', new SubstanceDocument.AbstractIndex({
    select: function(node) {
      return node.isInstanceOf("entity_reference");
    },
    create: function(node) {
      var targets = this.node.target;
      Substance.each(targets, function(id) {
        this.index.set([id, node.id], node);
      });
    },
    delete: function(node) {
      var targets = this.node.target;
      Substance.each(targets, function(id) {
        this.index.delete([id, node.id]);
      });
    },
    update: function(node, property, value, oldValue) {
      Substance.each(oldValue, function(id) {
        this.index.delete([id, node.id]);
      });
      this.create(node);
    }
  }));
};

Interview.Prototype = function() {};

Substance.inherit(Interview, SubstanceDocument);

module.exports = Interview;