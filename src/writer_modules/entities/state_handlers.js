var EntitiesPanel = require("./entities_panel");
var TagEntityPanel = require("./tag_entity_panel");

var ShowEntityReferencePanel = require("./show_entity_reference_panel")
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
        writerCtrl: writerCtrl,
        entityId: state.entityId
      });
    } else if (state.contextId === "showEntityReference") {
      return $$(ShowEntityReferencePanel, {
        writerCtrl: writerCtrl,
        entityReferenceId: state.entityReferenceId
      });
    } else if (state.contextId === "tagentity") {
      return $$(TagEntityPanel, {
        writerCtrl: writerCtrl,
        path: state.path,
        range: state.range
      });
    }
  },

  // Handle selection change
  // -----------------
  //
  // => modifies state
  //
  // When user navigates over a reference somewhere, the extension gets the chance to
  // manipulate writer state (e.g. switching the contextId) so a custom panel
  // can display contextual information.

  handleSelectionChange: function(writerCtrl, sel, annotations) {
    if (sel.isNull() || !sel.isPropertySelection() || !sel.isCollapsed()) return;
    var range = sel.getTextRange();
    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "entity_reference");
    var surface = writerCtrl.getSurface();
    if (surface.name !== "content") return false;
    if (annotations.length > 0) {
      var ref = annotations[0];
      console.log('Ref', ref);
      writerCtrl.replaceState({
        contextId: ShowEntityReferencePanel.contextId,
        entityReferenceId: ref.id
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
    } else if (state.contextId === "showEntityReference" && state.entityReferenceId) {
      return [state.entityReferenceId];
    }
  }
};

module.exports = stateHandlers;