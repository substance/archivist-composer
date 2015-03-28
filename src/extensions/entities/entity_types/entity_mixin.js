var EntityMixin = {
  // Handles click to activate an entity
  handleToggle: function(e) {
    this.props.handleToggle(this.props.id);
    e.preventDefault();
  }
};

module.exports = EntityMixin;