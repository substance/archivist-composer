var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Prison view
// ----------------

var Prison = function(props) {
  Component.call(this, props);
};

Prison.Prototype = function() {

  this.render = function() {
    var className = ["entity prison"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
    	$$("div", {className: "type", html: "Prison"}),
      $$("div", {className: "name", html: this.props.name}),
      $$("div", {className: "synonyms", html: "Also known as: "+ this.props.synonyms}),
      $$("div", {className: "country", html: "Country: "+this.props.country})
    );
  };
};

Prison.Prototype.prototype = Component.prototype;
Prison.prototype = new Prison.Prototype();

module.exports = Prison;