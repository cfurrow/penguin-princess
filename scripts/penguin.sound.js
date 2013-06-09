(function(){

  Penguin.prototype.fartBuffer = null;
  Penguin.prototype.fartAudio = null;

  Penguin.prototype.loadFart = function(){
      this.fartAudio = new Audio('audio/fart.mp3');
      this.fartAudio.addEventListener('ended',function(){
        this.isFarting = false;
        SimpleEvents.trigger('penguin.fart.end');
      });
   }

  function onError(error){ console.log('sound error' + error); }

  Penguin.prototype.playFart = function(){
    if(!this.fartAudio.isFarting){
      this.fartAudio.isFarting = true;
      SimpleEvents.trigger('penguin.fart');
      this.fartAudio.play();
    }
  }

})();
