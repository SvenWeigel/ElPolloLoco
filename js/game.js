let canvas;
let world;
let keyboard = new Keyboard();
let allAudioElements = [];
let allIntervalIds = [];
let isMuted = false;

function registerAudio(audio) {
  if (!audio) {
    return audio;
  }
  audio.muted = isMuted;
  allAudioElements.push(audio);
  return audio;
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  allIntervalIds.push(id);
  return id;
}

function clearAllIntervals() {
  allIntervalIds.forEach((id) => clearInterval(id));
  allIntervalIds = [];
}

function stopAllAudio() {
  allAudioElements.forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
  allAudioElements = [];
}

function init() {
  canvas = document.getElementById("canvas");
  level();
  world = new World(canvas, keyboard);
}

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
