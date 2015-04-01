var $$ = React.createElement;
var _ = require("underscore");
var util = require("substance-util");

// TagSubjectTool
// ----------------

var TagSubjectTool = React.createClass({
  displayName: "TagSubjectTool",

  handleClick: function(e) {
    var writerCtrl = this.props.writerCtrl;

    var subjectReference = writerCtrl.annotate({
      type: "subject_reference",
      target: []
    });

    // Switch state to highlight newly created reference
    writerCtrl.replaceState({
      contextId: "editSubjectReference",
      subjectReferenceId: subjectReference.id
    });
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