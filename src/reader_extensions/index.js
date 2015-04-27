var ArchivistExtension = require("./archivist");
var SubjectsExtension = require("./subjects");
var EntitiesExtension = require("./entities");
var MetadataExtension = require("./metadata");
var TimecodesExtension = require("./timecodes");

module.exports = [
  EntitiesExtension,
  SubjectsExtension,
  TimecodesExtension,
  MetadataExtension,
  ArchivistExtension
];

