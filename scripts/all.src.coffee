class AnimatedBase extends PIXI.MovieClip

  initialize: () ->
    initializeTexturePacks

    super(@texturePacks[0])

  #override in base class 
  initializeTexturePacks: () ->
    throw "You must override initializeTexturePacks"

  getTexturePacks: ->
    @texturePacks

  #addTexturePack("normal", 4, "images/frame_#{i}_512x512.png", true)
  addTexturePack: (name, count, pattern, reverseLoop=false) ->
    textures = []
    textures.push(@_buildTexture(i, pattern)) for i in [0...count] by 1
    textures.push(@_buildTexture(i, pattern)) for i in [count-1...0] by 1 if reverseLoop
    textures

  # private
  _buildTexture: (i, pattern) ->
    PIXI.Texture.fromImage(pattern) 

class Base
  
  initialize: () ->
    @stage    = new PIXI.Stage("",true)
    @texture  = null

class Penguin extends AnimatedBase

  initializeTexturePacks: () ->
    @addTexturePack("normal", 4, "images/frame_#{i}_512x512.png", true)
    @addTexturePack("surprise",9,"images/surprise_frame_#{i}_512x512.png", false)
    @texturePacks

root = exports ? this
root.Penguin = Penguin
