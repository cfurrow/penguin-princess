class Penguin extends AnimatedBase
  @ANIMATION_SPEED    = 0.05
  @SCALE              = 0.35
  @MOVEMENT_PER_FRAME = 3
  @ROTATE_PER_FRAME   = 0.015
  @ROTATE_MAX         = 0.06

  constructor: (options) ->
    Mixin.include(Penguin, Keyboardable)
    Mixin.include(Penguin, PenguinMovementMethods)
    super()

    # pixi.js
    @clip.animationSpeed     = Penguin.ANIMATION_SPEED 
    @clip.position.x         = 150
    @clip.position.y         = 300 
    @clip.scale.x            = @clip.scale.y = Penguin.SCALE
    @clip.anchor.x           = 0.5
    @clip.anchor.y           = 1

    # custom
    @fpsAdjustment           = 1
    @minScreenX              = if options.minScreenX? then options.minScreenX else 0
    @maxScreenX              = if options.maxScreenX? then options.maxScreenX else 800

    
    @clip.gotoAndPlay(0)

  initializeTexturePacks: () ->
    @addTexturePack("normal",   4, 'images/frame_#{i}_512x512.png',          true)
    @addTexturePack("surprise", 9, 'images/surprise_frame_#{i}_512x512.png', false)
    @texturePacks

  reset: () ->
    @clip.position.x = 300
    @clip.scale.x = @clip.scale.y = Penguin.SCALE
    @resetMovement()
    @switchTexturePackTo('normal', true)

  tick: () =>
    if(@movement.left)
      if(@clip.position.x >= @minScreenX)
        @clip.position.x -= Penguin.MOVEMENT_PER_FRAME
      @clip.scale.x     = -Penguin.SCALE
    
    if(@movement.right)
      if(@clip.position.x <= @maxScreenX)
        @clip.position.x += Penguin.MOVEMENT_PER_FRAME
      @clip.scale.x     = Penguin.SCALE
      
    if(@movement.left || @movement.right)
      if(@rotateRight)
        @clip.rotation += Penguin.ROTATE_PER_FRAME
        @rotateRight = @clip.rotation <= Penguin.ROTATE_MAX
      else
        @clip.rotation -= Penguin.ROTATE_PER_FRAME
        @rotateRight = @clip.rotation <= -Penguin.ROTATE_MAX 

root = exports ? this
root.Penguin = Penguin
