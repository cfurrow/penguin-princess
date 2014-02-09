class Penguin
  constructor: ->
    @texture = PIXI.Texture.fromImage('assets/images/penguin.png')
    @sprite  = new PIXI.Sprite(@texture)

    @sprite.anchor.x = 0.5
    @sprite.anchor.y = 1.0

    @baseMovement    = 5

    @movement =  {left: false, right: false}

  width: (w=null) ->
    if w?
      @sprite.width = w
    @sprite.width

  height: (h=null) ->
    if h?
      @sprite.height = h
    @sprite.height

  position: (x=null, y=null) ->
    if x?
      @sprite.position.x = x
    if y?
      @sprite.position.y = y
    @sprite.position

  keyUp: (e) =>
    # if e.keyCode == 39 # right
    #   @movement.right = false
    # else if e.keyCode == 37 # left
    #   @movement.left = false

  keyDown: (e) =>
    if e.keyCode == 39 # right
      @movement.right = true
      @movement.left = false      
    else if e.keyCode == 37 # left
      @movement.left = true
      @movement.right = false
  
  tick: =>
    if @movement.right
      #@sprite.position.x += @baseMovement
      @sprite.scale.x = Math.abs(@sprite.scale.x)
    else if @movement.left
      @sprite.scale.x = -Math.abs(@sprite.scale.x)
      #@sprite.position.x -= @baseMovement
