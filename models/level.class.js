class Level {
    enemies;
    clouds;
    backgroundObjects;
    colectables;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, colectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.colectables = colectables;
    }
}