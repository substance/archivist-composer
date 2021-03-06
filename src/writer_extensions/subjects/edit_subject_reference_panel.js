var $$ = React.createElement;

var SubjectsModel = require("./subjects_model");
var _ = require("substance/helpers");
var Tree = require("./tree_component");

// Edit Subject Reference Panel
// ----------------

var EditSubjectReferencePanel = React.createClass({
  displayName: "Tag subjects",

  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired
  },

  handleCancel: function(e) {
    e.preventDefault();
    // Go to regular entities panel
    this.context.app.replaceState({
      contextId: "subjects"
    });
  },

  // Data loading methods
  // ------------

  loadSubjects: function() {
    var app = this.context.app;
    var backend = this.context.backend;

    backend.getSubjects(function(err, subjects) {
      this.setState({
        subjects: new SubjectsModel(app.doc, subjects)
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
    var app = this.context.app;
    var doc = app.doc;
    doc.connect(this, {
      'document:changed': this.handleDocumentChange
    });
    this.loadSubjects();
  },

  handleDocumentChange: function(change, info) {
    // console.log('handle document change');
    var refId = this.props.subjectReferenceId;

    if (info.updateSubjectReference) return;

    if (change.isAffected([refId, "target"])) {
      this.forceUpdate();
    }
  },

  handleDeleteReference: function(e) {
    var app = this.context.app;
    var doc = app.doc;
    var tx = doc.startTransaction();

    try {
      tx.delete(this.props.subjectReferenceId);
      tx.save();
      app.replaceState({
        contextId: "subjects"
      });
    } finally {
      tx.cleanup();
    }
  },

  componentWillUnmount: function() {
    var doc = this.context.app.doc;
    doc.disconnect(this);
  },

  // Write changes in selection to document model
  // ------------

  updateSubjectReference: function(selectedNodes) {
    var app = this.context.app;
    var subjectIds = Object.keys(selectedNodes);
    var tx = app.doc.startTransaction();
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
    var app = this.context.app;
    var doc = app.doc;

    if (this.state.subjects) {
      treeEl = $$(Tree, {
        ref: "treeWidget",
        selectedNodes: doc.get(this.props.subjectReferenceId).target,
        tree: this.state.subjects.tree,
        onSelectionChanged: this.updateSubjectReference
      });
    } else {
      treeEl = $$('div', {className: "subjects-tree", ref: 'subjectsTree'}, "Loading subjects");
    }

    return $$("div", {className: "panel dialog edit-subject-reference-panel-component"},
      $$('div', {className: "dialog-header"},
        $$('a', {
          href: "#",
          className: 'back',
          onClick: this.handleCancel,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-chevron-left"></i>'}
        }),
        $$('div', {className: 'label'}, "Related subjects"),
        $$('div', {className: 'actions'},
          $$('a', {
            href: "#",
            className: "delete-reference",
            onClick: this.handleDeleteReference,
            dangerouslySetInnerHTML: {__html: '<i class="fa fa-trash"></i> Remove'}
          })
        )
      ),
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