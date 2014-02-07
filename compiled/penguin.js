var Penguin,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Penguin = (function() {
  function Penguin() {
    this.tick = __bind(this.tick, this);
    this.keyDown = __bind(this.keyDown, this);
    this.keyUp = __bind(this.keyUp, this);
    this.texture = PIXI.Texture.fromImage('assets/images/penguin.png');
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 1.0;
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
      return this.movement.right = false;
    } else if (e.keyCode === 37) {
      return this.movement.left = false;
    }
  };

  Penguin.prototype.keyDown = function(e) {
    if (e.keyCode === 39) {
      this.movement.right = true;
      return this.movement.left = false;
    } else if (e.keyCode === 37) {
      this.movement.left = true;
      return this.movement.right = false;
    }
  };

  Penguin.prototype.tick = function() {
    if (this.movement.right) {
      return this.sprite.position.x += 5;
    } else if (this.movement.left) {
      return this.sprite.position.x -= 5;
    }
  };

  return Penguin;

})();
