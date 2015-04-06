var $$ = React.createElement;


// Redo Tool
// ----------------

var RedoTool = React.createClass({
  displayName: "SaveTool",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;

    doc.connect(this, {
      'document:changed': this.handleDocumentChange
    });
  },

  // Do we really need a backend?
  handleClick: function() {
    var backend = this.context.backend;
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;

    console.log('TODO: handle redo');
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.state.active !== nextState.active) return true;
  },

  handleDocumentChange: function(change) {
    this.setState({
      active: false
    });
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  render: function() {
    var classNames = ['redo-tool-component', 'tool'];
    if (this.state.active) classNames.push('active');

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-rotate-right"></i>'},
      title: 'Undo',
      onClick: this.handleClick
    });
  }
});

module.exports = RedoTool;