var $$ = React.createElement;
var _ = require("underscore");
var SubjectsModel = require("./subjects_model");

var SUBJECTS = require("./subjects_fixture");

// Sub component
var Subject = require("./subject");


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
				subjects: new SubjectsModel(self.props.doc, SUBJECTS)
			});
		}, 1);
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    var subjects = new SubjectsModel(this.props.doc, SUBJECTS);
    
    return {
      subjects: subjects
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    // If not from cache -> load
    if (this.state.subjects.length === 0) {
      this.loadSubjects();  
    }
  },

  handleToggle: function(subjectId) {
    // console.log('meeeh haah', subjectId);
    var writer = this.props.writer;

    if (writer.state.subjectId === subjectId) {
      writer.replaceState({
        contextId: "subjects"
      }); 
    } else {
      writer.replaceState({
        contextId: "subjects",
        subjectId: subjectId
      });      
    }
  },

  // Rendering
  // -------------------

  render: function() {
  	var state = this.state;
  	var props = this.props;
    var self = this;

    // Only get referenced subjects
    var referencedSubjects = state.subjects.getAllReferencedSubjects();

    var subjectNodes = referencedSubjects.map(function(subject, index) {
      // Dynamically assign active state and a few other things
      subject.active = subject.id === props.subjectId;
      subject.key = subject.id;
      subject.handleToggle = self.handleToggle;
      subject.fullPath = state.subjects.getFullPathForSubject(subject.id);
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