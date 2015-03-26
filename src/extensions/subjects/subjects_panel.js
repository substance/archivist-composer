var $$ = React.createElement;
var _ = require("underscore");

// Sub component
var Subject = require("./subject");


var SUBJECTS = [
  {"_id":"54bae4cda868bc6fab4bcd0e","name":"Казни (в том числе потенциальные)","parent":"54bae4cda868bc6fab4bcd0d","__v":0,"id":"54bae4cda868bc6fab4bcd0e"},{"_id":"54bae4d0a868bc6fab4bcd16","name":"Лагеря  военнопленных","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae4d0a868bc6fab4bcd16"}
];

// Subjects Panel extension
// ----------------
// 
// TODO: make stateful something like this: http://blog.mgechev.com/2015/03/05/persistent-state-reactjs/

var SubjectsPanel = React.createClass({
  displayName: "SubjectsPanel",

  // Data loading methods
  // ------------

  loadSubjects: function() {
  	var self = this;
		_.delay(function() {
			self.setState({
				subjects: SUBJECTS
			});
		}, 700);
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      subjects: []
    };
  },

  // Returns true when properties have changed and re-render is needed
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   var sameSubject = this.props.subjectId === nextProps.subjectId;
  //   var sameDoc = this.props.documentId === nextProps.documentId;

  //   if (sameSubject && sameDoc) return false;
  //   return true;
  // },

  // Events
  // ------------

  componentDidMount: function() {
    this.loadSubjects();
  },

  // Rendering
  // -------------------


  render: function() {
  	var state = this.state;
  	var props = this.props;

    var subjectNodes = state.subjects.map(function(subject, index) {
      // Dynamically assign active state
      subject.active = subject.id === props.subjectId;
      subject.key = subject.id;
      return $$(Subject, subject);
    });

    return $$("div", {className: "panel subjects-panel-component"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'subjects'},
          subjectNodes
        )
      )
    );
  }
});

// Panel Configuration
// -----------------

SubjectsPanel.panelName = "Subjects";
SubjectsPanel.contextId = "subjects";
SubjectsPanel.icon = "fa-tag";

// Factory method for creation of a new subject panel using properties derived from writer
// state
SubjectsPanel.create = function(writer) {
	return $$(SubjectsPanel, {
		id: "subjectspanel",
		documentId: writer.props.doc.get('document').guid,
		subjectId: writer.state.subjectId
	});
};

module.exports = SubjectsPanel;