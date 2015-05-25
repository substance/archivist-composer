var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Prison view
// ----------------

var Prison = React.createClass({
  displayName: "Prison",
  mixins: [EntityMixin],
  handleEdit: function(e) {
    e.stopPropagation();
  },
  render: function() {
    var className = ["entity prison"];
    var name = this.props.name.toLowerCase().indexOf("неизвестно") >= 0 ? this.props.nearest_locality : this.props.name;
    if (this.props.active) className.push("active");
    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "type"}, "Prison"),
      $$("div", {className: "name"}, name),
      $$("div", {className: "prison-type"}, "Prison type: " + this.props.prison_type.join(', ')),
      $$("div", {className: "synonyms"}, "Known as: "+ this.props.synonyms.join(', ')),
      $$("div", {className: "country"}, "Country: "+this.props.country),
      $$("div", {className: "description"}, this.props.description),
      $$("a", {className: "edit", target: "_blank", href: './prisons/' + this.props.id, onClick: this.handleEdit},
        $$("i", {className: "fa fa-pencil-square-o"})
      )
    );
  }
});

module.exports = Prison;