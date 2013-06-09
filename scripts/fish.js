function Fish(x,y){
  this.fishTextures         = this.loadFrames();
  var fishStage             = new PIXI.Stage("",true);

  PIXI.MovieClip.call(this,this.fishTextures);

  // pixi.js
  this.position.x = x || 350;
  this.position.y = y || 300;
  this.anchor.x   = 0.5;
  this.anchor.y   = 0.5;
  this.animationSpeed  = 0.07;
  this.scale.x    =  0.6;
  this.scale.y    =  0.6;

  // custom
  this.movement         = { left: false, right: false, falling: false, jumping: false };
  this.defaultY         = this.position.y;

  this.movementPerFrame = getRandomInt(1,3)

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
    if(this.position.y <= 100){
      this.movement.jumping = false;
      this.movement.falling = true;
      return;
    }
    else{
      this.position.y -= 10;  
    }

    if(this.movement.right){
      this.rotation = 160;
    }
    else{
      this.rotation = 70;
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
      this.position.y += 10;  
    }

    if(this.movement.right){
      this.rotation = 180;
    }
    else{
      this.rotation = 270; 
    }
    
  }
};

Fish.prototype.handlePenguinFart = function(){
  var weight = Math.random() * 100;
  if(weight <= 20){
    if(this.position.y >= 100 && !this.movement.falling){
      this.movement.falling = false;
      this.movement.jumping = true;  
    }
    else{
      this.movement.falling = true;
      this.movement.jumping = false;
    }
  }
}
