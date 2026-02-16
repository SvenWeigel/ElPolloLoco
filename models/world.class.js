class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  throwableObjects = [];
  lastThrowTime = 0;
  throwCooldown = 500;  
  lastHitTime = 0;
  hitCooldown = 500;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObjects();
      this.checkThrowableCollisions();
    }, 50);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && Date.now() - this.lastHitTime > this.hitCooldown) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        this.lastHitTime = Date.now();
      }
    });
    }

    checkThrowableCollisions() {
    this.throwableObjects.forEach((bottle, index) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();
          this.throwableObjects.splice(index, 1);
        }
      });
    });
  }
  

  checkThrowableObjects() {
    if (this.keyboard.D && Date.now() - this.lastThrowTime > this.throwCooldown) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
      );
      this.throwableObjects.push(bottle);
      this.lastThrowTime = Date.now();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    // -------Space for fixed objects like status bar--------
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  flipImageBack(movableObject) {
    this.ctx.restore();
    movableObject.x = movableObject.x * -1;
  }
}
