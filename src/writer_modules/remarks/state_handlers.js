var RemarksPanel = require("./remarks_panel");
var $$ = React.createElement;
var Substance = require("substance");
var _ = require("substance/helpers");

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  //
  // => inspects state
  //
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writerCtrl) {
    var s = writerCtrl.getState();
    var doc = writerCtrl.doc;

    var remarks = _.map(doc.remarksIndex.get(), function(remark) {
      return remark;
    });

    if (s.contextId === RemarksPanel.contextId) {
      var activeRemark;
      if (s.remarkId) {
        activeRemark = doc.get(s.remarkId);
      }

      return $$(RemarksPanel, {
        writerCtrl: writerCtrl,
        remarks: remarks,
        activeRemark: activeRemark
      });
    }
  },

  handleSelectionChange: function(writerCtrl, sel, annotations) {
    if (sel.isNull()) return;
    var surface = writerCtrl.getSurface();
    if (surface.name !== "content") return false;

    var doc = writerCtrl.doc;
    var contentContainer = surface.getContainer();

    var remarks = doc.remarksIndex.get();
    var activeRemark = null;

    // HACK: this should be done with a proper index
    _.each(remarks, function(remark) {
      var annoSel = Substance.Document.Selection.create(contentContainer,
          remark.startPath, remark.startOffset, remark.endPath, remark.endOffset);

      if (annoSel.overlaps(sel)) {
        activeRemark = remark;
      }
    });

    if (activeRemark) {
      writerCtrl.replaceState({
        contextId: RemarksPanel.contextId,
        remarkId: activeRemark.id
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

  // getHighlightedNodes: function(writerCtrl) {
  //   var doc = writerCtrl.doc;
  //   var state = writerCtrl.getState();

  //   // When a subject has been clicked in the subjects panel
  //   if (state.contextId === "subjects" && state.subjectId) {
  //     var references = Object.keys(doc.subjectReferencesIndex.get(state.subjectId));
  //     return references;
  //   }

  //   // When a subject reference has been clicked and an edit dialog came up
  //   if (state.contextId === EditSubjectReferencePanel.contextId && state.subjectReferenceId) {
  //     return [state.subjectReferenceId];
  //   }
  // },

  // Determine active subject reference nodes
  // -----------------
  //
  // => inspects state
  //
  // Based on writer state, determine which container nodes should be highlighted in the content panel
  // @returns a list of nodes to be highlighted

  getActiveContainerAnnotations: function(writerCtrl) {
    var state = writerCtrl.getState();
    var doc = writerCtrl.doc;
    var remarks = Object.keys(doc.remarksIndex.get());

    
    // TODO: only do this when in some remarks context
    return remarks;

    // When a subject has been clicked in the subjects panel
    // if (state.contextId === EditSubjectReferencePanel.contextId && state.subjectReferenceId) {
    //   return [ state.subjectReferenceId ];
    // }
    // if (state.contextId === "subjects" && state.subjectId) {
    //   var doc = writerCtrl.doc;
    //   var references = Object.keys(doc.subjectReferencesIndex.get(state.subjectId));
    //   return references;
    // }
  }
};

module.exports = stateHandlers;