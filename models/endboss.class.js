class Endboss extends MovableObject {
  energy = 80;
  maxEnergy = 80;
  height = 400;
  width = 250;
  y = 50;
  hurtSound = new Audio("audio/hurt_boss.mp3");
  startX = 2000;
  attackTriggerX = 1400;
  attackDuration = 2000;
  attackCooldown = 1000;
  isAwake = false;
  isAttackingPhase = false;
  isRetreating = false;
  attackStartedAt = 0;
  nextAttackAt = 0;
  isMoving = false;

  offset = {
    top: 0,
    left: 40,
    right: 0,
    bottom: 0,
  };

  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates the endboss and initializes animation/audio state.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 6;
    this.x = this.startX;
    this.nextAttackAt = Date.now() + this.attackCooldown;
    registerAudio(this.hurtSound);
    this.animate();
  }

  /**
   * Activates the endboss once it has been seen by the player.
   */
  activate() {
    if (this.isAwake) {
      return;
    }
    this.isAwake = true;
    this.nextAttackAt = Date.now() + 800;
  }

  /**
   * Starts movement and animation intervals for the endboss.
   */
  animate() {
    setStoppableInterval(() => {
      if (this.isDead() || this.isHurt() || !this.isAwake) {
        this.isMoving = false;
        return;
      }
      this.updateAttackCycle();
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.applyGravity();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.hurtSound.volume = 0.3;
        this.hurtSound.play();
      } else if (!this.isAwake) {
        this.playAnimation(this.IMAGES_ALERT);
      } else {
        if (this.isMoving) {
          this.playAnimation(this.IMAGES_WALKING);
        } else {
          this.playAnimation(this.IMAGES_ALERT);
        }
      }
    }, 140);
  }

  /**
   * Checks whether the endboss is dead.
   *
   * @returns {boolean} True if no energy remains.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Indicates whether the endboss is currently in attack phase.
   *
   * @returns {boolean} True while attacking.
   */
  attacking() {
    return this.isAttackingPhase;
  }

  /**
   * Updates attack cycle state (approach/attack/retreat).
   */
  updateAttackCycle() {
    this.isMoving = false;
    const now = Date.now();
    if (this.isRetreating) {
      this.handleRetreating(now);
      return;
    }
    if (this.isAttackingPhase) {
      this.handleAttacking(now);
      return;
    }
    if (now >= this.nextAttackAt) {
      this.handleApproaching();
    }
  }

  /**
   * Handles retreat movement until start position is reached.
   *
   * @param {number} now - Current timestamp.
   */
  handleRetreating(now) {
    this.isMoving = true;
    this.moveAwayFromPlayer();
    if (this.x >= this.startX) {
      this.x = this.startX;
      this.isRetreating = false;
      this.nextAttackAt = now + this.attackCooldown;
    }
  }

  /**
   * Handles active attack movement and attack timeout.
   *
   * @param {number} now - Current timestamp.
   */
  handleAttacking(now) {
    this.isMoving = true;
    this.moveTowardPlayer();
    if (now - this.attackStartedAt >= this.attackDuration) {
      this.isAttackingPhase = false;
      this.isRetreating = true;
    }
  }

  /**
   * Handles movement into attack range.
   */
  handleApproaching() {
    if (this.x > this.attackTriggerX) {
      this.isMoving = true;
      this.moveTowardPlayer();
    } else {
      this.isAttackingPhase = true;
      this.attackStartedAt = Date.now();
    }
  }

  /**
   * Moves the endboss toward the player area.
   */
  moveTowardPlayer() {
    if (this.x > 100) {
      this.x -= this.speed;
    }
  }

  /**
   * Moves the endboss back to its starting position.
   */
  moveAwayFromPlayer() {
    if (this.x < this.startX) {
      this.x += this.speed;
    }
  }
}
