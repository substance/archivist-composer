var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// Sub component
var Subject = require("./subject");

var SUBJECTS = [
  {"_id":"54bae4cda868bc6fab4bcd0e","name":"Казни (в том числе потенциальные)","parent":"54bae4cda868bc6fab4bcd0d","__v":0,"id":"54bae4cda868bc6fab4bcd0e"},{"_id":"54bae4d0a868bc6fab4bcd16","name":"Лагеря  военнопленных","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae4d0a868bc6fab4bcd16"}
];

// Subjects Panel extension
// ----------------

var SubjectsPanel = function(props) {
  Component.call(this, props);
};

SubjectsPanel.Prototype = function() {

	this.markActiveSubject = function() {
		_.each(this.subjects, function(subject) {
			subject.active = subject.id === this.props.subjectId;
		}, this);
	};

	this.loadSubjects = function(cb) {
		var that = this;
		console.log(this.props.subjectId);

		if (this.subjects) {
			// We don't run into this case here because components (like this panel) are not recycled, thus data needs to get loaded
			// again.
			that.markActiveSubject();
		} else {
			_.delay(function() {
				that.subjects = JSON.parse(JSON.stringify(SUBJECTS));
				that.markActiveSubject();
				cb(null);
			}, 1);			
		}
	};

  this.transition = function(oldState, newState, cb) {
  	this.loadSubjects(cb);
  };

  // this.renderUninitialized = function() {
  // 	return $$("div", {html: "Loading subjects ..."});
  // };

  this.render = function() {
    var subjectNodes = this.subjects.map(function(subject, index) {
      return $$(Subject, subject);
    });

    return $$("div", {className: "subjects-panel-component panel"},
      $$("div", {className: "subjects"}, subjectNodes)
    );
  };
};


// Panel Configuration
// -----------------

SubjectsPanel.panelName = "Subjects";
SubjectsPanel.contextId = "subjects";
SubjectsPanel.icon = "fa-tag";

// Factory method for creation of a new subject panel using properties derived from writer
// state
SubjectsPanel.create = function(writer) {
	return $$(SubjectsPanel, {
		documentId: writer.props.doc.get('document').guid,
		subjectId: writer.state.subjectId
	});
};


SubjectsPanel.Prototype.prototype = Component.prototype;
SubjectsPanel.prototype = new SubjectsPanel.Prototype();

module.exports = SubjectsPanel;