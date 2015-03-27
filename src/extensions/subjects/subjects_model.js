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

SubjectsModel.prototype.getReferencedSubjects = function(subjectReferenceId) {
  var subjectRef = this.doc.get(subjectReferenceId);
  // Just to make sure
  if (!subjectRef) return [];

  var tree = this.tree;
  // var availableSubjects = this.getSubjects();

  var referencedSubjects = [];
  _.each(subjectRef.target, function(subjectId) {
    var subject = tree.get(subjectId);
    if (subject) {
      referencedSubjects.push(subject);
    }
  });
  return referencedSubjects;
};

// this.getReferencedSubjects = function(subjectReferenceId) {
//   var annotation = this.document.get(subjectReferenceId);
//   // just to make sure
//   if (!annotation) return [];
//   var availableSubjects = this.getSubjects();

//   var referencedSubjects = [];
//   _.each(annotation.target, function(subjectId) {
//     if (availableSubjects[subjectId]) {
//       referencedSubjects.push(availableSubjects[subjectId]);
//     }
//   });
//   return referencedSubjects;
// };


// Used by: SubjectsView.renderList()
// this.getAllReferencedSubjects = function() {
//   var doc = this.document;
//   var subjectReferences = doc.getIndex("multi_annotations").get("content");
//   var availableSubjects = this.getSubjects();

//   var subjects = []; // The result

//   _.each(subjectReferences, function(subjectRef) {
//     _.each(subjectRef.target, function(subjectId) {
//       if (availableSubjects[subjectId]) {
//         subjects.push(availableSubjects[subjectId]);
//       }
//     }, this);
//   }, this);

//   return subjects;
// };

// // Retrieve all referenced subjects for a given subjectReferenceId
// // Used by: SubjectsView.renderShow()



// this.getSubjects = function() {
//   var doc = this.document;
//   var subjects = doc.metadata.getSubjects();
//   return subjects;
// };

// this.getSubjectsTree = function() {
//   var tree = this.tree;

//   function getChildren(parentId) {
//     var res = [];
//     var nodes = tree.getChildren(parentId);
//     if (nodes.length === 0) return res; // exit condition

//     _.each(nodes, function(node) {
//       var entry = {
//         id: node.id,
//         text: node.name,
//         children: getChildren(node.id) // get children for subj
//       };
//       res.push(entry);
//     });
//     return res;
//   }

//   return getChildren("root");
// };

// this.getFullPathForSubject = function(subjectId) {
//   var tree = this.tree;
//   var res = [];

//   function getParent(nodeId) {
//     var node = tree.get(nodeId);
//     var parent = tree.getParent(nodeId);
//     if (parent) getParent(parent.id);

//     res.push(node.name);
//     return res;
//   }
//   return getParent(subjectId);
// };


module.exports = SubjectsModel;