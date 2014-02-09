var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function(require, exports, module) {
  var Background, PIXI;
  PIXI = require('pixi');
  Background = (function() {
    function Background(options) {
      this.tick = __bind(this.tick, this);
      this.keyDown = __bind(this.keyDown, this);
      this.distance = options.distance.toFixed(3);
      this.texture = PIXI.Texture.fromImage(options.texture);
      this.sprite = new PIXI.TilingSprite(this.texture, options.width, options.height);
      this.movement = {
        left: false,
        right: false
      };
      this.sprite.anchor.y = 1.0;
    }

    Background.prototype.keyDown = function(e) {
      if (e.keyCode === 39) {
        this.movement.right = false;
        return this.movement.left = true;
      } else if (e.keyCode === 37) {
        this.movement.left = false;
        return this.movement.right = true;
      }
    };

    Background.prototype.tick = function(playerVelocity) {
      return this.sprite.position.x += -playerVelocity.toFixed(3) / this.distance;
    };

    return Background;

  })();
  return exports.Background = Background;
});
