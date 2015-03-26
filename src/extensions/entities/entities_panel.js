var $$ = React.createElement;
var _ = require("underscore");

// Entity types
var Prison = require("./entity_types/prison");
var Toponym = require("./entity_types/toponym");
var Person = require("./entity_types/person");
var Definition = require("./entity_types/definition");

var ENTITIES = [
  // Prisons
  {"id":"54ef1331afda2d3c024e4818","type":"prison","name":"неизвестно /Австрия","nearest_locality":"неизвестно","country":"Австрия","description":"Респондент В. В. Щебетюк (ID 40) не помнит название села, куда был доставлен в сотаве 20 остарбайтеров. Жили в специальном охраняемым помещении, откуда их выводили на работы. Щебетюк был занят на полевых работах. В селе в том числе содержались поляки-военнопленные. ","__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["неизвестно /Австрия","\"работали в Австрии\"; \"не помню даже село\"; \"большой бауэр"," который имел более сто гектаров земли"," ферму большую и в деревне шоколадную фабрику\"; \"В селе"," значит"," там были военнопленные","\nвоеннопленные – польские\"; \"Работали у этого бауэра на полю\""],"id":"54ef1331afda2d3c024e4818"},{"id":"54ef1331afda2d3c024e4817","type":"prison","name":"Гоппенраде","nearest_locality":"Гоппенраде","country":"Германия","description":"город в земле Мекленбург-Передняя Померания","point":[12.2736937,53.73019069999999],"__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["Гоппенраде"],"id":"54ef1331afda2d3c024e4817"},{"id":"54ef1331afda2d3c024e4816","type":"prison","name":"Нахтигаль","nearest_locality":"Виттенберг","country":"Германия","description":"","point":[12.6279659,51.8739831],"__v":0,"prison_type":["рабочий лагерь"],"synonyms":["Нахтигаль"],"id":"54ef1331afda2d3c024e4816"},{"id":"54ef1331afda2d3c024e4815","type":"prison","name":"неизвестно","nearest_locality":"Франкфурт-на-Маней","country":"Германия","description":"","point":[8.6821267,50.1109221],"__v":0,"prison_type":[""],"synonyms":["неизвестно","\"распределение"," дезинфекция\""],"id":"54ef1331afda2d3c024e4815"},
  // Toponyms
  {"_id":"54ef1e26f505ed9a022fdacd","type":"toponym","name":"село Васильевское ","current_name":"","country":"Россия","description":"","point":[36.58472200000001,55.61],"__v":0,"prison_type":[],"synonyms":[],"id":"54ef1e26f505ed9a022fdacd"},{"_id":"54ef1e26f505ed9a022fdacc","type":"toponym","name":"Копьевка","current_name":"","country":"Украина","description":"","__v":0,"prison_type":[],"synonyms":["Копиевка","укр. Копіївка"],"id":"54ef1e26f505ed9a022fdacc"},{"_id":"54ef1e26f505ed9a022fdacb","type":"toponym","name":"село Рукшин ","current_name":"","country":"Украина","description":"","point":[26.405833,48.4875],"__v":0,"prison_type":[],"synonyms":["укр. Рукшин"],"id":"54ef1e26f505ed9a022fdacb"},{"_id":"54ef1e26f505ed9a022fdaca","type":"toponym","name":"Рухотин","current_name":"","country":"Украина","description":"","point":[26.205,48.517222],"__v":0,"prison_type":[],"synonyms":["укр. Рухотин"],"id":"54ef1e26f505ed9a022fdaca"},{"_id":"54ef1e26f505ed9a022fdac9","type":"toponym","name":"Черновцы","current_name":"","country":"Украина","description":"","point":[25.9358367,48.2920787],"__v":0,"prison_type":[],"synonyms":["укр. Чернівці́"],"id":"54ef1e26f505ed9a022fdac9"},{"_id":"54ef1e26f505ed9a022fdac8","type":"toponym","name":"Негин (село Каменец-Подольского района Хмельницкой области)","current_name":"","country":"Украина","description":"","point":[26.566944,48.8375],"__v":0,"prison_type":[],"synonyms":[],"id":"54ef1e26f505ed9a022fdac8"},
  // Definitions
  {"_id":"54f48370cdc4e45004d97ca6","type": "definition", "title":"управдом","description":"управляющий домом, домами - прежнее название должностного лица, возглавляющего домоуправление","__v":0,"id":"54f48370cdc4e45004d97ca6"},{"_id":"54f48370cdc4e45004d97ca5","type": "definition", "title":"домком","description":"домовый комитет - общественная организация жильцов","__v":0,"id":"54f48370cdc4e45004d97ca5"},
  // Persons
  {"_id":"54f476ba973cfcef0354adab","type": "person", "name":"Мария","description":"Мария, младшая сестра О.Г. Головиной","__v":0,"id":"54f476ba973cfcef0354adab"},{"_id":"54f476ba973cfcef0354adac","type": "person", "name":"Головина Анна Терентьевна","description":"","__v":0,"id":"54f476ba973cfcef0354adac"}
];


var EntitiesPanel = React.createClass({
  displayName: "EntitiesPanel",

  // Data loading methods
  // ------------

  loadEntities: function() {
    var self = this;

    _.delay(function() {
      // Finished simulated loading of entities
      console.log('loading finished');
      self.setState({
        entities: ENTITIES
      });
    }, 700);
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      entities: []
    };
  },

  // Returns true when properties have changed and re-render is needed
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   var sameEntity = this.props.entityId === nextProps.entityId;
  //   var sameDoc = this.props.documentId === nextProps.documentId;

  //   if (sameEntity && sameDoc) return false;
  //   return true;
  // },

  // Events
  // ------------

  componentDidMount: function() {
    console.log('component mounted');
    this.loadEntities();
  },

  // Rendering
  // -------------------

  getEntityElement: function(entity) {
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

  render: function() {
    console.log('EntitiesPanel.render');
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

EntitiesPanel.panelName = "Entities";
EntitiesPanel.contextId = "entities";
EntitiesPanel.icon = "fa-bullseye";

// Factory method for creation of a new subject panel using properties derived from writer
// state
EntitiesPanel.create = function(writer) {
  return $$(EntitiesPanel, {
    id: "entities-panel",
    documentId: writer.props.doc.get('document').guid,
    entityId: writer.state.entityId
  });
};

module.exports = EntitiesPanel;