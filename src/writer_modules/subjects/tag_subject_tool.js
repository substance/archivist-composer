'use strict';

var Substance = require('substance');
var _ = require('substance/helpers');
var $$ = React.createElement;
var AnnotationToolMixin = require("substance/writer").AnnotationToolMixin;

var SubjectReferenceToolMixin = _.extend({}, AnnotationToolMixin, {
  
  getAnnotationData: function() {
    return {
      container: "content",
      target: []
    }
  },

  // When there's no existing annotation overlapping, we create a new one.
  canCreate: function(annos, sel) {
    var writerCtrl = this.props.writerCtrl;
    return (writerCtrl.state.contextId !== "editSubjectReference" && !sel.isCollapsed()); 
  },

  getActiveAnno: function(annos) {
    var writerCtrl = this.props.writerCtrl;
    return _.filter(annos, function(a) {
      return a.id === writerCtrl.state.subjectReferenceId;
    })[0];
  },

  // When there's some overlap with only a single annotation we do an expand
  canExpand: function(annos, sel) {
    var writerCtrl = this.props.writerCtrl;
    if (annos.length === 0) return false;
    if (writerCtrl.state.contextId !== "editSubjectReference") return false; 

    var activeAnno = this.getActiveAnno(annos);
    if (!activeAnno) return false;

    var annoSel = activeAnno.getSelection();

    return sel.overlaps(annoSel) && !sel.isCollapsed();
  },

  canFusion: function() {
    return false; // never ever
  },

  canRemove: function(annos, sel) {
    return false; // never through toggling
  },

  canTruncate: function(annos, sel) {
    var writerCtrl = this.props.writerCtrl;
    if (annos.length === 0) return false;
    if (writerCtrl.state.contextId !== "editSubjectReference") return false;

    var activeAnno = this.getActiveAnno(annos);
    if (!activeAnno) return false;
    var annoSel = activeAnno.getSelection();
    var canTruncate = (sel.isLeftAlignedWith(annoSel) || sel.isRightAlignedWith(annoSel)) && !sel.equals(annoSel);
    return canTruncate;
  },

  // Same implementation as on AnnotationTool, except we get the active
  // subjectReference id
  handleTruncate: function(state) {
    var doc = this.getDocument();
    var sel = state.sel;
    var tx = doc.startTransaction({ selection: sel });
    try {

      var anno = this.getActiveAnno(state.annos);
      if (!anno) return false;

      var annoSel = anno.getSelection(); // state.annoSels[0];
      var newAnnoSel = annoSel.truncate(sel);
      anno.updateRange(tx, newAnnoSel);
      tx.save({ selection: sel });
      this.afterTruncate();
    } finally {
      tx.cleanup();
    }
  },

  // Same implementation as on AnnotationTool, except we get the active
  // subjectReference id
  handleExpand: function(state) {
    var doc = this.getDocument();
    var sel = state.sel;
    var tx = doc.startTransaction({ selection: sel });
    try {
      var anno = this.getActiveAnno(state.annos);
      if (!anno) return false;
      var annoSel = anno.getSelection(); // state.annoSels[0];
      var newAnnoSel = annoSel.expand(sel);
      anno.updateRange(tx, newAnnoSel);
      tx.save({ selection: sel });
      this.afterExpand();
    } finally {
      tx.cleanup();
    }
  },

  disabledModes: ["remove", "fusion"],
  afterCreate: function(anno) {
    this.props.writerCtrl.replaceState({
      contextId: "editSubjectReference",
      subjectReferenceId: anno.id
    });
  }
});

var SubjectReferenceTool = React.createClass({
  mixins: [SubjectReferenceToolMixin],
  displayName: "SubjectReferenceTool",
  title: "Tag Subject",
  annotationType: "subject_reference",
  toolIcon: "fa-tag",
});

module.exports = SubjectReferenceTool;
