var SelectEntityMixin = require("../archivist/select_entity_mixin");
var _ = require("substance/helpers");


var SelectPrisonPanelMixin = _.extend({}, SelectEntityMixin, {
  
  // Called with entityId when an entity has been clicked
  handleSelection: function(entityId) {
    console.log('creating prison entry');
    var writerCtrl = this.props.writerCtrl;

    var prisonIds = doc.get('document').interviewee_prisons;
    prisonIds.push(entityId);
    var tx = writerCtrl.doc.startTransaction();
    try {
      tx.set(["document", "interviewee_prisons"], prisonIds);
      tx.save({});
    } finally {
      tx.cleanup();
    }

    writerCtrl.replaceState({
      contextId: "metadata"
    });
  }
});

var SelectPrisonPanel = React.createClass({
  mixins: [SelectPrisonPanelMixin],
  displayName: "Tag Entity"
});

// Panel configuration
// ----------------

SelectPrisonPanel.contextId = "selectPrison";
SelectPrisonPanel.icon = "fa-bullseye";

// No context switch toggle is shown
SelectPrisonPanel.isDialog = true;

module.exports = SelectPrisonPanel;