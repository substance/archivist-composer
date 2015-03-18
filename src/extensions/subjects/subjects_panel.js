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
  this.subjects = [];
	this.loadSubjects();
};

SubjectsPanel.Prototype = function() {
	// Component mounted
	this.componentDidMount = function() {
		console.log('subjects panel mounted');
	};

	// Returns true when properties have changed and re-render is needed
	this.shouldComponentUpdate = function(nextProps, nextState) {
		if (this.props.subjectId !== nextProps.subjectId) return true;
		if (this.props.documentId !== nextProps.documentId) return true;
		return false;
	};

	// Load subjects associated to the document and update computedProps
	this.loadSubjects = function() {
		var that = this;

		_.delay(function() {
			that.subjects = JSON.parse(JSON.stringify(SUBJECTS));
			that.rerender(); // explicit refresh!
		}, 700);
	};

  this.render = function() {
  	console.log('SubjectsPanel.render');
  	var props = this.props;

    var subjectNodes = this.subjects.map(function(subject, index) {
    	subject.active = subject.id === props.subjectId;
      return $$(Subject, subject);
    });

    return $$("div", {className: "subjects-panel-component panel"},
      $$("div", {className: "subjects"}, subjectNodes)
    );
  };
};

// Component Configuration
// -----------------

SubjectsPanel.persistent = true;

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


SubjectsPanel.Prototype.prototype = Component.prototype;
SubjectsPanel.prototype = new SubjectsPanel.Prototype();

module.exports = SubjectsPanel;