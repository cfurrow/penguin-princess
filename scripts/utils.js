function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for( key in this ) {
        temp[key] = this[key];
    }
    return temp;
};
