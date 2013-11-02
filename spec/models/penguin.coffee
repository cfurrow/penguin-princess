describe 'Penguin', ->
  penguin = null

  beforeEach ->
    penguin = new Penguin()

  it 'has texture packs', ->
    expect(penguin.getTexturePacks().count).toBe(2)
