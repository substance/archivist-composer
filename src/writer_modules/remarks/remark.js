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
    var doc = this.props.writerCtrl.doc;
    var remark = doc.get(this.props.remark.id);
    if (!remark) return;

    // The following only reacts on changes to the remarks start and end
    // path, but not to changes to text in spanned nodes.
    // TODO: we need an event proxy here that better tells you that the covered
    // range has been affected (~ContainerAnnotation event proxy)
    if (change.isAffected(remark.startPath) || change.isAffected(remark.endPath)) {
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
    // NOTE: having the remark as instance here is dangerous, as
    // it might have been removed from the document already.
    // TODO: don't store node instances in props
    var remark = doc.get(this.props.remark.id);
    var sourceText;
    if (!remark) {
      sourceText = "N/A";
    } else {
      sourceText = remark.getText();
    }

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