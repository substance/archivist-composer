var Substance = require("substance");
var $$ = React.createElement;

// Entity types

var MetadataPanel = React.createClass({
  displayName: "Info",

  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      
    };
  },

  render: function() {
    var state = this.state;
    var props = this.props;

    return $$("div", {className: "panel metadata-panel-component"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'metadata'}, "META DATA EDITOR COMES HERE")
      )
    );
  }
});

MetadataPanel.contextId = "metadata";
MetadataPanel.icon = "fa-info";

module.exports = MetadataPanel;
