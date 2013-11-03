class Penguin extends AnimatedBase
  @ANIMATION_SPEED  = 0.05
  @SCALE            = 0.35
  @MOVEMENT_PER_FRAME = 3
  @ROTATE_PER_FRAME = 0.015

  constructor: ->
    Mixin.include(Penguin, Keyboardable)
    Mixin.include(Penguin, PenguinMovementMethods)
    super()
    # pixi.js

    @animationSpeed     = Penguin._ANIMATION_SPEED; 
    @position.x         = 150
    @position.y         = 300 
    @scale.x            = @scale.y = Penguin.SCALE
    # @anchor.x           = 0.5
    # @anchor.y           = 1

    # custom
    @fpsAdjustment          = 1
    @movePerFrame           = Penguin._MOVEMENT_PER_FRAME
    @rotatePerFrame         = Penguin._ROTATE_PER_FRAME
    @rotateMax              = 0.05
    @surpriseFramesLoaded   = false
    @farting                = false

    @setInteractive(true)

    @tap   = @handleTouch
    @click = @handleTouch

    @gotoAndPlay(0)
    #@stage.addChild(@)

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

  initializeTexturePacks: () ->
    @addTexturePack("normal",   4, 'images/frame_#{i}_512x512.png',          true)
    @addTexturePack("surprise", 9, 'images/surprise_frame_#{i}_512x512.png', false)
    @texturePacks

  reset: () ->
    @position.x = 300
    @scale.x = @scale.y = Penguin.SCALE
    @resetMovement()
    @switchTexturePackTo('normal', true)

root = exports ? this
root.Penguin = Penguin
