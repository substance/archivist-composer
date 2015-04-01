var Tree = require("./tree");
var _ = require("underscore");

var SubjectsModel = function(doc, subjects) {
  this.doc = doc;

  // Convert subjects to hash
  this.subjects = {};

  _.each(subjects, function(subject) {
    this.subjects[subject.id] = subject;
  }, this);

  this.tree = new Tree(this.subjects);
};

// Get tree representation suitable for jsTree widget
// ----------------

SubjectsModel.prototype.getTree = function() {
  var tree = this.tree;

  function getChildren(parentId) {
    var res = [];
    var nodes = tree.getChildren(parentId);
    if (nodes.length === 0) return res; // exit condition

    _.each(nodes, function(node) {
      var entry = {
        id: node.id,
        text: node.name,
        children: getChildren(node.id) // get children for subj
      };
      res.push(entry);
    });
    return res;
  }

  return getChildren("root");
};



SubjectsModel.prototype.getAllReferencedSubjects = function(subjectReferenceId) {
  var doc = this.doc;

  var subjectRefs = doc.subjectReferencesIndex.get();
  var subjects = [];

  _.each(subjectRefs, function(subjectRef) {
    // collect subjects
    _.each(subjectRef.target, function(subjectId) {
      subjects.push(this.tree.get(subjectId));
    }, this);
  }, this);

  return subjects;
};


SubjectsModel.prototype.getFullPathForSubject = function(subjectId) {
  var tree = this.tree;
  var res = [];

  function getParent(nodeId) {
    var node = tree.get(nodeId);
    var parent = tree.getParent(nodeId);
    if (parent) getParent(parent.id);

    res.push(node.name);
    return res;
  }
  return getParent(subjectId);
};

module.exports = SubjectsModel;