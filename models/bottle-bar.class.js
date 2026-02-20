class BottleBar extends DrawableObject {
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  percentage = 100;

  /**
   * Creates the bottle status bar and sets initial value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 30;
    this.y = 90;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Updates the bottle percentage and active status image.
   *
   * @param {number} percentage - Bottle fill percentage (0-100).
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
