var CoreModule = require("substance/writer").CoreModule;

var ArchivistModule = require("./archivist");
var SubjectsModule = require("./subjects");
var EntitiesModule = require("./entities");
var MetadataModule = require("./metadata");
var TimecodesModule = require("./timecodes");

module.exports = [
  ArchivistModule,
  EntitiesModule,
  SubjectsModule,
  TimecodesModule,
  CoreModule// ,
  // MetadataModule
];
