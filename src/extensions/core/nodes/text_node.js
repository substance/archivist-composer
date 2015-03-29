var $$ = React.createElement;
var _ = require("underscore");

// TextNode
// ----------------
//

var TextNode = React.createClass({
  componentDidMount: function() {
    var doc = this.props.doc;
    doc.on('operation:applied', _.bind(this.onGraphUpdate));
  },

  // This is a bit wacky implementation
  onGraphUpdate: function(op) {
    if (op.path && op.path[0] === this.props.node.id) {
      this.forceUpdate();
    }
  },

  displayName: "TextNode",
  render: function() {
    return $$("div", {
    	className: "content-node text",
    	dangerouslySetInnerHTML: {__html: this.props.node.content}
    });
  }
});

module.exports = TextNode;
