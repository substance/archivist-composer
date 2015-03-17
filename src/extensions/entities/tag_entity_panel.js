var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

var TYPE_LABELS = {
  "prison": "Prison",
  "toponym": "Toponym",
  "person": "Person",
  "definition": "Definition"
};

// Example of a sub view
// ----------------

var EntityView = function(props) {
  Component.call(this, props);
};

EntityView.Prototype = function() {

  this.render = function() {
    var className = ["entity", this.props.type];
    if (this.props.active) className.push("active");

    var props = [
      $$("div", {className: "type", html: TYPE_LABELS[this.props.type]}),
      $$("div", {className: "name", html: this.props.name || this.props.title})
    ];

    if (this.props.country) {
      props.push($$("div", {className: "country", html: "Country"+this.props.country}));
    }

    return $$("div", {className: className.join(" ")}, props);
  };
};

EntityView.Prototype.prototype = Component.prototype;
EntityView.prototype = new EntityView.Prototype();


// Entities Panel extension
// ----------------

var TagEntityPanel = function(props) {
  Component.call(this, props);

  this.searchResult = []; // default to empty search result
};

TagEntityPanel.Prototype = function() {

  this.componentDidMount = function() {
    $(this.el).on('change', '.search-str', _.bind(this._search, this));
  };

  this.getInitialState = function() {
    return {
      searchString: ""
    };
  };

  this._search = function(e) {
    var searchString = $(e.currentTarget).val();
    e.preventDefault();
    console.log('searching...', searchString);
    this.setState({
      searchString: searchString
    });
  };

  this.loadEntities = function(searchString, cb) {
    if (searchString) {
      // This is only a fixture for now
      // Later we use the prop data as a default entity selection (LRU)
      this.searchResult = this.props.entities;
    } else {
      this.searchResult = [];
    }
    cb(null);
  };

  this.transition = function(oldState, newState, cb) {
    // We don't do a smart state check here for now, we always load new data
    this.loadEntities(newState.searchString, cb);
  };

  this.render = function() {
    var entityNodes;
    if (this.searchResult.length > 0) {
      entityNodes = this.searchResult.map(function(entity, index) {
        return $$(EntityView, entity);
      });
    } else {
      entityNodes = [$$('div', {className: "no-results", text: "Please type search string to select an entity"})];
    }

    return $$("div", {className: "panel tag-entity-panel-component"},
      $$('div', {className: "search", html: ""},
        $$('input', {className: "search-str", type: "text", placeholder: "Type to search for entities", value: this.state.searchString}),
        $$('select', {className: "entity-type"},
          $$('option', {value: "", html: "All"}),
          $$('option', {value: "prison", html: "Prison"}),
          $$('option', {value: "toponym", html: "Toponym"}),
          $$('option', {value: "person", html: "Person"}),
          $$('option', {value: "definition", html: "Definition"})
        )
      ),
      $$('div', {className: "entities"},
        entityNodes
      )
    );
  };
};

TagEntityPanel.panelName = "Tag Entities";
TagEntityPanel.contextId = "tagentity";
TagEntityPanel.icon = "fa-bullseye";

// No toggle is shown
TagEntityPanel.isDialog = true;

// Factory method for creation of a new subject panel using properties derived from writer
// state
TagEntityPanel.create = function(writer) {
  return $$(TagEntityPanel, writer.panelData["tagentity"]);
};

TagEntityPanel.Prototype.prototype = Component.prototype;
TagEntityPanel.prototype = new TagEntityPanel.Prototype();

module.exports = TagEntityPanel;