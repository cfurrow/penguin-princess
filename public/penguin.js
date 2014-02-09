var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function(require, exports, module) {
  var PIXI, Penguin;
  PIXI = require('pixi');
  Penguin = (function() {
    var MAX_VELOCITY;

    MAX_VELOCITY = 5;

    function Penguin() {
      this.tick = __bind(this.tick, this);
      this.keyDown = __bind(this.keyDown, this);
      this.keyUp = __bind(this.keyUp, this);
      this.texture = PIXI.Texture.fromImage('assets/images/penguin.png');
      this.sprite = new PIXI.Sprite(this.texture);
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 1.0;
      this.velocity = 0;
      this.movement = {
        left: false,
        right: false
      };
    }

    Penguin.prototype.width = function(w) {
      if (w == null) {
        w = null;
      }
      if (w != null) {
        this.sprite.width = w;
      }
      return this.sprite.width;
    };

    Penguin.prototype.height = function(h) {
      if (h == null) {
        h = null;
      }
      if (h != null) {
        this.sprite.height = h;
      }
      return this.sprite.height;
    };

    Penguin.prototype.position = function(x, y) {
      if (x == null) {
        x = null;
      }
      if (y == null) {
        y = null;
      }
      if (x != null) {
        this.sprite.position.x = x;
      }
      if (y != null) {
        this.sprite.position.y = y;
      }
      return this.sprite.position;
    };

    Penguin.prototype.keyUp = function(e) {
      if (e.keyCode === 39) {
        this.movement.right = false;
        return this.velocity = 0;
      } else if (e.keyCode === 37) {
        this.velocity = 0;
        return this.movement.left = false;
      }
    };

    Penguin.prototype.keyDown = function(e) {
      if (e.keyCode === 39) {
        this.movement.right = true;
        this.movement.left = false;
        return this.velocity = MAX_VELOCITY;
      } else if (e.keyCode === 37) {
        this.velocity = -MAX_VELOCITY;
        this.movement.left = true;
        return this.movement.right = false;
      }
    };

    Penguin.prototype.tick = function() {
      if (this.movement.right) {
        this.velocity = Math.abs(this.velocity);
        return this.sprite.scale.x = Math.abs(this.sprite.scale.x);
      } else if (this.movement.left) {
        this.velocity = -Math.abs(this.velocity);
        return this.sprite.scale.x = -Math.abs(this.sprite.scale.x);
      }
    };

    return Penguin;

  })();
  return exports.Penguin = Penguin;
});
