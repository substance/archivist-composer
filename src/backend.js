var Substance = require("substance");

// Archivist Backend
// ----------------
//

var Backend = function(opts) {
  
};

Backend.Prototype = function() {

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


Substance.initClass(Backend);

module.exports = Backend;