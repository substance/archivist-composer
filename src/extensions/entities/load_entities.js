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
	writer.panelData["entities"] = {
    entities: ENTITIES,
    writer: writer,
    doc: writer.props.doc
  };
  cb(null);
};

var loadEntitiesTransition = function(writer, oldState, newState, cb) {
  if (oldState.contextId !== newState.contextId && newState.contextId === "entities") {
    loadEntities(writer, cb);
    return true;
  }
  return false;
};

module.exports = loadEntitiesTransition;