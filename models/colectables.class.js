class Colectables extends DrawableObject {
    height = 100;
    width = 100;
    
    /**
     * Creates a collectible object.
     *
     * @param {number} x - X position in world coordinates.
     * @param {number} y - Y position in world coordinates.
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

}    