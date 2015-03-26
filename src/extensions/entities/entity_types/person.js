var $$ = React.createElement;

// Prison view
// ----------------

var Person = React.createClass({
  displayName: "Person",
  render: function() {
    var className = ["entity person"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
      $$("div", {className: "type"}, "Person"),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "country"}, "Country: "+this.props.country)
    );
  }
});

module.exports = Person;