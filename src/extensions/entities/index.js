"use strict";

var EntitiesPanel = require("./entities_panel");
var loadEntities = require("./load_entities");

module.exports = {
	name: "entities",
	panels: [
		EntitiesPanel,
	],
	transitions: [
		loadEntities
	]
};
