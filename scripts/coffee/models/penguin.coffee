class Penguin extends AnimatedBase
  @ANIMATION_SPEED    = 0.05
  @MOVEMENT_PER_FRAME = 3
  @ROTATE_PER_FRAME   = 0.025
  @ROTATE_MAX         = 0.08

  constructor: (options={hitAreaVisible:false, minScreenX:0, maxScreenX:800}) ->
    Mixin.include(Penguin, Keyboardable)
    Mixin.include(Penguin, PenguinMovementMethods)
    super(options)
    @width  = 79
    @height = 121

    # pixi.js
    @animationSpeed     = Penguin.ANIMATION_SPEED 
    @position.x         = 150
    @position.y         = 200 
    # @anchor.x           = 0.5
    # @anchor.y           = 1

    @pivot.x = @width/2
    @pivot.y = @height

    # custom
    @fpsAdjustment           = 1
    @minScreenX              = if options.minScreenX? then options.minScreenX else 0
    @maxScreenX              = if options.maxScreenX? then options.maxScreenX else 800

  initializeTexturePacks: () ->
    @addTexturePack("normal",   4, 'images/penguin/frame_#{i}_79x121.png',          true)
    @addTexturePack("surprise", 9, 'images/penguin/surprise_frame_#{i}_512x512.png', false)
    @texturePacks

  reset: () ->
    @position.x = 300
    @resetMovement()
    @switchTexturePackTo('normal', true)

  onTick: (fps) =>
    if(@movement.left)
      if(@position.x >= @minScreenX)
        @position.x -= Penguin.MOVEMENT_PER_FRAME
      @scale.x     = -Math.abs(@scale.x)
    
    if(@movement.right)
      if(@position.x <= @maxScreenX)
        @position.x += Penguin.MOVEMENT_PER_FRAME
      @scale.x     = Math.abs(@scale.x)
      
    if(@movement.left || @movement.right)
      if(@rotateRight)
        @rotation += Penguin.ROTATE_PER_FRAME
        @rotateRight = @rotation <= Penguin.ROTATE_MAX
      else
        @rotation -= Penguin.ROTATE_PER_FRAME
        @rotateRight = @rotation <= -Penguin.ROTATE_MAX 

root = exports ? this
root.Penguin = Penguin
