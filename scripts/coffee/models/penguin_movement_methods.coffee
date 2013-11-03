root = exports ? this
root.PenguinMovementMethods = 

  movement:
    up: false
    down: false
    left: false
    right: false

  rotateRight: true

  onKeyUp: (event) ->
    @stop()

  onKeyDown: (event) ->
    # if(event.keyCode == 38)
    #   # up
    #   @moveUp()
    
    # if(event.keyCode == 40)
    #   # down
    #   @moveDown()
    
    if(event.keyCode == 37)
      # left
      @moveLeft()
    
    if(event.keyCode == 39)
      # right
      @moveRight()
    
    # if(event.keyCode == 32)
    #   # space
    #   @moveUp()
    

  moveLeft: ->
    @resetMovement()
    @movement.left = true

  moveRight: ->
    @resetMovement()
    @movement.right = true

  moveUp: ->

  moveDown: ->


  stop: ->
    @resetMovement()

  resetMovement: () ->
    (@movement[k] = false) for k,v of @movement
