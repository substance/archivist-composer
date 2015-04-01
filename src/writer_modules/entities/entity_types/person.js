var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Prison view
// ----------------

var Person = React.createClass({
  displayName: "Person",
  mixins: [EntityMixin],
  render: function() {
    var className = ["entity person"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "type"}, "Person"),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "country"}, "Country: "+this.props.country)
    );
  }
});

module.exports = Person;