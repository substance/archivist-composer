var Substance = require("substance");
var $$ = React.createElement;

var Location = require("./location_entity_type");

var _ = require("substance/helpers");

var LocationsPanel = React.createClass({
  displayName: "Locations",

  contextTypes: {
    app: React.PropTypes.object.isRequired,
    backend: React.PropTypes.object.isRequired
  },

  getReferencedEntityIds: function() {
    var app = this.context.app;
    var doc = app.doc;
    var entityReferences = doc.entityReferencesIndex.get();
    return _.map(entityReferences, function(entityRef, key) {
      return entityRef.target;
    });
  },

  // Data loading methods
  // ------------

  loadEntities: function(types) {
    var self = this;
    var backend = this.context.backend;
    var entityIds = self.getReferencedEntityIds();

    backend.getEntities(entityIds, function(err, entities) {
      // Filter loaded entities by entity type if type provided 
      if (types) {
        entities = entities.filter(function(entity){
          return types.indexOf(entity.type) > -1;
        })
      }

      self.setState({
        entities: entities
      });
    });
  },


  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      entities: []
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    this.loadEntities(['toponym', 'prison']);
  },

  componentWillReceiveProps: function() {
    this.loadEntities(['toponym', 'prison']);
  },

  handleToggle: function(entityId) {
    var app = this.context.app;

    if (app.state.entityId === entityId) {
      app.replaceState({
        contextId: "locations"
      });
    } else {
      app.replaceState({
        contextId: "locations",
        entityId: entityId
      });
    }
  },

  // Rendering
  // -------------------

  getEntityElement: function(entity) {
    entity.handleToggle = this.handleToggle;
    return $$(Location, entity);
  },

  render: function() {
    var state = this.state;
    var props = this.props;

    var getElem = this.getEntityElement;
    var entityNodes = state.entities.map(function(entity, index) {
      // Dynamically assign active state
      entity.active = entity.id === props.entityId;
      entity.key = entity.id;
      return getElem(entity);
    });

    return $$("div", {className: "panel entities-panel-component"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'entities'},
          entityNodes
        )
      )
    );
  }
});

LocationsPanel.contextId = "locations";
LocationsPanel.icon = "fa-globe";

module.exports = LocationsPanel;