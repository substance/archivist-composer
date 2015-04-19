var EditRemarkPanel = require("./edit_remark_panel");
var RemarkTool = require("./remark_tool");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "subjects",
  panels: [
    EditRemarkPanel
  ],
  stateHandlers: stateHandlers,
  tools: [
    RemarkTool
  ]
};
