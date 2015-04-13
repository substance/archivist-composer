var Substance = require("substance");
var $$ = React.createElement;

// Entity types
var Prison = require("./entity_types/prison");
var Toponym = require("./entity_types/toponym");
var Person = require("./entity_types/person");
var Definition = require("./entity_types/definition");

var _ = require("substance/helpers");

var ShowEntityReferencePanel = React.createClass({
  displayName: "Entity",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  // Data loading methods
  // ------------

  loadEntity: function() {
    var doc = this.props.writerCtrl.doc;
    var self = this;
    var entityRef = doc.get(this.props.entityReferenceId);
    var backend = this.context.backend;

    backend.getEntities([entityRef.target], function(err, entities) {
      // Finished simulated loading of entities
      self.setState({
        entity: entities[0]
      });
    }.bind(this));
  },


  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      entity: null
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    this.loadEntity();
  },

  componentWillReceiveProps: function() {
    this.loadEntity();
  },

  handleToggle: function(entityId) {
    // do nothing...
  },

  // Rendering
  // -------------------

  getEntityElement: function(entity) {
    entity.handleToggle = this.handleToggle;

    if (entity.type === "prison") {
      return $$(Prison, entity);
    } else if (entity.type === "toponym") {
      return $$(Toponym, entity);
    } else if (entity.type === "person") {
      return $$(Person, entity);
    } else if (entity.type === "definition") {
      return $$(Definition, entity);
    }
    throw new Error('No view component for '+ entity.type);
  },

  handleCancel: function(e) {
    e.preventDefault();
    this.props.writerCtrl.replaceState({
      contextId: "entities"
    });
  },

  handleDeleteReference: function(e) {
    e.preventDefault();
    var writerCtrl = this.props.writerCtrl;
    var doc = this.props.writerCtrl.doc;
    var tx = doc.startTransaction();

    try {
      tx.delete(this.props.entityReferenceId);
      tx.save();
      writerCtrl.replaceState({
        contextId: "entities"
      });
    } finally {
      tx.cleanup();
    }
  },

  render: function() {
    var state = this.state;
    var props = this.props;

    var entityItem;

    if (this.state.entity) {
      entityItem = this.getEntityElement(this.state.entity);
    } else {
      entityItem = $$('div', null, 'loading...');
    }

    return $$("div", {className: "panel dialog show-entity-reference-panel-component"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: "header"},
          $$('div', {className: 'name'}, "Entity"),
          $$('a', {href: "#", className: "delete-reference", onClick: this.handleDeleteReference}, "Delete"),
          $$('a', {href: "#", className: "cancel", onClick: this.handleCancel}, "Cancel")
        ),
        $$('div', {className: 'entities'},
          entityItem
        )
      )
    );
  }
});

ShowEntityReferencePanel.contextId = "showEntityReference";
ShowEntityReferencePanel.icon = "fa-bullseye";

// No toggle is shown
ShowEntityReferencePanel.isDialog = true;

module.exports = ShowEntityReferencePanel;
