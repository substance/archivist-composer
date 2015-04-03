var $$ = React.createElement;

var stateHandlers = {

  handleSelectionChange: function(writerCtrl, sel, annotations) {

    if (sel.isNull() || !sel.isPropertySelection()) return;

    var range = sel.getTextRange();
    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1]);

    // Switch to a neutral state if no annotatino matches have been found
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