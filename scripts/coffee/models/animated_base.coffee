class AnimatedBase #extends PIXI.MovieClip
  constructor: () ->
    @texturePacks       = []
    @texturePackMapping = {}
    @activeTexturePack  = 'normal'

    @initializeTexturePacks()
    @clip               = new PIXI.MovieClip(@getActiveTexturePack())

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

  tick: ->
    # movement

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
  _buildTexture: (i, pattern) ->
    PIXI.Texture.fromImage(pattern) 

root = exports ? this
root.AnimatedBase = AnimatedBase
