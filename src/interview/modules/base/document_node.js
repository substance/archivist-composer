var Substance = require('substance');

var DocumentNode = Substance.Document.Node.extend({
  name: "document",
  properties: {
    // General stuff
    "guid": "string",
    "creator": "string",
    "title": "string",
    "abstract": "string",
    "abstract_en": "string",
    "created_at": "string",
    "updated_at": "string",
    "published_on": "string",

    // Project related
    "project_name": "string",
    "project_location": "string", // points to an entity id
    "conductor": "string",
    "operator": "string",
    "sound_operator": "string",
    "record_type": "string", // "video" or "audio"
    "interview_location": "string",
    "interview_date": "string",
    "persons_present": "string",
    "interview_duration": "number",

    // Subject related
    // "subject_name": "Please enter interview subject name.",
    "subject_bio": "string",
    
    "subject_category": ["array", "string"],
    "subject_prisons": ["array", "string"],
    "subject_forced_labor_type": "string",
    "subject_movement": ["array", "object"],
    "personal_archive": ["array", "object"]
  }
});

module.exports = DocumentNode;