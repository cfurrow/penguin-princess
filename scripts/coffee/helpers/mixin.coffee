# Source: http://arcturo.github.io/library/coffeescript/03_classes.html
class Mixin
  # Assign properties to the 'class'
  @extend: (klass, obj) ->
    for key, value of obj
      klass[key] = value

    obj.extended?.apply(klass)
    this

  # Assign properties to the prototype/instance
  @include: (instance, obj) ->  
    for key, value of obj
      instance::[key] = value

    obj.included?.apply(instance)
    this

root = exports ? this
root.Mixin = Mixin
