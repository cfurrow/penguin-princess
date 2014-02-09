var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function(require, exports, module) {
  var Interaction;
  Interaction = (function() {
    function Interaction() {
      this.defaultEvent = __bind(this.defaultEvent, this);
      this.runKeyPresses = __bind(this.runKeyPresses, this);
      this.runKeyDowns = __bind(this.runKeyDowns, this);
      this.addKeyDown = __bind(this.addKeyDown, this);
      this.runKeyUps = __bind(this.runKeyUps, this);
      this.addKeyUp = __bind(this.addKeyUp, this);
      this.keyUpEvents = [this.defaultEvent];
      this.keyDownEvents = [this.defaultEvent];
      this.keyPressEvents = [this.defaultEvent];
      this.addEventListener(window, 'keyup', this.runKeyUps);
      this.addEventListener(window, 'keydown', this.runKeyDowns);
      this.addEventListener(window, 'keypress', this.runKeyPresses);
    }

    Interaction.prototype.addKeyUp = function(fn) {
      return this.keyUpEvents.push(fn);
    };

    Interaction.prototype.runKeyUps = function(e) {
      var cb, _i, _len, _ref;
      _ref = this.keyUpEvents;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        cb(e);
      }
      return false;
    };

    Interaction.prototype.addKeyDown = function(fn) {
      return this.keyDownEvents.push(fn);
    };

    Interaction.prototype.runKeyDowns = function(e) {
      var cb, _i, _len, _ref;
      _ref = this.keyDownEvents;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        cb(e);
      }
      return false;
    };

    Interaction.prototype.runKeyPresses = function(e) {
      return false;
    };

    Interaction.prototype.addEventListener = function(elem, name, func) {
      if (elem.addEventListener != null) {
        return elem.addEventListener(name, func);
      } else {
        return elem.attachEvent(name, func);
      }
    };

    Interaction.prototype.cancelBubble = function(e) {
      if (e != null) {
        e.preventDefault();
        return e.stopPropagation();
      } else {
        return window.event.cancelBubble = true;
      }
    };

    Interaction.prototype.defaultEvent = function(e) {
      if (!(e.keyCode === 82 && e.metaKey)) {
        return this.cancelBubble();
      }
    };

    return Interaction;

  })();
  return exports.Interaction = Interaction;
});
