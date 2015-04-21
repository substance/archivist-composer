var MetadataPanel = require("./metadata_panel");
var SelectLocationPanel = require("./select_location_panel");

var $$ = React.createElement;

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  // 
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writerCtrl) {
    var state = writerCtrl.getState();

    if (state.contextId === "metadata") {
      return $$(MetadataPanel, {
        writerCtrl: writerCtrl
      });
    } else if (["selectPrison", "selectWaypoint", "selectProjectLocation"], state.contextId) {
      return $$(SelectLocationPanel, {
        writerCtrl: writerCtrl
      });
    }
  }
};

module.exports = stateHandlers;