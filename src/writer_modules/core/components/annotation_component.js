var $$ = React.createElement;

var AnnotationComponent = React.createClass({

  displayName: "Annotation",

  render: function() {
    // get the sequence of class names
    var classNames = this.props.node.getClassNames();
    // HACK: we should think about moving to dashes in type names so that we can
    // better map to CSS class names.
    classNames = classNames.replace('_', '-');
    return $$("span", { className: classNames, "data-id": this.props.node.id },
      this.props.children
    );
  }
});

module.exports = AnnotationComponent;
