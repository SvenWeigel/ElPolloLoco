function initTouchControls() {
  const leftBtn = document.getElementById("left-btn");
  if (leftBtn) {
    leftBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    });
    leftBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    });
  }

  const rightBtn = document.getElementById("right-btn");
  if (rightBtn) {
    rightBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    });
    rightBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    });
  }

  const jumpBtn = document.getElementById("jump-btn");
  if (jumpBtn) {
    jumpBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
    });
    jumpBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.SPACE = false;
    });
  }

  const throwBtn = document.getElementById("throw-btn");
  if (throwBtn) {
    throwBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.D = true;
    });
    throwBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.D = false;
    });
  }
}
