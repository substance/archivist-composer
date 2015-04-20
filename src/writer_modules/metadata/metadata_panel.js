var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");
var TextProperty = require("substance/writer").TextProperty;

// Helpers
// ------------------

function label(name) {
  return $$('div', {className: 'label', contentEditable: false}, name);
}

function button(name, type) {
  return $$('a', {className: 'button', href: '#', contentEditable: false}, name);
}

// Metadat Panel
// ------------------

var MetadataPanel = React.createClass({
  displayName: "Info",

  // State relevant things
  // ------------

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    surface: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      surface: this.surface
    };
  },

  getInitialState: function() {
    this.surface = new Surface(new Surface.FormEditor(this.props.writerCtrl.doc));
    return null;
  },


  componentDidMount: function() {
    this.props.writerCtrl.registerSurface(this.surface, "metadata");
    this.surface.attach(this.getDOMNode());

    this.loadMetadata();
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.unregisterSurface(this.surface);
    this.surface.detach();
  },

  loadPrisons: function(cb) {
    var backend = this.context.backend;
    var doc = this.props.writerCtrl.doc;
    var prisonIds = doc.get('document').subject_prisons;
    backend.getEntities(prisonIds, cb);
  },


  loadMetadata: function() {
    var self = this;
    console.log('loading external metadata');

    this.loadPrisons(function(err, prisons) {
      self.setState({
        prisons: prisons
      });
    });
  },

  renderTextProperty: function(property) {
    return $$(TextProperty, {
      doc: this.props.writerCtrl.doc,
      path: [ "document", property],
      writerCtrl: this.props.writerCtrl,
    });
  },

  handleRemovePrison: function(e) {
    console.log('yay');
    console.log('remove the prison', prisonId);
    var prisonId = e.currentTarget.dataset.id;

    e.preventDefault();
    // var doc = this.props.writerCtrl.doc;
    // var prisonIds = doc.get('document').subject_prisons;

    // prisonIds = _.without(prisonIds, )

    //   var subjectIds = Object.keys(selectedNodes);
    //   var tx = this.props.writerCtrl.doc.startTransaction();
    //   try {
    //     tx.set([this.props.subjectReferenceId, "target"], subjectIds);
    //     tx.save({}, {updateSubjectReference: true});
    //   } finally {
    //     tx.cleanup();
    //   }
    
  },

  renderPrisons: function() {
    var prisonEls = this.state.prisons.map(function(prison) {
      return $$('span', {className: 'prison'},
        $$('span', {className: 'name'}, prison.name),
        $$('a', {
          href: "#",
          "data-id": prison.id,
          className: 'remove-prison',
          onClick: this.handleRemovePrison,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-remove"></i>'},
        })
      );
    }.bind(this));

    return $$('div', {className: 'prisons-wrapper', contentEditable: false},
      label("Prisons"),
      $$('div', {className: 'prisons'}, prisonEls),
      $$('a', {href: '#', className: 'add-prison', onClick: this.handleRemovePrison}, "Add prison")
    );
  },

  render: function() {
    var props = this.props;

    // // Project related
    //     "project_name": "string",
    //     "project_location": "string", // points to an entity id
    //     "conductor": "string",
    //     "operator": "string",
    //     "sound_operator": "string",
    //     "record_type": "string", // "video" or "audio"
    //     "interview_location": "string",
    //     "inverview_date": "string",
    //     "persons_present": "string",
    //     "interview_duration": "number",


    if (!this.state) {
      return $$('div', {contentEditable: true, "data-id": "metadata"}, 'Loading');
    }

    return $$("div", {className: "panel metadata-panel-component", contentEditable: true, "data-id": "metadata"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'abstracts section'},
          $$('h3', {contentEditable: false}, "Summary"),
          // Russian abstract
          label("Russian"),
          this.renderTextProperty('abstract'),

          // English abstract
          label("English"),
          this.renderTextProperty('abstract_en')
        ),

        $$('div', {className: 'biography section'},
          $$('h3', null, "Biography"),
          label("Name"),
          this.renderTextProperty("title"),

          label("Biography"),
          this.renderTextProperty("subject_bio"),

          this.renderPrisons()

          // <input type="number" name="quantity" min="1" max="5">

          // "subject_prisons": [
          //     {
          //         "id": "",
          //         "location": ""
          //     },
          //     {
          //         "id": "",
          //         "location": ""
          //     }
          // ],
          // "subject_forced_labor_type": "intracamp work; earthworks (construction of barracks); digging tunnels for military factories",
          // "subject_movement": [
          //     {
          //         "id": "",
          //         "location": "",
          //         "density": ""
          //     },
          //     {
          //         "id": "",
          //         "location": "",
          //         "density": ""
          //     }
          // ],
          // "personal_archive": [
          //     {
          //         "file": "",
          //         "description": ""
          //     },
          //     {
          //         "file": "",
          //         "description": ""
          //     }
          // ]

          // $$('div', {className: 'label'}, "Abstract English"),
          // this.renderTextProperty("abstract_en")
        ),

        $$('div', {className: 'project section'},
          $$('h3', {contentEditable: false}, "Project Details"),
          // Project name
          label("Project Name"),
          this.renderTextProperty('project_name'),

          // Project location
          label("Location"),
          button("Set location"),

          // Where the interview took place
          label("Place"),
          this.renderTextProperty('interview_location'),

          // Where the interview took place
          label("Persons present"),
          this.renderTextProperty('persons_present'),

          // Video or audio
          label("Interview Type"),
          $$('select', {contentEditable: false},
            $$('option', {value: "video"}, "Video"),
            $$('option', {value: "audio"}, "Audio")
          ),

          // Where the interview took place
          label("Duration (in minutes)"),
          this.renderTextProperty('interview_duration'),

          // Where the interview took place
          label("Interview date"),
          this.renderTextProperty('interview_date'),

          // The interviewer
          label("Interviewer"),
          this.renderTextProperty('conductor'),

          // Interview operator
          label("Operator"),
          this.renderTextProperty('operator'),

          // Sound
          label("Sound Operator"),
          this.renderTextProperty('sound_operator'),

          label("Date of publication"),
          this.renderTextProperty('published_on')
          // $$('div', {className: "This interview was created on XX and published on YY. Last update was made"})
        )
      )
    );
  }
});

MetadataPanel.contextId = "metadata";
MetadataPanel.icon = "fa-info";

module.exports = MetadataPanel;
