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
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves image index from current percentage.
   *
   * @returns {number} Image index in the `IMAGES` array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
