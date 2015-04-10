var CoreModule = require("./core");
var SubjectsModule = require("./subjects");
var EntitiesModule = require("./entities");
var MetadataModule = require("./metadata");
var TimecodesModule = require("./timecodes");

module.exports = [
  EntitiesModule,
  SubjectsModule,
  TimecodesModule,
  CoreModule,
  MetadataModule
];
