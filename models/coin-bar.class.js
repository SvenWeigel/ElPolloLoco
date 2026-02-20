class CoinBar extends DrawableObject {
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 100;

  /**
   * Creates the coin status bar and sets initial value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 30;
    this.y = 45;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Updates the coin percentage and active status image.
   *
   * @param {number} percentage - Coin percentage (0-100).
   */
  setPercentage(percentage) {
    return this.chooseImageIndexoFromPercentage(percentage);
  }

  /**
   * Resolves image index from current percentage.
   *
   * @returns {number} Image index in the `IMAGES` array.
   */
  resolveImageIndex() {
    return this.percentageIndex();
  }
}
