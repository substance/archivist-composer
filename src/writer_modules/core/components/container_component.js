var Substance = require('substance');
var $$ = React.createElement;

var Surface = Substance.Surface;

// Container Node
// ----------------
//
// Represents a flat collection of nodes

var ContainerComponent = React.createClass({
  displayName: "ContainerComponent",

  contextTypes: {
    componentFactory: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    surface: React.PropTypes.object,
    getHighlightedNodes: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      surface: new Surface(new Surface.FullfledgedEditor('content', this.props.doc))
    };
  },

  getHighlightedNodes: function() {
    return this.props.writerCtrl.getHighlightedNodes();
  },

  getChildContext: function() {
    return {
      surface: this.state.surface,
      getHighlightedNodes: this.getHighlightedNodes
    };
  },

  render: function() {
    var containerNode = this.props.node;
    var doc = this.props.doc;
    var writerCtrl = this.props.writerCtrl;
    var componentFactory = this.context.componentFactory;
    var components = containerNode.nodes.map(function(nodeId) {
      var node = doc.get(nodeId);
      var ComponentClass = componentFactory.get(node.type);
      if (!ComponentClass) {
        throw new Error('Could not resolve a component for type: ' + node.type);
      }
      return $$(ComponentClass, {
        key: node.id,
        doc: doc,
        node: node,
        // TODO: we should use DI instead of coupling to the writer
        writerCtrl: writerCtrl
      });
    });

    return $$("div", {
        className: "container-node " + this.props.node.id,
        contentEditable: true,
        spellCheck: false,
        "data-id": this.props.node.id
      },
      $$('div', {className: "nodes"}, components)
    );
  },

  componentDidMount: function() {
    var surface = this.state.surface;
    this.props.doc.getEventProxy('path').add([this.props.node.id, 'nodes'], this, this.containerDidChange);
    this.props.writerCtrl.registerSurface(surface, "content");
    surface.attach(this.getDOMNode());
  },

  componentWillUnmount: function() {
    var surface = this.state.surface;
    this.props.doc.getEventProxy('path').remove([this.props.node.id, 'nodes'], this);
    this.props.writerCtrl.unregisterSurface(surface);
    surface.detach();
  },

  containerDidChange: function() {
    var self = this;
    this.forceUpdate();
    // update the surface afterwards so that it can re-analyze the component layout
    setTimeout(function() {
      self.state.surface.update();
    });
  },

});

module.exports = ContainerComponent;