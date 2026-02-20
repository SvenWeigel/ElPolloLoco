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
 * Save the muted state to localStorage.
 * Beginner-friendly: stores string "true" or "false".
 *
 * @param {boolean} muted - true when muted, false otherwise
 * @returns {void}
 */
function saveMute(muted) {
  try {
    localStorage.setItem("el_pollo_muted", muted ? "true" : "false");
    const icon = muted
      ? "assets/icons/mute_btn.svg"
      : "assets/icons/unmute.svg";
    localStorage.setItem("el_pollo_mute_icon", icon);
  } catch (e) {}
}

/**
 * Load the muted state from localStorage.
 * Returns false if nothing stored or on error.
 *
 * @returns {boolean} muted state
 */
function loadMute() {
  try {
    return localStorage.getItem("el_pollo_muted") === "true";
  } catch (e) {
    return false;
  }
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
  setupInitialUI();
  init();
}

/**
 * Toggles global mute state for all registered audio elements.
 *
 * @returns {void}
 */
function muteGame() {
  isMuted = !isMuted;
  for (let i = 0; i < allAudioElements.length; i++) {
    const audio = allAudioElements[i];
    if (audio) audio.muted = isMuted;
  }
  const muteBtn = document.getElementById("mute-btn");
  if (muteBtn) {
    muteBtn.src = isMuted
      ? "assets/icons/mute_btn.svg"
      : "assets/icons/unmute.svg";
  }
  saveMute(isMuted);
}

/**
 * Returns to the main menu by clearing game state and showing the start screen.
 *
 * @returns {void}
 */

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



/**
 * Initialize `isMuted` and the mute button state from `localStorage`.
 *
 * Reads `el_pollo_muted` and `el_pollo_mute_icon` and applies the stored
 * values to the global state and the DOM mute button.
 *
 * @returns {void}
 */
function initMuteFromStorage() {
  isMuted = loadMute();
  const muteBtn = document.getElementById("mute-btn");
  if (muteBtn) {
    const storedIcon = localStorage.getItem("el_pollo_mute_icon");
    if (storedIcon) {
      muteBtn.src = storedIcon;
    } else {
      muteBtn.src = isMuted ? "assets/icons/mute_btn.svg" : "assets/icons/unmute.svg";
    }
  }
}

/**
 * Apply the current `isMuted` value to all registered audio elements.
 *
 * Ensures audio elements that were registered before the mute state was
 * determined are updated to match the current global mute setting.
 *
 * @returns {void}
 */
function syncRegisteredAudioMute() {
  for (let i = 0; i < allAudioElements.length; i++) {
    const audio = allAudioElements[i];
    if (audio) audio.muted = isMuted;
  }
}


window.addEventListener("DOMContentLoaded", () => {
  setupInitialUI();
});

/**
 * Small DOM-dependent initialization used at startup and when entering the
 * gameplay screen. Safe to call multiple times.
 *
 * @returns {void}
 */
function setupInitialUI() {
  initMuteFromStorage();
  syncRegisteredAudioMute();
  initTouchControls();
  if (typeof initKeyboardListeners === 'function') {
    initKeyboardListeners();
  }
}
