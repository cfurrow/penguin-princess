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

    @mountain = new Background('./assets/images/mountain-01.gif', 3, @penguin.baseMovement)
    @mountain.sprite.position.x = 0
    @mountain.sprite.position.y = HEIGHT

    @mountain2 = new Background('./assets/images/mountain-02.gif', 6, @penguin.baseMovement)
    @mountain2.sprite.position.x = 300
    @mountain2.sprite.position.y = HEIGHT

    @interaction.addKeyUp(@penguin.keyUp)
    @interaction.addKeyDown(@penguin.keyDown)

    @interaction.addKeyUp(@mountain.keyUp)
    @interaction.addKeyDown(@mountain.keyDown)
    @interaction.addKeyUp(@mountain2.keyUp)
    @interaction.addKeyDown(@mountain2.keyDown)

    @stage.addChild(@mountain.sprite)
    @stage.addChild(@mountain2.sprite)
    @stage.addChild(@penguin.sprite)

  tick: =>
    requestAnimFrame(@tick)
    @penguin.tick()
    @mountain.tick()
    @mountain2.tick()
    @renderer.render(@stage)

  start: =>
    requestAnimFrame(@tick)
