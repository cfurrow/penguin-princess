class Game
  WIDTH  = 800
  HEIGHT = 600
  constructor: ->
    @stage    = new PIXI.Stage(0xffffff)
    @scene    = document.getElementById('scene')
    @renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT)
    @scene.appendChild(@renderer.view)

  tick: =>
    requestAnimFrame(@tick)
    @renderer.render(@stage)

  start: =>
    requestAnimFrame(@tick)
