var $$ = React.createElement;

// Toponym view
// ----------------

var Toponym = React.createClass({
  displayName: "Toponym",
  render: function() {
    var className = ["entity toponym"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
      $$("div", {className: "type"}, "Toponym"),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "synonyms"}, "Also known as: "+ this.props.synonyms),
      $$("div", {className: "country"}, "Country: "+this.props.country)
    );
  }
});

module.exports = Toponym;