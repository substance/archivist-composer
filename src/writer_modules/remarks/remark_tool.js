'use strict';

var Substance = require('substance');
var _ = require('substance/helpers');
var $$ = React.createElement;

var AnnotationToolMixin = require("substance/writer").AnnotationToolMixin;

var RemarkToolMixin = _.extend({}, AnnotationToolMixin, {
  getAnnotationData: function() {
    return {
      container: "content",
      content: ""
    }
  },
  disabledModes: ["remove", "fusion"],
  afterCreate: function(anno) {
    console.log('after create', anno);
    this.props.writerCtrl.replaceState({
      contextId: "remarks",
      remarkId: anno.id
    });
  }
});

var RemarkTool = React.createClass({
  mixins: [RemarkToolMixin],
  displayName: "RemarkTool",
  annotationType: "remark",
  toolIcon: "fa-comment",
});

module.exports = RemarkTool;

