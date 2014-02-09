define (require, exports, module) ->
  PIXI = require('pixi')

  keyDown: (e) =>
    if e.keyCode == 39 # right
      @movement.right = false
      @movement.left = true      
    else if e.keyCode == 37 # left
      @movement.left = false
      @movement.right = true
  

  keyUp: (e) =>
    if e.keyCode == 39 # right
      @movement.left = false
    else if e.keyCode == 37 # left
      @movement.right = false

  tick: =>
    if @movement.right
      @sprite.position.x += @baseMovement/@distance
    else if @movement.left
      @sprite.position.x -= @baseMovement/@distance
