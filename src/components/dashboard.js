var Application = require("substance-application");
var Component = Application.Component;
var $$ = Application.$$;
var _ = require("underscore");

// The Dashboard Component
// ----------------

var Dashboard = function(props) {
  Component.call(this, props);
};

Dashboard.Prototype = function() {

  this.render = function() {
    return $$("div", {className: "dashboard-component"},
      $$("div", {html: "I AM THE DASHBOARD"})
    );
  };
};

Dashboard.Prototype.prototype = Component.prototype;
Dashboard.prototype = new Dashboard.Prototype();

module.exports = Dashboard;