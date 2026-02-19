let canvas;
let world;
let keyboard = new Keyboard();
let allAudioElements = [];
let allIntervalIds = [];
let isMuted = false;
winSound = new Audio("audio/win_sound.mp3");
deadBossSound = new Audio("audio/dead_boss.mp3");

/**
 * Registers an audio instance for global mute/stop handling.
 *
 * @param {HTMLAudioElement|null|undefined} audio - Audio object to register.
 * @returns {HTMLAudioElement|null|undefined} The same audio reference.
 */
function registerAudio(audio) {
  if (!audio) {
    return audio;
  }
  audio.muted = isMuted;
  allAudioElements.push(audio);
  return audio;
}

/**
 * Creates an interval and tracks its id so it can be cleared later.
 *
 * @param {Function} fn - Callback executed on each interval tick.
 * @param {number} time - Interval duration in milliseconds.
 * @returns {number} The created interval id.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  allIntervalIds.push(id);
  return id;
}

/**
 * Clears every tracked interval and resets the interval list.
 *
 * @returns {void}
 */
function clearAllIntervals() {
  allIntervalIds.forEach((id) => clearInterval(id));
  allIntervalIds = [];
}

/**
 * Pauses and rewinds all registered audio elements.
 *
 * @returns {void}
 */
function stopAllAudio() {
  allAudioElements.forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
  allAudioElements = [];
}

/**
 * Initializes the game world and level.
 *
 * @returns {void}
 */
function init() {
  canvas = document.getElementById("canvas");
  level();
  world = new World(canvas, keyboard);
}

/**
 * Restarts the current game state without reloading the page.
 *
 * @returns {void}
 */
function restartGame() {
  clearAllIntervals();
  stopAllAudio();
  document.getElementById("you-win").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  document.getElementById("restart-btn-div").classList.add("d-none");
  keyboard = new Keyboard();
  level();
  world = new World(canvas, keyboard);
}

/**
 * Hides the start screen and starts the game.
 *
 * @returns {void}
 */
function hideStartScreen() {
  const startScreen = document.getElementById("start-screen");
  startScreen.classList.add("d-none");
  const headline = document.querySelector("h1");
  headline.classList.add("hidden");
  const restartBtn = document.getElementById("restart-icon");
  restartBtn.classList.remove("d-none");
  const muteBtn = document.getElementById("mute-btn");
  muteBtn.classList.remove("d-none");
  const footer = document.querySelector("footer");
  footer.classList.add("d-none");
  init();
}

/**
 * Toggles global mute state for all registered audio elements.
 *
 * @returns {void}
 */
function muteGame() {
  isMuted = !isMuted;
  allAudioElements.forEach((audio) => {
    if (audio) {
      audio.muted = isMuted;
    }
    if (!isMuted) {
      document.getElementById("mute-btn").src = "assets/icons/mute_btn.svg";
    } else {
      document.getElementById("mute-btn").src = "assets/icons/unmute.svg";
    }
  });
}

function goToMainMenu() {
  clearAllIntervals();
  stopAllAudio();
  document.getElementById("you-win").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  document.getElementById("restart-btn-div").classList.add("d-none");
  const startScreen = document.getElementById("start-screen");
  startScreen.classList.remove("d-none");
  const headline = document.querySelector("h1");
  headline.classList.remove("hidden");
  const restartBtn = document.getElementById("restart-icon");
  restartBtn.classList.add("d-none");
  const muteBtn = document.getElementById("mute-btn");
  muteBtn.classList.add("d-none");
  const footer = document.querySelector("footer");
  footer.classList.remove("d-none");
}

/**
 * Toggles visibility of the on-screen mobile controls.
 *
 * @returns {void}
 */
function toggleMobileControls() {
  let mobileControll = document.getElementById("mobile-controll");
  mobileControll.classList.toggle("d-none");
}

/**
 * Handles the win sequence (audio, stop loops, show win overlay).
 *
 * @returns {void}
 */
function youWin() {
  const winScreen = document.getElementById("you-win");
  if (winScreen) {
    this.deadBossSound.play();
    this.deadBossSound.volume = 0.3;
    registerAudio(this.deadBossSound);
    setTimeout(() => {
      clearAllIntervals();
      this.winSound.play();
      registerAudio(this.winSound);
      this.winSound.volume = 0.3;
      winScreen.style.display = "flex";
      document.getElementById("restart-btn-div").classList.remove("d-none");
    }, 1000);
  }
}

/**
 * Handles the lose sequence (show lose overlay and stop loops).
 *
 * @returns {void}
 */
function youLose() {
  const loseScreen = document.getElementById("game-over");
  if (loseScreen) {
    loseScreen.style.display = "flex";
    document.getElementById("restart-btn-div").classList.remove("d-none");
  }
  setTimeout(() => {
    clearAllIntervals();
    loseScreen.style.display = "flex";
    document.getElementById("restart-btn-div").classList.remove("d-none");
  }, 1000);
}

window.addEventListener("keydown", (e) => {
  if (e.code == "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (e.code == "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (e.code == "ArrowUp") {
    keyboard.UP = true;
  }

  if (e.code == "ArrowDown") {
    keyboard.DOWN = true;
  }

  if (e.code == "Space") {
    keyboard.SPACE = true;
  }

  if (e.code == "KeyD") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code == "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (e.code == "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (e.code == "ArrowUp") {
    keyboard.UP = false;
  }

  if (e.code == "ArrowDown") {
    keyboard.DOWN = false;
  }

  if (e.code == "Space") {
    keyboard.SPACE = false;
  }

  if (e.code == "KeyD") {
    keyboard.D = false;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("left-btn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("left-btn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("right-btn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("right-btn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("jump-btn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("jump-btn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("throw-btn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("throw-btn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
});
