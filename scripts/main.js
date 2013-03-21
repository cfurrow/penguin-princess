var stage           = null;
var penguinTextures = [];
var renderer        = null;
var penguin         = null;
var penguinStage    = null;
function init()
{
  stage           = new PIXI.Stage(0xaaaaaa);
	renderer        = PIXI.autoDetectRenderer(800, 600);
	document.body.appendChild(renderer.view);

  penguinTextures = loadFrames();

  penguin                = new PIXI.MovieClip(penguinTextures);
  penguin.animationSpeed  = 0.05;

  penguinStage       = new PIXI.Stage();
  penguin.position.x =  150;
  penguin.position.y =  300;
  penguin.scale.x    =  0.35;
  penguin.scale.y    =  0.35;
  penguin.anchor.x   = 0.5;
  penguin.anchor.y   = 1;
  penguin.movement   = { waddleRight:false };

  penguin.gotoAndPlay(0);


  penguinStage.addChild(penguin);
  stage.addChild(penguinStage);
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

init();
