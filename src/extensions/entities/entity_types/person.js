var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Person view
// ----------------

var Person = function(props) {
  Component.call(this, props);
};

Person.Prototype = function() {

  this.render = function() {
    var className = ["entity person"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
    	$$("div", {className: "type", html: "Person"}),
      $$("div", {className: "name", html: this.props.name}),
      $$("div", {className: "country", html: "Country: "+this.props.country})
    );
  };
};

Person.Prototype.prototype = Component.prototype;
Person.prototype = new Person.Prototype();

module.exports = Person;