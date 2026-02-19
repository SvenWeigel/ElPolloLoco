class ChickenSmall extends MovableObject {
  y = 380;
  height = 45;
  width = 60;
  energy = 5;

  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a small chicken enemy.
   */
  constructor() {
    super().loadImage(
      "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 1000;
    this.speed = 0.25 + Math.random() * 0.25;

    this.animate();
  }

  /**
   * Starts movement and animation intervals for the small chicken.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      if (this.isDead()) {
        this.applyGravity();
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 200);
  }

  /**
   * Checks whether the small chicken has no remaining energy.
   *
   * @returns {boolean} True if the enemy is dead.
   */
  isDead() {
    return this.energy == 0;
  }
}
