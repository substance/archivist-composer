'use strict';

var Substance = require('substance');
var $$ = React.createElement;

var Writer = require("substance/writer");
var Backend = require("./backend");
var LocalBackend = require("./local_backend");
var Interview = require("./interview");

var NotificationService = require("./notification_service");

// Writer Configuration
var writerModules = require("./writer_modules");

// Prepare local cache
window.cache = {};

// extract a component factory from writerModules and expose it via 'context'
var componentFactory = new Substance.Factory();
Substance.each(writerModules, function(module) {
  Substance.each(module.components, function(ComponentClass, name) {
    componentFactory.add(name, ComponentClass);
  });
});

// window.devMode = true;

// Create instance of metadata service
var backend;
if (window.devMode) {
  backend = new LocalBackend();
} else {
  backend = new Backend();
}

// Create notification service
var notifications = new NotificationService();

var htmlImporter = new Substance.Document.HtmlImporter({
  schema: Interview.schema,
  trimWhitespaces: true,
  REMOVE_INNER_WS: true,
});
// default handling for elemens with are not in the model
htmlImporter.defaultConverter = function(el, converter) {
  return {
    type: 'text',
    content: el.textContent
  };
};

var htmlExporter = new Substance.Document.HtmlExporter({
  // configuration
});

var globalContext = {
  componentFactory: componentFactory,
  backend: backend,
  notifications: notifications,
  htmlImporter: htmlImporter,
  htmlExporter: htmlExporter
};

var Composer = React.createClass({
  displayName: "Composer",

  childContextTypes: {
    componentFactory: React.PropTypes.object,
    backend: React.PropTypes.object,
    notifications: React.PropTypes.object,
    htmlImporter: React.PropTypes.object,
    htmlExporter: React.PropTypes.object
  },

  getChildContext: function() {
    return globalContext;
  },

  componentDidMount: function() {

    backend.getDocument(this.props.documentId || "example_document", function(err, doc) {
      this.setState({
        doc: doc
      });
    }.bind(this));
  },

  getInitialState: function() {
    return {
      doc: null
    };
  },

  render: function() {
    if (this.state.doc) {
      return $$(Writer, {
        config: {
          modules: writerModules
        },
        doc: this.state.doc,
        id: "writer"
      });
    } else {
      return $$('div', null, 'Loading document...');
    }
  }

});

var app = {
  start: function() {
    React.render(
      $$(Composer, {
        documentId: window.location.hash.slice(1)
      }),
      document.getElementById('container')
    );
  }
};

module.exports = app;