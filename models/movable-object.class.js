class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  /**
   * Applies gravity by updating y-position and vertical speed.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is currently above ground.
   *
   * @returns {boolean} True if the object is above ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject || this.energy == 0) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  /**
   * Applies damage to the object.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the object is currently in hurt state.
   *
   * @returns {boolean} True while hurt cooldown is active.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks whether the object has no energy left.
   *
   * @returns {boolean} True if dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Performs axis-aligned bounding box collision check.
   *
   * @param {MovableObject|DrawableObject} mo - Other object to test.
   * @returns {boolean} True if both hitboxes overlap.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.left + (this.width - this.offset.left - this.offset.right) > mo.x + mo.offset.left &&
      this.y + this.offset.top + (this.height - this.offset.top - this.offset.bottom) > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.offset.left + (mo.width - mo.offset.left - mo.offset.right) &&
      this.y + this.offset.top < mo.y + mo.offset.top + (mo.height - mo.offset.top - mo.offset.bottom)
    );
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Applies an upwards jump impulse.
   */
  jump() {
    this.speedY = 30;
  }
}
