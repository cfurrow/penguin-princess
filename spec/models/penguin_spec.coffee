describe 'Penguin', ->
  penguin = null

  beforeEach ->
    penguin = new Penguin()

  it 'has texture packs', ->
    expect(penguin.texturePacks.length).toBe(2)
