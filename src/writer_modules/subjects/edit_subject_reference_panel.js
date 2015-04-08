var $$ = React.createElement;
var Substance = require("substance");
var SubjectsModel = require("./subjects_model");

// Edit Subject Reference Panel
// ----------------

var EditSubjectReferencePanel = React.createClass({
  displayName: "Edit Subject Reference",

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

  handleDocumentChange: function(change, ops, info) {
    if (info.updateSubjectReference) return;
    this.renderSubjectsTree();
  },

  componentWillUnmount: function() {
    var doc = this.props.writerCtrl.doc;
    var treeContainerEl = this.refs.subjectsTree.getDOMNode();
    $(treeContainerEl).off('changed.jstree');
    doc.disconnect(this);
  },

  componentDidUpdate: function() {
    this.renderSubjectsTree();
  },

  // Write changes in selection to document model
  // ------------

  updateAnnotation: function(e) {
    e.preventDefault();
    var treeContainerEl = this.refs.subjectsTree.getDOMNode();
    var subjectIds = $(treeContainerEl).jstree().get_selected();
    console.log('updating subjectReferenceId', subjectIds);

    var tx = this.props.writerCtrl.doc.startTransaction();
    tx.set([this.props.subjectReferenceId, "target"], subjectIds);
    tx.save({}, {updateSubjectReference: true});
  },

  // Render jsTree widget accordingly
  // ------------

  renderSubjectsTree: function() {
    var self = this;
    var subjects = this.state.subjects;
    var doc = this.props.writerCtrl.doc;
    var treeContainerEl = this.refs.subjectsTree.getDOMNode();
    var subjectsTree = subjects.getTree();
    var subjectRef = doc.get(this.props.subjectReferenceId);

    // HACK: This guard is needed due to undo behavior
    // When a new annotation is toggled and then undo is executed
    // renderSubjectsTree is called one last time before something happened
    // TODO: essentially, this component is not interested in document:changes
    // other than 'updates'
    if (!subjectRef) {
      return;
    }

    // TreeView for selecting a subject
    // --------------

    $(treeContainerEl).jstree({
      "checkbox" : {
        // "keep_selected_style" : false,
        // "cascade": "up+down",
        "three_state": false
      },
      "plugins" : ["checkbox"],
      'core' : {
        'data' : subjectsTree
      }
    });

    // Remove previously attached listeners
    $(treeContainerEl).off('changed.jstree');

    // Select assigned items
    Substance.delay(function() {
      $(treeContainerEl).jstree('deselect_all');
      $(treeContainerEl).jstree('close_all');

      Substance.delay(function() {
        Substance.each(subjectRef.target, function(subjectId) {
          $(treeContainerEl).jstree('select_node', subjectId);
        }, this);
        $(treeContainerEl).on('changed.jstree', self.updateAnnotation);
      }, 200);
    }, 200, this);
  },

  // Rendering
  // -------------------

  render: function() {
    return $$("div", {className: "panel dialog edit-subject-reference-panel-component"},
      $$('div', {className: 'dialog-header'},
        $$('div', {className: 'label', dangerouslySetInnerHTML: {__html: '<i class="fa fa-tag"></i> Select relevant subjects'}}),
        $$('a', {className: 'done', href: '#', onClick: this.handleDone}, 'Done')
      ),
      $$('div', {className: "panel-content"},
        $$('div', {className: "subjects-tree", ref: 'subjectsTree'}, "Loading subjects")
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