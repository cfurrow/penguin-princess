var BackgroundManager,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

BackgroundManager = (function() {
  function BackgroundManager() {
    this.tick = __bind(this.tick, this);
    this.addKeyDowns = __bind(this.addKeyDowns, this);
    this.addKeyUps = __bind(this.addKeyUps, this);
    this.addBackgroundsToStage = __bind(this.addBackgroundsToStage, this);
    this.addBackground = __bind(this.addBackground, this);
    this.backgrounds = [];
  }

  BackgroundManager.prototype.addBackground = function(background) {
    return this.backgrounds.push(background);
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

  BackgroundManager.prototype.tick = function() {
    var bg, _i, _len, _ref, _results;
    _ref = this.backgrounds;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      bg = _ref[_i];
      _results.push(bg.tick());
    }
    return _results;
  };

  return BackgroundManager;

})();
