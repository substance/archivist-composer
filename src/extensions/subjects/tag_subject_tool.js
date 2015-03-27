var Application = require("substance-application");
var Component = Application.Component;
var $$ = React.createElement;
var _ = require("underscore");

// TagSubjectTool
// ----------------

var TagSubjectTool = React.createClass({
  displayName: "TagSubjectTool",

  handleClick: function(e) {
    // this.props.switchContext("tagsubject");
    console.error('not yet implemented');
    // TODO:
    // - create new subject_reference at position x in text
    // - switch state.contextId to editSubjectReference with subjectReferenceId=x
  },

  render: function() {
    return $$("a", {
    	className: 'tag-subject-tool-component tool', 
    	href: "#",
    	dangerouslySetInnerHTML: {__html: '<i class="fa fa-tag"></i>'},
    	title: 'Tag Subject',
      onClick: this.handleClick
    });
  }
});

module.exports = TagSubjectTool;