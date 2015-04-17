var Article = require('substance/article');
var Paragraph = Article.Paragraph;

// TODO: remove this and use Paragraph instead.
// Paragraph is a much more consistent and conventional
// concept of what is desired here (text-ish block-level element).
var TextNode = Paragraph.extend({
  name: "text"
});

module.exports = TextNode;
