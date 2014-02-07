var Penguin;

Penguin = (function() {
  function Penguin() {
    this.texture = PIXI.Texture.fromImage('assets/images/penguin.png');
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 1.0;
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

  return Penguin;

})();
