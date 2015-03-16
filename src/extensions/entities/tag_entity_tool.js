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

  // Events
  // ----------------

  this.componentDidMount = function() {
    $(this.el).on('click', _.bind(this._toggleEntityReference, this));
  };

  this._toggleEntityReference = function(e) {
  	e.preventDefault();

  	// TODO: check if already toggled, using writer/doc/editor API
  	//       if that's the case, delete reference

  	this.props.switchContext("tagentity");
  };

  // Use editor API to determine wether the tool is toggled or not
  // TODO: implement new selection api and use this method
  this.isActive = function() {
  	// query current selection
  	var refs = this.props.editor.selection.getAnnotations('entity_reference');
  	return refs.length > 0;
  };

  // Rendering
  // ----------------  

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