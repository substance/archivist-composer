var $$ = React.createElement;

var SubjectsModel = require("./subjects_model");
var _ = require("substance/helpers");

// Show Subject Reference Panel
// ----------------

var ShowSubjectReferencePanel = React.createClass({
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

    return $$("div", {className: "panel dialog show-subject-reference-panel-component"},
      $$('div', {className: "dialog-header"},
        $$('a', {
          href: "#",
          className: 'back',
          onClick: this.handleCancel,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-chevron-left"></i>'}
        }),
        $$('div', {className: 'label'}, "Related subjects"),
        $$('div', {className: 'actions'})
      ),
      $$('div', {className: "panel-content"},
        "DANIEL INSERT CONTENT HERE"
      )
    );
  }
});

// Panel configuration
// ----------------

ShowSubjectReferencePanel.contextId = "showSubjectReference";
ShowSubjectReferencePanel.icon = "fa-tag";

// No toggle is shown
ShowSubjectReferencePanel.isDialog = true;

module.exports = ShowSubjectReferencePanel;