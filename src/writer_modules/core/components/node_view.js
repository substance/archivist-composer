var Substance = require('substance');

function NodeView(props) {
  this.props = props;
  this.doc = props.doc;
  this.node = props.node;
};

NodeView.Prototype = function() {

  this.tagName = 'div';

  this.createElement = function() {
    var element = document.createElement(this.tagName);
    var classNames = this.getClassNames();
    $(element).addClass(classNames);
    element.dataset.id = this.node.id;
    return element;
  };

  this.getClassNames = function() {
    return [];
  };

  this.render = function() {
    var element = this.createElement();
    var children = this.props.children;
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (Substance.isString(child)) {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof NodeView) {
          var el = child.render();
          element.appendChild(el);
        } else if (child instanceof window.Element) {
          element.appendChild(child);
        }
      }
    }
    return element;
  };

};

Substance.initClass(NodeView);

module.exports = NodeView;