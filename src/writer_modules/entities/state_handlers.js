var EntitiesPanel = require("./entities_panel");
var TagEntityPanel = require("./tag_entity_panel");
var $$ = React.createElement;

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  // 
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writerCtrl) {
    var state = writerCtrl.getState();

    if (state.contextId === "entities") {
      return $$(EntitiesPanel, {
        writerCtrl: writerCtrl, // writerCtrl needed?
        entityId: state.entityId
      });
    } else if (state.contextId === "tagentity") {
      return $$(TagEntityPanel, {
        writerCtrl: writerCtrl
      });
    }
  },

  // Handle click on reference
  // -----------------
  // 
  // => modifies state
  // 
  // When user clicks on a reference somewhere, the extension gets the chance to
  // manipulate writer state (e.g. switching the contextId) so a custom panel
  // can display contextual information (see Entities Panel). Also data can be loaded asynchronously
  // using a custom transition
  // handleReferenceToggle: function(writerCtrl, reference) {
  //   var state = writerCtrl.getState();

  //   if (reference.type === "entity_reference") {
  //     if (state.contextId === "entities" && reference.target === state.entityId) {
  //       // Toggle off
  //       writerCtrl.replaceState({
  //         contextId: "entities"
  //       });
  //     } else {
  //       // Toggle on
  //       writerCtrl.replaceState({
  //         contextId: "entities",
  //         entityId: reference.target
  //       });
  //     }
  //     return true;
  //   }
  // },


  // Handle selection change
  // -----------------
  //
  // => modifies state
  //
  // When user navigates over a reference somewhere, the extension gets the chance to
  // manipulate writer state (e.g. switching the contextId) so a custom panel
  // can display contextual information.

  handleSelectionChange: function(writerCtrl, sel, annotations) {
    if (sel.isNull() || !sel.isPropertySelection()) return;
    var range = sel.getTextRange();
    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "entity_reference");

    if (annotations.length > 0) {
      var ref = annotations[0];
      writerCtrl.replaceState({
        contextId: EntitiesPanel.contextId,
        entityId: ref.target
      });
      return true;
    }
  },

  // Determine highlighted nodes
  // -----------------
  // 
  // => inspects state
  // 
  // Based on writer state, determine which nodes should be highlighted in the content panel
  // @returns a list of nodes to be highlighted

  getHighlightedNodes: function(writerCtrl) {
    var doc = writerCtrl.doc;
    var state = writerCtrl.getState();

    // Let the extension handle which nodes should be highlighted
    if (state.contextId === "entities" && state.entityId) {
      // Use reference handler
      var references = Object.keys(doc.references.get(state.entityId));
      return references;
    }
  }
};

module.exports = stateHandlers;