var stage           = null;
var penguinTextures = [];
var renderer        = null;
var penguin         = null;
var snowStage       = null;
var snowTexture     = null;
function init()
{
  stage           = new PIXI.Stage(0x5bb5ff);
	renderer        = PIXI.autoDetectRenderer(800,600);
	document.getElementById("page").appendChild(renderer.view);

  snowTexture     = new PIXI.Texture.fromImage("images/bg-snow.png");
  snowStage       = new PIXI.Stage(0xFFFFFF);

  addGroundSnow();

  penguin                = new Penguin(); 

  stage.addChild(snowStage);
  stage.addChild(penguin.stage);
  requestAnimFrame( animate );

  window.onkeydown = function(e){
    if(e.keyCode == 38){
      //up
      //penguin.movement.up   = true;
      //penguin.movement.down = false;
      penguin.movement.jumping = true;
    }
    if(e.keyCode == 40){
      //down
      //penguin.movement.up   = false;
      //penguin.movement.down = true;
    }
    if(e.keyCode == 37){
      //left
      penguin.movement.left  = true;
      penguin.movement.right = false;
      penguin.scale.x = -0.35;
    }
    if(e.keyCode == 39){
      //right
      penguin.movement.left  = false;
      penguin.movement.right = true;
      penguin.scale.x = 0.35;
    }
    if(e.metaKey==true){
      return true;
    }
    return false;
  };

  window.onkeyup = function(e){
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
      penguin.rotation = 0;
    }
    if(e.keyCode == 39){
      //right
      penguin.movement.right = false;
      penguin.rotation = 0;
    }
  }

  window.onresize = function(e){
    //renderer.resize(window.innerWidth,window.innerHeight);
    //addGroundSnow();
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

function animate() {
  requestAnimFrame( animate );
  renderer.render(stage);

  //if(penguin.movement.up){
    //penguin.position.y -= 1;
  //}
  //if(penguin.movement.down){
    //penguin.position.y += 1;
  //}
  if(penguin.movement.jumping){
  }
  if(penguin.movement.left){
    penguin.position.x -= 3;
  }
  if(penguin.movement.right){
    penguin.position.x += 3;
  }
  if(penguin.movement.left || penguin.movement.right){
    if(penguin.movement.waddleRight ){
      penguin.rotation += 0.015;
      if(penguin.rotation >= 0.05){
        penguin.movement.waddleRight = false;
      }
    }
    else{
      penguin.rotation -= 0.015;
      if(penguin.rotation <= -0.05){
        penguin.movement.waddleRight = true;
      }
    }
  }
}

init();
