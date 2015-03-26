var $$ = React.createElement;
var _ = require("underscore");

// TextNode
// ----------------
//

var TextNode = React.createClass({
  displayName: "TextNode",
  render: function() {
    return $$("div", {
    	className: "content-node text",
    	dangerouslySetInnerHTML: {__html: this.props.node.content}
    });
  }
});

module.exports = TextNode;
