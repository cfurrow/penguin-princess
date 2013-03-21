function Penguin(textures) {
  this.penguinTextures         = loadFrames();
  this.penguinSurpriseTextures = loadSurpriseFrames();
  var penguinStage            = new PIXI.Stage();

  PIXI.MovieClip.call(this,this.penguinTextures);

  this.animationSpeed  = 0.05;
  this.position.x =  150;
  this.position.y =  300;
  this.scale.x    =  0.35;
  this.scale.y    =  0.35;
  this.anchor.x   = 0.5;
  this.anchor.y   = 1;
  this.movement   = { up:false, down:false, left:false, right:false, waddleRight:false, surprise:false, stop:false };
  this.surpriseFramesLoaded = false;

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

  function loadSurpriseFrames()
  {
    var penguinTextures = [];
    var len             = 9;
    var i               = 0;
    var texture         = null;

    for(;i<len;i++){
      texture = PIXI.Texture.fromImage("images/surprise_frame_" + i + "_512x512.png");
      penguinTextures.push(texture);
    }

    return penguinTextures;
  }
}

Penguin.constructor = Penguin;
Penguin.prototype   = Object.create(PIXI.MovieClip.prototype);

Penguin.prototype.switchToSurpriseFrames = function(){
  this.textures = this.penguinSurpriseTextures;
  this.play();
}
Penguin.prototype.switchToNormalFrames  = function(){
  this.textures = this.penguinTextures;
  this.play();
}
Penguin.prototype.reset = function(){
  this.position.y = 300;
  this.scale.x = penguin.scale.y = 0.35;
  this.movement.surprise = false;
  this.movement.stop = false;
  this.switchToNormalFrames();
  this.surpriseFramesLoaded=false;
}
Penguin.prototype.getSurprised = function(){
    var center = 400;
    var movePerFrame = 5;
    if(this.position.x < (center - movePerFrame) && !this.movement.stop){
      this.movement.right = true;
      this.movement.left  = false;
    }
    if(this.position.x > (center + movePerFrame) && !this.movement.stop){
      this.movement.right = false;
      this.movement.left  = true;
    }
    if(this.position.x >= center - movePerFrame && this.position.x <= center + movePerFrame){
      this.movement.right = false;
      this.movement.left  = false;
      this.movement.stop  = true;
      // change frames
      if(!this.surpriseFramesLoaded){
        this.switchToSurpriseFrames();
        this.surpriseFramesLoaded = true;
        this.rotation = 0;
      }
      else{
        this.scale.x = this.scale.y = Math.abs(this.scale.x += 0.05);
        this.position.y += 15;
        if(this.scale.x >= 10){
          this.reset();
        }
      }
    }
}
