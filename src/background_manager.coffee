define (require, exports, module) ->
  Background = require('app/background')

  class BackgroundManager
    constructor: ->
      @backgrounds = []

    addBackground: (background) =>
      @backgrounds.push(background)  

    addBackgroundsFromData: (dataArray) =>
      @addBackground(@buildBackground(data)) for data in dataArray

    buildBackground: (data) =>
      # TODO: refactor constructor to take data
      # TODO: be able to parse 'max'
      bg = new Background(data.texture, data.distance, data.width, data.height)
      bg.sprite.position.x = data.x
      bg.sprite.position.y = data.y
      bg

  addBackgroundsToStage: (stage) =>
    stage.addChild(bg.sprite) for bg in @backgrounds

  addKeyUps: (interaction) =>
    interaction.addKeyUp(bg.keyUp) for bg in @backgrounds

  addKeyDowns: (interaction) =>
    interaction.addKeyDown(bg.keyDown) for bg in @backgrounds


  tick: (playVelocity)=>
    bg.tick(playVelocity) for bg in @backgrounds

  exports.BackgroundManager = BackgroundManager
