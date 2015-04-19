var CoreModule = require("substance/writer").CoreModule;

var ArchivistModule = require("./archivist");
var SubjectsModule = require("./subjects");
var EntitiesModule = require("./entities");
var MetadataModule = require("./metadata");
var TimecodesModule = require("./timecodes");
var RemarksModule = require("./remarks");

module.exports = [
  EntitiesModule,
  SubjectsModule,
  TimecodesModule,
  RemarksModule,
  CoreModule,
  MetadataModule,
  ArchivistModule
];
