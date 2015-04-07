var $$ = React.createElement;

var stateHandlers = {

  handleSelectionChange: function(writerCtrl, sel) {
    var surface = writerCtrl.getSurface();
    if (surface.name !== "content") return;

    if (sel.isNull() || !sel.isPropertySelection()) return;

    var range = sel.getTextRange();
    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1]);
    
    console.log('le surface', surface);

    // Switch to a neutral state if no annotation matches have been found
    if (annotations.length === 0) {
      var prevContextId = writerCtrl.state.contextId;
      var nextContextId = "entities";

      if (prevContextId === "editSubjectReference" || prevContextId === "subjects") {
        nextContextId = "subjects";
      }

      // Change to TOC or metadata panel
      writerCtrl.replaceState({
        contextId: nextContextId
      });
      return true;
    }
  }

};

module.exports = stateHandlers;