class ThrowableObject extends MovableObject {
  hasHit = false;
  bottleHitSound = new Audio("audio/bottle_hit.mp3");

  IMAGES_ROTATE = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_ON_HIT = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a throwable bottle object.
   *
   * @param {number} x - Initial x position.
   * @param {number} y - Initial y position.
   */
  constructor(x, y) {
    super();
    this.throwSound = new Audio("audio/throw_sound.mp3");
    this.loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.width = 100;
    this.height = 100;
    this.y = y;
    this.x = x;
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_ON_HIT);
    this.throwSound.volume = 0.2;
    this.bottleHitSound.volume = 0.3;
    registerAudio(this.throwSound);
    registerAudio(this.bottleHitSound);
    this.throw();
  }

  /**
   * Starts throw movement and rotation animation.
   */
  throw() {
    this.throwSound.play();
    this.speedY = 30;
    this.applyGravity();
    this.throwInterval = setStoppableInterval(() => {
      if (this.hasHit) {
        return;
      }
      this.playAnimation(this.IMAGES_ROTATE);
      this.x += 10;
    }, 1000 / 25);
  }

  /**
   * Handles the impact animation and sound after a hit.
   */
  onHit() {
    if (this.hasHit) {
      return;
    }
    this.hasHit = true;
    this.speedY = 0;
    clearInterval(this.throwInterval);
    let splashFrame = 0;
    this.splashInterval = setStoppableInterval(() => {
      this.img = this.imageCache[this.IMAGES_ON_HIT[splashFrame]];
      splashFrame++;
      if (splashFrame >= this.IMAGES_ON_HIT.length) {
        clearInterval(this.splashInterval);
      }
    }, 80);
    this.bottleHitSound.play();
  }
}
