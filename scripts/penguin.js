function Penguin(textures) {
  this.penguinTextures         = this.loadFrames();
  this.penguinSurpriseTextures = this.loadSurpriseFrames();
  var penguinStage             = new PIXI.Stage("",true);

  PIXI.MovieClip.call(this,this.penguinTextures);

  // pixi.js
  this.animationSpeed  = 0.05;
  this.position.x =  150;
  this.position.y =  300;
  this.scale.x    =  0.35;
  this.scale.y    =  0.35;
  this.anchor.x   = 0.5;
  this.anchor.y   = 1;

  // custom
  this.movePerFrame   = 3;
  this.rotatePerFrame = 0.015;
  this.rotateMax      = 0.05;
  this.movement   = { up:false, down:false, left:false, right:false, waddleRight:false, surprise:false, stop:false };
  this.surpriseFramesLoaded = false;
  this.farting    = false;

  this.setInteractive(true);

  this.tap   = this.handleTouch;
  this.click = this.handleTouch;

  this.gotoAndPlay(0);
  penguinStage.addChild(this);

  this.loadFart();
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
  for(i=3;i>=0;i--){
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
  this.playFart();
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
  this.scale.x = penguin.scale.y = 0.35;
  this.movement.surprise = false;
  this.movement.stop = false;
  this.switchToNormalFrames();
  this.surpriseFramesLoaded=false;
}
Penguin.prototype.getSurprised = function(){
    SimpleEvents.trigger('penguin.surprised');
    var center = 400;
    var movePerFrame = this.movePerFrame + 2;
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
};

Penguin.prototype.tick = function(){
  if(this.movement.surprise){
    this.getSurprised();
  }
  if(this.movement.left){
    this.position.x -= this.movePerFrame;
    this.scale.x     = -0.35;
  }
  if(this.movement.right){
    this.position.x += this.movePerFrame;
    this.scale.x     = 0.35;
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
