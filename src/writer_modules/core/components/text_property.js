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
    componentFactory: React.PropTypes.object.isRequired
  },

  componentShouldUpdate: function() {
    return false;
  },

  componentDidMount: function() {
    var doc = this.props.doc;
    doc.addDocumentChangeListener(this, this.props.path, this.propertyDidChange);
    this.renderManually();
  },

  componentDidUpdate: function() {
    // this.renderManually();
  },

  componentWillUnmount: function() {
    var doc = this.props.doc;
    doc.removeDocumentChangeListener(this, this.props.path);
  },

  renderManually: function() {
    var contentView = new TextProperty.ContentView({
      doc: this.props.doc,
      node: this.props.node,
      children: this.getContent()
    })
    var fragment = contentView.render();
    var domNode = this.getDOMNode();
    domNode.innerHTML = "";
    domNode.appendChild(fragment);
  },

  getContent: function() {
    var doc = this.props.doc;
    var componentFactory = this.context.componentFactory;
    var path = this.props.path;
    var text = doc.get(path) || "";
    var annotations = doc.getIndex('annotations').get(path);

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(text);
    };

    annotator.onEnter = function(entry) {
      var anno = doc.get(entry.id);
      // TODO: we need a component factory, so that we can create the appropriate component
      var ViewClass = AnnotationView;
      return {
        ViewClass: ViewClass,
        props: {
          doc: doc,
          node: anno
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


  // TODO: we need to join the ContentEditable dance...
  // when this is edited directly we usually do not need to update
  propertyDidChange: function(documentChange, ops, info) {
    // HACK: trying to detect if the component has 'focus'
    // When this is being edited, we assume that it doesn't need to be updated
    // However, this is not a good solution. The best would be, if the rerendering was
    // less destructive.
    if (info && info.source === this.getDOMNode()) {
      console.log('Skipping update of text-property');
      return;
    }
    this.renderManually();
  },

  render: function() {
    return $$('span', {
      className: "text-property " + (this.props.className || ""),
      contentEditable: true,
      "data-path": this.props.path.join('.')
    });
  },

});

TextProperty.ContentView = NodeView.extend({
  createElement: function() {
    return document.createDocumentFragment();
  }
})

module.exports = TextProperty;
