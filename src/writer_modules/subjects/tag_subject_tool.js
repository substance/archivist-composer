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
  disabledModes: ["remove", "fusion"],
  afterCreate: function(anno) {
    console.log('after create');
    this.props.writerCtrl.replaceState({
      contextId: "editSubjectReference",
      subjectReferenceId: anno.id
    });
  }
});

var SubjectReferenceTool = React.createClass({
  mixins: [SubjectReferenceToolMixin],
  displayName: "SubjectReferenceTool",
  annotationType: "subject_reference",
  toolIcon: "fa-tag",
});

module.exports = SubjectReferenceTool;


// var Substance = require('substance');
// var $$ = React.createElement;

// // TagSubjectTool
// // ----------------

// var TagSubjectTool = React.createClass({
//   displayName: "TagSubjectTool",

//   componentDidMount: function() {
//     var writerCtrl = this.props.writerCtrl;
//     writerCtrl.connect(this, {
//       'selection:changed': this.handleSelectionChange
//     });
//   },

//   handleSelectionChange: function(sel) {
//     var writerCtrl = this.props.writerCtrl;
//     // Note: toggling of a subject reference is only possible when
//     // the subject reference is selected and the
//     if (sel.isNull() || sel.isCollapsed() ) {
//       return this.setState({
//         active: false,
//         selected: false
//       });
//     } else {
//       var container = writerCtrl.getSurface().getContainer();
//       if (!container) {
//         return this.setState({
//           active: false,
//           selected: false
//         });
//       }
//       var newState = {
//         active: true,
//         selected: false,
//         containerId: container.id
//       };
//       if (writerCtrl.state.contextId === "editSubjectReference") {
//         var anno = writerCtrl.doc.get(writerCtrl.state.subjectReferenceId);
//         if (!anno) {
//           console.error("Ooops. Could not find subject-reference while being in 'editSubjectReference'.");
//           return this.setState({
//             active: false,
//             selected: false
//           });
//         }
//         var annoSel = Substance.Document.Selection.create(container,
//           anno.startPath, anno.startOffset, anno.endPath, anno.endOffset);
//         if (!annoSel.overlaps(sel)) {
//           return this.setState({
//             active: false,
//             selected: false
//           });
//         }
//         if (annoSel.includesWithOneBoundary(sel)) {
//           newState.mode = 'truncate';
//           newState.selected = true;
//         } else if (annoSel.contains(sel)) {
//           newState.mode = 'delete';
//           newState.selected = false; // true;
//           newState.active = false;
//         } else {
//           newState.mode = 'expand';
//         }
//         newState.annotationSelection = annoSel;
//       } else {
//         newState.mode = 'create';
//       }
//       this.setState(newState);
//     }
//   },

//   handleClick: function(e) {
//     e.preventDefault(e);
//   },

//   handleMouseDown: function(e) {
//     e.preventDefault();
//     if (!this.state.active) {
//       return;
//     }
//     // toggle subject_reference on or off
//     var writerCtrl = this.props.writerCtrl;
//     var doc = writerCtrl.doc;
//     var sel = writerCtrl.getSelection();
//     if (sel.isNull() || sel.isCollapsed()) return;
//     var range = sel.getRange();

//     var tx = doc.startTransaction({selection: sel});
//     if (this.state.mode === 'create') {
//       try {
//         var subjectReference = {
//           type: "subject_reference",
//           id: Substance.uuid("subject_reference"),
//           container: this.state.containerId,
//           startPath: range.start.path,
//           startOffset: range.start.offset,
//           endPath: range.end.path,
//           endOffset: range.end.offset,
//           target: []
//         };
//         tx.create(subjectReference);
//         tx.save({selection: sel.collapse('left')});
//         writerCtrl.replaceState({
//           contextId: "editSubjectReference",
//           subjectReferenceId: subjectReference.id,
//           range: range
//         });
//       } finally {
//         tx.cleanup();
//       }
//     } else if (this.state.mode === 'delete') {
//       try {
//         tx.delete(writerCtrl.state.subjectReferenceId);
//         tx.save({selection: sel.collapse('left')});
//         writerCtrl.replaceState({
//           contextId: "subjects"
//         });
//       } finally {
//         tx.cleanup();
//       }
//     } else if (this.state.mode === 'expand' || this.state.mode === 'truncate') {
//       try {
//         var anno = writerCtrl.doc.get(writerCtrl.state.subjectReferenceId);
//         if (this.state.mode === 'expand') {
//           sel = this.state.annotationSelection.expand(sel);
//         } else {
//           sel = this.state.annotationSelection.truncate(sel);
//         }
//         var newRange = sel.getRange();
//         if (!Substance.isEqual(anno.startPath, newRange.start.path)) {
//           tx.set([anno.id, 'startPath'], newRange.start.path);
//         }
//         if (!Substance.isEqual(anno.endPath, newRange.end.path)) {
//           tx.set([anno.id, 'endPath'], newRange.end.path);
//         }
//         if (!Substance.isEqual(anno.startOffset, newRange.start.offset)) {
//           tx.set([anno.id, 'startOffset'], newRange.start.offset);
//         }
//         if (!Substance.isEqual(anno.endOffset, newRange.end.offset)) {
//           tx.set([anno.id, 'endOffset'], newRange.end.offset);
//         }
//         tx.save({});
//       } finally {
//         tx.cleanup();
//       }
//     } else  {
//       throw new Error('Illegal state');
//     }

//     // HACK: using a custom event instead of automatic data bindings
//     doc.emit('container-annotation-update');
//   },

//   getInitialState: function() {
//     return {
//       active: false,
//       selected: false
//     };
//   },

//   render: function() {
//     var classNames = ['tag-subject-tool-component', 'tool'];
//     if (this.state.active) classNames.push("active");
//     if (this.state.selected) classNames.push("selected");
//     return $$("a", {
//       className: classNames.join(' '),
//       href: "#",
//       dangerouslySetInnerHTML: {__html: '<i class="fa fa-tag"></i>'},
//       title: 'Tag Subject',
//       onMouseDown: this.handleMouseDown,
//       onClick: this.handleClick
//     });
//   }
// });

// module.exports = TagSubjectTool;
