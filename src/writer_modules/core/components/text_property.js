var Substance = require('substance');
var $$ = React.createElement;
var Annotator = Substance.Document.Annotator;
var AnnotationComponent = require('./annotation_component');

// TextProperty
// ----------------
//

var TextProperty = React.createClass({
  displayName: "text-property",

  renderWithAnnotations: function(text, annotations) {
    var doc = this.props.doc;

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(text);
    };
    annotator.onEnter = function(entry) {
      var anno = doc.get(entry.id);
      // TODO: we need a component factory, so that we can create the appropriate component
      var componentClass = AnnotationComponent;
      return {
        component: componentClass,
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
      var component = $$(context.component, props);
      parentContext.children.push(component);
    };

    var root = { children: [] };
    annotator.start(root, text, annotations);

    var component = $$('span', {
      className: "text-property " + (this.props.className || ""),
      contentEditable: true,
      "data-path": this.props.path.join('.')
    }, root.children);

    return component;
  },

  render: function() {
    var text = this.props.doc.get(this.props.path) || "";
    var annotations = this.props.doc.getIndex('annotations').get(this.props.path);
    return this.renderWithAnnotations(text, annotations);
  },

});

module.exports = TextProperty;
