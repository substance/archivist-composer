"use strict";

var Substance = require('substance');
var Document = Substance.Document;

var SubstanceCore = require("substance/article").CoreModule;
var BaseModule = require("./modules/base");
var SubjectsModule = require("./modules/subjects");
var EntitiesModule = require("./modules/entities");
var TimecodesModule = require("./modules/timecodes");

var modules = [
  SubstanceCore,
  BaseModule,
  SubjectsModule,
  EntitiesModule,
  TimecodesModule
];

var Interview = function(data) {
  var schema = new Document.Schema("substance-interview", "0.1.0");

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
