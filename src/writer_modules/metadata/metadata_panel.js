var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");
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

    // // Project related
    //     "project_name": "string",
    //     "project_location": "string", // points to an entity id
    //     "conductor": "string",
    //     "operator": "string",
    //     "sound_operator": "string",
    //     "record_type": "string", // "video" or "audio"
    //     "interview_location": "string",
    //     "inverview_date": "string",
    //     "persons_present": "string",
    //     "interview_duration": "number",

    // // Just a little helper so we don't always have to writer contentEditable: fales
    // function la(attrs) {
    //   var defaultAttrs = {className: label, contentEditable: true};
    //   return _.extend(defaultAttrs, attrs);
    // }

    function label(name) {
      return $$('div', {className: 'label', contentEditable: false}, name);
    }

    function button(name, type) {
      return $$('a', {className: 'button', href: '#', contentEditable: false}, name);
    }

    return $$("div", {className: "panel metadata-panel-component", contentEditable: true, "data-id": "metadata"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'project'},
          // Project name
          label("Project Name"),
          this.createTextProperty('project_name'),

          // Project location
          label("Location"),
          button("Set location"),

          // Where the interview took place
          label("Place"),
          this.createTextProperty('interview_location')
        ),
        $$('div', {className: 'biography'},
          label("Biography"),
          this.createTextProperty("subject_bio")
          // $$('div', {className: 'label'}, "Abstract English"),
          // this.createTextProperty("abstract_en")
        )
      )
    );
  }
});

MetadataPanel.contextId = "metadata";
MetadataPanel.icon = "fa-info";

module.exports = MetadataPanel;
