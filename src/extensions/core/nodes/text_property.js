var $$ = React.createElement;

// TextProperty
// ----------------
//

var TextProperty = React.createClass({
  displayName: "TextProperty",
  render: function() {
    var text = this.props.doc.get(this.props.path);
    // TODO: eventually I want to render annotated text here
    var annotatedText = text; // TODO create annotated html
    return $$("span", {
      className: "text-property " + this.props.className || "",
      contentEditable: true,
      dangerouslySetInnerHTML: {__html: annotatedText}
    });
  }
});

module.exports = TextProperty;
