var $$ = React.createElement;
var _ = require("underscore");

var TYPE_LABELS = {
  "prison": "Prison",
  "toponym": "Toponym",
  "person": "Person",
  "definition": "Definition"
};


// Fixture data
var SUGGESTED_ENTITIES = [
  {"id":"54ef1331afda2d3c024e4818","type":"prison","name":"неизвестно /Австрия","nearest_locality":"неизвестно","country":"Австрия","description":"Респондент В. В. Щебетюк (ID 40) не помнит название села, куда был доставлен в сотаве 20 остарбайтеров. Жили в специальном охраняемым помещении, откуда их выводили на работы. Щебетюк был занят на полевых работах. В селе в том числе содержались поляки-военнопленные. ","__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["неизвестно /Австрия","\"работали в Австрии\"; \"не помню даже село\"; \"большой бауэр"," который имел более сто гектаров земли"," ферму большую и в деревне шоколадную фабрику\"; \"В селе"," значит"," там были военнопленные","\nвоеннопленные – польские\"; \"Работали у этого бауэра на полю\""],"id":"54ef1331afda2d3c024e4818"},{"id":"54ef1331afda2d3c024e4817","type":"prison","name":"Гоппенраде","nearest_locality":"Гоппенраде","country":"Германия","description":"город в земле Мекленбург-Передняя Померания","point":[12.2736937,53.73019069999999],"__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["Гоппенраде"],"id":"54ef1331afda2d3c024e4817"},{"id":"54ef1331afda2d3c024e4816","type":"prison","name":"Нахтигаль","nearest_locality":"Виттенберг","country":"Германия","description":"","point":[12.6279659,51.8739831],"__v":0,"prison_type":["рабочий лагерь"],"synonyms":["Нахтигаль"],"id":"54ef1331afda2d3c024e4816"},{"id":"54ef1331afda2d3c024e4815","type":"prison","name":"неизвестно","nearest_locality":"Франкфурт-на-Маней","country":"Германия","description":"","point":[8.6821267,50.1109221],"__v":0,"prison_type":[""],"synonyms":["неизвестно","\"распределение"," дезинфекция\""],"id":"54ef1331afda2d3c024e4815"}
];

