var SubjectsPanel = require("./subjects_panel");
var EditSubjectReferencePanel = require("./edit_subject_reference_panel");
var $$ = React.createElement;

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  // 
  // => inspects state
  // 
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writer) {
    var s = writer.state;

    if (s.contextId === "subjects") {
      return $$(SubjectsPanel, {
        writer: writer,
        documentId: writer.props.doc.get('document').guid,
        subjectId: writer.state.subjectId
      });
    } else if (s.contextId === "editSubjectReference" && s.subjectReferenceId) {
      return $$(EditSubjectReferencePanel, {
        writer: writer,
        subjectReferenceId: s.subjectReferenceId,
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
          contextId: "editSubjectReference",
          subjectReferenceId: reference.id
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

    // When a subject has been clicked in the subjects panel
    if (state.contextId === "subjects" && state.subjectId) {
      // Use reference handler
      var references = Object.keys(doc.references.get(state.subjectId));
      return references;
    }

    // When a subject reference has been clicked and an edit dialog came up
    if (state.contextId === "editSubjectReference" && state.subjectReferenceId) {
      return [state.subjectReferenceId];
    }
  }
};

module.exports = stateHandlers;