class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.width = 100;
    this.height = 100;
    this.y = y;
    this.x = x;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 1000 / 25);
  }
}
