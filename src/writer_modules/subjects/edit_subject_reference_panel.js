var $$ = React.createElement;

var SubjectsModel = require("./subjects_model");
var _ = require("substance/helpers");
var Tree = require("./tree_component");

// Edit Subject Reference Panel
// ----------------

var EditSubjectReferencePanel = React.createClass({
  displayName: "Tag subjects",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  handleDone: function(e) {
    e.preventDefault();
    // Go to regular entities panel
    this.props.writerCtrl.replaceState({
      contextId: "subjects"
    });
  },

  // Data loading methods
  // ------------

  loadSubjects: function() {
    var writerCtrl = this.props.writerCtrl;
    var backend = this.context.backend;

    backend.getSubjects(function(err, subjects) {
      this.setState({
        subjects: new SubjectsModel(writerCtrl.doc, subjects)
      });
    }.bind(this));
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      subjects: null
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    var doc = this.props.writerCtrl.doc;
    doc.getEventProxy('path').add([this.props.subjectReferenceId, "target"], this, this.handleDocumentChange);
    this.loadSubjects();
  },

  handleDocumentChange: function(change, info) {
    if (info.updateSubjectReference) return;
    var doc = this.props.writerCtrl.doc;
    var selectedSubjects = doc.get(this.props.subjectReferenceId).target;
    this.refs.treeWidget.updateTree(selectedSubjects);
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.doc.disconnect(this);
    doc.getEventProxy('path').remove([this.props.subjectReferenceId, "target"], this);
  },

  // Write changes in selection to document model
  // ------------

  updateSubjectReference: function(selectedNodes) {
    var subjectIds = Object.keys(selectedNodes);
    var tx = this.props.writerCtrl.doc.startTransaction();
    try {
      tx.set([this.props.subjectReferenceId, "target"], subjectIds);
      tx.save({}, {updateSubjectReference: true});
    } finally {
      tx.cleanup();
    }
  },

  // Rendering
  // -------------------

  render: function() {
    var treeEl;
    var doc = this.props.writerCtrl.doc;

    if (this.state.subjects) {
      treeEl = $$(Tree, {
        ref: "treeWidget",
        subjectReferenceId: this.props.subjectReferenceId,
        selectedNodes: doc.get(this.props.subjectReferenceId).target,
        tree: this.state.subjects.tree,
        onSelectionChanged: this.updateSubjectReference
      });
    } else {
      treeEl = $$('div', {className: "subjects-tree", ref: 'subjectsTree'}, "Loading subjects");
    }

    return $$("div", {className: "panel dialog edit-subject-reference-panel-component"},
      $$('div', {className: "panel-content"},
        treeEl
      )
    );
  }
});

// Panel configuration
// ----------------

EditSubjectReferencePanel.contextId = "editSubjectReference";
EditSubjectReferencePanel.icon = "fa-tag";

// No toggle is shown
EditSubjectReferencePanel.isDialog = true;

module.exports = EditSubjectReferencePanel;