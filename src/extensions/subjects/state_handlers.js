var SubjectsPanel = require("./subjects_panel");
var TagSubjectPanel = require("./tag_subject_panel");
var $$ = React.createElement;


var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  // 
  // => inspects state
  // 
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writer) {
    if (writer.state.contextId === "subjects") {
      return $$(SubjectsPanel, {
        documentId: writer.props.doc.get('document').guid,
        subjectId: writer.state.subjectId
      });
    } else if (writer.state.contextId === "tagsubject") {
      return $$(TagSubjectPanel, {
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
  // can display contextual information (see Subjects Panel).

  handleReferenceToggle: function(writer, reference) {
    var state = writer.state;

    if (reference.type === "subject_reference") {

      if (state.contextId === "subjects" && reference.target === state.subjectId) {
        // Toggle off
        writer.replaceState({
          contextId: "subjects"
        });
      } else {
        // Toggle on
        writer.replaceState({
          contextId: "subjects",
          subjectId: reference.target
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
    if (state.contextId === "subjects" && state.subjectId) {
      // Use reference handler
      var references = Object.keys(doc.references.get(state.subjectId));
      return references;
    }
  }
};

module.exports = stateHandlers;