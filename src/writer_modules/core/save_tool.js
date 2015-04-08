var $$ = React.createElement;

// Save Tool
// ----------------

var SaveTool = React.createClass({
  displayName: "SaveTool",

  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    notifications: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;

    doc.connect(this, {
      'document:changed': this.handleDocumentChange
    });
  },

  handleClick: function(e) {
    e.preventDefault();
    var backend = this.context.backend;
    var notifications = this.context.notifications;
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;

    if (this.state.active && !doc.__isSaving) {
      doc.__isSaving = true;

      notifications.addMessage({
        type: "progress",
        message: "Saving document ..."
      });

      backend.saveDocument(doc, function(err) {
        doc.__isSaving = false;
        if (err) {
          notifications.addMessage({
            type: "error",
            message: err.message
          });
        } else {
          notifications.addMessage({
            type: "info",
            message: "Saved document"
          });
          this.setState({
            active: false
          });
        }
      }.bind(this));
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.active !== nextState.active;
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
    var classNames = ['save-tool-component', 'tool'];
    if (this.state.active) classNames.push('active');

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-save"></i>'},
      title: 'Save document',
      onClick: this.handleClick
    });
  }
});

module.exports = SaveTool;