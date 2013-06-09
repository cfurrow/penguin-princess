SimpleEvents.listen("assets.loaded",function(){
  console.log("assets loaded");
});
SimpleEvents.listen("assets.progress",function(){
  console.log("assets.progress: ", arguments);
});

function loadAssets(){
  var assets = [],
      loader = null,
      index  = 0,
      length = 0;

  assets.push('images/bg-snow.png');
  
  length = 10;
  index = 0;
  for(;index<length;index++){
    assets.push("images/bubbles_frame_" + index + "_128x64.png");
  }
  length = 3;
  for(index=0; index<length; index++)
  {
    assets.push("images/fish_frame_" + index + "_128x128.png");
  }
  length = 4
  for(index=0; index<length; index++)
  {
    assets.push("images/frame_" + index + "_512x512.png");
  }
  length = 9
  for(index=0; index<length; index++)
  {
    assets.push("images/surprise_frame_" + index + "_512x512.png");
  }

  loader = new PIXI.AssetLoader(assets);

  loader.addEventListener('onComplete',function(){
    setTimeout(function(){SimpleEvents.trigger('assets.loaded');},500);
  });
  loader.addEventListener('onProgress',function(){SimpleEvents.trigger('assets.progress');});

  loader.load();
}
