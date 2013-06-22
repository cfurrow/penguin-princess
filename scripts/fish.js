function Fish(x,y){
  this.fishTextures         = this.loadFrames();
  var fishStage             = new PIXI.Stage("",true);

  PIXI.MovieClip.call(this,this.fishTextures);

  // pixi.js
  this.position.x = x || getRandomInt(0,window.CANVASWIDTH);
  this.position.y = y || 370;
  this.anchor.x   = 0.5;
  this.anchor.y   = 0.5;
  this.animationSpeed  = 0.07;
  this.scale.x    =  0.6;
  this.scale.y    =  0.6;

  // custom
  this.movement         = { left: false, right: false, falling: false, jumping: false };
  this.defaultY         = this.position.y;
  this.fallingPerTick   = 10;
  this.jumpingPerTick   = 10;
  this.rotationAngle    = 70;

  this._resetMovementPerFrame();

  if(100*Math.random() < 50){
    this.movement.left = true;
  }
  else{
    this.movement.right = true;
  }

  this.gotoAndPlay(5*Math.random());
  fishStage.addChild(this);

  SimpleEvents.listen('penguin.fart',this.handlePenguinFart,this);

}
Fish.MIN_Y            = 50;

Fish.constructor = Fish;
Fish.prototype   = Object.create(PIXI.MovieClip.prototype);

Fish.prototype.loadFrames = function()
{
  var fishTextures = [];
  var len             = 3;
  var i               = 0;
  var texture         = null;

  for(;i<len;i++){
    texture = PIXI.Texture.fromImage("images/fish_frame_" + i + "_128x128.png");
    fishTextures.push(texture);
  }
  for(i=2;i>=0;i--){
    texture = PIXI.Texture.fromImage("images/fish_frame_" + i + "_128x128.png");
    fishTextures.push(texture);
  }

  return fishTextures;
};

Fish.prototype.tick = function(){
  this.tick.count = this.tick.count || 0;
  this.tick.lastChangeTick = this.tick.lastChangeTick || 0;
  this.tick.shouldSwitchDirection = (getRandomInt(0,100) <= 1) && (this.tick.count - this.tick.lastChangeTick > getRandomInt(200,500));
  
  if(this.tick.shouldSwitchDirection){
    this.tick.lastChangeTick = this.tick.count;
    this._resetMovementPerFrame();
    if(this.movement.right){
      this.movement.right = false;
      this.movement.left = true;
    }
    else{
      this.movement.right = true;
      this.movement.left = false; 
    }
  }

  if(this.movement.right){
    this.position.x += this.movementPerFrame;
    this.scale.x     = -Math.abs(this.scale.x)
  }
  if(this.movement.left){
    this.position.x -= this.movementPerFrame;
    this.scale.x     = Math.abs(this.scale.x);
  }

  if(this.position.x < 0){
    this.movement.left = false;
    this.movement.right = true;
  }
  if(this.position.x > window.CANVASWIDTH){
    this.movement.left = true;
    this.movement.right = false;
  }

  if(this.movement.jumping){
    if(this.position.y <= getRandomInt(Fish.MIN_Y, Fish.MIN_Y+50) ){
      this.movement.jumping = false;
      this.movement.falling = true;
      return;
    }
    else{
      this.position.y -= this.jumpingPerTick;  
    }

    if(this.movement.right){
      this.rotation = -Math.abs(this.rotationAngle);
    }
    else{
      this.rotation = Math.abs(this.rotationAngle);
    }
    
  }
  if(this.movement.falling){
    if(this.position.y >= this.defaultY){
      this.movement.jumping = false;
      this.movement.falling = false;
      this.rotation = 0;
      this.position.y = this.defaultY;
      return;
    }
    else{
      this.position.y += this.fallingPerTick;  
    }

    if(this.movement.right){
      this.rotation = Math.abs(this.rotationAngle);
    }
    else{
      this.rotation = -Math.abs(this.rotationAngle);
    }
  }
  this.tick.count++;
};

Fish.prototype.handlePenguinFart = function(penguin){
  var weight = Math.random() * 100;
  if(penguin.betweenMinXMaxX(this)){
    if(weight <= 40){
      if(this.position.y >= Fish.MIN_Y && !this.movement.falling){
        this.movement.falling = false;
        this.movement.jumping = true;  
      }
      else{
        this.movement.falling = true;
        this.movement.jumping = false;
      }
    }
  }
  
}

Fish.prototype._resetMovementPerFrame = function(){
  this.movementPerFrame = getRandomInt(1,4);
}
