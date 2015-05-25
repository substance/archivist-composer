var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Toponym view
// ----------------

var Toponym = React.createClass({
  displayName: "Location",
  mixins: [EntityMixin],
  handleEdit: function(e) {
    e.stopPropagation();
  },
  render: function() {
    var className = ["entity toponym"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "type"}, this.props.country),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "description"}, this.props.description)
    );
  }
});

module.exports = Toponym;