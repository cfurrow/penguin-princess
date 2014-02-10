define ['app/background'], (Background) ->
  class BackgroundManager
    constructor: ->
      @backgrounds = []

    addBackground: (background) =>
      @backgrounds.push(background)  

    addBackgroundsFromData: (dataArray) =>
      @addBackground(@buildBackground(data)) for data in dataArray

    buildBackground: (options) =>
      # TODO: be able to parse 'max'
      bg = new Background(options)
      bg.sprite.position.x = options.x
      bg.sprite.position.y = options.y
      bg

    addBackgroundsToStage: (stage) =>
      stage.addChild(bg.sprite) for bg in @backgrounds

    addKeyUps: (interaction) =>
      interaction.addKeyUp(bg.keyUp) for bg in @backgrounds

    addKeyDowns: (interaction) =>
      interaction.addKeyDown(bg.keyDown) for bg in @backgrounds


    tick: (playerVelocity)=>
      bg.tick(playerVelocity) for bg in @backgrounds
