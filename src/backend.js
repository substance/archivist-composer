"use strict";

var Substance = require("substance");
var Interview = require('./interview');

// Archivist Backend
// ----------------
//

var Backend = function(opts) {
  this.cache = {};
};

Backend.Prototype = function() {

  // Utils
  // ------------------

  this.getSubjectDBVersion = function() {
    return this.cache.subjectDB ? this.cache.subjectDB.subjectDBVersion : null;
  };

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    $.getJSON("/api/documents/"+documentId, function(rawDoc) {
      var doc = new Interview(rawDoc);
      doc.version = rawDoc.__v;
      // For easy reference
      window.doc = doc;
      cb(null, doc);
    });
  };

  this.saveDocument = function(doc, cb) {
    var json = doc.toJSON();
    json.__v = doc.version;

    console.log('saving doc, current version is', doc.version);

    $.ajax({
      type: "PUT",
      url: "/api/documents/"+doc.id,
      contentType: "application/json",
      data: JSON.stringify(json),
      success: function(data) {
        // Remember new document version
        doc.version = data.documentVersion;

        console.log('new doc version', doc.version);
        // Check if subjectsDB changed
        var currentSubjectDBVersion = this.getSubjectDBVersion();
        var newSubjectDBVersion = data.subjectDBVersion;
        
        // Update the subjects cache if outdated
        if (this.cache.subjects && this.cache.subjectDBVersion  !== newSubjectDBVersion) {
          this.fetchSubjects();
        } else {
          cb(null);
        }
      }.bind(this),
      error: function(err) {
        cb(err.responseText);
      }
    });
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


  this.fetchSubjects = function(cb) {
    $.getJSON("/api/metadata", function(subjectDB) {
      // Store in cache
      this.cache.subjectDB = subjectDB;
      cb(null, subjectDB.subjects);
    }.bind(this));  
  };

  // Subjects
  // ------------------

  this.getSubjects = function(cb) {
    if (this.cache.subjectDB) {
      return cb(null, this.cache.subjectDB.subjects);
    } else {
      this.fetchSubjects(cb);
    }
  };
};


Substance.initClass(Backend);

module.exports = Backend;