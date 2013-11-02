(function() {
  var AnimatedBase, Base, Penguin, root, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AnimatedBase = (function(_super) {
    __extends(AnimatedBase, _super);

    function AnimatedBase() {
      _ref = AnimatedBase.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AnimatedBase.prototype.initialize = function() {
      initializeTexturePacks();
      return AnimatedBase.__super__.initialize.call(this, this.texturePacks[0]);
    };

    AnimatedBase.prototype.initializeTexturePacks = function() {
      throw "You must override initializeTexturePacks";
    };

    AnimatedBase.prototype.addTexturePack = function(name, count, pattern, reverseLoop) {
      var i, textures, _i, _j, _ref1;
      if (reverseLoop == null) {
        reverseLoop = false;
      }
      textures = [];
      for (i = _i = 0; _i < count; i = _i += 1) {
        textures.push(this._buildTexture(i, pattern));
      }
      if (reverseLoop) {
        for (i = _j = _ref1 = count - 1; _j < 0; i = _j += 1) {
          textures.push(this._buildTexture(i, pattern));
        }
      }
      return this.texturePacks.push(textures);
    };

    AnimatedBase.prototype._buildTexture = function(i, pattern) {
      return PIXI.Texture.fromImage(pattern);
    };

    return AnimatedBase;

  })(PIXI.MovieClip);

  Base = (function() {
    function Base() {}

    Base.prototype.initialize = function() {
      this.stage = new PIXI.Stage("", true);
      return this.texture = null;
    };

    return Base;

  })();

  Penguin = (function(_super) {
    __extends(Penguin, _super);

    function Penguin() {
      _ref1 = Penguin.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Penguin.prototype.initializeTexturePacks = function() {
      this.addTexturePack("normal", 4, "images/frame_" + i + "_512x512.png", true);
      this.addTexturePack("surprise", 9, "images/surprise_frame_" + i + "_512x512.png", false);
      return this.texturePacks;
    };

    return Penguin;

  })(AnimatedBase);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Penguin = Penguin;

}).call(this);

/*
//@ sourceMappingURL=all.js.map
*/