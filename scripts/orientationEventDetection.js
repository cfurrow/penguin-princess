// from http://www.html5rocks.com/en/tutorials/device/orientation/deviceorientationsample.html
function handleOrientation(callback,context){
  if(window.DeviceOrientationEvent){
    window.addEventListener('deviceorientation',function(eventData){
      var tiltLR=eventData.gamma;
      var tiltFB=eventData.beta;
      var dir=eventData.alpha
      var motUD=null;
      if(context){
        callback.call(context,tiltLR,tiltFB,dir,motUD)
      }
      else{
        callback(tiltLR,tiltFB,dir,motUD);  
      }
      
    },false);
  }
  else if(window.OrientationEvent){
    window.addEventListener('MozOrientation',function(eventData){
      var tiltLR=eventData.x*90;
      var tiltFB=eventData.y*-90;
      var dir=null;
      var motUD=eventData.z;
      if(context){
        callback.call(context,tiltLR,tiltFB,dir,motUD)
      }
      else{
        callback(tiltLR,tiltFB,dir,motUD);  
      }
    },false);
  }
}
