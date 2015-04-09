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

  // Handle click on reference
  // -----------------
  //
  // => modifies state
  //
  // When user clicks on a reference somewhere, the extension gets the chance to
  // manipulate writer state (e.g. switching the contextId) so a custom panel
  // can display contextual information (see Subjects Panel).

  // handleReferenceToggle: function(writerCtrl, reference) {
  //   var state = writerCtrl.getState();

  //   if (reference.type === "subject_reference") {

  //     if (state.contextId === EditSubjectReferencePanel.contextId && reference.id === state.subjectReferenceId) {
  //       // Toggle off
  //       writerCtrl.replaceState({
  //         contextId: "subjects"
  //       });
  //     } else {
  //       // Toggle on
  //       writerCtrl.replaceState({
  //         contextId: EditSubjectReferencePanel.contextId,
  //         subjectReferenceId: reference.id
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
    // if (sel.isNull() || !sel.isPropertySelection()) return;

    // var range = sel.getTextRange();
    // var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "subject_reference");

    // if (annotations.length > 0) {
    //   var ref = annotations[0];
    //   writerCtrl.replaceState({
    //     contextId: EditSubjectReferencePanel.contextId,
    //     subjectReferenceId: ref.id
    //   });
    //   return true;
    // }
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
  }
};

module.exports = stateHandlers;