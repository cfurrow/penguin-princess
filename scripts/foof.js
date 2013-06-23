function Foof(x,y){
  this.foofTextures         = this.loadFrames();
  PIXI.MovieClip.call(this,this.foofTextures);
  var foofStage             = new PIXI.Stage("",true);

  this.position.x = x;
  this.position.y = y;
  this.anchor.x   = 1;
  this.anchor.y   = 0.5;
  this._ANIMATION_SPEED = 0.07;
  this.animationSpeed  = this._ANIMATION_SPEED;
  this._SCALE     = 0.6
  this.scale.x    = this.scale.y = this._SCALE

  this.gotoAndPlay(0);
  foofStage.addChild(this);
}
Foof.constructor = Foof;
Foof.prototype   = Object.create(PIXI.MovieClip.prototype);

Foof.prototype.loadFrames = function()
{
  var foofTextures    = [];
  var len             = 11;
  var i               = 0;
  var texture         = null;

  for(;i<len;i++){
    texture = PIXI.Texture.fromImage("images/foof_frame_" + i + "_128x128.png");
    foofTextures.push(texture);
  }

  return foofTextures;
};

Foof.prototype.tick = function(x,y){
  this.position.x = x;
  this.position.y = y;
}
