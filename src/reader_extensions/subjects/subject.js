var $$ = React.createElement;

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

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      // we don't need full path here now
      //$$('div', {className: 'full-path'}, this.props.fullPath.join(" > "))
      $$('div', {className: 'full-path'}, this.props.name)
    );
  }
});


module.exports = Subject;