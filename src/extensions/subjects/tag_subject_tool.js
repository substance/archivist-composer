var Application = require("substance-application");
var Component = Application.Component;
var $$ = React.createElement;
var _ = require("underscore");

// TagSubjectTool
// ----------------

// var TagSubjectTool = function(props) {
//   Component.call(this, props);
// };


// TagSubjectTool.Prototype = function() {
//   this.render = function() {
//     return $$("a", {
//     	className: 'tag-subject-tool-component tool', 
//     	href: "#",
//     	html: '<i class="fa fa-tag"></i>',
//     	title: 'Tag Subject'
//     });
//   };
// };

// TagSubjectTool.Prototype.prototype = Component.prototype;
// TagSubjectTool.prototype = new TagSubjectTool.Prototype();


var TagSubjectTool = React.createClass({
  displayName: "TagSubjectTool",
  render: function() {
    return $$("a", {
    	className: 'tag-subject-tool-component tool', 
    	href: "#",
    	dangerouslySetInnerHTML: {__html: '<i class="fa fa-tag"></i>'},
    	title: 'Tag Subject'
    });
  }
});

module.exports = TagSubjectTool;