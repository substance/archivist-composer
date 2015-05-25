var ArchivistExtension = require("./archivist");
var SubjectsExtension = require("./subjects");
//var EntitiesExtension = require("./entities");
var PersonsExtension = require("./persons");
var LocationsExtension = require("./locations");
var DefinitionsExtension = require("./definitions");
var MetadataExtension = require("./metadata");
var TimecodesExtension = require("./timecodes");

module.exports = [
  DefinitionsExtension,
  SubjectsExtension,
  TimecodesExtension,
  MetadataExtension,
  LocationsExtension,
  PersonsExtension,
  ArchivistExtension
];

