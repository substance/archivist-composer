var $$ = React.createElement;

// Definition view
// ----------------

var Definition = React.createClass({
  displayName: "Definition",
  render: function() {
    var className = ["entity definition"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
      $$("div", {className: "type"}, "Definition"),
      $$("div", {className: "title"}, this.props.title),
      $$("div", {className: "description"}, this.props.description)
    );
  }
});

module.exports = Definition;