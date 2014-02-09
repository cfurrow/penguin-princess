requirejs.config({
    baseUrl: 'lib',

    paths: {
      app: '../public'
    }
});

requirejs ['app/game','pixi.dev'], (Game, PIXI) ->
  game = new Game()
  game.start()
