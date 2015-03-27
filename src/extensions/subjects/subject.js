var $$ = React.createElement;
var _ = require("underscore");

// Subject view
// ----------------

var Subject = React.createClass({
  displayName: "Subject",

  handleToggle: function(e) {
    this.props.handleToggle(this.props.id);
    e.preventDefault();
  },

  render: function() {
    var className = ["subject", this.props.type];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle}, [
      $$('div', {className: 'name'}, this.props.name),
      $$('div', {className: 'id'}, this.props.id)
    ]);
  }
});


module.exports = Subject;