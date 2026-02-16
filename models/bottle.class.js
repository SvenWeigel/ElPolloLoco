class Bottle extends Colectables {

    constructor(x, y) {
        super(x, y);
        this.loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x =  300 + Math.random() * 1000;
        this.y = 120 + Math.random() * 200;
    }
}