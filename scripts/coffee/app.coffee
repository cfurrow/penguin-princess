class App
  @CANVASWIDTH  = 800;
  @CANVASHEIGHT = 430

  constructor: (window) ->
    @stage          = null
    @penguin        = new Penguin()
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
    
    #@showLoadingText()

    @stage.addChild(@penguin)
    requestAnimFrame( @animate )
    @listenToKeyboard()

    # SimpleEvents.listen("assets.loaded",function(){
    #   addGroundSnow();
    #   addWater();
    #   addFish();

    #   penguin = new Penguin(); 
    #   stage.addChild(penguin.stage);
     
    #   setupInteraction();
    # },this);

    # loadAssets();

    # if(/debug/.test(location.search)){
    #   $("#debug").show();
    # }
  animate: () =>
    @meter.tickStart()

    requestAnimFrame( @animate )
    @renderer.render( @stage )
    
    @penguin.tick(@meter.fps)

    # for(var i=0; i<fishes.length; i++){
    #   fishes[i].tick(meter.fps);
    # }

    @meter.tick()

  listenToKeyboard: () ->
    @window.onkeydown = (e) =>
      @penguin.onKeyDown(e)
      if(e.metaKey == true)
        # don't capture meta-keys (command, etc)
        return true
      e.preventDefault()
      if(e.keyCode == 70)
        # f
        @showMeter = @showMeter ? false : true;
        
        if(!showMeter)
          @meter.hide()
        else
          @meter.show()

    @window.onkeyup = (e) =>
      @penguin.onKeyUp(e)
 
root = exports ? this
root.App = App

