class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Loads a single image and assigns it to the object.
   *
   * @param {string} path - Image source path.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object image on the given rendering context.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Preloads multiple images into the cache.
   *
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Advances and displays the next frame from a frame list.
   *
   * @param {string[]} images - Array of animation frame paths.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Draws a debug frame around selected object types.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof ChickenSmall ||
      this instanceof Coin ||
      this instanceof Bottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom,
      );
      ctx.stroke();
    }
  }

  /**
   * Calculates the index level based on the current percentage value.
   * Maps percentage ranges to index values from 0 to 5.
   * 
   * @returns {number} The index level:
   *                   - 5 if percentage equals 100
   *                   - 4 if percentage >= 80
   *                   - 3 if percentage >= 60
   *                   - 2 if percentage >= 40
   *                   - 1 if percentage >= 20
   *                   - 0 if percentage < 20
   */
  percentageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Selects and sets an image based on the given percentage value.
   * 
   * @param {number} percentage - The percentage value used to determine which image to display (0-100).
   *                              This value is used to resolve the appropriate image index.
   * @returns {void}
   */
  chooseImageIndexoFromPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
