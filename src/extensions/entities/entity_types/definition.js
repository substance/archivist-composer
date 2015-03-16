var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Definition view
// ----------------

var Definition = function(props) {
  Component.call(this, props);
};

Definition.Prototype = function() {

  this.render = function() {
    var className = ["entity definition"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")},
    	$$("div", {className: "type", html: "Definition"}),
      $$("div", {className: "title", html: this.props.title}),
      $$("div", {className: "description", html: this.props.description})
    );
  };
};

Definition.Prototype.prototype = Component.prototype;
Definition.prototype = new Definition.Prototype();

module.exports = Definition;