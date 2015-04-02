var Substance = require('substance');
var $$ = React.createElement;

var Surface = Substance.Surface;

// Container Node
// ----------------
//
// Represents a flat collection of nodes

var ContainerNode = React.createClass({
  displayName: "ContainerNode",

  render: function() {
    var containerNode = this.props.node;
    var doc = this.props.doc;
    var writerCtrl = this.props.writerCtrl;

    var components = containerNode.nodes.map(function(nodeId) {
      var node = doc.get(nodeId);
      var ComponentClass = writerCtrl.getNodeComponentClass(node.type);

      return $$(ComponentClass, {
        key: node.id,
        writerCtrl: writerCtrl,
        doc: doc,
        node: node
      });
    });

    return $$("div", {className: "container-node " + this.props.node.id, contentEditable: true },
      $$('div', {className: "nodes"}, components)
    );
  },

  componentDidMount: function() {
    if (this.surface) {
      this.surface.dispose();
    }
    var surfaceModel = new Surface.FullfledgedEditor(this.props.node);
    this.surface = new Surface(this.getDOMNode(), surfaceModel);

    this.surface.attach();
  },

});

module.exports = ContainerNode;