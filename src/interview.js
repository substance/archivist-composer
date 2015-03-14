"use strict";

var _ = require("underscore");
var util = require("substance-util");
var Document = require("substance-document");
// var Annotator = Document.Annotator;


// Interview Schema
// ---------------

var SCHEMA = {
	// Schema info
	"id": "substance-interview",
	"version": "0.1.0",

  // Static indexes
  // TODO: delete?

  "types": {
	  "document": {
	    "properties": {
	      "guid": "string",
	      "creator": "string",
	      "title": "string",
	      "abstract": "string"
	    }
	  },

    // An abstract type for all content-ish nodes
    "content": {
      "properties": {
      }
    },

    "container": {
      "properties": {
        "nodes": ["array", "content"]
      }
    },

		"text": {
		  "id": "text",
		  "parent": "content",
		  "properties": {
		    "content": "string"
		  }
		},

    // Annotations

    "annotation": {
      "id": "annotation",
      "properties": {
        "path": ["array", "string"], // -> e.g. ["text_1", "content"]
        "range": "array"
      }
    },

    "entity_reference": {
      "id": "entity_reference",
      "parent": "annotation",
      "properties": {
        "target": "string"
      }
    }
  }
};

// Interview Seed
// ---------------
// 
// Represents an empty interview

// A very empty interview

var SEED = {
  "schema": [
    "substance-interview",
    "0.1.0"
  ],
  nodes : {
    "document": {
      id: "document",
      type: "document",
    },
    "content": {
      id: "content",
      type: "container",
      nodes: []
    }
  }
};

function _options(options) {
  options = options || {};
  options.schema = SCHEMA;
  if (options.seed === undefined) {
    options.seed = SEED;
  }
  return options;
}

var Interview = function(options) {
  Document.call(this, _options(options));

  // Only for legacy purposes
  this.nodeTypes = {};
};

Interview.fromSnapshot = function(data, options) {
  options = options || {};
  options.seed = data;
  return new Interview(options);
};

Interview.Prototype = function() {

};

Interview.Prototype.prototype = Document.prototype;
Interview.prototype = new Interview.Prototype();
Interview.prototype.constructor = Interview;

module.exports = Interview;
