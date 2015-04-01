var $$ = React.createElement;
var _ = require("underscore");
var util = require("substance-util");

// TagSubjectTool
// ----------------

var TagSubjectTool = React.createClass({
  displayName: "TagSubjectTool",

  handleClick: function(e) {
    var doc = this.props.doc;
    var writer = this.props.writer;

    // TODO: determine using current selection
    var path = ["text_3", "content"];
    var range = [40, 80];

    var subjectReference = {
      id: "subject_reference_" + util.uuid(),
      type: "subject_reference",
      path: path,
      range: range,
      target: [] // no subjects assigned for the time being
    };

    // // Display reference in editor
    doc.create(subjectReference);

    // // Some fake action until editor is ready
    var textNode = doc.get("text_3");
    var newContent = textNode.content += ' and <span data-id="'+subjectReference.id+'" class="annotation subject-reference">'+subjectReference.id+'</span>';
    doc.set(["text_3", "content"], newContent);

    // Switch state to highlight newly created reference
    writer.replaceState({
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