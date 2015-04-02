var $$ = React.createElement;
var TextProperty = require('./text_property')

// TextNode
// ----------------
//

var TextNode = React.createClass({
  componentDidMount: function() {
    var doc = this.props.doc;
    doc.on('operation:applied', this.onGraphUpdate.bind(this));
  },

  // This is a bit wacky implementation
  onGraphUpdate: function(op) {
    if (op.path && op.path[0] === this.props.node.id) {
      this.forceUpdate();
    }
  },

  displayName: "TextNode",
  render: function() {
    return $$("div", { className: "content-node text" },
      $$(TextProperty, { doc: this.props.doc, path: [ this.props.node.id, "content"] })
    );
  }
});

module.exports = TextNode;
