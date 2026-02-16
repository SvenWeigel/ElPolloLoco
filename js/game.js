let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    level();
    world = new World(canvas, keyboard);
}


function hideStartScreen() {
  const startScreen = document.getElementById('start-screen');
  startScreen.classList.add('d-none');
  document.getElementById('fullscreen-btn').classList.remove('d-none');
  init();
}

function fullscreen() {
    document.getElementById("canvas").requestFullscreen();
}

function muteGame() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.muted = !audio.muted;
    });
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
     
     
