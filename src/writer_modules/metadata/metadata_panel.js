var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;

var TextProperty = require("substance/writer").TextProperty;

// Metadat Panel
// ------------------


var MetadataPanel = React.createClass({
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
    this.props.writerCtrl.registerSurface(this.surface, "metadata");
    this.surface.attach(this.getDOMNode());
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.unregisterSurface(this.surface);
    this.surface.detach();
  },

  createTextProperty: function(property) {
    return $$(TextProperty, {
      doc: this.props.writerCtrl.doc,
      path: [ "document", property],
      writerCtrl: this.props.writerCtrl,
    });
  },

  render: function() {
    var props = this.props;

    return $$("div", {className: "panel metadata-panel-component", contentEditable: true},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'biography'},
          $$('div', {className: 'label', contentEditable: false}, "Interview Subject Name"),
          this.createTextProperty("interview_subject_name"),
          $$('div', {className: 'label', contentEditable: false}, "Biography"),
          this.createTextProperty("interview_subject_bio"),
          $$('div', {className: 'label', contentEditable: false}, "Biography"),
          this.createTextProperty("interview_subject_bio")
        )
      )
    );
  }
});

MetadataPanel.contextId = "metadata";
MetadataPanel.icon = "fa-info";

module.exports = MetadataPanel;
