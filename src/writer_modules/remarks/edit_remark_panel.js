// var Substance = require("substance");
var $$ = React.createElement;
// var _ = require("substance/helpers");


var EditRemarkPanel = React.createClass({
  displayName: "EditRemarkPanel",

  // Events
  // ------------

  componentDidMount: function() {
    
  },

  handleCancel: function(e) {
    e.preventDefault();
    this.props.writerCtrl.replaceState({
      contextId: "entities"
    });
  },

  handleEdit: function(e) {
    e.preventDefault();
    this.props.writerCtrl.replaceState({
      contextId: "tagentity",
      entityReferenceId: this.props.entityReferenceId
    });
  },

  handleClose: function(e) {
    e.preventDefault();
    var writerCtrl = this.props.writerCtrl;
    var doc = this.props.writerCtrl.doc;
    var tx = doc.startTransaction();

    try {
      tx.delete(this.props.remark.id);
      tx.save();
      writerCtrl.replaceState({
        contextId: "entities"
      });
    } finally {
      tx.cleanup();
    }
  },

  render: function() {
    var props = this.props;

    var remarkItem = $$('div', null, 'HI I AM A REMARK');

    return $$("div", {className: "panel dialog edit-remark-panel-component"},
      // Dialog Header
      $$('div', {className: "dialog-header"},
        $$('a', {
          href: "#",
          className: 'back',
          onClick: this.handleCancel,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-chevron-left"></i>'}
        }),
        $$('div', {className: 'label'}, "Remark"),
        $$('div', {className: 'actions'},
          $$('a', {
            href: "#",
            className: "close-remark",
            onClick: this.handleDeleteReference,
            dangerouslySetInnerHTML: {__html: '<i class="fa fa-close"></i> Close'}
          })
        )
      ),
      // Panel Content
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'entities'},
          remarkItem
        )
      )
    );
  }
});

EditRemarkPanel.contextId = "editRemark";
EditRemarkPanel.icon = "fa-comment";

// No toggle is shown
EditRemarkPanel.isDialog = true;

module.exports = EditRemarkPanel;