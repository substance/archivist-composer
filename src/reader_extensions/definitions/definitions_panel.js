var Substance = require("substance");
var $$ = React.createElement;

var Definition = require("./definition_entity_type");

var _ = require("substance/helpers");

var DefinitionsPanel = React.createClass({
  displayName: "Definitions",

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

  loadEntities: function(type) {
    var self = this;
    var backend = this.context.backend;
    var entityIds = self.getReferencedEntityIds();

    backend.getEntities(entityIds, function(err, entities) {
      // Filter loaded entities by entity type if type provided 
      if (type) {
        entities = entities.filter(function(entity){
          return entity.type == type;
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
    this.loadEntities('definition');
  },

  componentWillReceiveProps: function() {
    this.loadEntities('definition');
  },

  handleToggle: function(entityId) {
    var app = this.context.app;

    if (app.state.entityId === entityId) {
      app.replaceState({
        contextId: "definitions"
      });
    } else {
      app.replaceState({
        contextId: "definitions",
        entityId: entityId
      });
    }
  },

  // Rendering
  // -------------------

  getEntityElement: function(entity) {
    entity.handleToggle = this.handleToggle;
    return $$(Definition, entity);
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

DefinitionsPanel.contextId = "definitions";
DefinitionsPanel.icon = "fa-list";

module.exports = DefinitionsPanel;