var $$ = React.createElement;
var Substance = require("substance");
var Surface = Substance.Surface;
var TextProperty = require("../..//writer").TextProperty;

var TitleEditor = React.createClass({
  displayName: "TitleEditor",

  // State relevant things
  // ------------

  contextTypes: {
    app: React.PropTypes.object.isRequired
  },

  // Rendering
  // -------------------

  render: function() {
    var app = this.context.app;

    return $$("div", {className: "interview-title", "data-id": "title-editor"},
      $$(TextProperty, {
        doc: app.doc,
        tagName: "div",
        className: "title",
        path: ["document", "title"]
      })
    );
  }
});

module.exports = TitleEditor;