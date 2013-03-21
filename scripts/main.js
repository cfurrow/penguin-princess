var stage           = null;
var penguinTextures = [];
var renderer        = null;
var penguin         = null;
var snowStage       = null;
var snowTexture     = null;
function init()
{
  var konami      = new Konami();
  konami.code     = surprise;
  konami.load();
  stage           = new PIXI.Stage(0x5bb5ff);
	renderer        = PIXI.autoDetectRenderer(800,330);
	document.getElementById("page").appendChild(renderer.view);

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
    //if(e.keyCode == 83){
      ////s
      //penguin.movement.surprise = true;
    //}
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
  }
}

function animate() {
  requestAnimFrame( animate );
  renderer.render(stage);
  var movePerFrame = 3;
  var rotatePerFrame = 0.015;
  var rotateMax      = 0.05;
  var center         = renderer.view.width/2;

  if(penguin.movement.surprise){
    penguin.getSurprised();
  }
  if(penguin.movement.left){
    penguin.position.x -= movePerFrame;
    penguin.scale.x = -0.35;
  }
  if(penguin.movement.right){
    penguin.position.x += movePerFrame;
    penguin.scale.x = 0.35;
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
}
function addGroundSnow()
{
  var i=0;
  console.log("addGroundSnow",snowStage.children.length);
  for(i=0; i< snowStage.children.length; i++){
    snowStage.removeChild(snowStage.children[i]);
  }
  for(i = 0; i < window.innerWidth / 400; i++){
    var snow            = new PIXI.Sprite(snowTexture,{x:0,y:0,width:400,height:100});
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
