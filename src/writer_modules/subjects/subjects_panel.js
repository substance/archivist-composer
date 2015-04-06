var $$ = React.createElement;
var Substance = require("substance");
var SubjectsModel = require("./subjects_model");

// Sub component
var Subject = require("./subject");

// Subjects Panel extension
// ----------------
//
// TODO: make stateful something like this: http://blog.mgechev.com/2015/03/05/persistent-state-reactjs/

var SubjectsPanel = React.createClass({
  displayName: "Subjects",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  // Data loading methods
  // ------------

  loadSubjects: function() {
    var writerCtrl = this.props.writerCtrl;
    var backend = this.context.backend;

    console.log('loading subjects...');
    
    backend.getSubjects(function(err, subjects) {
      this.setState({
        subjects: new SubjectsModel(writerCtrl.doc, subjects)
      });
    }.bind(this));
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    // var writerCtrl = this.props.writerCtrl;
    // var subjects = new SubjectsModel(writerCtrl.doc, SUBJECTS);

    // return {
    //   subjects: subjects
    // };
    return {
      subjects: null
    }
  },

  // Events
  // ------------

  componentDidMount: function() {
    if (!this.state.subjects) {
      this.loadSubjects();
    }
  },

  handleToggle: function(subjectId) {
    var writerCtrl = this.props.writerCtrl;

    if (writerCtrl.state.subjectId === subjectId) {
      writerCtrl.replaceState({
        contextId: "subjects"
      });
    } else {
      writerCtrl.replaceState({
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

    if (!state.subjects) {
      return $$("div", null, "Loading subjects ...");
    }

    // Only get referenced subjects
    var referencedSubjects = state.subjects.getAllReferencedSubjects();
    var subjectNodes = referencedSubjects.map(function(subject) {
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