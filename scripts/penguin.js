function Penguin(textures) {
  var self = this;
  this.penguinTextures         = this.loadFrames();
  this.penguinSurpriseTextures = this.loadSurpriseFrames();
  var penguinStage             = new PIXI.Stage("",true);

  PIXI.MovieClip.call(this,this.penguinTextures);

  // pixi.js
  this._ANIMATION_SPEED = 0.05;
  this.animationSpeed = this._ANIMATION_SPEED; 
  this.position.x = 150;
  this.position.y = 300;
  this._SCALE     = 0.35
  this.scale.x    = this.scale.y = this._SCALE
  this.anchor.x   = 0.5;
  this.anchor.y   = 1;

  // custom
  this.fpsAdjustment        = 1;
  this._MOVEMENT_PER_FRAME  = 3;
  this.movePerFrame         = this._MOVEMENT_PER_FRAME;
  this._ROTATE_PER_FRAME    = 0.015;
  this.rotatePerFrame       = this._ROTATE_PER_FRAME;
  this.rotateMax            = 0.05;
  this.movement             = { up:false, down:false, left:false, right:false, waddleRight:false, surprise:false, stop:false };
  this.surpriseFramesLoaded = false;
  this.farting              = false;

  this.setInteractive(true);

  this.tap   = this.handleTouch;
  this.click = this.handleTouch;

  this.gotoAndPlay(0);
  penguinStage.addChild(this);

  this.loadFart();
  var konami      = new Konami();
  konami.code     = function(){ self.setSurprised() };
  konami.load();

  handleOrientation(function(){
    return self.detectLeftRightLeft;
  }(), self);

  SimpleEvents.listen('penguin.fart.end',function(){
    this.stage.removeChild(this.foof);
    this.foof = null;
  },this);
}

Penguin.constructor = Penguin;
Penguin.prototype   = Object.create(PIXI.MovieClip.prototype);

Penguin.prototype.loadFrames = function()
{
  var penguinTextures = [];
  var len             = 4;
  var i               = 0;
  var texture         = null;

  for(;i<len;i++){
    texture = PIXI.Texture.fromImage("images/frame_" + i + "_512x512.png");
    penguinTextures.push(texture);
  }
  for(i=len-1;i>=0;i--){
    texture = PIXI.Texture.fromImage("images/frame_" + i + "_512x512.png");
    penguinTextures.push(texture);
  }

  return penguinTextures;
};

Penguin.prototype.loadSurpriseFrames = function()
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
};

Penguin.prototype.handleTouch = function(touchdata){
  SimpleEvents.trigger('penguin.touched');
  this.fart();
};

Penguin.prototype.switchToSurpriseFrames = function(){
  this.textures = this.penguinSurpriseTextures;
  this.loop = false;
  this.gotoAndPlay(0);
};

Penguin.prototype.switchToNormalFrames  = function(){
  this.textures = this.penguinTextures;
  this.loop = true;
  this.play();
};

Penguin.prototype.reset = function(){
  this.position.y = 300;
  this.scale.x = penguin.scale.y = this._SCALE;
  this.movement.surprise = false;
  this.movement.stop = false;
  this.switchToNormalFrames();
  this.surpriseFramesLoaded=false;
}

Penguin.prototype.getSurprised = function(){
    SimpleEvents.trigger('penguin.surprised');
    var center = 400;
    var movePerFrame = this.movePerFrame + (2*this.fpsAdjustment);
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
        this.scale.x = this.scale.y = Math.abs(this.scale.x += (0.05*this.fpsAdjustment));
        this.position.y += 15*this.fpsAdjustment;
        if(this.scale.x >= 10){
          this.reset();
        }
      }
    }
};

Penguin.prototype.tick = function(fps){
  var direction = this.getDirection();
  this.fpsAdjustment  = 60/fps;
  this.animationSpeed = this._ANIMATION_SPEED * this.fpsAdjustment;
  this.movePerFrame   = this._MOVEMENT_PER_FRAME * this.fpsAdjustment;
  this.rotatePerFrame = this._ROTATE_PER_FRAME * this.fpsAdjustment;

  if(this.foof){
    this.foof.tick(this.getMinX()+(50*direction), this.position.y-40);
  }
  if(this.foof){
    if(direction>0){
      //this.foof.anchor.x = 0;
      this.foof.scale.x  = this.foof._SCALE;
    }
    else{
      //this.foof.anchor.x = 1.0;
      this.foof.scale.x  = -this.foof._SCALE; 
    }
  }
  

  if(this.movement.surprise){
    this.getSurprised();
  }
  if(this.movement.left){
    if(this.position.x >= 0){
      this.position.x -= this.movePerFrame;
    }
    this.scale.x     = -this._SCALE;
    
  }
  if(this.movement.right){
    if(this.position.x <= window.CANVASWIDTH){
      this.position.x += this.movePerFrame;
    }
    this.scale.x     = this._SCALE;
    
  }
  if(this.movement.left || this.movement.right){
    if(this.movement.waddleRight ){
      this.rotation += this.rotatePerFrame;
      if(this.rotation >= this.rotateMax){
        this.movement.waddleRight = false;
      }
    }
    else{
      this.rotation -= this.rotatePerFrame;
      if(this.rotation <= -this.rotateMax){
        this.movement.waddleRight = true;
      }
    }
  }
  if(this.farting){
    this.fart();
  }
};

