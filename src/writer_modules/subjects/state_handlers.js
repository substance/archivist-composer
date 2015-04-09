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

  handleContextPanelCreation: function(writerCtrl) {
    var s = writerCtrl.getState();

    if (s.contextId === SubjectsPanel.contextId) {
      return $$(SubjectsPanel, {
        writerCtrl: writerCtrl,
        // documentId: writer.props.doc.get('document').guid,
        subjectId: s.subjectId
      });
    } else if (s.contextId === EditSubjectReferencePanel.contextId && s.subjectReferenceId) {
      return $$(EditSubjectReferencePanel, {
        writerCtrl: writerCtrl,
        subjectReferenceId: s.subjectReferenceId
      });
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

    // When a subject has been clicked in the subjects panel
    if (state.contextId === "subjects" && state.subjectId) {
      var references = Object.keys(doc.subjectReferencesIndex.get(state.subjectId));
      return references;
    }

    // When a subject reference has been clicked and an edit dialog came up
    if (state.contextId === EditSubjectReferencePanel.contextId && state.subjectReferenceId) {
      return [state.subjectReferenceId];
    }
  },

  // Determine active subject reference nodes
  // -----------------
  //
  // => inspects state
  //
  // Based on writer state, determine which container nodes should be highlighted in the content panel
  // @returns a list of nodes to be highlighted

  getActiveContainerAnnotations: function(writerCtrl) {
    var state = writerCtrl.getState();

    // When a subject has been clicked in the subjects panel
    if (state.contextId === EditSubjectReferencePanel.contextId && state.subjectReferenceId) {
      return [ state.subjectReferenceId ];
    }
  }
};

module.exports = stateHandlers;