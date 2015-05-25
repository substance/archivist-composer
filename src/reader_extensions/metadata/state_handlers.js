var MetadataPanel = require("./metadata_panel");

var $$ = React.createElement;

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  // 
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(app) {
    var state = app.state;

    if (state.contextId === "metadata") {
      return $$(MetadataPanel);
    }
  }
};

module.exports = stateHandlers;