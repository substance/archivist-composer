var EntitiesPanel = require("./entities_panel");

var $$ = React.createElement;

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  //
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(app) {
    var state = app.state;

    if (state.contextId === "entities") {
      return $$(EntitiesPanel, {
        entityId: state.entityId
      });
    }
  },

  // Handle selection change
  // -----------------
  //
  // => modifies state
  //
  // When user navigates over a reference somewhere, the extension gets the chance to
  // manipulate app state (e.g. switching the contextId) so a custom panel
  // can display contextual information.

  handleSelectionChange: function(app, sel, annotations) {
    // if (sel.isNull() || !sel.isPropertySelection() || !sel.isCollapsed()) return;
    // var annotations = app.doc.annotationIndex.get(sel.getPath(), sel.getStartOffset(), sel.getEndOffset(), "entity_reference");
    // var surface = app.getSurface();
    // if (surface.name !== "content") return false;
    // if (annotations.length > 0) {
    //   var ref = annotations[0];
    //   app.replaceState({
    //     contextId: ShowEntityReferencePanel.contextId,
    //     entityReferenceId: ref.id
    //   });
    //   return true;
    // }
  },

  // Determine highlighted nodes
  // -----------------
  //
  // => inspects state
  //
  // Based on app state, determine which nodes should be highlighted in the content panel
  // @returns a list of nodes to be highlighted

  getHighlightedNodes: function(app) {
    var doc = app.doc;
    var state = app.state;

    // Let the extension handle which nodes should be highlighted
    if (state.contextId === "entities" && state.entityId) {
      // Use reference handler
      var references = Object.keys(doc.entityReferencesIndex.get(state.entityId));
      return references;
    } else if (state.entityReferenceId) {
      return [state.entityReferenceId];
    }
  }
};

module.exports = stateHandlers;