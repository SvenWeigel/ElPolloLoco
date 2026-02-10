class TrowableObject extends MovableObject {

    
    constructor() {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.width = 50;
        this.height = 50;
        this.y = 350;
        this.x = 200;
        this.speedY = 10;
        this.speedX = 10;
        this.applyGravity();
    }
}