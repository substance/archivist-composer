var $$ = React.createElement;

// TagSubjectTool
// ----------------

var TagSubjectTool = React.createClass({
  displayName: "TagSubjectTool",

  componentDidMount: function() {
    var writerCtrl = this.props.writerCtrl;
    writerCtrl.connect(this, {
      'selection:changed': this.handleSelectionChange
    });
  },

  handleSelectionChange: function(sel) {
    var writerCtrl = this.props.writerCtrl;

    // TODO: this will allow container selections (!)
    if (sel.isNull() || !sel.isPropertySelection()) {
      this.setState({
        active: false,
        selected: false
      });
    } else {
      var range = sel.getTextRange();
      var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "subject_reference");

      var selected = annotations.length > 0;
      var active = !sel.isCollapsed();

      this.setState({
        active: active,
        selected: selected
      });
    }
  },

  handleClick: function() {
    var writerCtrl = this.props.writerCtrl;

    var subjectReference = writerCtrl.annotate({
      type: "subject_reference",
      target: []
    });

    // Switch state to highlight newly created reference
    writerCtrl.replaceState({
      contextId: "editSubjectReference",
      subjectReferenceId: subjectReference.id
    });
  },

  getInitialState: function() {
    return {
      active: false,
      selected: false
    };
  },

  render: function() {
    var classNames = ['tag-entity-tool-component', 'tool'];
    if (this.state.active) classNames.push("active");
    if (this.state.selected) classNames.push("selected");

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-tag"></i>'},
      title: 'Tag Subject',
      onClick: this.handleClick
    });
  }
});

module.exports = TagSubjectTool;