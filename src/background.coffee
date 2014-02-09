define (require, exports, module) ->
  PIXI = require('pixi')

  class Background
    constructor: (options) ->
      @distance = options.distance.toFixed(3)
      @texture  = PIXI.Texture.fromImage(options.texture)
      if options.repeat? && !options.repeat
        @sprite   = new PIXI.Sprite(@texture)
        @sprite.width = options.width
        @sprite.height = options.height
      else
        @sprite   = new PIXI.TilingSprite(@texture, options.width, options.height)
      @movement = { left: false, right: false }
      @sprite.anchor.y = 1.0

    keyDown: (e) =>
      if e.keyCode == 39 # right
        @movement.right = false
        @movement.left = true      
      else if e.keyCode == 37 # left
        @movement.left = false
        @movement.right = true
    
    tick: (playerVelocity) =>
      # -playerVelocity, so bg moves in opposite dir of playerVelocity
      @sprite.position.x += -playerVelocity.toFixed(3) / @distance

  exports.Background = Background
