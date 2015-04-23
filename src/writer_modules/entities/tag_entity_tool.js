'use strict';

var Substance = require('substance');
var _ = require('substance/helpers');

var AnnotationToolMixin = require("substance/writer").AnnotationToolMixin;

var TagEntityToolMixin = _.extend({}, AnnotationToolMixin, {
  // Instead of creating a new annotation immediately we want to
  // open the select entity panel
  performAction: function() {
    var sel = this.state.sel;
    var writerCtrl = this.props.writerCtrl;

    // TODO: implement sel.getText() so we can get this from the document directly;
    var searchString = window.getSelection().toString();

    if (this.state.mode === "create") {
      writerCtrl.replaceState({
        contextId: "tagentity",
        path: sel.getPath(),
        startOffset: sel.getStartOffset(),
        endOffset: sel.getEndOffset(),
        searchString: searchString
      });
    } else {
      AnnotationToolMixin.performAction.call(this);
    }
  },

  disabledModes: ["remove", "fusion"],
});

var TagEntityTool = React.createClass({
  mixins: [TagEntityToolMixin],
  displayName: "TagEntityTool",
  title: "Tag Entity",
  annotationType: "entity_reference",
  toolIcon: "fa-bullseye",
});

module.exports = TagEntityTool;

