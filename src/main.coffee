requirejs.config({
    baseUrl: 'lib',

    paths: {
      app: '../public',
      pixi: 'pixi.dev'
    }
});

requirejs ['app/game','pixi'], (Game, PIXI) ->
  game = new Game()
  game.start()
