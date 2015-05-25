var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");
var TextProperty = require("../../writer").TextProperty;

// Metadata Panel
// ------------------

var MetadataPanel = React.createClass({
  displayName: "Info",

  // State relevant things
  // ------------

  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    surface: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      surface: this.surface
    };
  },

  getInitialState: function() {
    var app = this.context.app;
    // TODO remove this entirely?
    this.surface = new Surface(new Surface.FormEditor(app.doc));
    return null;
  },

  componentDidMount: function() {
    var app = this.context.app;
    // app.registerSurface(this.surface, "metadata", {
    //   enabledTools: ["strong", "emphasis"]
    // });

    // this.surface.attach(this.getDOMNode());

    this.loadMetadata();
  },

  componentWillUnmount: function() {
    var app = this.context.app;
    app.doc.disconnect(this);
    // app.unregisterSurface(this.surface);
    // this.surface.detach();
  },

  loadPrisons: function(cb) {
    var app = this.context.app;
    var backend = this.context.backend;
    var doc = app.doc;
    var prisonIds = doc.get('document').interviewee_prisons;
    backend.getEntities(prisonIds, cb);
  },

  loadProjectLocation: function(cb) {
    var backend = this.context.backend;
    var app = this.context.app;
    var doc = app.doc;

    var projectLocationId = doc.get('document').project_location;
    if (projectLocationId) {
      backend.getEntities([projectLocationId], function(err, locations) {
        if (err) return cb(err);
        cb(null, locations[0]);
      });
    } else {
      cb(null, null);
    }
  },

  loadWaypointLocations: function(cb) {
    var backend = this.context.backend;
    var app = this.context.app;
    var doc = app.doc;
    var waypoints = doc.get('document').getWaypoints();
    var waypointLocationIds = _.pluck(waypoints, 'entityId');

    backend.getEntities(waypointLocationIds, function(err, waypointLocations) {
      if (err) return cb(err);
      var res = {};
      _.each(waypointLocations, function(location) {
        res[location.id] =  location;
      });
      cb(null, res);
    });
  },

  loadMetadata: function() {
    var self = this;
    // console.log('loading/reloading external metadata and rerender');

    this.loadPrisons(function(err, prisons) {
      self.loadWaypointLocations(function(err, waypointLocations) {
        self.loadProjectLocation(function(err, projectLocation) {
          self.setState({
            prisons: prisons,
            waypointLocations: waypointLocations,
            projectLocation: projectLocation
          });
        });
      });
    });
  },

  render: function() {
    var props = this.props;
    if (!this.state) {
      return $$('div', {contentEditable: true, "data-id": "metadata"}, 'Loading');
    }

    return $$("div", {className: "panel metadata-panel-component", contentEditable: true, "data-id": "metadata"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'info-panel'}, "INFO PANEL CONTENT COMES HERE")
      )
    );
  }
});

MetadataPanel.contextId = "metadata";
MetadataPanel.icon = "fa-info";

module.exports = MetadataPanel;
