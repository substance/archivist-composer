window.devMode = true;

var app = require("./src/reader_app");

$(function() {

  window.document.title = "Archivist Reader"
  
  // Create a new Lens app instance
  // --------
  //

  // launch it
  app.start();
});
