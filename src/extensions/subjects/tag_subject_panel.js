var $$ = React.createElement;
var _ = require("underscore");

// Tag Subject Panel
// ----------------


var TagSubjectPanel = React.createClass({
  displayName: "Tag Subject",

  // State relevant things
  // ------------

  getInitialState: function() {
    // TODO: create subject tree from cache
    return {
      searchString: "",
      subjects: []
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    // this.loadEntities("");
    console.log('TagSubjectPanel mounted');
  },

  // Rendering
  // -------------------


  render: function() {
    var subjects = this.state.subjects;
    var entityNodes;

    return $$("div", {className: "panel tag-subject-panel-component"},
      $$('div', {className: "panel-content"},
        $$('div', {className: "subjects-tree"},
          "SUBJECTS_TREE COMES HERE"
        )
      )
    );
  }
});


// Panel configuration
// ----------------

TagSubjectPanel.contextId = "tagsubject";
TagSubjectPanel.icon = "fa-tag";

// No toggle is shown
TagSubjectPanel.isDialog = true;


module.exports = TagSubjectPanel;