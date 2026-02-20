class Cloud extends MovableObject {
  y = 20;
  height = 300;
  width = 500;

  /**
   * Creates a cloud object and starts movement.
   */
  constructor(x) {
    super();
    this.loadImage("assets/img/5_background/layers/4_clouds/1.png");

    this.x = x;
    this.animate();
  }

  /**
   * Starts cloud movement animation.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
