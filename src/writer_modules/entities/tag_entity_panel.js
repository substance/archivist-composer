var $$ = React.createElement;
var Substance = require("substance");

var TYPE_LABELS = {
  "prison": "Prison",
  "toponym": "Toponym",
  "person": "Person",
  "definition": "Definition"
};

// Example of a sub view
// ----------------

var EntityView = React.createClass({
  displayName: "Entity",

  handleClick: function(e) {
    e.preventDefault();
    this.props.handleSelection(this.props.id);
  },

  render: function() {
    var className = ["entity", this.props.type];
    if (this.props.active) className.push("active");

    var props = [
      $$("div", {className: "type"}, TYPE_LABELS[this.props.type]),
      $$("div", {className: "name"}, this.props.name || this.props.title)
    ];

    if (this.props.synonyms) {
      props.push($$("div", {className: "synonyms"}, "Also known as: "+this.props.synonyms));
    }

    if (this.props.country) {
      props.push($$("div", {className: "country"}, "Country: "+this.props.country));
    }

    if (this.props.type == 'person') {
      var description = this.props.description;
      // Trim person description if it's too long
      if (description.length > 100) description = description.substring(0, 100) + '...';
      props.push($$("div", {className: "description"}, description));
    }

    return $$("div", {
      className: className.join(" "),
      onClick: this.handleClick
    }, props);
  }
});

// Entities Panel extension
// ----------------

var TagEntityPanel = React.createClass({
  displayName: "Tag Entity",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  handleCancel: function(e) {
    e.preventDefault();
    // Go to regular entities panel
    this.props.writerCtrl.replaceState({
      contextId: "entities"
    });
  },

  // Data loading methods
  // ------------

  loadEntities: function(searchString) {
    var self = this;

    var backend = this.context.backend;

    if (searchString) {
      backend.searchEntities(searchString, function(err, entities) {
        self.setState({
          entities: entities
        });
      });
    } else {
      backend.getSuggestedEntities(function(err, entities) {
        self.setState({
          entities: entities
        });
      });
    }
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      searchString: "",
      entities: []
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    this.loadEntities("");
  },

  handleSearchStringChange: function(e) {
    var searchString = e.target.value;
    this.setState({searchString: searchString});
    this.loadEntities(searchString);
  },


  // Called with entityId when an entity has been clicked
  handleSelection: function(entityId) {
    var writerCtrl = this.props.writerCtrl;

    var path = this.props.path;
    var range = this.props.range;

    var annotation = writerCtrl.annotate({
      type: "entity_reference",
      target: entityId,
      path: path,
      range: range
    });

    console.log('created annotation', annotation);

    // Switch state to highlight newly created reference
    writerCtrl.replaceState({
      contextId: "entities",
      entityId: entityId
    });
  },

  // Rendering
  // -------------------

  render: function() {
    var self = this;
    var entities = this.state.entities;
    var entityNodes;

    if (entities.length > 0) {
      entityNodes = entities.map(function(entity) {
        entity.handleSelection = self.handleSelection;
        return $$(EntityView, entity);
      });
    } else {
      entityNodes = [$$('div', {className: "no-results", text: "Loading suggestions"})];
    }

    return $$("div", {className: "panel dialog tag-entity-panel-component"},
      $$('div', {className: 'dialog-header'},
        $$('div', {className: 'label', dangerouslySetInnerHTML: {__html: '<i class="fa fa-bullseye"></i> Choose an entity'}}),
        $$('a', {className: 'cancel', href: '#', onClick: this.handleCancel}, 'Cancel')
      ),
      $$('div', {className: "panel-content"},
        $$('div', {className: "search", html: ""},
          $$('input', {
            className: "search-str",
            type: "text",
            placeholder: "Type to search for entities",//,
            value: this.state.searchString,
            onChange: this.handleSearchStringChange
          }) // ,
          // $$('select', {className: "entity-type"},
          //   $$('option', {value: ""}, "All"),
          //   $$('option', {value: "prison"}, "Prison"),
          //   $$('option', {value: "toponym"}, "Toponym"),
          //   $$('option', {value: "person"}, "Person"),
          //   $$('option', {value: "definition"}, "Definition")
          // )
        ),
        $$('div', {className: "entities"},
          entityNodes
        )
      )
    );
  }
});

// Panel configuration
// ----------------

TagEntityPanel.contextId = "tagentity";
TagEntityPanel.icon = "fa-bullseye";

// No context switch toggle is shown
TagEntityPanel.isDialog = true;

module.exports = TagEntityPanel;