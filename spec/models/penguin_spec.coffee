describe 'Penguin', ->
  penguin = null

  beforeEach ->
    penguin = new Penguin()

  it 'has two texture packs', ->
    expect(penguin.texturePacks.length).toBe(2)

  it 'can be moved right', ->
    penguin.onKeyDown({ keyCode: 39 })
    expect(penguin.movement.right).toBe(true)
