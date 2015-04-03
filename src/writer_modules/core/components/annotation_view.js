var Substance = require('substance');
var NodeView = require('./node_view');

var AnnotationView = NodeView.extend({
  name: "annotation",

  tagName: 'span',

  getClassNames: function() {
    return this.node.getClassNames().replace('_', '-');
  }
});

module.exports = AnnotationView;
