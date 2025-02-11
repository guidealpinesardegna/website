export const trapFocus = (element) => {
  // get all focusable elements
  const focusableEls = element.querySelectorAll(
    "a[href]:not([disabled]), button:not([disabled])"
  );
  // Save first and last focusable elements
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  // listen for a key press
  element.addEventListener("keydown", function (e) {
    const isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

    // if the key pressed is not TAB, stop function execution
    if (!isTabPressed) {
      return;
    }

    // if shift + tab
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    }
    // else if tab
    else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
};
