/**
 * Renders static/parallax background layers.
 *
 * @this {World}
 * @returns {void}
 */
World.prototype.renderBackground = function () {
  this.ctx.translate(this.camera_x, 0);
  this.addObjectsToMap(this.level.backgroundObjects);
  this.ctx.translate(-this.camera_x, 0);
};

/**
 * Renders HUD elements.
 *
 * @this {World}
 * @returns {void}
 */
World.prototype.renderHud = function () {
  this.addToMap(this.coinBar);
  if (this.endbossBarVisible) {
    this.addToMap(this.endbossBar);
  }
  this.addToMap(this.bottleBar);
  this.addToMap(this.statusBar);
};

/**
 * Renders dynamic game entities.
 *
 * @this {World}
 * @returns {void}
 */
World.prototype.renderEntities = function () {
  this.ctx.translate(this.camera_x, 0);
  this.addObjectsToMap(this.level.clouds);
  this.addObjectsToMap(this.level.colectables);
  this.addObjectsToMap(this.level.enemies);
  this.addObjectsToMap(this.throwableObjects);
  this.addToMap(this.character);
  this.ctx.translate(-this.camera_x, 0);
};

/**
 * Draws a full frame and schedules the next frame.
 *
 * @this {World}
 * @returns {void}
 */
World.prototype.draw = function () {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  this.renderBackground();
  this.renderEntities();
  this.renderHud();
  requestAnimationFrame(() => this.draw());
};

/**
 * Renders a list of objects using `addToMap`.
 *
 * @this {World}
 * @param {Array<DrawableObject>} objects - Objects to render.
 * @returns {void}
 */
World.prototype.addObjectsToMap = function (objects) {
  objects.forEach((o) => {
    this.addToMap(o);
  });
};

/**
 * Draws one object and handles direction flip if needed.
 *
 * @this {World}
 * @param {DrawableObject} movableObject - Object to render.
 * @returns {void}
 */
World.prototype.addToMap = function (movableObject) {
  if (movableObject.otherDirection) {
    this.flipImage(movableObject);
  }
  movableObject.draw(this.ctx);
  // movableObject.drawFrame(this.ctx);

  if (movableObject.otherDirection) {
    this.flipImageBack(movableObject);
  }
};

/**
 * Applies horizontal flip transform before drawing.
 *
 * @this {World}
 * @param {DrawableObject} movableObject - Object to flip.
 * @returns {void}
 */
World.prototype.flipImage = function (movableObject) {
  this.ctx.save();
  this.ctx.translate(movableObject.width, 0);
  this.ctx.scale(-1, 1);
  movableObject.x = movableObject.x * -1;
};

/**
 * Restores transform after a flipped draw call.
 *
 * @this {World}
 * @param {DrawableObject} movableObject - Object to restore.
 * @returns {void}
 */
World.prototype.flipImageBack = function (movableObject) {
  this.ctx.restore();
  movableObject.x = movableObject.x * -1;
};