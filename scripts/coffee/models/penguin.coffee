class Penguin extends AnimatedBase
  @ANIMATION_SPEED    = 0.05
  @SCALE              = 0.35
  @MOVEMENT_PER_FRAME = 3
  @ROTATE_PER_FRAME   = 0.015
  @ROTATE_MAX         = 0.05

  constructor: ->
    Mixin.include(Penguin, Keyboardable)
    Mixin.include(Penguin, PenguinMovementMethods)
    super()
    # pixi.js

    @animationSpeed     = Penguin._ANIMATION_SPEED 
    @position.x         = 150
    @position.y         = 300 
    @scale.x            = @scale.y = Penguin.SCALE
    @anchor.x           = 0.5
    @anchor.y           = 1

    # custom
    @fpsAdjustment          = 1
    @surpriseFramesLoaded   = false
    @farting                = false

    #@setInteractive(true)

    # @tap   = @handleTouch
    # @click = @handleTouch

    

    #@loadFart()
    
    # konami          = new Konami()
    # konami.code     = () => @setSurprised()
    # konami.load()

    # handleOrientation(function(){
    #   return self.detectLeftRightLeft;
    # }(), self);

    # SimpleEvents.listen('penguin.fart.end',function(){
    #   this.stage.removeChild(this.foof);
    #   this.foof = null;
    # },this);
    
    @gotoAndPlay(0)

  initializeTexturePacks: () ->
    @addTexturePack("normal",   4, 'images/frame_#{i}_512x512.png',          true)
    @addTexturePack("surprise", 9, 'images/surprise_frame_#{i}_512x512.png', false)
    @texturePacks

  reset: () ->
    @position.x = 300
    @scale.x = @scale.y = Penguin.SCALE
    @resetMovement()
    @switchTexturePackTo('normal', true)

  tick: () =>
    if(@movement.left)
      if(@position.x >= 0)
        @position.x -= Penguin.MOVEMENT_PER_FRAME
      @scale.x     = -Penguin.SCALE
    
    if(@movement.right)
      #if(@position.x <= window.CANVASWIDTH){
      @position.x += Penguin.MOVEMENT_PER_FRAME
      #}
      @scale.x     = Penguin.SCALE
      
    if(@movement.left || @movement.right)
      if(@movement.waddleRight)
        @rotation += Penguin.ROTATE_PER_FRAME
        if(@rotation >= Penguin.ROTATE_MAX)
          @movement.waddleRight = false            
      else
        @rotation -= Penguin.ROTATE_PER_FRAME
        if(@rotation <= -Penguin.ROTATE_MAX)
          @movement.waddleRight = true
    

root = exports ? this
root.Penguin = Penguin
