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
  endbossBar = new EndbossBar();
  bottleAmount = 0;
  throwableObjects = [];
  colectables = [];
  lastThrowTime = 0;
  throwCooldown = 2000;
  lastHitTime = 0;
  hitCooldown = 100;
  backgroundMusic = new Audio("audio/background_music.mp3");
  lastBounceTimes = {};
  lastCharacterY = 0; 
  hasWon = false;
  hasLost = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.05;
    registerAudio(this.backgroundMusic);
    this.backgroundMusic.play();
    this.lastCharacterY = this.character.y;
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setStoppableInterval(() => {
      this.activateEndbossOnFirstSight();
      this.checkCollisions();
      this.checkThrowableObjects();
      this.checkThrowableCollisions();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkWinCondition();
      this.checkLooseCondition();
      this.lastCharacterY = this.character.y;
    }, 50);
  }

  activateEndbossOnFirstSight() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (!endboss || endboss.isAwake) {
      return;
    }
    const viewportLeft = -this.camera_x - 200;
    const viewportRight = viewportLeft + this.canvas.width;
    const bossIsVisible = endboss.x < viewportRight && endboss.x + endboss.width > viewportLeft;
    if (bossIsVisible) {
      endboss.activate();
    }
  }

  checkWinCondition() {
    if (this.hasWon) {
      return;
    }
    const endbossIsDead = this.level.enemies.some(
      (enemy) => enemy instanceof Endboss && enemy.isDead(),
    );
    if (endbossIsDead) {
      this.hasWon = true;
      youWin();
    }
  }

  checkLooseCondition() {
    if (this.hasWon || this.hasLost) {
      return;
    }

    if (this.character.isDead()) {
      this.hasLost = true;
      youLose();
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        const isOnTop = this.isCharacterJumpingOnEnemy(enemy);
        if (isOnTop && (enemy instanceof Chicken || enemy instanceof ChickenSmall) && !enemy.isDead()) {
          if (!this.lastBounceTimes[index] || Date.now() - this.lastBounceTimes[index] > 300
          ) {
            enemy.hit();
            this.character.speedY = 15;
            this.lastBounceTimes[index] = Date.now();
            this.updateEndbossBar(enemy);
          }
        } else if (
          !isOnTop && !enemy.isDead() && Date.now() - this.lastHitTime > this.hitCooldown
        ) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          this.lastHitTime = Date.now();
        }
      }
    });
  }

  isCharacterJumpingOnEnemy(enemy) {
    const previousCharacterBottom = this.lastCharacterY + this.character.height;
    const currentCharacterBottom = this.character.y + this.character.height;
    const enemyTop = enemy.y;
    const stompTolerance = 20;
    const isFalling = this.character.y > this.lastCharacterY;
    return (
      isFalling &&
      previousCharacterBottom <= enemyTop + stompTolerance &&
      currentCharacterBottom >= enemyTop
    );
  }

  checkThrowableCollisions() {
    this.throwableObjects.forEach((bottle, index) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.hasHit) {
          enemy.hit();
          this.updateEndbossBar(enemy);
          bottle.onHit();
          setTimeout(() => {
            const bottleIndex = this.throwableObjects.indexOf(bottle);
            if (bottleIndex !== -1) {
              this.throwableObjects.splice(bottleIndex, 1);
            }
          }, 500);
        }
      });
    });
  }

  checkThrowableObjects() {
    if (
      this.keyboard.D &&
      Date.now() - this.lastThrowTime > this.throwCooldown &&
      this.bottleAmount > 0
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
      );
      this.throwableObjects.push(bottle);
      this.bottleAmount--;
      this.bottleBar.setPercentage(this.bottleAmount * 20);
      this.lastThrowTime = Date.now();
    }
  }

  checkCoinCollisions() {
    this.level.colectables.forEach((colectable, index) => {
      if (
        colectable instanceof Coin &&
        this.character.isColliding(colectable)
      ) {
        this.level.colectables.splice(index, 1);
        this.coinBar.setPercentage(this.coinBar.percentage + 20);
      }
    });
  }

  checkBottleCollisions() {
    this.level.colectables.forEach((colectable, index) => {
      if (
        colectable instanceof Bottle &&
        this.character.isColliding(colectable)
      ) {
        this.level.colectables.splice(index, 1);
        this.bottleAmount++;
        this.bottleBar.setPercentage(this.bottleAmount * 20);
      }
    });
  }

  updateEndbossBar(enemy) {
    if (!(enemy instanceof Endboss)) {
      return;
    }
    const percentage = Math.max(0, Math.min(100, Math.round((enemy.energy / enemy.maxEnergy) * 100)));
    this.endbossBar.setPercentage(percentage);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.coinBar);
    this.addToMap(this.endbossBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.colectables);
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
    // movableObject.drawFrame(this.ctx);

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
