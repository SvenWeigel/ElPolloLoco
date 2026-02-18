class Bottle extends Colectables {

    IMAGES_GROUND = [
        "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    /**
     * Creates a bottle collectible and starts its animation.
     */
    constructor() {
        super();
        this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_GROUND);
        this.x =  300 + Math.random() * 1000;
        this.y = 330;
        this.animate();
    }

    /**
     * Starts idle bottle rotation animation on ground.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_GROUND);
        }, 500);
    }
}