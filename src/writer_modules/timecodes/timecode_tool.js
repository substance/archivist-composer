var AnnotationToolMixin = require("substance/writer").AnnotationToolMixin;

var TimecodeTool = React.createClass({
  mixins: [AnnotationToolMixin],
  displayName: "TimecodeTool",
  annotationType: "timecode",
  toolIcon: "fa-clock-o"
});

module.exports = TimecodeTool;