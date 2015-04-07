var $$ = React.createElement;

var StrongTool = React.createClass({
  displayName: "StrongTool",

  componentDidMount: function() {
    var writerCtrl = this.props.writerCtrl;
    writerCtrl.connect(this, {
      'selection:changed': this.handleSelectionChange
    });
  },

  handleSelectionChange: function(sel) {
    var writerCtrl = this.props.writerCtrl;

    if (sel.isNull() || !sel.isPropertySelection()) {
      this.setState({
        active: false,
        selected: false
      });
    } else {
      var range = sel.getTextRange();
      var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "strong");
      var selected = annotations.length > 0;
      var active = !sel.isCollapsed();

      this.setState({
        active: active,
        selected: selected
      });
    }
  },

  handleClick: function() {
    // toggle annotation
    var writerCtrl = this.props.writerCtrl;
    var sel = writerCtrl.getSelection();

    if (sel.isNull() || !sel.isPropertySelection()) return;

    var range = sel.getTextRange();
    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "strong");

    if (annotations.length > 0) {
      writerCtrl.deleteAnnotation(annotations[0].id);
    } else {
      // Do nothing if selection is collapsed
      if (sel.isCollapsed()) return;

      // Create new subject reference
      var subjectReference = writerCtrl.annotate({
        type: "strong"
      });
    }
  },

  getInitialState: function() {
    return {
      active: false,
      selected: false
    };
  },

  render: function() {
    var classNames = ['strong-tool-component', 'tool'];
    if (this.state.active) classNames.push("active");
    if (this.state.selected) classNames.push("selected");

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      title: 'Strong',
      onClick: this.handleClick,
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-bold"></i>'}
    });
  }
});

module.exports = StrongTool;