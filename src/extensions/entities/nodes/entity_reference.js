
var Reference = require('../../core/nodes/reference');

var EntityReference = Reference.extend({
  name: "entity_reference",
  properties: {
    "target": "string"
  }
});

module.exports = EntityReference;
