"use strict";

var Substance = require("substance");


// Notification service
// ----------------
//

var NotificationService = function() {
  NotificationService.super.call(this);
  this.messages = [];
};

NotificationService.Prototype = function() {

  this.addMessage = function(msg) {
    this.messages.push(msg);
    this.emit('messages:updated', this.messages);
  };

  this.clearMessages = function() {
    this.messages = [];
    this.emit('messages:updated', this.messages);
  };
};

Substance.inherit(NotificationService, Substance.EventEmitter);

module.exports = NotificationService;