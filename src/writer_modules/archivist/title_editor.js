var $$ = React.createElement;
var Substance = require("substance");
var Surface = Substance.Surface;
var TextProperty = require("../..//writer").TextProperty;


var TitleEditor = React.createClass({
  displayName: "TitleEditor",

  // State relevant things
  // ------------

  childContextTypes: {
    surface: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      surface: this.surface
    };
  },

  componentWillMount: function() {
    this.surface = new Surface(new Surface.FormEditor(this.props.writerCtrl.doc));
    return {};
  },

  componentDidMount: function() {
    this.props.writerCtrl.registerSurface(this.surface, "title-editor");
    this.surface.attach(this.getDOMNode());
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.unregisterSurface(this.surface);
    this.surface.detach();
  },

  // Rendering
  // -------------------

  render: function() {
    var state = this.state;

    return $$("div", {className: "interview-title", contentEditable: true, "data-id": "title-editor"},
      $$(TextProperty, {
        doc: this.props.writerCtrl.doc,
        tagName: "div",
        className: "title",
        path: ["document", "title"],
        writerCtrl: this.props.writerCtrl
      })
    );
  }
});

module.exports = TitleEditor;