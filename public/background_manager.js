var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app/background'], function(Background) {
  var BackgroundManager;
  return BackgroundManager = (function() {
    function BackgroundManager() {
      this.tick = __bind(this.tick, this);
      this.addKeyDowns = __bind(this.addKeyDowns, this);
      this.addKeyUps = __bind(this.addKeyUps, this);
      this.addBackgroundsToStage = __bind(this.addBackgroundsToStage, this);
      this.buildBackground = __bind(this.buildBackground, this);
      this.addBackgroundsFromData = __bind(this.addBackgroundsFromData, this);
      this.addBackground = __bind(this.addBackground, this);
      this.backgrounds = [];
    }

    BackgroundManager.prototype.addBackground = function(background) {
      return this.backgrounds.push(background);
    };

    BackgroundManager.prototype.addBackgroundsFromData = function(dataArray) {
      var data, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = dataArray.length; _i < _len; _i++) {
        data = dataArray[_i];
        _results.push(this.addBackground(this.buildBackground(data)));
      }
      return _results;
    };

    BackgroundManager.prototype.buildBackground = function(options) {
      var bg;
      bg = new Background(options);
      bg.sprite.position.x = options.x;
      bg.sprite.position.y = options.y;
      return bg;
    };

    BackgroundManager.prototype.addBackgroundsToStage = function(stage) {
      var bg, _i, _len, _ref, _results;
      _ref = this.backgrounds;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bg = _ref[_i];
        _results.push(stage.addChild(bg.sprite));
      }
      return _results;
    };

    BackgroundManager.prototype.addKeyUps = function(interaction) {
      var bg, _i, _len, _ref, _results;
      _ref = this.backgrounds;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bg = _ref[_i];
        _results.push(interaction.addKeyUp(bg.keyUp));
      }
      return _results;
    };

    BackgroundManager.prototype.addKeyDowns = function(interaction) {
      var bg, _i, _len, _ref, _results;
      _ref = this.backgrounds;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bg = _ref[_i];
        _results.push(interaction.addKeyDown(bg.keyDown));
      }
      return _results;
    };

    BackgroundManager.prototype.tick = function(playerVelocity) {
      var bg, _i, _len, _ref, _results;
      _ref = this.backgrounds;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bg = _ref[_i];
        _results.push(bg.tick(playerVelocity));
      }
      return _results;
    };

    return BackgroundManager;

  })();
});
