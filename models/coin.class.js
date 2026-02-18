class Coin extends Colectables {

    constructor(x, y) {
        super(x, y);
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.x =  300 + Math.random() * 1000;
        this.y = 100 + Math.random() * 200;
    }
}