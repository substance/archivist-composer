var $$ = React.createElement;
var Substance = require("substance");
var Surface = Substance.Surface;



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

  getInitialState: function() {
    this.surface = new Surface(new Surface.FormEditor(this.props.writerCtrl.doc));
    return {};
  },

  componentDidMount: function() {
    this.props.writerCtrl.registerSurface(this.surface, "remarks");
    this.surface.attach(this.getDOMNode());
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.unregisterSurface(this.surface);
    this.surface.detach();
  },


  handleToggle: function(remarkId) {
    var writerCtrl = this.props.writerCtrl;
    // var activeRemark = this.props.activeRemark ? this.props.activeRemark.id : null;

    if (writerCtrl.state.remarkId === remarkId) {
      console.log('untoggle');
      writerCtrl.replaceState({
        contextId: "remarks"
      });
    } else {
      console.log('toggle');
      writerCtrl.replaceState({
        contextId: "remarks",
        remarkId: remarkId
      });
    }
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
        handleToggle: self.handleToggle,
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