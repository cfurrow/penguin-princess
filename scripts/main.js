window.CANVASWIDTH  = 800;
window.CANVASHEIGHT = 330;
var stage           = null,
    penguinTextures = [],
    renderer        = null,
    penguin         = null,
    snowStage       = null,
    snowTexture     = null,
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
	document.getElementById("page").appendChild(renderer.view);

  snowTexture     = new PIXI.Texture.fromImage("images/bg-snow.png");
  snowStage       = new PIXI.Stage(0xFFFFFF);

  addGroundSnow();

  penguin         = new Penguin(); 
  fishes.push( new Fish(0) );
  fishes.push( new Fish(200) );
  fishes.push( new Fish(600) );
  fishes.push( new Fish(700) );

  stage.addChild(snowStage);
  stage.addChild(penguin.stage);

  for(var i=0; i< fishes.length; i++){
    stage.addChild(fishes[i].stage);
  }
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

function surprise()
{
  penguin.movement.surprise = true;
}

init();
