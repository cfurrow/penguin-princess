window.CANVASWIDTH  = 800;
window.CANVASHEIGHT = 430;
var stage           = null,
    penguinTextures = [],
    renderer        = null,
    penguin         = null,
    snowStage       = null,
    snowTexture     = null,
    waterStage      = null,
    meter           = null,
    showMeter       = false,
    fishes          = [];

function init()
{
  var konami      = new Konami();
  konami.code     = surprise;
  konami.load();
  stage           = new PIXI.Stage(0x5bb5ff,true);
	renderer        = PIXI.autoDetectRenderer(window.CANVASWIDTH,window.CANVASHEIGHT);
	document.getElementById("scene").appendChild(renderer.view);

  snowTexture     = new PIXI.Texture.fromImage("images/bg-snow.png");
  snowStage       = new PIXI.Stage(0xFFFFFF);

  addGroundSnow();
  addWater();

  penguin = new Penguin(); 
  fishes.push( new Fish(0) );
  fishes.push( new Fish(200) );
  fishes.push( new Fish(600) );
  fishes.push( new Fish(700) );

  stage.addChild(snowStage);
  for(var i=0; i< fishes.length; i++){
    stage.addChild(fishes[i].stage);
  }
  stage.addChild(penguin.stage);
  requestAnimFrame( animate );

  window.onkeydown = function(e){
    penguin.onKeyDown(e);
    if(e.metaKey==true){
      return true;
    }
    if(e.keyCode == 70){
      showMeter = showMeter ? false : true;
      if(showMeter && (typeof(meter) === 'undefined' || meter === null)) {
        meter =  new FPSMeter(document.getElementById("fps"));
      }
      if(!showMeter){
        meter = null;
        document.getElementById('fps').innerHTML = '';
      }
    }
    return false;
  };

  window.onkeyup = function(e){
    penguin.onKeyUp(e);
  };

  renderer.view.onmousedown = function(e){
    e.preventDefault();
    penguin.onMouseDown(e,this);
  };

  renderer.view.onmouseup   = function(e){
    penguin.onMouseUp(e,this);
  };

  addListeners();

}
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

function addListeners(){
  renderer.view.addEventListener("touchstart",touchstart,false);
  renderer.view.addEventListener("touchend",touchend,false);
  renderer.view.addEventListener("touchcancel",touchend,false);

  window.fartCount = 0;
  SimpleEvents.listen('penguin.fart',function(){console.log('fart! ',window.fartCount++);});
  SimpleEvents.listen('penguin.fart.end',function(){console.log('/end fart');});
}

function animate() {
  if(meter){ meter.tickStart(); }

  requestAnimFrame( animate );
  renderer.render(stage);
  
  penguin.tick();
  for(var i=0; i<fishes.length; i++){
    fishes[i].tick();
  }

  if(meter){ meter.tick(); }
}

function addGroundSnow()
{
  var i = 0,
      snowWidth = 400,
      snowHeight = 100;
  for(i=0; i<  snowStage.children.length; i++){
    snowStage.removeChild(snowStage.children[i]);
  }
  for(i = 0; i < window.innerWidth / snowWidth; i++){
    var snow        = new PIXI.Sprite(snowTexture,{x:0,y:0,width:snowWidth,height:snowHeight});
    snow.position.x = i * snowWidth;
    snow.position.y = 230;
    snowStage.addChild(snow);
  }
}

function addWater()
{
  var bubbleTextures = [];
  var len             = 11;
  var i               = 0;
  var texture         = null;
  var bubbles          = null;
  var bubbleWidth      = 64;
  var bubbleHeight     = 128;
  var numBubblesNeeded = Math.floor(window.CANVASWIDTH / bubbleWidth)+1;
  waterStage = new PIXI.Stage(0x3474B7);
  waterStage.position.y = 300;
  waterStage.position.x = 0;

  for(;i<len;i++){
    texture = PIXI.Texture.fromImage("images/bubbles_frame_" + i + "_128x64.png");
    bubbleTextures.push(texture);
  }
  for(i=0;i<numBubblesNeeded;i++)
  {
    bubbles = new PIXI.MovieClip(bubbleTextures,{x:0,y:0,width:bubbleWidth,height:bubbleHeight});
    bubbles.position.x = i * bubbleWidth;
    bubbles.position.y = window.CANVASHEIGHT;
    bubbles.anchor.y = 1;
    bubbles.scale.y  = 1.6;
    bubbles.scale.x  = 2;
    bubbles.animationSpeed  = 0.07;
    bubbles.gotoAndPlay(10*Math.random());
    waterStage.addChild(bubbles);
  }
  
  waterStage.setBackgroundColor(0x3474B7);
  stage.addChild(waterStage);
}

function surprise()
{
  penguin.movement.surprise = true;
}

init();
