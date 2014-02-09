var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function(require, exports, module) {
  var Background, BackgroundManager, Game, Ground, Interaction, Level, PIXI, Penguin;
  Background = require('app/background');
  BackgroundManager = require('app/background_manager');
  Interaction = require('app/interaction');
  Penguin = require('app/penguin');
  Ground = require('app/ground');
  Level = require('app/level');
  PIXI = require('pixi');
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
      this.interaction.addKeyUp(this.penguin.keyUp);
      this.interaction.addKeyDown(this.penguin.keyDown);
      this.level = new Level('/worlds/01.json', (function(_this) {
        return function() {
          _this.backgroundManager = new BackgroundManager();
          _this.backgroundManager.addBackgroundsFromData(_this.level.levelData.backgrounds);
          _this.backgroundManager.addBackgroundsToStage(_this.stage);
          _this.ground = new Ground(WIDTH, HEIGHT);
          _this.stage.addChild(_this.ground.sprite);
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
  return exports.Game = Game;
});
