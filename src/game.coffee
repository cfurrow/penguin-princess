define (require, exports, module) ->
    Background        = require('app/background')
    BackgroundManager = require('app/background_manager')
    Interaction       = require('app/interaction')
    Penguin           = require('app/penguin')
    Ground            = require('app/ground')
    PIXI              = require('pixi')

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
        @penguin.position(WIDTH/2, HEIGHT)

        @backgroundManager = new BackgroundManager()

        @mountain = new Background('./assets/images/mountain-01.gif', 20, @penguin.baseMovement, 3200, 342)
        @mountain.sprite.position.x = -800
        @mountain.sprite.position.y = HEIGHT

        @mountain2 = new Background('./assets/images/mountain-02.gif', 30, @penguin.baseMovement, 3200, 342)
        @mountain2.sprite.position.x = -300
        @mountain2.sprite.position.y = HEIGHT

        @interaction.addKeyDown(@penguin.keyDown)

        @backgroundManager.addBackground(@mountain)
        @backgroundManager.addBackground(@mountain2)
        @backgroundManager.addKeyUps(@interaction)
        @backgroundManager.addKeyDowns(@interaction)

        @ground = new Ground(WIDTH, HEIGHT)

        @backgroundManager.addBackgroundsToStage(@stage)
        @stage.addChild(@ground.sprite)
        @stage.addChild(@penguin.sprite)

      tick: =>
        requestAnimFrame(@tick)
        @penguin.tick()
        @backgroundManager.tick()
        @renderer.render(@stage)

      start: =>
        requestAnimFrame(@tick)

    exports.Game = Game
