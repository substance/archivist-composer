var Application = require("substance-application")
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

var Subject = function(props) {
  Component.call(this, props);
};

Subject.Prototype = function() {

  this.render = function() {
    var className = ["subject", this.props.type];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" ")}, [
      $$('div', {className: 'name', html: this.props.name}),
      $$('div', {className: 'id', html: this.props.id})
    ]);
  };
};

Subject.Prototype.prototype = Component.prototype;
Subject.prototype = new Subject.Prototype();

module.exports = Subject;