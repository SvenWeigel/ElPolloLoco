let canvas;
let world;
let keyboard = new Keyboard();
let allAudioElements = [];
let isMuted = false;

function registerAudio(audio) {
  if (!audio) {
    return audio;
  }

  audio.muted = isMuted;
  allAudioElements.push(audio);
  return audio;
}

function init() {
  canvas = document.getElementById("canvas");
  level();
  world = new World(canvas, keyboard);
}

function restartGame() {
  allAudioElements = [];
  isMuted = false;
  hideStartScreen();
}

function hideStartScreen() {
  const startScreen = document.getElementById("start-screen");
  startScreen.classList.add("d-none");
  const headline = document.querySelector("h1");
  headline.classList.add("hidden");
  document.getElementById("mute-btn").classList.remove("d-none");
  init();
}

function muteGame() {
  isMuted = !isMuted;
  allAudioElements.forEach((audio) => {
    if (audio) {
      audio.muted = isMuted;
    }
  });
}

function youWin() {
  const winScreen = document.getElementById("you-win");
  if (winScreen) {
    winScreen.style.display = "flex";
    document.getElementById("restart-btn-div").classList.remove("d-none");
  }
}

function youLose() {
  const loseScreen = document.getElementById("game-over");
  if (loseScreen) {
    loseScreen.style.display = "flex";
    document.getElementById("restart-btn-div").classList.remove("d-none");
  }
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