var SEARCH_RESULT = [
  // Prisons
  {"id":"54ef1331afda2d3c024e4818","type":"prison","name":"неизвестно /Австрия","nearest_locality":"неизвестно","country":"Австрия","description":"Респондент В. В. Щебетюк (ID 40) не помнит название села, куда был доставлен в сотаве 20 остарбайтеров. Жили в специальном охраняемым помещении, откуда их выводили на работы. Щебетюк был занят на полевых работах. В селе в том числе содержались поляки-военнопленные. ","__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["неизвестно /Австрия","\"работали в Австрии\"; \"не помню даже село\"; \"большой бауэр"," который имел более сто гектаров земли"," ферму большую и в деревне шоколадную фабрику\"; \"В селе"," значит"," там были военнопленные","\nвоеннопленные – польские\"; \"Работали у этого бауэра на полю\""],"id":"54ef1331afda2d3c024e4818"},{"id":"54ef1331afda2d3c024e4817","type":"prison","name":"Гоппенраде","nearest_locality":"Гоппенраде","country":"Германия","description":"город в земле Мекленбург-Передняя Померания","point":[12.2736937,53.73019069999999],"__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["Гоппенраде"],"id":"54ef1331afda2d3c024e4817"},{"id":"54ef1331afda2d3c024e4816","type":"prison","name":"Нахтигаль","nearest_locality":"Виттенберг","country":"Германия","description":"","point":[12.6279659,51.8739831],"__v":0,"prison_type":["рабочий лагерь"],"synonyms":["Нахтигаль"],"id":"54ef1331afda2d3c024e4816"},{"id":"54ef1331afda2d3c024e4815","type":"prison","name":"неизвестно","nearest_locality":"Франкфурт-на-Маней","country":"Германия","description":"","point":[8.6821267,50.1109221],"__v":0,"prison_type":[""],"synonyms":["неизвестно","\"распределение"," дезинфекция\""],"id":"54ef1331afda2d3c024e4815"},
  // Toponyms
  {"_id":"54ef1e26f505ed9a022fdacd","type":"toponym","name":"село Васильевское ","current_name":"","country":"Россия","description":"","point":[36.58472200000001,55.61],"__v":0,"prison_type":[],"synonyms":[],"id":"54ef1e26f505ed9a022fdacd"},{"_id":"54ef1e26f505ed9a022fdacc","type":"toponym","name":"Копьевка","current_name":"","country":"Украина","description":"","__v":0,"prison_type":[],"synonyms":["Копиевка","укр. Копіївка"],"id":"54ef1e26f505ed9a022fdacc"},{"_id":"54ef1e26f505ed9a022fdacb","type":"toponym","name":"село Рукшин ","current_name":"","country":"Украина","description":"","point":[26.405833,48.4875],"__v":0,"prison_type":[],"synonyms":["укр. Рукшин"],"id":"54ef1e26f505ed9a022fdacb"},{"_id":"54ef1e26f505ed9a022fdaca","type":"toponym","name":"Рухотин","current_name":"","country":"Украина","description":"","point":[26.205,48.517222],"__v":0,"prison_type":[],"synonyms":["укр. Рухотин"],"id":"54ef1e26f505ed9a022fdaca"},{"_id":"54ef1e26f505ed9a022fdac9","type":"toponym","name":"Черновцы","current_name":"","country":"Украина","description":"","point":[25.9358367,48.2920787],"__v":0,"prison_type":[],"synonyms":["укр. Чернівці́"],"id":"54ef1e26f505ed9a022fdac9"},{"_id":"54ef1e26f505ed9a022fdac8","type":"toponym","name":"Негин (село Каменец-Подольского района Хмельницкой области)","current_name":"","country":"Украина","description":"","point":[26.566944,48.8375],"__v":0,"prison_type":[],"synonyms":[],"id":"54ef1e26f505ed9a022fdac8"},
  // Definitions
  {"_id":"54f48370cdc4e45004d97ca6","type": "definition", "title":"управдом","description":"управляющий домом, домами - прежнее название должностного лица, возглавляющего домоуправление","__v":0,"id":"54f48370cdc4e45004d97ca6"},{"_id":"54f48370cdc4e45004d97ca5","type": "definition", "title":"домком","description":"домовый комитет - общественная организация жильцов","__v":0,"id":"54f48370cdc4e45004d97ca5"},
  // Persons
  {"_id":"54f476ba973cfcef0354adab","type": "person", "name":"Мария","description":"Мария, младшая сестра О.Г. Головиной","__v":0,"id":"54f476ba973cfcef0354adab"},{"_id":"54f476ba973cfcef0354adac","type": "person", "name":"Головина Анна Терентьевна","description":"","__v":0,"id":"54f476ba973cfcef0354adac"}
];


// Example of a sub view
// ----------------

var EntityView = React.createClass({
  displayName: "Entity",

  handleClick: function(e) {
    this.props.handleSelection(this.props.id);
    e.preventDefault();
  },

  render: function() {
    var className = ["entity", this.props.type];
    if (this.props.active) className.push("active");

    var props = [
      $$("div", {className: "type"}, TYPE_LABELS[this.props.type]),
      $$("div", {className: "name"}, this.props.name || this.props.title)
    ];

    if (this.props.country) {
      props.push($$("div", {className: "country"}, "Country"+this.props.country));
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


  // Data loading methods
  // ------------

  loadEntities: function(searchString) {
    var self = this;

    if (searchString) {
      _.delay(function() {
        // Finished simulated loading of entities
        self.setState({
          // searchString: searchString,
          entities: SEARCH_RESULT
        });
      }, 700);
    } else {
      _.delay(function() {
        // Finished simulated loading of entities
        self.setState({
          // searchString: searchString,
          entities: SUGGESTED_ENTITIES
        });
      }, 700);
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

    writerCtrl.annotate({
      type: "entity_reference",
      target: entityId
    });

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

    return $$("div", {className: "panel tag-entity-panel-component"},
      $$('div', {className: "panel-content"},
        $$('div', {className: "search", html: ""},
          $$('input', {
            className: "search-str",
            type: "text",
            placeholder: "Type to search for entities",//,
            // value: "HELLO"
            value: this.state.searchString,
            onChange: this.handleSearchStringChange
          }),
          $$('select', {className: "entity-type"},
            $$('option', {value: ""}, "All"),
            $$('option', {value: "prison"}, "Prison"),
            $$('option', {value: "toponym"}, "Toponym"),
            $$('option', {value: "person"}, "Person"),
            $$('option', {value: "definition"}, "Definition")
          )
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