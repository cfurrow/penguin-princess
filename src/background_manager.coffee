class BackgroundManager
  constructor: ->
    @backgrounds = []

  addBackground: (background) =>
    @backgrounds.push(background)  

  addBackgroundsToStage: (stage) =>
    stage.addChild(bg.sprite) for bg in @backgrounds

  addKeyUps: (interaction) =>
    interaction.addKeyUp(bg.keyUp) for bg in @backgrounds

  addKeyDowns: (interaction) =>
    interaction.addKeyDown(bg.keyDown) for bg in @backgrounds

  tick: =>
    bg.tick() for bg in @backgrounds
