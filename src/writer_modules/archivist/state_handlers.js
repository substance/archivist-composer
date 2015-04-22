var $$ = React.createElement;

var stateHandlers = {

  handleSelectionChange: function(writerCtrl, sel) {
    var surface = writerCtrl.getSurface();
    if (surface.name !== "content") return;

    if (sel.isNull() || !sel.isCollapsed()) return;

    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), sel.getStartOffset(), sel.getEndOffset(), "reference");

    // Switch to a neutral state if no annotation matches have been found
    if (annotations.length === 0 && writerCtrl.state.contextId !== "editSubjectReference") {
      var prevContextId = writerCtrl.state.contextId;
      var nextContextId = "entities";

      if (prevContextId === "editSubjectReference" || prevContextId === "subjects") {
        nextContextId = "subjects";
      }

      writerCtrl.replaceState({
        contextId: nextContextId
      });
      return true;
    }
  }
};

module.exports = stateHandlers;