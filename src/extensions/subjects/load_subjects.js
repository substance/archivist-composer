var SUBJECTS = [
  {
    "name": "Subject 1"
  },
  {
    "name": "Subject 2"
  }
];

// By contract data is stored in writer.panelData["entities"]
// This can also be used for caching results
var loadSubjects = function(writer, cb) {
	writer.panelData["subjects"] = SUBJECTS;
  cb(null);
};

var loadEntitiesTransition = function(writer, oldState, newState, cb) {
  if (oldState.contextId !== newState.contextId && newState.contextId === "subjects") {
    loadSubjects(writer, cb);
    return true;
  }
  return false;
};

module.exports = loadEntitiesTransition;