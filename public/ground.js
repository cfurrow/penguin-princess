define(['pixi'], function(PIXI) {
  var Ground;
  return Ground = (function() {
    function Ground(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.width = canvasWidth;
      this.height = 50;
      this.texture = PIXI.Texture.fromImage('assets/images/snow.gif');
      this.sprite = new PIXI.TilingSprite(this.texture, this.width, this.height);
      this.sprite.position.x = 0;
      this.sprite.position.y = this.canvasHeight - this.height;
    }

    return Ground;

  })();
});
