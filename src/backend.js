var Substance = require("substance");
var Interview = require('./interview');

// Archivist Backend
// ----------------
//

var Backend = function(opts) {
  this.cache = {};
};

Backend.Prototype = function() {

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    $.getJSON("/api/documents/"+documentId, function(rawDoc) {
      var doc = new Interview(rawDoc);
      // For easy reference
      window.doc = doc;
      cb(null, doc);
    });
  };

  this.saveDocument = function(doc, cb) {
    console.log('saving doc...');
    cb(null);
  };


  // Entities
  // ------------------

  this.getEntities = function(entityIds, cb) {
    $.getJSON("/api/entities?entityIds="+entityIds.join(','), function(entities) {
      cb(null, entities);
    });
  };

  this.getSuggestedEntities = function(cb) {
    $.getJSON("/api/search", function(entities) {
      cb(null, entities);
    });
  };

  this.searchEntities = function(searchStr, cb) {
    $.getJSON("/api/search?query="+encodeURIComponent(searchStr), function(entities) {
      cb(null, entities);
    });
  };

  // Subjects
  // ------------------

  this.getSubjects = function(cb) {
    if (this.cache.subjectDB) {
      return cb(null, this.cache.subjectDB.subjects);
    }

    $.getJSON("http://localhost:5000/api/metadata", function(subjectDB) {
      // Store in cache
      this.cache.subjectDB = subjectDB;
      cb(null, subjectDB.subjects);
    }.bind(this));
  };
};


Substance.initClass(Backend);

module.exports = Backend;