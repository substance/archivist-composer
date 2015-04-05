var $$ = React.createElement;
var Substance = require("substance");
var SubjectsModel = require("./subjects_model");

var SUBJECTS = require("./subjects_fixture");

// Edit Subject Reference Panel
// ----------------

var EditSubjectReferencePanel = React.createClass({
  displayName: "Edit Subject Reference",

  // State relevant things
  // ------------

  getInitialState: function() {
    var subjects = new SubjectsModel(this.props.writerCtrl.doc, SUBJECTS);

    // TODO: create subject tree from cache
    return {
      searchString: "",
      subjects: subjects
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    this.renderSubjectsTree();
  },

  componentWillUnmount: function() {
    var treeContainerEl = this.refs.subjectsTree.getDOMNode();
    $(treeContainerEl).off('changed.jstree');
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
    tx.save();
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
    return $$("div", {className: "panel tag-subject-panel-component"},
      $$('div', {className: "panel-content"},
        $$('div', {className: "subjects-tree", ref: 'subjectsTree'})
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