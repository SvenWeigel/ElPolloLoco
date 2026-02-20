class StatusBar extends DrawableObject {
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  /**
   * Creates the health status bar and sets initial value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 30;
    this.y = 0;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Updates the health percentage and active status image.
   *
   * @param {number} percentage - Health percentage (0-100).
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
