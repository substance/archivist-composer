var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Toponym view
// ----------------

var Toponym = React.createClass({
  displayName: "Toponym",
  mixins: [EntityMixin],
  render: function() {
    var className = ["entity toponym"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "type"}, "Toponym"),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "synonyms"}, "Also known as: "+ this.props.synonyms),
      $$("div", {className: "country"}, "Country: "+this.props.country),
      $$("div", {className: "description"}, this.props.description)
    );
  }
});

module.exports = Toponym;