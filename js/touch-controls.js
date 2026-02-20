/**
 * Attach touchstart/touchend handlers to a button that toggle a keyboard key.
 *
 * @param {HTMLElement} btn - The DOM element that receives touch events.
 * @param {string} key - The keyboard state property to toggle (e.g. 'LEFT').
 * @returns {void}
 */
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

/**
 * Initialize on-screen touch controls by wiring touch handlers to buttons.
 *
 * @returns {void}
 */
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
