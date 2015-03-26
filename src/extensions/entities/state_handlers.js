var EntitiesPanel = require("./entities_panel");
var TagEntityPanel = require("./tag_entity_panel");
var $$ = React.createElement;

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  // 
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writer) {
    if (writer.state.contextId === "entities") {
      return $$(EntitiesPanel, {
        documentId: writer.props.doc.get('document').guid,
        entityId: writer.state.entityId
      });
    } else if (writer.state.contextId === "tagentity") {
      return $$(TagEntityPanel, {
        writer: writer,
        doc: writer.props.doc
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

  handleReferenceToggle: function(writer, reference) {
    var state = writer.state;

    if (reference.type === "entity_reference") {
      if (state.contextId === "entities" && reference.target === state.entityId) {
        // Toggle off
        writer.replaceState({
          contextId: "entities"
        });
      } else {
        // Toggle on
        writer.replaceState({
          contextId: "entities",
          entityId: reference.target
        });
      }
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

  getHighlightedNodes: function(writer) {
    var doc = writer.props.doc;
    var state = writer.state;

    // Let the extension handle which nodes should be highlighted
    if (state.contextId === "entities" && state.entityId) {
      // Use reference handler
      var references = Object.keys(doc.references.get(state.entityId));
      return references;
    }
  }
};

module.exports = stateHandlers;