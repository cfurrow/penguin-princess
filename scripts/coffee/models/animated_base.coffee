class AnimatedBase extends PIXI.MovieClip

  initialize: () ->
    initializeTexturePacks()

    super(@texturePacks[0])

  #override in base class 
  initializeTexturePacks: () ->
    throw "You must override initializeTexturePacks"

  #addTexturePack("normal", 4, "images/frame_#{i}_512x512.png", true)
  addTexturePack: (name, count, pattern, reverseLoop=false) ->
    textures = []
    textures.push(@_buildTexture(i, pattern)) for i in [0...count] by 1
    textures.push(@_buildTexture(i, pattern)) for i in [count-1...0] by 1 if reverseLoop
    @texturePacks.push textures

  # private
  _buildTexture: (i, pattern) ->
    PIXI.Texture.fromImage(pattern) 

root = exports ? this
root.AnimatedBase = AnimatedBase
