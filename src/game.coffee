define (require, exports, module) ->
  Background        = require('app/background')
  BackgroundManager = require('app/background_manager')
  Interaction       = require('app/interaction')
  Penguin           = require('app/penguin')
  Ground            = require('app/ground')
  Level             = require('app/level')
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
      @interaction.addKeyUp(@penguin.keyUp)
      @interaction.addKeyDown(@penguin.keyDown)

      @level    = new Level 'worlds/01.json', ()=>
        @backgroundManager = new BackgroundManager()
        @backgroundManager.addBackgroundsFromData(@level.levelData.backgrounds)
        @backgroundManager.addBackgroundsToStage(@stage)

        @stage.addChild(@penguin.sprite)

        @start()

    tick: =>
      requestAnimFrame(@tick)
      @penguin.tick()
      @backgroundManager.tick(@penguin.velocity)
      @renderer.render(@stage)

    start: =>
      requestAnimFrame(@tick)

  exports.Game = Game
