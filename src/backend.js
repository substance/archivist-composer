"use strict";

var Substance = require("substance");
var Interview = require('./interview');
var _ = require("substance/helpers");


// Archivist Backend
// ----------------
//

var Backend = function(opts) {
  this.cache = {
    "entities": {}
  };
};

Backend.Prototype = function() {

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

  this.getEntity = function(entityId) {
    return this.cache.entities[entityId];
  };

  // Entities
  // ------------------

  this.getEntities = function(entityIds, cb) {
    var entitiesToFetch = [];
    var entities = [];

    // Try to use cached items
    _.each(entityIds, function(entityId) {
      var entity = this.cache.entities[entityId];
      if (entity) {
        entities.push(entity);
      } else {
        entitiesToFetch.push(entityId);
      }
    }.bind(this));

    this.fetchEntities(entitiesToFetch, function(err, fetchedEntities) {
      // Store in cache
      _.each(fetchedEntities, function(entity) {
        this.cache.entities[entity.id] = entity;
        entities.push(entity);
      }, this);
      cb(null, entities);
    }.bind(this));
  };

  this.fetchEntities = function(entityIds, cb) {
    if (entityIds.length === 0) return cb(null, []);
    console.log('Fetching entities', entityIds);
    
    var entities = {
      entityIds: entityIds
    }

    $.post('/api/entities', entities, function(response) {
      cb(null, response.results);
    }, 'json');
  };

  // Outdated
  this.getSuggestedEntities = function(cb) {
    $.getJSON("/api/search", function(entities) {
      cb(null, entities);
    });
  };

  this.searchEntities = function(searchStr, type, cb) {
    var queryUrl;

    if(type) {
      queryUrl = "/api/search?query="+encodeURIComponent(searchStr)+"&type="+encodeURIComponent(type);
    } else {
      queryUrl = "/api/search?query="+encodeURIComponent(searchStr);
    }
    $.getJSON(queryUrl, function(entities) {
      cb(null, entities);
    });
  };

  this.fetchSubjects = function(cb) {

    $.getJSON("/api/subjects", function(subjectDB) {
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

  this.getSubjectDBVersion = function() {
    return this.cache.subjectDB ? this.cache.subjectDB.subjectDBVersion : null;
  };
};


Substance.initClass(Backend);

module.exports = Backend;