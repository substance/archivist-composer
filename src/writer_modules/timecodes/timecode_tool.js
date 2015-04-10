var BasicToolMixin = require("substance/writer").BasicToolMixin;

var TimecodeTool = React.createClass({
  mixins: [BasicToolMixin],
  displayName: "TimecodeTool",
  annotationType: "timecode",
  toolIcon: "fa-clock-o"
});

module.exports = TimecodeTool;