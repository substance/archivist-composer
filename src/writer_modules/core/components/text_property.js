var Substance = require('substance');
var $$ = React.createElement;
var Annotator = Substance.Document.Annotator;
var ContainerAnnotation = Substance.Document.ContainerAnnotation;

var View = require('./view');
var NodeView = require('./node_view');
var AnnotationView = require('./annotation_view');

// TextProperty
// ----------------
//

var TextProperty = React.createClass({
  displayName: "text-property",

  contextTypes: {
    surface: React.PropTypes.object.isRequired,
    getHighlightedNodes: React.PropTypes.func.isRequired,
    getActiveContainerAnnotations: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return { activeContainerAnnotations: {__length__: 0} };
  },

  shouldComponentUpdate: function() {
    // Highlights are treated incrementally because this is triggered by cursor
    // movement and it would be bad to loose the cursor due to rerender.
    this.updateHighlights();
    // For container annotation changes this is different, as we can loose the
    // selection
    var annos = null;
    // TODO: is there a better place to update the internal state?
    var oldAnnos = this.state.activeContainerAnnotations;
    if (this.context.getActiveContainerAnnotations) {
     annos = this.context.getActiveContainerAnnotations();
    }
    this.state.activeContainerAnnotations = annos;

    if (!Substance.isEqual(oldAnnos, annos)) {
      this.renderManually();
    }

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
    // get container annotation anchors if available
    annotations = annotations.concat(this.getContainerAnnotationFragments());

    var highlightedAnnotations = [];
    if (this.context.getHighlightedNodes) {
      highlightedAnnotations = this.context.getHighlightedNodes();
    }

    var activeContainerAnnotations = {};
    var _ids = this.state.activeContainerAnnotations;
    if (_ids && _ids.length && annotations.length > 0) {
      Substance.each(_ids, function(id) {
        activeContainerAnnotations[id] = true;
      });
    }

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(text);
    };
    annotator.onEnter = function(entry) {
      var node = entry.node;
      // TODO: we need a component factory, so that we can create the appropriate component
      var ViewClass = AnnotationView;
      var children = [];
      var props = {
          doc: doc,
          node: node,
          classNames: [],
      };
      if (node instanceof ContainerAnnotation.Anchor) {
        children = [
          $('<span>').addClass('anchor-caret')[0]
        ];
        if (activeContainerAnnotations[entry.id]) {
          props.classNames.push('active');
        }
      } else if (node instanceof TextProperty.AnnotationFragment) {
        var fragment = node;
        ViewClass = View;
        var classNames = fragment.node.getClassNames().replace(/_/g, '-');
        props.classNames.push(classNames);
        props.classNames.push('annotation-fragment');
        props.tagName = 'span';
        props['data-id'] = fragment.node.id;
      }
      if (highlightedAnnotations.indexOf(entry.id) >= 0) {
        props.classNames.push('active');
      }
      return {
        ViewClass: ViewClass,
        props: props,
        children: children
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

  getContainerAnnotationFragments: function() {
    var fragments = [];
    var doc = this.props.doc;
    var path = this.props.path;
    var text = doc.get(path) || "";
    if (!this.context.surface) {
      return fragments;
    }
    var surface = this.context.surface;
    var containerName = surface.getContainerName();
    if (!containerName) {
      return fragments;
    }
    // Get container annotation anchors that lie on this property
    var containerNode = doc.get(containerName);
    var anchors = null;
    if (containerNode && (containerNode instanceof Substance.Document.ContainerNode)) {
      anchors = doc.getIndex('container-annotations').get(containerName, path);
      fragments = fragments.concat(anchors);
    }

    var container = surface.getContainer();
    if (!container) {
      return fragments;
    }
    // If the associated container annotation is active
    // render a fragment for highlighting
    Substance.each(anchors, function(anchor) {
      var id = anchor.id;
      if (this.isContainerAnnotationActive(id)) {
        var range;
        if (anchor.isStart) {
          range = [anchor.getOffset(), text.length];
        } else {
          range = [0, anchor.getOffset()];
        }
        var anno = doc.get(id)
        fragments.push(new TextProperty.AnnotationFragment(anno, range));
      }
    }, this);
    // Create fragments when an active container annotations spans over
    // this property
    if (this.hasActiveContainerAnnotation()) {
      var comp = container.getComponent(this.props.path);
      var pos = comp.getIndex();
      Substance.each(this.state.activeContainerAnnotations, function(id) {
        var anno = doc.get(id);
        var comp = container.getComponent(anno.startPath);
        var startPos = comp.getIndex();
        if (pos<=startPos) {
          return;
        }
        comp = container.getComponent(anno.endPath);
        var endPos = comp.getIndex();
        if (pos>=endPos) {
          return;
        }
        fragments.push(new TextProperty.AnnotationFragment(anno, [0, text.length]));
      }, this);
    }

    return fragments;
  },

  isContainerAnnotationActive: function(anchorId) {
    return (this.state.activeContainerAnnotations.indexOf(anchorId)>=0);
  },

  hasActiveContainerAnnotation: function() {
    return (this.state.activeContainerAnnotations.length > 0);
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
    return $$((this.props.tagName || 'span'), {
      className: "text-property " + (this.props.className || ""),
      contentEditable: true,
      spellCheck: false,
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-path": this.props.path.join('.')
    });
  }
});

TextProperty.ContentView = NodeView.extend({
  createElement: function() {
    return document.createDocumentFragment();
  }
});

TextProperty.AnnotationFragment = function(node, range) {
  this.node = node;
  this.id = node.id;
  this.range = range;
};

Substance.initClass(TextProperty.AnnotationFragment);

TextProperty.AnnotationFragment.static.level = Number.MAX_VALUE;


module.exports = TextProperty;
