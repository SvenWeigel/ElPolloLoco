function addTouchHandlers(btn, key) {
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard[key] = true;
  });
  btn.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard[key] = false;
  });
}

function initTouchControls() {
  const leftBtn = document.getElementById("left-btn");
  if (leftBtn) addTouchHandlers(leftBtn, "LEFT");

  const rightBtn = document.getElementById("right-btn");
  if (rightBtn) addTouchHandlers(rightBtn, "RIGHT");

  const jumpBtn = document.getElementById("jump-btn");
  if (jumpBtn) addTouchHandlers(jumpBtn, "SPACE");

  const throwBtn = document.getElementById("throw-btn");
  if (throwBtn) addTouchHandlers(throwBtn, "D");
}
