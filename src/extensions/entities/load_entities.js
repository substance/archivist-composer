var _ = require("underscore");

var ENTITIES = [
  {
    "id": "linz",
    "type": "location",
    "name": "Linz"
  },
  {
    "id": "moscow",
    "type": "location",
    "name": "Moscow"
  }
];

// By contract data is stored in writer.panelData["entities"]
// This can also be used for caching results
var loadEntities = function(writer, cb) {
  console.log('TODO: load entities from server');
	writer.panelData["entities"] = {
    entities: ENTITIES,
    writer: writer,
    doc: writer.props.doc
  };
  cb(null);
};

var setActiveEntity = function(writer, entityId) {
  console.log('marking active entity', entityId);
  _.each(writer.panelData["entities"].entities, function(entity) {
    entity.active = entity.id === entityId;
  });
};

var loadEntitiesTransition = function(writer, oldState, newState, cb) {
  if (oldState.contextId !== newState.contextId && newState.contextId === "entities") {
    loadEntities(writer, function() {
      setActiveEntity(writer, newState.entityId);
      cb(null);
    });
    return true;
  }
  if (oldState.contextId === newState.contextId && oldState.entityId !== newState.entityId) {
    setActiveEntity(writer, newState.entityId);
    cb(null);
    return true;
  }
  return false;
};

module.exports = loadEntitiesTransition;