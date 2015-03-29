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

  componentDidUpdate: function() {
    console.log('TagSubjectPanel updated');
    this.renderSubjectsTree();
  },

  // Render jsTree widget accordingly
  // ------------

  renderSubjectsTree: function() {
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

    // Select assigned items
    // --------------

    _.delay(function() {
      $(treeContainerEl).jstree('deselect_all');
      $(treeContainerEl).jstree('close_all');

      _.delay(function() {
        _.each(subjectRef.target, function(subjectId) {
          $(treeContainerEl).jstree('select_node', subjectId);
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
        $$('div', {className: "subjects-tree", ref: 'subjectsTree'},
          ""
        )
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