Penguin.prototype.fart = function(){
  this.playFart();
  if(!this.foof){
    var direction = this.getDirection();
    // todo: abstract this
    this.foof = new Foof(this.getMinX()+(50*direction), this.position.y-40);
    self.stage.addChild(this.foof);
  } 
};

Penguin.prototype.onKeyUp = function(e){
  if(!penguin.movement.surprise){
    if(e.keyCode == 38){
      //up
      this.movement.up   = false;
    }
    if(e.keyCode == 40){
      //down
      this.movement.down = false;
    }
    if(e.keyCode == 37){

      //left
      this.movement.left  = false;
    }
    if(e.keyCode == 39){
      //right
      this.movement.right = false;
    }
    if(e.keyCode == 32){
      //space
      this.farting = false;
    }
  }
};

Penguin.prototype.onKeyDown = function(e){
  if(!this.movement.surprise){
    if(e.keyCode == 37){
      //left
      SimpleEvents.trigger('penguin.move.left',e);
      this.movement.left  = true;
      this.movement.right = false;
    }
    if(e.keyCode == 39){
      //right
      SimpleEvents.trigger('penguin.move.right',e);
      this.movement.left  = false;
      this.movement.right = true;
    }
    if(e.keyCode == 32){
      // space
      this.farting = true;
    }
  }
};

Penguin.prototype.onMouseDown = function(e,canvas){
  if((e.clientX - canvas.getBoundingClientRect().left) > this.position.x){
    SimpleEvents.trigger('penguin.move.right');
    this.movement.right = true;
    this.movement.left  = false;
  }
  else {
    SimpleEvents.trigger('penguin.move.left');
    this.movement.right = false;
    this.movement.left  = true;
  }
};

Penguin.prototype.onMouseUp = function(e){
  this.movement.right = false;
  this.movement.left  = false;
}

Penguin.prototype.setSurprised = function()
{
  this.movement.surprise = true;
}

Penguin.prototype.getMinX = function(){
  return this.position.x - (this.width * this.anchor.x);
};

Penguin.prototype.getMaxX = function(){
  return this.getMinX() + this.width;
};
Penguin.prototype.getDirection = function(){
  return this.scale.x > 0 ? 1 : -1;
};

Penguin.prototype.betweenMinXMaxX = function(obj){
  return (obj.position.x >= this.getMinX() && obj.position.x <= this.getMaxX());
}

Penguin.prototype.detectLeftRightLeft = function(tiltLR, tiltFB, dir, motUD){
  this.detectLeftRightLeft.leftCount  = this.detectLeftRightLeft.leftCount || 0;
  this.detectLeftRightLeft.rightCount = this.detectLeftRightLeft.rightCount || 0;
  this.detectLeftRightLeft.currentPattern = this.detectLeftRightLeft.currentPattern || "";

  var landscapeMode, portraitMode;

  landscapeMode = tiltLR < -80 || tiltLR > 80;
  portraitMode  = !landscapeMode;

  $("#tiltLR").html(tiltLR);
  $("#tiltFB").html(tiltFB);
  $("#dir").html(dir);
  $("#motUD").html(motUD);
  $("#currentPattern").html(this.detectLeftRightLeft.currentPattern)

  if(portraitMode){
    if(tiltLR >= 65){
      this.detectLeftRightLeft.currentPattern += "R";
    }
    else if(tiltLR <= -65){
      this.detectLeftRightLeft.currentPattern += "L";
    }
  } 
  else{
    if(tiltFB >= 25){
      this.detectLeftRightLeft.currentPattern += "R";
    }
    else if(tiltFB <= -25){
      this.detectLeftRightLeft.currentPattern += "L";
    }
  }
 
  if(/L+R+L+/.test(this.detectLeftRightLeft.currentPattern)){
    this.detectLeftRightLeft.currentPattern = "";
    this.setSurprised();
  }
}
