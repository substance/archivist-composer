var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Toponym view
// ----------------

var Toponym = function(props) {
  Component.call(this, props);
};

Toponym.Prototype = function() {

  this.render = function() {
    var className = ["entity toponym"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
    	$$("div", {className: "type", html: "Toponym"}),
      $$("div", {className: "name", html: this.props.name}),
      $$("div", {className: "synonyms", html: "Also known as: "+ this.props.synonyms}),
      $$("div", {className: "country", html: "Country: "+this.props.country})
    );
  };
};

Toponym.Prototype.prototype = Component.prototype;
Toponym.prototype = new Toponym.Prototype();

module.exports = Toponym;