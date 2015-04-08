var Substance = require('substance');
var $$ = React.createElement;
var Annotator = Substance.Document.Annotator;

var NodeView = require('./node_view');
var AnnotationView = require('./annotation_view');

// TextProperty
// ----------------
//

var TextProperty = React.createClass({
  displayName: "text-property",

  contextTypes: {
    surface: React.PropTypes.object.isRequired,
    getHighlightedNodes: React.PropTypes.func.isRequired
  },

  shouldComponentUpdate: function() {
    // Note: we return false here as only editing should trigger rerendering.
    // Updates of highlighted nodes are done manually.
    this.updateHighlights();
    return false;
  },

  componentDidMount: function() {
    var doc = this.props.doc;
    doc.getEventProxy('path').add(this.props.path, this, this.propertyDidChange);
    this.renderManually();
  },

  componentWillUnmount: function() {
    var doc = this.props.doc;
    doc.getEventProxy('path').remove(this.props.path, this);
  },

  renderManually: function() {
    console.log('Rendering TextProperty %s ...', JSON.stringify(this.props.path));
    var contentView = new TextProperty.ContentView({
      doc: this.props.doc,
      node: this.props.node,
      children: this.getContent()
    });
    var fragment = contentView.render();
    // Add a <br> so that the node gets rendered and Contenteditable will stop when moving the cursor.
    // TODO: probably this is not good when using the property inline.
    fragment.appendChild(document.createElement('br'));
    var domNode = this.getDOMNode();
    domNode.innerHTML = "";
    domNode.appendChild(fragment);
  },

  updateHighlights: function() {
    if (!this.context.getHighlightedNodes) return;
    var highlightedAnnotations = this.context.getHighlightedNodes();
    var domNode = this.getDOMNode();
    var els = $(domNode).find('.annotation');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var activate = highlightedAnnotations.indexOf(el.dataset.id) >= 0;
      if (activate) {
        $(el).addClass('active');
      } else {
        $(el).removeClass('active');
      }
    }
  },

  getContent: function() {
    var doc = this.props.doc;
    var path = this.props.path;
    var text = doc.get(path) || "";
    var annotations = doc.getIndex('annotations').get(path);

    var highlightedAnnotations = [];

    if (this.context.getHighlightedNodes) {
      highlightedAnnotations = this.context.getHighlightedNodes();
    }

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(text);
    };
    annotator.onEnter = function(entry) {
      var anno = doc.get(entry.id);
      // TODO: we need a component factory, so that we can create the appropriate component
      var ViewClass = AnnotationView;
      var classNames = [];
      if (highlightedAnnotations.indexOf(entry.id) >= 0) {
        classNames.push('active');
      }
      return {
        ViewClass: ViewClass,
        props: {
          doc: doc,
          node: anno,
          classNames: classNames,
        },
        children: []
      };
    };
    annotator.onExit = function(entry, context, parentContext) {
      var props = context.props;
      props.children = context.children;
      var view = new context.ViewClass(props);
      parentContext.children.push(view);
    };

    var root = { children: [] };
    annotator.start(root, text, annotations);

    return root.children;
  },


  propertyDidChange: function(change, ops, info) {
    // Note: Surface provides the source element as element
    // whenever editing is done by Contenteditable (as opposed to programmatically)
    // In that case we trust in CE and do not rerender.
    if (info.source === this.getDOMNode()) {
      // console.log('Skipping update...');
      return;
    }
    // TODO: maybe we want to find an incremental solution
    // However, this is surprisingly fast so that almost no flickering can be observed.
    this.renderManually();
  },

  render: function() {
    return $$('span', {
      className: "text-property " + (this.props.className || ""),
      contentEditable: true,
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-path": this.props.path.join('.')
    });
  },

});

TextProperty.ContentView = NodeView.extend({
  createElement: function() {
    return document.createDocumentFragment();
  }
});

module.exports = TextProperty;
