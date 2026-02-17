let level1;

function level() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Endboss(),
    ],
    [new Cloud()],
    [
      new BackgroundObject("assets/img/5_background/layers/air.png", -720, 0),
      new BackgroundObject(
        "assets/img/5_background/layers/3_third_layer/2.png",
        -720,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/2_second_layer/2.png",
        -720,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/2.png",
        -720,
        0,
      ),

      new BackgroundObject("assets/img/5_background/layers/air.png", 0, 0),
      new BackgroundObject(
        "assets/img/5_background/layers/3_third_layer/1.png",
        0,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/2_second_layer/1.png",
        0,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/1.png",
        0,
        0,
      ),

      new BackgroundObject("assets/img/5_background/layers/air.png", 720, 0),
      new BackgroundObject(
        "assets/img/5_background/layers/3_third_layer/2.png",
        720,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/2_second_layer/2.png",
        720,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/2.png",
        720,
        0,
      ),

      new BackgroundObject(
        "assets/img/5_background/layers/air.png",
        720 * 2,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/3_third_layer/1.png",
        720 * 2,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/2_second_layer/1.png",
        720 * 2,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/1.png",
        720 * 2,
        0,
      ),

      new BackgroundObject(
        "assets/img/5_background/layers/air.png",
        720 * 3,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/3_third_layer/2.png",
        720 * 3,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/2_second_layer/2.png",
        720 * 3,
        0,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/2.png",
        720 * 3,
        0,
      ),
    ],

    [
      new Coin(400, 100),
      new Coin(500, 100),
      new Coin(600, 100),
      new Coin(700, 100),
      new Coin(800, 100),
      new Bottle(900, 100),
      new Bottle(1000, 100),
      new Bottle(1100, 100),
      new Bottle(1200, 100),
      new Bottle(1300, 100)
    ],
  );
}
