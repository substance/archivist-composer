var $$ = React.createElement;
var _ = require("underscore");
var SubjectsModel = require("./subjects_model");

var SUBJECTS = require("./subjects_fixture");

// Edit Subject Reference Panel
// ----------------

var EditSubjectReferencePanel = React.createClass({
  displayName: "Edit Annotation",

  // State relevant things
  // ------------

  getInitialState: function() {
    var subjects = new SubjectsModel(this.props.doc, SUBJECTS);

    // TODO: create subject tree from cache
    return {
      searchString: "",
      subjects: subjects
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    console.log('TagSubjectPanel mounted');
    this.renderSubjectsTree();
  },

  componentWillUnmount: function() {
    console.log('removing tree event listener');
    var treeContainerEl = this.refs.subjectsTree.getDOMNode();
    $(treeContainerEl).off('changed.jstree');
  },

  componentDidUpdate: function() {
    console.log('TagSubjectPanel updated');
    this.renderSubjectsTree();
  },

  // Write changes in selection to document model
  // ------------

  updateAnnotation: function(e) {
    e.preventDefault();
    var treeContainerEl = this.refs.subjectsTree.getDOMNode();
    var subjectIds = $(treeContainerEl).jstree().get_selected();
    console.log('updating subjectReferenceId', subjectIds);

    var doc = this.props.doc;
    var subjectReferenceId = this.props.subjectReferenceId;

    doc.set([this.props.subjectReferenceId, "target"], subjectIds);
  },

  // Render jsTree widget accordingly
  // ------------

  renderSubjectsTree: function() {
    var self = this;
    var subjects = this.state.subjects;
    var doc = this.props.doc;
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
    _.delay(function() {
      $(treeContainerEl).jstree('deselect_all');
      $(treeContainerEl).jstree('close_all');

      _.delay(function() {
        _.each(subjectRef.target, function(subjectId) {
          $(treeContainerEl).jstree('select_node', subjectId);
          $(treeContainerEl).on('changed.jstree', _.bind(self.updateAnnotation, this));
        }, this);        
      }, 200);
    }, 200, this);
  },

  // Rendering
  // -------------------

  render: function() {
    var subjects = this.state.subjects;
    var entityNodes;

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