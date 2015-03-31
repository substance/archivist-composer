
var Reference = require('../../core/nodes/reference');

var SubjectReference = Reference.extend({
  name: "subject_reference",
  properties: {
    "target": ["array", "string"]
  }
});

module.exports = SubjectReference;
