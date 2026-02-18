class Level {
    enemies;
    clouds;
    backgroundObjects;
    colectables;
    level_end_x = 2200;

    /**
     * Creates a game level with all required entities.
     *
     * @param {Array} enemies - Enemy objects of the level.
     * @param {Array} clouds - Cloud objects of the level.
     * @param {Array} backgroundObjects - Background layer objects.
     * @param {Array} colectables - Collectible items of the level.
     */
    constructor(enemies, clouds, backgroundObjects, colectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.colectables = colectables;
    }
}