class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a background object at a fixed world position.
     *
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - X position in world coordinates.
     * @param {number} y - Y position in world coordinates.
     */
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
        
    }
}