requirejs.config({
    shim: {
      'promise-0.1.1.min': {       
        exports: 'Promise'
      },
    },

    baseUrl: 'lib',

    paths: {
      app: '../public',
      pixi: 'pixi.dev',
      promise: 'promise-0.1.1.min'
    }
});

requirejs ['app/game','pixi', 'promise'], (Game, PIXI) ->
  game = new Game()
  window.game = game
  
