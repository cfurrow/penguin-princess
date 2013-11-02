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
      var func = function(index, args){
        return function(){
          var currentCallback = SimpleEvents._events[name][index]
          var context         = currentCallback.context || this;
          currentCallback.apply(context,args);
        }
      };

      setTimeout(func(i,Array.prototype.slice.call(arguments,1)),10);
      
    }
  }
};

SimpleEvents.count = function(name){
  return SimpleEvents._events[name].length;
};

SimpleEvents.get   = function(name){
  return SimpleEvents._events[name];
};
