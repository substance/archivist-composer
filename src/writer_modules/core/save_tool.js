var $$ = React.createElement;

// Save Tool
// ----------------

var SaveTool = React.createClass({
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

  handleClick: function() {
    var backend = this.context.backend;
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;

    if (this.state.active) {
      backend.saveDocument(doc, function(err) {
        if (err) return console.err('saving of document failed');

        this.setState({
          active: false
        })
      }.bind(this));
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.state.active !== nextState.active) return true;
  },

  handleDocumentChange: function(change) {
    this.setState({
      active: true
    });
  },

  getInitialState: function() {
    return {
      active: false
    }
  },

  render: function() {
    console.log('SaveTool.render');
    var classNames = ['save-tool-component', 'tool'];
    if (this.state.active) classNames.push('active');

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-save"></i>'},
      title: 'Tag Subject',
      onClick: this.handleClick
    });
  }
});

module.exports = SaveTool;