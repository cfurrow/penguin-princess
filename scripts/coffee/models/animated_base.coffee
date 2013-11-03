class AnimatedBase extends PIXI.MovieClip

  constructor: () ->
    @texturePacks = []
    @texturePackMapping = {}
    @activeTexturePack  = 'normal'

    @initializeTexturePacks()
    @stage = new PIXI.Stage("",true)
  
    super @getActiveTexturePack()

  #override in base class 
  initializeTexturePacks: () ->
    throw "You must override initializeTexturePacks"

  #addTexturePack("normal", 4, "images/frame_#{i}_512x512.png", true)
  addTexturePack: (name, count, pattern, reverseLoop=false) ->
    textures = []
    textures.push(@_buildTexture(i, pattern)) for i in [0...count] by 1
    textures.push(@_buildTexture(i, pattern)) for i in [count-1...0] by 1 if reverseLoop
    @texturePacks.push textures
    @texturePackMapping[name] = @texturePacks.length - 1
    @texturePacks

  tick: ->
    # movement

  reset: ->
    throw "You must override reset"

  switchTexturePackTo: (name, looping) ->
    textures           = @getTexturePack(name)
    if textures?
      @activeTexturePack = name
      @textures          = textures
    @loop              = looping
    @play()

  getActiveTexturePack: (name) ->
    @getTexturePack(@activeTexturePack)

  getTexturePack: (name) ->
    @texturePacks[ @texturePackMapping[name] ]
    
  # private
  _buildTexture: (i, pattern) ->
    PIXI.Texture.fromImage(pattern) 

root = exports ? this
root.AnimatedBase = AnimatedBase
