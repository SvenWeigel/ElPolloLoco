class EndbossBar extends DrawableObject {
  IMAGES = [
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  percentage = 100;

  /**
   * Creates the endboss status bar and sets initial value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 300;
    this.y = 5;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Updates the endboss percentage and active status image.
   *
   * @param {number} percentage - Endboss health percentage (0-100).
   */
  setPercentage(percentage) {
    return this.chooseImageIndexFromPercentage(percentage);
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
