class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 500;
    

    constructor() {
        super();
        this.loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    
}
        