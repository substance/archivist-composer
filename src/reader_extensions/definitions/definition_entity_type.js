var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Definition view
// ----------------

var Definition = React.createClass({
  displayName: "Definition",
  mixins: [EntityMixin],

  handleEdit: function(e) {
    e.stopPropagation();
  },

  render: function() {
    var className = ["entity definition"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "title"}, this.props.title),
      $$("div", {className: "description"}, this.props.description)
    );
  }
});

module.exports = Definition;