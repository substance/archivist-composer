var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;
var TextProperty = require('./text_property');

// Title Editor
// ------------------

var TitleEditor = React.createClass({
  displayName: "Info",

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

  getInitialState: function() {
    this.surface = new Surface(new Surface.FormEditor(this.props.writerCtrl.doc));
    return {};
  },

  componentDidMount: function() {
    this.props.writerCtrl.registerSurface(this.surface, "title");
    this.surface.attach(this.getDOMNode());
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.unregisterSurface(this.surface);
    this.surface.detach();
  },

  render: function() {
    return $$(TextProperty, {
      doc: this.props.writerCtrl.doc,
      tagName: "div",
      className: "title",
      path: [ "document", "title"],
      writerCtrl: this.props.writerCtrl,
    });
  }
});

module.exports = TitleEditor;