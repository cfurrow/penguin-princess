define ['app/background', 'app/background_manager', 'app/interaction', 'app/penguin', 'app/ground', 'app/level', 'pixi'], 
  (Background, BackgroundManager, Interaction, Penguin, Ground, Level, PIXI) ->
    class Game
      WIDTH  = 800
      HEIGHT = 600
      constructor: ->
        @stage    = new PIXI.Stage(0x97cfef)
        @scene    = document.getElementById('scene')

        @renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT)
        @scene.appendChild(@renderer.view)
        @interaction = new Interaction();

        @penguin = new Penguin()
        @penguin.width(75)
        @penguin.height(75)
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
