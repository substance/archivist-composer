var $$ = React.createElement;
var _ = require("underscore");
var TextProperty = require('./text_property')

// TextNode
// ----------------
//

var TextNode = React.createClass({
  displayName: "TextNode",
  render: function() {
    return $$("div", { className: "content-node text" },
      $$(TextProperty, { doc: this.props.doc, path: [ this.props.node.id, "content"] })
    );
  }
});

module.exports = TextNode;
