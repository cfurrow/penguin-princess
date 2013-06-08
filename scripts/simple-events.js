function SimpleEvents(){
}
SimpleEvents._events = {};
SimpleEvents.listen = function(name, callback, context){
  if(typeof(SimpleEvents._events[name]) === 'undefined' || SimpleEvents._events[name] === null)
  {
    SimpleEvents._events[name] = [];
  }
  callback = callback.clone();
  callback.context = context || this;
  SimpleEvents._events[name].push(callback);
}

SimpleEvents.trigger = function(name){
  if(typeof(SimpleEvents._events[name]) !== 'undefined' && SimpleEvents._events !== null){
    var i = 0,
        len = SimpleEvents._events[name].length;

    for(;i<len;i++){
      var func = function(index){
        return function(){
          var currentCallback = SimpleEvents._events[name][index]
          var context         = currentCallback.context || this;
          currentCallback.call(context,arguments);
        }
      };

      setTimeout(func(i),10);
      
    }
  }
}
