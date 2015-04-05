var Substance = require("substance");

// Writer Controller
// ----------------
//
// An common interface for all writer modules

var MetadataService = function(opts) {
  
};

MetadataService.Prototype = function() {

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
};


Substance.initClass(MetadataService);

module.exports = MetadataService;