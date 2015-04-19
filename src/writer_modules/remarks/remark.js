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

  render: function() {
    var className = ["remark", this.props.type];
    if (this.props.active) className.push("active");

    return $$("div", {contentEditable: false, className: className.join(" ")},
      $$('div', {className: 'remark-header'},
        $$('a', {href: "#", className: 'remark-title', onClick: this.handleToggle}, "TODO: display annotated text")  
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