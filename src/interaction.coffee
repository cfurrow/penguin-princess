define [], ()->
  class Interaction
    constructor: ()->
      @keyUpEvents    = [@defaultEvent]
      @keyDownEvents  = [@defaultEvent]
      @keyPressEvents = [@defaultEvent]

      @addEventListener(window, 'keyup', @runKeyUps)
      @addEventListener(window, 'keydown', @runKeyDowns)
      @addEventListener(window, 'keypress', @runKeyPresses)

    addKeyUp: (fn) =>
      @keyUpEvents.push(fn)

    runKeyUps: (e) =>
      cb(e) for cb in @keyUpEvents
      false

    addKeyDown: (fn) =>
      @keyDownEvents.push(fn)

    runKeyDowns: (e) =>
      cb(e) for cb in @keyDownEvents
      false

    runKeyPresses: (e) =>
      false

    addEventListener: (elem, name, func) ->
      if elem.addEventListener?
        elem.addEventListener(name, func)
      else
        elem.attachEvent(name, func)

    cancelBubble: (e) ->
      if e?
        e.preventDefault()
        e.stopPropagation()
      else
        window.event.cancelBubble = true

    defaultEvent: (e) =>
      unless e.keyCode == 82 && e.metaKey
        @cancelBubble()
