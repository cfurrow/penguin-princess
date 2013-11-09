class AnimatedBase extends PIXI.MovieClip

  constructor: (options={hitAreaVisible: false}) ->
    @texturePacks       = []
    @texturePackMapping = {}
    @activeTexturePack  = 'normal'

    @initializeTexturePacks()
    #@clip               = new PIXI.MovieClip(@getActiveTexturePack())
    super(@getActiveTexturePack())
    @gotoAndPlay(0)
    @hitArea             = new PIXI.Rectangle(0,0,0,0)        
    @hitAreaPrimitive    = new PIXI.Graphics()
    
    @hitAreaVisible         = if options.hitAreaVisible then true else false
    if(@hitAreaVisible)
      @showHitArea()

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

  showHitArea: () ->
    @hitAreaVisible = true
    @addChild(@hitAreaPrimitive)

  hideHitArea: () ->
    @hitAreaVisible = false
    @removeChild(@hitAreaPrimitive)
 
  beforeTick: (fps)->
    @_setupHitArea()

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
      @textures = textures
    @loop              = looping
    @gotoAndPlay(0)

  getActiveTexturePack: (name) ->
    @getTexturePack(@activeTexturePack)

  getTexturePack: (name) ->
    @texturePacks[ @texturePackMapping[name] ]
    
# private

  # FIXME: this could use some cleanup. less instance vars, etc. rename?
  _setupHitArea: () ->
    return if @_hitBoxSetup
    @hitAreaPrimitive.lineStyle(5, 0xFF0000);
    @hitAreaPrimitive.drawRect(0,0,@width,@width)
    @hitArea.x = -Math.abs(@width * @anchor.x)
    @hitArea.y = -Math.abs(@height * @anchor.y)
    @hitArea.width = @width
    @hitArea.height = @height

    @hitAreaPrimitive.position.x = @hitArea.x
    @hitAreaPrimitive.position.y = @hitArea.y
    @hitAreaPrimitive.width      = @hitArea.width
    @hitAreaPrimitive.height     = @hitArea.height
    
    @_setupCount  = 0 unless @_setupCount?
    @_setupCount++
    @_hitBoxSetup = true if @_setupCount > 10

  _buildTexture: (i, pattern) ->
    PIXI.Texture.fromImage(pattern) 

root = exports ? this
root.AnimatedBase = AnimatedBase
