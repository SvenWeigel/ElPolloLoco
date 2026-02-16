class ThrowableObject extends MovableObject {

  

  IMAGES_ROTATE = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
  ];

  constructor(x, y) {
    super();
    this.loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.width = 100;
    this.height = 100;
    this.y = y;
    this.x = x;
    this.loadImages(this.IMAGES_ROTATE);
    this.throw();
    
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATE);
      this.x += 10;
      
    }, 1000 / 25);
  }
  
}
