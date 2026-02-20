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
  endbossBarVisible = false;
  bottleAmount = 0;
  bottleMax = 5;
  throwableObjects = [];
  colectables = [];
  lastThrowTime = 0;
  throwCooldown = 2000;
  lastHitTime = 0;
  hitCooldown = 500;
  backgroundMusic = new Audio("audio/background_music.mp3");
  lastBounceTimes = {};
  lastCharacterY = 0;
  hasWon = false;
  hasLost = false;

  /**
   * Creates the world instance and starts rendering/runtime loops.
   *
   * @param {HTMLCanvasElement} canvas - Target canvas element.
   * @param {Keyboard} keyboard - Shared keyboard input state.
   */
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

  /**
   * Attaches world reference to the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game logic interval.
   */
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

  /**
   * Activates the endboss and shows its bar on first sight.
   */
  activateEndbossOnFirstSight() {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss,
    );
    if (!endboss || endboss.isAwake) {
      return;
    }
    const viewportLeft = -this.camera_x - 200;
    const viewportRight = viewportLeft + this.canvas.width;
    const bossIsVisible =
      endboss.x < viewportRight && endboss.x + endboss.width > viewportLeft;
    if (bossIsVisible) {
      endboss.activate();
      this.endbossBarVisible = true;
    }
  }

  /**
   * Checks whether win condition is fulfilled.
   */
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

  /**
   * Checks whether lose condition is fulfilled.
   */
  checkLooseCondition() {
    if (this.hasWon || this.hasLost) {
      return;
    }

    if (this.character.isDead()) {
      this.hasLost = true;
      youLose();
    }
  }

  /**
   * Collects enemies currently colliding with the character.
   *
   * @returns {Array<{enemy: import('./movable-object.class.js')|object, index: number}>} Array of collision descriptors.
   */
  getCollidingEnemies() {
    const colliding = [];
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        colliding.push({ enemy, index });
      }
    });
    return colliding;
  }

  /**
   * Process colliding enemies in a prioritized order:
   *  1. `Chicken`
   *  2. `ChickenSmall`
   *  3. any other enemy
   *
   * Stops processing when a collision handler returns `true` (handled).
   *
   * @param {Array<{enemy: object, index: number}>} colliding - collisions to process
   * @returns {boolean} true if processing stopped early because a collision was handled
   */
  processCollidingEnemies(colliding) {
    const processByType = (Type) => {
      for (const item of colliding) {
        if (item.enemy instanceof Type) {
          const handled = this.processEnemyCollision(item.enemy, item.index);
          if (handled) return true;
        }
      }
      return false;
    };

    if (processByType(Chicken)) return true;
    if (processByType(ChickenSmall)) return true;

    for (const item of colliding) {
      const handled = this.processEnemyCollision(item.enemy, item.index);
      if (handled) return true;
    }
    return false;
  }

  /**
   * Checks collisions between character and enemies and delegates handling.
   * Uses helper functions to keep responsibilities small and the logic testable.
   *
   * @returns {void}
   */
  checkCollisions() {
    const colliding = this.getCollidingEnemies();
    this.processCollidingEnemies(colliding);
  }

  /**
   * Determines if character is falling onto an enemy.
   *
   * @param {MovableObject} enemy - Enemy object.
   * @returns {boolean} True if stomp conditions are met.
   */
  isCharacterJumpingOnEnemy(enemy) {
    const previousCharacterBottom =
      this.lastCharacterY +
      this.character.height -
      this.character.offset.bottom;
    const currentCharacterBottom =
      this.character.y +
      5 +
      this.character.height -
      this.character.offset.bottom;
    const enemyTop = enemy.y + enemy.offset.top;
    const stompTolerance = enemy instanceof Chicken ? 36 : 30;
    const isFalling =
      this.character.speedY < 0 || this.character.y > this.lastCharacterY;
    return (
      isFalling &&
      previousCharacterBottom <= enemyTop + stompTolerance &&
      currentCharacterBottom >= enemyTop
    );
  }

  /**
   * Checks collisions between throwable bottles and enemies.
   */
  checkThrowableCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        this.processThrowableCollision(bottle, enemy);
      });
    });
  }

  /**
   * Spawns throwable bottles based on input and cooldown.
   */
  checkThrowableObjects() {
    if (
      this.keyboard.D &&
      Date.now() - this.lastThrowTime > this.throwCooldown &&
      this.bottleAmount > 0
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100,
      );
      this.throwableObjects.push(bottle);
      if (this.character) {
        this.character.idleStartTime = null;
        this.character.currentImage = 0;
      }
      this.bottleAmount--;
      const bottlePercent = Math.max(
        0,
        Math.min(100, Math.round((this.bottleAmount / this.bottleMax) * 100)),
      );
      this.bottleBar.setPercentage(bottlePercent);
      this.lastThrowTime = Date.now();
    }
  }

  /**
   * Checks coin pickup collisions.
   */
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

  /**
   * Checks bottle pickup collisions.
   */
  checkBottleCollisions() {
    this.level.colectables.forEach((colectable, index) => {
      if (
        colectable instanceof Bottle &&
        this.character.isColliding(colectable)
      ) {
        this.level.colectables.splice(index, 1);
        this.bottleAmount++;
        if (this.bottleAmount > this.bottleMax)
          this.bottleAmount = this.bottleMax;
        const bottlePercent = Math.max(
          0,
          Math.min(100, Math.round((this.bottleAmount / this.bottleMax) * 100)),
        );
        this.bottleBar.setPercentage(bottlePercent);
      }
    });
  }

  /**
   * Updates endboss status bar from enemy health.
   *
   * @param {MovableObject} enemy - Hit enemy instance.
   */
  updateEndbossBar(enemy) {
    if (!(enemy instanceof Endboss)) {
      return;
    }
    const percentage = Math.max(
      0,
      Math.min(100, Math.round((enemy.energy / enemy.maxEnergy) * 100)),
    );
    this.endbossBar.setPercentage(percentage);
  }

  /**
   * Handles character collision with one enemy.
   *
   * @param {MovableObject} enemy - Colliding enemy.
   * @param {number} index - Enemy index in array.
   */
  processEnemyCollision(enemy, index) {
    const isChicken = enemy instanceof Chicken || enemy instanceof ChickenSmall;
    const isOnTop = this.isCharacterJumpingOnEnemy(enemy);
    if (isChicken && !enemy.isDead()) {
      const enemyTop = enemy.y + enemy.offset.top;
      if (isOnTop) {
        this.character.y =
          enemyTop - this.character.height + this.character.offset.bottom;
        this.character.speedY = 0;
        this.lastCharacterY = this.character.y;
        this.handleStomp(enemy, index);
        return true;
      }
    }
    if (
      !isOnTop &&
      !enemy.isDead() &&
      Date.now() - this.lastHitTime > this.hitCooldown
    ) {
      this.handleCharacterHit();
    }
    return false;
  }

  /**
   * Applies stomp behavior to an enemy.
   *
   * @param {MovableObject} enemy - Stomped enemy.
   * @param {number} index - Enemy index in array.
   */
  handleStomp(enemy, index) {
    if (
      !this.lastBounceTimes[index] ||
      Date.now() - this.lastBounceTimes[index] > 300
    ) {
      enemy.hit();
      this.character.speedY = 20;
      this.lastBounceTimes[index] = Date.now();
      this.updateEndbossBar(enemy);
    }
  }

  /**
   * Applies damage to the character and updates health bar.
   */
  handleCharacterHit() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    this.lastHitTime = Date.now();
  }

  /**
   * Handles throwable collision for one bottle-enemy pair.
   *
   * @param {ThrowableObject} bottle - Thrown bottle.
   * @param {MovableObject} enemy - Potential hit enemy.
   */
  processThrowableCollision(bottle, enemy) {
    if (bottle.isColliding(enemy) && !bottle.hasHit) {
      enemy.hit();
      this.updateEndbossBar(enemy);
      bottle.onHit();
      this.removeThrowableAfterDelay(bottle);
    }
  }

  /**
   * Removes a throwable object from world after a delay.
   *
   * @param {ThrowableObject} bottle - Bottle to remove.
   */
  removeThrowableAfterDelay(bottle) {
    setTimeout(() => {
      const bottleIndex = this.throwableObjects.indexOf(bottle);
      if (bottleIndex !== -1) {
        this.throwableObjects.splice(bottleIndex, 1);
      }
    }, 500);
  }

  /**
   * Renders static/parallax background layers.
   */
  renderBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Renders HUD elements.
   */
  renderHud() {
    this.addToMap(this.coinBar);
    if (this.endbossBarVisible) {
      this.addToMap(this.endbossBar);
    }
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
  }

  /**
   * Renders dynamic game entities.
   */
  renderEntities() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.colectables);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws a full frame and schedules next frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.renderBackground();
    this.renderEntities();
    this.renderHud();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Renders a list of objects using addToMap.
   *
   * @param {Array<DrawableObject>} objects - Objects to render.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws one object and handles direction flip if needed.
   *
   * @param {DrawableObject} movableObject - Object to render.
   */
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

  /**
   * Applies horizontal flip transform before drawing.
   *
   * @param {DrawableObject} movableObject - Object to flip.
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Restores transform after a flipped draw call.
   *
   * @param {DrawableObject} movableObject - Object to restore.
   */
  flipImageBack(movableObject) {
    this.ctx.restore();
    movableObject.x = movableObject.x * -1;
  }
}
