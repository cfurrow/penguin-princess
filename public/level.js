var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  var Level;
  return Level = (function() {
    function Level(path, loaded) {
      this.load = __bind(this.load, this);
      this.path = path;
      this.levelData = {};
      this.onLoadComplete = loaded;
      this.load();
    }

    Level.prototype.load = function() {
      var request;
      request = new XMLHttpRequest;
      request.open('GET', this.path, true);
      request.onload = (function(_this) {
        return function() {
          if (request.status >= 200 && request.status < 400) {
            _this.levelData = JSON.parse(request.responseText);
            return _this.onLoadComplete();
          } else {

          }
        };
      })(this);
      request.onerror = (function(_this) {
        return function() {};
      })(this);
      return request.send();
    };

    return Level;

  })();
});
