class AnimatedBase 

  constructor: (options) ->
    @texturePacks       = []
    @texturePackMapping = {}
    @activeTexturePack  = 'normal'

    @initializeTexturePacks()
    @clip               = new PIXI.MovieClip(@getActiveTexturePack())
    @hitBox             = new PIXI.Rectangle(0,0,0,0)        
    @visibleBoundingBox = new PIXI.Graphics()
    
    @showBoundingBox         = if options.showBoundingBox? then true else false
    if(@showBoundingBox)
      @visibleBoundingBox.lineStyle(5, 0xFF0000);
      @visibleBoundingBox.drawRect(0,0,180,180)
      @clip.addChild(@visibleBoundingBox)

  #override in base class 
  initializeTexturePacks: () ->
    throw "You must override initializeTexturePacks"

  #addTexturePack("normal", 4, "images/frame_#{i}_512x512.png", true)
  addTexturePack: (name, count, pattern, reverseLoop = false) ->
    textures = []
    path = (i) -> pattern.replace("#\{i\}",i)
    textures.push(@_buildTexture(i, path(i))) for i in [0...count] by 1
    textures.push(@_buildTexture(i, path(i))) for i in [count-1..0] by -1 if reverseLoop
    @texturePacks.push textures
    @texturePackMapping[name] = @texturePacks.length - 1
    @texturePacks

 
  beforeTick: (fps)->
    @_setupHitBox()

  onTick: (fps)->

  afterTick: (fps)->

  tick: (fps) ->
    @beforeTick(fps)
    @onTick(fps)
    @afterTick(fps)

  reset: ->
    throw "You must override reset"

  switchTexturePackTo: (name, looping=true) ->
    textures           = @getTexturePack(name)
    if textures?
      @activeTexturePack = name
      @clip.textures = textures
    @clip.loop              = looping
    @clip.gotoAndPlay(0)

  getActiveTexturePack: (name) ->
    @getTexturePack(@activeTexturePack)

  getTexturePack: (name) ->
    @texturePacks[ @texturePackMapping[name] ]
    
  # private
  _setupHitBox: () ->
    return if @_hitBoxSetup
    @hitBox.x = -Math.abs(@clip.width * @clip.anchor.x)
    @hitBox.y = -Math.abs(@clip.height * @clip.anchor.y)
    @hitBox.width = @clip.width
    @hitBox.height = @clip.height

    @visibleBoundingBox.position.x = @hitBox.x
    @visibleBoundingBox.position.y = @hitBox.y
    @visibleBoundingBox.width      = @hitBox.width
    @visibleBoundingBox.height     = @hitBox.height
    
    @_setupCount  = 0 unless @_setupCount?
    @_setupCount++
    @_hitBoxSetup = true if @_setupCount > 10

  _buildTexture: (i, pattern) ->
    PIXI.Texture.fromImage(pattern) 

root = exports ? this
root.AnimatedBase = AnimatedBase
