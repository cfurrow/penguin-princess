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
    this.interaction = new Interaction();
    this.penguin = new Penguin();
    this.penguin.width(100);
    this.penguin.height(100);
    this.penguin.position(100, HEIGHT);
    this.mountain = new Background('./assets/images/mountain-01.gif', 3, this.penguin.baseMovement);
    this.mountain.sprite.position.x = 0;
    this.mountain.sprite.position.y = HEIGHT;
    this.mountain2 = new Background('./assets/images/mountain-02.gif', 6, this.penguin.baseMovement);
    this.mountain2.sprite.position.x = 300;
    this.mountain2.sprite.position.y = HEIGHT;
    this.interaction.addKeyUp(this.penguin.keyUp);
    this.interaction.addKeyDown(this.penguin.keyDown);
    this.interaction.addKeyUp(this.mountain.keyUp);
    this.interaction.addKeyDown(this.mountain.keyDown);
    this.interaction.addKeyUp(this.mountain2.keyUp);
    this.interaction.addKeyDown(this.mountain2.keyDown);
    this.stage.addChild(this.mountain.sprite);
    this.stage.addChild(this.mountain2.sprite);
    this.stage.addChild(this.penguin.sprite);
  }

  Game.prototype.tick = function() {
    requestAnimFrame(this.tick);
    this.penguin.tick();
    this.mountain.tick();
    this.mountain2.tick();
    return this.renderer.render(this.stage);
  };

  Game.prototype.start = function() {
    return requestAnimFrame(this.tick);
  };

  return Game;

})();
