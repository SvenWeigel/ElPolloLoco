/**
 * Initialize keyboard event listeners and update the shared `keyboard` state.
 *
 * Listens for `keydown` and `keyup` events and toggles properties on the
 * global `keyboard` object used by the game loop (`LEFT`, `RIGHT`, `UP`,
 * `DOWN`, `SPACE`, `D`).
 *
 * @returns {void}
 */
function initKeyboardListeners() {
  window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight") keyboard.RIGHT = true;
    if (e.code == "ArrowLeft") keyboard.LEFT = true;
    if (e.code == "ArrowUp") keyboard.UP = true;
    if (e.code == "ArrowDown") keyboard.DOWN = true;
    if (e.code == "Space") keyboard.SPACE = true;
    if (e.code == "KeyD") keyboard.D = true;
  });

  window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight") keyboard.RIGHT = false;
    if (e.code == "ArrowLeft") keyboard.LEFT = false;
    if (e.code == "ArrowUp") keyboard.UP = false;
    if (e.code == "ArrowDown") keyboard.DOWN = false;
    if (e.code == "Space") keyboard.SPACE = false;
    if (e.code == "KeyD") keyboard.D = false;
  });
}
