class Penguin extends AnimatedBase

  constructor: ->
    Mixin.include(Penguin, Keyboardable)
    Mixin.include(Penguin, PenguinMovementMethods)
    super

  initializeTexturePacks: () ->
    @addTexturePack("normal",   4, 'images/frame_#{i}_512x512.png',          true)
    @addTexturePack("surprise", 9, 'images/surprise_frame_#{i}_512x512.png', false)
    @texturePacks

root = exports ? this
root.Penguin = Penguin
