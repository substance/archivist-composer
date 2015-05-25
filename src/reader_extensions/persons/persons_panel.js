var Substance = require("substance");
var $$ = React.createElement;

var Person = require("./person_entity_type");

var _ = require("substance/helpers");

var PersonsPanel = React.createClass({
  displayName: "Persons",

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
    this.loadEntities('person');
  },

  componentWillReceiveProps: function() {
    this.loadEntities('person');
  },

  handleToggle: function(entityId) {
    var app = this.context.app;

    if (app.state.entityId === entityId) {
      app.replaceState({
        contextId: "persons"
      });
    } else {
      app.replaceState({
        contextId: "persons",
        entityId: entityId
      });
    }
  },

  // Rendering
  // -------------------

  getEntityElement: function(entity) {
    entity.handleToggle = this.handleToggle;
    return $$(Person, entity);
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

PersonsPanel.contextId = "persons";
PersonsPanel.icon = "fa-user";

module.exports = PersonsPanel;