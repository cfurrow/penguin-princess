(function() {
  describe('Penguin', function() {
    var penguin;
    penguin = null;
    beforeEach(function() {
      return penguin = new Penguin();
    });
    return it('has texture packs', function() {
      return expect(penguin.getTexturePacks().count).toBe(2);
    });
  });

}).call(this);

/*
//@ sourceMappingURL=all.js.map
*/