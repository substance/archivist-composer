var MetadataPanel = require("./metadata_panel");
var SelectLocationPanel = require("./select_location_panel");

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
    } else if (["selectPrison", "selectWaypoint", "selectProjectLocation"], state.contextId) {
      return $$(SelectLocationPanel);
    }
  }
};

module.exports = stateHandlers;