// When user clicks on a reference somewhere, the extension gets the chance to
// manipulate writer state (e.g. switching the contextId) so a custom panel
// can display contextual information (see Entities Panel). Also data can be loaded asynchronously
// using a custom transition

var referenceHandler = function(writer, reference) {
	if (reference.type === "subject_reference") {
		return {
			contextId: "subjects",
			subjectId: reference.target
		}
	} else {
		return false;
	}
};

module.exports = referenceHandler;