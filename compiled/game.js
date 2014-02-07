var Game,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Game = (function() {
  var HEIGHT, WIDTH;

  WIDTH = 800;

  HEIGHT = 600;

  function Game() {
    this.start = __bind(this.start, this);
    this.tick = __bind(this.tick, this);
    this.stage = new PIXI.Stage(0xffffff);
    this.scene = document.getElementById('scene');
    this.renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
    this.scene.appendChild(this.renderer.view);
    this.penguin = new Penguin();
    this.penguin.width(100);
    this.penguin.height(100);
    this.penguin.position(100, HEIGHT);
    this.stage.addChild(this.penguin.sprite);
  }

  Game.prototype.tick = function() {
    requestAnimFrame(this.tick);
    return this.renderer.render(this.stage);
  };

  Game.prototype.start = function() {
    return requestAnimFrame(this.tick);
  };

  return Game;

})();
