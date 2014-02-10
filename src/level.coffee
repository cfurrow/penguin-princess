define [], ()->
  class Level
    constructor: (path, loaded) ->
      @path = path
      @levelData = {}
      @onLoadComplete = loaded
      @load()


    load: =>
      request = new XMLHttpRequest
      request.open('GET', @path, true)

      request.onload = ()=>
        if (request.status >= 200 && request.status < 400)
          # Success!
          @levelData = JSON.parse(request.responseText)
          @onLoadComplete()
        else  
          # We reached our target server, but it returned an error

      request.onerror = ()=>
        # There was a connection error of some sort
      request.send()  
