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

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject || this.energy == 0) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  isColliding(mo) {
    return (
      this.x + this.offset.left + (this.width - this.offset.left - this.offset.right) > mo.x + mo.offset.left &&
      this.y + this.offset.top + (this.height - this.offset.top - this.offset.bottom) > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.offset.left + (mo.width - mo.offset.left - mo.offset.right) &&
      this.y + this.offset.top < mo.y + mo.offset.top + (mo.height - mo.offset.top - mo.offset.bottom)
    );
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
