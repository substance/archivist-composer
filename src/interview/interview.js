"use strict";

var Substance = require('substance');
var Document = require("substance-document");

var CoreModule = require("./modules/core");
var SubjectsModule = require("./modules/subjects");
var EntitiesModule = require("./modules/entities");

var modules = [
  CoreModule,
  SubjectsModule,
  EntitiesModule
];

var Interview = function(data) {
  var schema = new Document.Schema({ "id": "substance-interview", "version": "0.1.0" });

  // Initialize document modules
  Substance.each(modules, function(ext) {
    schema.addNodes(ext.nodes);
  });

  Document.call(this, schema, data);

  // Call initializes of modules
  Substance.each(modules, function(ext) {
    ext.initialize(this);
  }, this);
};

Interview.Prototype = function() {};

Substance.inherit(Interview, Document);

module.exports = Interview;
