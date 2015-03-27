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
  displayName: "Subjects",

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

  // Events
  // ------------

  componentDidMount: function() {
    this.loadSubjects();
  },

  handleToggle: function(subjectId) {
    // console.log('meeeh haah', subjectId);
    var writer = this.props.writer;

    writer.replaceState({
      contextId: "subjects",
      subjectId: subjectId
    });
  },

  // Rendering
  // -------------------

  render: function() {
  	var state = this.state;
  	var props = this.props;
    var self = this;

    var subjectNodes = state.subjects.map(function(subject, index) {
      // Dynamically assign active state
      subject.active = subject.id === props.subjectId;
      subject.key = subject.id;
      subject.handleToggle = self.handleToggle;
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

SubjectsPanel.contextId = "subjects";
SubjectsPanel.icon = "fa-tag";

module.exports = SubjectsPanel;