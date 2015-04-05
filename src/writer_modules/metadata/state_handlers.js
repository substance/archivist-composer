var MetadataPanel = require("./metadata_panel");
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
    }
  }
};

module.exports = stateHandlers;