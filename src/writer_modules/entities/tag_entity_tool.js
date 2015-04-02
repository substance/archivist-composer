var $$ = React.createElement;

var TagEntityTool = React.createClass({
  displayName: "TagEntityTool",
  handleClick: function() {
  	this.props.switchContext("tagentity");
  },

  // Use writer API to determine wether the tool is toggled or not
  // TODO: implement new selection api and use this method
  isActive: function() {
  	// query current selection
  	// var refs = this.props.writer.selection.getAnnotations('entity_reference');
  	// return refs.length > 0;
  },

  render: function() {
    return $$("a", {
      className: 'tag-entity-tool-component tool',
      href: "#",
      title: 'Tag Entity',
      onClick: this.handleClick,
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-bullseye"></i>'}
    });
  }
});

module.exports = TagEntityTool;