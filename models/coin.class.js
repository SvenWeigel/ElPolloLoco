class Coin extends Colectables {
  offset = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  };

  /**
   * Creates a coin collectible at a randomized position.
   *
   * @param {number} x - Initial x value (currently overridden).
   * @param {number} y - Initial y value (currently overridden).
   */
  constructor(x, y) {
    super(x, y);
    this.loadImage("assets/img/8_coin/coin_1.png");
    this.x = 300 + Math.random() * 1000;
    this.y = 100 + Math.random() * 200;
  }
}
