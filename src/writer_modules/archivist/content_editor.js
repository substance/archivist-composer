var Substance = require('substance');
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");
var TextProperty = require("substance/writer").TextProperty;
var TitleEditor = require("./title_editor");


var ENABLED_TOOLS = ["strong", "emphasis", "timecode", "remark", "entity_reference", "subject_reference"];


// Container Node
// ----------------
//
// Represents a flat collection of nodes


// TODO: this is not Substance.Writer but should be in Archivist
// Plan: make this implementation an abstract mixin
// and let the application configure a componentFactory
// that provides a customized version.

var ContentEditor = React.createClass({
  displayName: "ContentEditor",

  contextTypes: {
    componentFactory: React.PropTypes.object.isRequired,
    notifications: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    // provided to editor components so that they know in which context they are
    surface: React.PropTypes.object,
  },

  getChildContext: function() {
    return {
      surface: this.surface
    };
  },

  getInitialState: function() {
    var editor = new Surface.ContainerEditor(this.props.doc.get('content'));
    // HACK: this is also Archivist specific
    editor.defaultTextType = 'text';
    var options = {
      logger: this.context.notifications
    };
    this.surface = new Surface(editor, options);

    return {};
  },

  handleToggleSubjectReference: function(e) {
    e.preventDefault();
    var subjectReferenceId = e.currentTarget.dataset.id;
    var writerCtrl = this.props.writerCtrl;
    var state = writerCtrl.state;

    if (state.contextId === "editSubjectReference" && state.subjectReferenceId === subjectReferenceId) {
      writerCtrl.replaceState({
        contextId: "subjects"
      });
    } else {
      writerCtrl.replaceState({
        contextId: "editSubjectReference",
        subjectReferenceId: subjectReferenceId
      });
    }
  },

  render: function() {
    var containerNode = this.props.node;
    var doc = this.props.doc;
    var writerCtrl = this.props.writerCtrl;

    // Prepare subject reference components
    // ---------

    var subjectReferences = doc.getIndex('type').get('subject_reference');
    var subjectRefComponents = [];
    var activeContainerAnnotations = writerCtrl.getActiveContainerAnnotations();

    _.each(subjectReferences, function(sref) {
      subjectRefComponents.push($$('a', {
        className: "subject-reference"+(_.includes(activeContainerAnnotations, sref.id) ? ' selected' : ''),
        href: "#",
        "data-id": sref.id,
        onClick: this.handleToggleSubjectReference
      }));
    }, this);

    // Prepare container components (aka nodes)
    // ---------

    var componentFactory = this.context.componentFactory;
    var components = [];
    components = components.concat(containerNode.nodes.map(function(nodeId) {
      var node = doc.get(nodeId);
      var ComponentClass = componentFactory.get(node.type);
      if (!ComponentClass) {
        throw new Error('Could not resolve a component for type: ' + node.type);
      }
      return $$(ComponentClass, {
        key: node.id,
        doc: doc,
        node: node,
        // TODO: we should use DI instead of coupling to the writer
        writerCtrl: writerCtrl
      });
    }));

    // Top level structure
    // ---------

    return $$('div', {className: 'content-wrapper'},
      $$(TitleEditor, {writerCtrl: this.props.writerCtrl}),
      // The full fledged interview (ContainerEditor)
      $$("div", {ref: "interviewContent", className: "interview-content", contentEditable: true, "data-id": "content"},
        $$("div", {
            className: "container-node " + this.props.node.id,
            spellCheck: false,
            "data-id": this.props.node.id
          },
          $$('div', {className: "nodes"}, components),
          $$('div', {className: "subject-references", contentEditable: false}, subjectRefComponents)
        )
      )
    );

  },

  updateBrackets: function() {
    var doc = this.props.doc;
    var subjectReferences = doc.getIndex('type').get('subject_reference');

    _.each(subjectReferences, function(subjRef) {
      var anchors = $(this.getDOMNode()).find('.nodes .anchor[data-id='+subjRef.id+']');

      var startAnchorEl, endAnchorEl;
      if ($(anchors[0]).hasClass('start-anchor')) {
        startAnchorEl = anchors[0];
        endAnchorEl = anchors[1];
      } else {
        startAnchorEl = anchors[1];
        endAnchorEl = anchors[0];
      }

      if (!startAnchorEl || !endAnchorEl) {
        console.warn("FIXME: Could not find anchors for subject reference ", subjRef.id);
        return;
      }

      var startTop = $(startAnchorEl).position().top;
      var endTop = $(endAnchorEl).position().top + $(endAnchorEl).height();
      var height = endTop - startTop;

      var subjectRefEl = $(this.getDOMNode()).find('.subject-references .subject-reference[data-id='+subjRef.id+']');

      subjectRefEl.css({
        top: startTop,
        height: height
      });
    }, this);
  },


  componentDidMount: function() {
    var surface = this.surface;

    var doc = this.props.doc;

    doc.connect(this, {
      'document:changed': this.onDocumentChange
    });

    this.props.writerCtrl.registerSurface(surface, "content", {
      enabledTools: ENABLED_TOOLS
    });
    surface.attach(this.refs.interviewContent.getDOMNode());

    doc.connect(this, {
      'container-annotation-update': this.handleContainerAnnotationUpdate
    });

    var self = this;

    // TODO: we need a way so that the brackets get updated properly
    this.forceUpdate(function() {
      self.updateBrackets();
      _.delay(function() {
        self.updateBrackets();
      }, 100);

      self.surface.rerenderDomSelection();
    });

    $(window).resize(this.updateBrackets);
  },

  handleContainerAnnotationUpdate: function() {
    var self = this;
    this.forceUpdate(function() {
      self.updateBrackets();
    });
  },

  componentDidUpdate: function() {
    // HACK: when the state is changed this and particularly TextProperties
    // get rerendered (e.g., as the highlights might have changed)
    // Unfortunately we loose the DOM selection then.
    // Thus, we are resetting it here, but(!) delayed as otherwise the surface itself
    // might not have finished setting the selection to the desired and a proper state.
    if (!this.surface.__prerendering__) {
      var self = this;
      setTimeout(function() {
        self.surface.rerenderDomSelection();
      });
    }
  },

  componentWillUnmount: function() {
    var surface = this.surface;
    var doc = this.props.doc;
    doc.disconnect(this);

    this.props.writerCtrl.unregisterSurface(surface);
    surface.detach();
  },

  onDocumentChange: function(change) {
    var writerCtrl = this.props.writerCtrl;
    // console.log('##### ContainerComponent.onDocumentChange', change);

    var deletedSubjectRefs = _.filter(change.deleted, function(node) {
      return node.type === "subject_reference";
    });

    var createdSubjectRefs = _.filter(change.created, function(node) {
      return node.type === "subject_reference";
    });

    // HACK: implicitly switch the state when a subject reference is deleted and currently open
    // This implicitly also updates the brackets accordingly
    var subjectRef = deletedSubjectRefs[0];
    if (subjectRef && writerCtrl.state.subjectReferenceId === subjectRef.id) {
      writerCtrl.replaceState({
        contextId: 'subjects'
      });
      return;
    }

    if (change.isAffected([this.props.node.id, 'nodes']) || createdSubjectRefs.length > 0 ) {
      var self = this;
      // console.log('##### calling forceUpdate after document change');
      this.forceUpdate(function() {
        self.updateBrackets();
      });
    }
    // eagerly update brackets on every change
    else {
      this.updateBrackets();
    }
  }

});

module.exports = ContentEditor;