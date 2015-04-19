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

  // handleSelectionChange: function(writerCtrl, sel, annotations) {
  //   if (sel.isNull()) return;
  //   var surface = writerCtrl.getSurface();
  //   if (surface.name !== "content" || writerCtrl.state.contextId !== "remarks") return false;

  //   var doc = writerCtrl.doc;
  //   var contentContainer = surface.getContainer();

  //   var remarks = doc.remarksIndex.get();
  //   var activeRemark = null;

  //   // HACK: this should be done with a proper index
  //   _.each(remarks, function(remark) {
  //     var annoSel = Substance.Document.Selection.create(contentContainer,
  //         remark.startPath, remark.startOffset, remark.endPath, remark.endOffset);

  //     if (annoSel.overlaps(sel)) {
  //       activeRemark = remark;
  //     }
  //   });

  //   if (activeRemark) {
  //     writerCtrl.replaceState({
  //       contextId: RemarksPanel.contextId,
  //       remarkId: activeRemark.id
  //     });

  //     return true;
  //   }
  // },

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
    if (state.contextId === "remarks" && state.remarkId) {
      return [state.remarkId];
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

    // Only highlight remarks when we are in remarks context
    if (state.contextId === "remarks") {
      var doc = writerCtrl.doc;
      var remarks = Object.keys(doc.remarksIndex.get());      
      return remarks;
    }
  }
};

module.exports = stateHandlers;