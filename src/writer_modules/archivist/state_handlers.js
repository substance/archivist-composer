var $$ = React.createElement;

var stateHandlers = {

  handleSelectionChange: function(app, sel) {
    var surface = app.getSurface();
    if (surface.name !== "content") return;

    if (sel.isNull() || !sel.isCollapsed()) return;

    var annotations = app.doc.annotationIndex.get(sel.getPath(), sel.getStartOffset(), sel.getEndOffset(), "reference");

    // Switch to a neutral state if no annotation matches have been found
    if (annotations.length === 0 && app.state.contextId !== "editSubjectReference") {
      var prevContextId = app.state.contextId;
      var nextContextId = "entities";

      if (prevContextId === "editSubjectReference" || prevContextId === "subjects") {
        nextContextId = "subjects";
      }

      app.replaceState({
        contextId: nextContextId
      });
      return true;
    }
  }
};

module.exports = stateHandlers;