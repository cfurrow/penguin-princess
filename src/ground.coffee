define (require, exports, module) ->
  PIXI = require('pixi')

  class Ground
    constructor: (canvasWidth, canvasHeight)->
      @canvasWidth  = canvasWidth
      @canvasHeight = canvasHeight

      @width  = canvasWidth
      @height = 50 

      @texture = PIXI.Texture.fromImage('assets/images/snow.gif')
      @sprite  = new PIXI.TilingSprite(@texture, @width, @height)

      @sprite.position.x = 0
      @sprite.position.y = @canvasHeight - @height

  exports.Ground = Ground
