var Reference = require('../core/reference');

var SubjectReference = Reference.extend({
  name: "subject_reference",
  properties: {
    "target": ["array", "string"]
  }
});

module.exports = SubjectReference;
