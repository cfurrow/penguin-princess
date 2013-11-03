class AnimatedTest extends AnimatedBase

  constructor: ->
    super()

  initializeTexturePacks: () ->
    @addTexturePack('normal',10,'')

describe 'AnimatedBase', ->
  animated = null

  beforeEach ->
    animated = new AnimatedTest()

  it 'can add a texture pack', ->
    expect(animated.texturePacks.length).toBe(1)
    animated.addTexturePack('silly',1,'')
    expect(animated.texturePacks.length).toBe(2)
    
  it 'has an active texture pack', ->
    expect(animated.getActiveTexturePack()).not.toBe(null)

  it 'can switch to a different texture pack', ->
    animated.addTexturePack('silly',1,'')
    animated.switchTexturePackTo('silly')
    
    expect(animated.getActiveTexturePack()).not.toBe(null)
    expect(animated.activeTexturePack).toBe('silly')
    expect(animated.textures.length).toBe(1)

  it 'does not switch texture packs if pack doesnt exist', ->
    animated.switchTexturePackTo('silly')
    expect(animated.getActiveTexturePack()).not.toBe(null)
    expect(animated.activeTexturePack).toBe('normal')

  it 'defaults to the normal texture pack', ->
    expect(animated.activeTexturePack).toBe('normal')

