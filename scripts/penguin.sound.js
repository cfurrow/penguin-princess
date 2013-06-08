(function(){

  Penguin.prototype.fartBuffer = null;
  Penguin.prototype.fartPlaying = false;

  Penguin.prototype.loadFart = function(){
  //   window.AudioContext = window.AudioContext || window.webkitAudioContext;

  //   self = this;
    
  //   var context = new AudioContext();
  //   var request = new XMLHttpRequest();
  //   var url     = "audio/fart.ogg";
  //   request.open('GET', url, true);
  //   request.responseType = 'arraybuffer';

  //   // Decode asynchronously
  //   request.onload = function() {
  //     context.decodeAudioData(request.response, function(buffer) {
  //       self.fartBuffer = buffer;
  //       context = null;
  //     }, onError);
  //   }
  //   request.send();
      this.audio = new Audio('audio/fart.mp3');
      this.audio.ended = function(){
        this.fartPlaying = false;
        SimpleEvents.trigger('penguin.fart.end');
      }
   }

  function onError(error){ console.log('sound error' + error); }

  Penguin.prototype.playFart = function(){
    
    if(!this.fartPlaying){
      this.audio.play();
    }
    
    // //window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // if(!this.fartPlaying){
    //   this.fartPlaying = true;
     
    //   var context   = new AudioContext();
    //   var source    = context.createBufferSource(); // creates a sound source
    //   source.buffer = this.fartBuffer;           // tell the source which sound to play
    //   source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    //   source.ended = function(){ 
    //     this.fartPlaying = false;
    //   };
    //   source.start(0);                           // play the source now
    //                                              // note: on older systems, may have to use deprecated noteOn(time);

    // }
  }

})();
