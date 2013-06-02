var stage           = null,
    penguinTextures = [],
    renderer        = null,
    penguin         = null,
    snowStage       = null,
    snowTexture     = null,
    meter           = null,
    showMeter       = false;

function init()
{
  var konami      = new Konami();
  konami.code     = surprise;
  konami.load();
  stage           = new PIXI.Stage(0x5bb5ff,true);
	renderer        = PIXI.autoDetectRenderer(800,330);
	document.getElementById("page").appendChild(renderer.view);

  if(showMeter){
    meter         =  new FPSMeter(document.getElementById("fps"));
  }

  snowTexture     = new PIXI.Texture.fromImage("images/bg-snow.png");
  snowStage       = new PIXI.Stage(0xFFFFFF);

  addGroundSnow();

  penguin         = new Penguin(); 

  stage.addChild(snowStage);
  stage.addChild(penguin.stage);
  requestAnimFrame( animate );

  window.onkeydown = function(e){
    if(!penguin.movement.surprise){
      if(e.keyCode == 37){
        //left
        penguin.movement.left  = true;
        penguin.movement.right = false;
      }
      if(e.keyCode == 39){
        //right
        penguin.movement.left  = false;
        penguin.movement.right = true;
      }
    }
    if(e.metaKey==true){
      return true;
    }
    return false;
  };

  window.onkeyup = function(e){
    if(!penguin.movement.surprise){
      if(e.keyCode == 38){
        //up
        penguin.movement.up   = false;
      }
      if(e.keyCode == 40){
        //down
        penguin.movement.down = false;
      }
      if(e.keyCode == 37){
        //left
        penguin.movement.left  = false;
      }
      if(e.keyCode == 39){
        //right
        penguin.movement.right = false;
      }
    }
  };

  renderer.view.onmousedown = function(e){
    e.preventDefault();
    if((e.clientX - this.getBoundingClientRect().left) > penguin.position.x){
      penguin.movement.right = true;
      penguin.movement.left  = false;
    }
    else {
      penguin.movement.right = false;
      penguin.movement.left  = true;
    }
  };
  renderer.view.onmouseup   = function(e){
      penguin.movement.right = false;
      penguin.movement.left  = false;
  };

  var touchstart = function(e){
    e.preventDefault();
    if(e.clientX){
      renderer.view.onmousedown.call(self,e);
    }
    else{
      var i=0;
      var len = e.targetTouches.length;
      var touch;
      var self = this;
      for(;i<len;i++){
        touch = e.targetTouches[i];
        touch.preventDefault = function(){};
        renderer.view.onmousedown.call(self,touch);
      }
    }
  };
  var touchend = function(e){
    e.preventDefault();  
    renderer.view.onmouseup.call(this,e);
  };
  renderer.view.addEventListener("touchstart",touchstart,false);
  renderer.view.addEventListener("touchend",touchend,false);
  renderer.view.addEventListener("touchcancel",touchend,false);
}

function animate() {
  if(showMeter){ meter.tickStart(); }

  requestAnimFrame( animate );
  renderer.render(stage);
  var movePerFrame   = 3,
      rotatePerFrame = 0.015,
      rotateMax      = 0.05,
      center         = renderer.view.width/2;

  if(penguin.movement.surprise){
    penguin.getSurprised();
  }
  if(penguin.movement.left){
    penguin.position.x -= movePerFrame;
    penguin.scale.x     = -0.35;
  }
  if(penguin.movement.right){
    penguin.position.x += movePerFrame;
    penguin.scale.x     = 0.35;
  }
  if(penguin.movement.left || penguin.movement.right){
    if(penguin.movement.waddleRight ){
      penguin.rotation += rotatePerFrame;
      if(penguin.rotation >= rotateMax){
        penguin.movement.waddleRight = false;
      }
    }
    else{
      penguin.rotation -= rotatePerFrame;
      if(penguin.rotation <= -rotateMax){
        penguin.movement.waddleRight = true;
      }
    }
  }
  if(showMeter){ meter.tick(); }
}
function addGroundSnow()
{
  var i=0;
  for(i=0; i< snowStage.children.length; i++){
    snowStage.removeChild(snowStage.children[i]);
  }
  for(i = 0; i < window.innerWidth / 400; i++){
    var snow        = new PIXI.Sprite(snowTexture,{x:0,y:0,width:400,height:100});
    snow.position.x = i * 400;
    snow.position.y = 230;
    snowStage.addChild(snow);
  }
}

function surprise()
{
  penguin.movement.surprise = true;
}

init();
