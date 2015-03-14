var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// TagEntityTool
// ----------------

var TagEntityTool = function(props) {
  Component.call(this, props);
};

TagEntityTool.Prototype = function() {

  this.render = function() {
    return $$("a", {
    	className: 'tag-entity-tool-component tool', 
    	href: "#",
    	html: '<i class="fa fa-bullseye"></i>',
    	title: 'Tag Entity'
    });
  };
};

TagEntityTool.Prototype.prototype = Component.prototype;
TagEntityTool.prototype = new TagEntityTool.Prototype();

module.exports = TagEntityTool;