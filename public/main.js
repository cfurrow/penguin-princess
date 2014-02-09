requirejs.config({
  baseUrl: 'lib',
  paths: {
    app: '../public',
    pixi: 'pixi.dev'
  }
});

requirejs(['app/game', 'pixi'], function(Game, PIXI) {
  var game;
  game = new Game();
  return window.game = game;
});
