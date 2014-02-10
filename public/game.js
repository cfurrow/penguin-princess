var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app/background', 'app/background_manager', 'app/interaction', 'app/penguin', 'app/ground', 'app/level', 'pixi'], function(Background, BackgroundManager, Interaction, Penguin, Ground, Level, PIXI) {
  var Game;
  return Game = (function() {
    var HEIGHT, WIDTH;

    WIDTH = 800;

    HEIGHT = 600;

    function Game() {
      this.start = __bind(this.start, this);
      this.tick = __bind(this.tick, this);
      this.stage = new PIXI.Stage(0x97cfef);
      this.scene = document.getElementById('scene');
      this.renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
      this.scene.appendChild(this.renderer.view);
      this.interaction = new Interaction();
      this.penguin = new Penguin();
      this.penguin.width(75);
      this.penguin.height(75);
      this.penguin.position(WIDTH / 2, HEIGHT);
      this.interaction.addKeyUp(this.penguin.keyUp);
      this.interaction.addKeyDown(this.penguin.keyDown);
      this.level = new Level('worlds/01.json', (function(_this) {
        return function() {
          _this.backgroundManager = new BackgroundManager();
          _this.backgroundManager.addBackgroundsFromData(_this.level.levelData.backgrounds);
          _this.backgroundManager.addBackgroundsToStage(_this.stage);
          _this.stage.addChild(_this.penguin.sprite);
          return _this.start();
        };
      })(this));
    }

    Game.prototype.tick = function() {
      requestAnimFrame(this.tick);
      this.penguin.tick();
      this.backgroundManager.tick(this.penguin.velocity);
      return this.renderer.render(this.stage);
    };

    Game.prototype.start = function() {
      return requestAnimFrame(this.tick);
    };

    return Game;

  })();
});
