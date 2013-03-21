var stage = null;
var penguinTextures;
function init()
{
  stage           = new PIXI.Stage(0xFFFFFF);;
  penguinTextures = [];
	renderer        = PIXI.autoDetectRenderer(800, 600);
	document.body.appendChild(renderer.view);

  penguinTextures = loadFrames();

  var penguin            = new PIXI.MovieClip(penguinTextures);
  penguin.animationSpeed = 0.05;

  penguin.position.x =  150;
  penguin.position.y =  88;

  penguin.gotoAndPlay(Math.random() * 4);

  stage.addChild(penguin);
  requestAnimFrame( animate );
}

function animate() {
  requestAnimFrame( animate );
  renderer.render(stage);
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
