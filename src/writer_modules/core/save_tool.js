var $$ = React.createElement;

// SaveTool
// ----------------

var SaveTool = React.createClass({
  displayName: "SaveTool",

  handleClick: function() {
    console.log('implement: saving');
  },

  render: function() {
    return $$("a", {
      className: 'save-tool-component tool',
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-save"></i>'},
      title: 'Tag Subject',
      onClick: this.handleClick
    });
  }
});

module.exports = SaveTool;