var $$ = React.createElement;

// Prison view
// ----------------

var Prison = React.createClass({
  displayName: "Prison",
  render: function() {
    var className = ["entity prison"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
      $$("div", {className: "type"}, "Prison"),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "synonyms"}, "Also known as: "+ this.props.synonyms),
      $$("div", {className: "country"}, "Country: "+this.props.country)
    );
  }
});

module.exports = Prison;