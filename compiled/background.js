var Background,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Background = (function() {
  function Background(imgPath, distance, baseMovement, width, height) {
    this.tick = __bind(this.tick, this);
    this.keyUp = __bind(this.keyUp, this);
    this.keyDown = __bind(this.keyDown, this);
    this.distance = distance.toFixed(3);
    this.baseMovement = baseMovement.toFixed(3);
    this.texture = PIXI.Texture.fromImage(imgPath);
    this.sprite = new PIXI.TilingSprite(this.texture, width, height);
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

  Background.prototype.keyUp = function(e) {
    if (e.keyCode === 39) {
      return this.movement.left = false;
    } else if (e.keyCode === 37) {
      return this.movement.right = false;
    }
  };

  Background.prototype.tick = function() {
    if (this.movement.right) {
      return this.sprite.position.x += this.baseMovement / this.distance;
    } else if (this.movement.left) {
      return this.sprite.position.x -= this.baseMovement / this.distance;
    }
  };

  return Background;

})();
