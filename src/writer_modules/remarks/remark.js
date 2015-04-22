var $$ = React.createElement;
var TextProperty = require("substance/writer").TextProperty;

// Remark
// ----------------

var Remark = React.createClass({
  displayName: "Remark",

  handleToggle: function(e) {
    var writerCtrl = this.props.writerCtrl;
    var remarkId = this.props.remark.id;

    e.preventDefault();
    
    if (writerCtrl.state.remarkId === remarkId) {
      writerCtrl.replaceState({
        contextId: "remarks"
      });
    } else {
      writerCtrl.replaceState({
        contextId: "remarks",
        remarkId: remarkId
      });
    }
  },

  componentDidMount: function() {
    this.props.writerCtrl.doc.connect(this, {
      'document:changed': this.handleDocumentChange
    });
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.doc.disconnect(this);
  },

  handleDocumentChange: function(change, info) {
    // TODO: is there a way to check if a doc update actually affects the remark annotation?
    // This is currently done way to often
    if (!change.isAffected([this.props.remark.id, "content"])) {
      this.forceUpdate();  
    }
  },

  handleDelete: function(e) {
    e.preventDefault();
    var writerCtrl = this.props.writerCtrl;
    var doc = this.props.writerCtrl.doc;
    var tx = doc.startTransaction();

    try {
      tx.delete(this.props.remark.id);
      tx.save();
      writerCtrl.replaceState({
        contextId: "remarks"
      });
    } finally {
      tx.cleanup();
    }
  },

  render: function() {
    var className = ["remark", this.props.type];
    if (this.props.active) className.push("active");

    var doc = this.props.writerCtrl.doc;
    var remarkSel = this.props.remark.getSelection();
    var sourceText = doc.getTextForSelection(remarkSel);

    return $$("div", {className: className.join(" ")},
      $$('div', {contentEditable: false, className: 'remark-header', onClick: this.handleToggle},
        $$('a', {href: "#", className: 'remark-title'}, sourceText),
        $$('a', {
          href: "#",
          className: 'delete-remark',
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-remove"></i>'},
          onClick: this.handleDelete
        })
      ),
      
      $$(TextProperty, {
        tagName: "div",
        doc: this.props.writerCtrl.doc,
        path: [this.props.remark.id, "content"],
        writerCtrl: this.props.writerCtrl,
      })
    );
  }
});


module.exports = Remark;