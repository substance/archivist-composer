var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");
var TextProperty = require("substance/writer").TextProperty;

// Helpers
// ------------------

function label(name) {
  return $$('div', {className: 'label', contentEditable: false}, name);
}

function button(name, type) {
  return $$('a', {className: 'button', href: '#', contentEditable: false}, name);
}

// Metadata Panel
// ------------------

var MetadataPanel = React.createClass({
  displayName: "Info",

  // State relevant things
  // ------------

  contextTypes: {
    backend: React.PropTypes.object.isRequired
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
    this.surface = new Surface(new Surface.FormEditor(this.props.writerCtrl.doc));
    // var doc = this.props.writerCtrl.doc;
    // var waypointDensities = {};
    // var waypoints = doc.get("document").getWaypoints();
    // _.each(waypoints, function(waypoint) {
    //   waypointDensities[waypoint.id] = waypoint.density;
    // });

    return null;
  },

  componentDidMount: function() {
    this.props.writerCtrl.registerSurface(this.surface, "metadata");
    this.surface.attach(this.getDOMNode());

    var doc = this.props.writerCtrl.doc;
    doc.connect(this, {
      'document:changed': this.handleDocumentChange
    });

    this.loadMetadata();
  },

  handleDocumentChange: function(change, info) {
    var refId = this.props.subjectReferenceId;
    // if (info.updateSubjectReference) return;

    if (change.isAffected(["document", "interviewee_prisons"])) {
      // this.forceUpdate();
      console.log('DOC IS affected');
      this.loadMetadata();
    }
  },

  handleWaypointDensityChange: function(e) {
    console.log('handleWaypointDensityChange', e);

    var waypointId = e.currentTarget.dataset.waypointId;
    var newDensityValue = e.currentTarget.value;

    var tx = this.props.writerCtrl.doc.startTransaction();
    try {
      tx.set([waypointId, "density"], newDensityValue);
      tx.save({});
    } finally {
      tx.cleanup();
    }
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.unregisterSurface(this.surface);
    this.surface.detach();
  },

  loadPrisons: function(cb) {
    var backend = this.context.backend;
    var doc = this.props.writerCtrl.doc;
    var prisonIds = doc.get('document').interviewee_prisons;
    backend.getEntities(prisonIds, cb);
  },

  loadWaypointLocations: function(cb) {
    var backend = this.context.backend;
    var doc = this.props.writerCtrl.doc;
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
    console.log('loading/reloading external metadata and rerender');

    this.loadPrisons(function(err, prisons) {
      self.loadWaypointLocations(function(err, waypointLocations) {
        self.setState({
          prisons: prisons,
          waypointLocations: waypointLocations
        });
      });
    });
  },

  renderTextProperty: function(property) {
    return $$(TextProperty, {
      doc: this.props.writerCtrl.doc,
      path: [ "document", property],
      writerCtrl: this.props.writerCtrl,
    });
  },

  handleAddPrison: function(e) {
    e.preventDefault();
    this.props.writerCtrl.replaceState({
      contextId: "selectPrison"
    });
  },

  handleAddWaypoint: function(e) {
    e.preventDefault();
    this.props.writerCtrl.replaceState({
      contextId: "selectWaypoint"
    });
  },

  handleRemovePrison: function(e) {
    var prisonId = e.currentTarget.dataset.id;
    console.log('remove the prison', prisonId);

    e.preventDefault();
    var doc = this.props.writerCtrl.doc;
    var prisonIds = doc.get('document').interviewee_prisons;
    prisonIds = _.without(prisonIds, prisonId);

    var tx = this.props.writerCtrl.doc.startTransaction();
    try {
      tx.set(["document", "interviewee_prisons"], prisonIds);
      tx.save({});
    } finally {
      tx.cleanup();
    }
  },

  renderPrisons: function() {
    var prisonEls = this.state.prisons.map(function(prison) {
      return $$('span', {className: 'prison'},
        $$('span', {className: 'name'}, prison.name),
        $$('a', {
          href: "#",
          "data-id": prison.id,
          className: 'remove-prison',
          onClick: this.handleRemovePrison,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-remove"></i>'},
        })
      );
    }.bind(this));

    return $$('div', {className: 'prisons-wrapper', contentEditable: false},
      label("Prisons"),
      $$('div', {className: 'prisons'}, prisonEls),
      $$('a', {href: '#', className: 'add-prison', onClick: this.handleAddPrison}, "Add prison")
    );
  },

  renderWaypoints: function() {
    var doc = this.props.writerCtrl.doc;
    var waypoints = doc.get("document").getWaypoints();

    var waypointEls = waypoints.map(function(waypoint) {
      waypointLocation = this.state.waypointLocations[waypoint.entityId];

      return $$('span', {className: 'waypoint'},
        $$('span', {className: 'name'}, waypointLocation.name),
        $$('input', {"data-waypoint-id": waypoint.id, className: 'density', min: 1, max: 5, type: 'number', defaultValue: waypoint.density, onChange: this.handleWaypointDensityChange}),
        $$('a', {
          href: "#",
          "data-id": waypoint.id,
          className: 'remove-waypoint',
          onClick: this.handleRemoveWaypoint,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-remove"></i>'},
        })
      );
    }.bind(this));

    return $$('div', {className: 'waypoints-wrapper', contentEditable: false},
      label("Waypoints"),
      $$('div', {className: 'waypoints'}, waypointEls),
      $$('a', {href: '#', className: 'add-waypoint', onClick: this.handleAddWaypoint}, "Add waypoint")
    );
  },

  render: function() {
    var props = this.props;

    if (!this.state) {
      return $$('div', {contentEditable: true, "data-id": "metadata"}, 'Loading');
    }

    return $$("div", {className: "panel metadata-panel-component", contentEditable: true, "data-id": "metadata"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'abstracts section'},
          $$('h3', {contentEditable: false}, "Summary"),
          // Russian abstract
          label("Russian"),
          this.renderTextProperty('abstract'),

          // English abstract
          label("English"),
          this.renderTextProperty('abstract_en')
        ),

        $$('div', {className: 'biography section'},
          $$('h3', {contentEditable: false}, "Biography"),
          label("Name"),
          this.renderTextProperty("title"),

          label("Biography"),
          this.renderTextProperty("interviewee_bio"),

          label("Category"),
          this.renderTextProperty("interviewee_category"),

          label("Forced labor"),
          this.renderTextProperty("interviewee_forced_labor_type"),

          this.renderPrisons(),
          this.renderWaypoints()
        ),

        $$('div', {className: 'project section'},
          $$('h3', {contentEditable: false}, "Project Details"),
          // Project name
          label("Project Name"),
          this.renderTextProperty('project_name'),

          // Project location
          label("Location"),
          button("Set location"),

          // Where the interview took place
          label("Place"),
          this.renderTextProperty('interview_location'),

          // Where the interview took place
          label("Persons present"),
          this.renderTextProperty('persons_present'),

          // Video or audio
          label("Interview Type"),
          $$('select', {contentEditable: false},
            $$('option', {value: "video"}, "Video"),
            $$('option', {value: "audio"}, "Audio")
          ),

          // Where the interview took place
          label("Duration (in minutes)"),
          this.renderTextProperty('interview_duration'),

          // Where the interview took place
          label("Interview date"),
          this.renderTextProperty('interview_date'),

          // The interviewer
          label("Interviewer"),
          this.renderTextProperty('conductor'),

          // Interview operator
          label("Operator"),
          this.renderTextProperty('operator'),

          // Sound
          label("Sound Operator"),
          this.renderTextProperty('sound_operator'),

          label("Date of publication"),
          this.renderTextProperty('published_on')
          // $$('div', {className: "This interview was created on XX and published on YY. Last update was made"})
        )
      )
    );
  }
});

MetadataPanel.contextId = "metadata";
MetadataPanel.icon = "fa-info";

module.exports = MetadataPanel;
