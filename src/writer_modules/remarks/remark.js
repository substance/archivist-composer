var $$ = React.createElement;
var TextProperty = require("substance/writer").TextProperty;

// Remark
// ----------------

var Remark = React.createClass({
  displayName: "Remark",

  handleToggle: function(e) {
    this.props.handleToggle(this.props.remark.id);
    e.preventDefault();
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

    return $$("div", {className: className.join(" ")},
      $$('div', {contentEditable: false, className: 'remark-header', onClick: this.handleToggle},
        $$('a', {href: "#", className: 'remark-title'}, "TODO: display annotated text"),
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