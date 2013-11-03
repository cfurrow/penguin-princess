class App
  @CANVASWIDTH  = 800;
  @CANVASHEIGHT = 430

  constructor: (window) ->
    @penguin        = new Penguin({minScreenX: 0, maxScreenX: App.CANVASWIDTH, showHitBox: true})
    @snowStage      = null
    @snowTexture    = null
    @waterStage     = null
    @showMeter      = false
    @fishes         = []

    @stage           = new PIXI.Stage(0x5bb5ff, true) 
    @renderer        = PIXI.autoDetectRenderer(App.CANVASWIDTH, App.CANVASHEIGHT)
    
    @window   = window
    @document = window.document
    @document.getElementById("scene").appendChild(@renderer.view);
    
    @meter =  new FPSMeter(@document.getElementById("fps"));

    if !@showMeter
      @meter.hide()
    
    @stage.addChild(@penguin)
    requestAnimFrame( @animate )
    @listenToKeyboard()

  animate: () =>
    @meter.tickStart()

    requestAnimFrame( @animate )
    @renderer.render( @stage )
    
    @penguin.tick(@meter.fps)

    @meter.tick()

  listenToKeyboard: () ->
    @window.onkeydown = (e) =>
      @_passKeyDownEvent(child, e) for child in @stage.children
      if(e.metaKey == true)
        # don't capture meta-keys (command, etc)
        return true
      e.preventDefault()
      if(e.keyCode == 70)
        # f
        @showMeter = if @showMeter then false else true;
        
        if(!@showMeter)
          @meter.hide()
        else
          @meter.show()

    @window.onkeyup = (e) =>
      @_passKeyUpEvent(child, e) for child in @stage.children

  _passKeyDownEvent: (child, e) ->
    if child.onKeyDown?
      child.onKeyDown(e)
      
  _passKeyUpEvent: (child, e) ->
    if child.onKeyUp?
      child.onKeyUp(e)
 
root = exports ? this
root.App = App

