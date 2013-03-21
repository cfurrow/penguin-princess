function Penguin(textures) {
  var penguinTextures = loadFrames();
  var penguinStage    = new PIXI.Stage();

  PIXI.MovieClip.call(this,penguinTextures);

  this.animationSpeed  = 0.05;
  this.position.x =  150;
  this.position.y =  300;
  this.scale.x    =  0.35;
  this.scale.y    =  0.35;
  this.anchor.x   = 0.5;
  this.anchor.y   = 1;
  this.movement   = { up:false, down:false, left:false, right:false, waddleRight:false };

  this.gotoAndPlay(0);
  penguinStage.addChild(this);

  function loadFrames()
  {
    var penguinTextures = [];
    var len             = 4;
    var i               = 0;
    var texture         = null;

    for(;i<len;i++){
      texture = PIXI.Texture.fromImage("images/frame_" + i + "_512x512.png");
      penguinTextures.push(texture);
    }
    for(i=3;i>=0;i--){
      texture = PIXI.Texture.fromImage("images/frame_" + i + "_512x512.png");
      penguinTextures.push(texture);
    }

    return penguinTextures;
  }
}

Penguin.prototype   = Object.create(PIXI.MovieClip.prototype);
