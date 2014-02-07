class Penguin
  constructor: ->
    @texture = PIXI.Texture.fromImage('assets/images/penguin.png')
    @sprite  = new PIXI.Sprite(@texture)

    @sprite.anchor.x = 0.5
    @sprite.anchor.y = 1.0

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
  

