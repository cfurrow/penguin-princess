class Game
  WIDTH  = 800
  HEIGHT = 600
  constructor: ->
    @stage    = new PIXI.Stage(0xffffff)
    @scene    = document.getElementById('scene')

    @renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT)
    @scene.appendChild(@renderer.view)
    @interaction = new Interaction();

    @penguin = new Penguin()
    @penguin.width(100)
    @penguin.height(100)
    @penguin.position(100, HEIGHT)

    @interaction.addKeyUp(@penguin.keyUp)
    @interaction.addKeyDown(@penguin.keyDown)

    @stage.addChild(@penguin.sprite)

  tick: =>
    requestAnimFrame(@tick)
    @penguin.tick()
    @renderer.render(@stage)

  start: =>
    requestAnimFrame(@tick)
