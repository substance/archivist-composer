var $$ = React.createElement;

var TagEntityTool = React.createClass({
  displayName: "TagEntityTool",

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
      var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), sel.getStartOffset(), sel.getEndOffset(), "entity_reference");
      var selected = false;
      var active = annotations.length === 0 && !sel.isCollapsed();
      this.setState({
        active: active,
        selected: selected
      });
    }
  },

  handleMouseDown: function(e) {
    e.preventDefault();

    var searchString = window.getSelection().toString();

    if (!this.state.active) return;

    var writerCtrl = this.props.writerCtrl;
    var sel = writerCtrl.getSelection();

    if (sel.isNull() || !sel.isPropertySelection()) return;

    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), sel.getStartOffset(), sel.getEndOffset(), "entity_reference");

    if (annotations.length > 0) {
      writerCtrl.deleteAnnotation(annotations[0].id);
      writerCtrl.replaceState({
        contextId: "entities"
      });
    } else {
      // Do nothing if selection is collapsed
      if (sel.isCollapsed()) return;
      writerCtrl.replaceState({
        contextId: "tagentity",
        path: sel.getPath(),
        startOffset: sel.getStartOffset(),
        endOffset: sel.getEndOffset(),
        searchString: searchString
      });
    }
  },

  handleClick: function(e) {
    e.preventDefault(e);
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
      title: 'Tag Entity',
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick,
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-bullseye"></i>'}
    });
  }
});

module.exports = TagEntityTool;