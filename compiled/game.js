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
    this.penguin.position(WIDTH / 2, HEIGHT);
    this.backgroundManager = new BackgroundManager();
    this.mountain = new Background('./assets/images/mountain-01.gif', 20, this.penguin.baseMovement, 3200, 342);
    this.mountain.sprite.position.x = -800;
    this.mountain.sprite.position.y = HEIGHT;
    this.mountain2 = new Background('./assets/images/mountain-02.gif', 30, this.penguin.baseMovement, 3200, 342);
    this.mountain2.sprite.position.x = -300;
    this.mountain2.sprite.position.y = HEIGHT;
    this.interaction.addKeyDown(this.penguin.keyDown);
    this.backgroundManager.addBackground(this.mountain);
    this.backgroundManager.addBackground(this.mountain2);
    this.backgroundManager.addKeyUps(this.interaction);
    this.backgroundManager.addKeyDowns(this.interaction);
    this.backgroundManager.addBackgroundsToStage(this.stage);
    this.stage.addChild(this.penguin.sprite);
  }

  Game.prototype.tick = function() {
    requestAnimFrame(this.tick);
    this.penguin.tick();
    this.backgroundManager.tick();
    return this.renderer.render(this.stage);
  };

  Game.prototype.start = function() {
    return requestAnimFrame(this.tick);
  };

  return Game;

})();
