var ArchivistExtension = require("./archivist");
var SubjectsExtension = require("./subjects");
var EntitiesExtension = require("./entities");
var MetadataExtension = require("./metadata");
var TimecodesExtension = require("./timecodes");
var RemarksExtension = require("./remarks");

module.exports = [
  EntitiesExtension,
  SubjectsExtension,
  TimecodesExtension,
  RemarksExtension,
  MetadataExtension,
  ArchivistExtension
];

