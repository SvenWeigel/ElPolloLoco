class Character extends MovableObject {
  height = 280;
  width = 120;
  y = 80;
  speed = 8;
  energy = 100;
  currentImage = 0;
  isMoving = false;
  gameOverAudioPlayed = false;
  idleStartTime = null;
  world;
  walkAudio = new Audio("audio/walking_sound.mp3");
  jumpAudio = new Audio("audio/jump.mp3");
  hurtAudio = new Audio("audio/hurt.mp3");
  gameOverAudio = new Audio("audio/gameover.mp3");

  offset = {
    top: 110,
    left: 20,
    right: 35,
    bottom: 10,
  };

  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Creates the player character and initializes animations/audio.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.walkAudio.volume = 0.2;
    this.jumpAudio.volume = 0.3;
    this.hurtAudio.volume = 0.3;
    this.gameOverAudio.volume = 0.3;
    registerAudio(this.walkAudio);
    registerAudio(this.jumpAudio);
    registerAudio(this.hurtAudio);
    registerAudio(this.gameOverAudio);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts movement and animation update loops.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveCharacter();
    }, 1000 / 60);

    setStoppableInterval(() => {
      this.playJumpAnimation();
    }, 1000 / 60);

    setStoppableInterval(() => {
      this.playCharacterAnimation();
    }, 1000 / 10);
  }

  /**
   * Processes input-driven movement, jump and camera follow.
   */
  moveCharacter() {
    let moved = false;

    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      moved = true;
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      moved = true;
      this.otherDirection = true;
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.jumpAudio.play();
    }

    this.isMoving = moved;
    if (moved) {
      if (this.walkAudio.paused) {
        this.walkAudio.play();
      }
    } else {
      this.walkAudio.pause();
      this.walkAudio.currentTime = 0;
    }

    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks whether the character has no remaining energy.
   *
   * @returns {boolean} True if the character is dead.
   */
  playJumpAnimation() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.jumpAudio.play();
    }
  }

  /**
   * Chooses and plays the current animation state.
   */
  playCharacterAnimation() {
    if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isHurt()) {
      this.playHurtAnimation();
    } else if (this.isAboveGround()) {
      this.playJumpingAnimation();
    } else if (this.isMoving) {
      this.playWalkingAnimation();
    } else {
      this.playIdleAnimation();
    }
  }

  /**
   * Plays the death animation and game over sound.
   */
  playDeadAnimation() {
    this.idleStartTime = null;
    this.playAnimation(this.IMAGES_DEAD);
    if (!this.gameOverAudioPlayed) {
      this.gameOverAudio.play();
      this.gameOverAudioPlayed = true;
    }
  }

  /**
   * Plays the hurt animation and hurt sound.
   */
  playHurtAnimation() {
    this.idleStartTime = null;
    this.playAnimation(this.IMAGES_HURT);
    console.log(this.energy); // Debug log for energy level***********************
    if (this.hurtAudio.paused) {
      this.hurtAudio.play();
    }
  }

  /**
   * Plays the jumping animation while in air.
   */
  playJumpingAnimation() {
    this.idleStartTime = null;
    this.playAnimation(this.IMAGES_JUMPING);
  }

  /**
   * Plays the walking animation.
   */
  playWalkingAnimation() {
    this.idleStartTime = null;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Plays idle or long idle animation based on idle duration.
   */
  playIdleAnimation() {
    if (!this.idleStartTime) {
      this.idleStartTime = Date.now();
    }
    if (Date.now() - this.idleStartTime >= 5000) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Triggers a character jump.
   */
  jump() {
    this.speedY = 25;
  }
}
