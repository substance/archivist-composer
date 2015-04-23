var $$ = React.createElement;
var Substance = require("substance");
var Surface = Substance.Surface;
var _ = require("substance/helpers");



// Sub component
var Remark = require("./remark");

// Subjects Panel extension
// ----------------

var RemarksPanel = React.createClass({
  displayName: "Remarks",

  // State relevant things
  // ------------

  childContextTypes: {
    surface: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      surface: this.surface
    };
  },

  componentWillMount: function() {
    var writerCtrl = this.props.writerCtrl;
    var surface = new Surface(new Surface.FormEditor(this.props.writerCtrl.doc));

    surface.connect(this, {
      'selection:changed': function(sel) {
        if (!sel.getPath) return; // probably a null selection
        var remarkId = sel.getPath()[0];
        writerCtrl.replaceState({
          contextId: "remarks",
          remarkId: remarkId
        });
        surface.rerenderDomSelection();
      }
    });

    this.surface = surface;

    return {};
  },

  componentDidMount: function() {
    this.props.writerCtrl.registerSurface(this.surface, "remarks", {
      enabledTools: ["strong", "emphasis"]
    });
    this.surface.attach(this.getDOMNode());
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.unregisterSurface(this.surface);
    this.surface.detach();
  },

  // Rendering
  // -------------------

  render: function() {
    var state = this.state;
    var props = this.props;
    var self = this;

    var remarkNodes = this.props.remarks.map(function(remark) {
      return $$(Remark, {
        remark: remark,
        key: remark.id,
        active: remark === props.activeRemark,
        writerCtrl: props.writerCtrl
      });
    });

    return $$("div", {className: "panel remarks-panel-component", contentEditable: true, 'data-id': "remarks"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'remarks'},
          remarkNodes
        )
      )
    );
  }
});

// Panel Configuration
// -----------------

RemarksPanel.contextId = "remarks";
RemarksPanel.icon = "fa-comment";

module.exports = RemarksPanel;