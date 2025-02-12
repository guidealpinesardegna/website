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

export const sortActivities = (activities) => {
  const today = new Date(); // Set today's date

  // Separate activities with and without dateStart
  let activitiesWithDate = [];
  let activitiesWithoutDate = [];

  activities.forEach((activity) => {
    if (activity.fields.dateStart) {
      const dateStart = new Date(activity.fields.dateStart);
      if (dateStart >= today) {
        activitiesWithDate.push(activity);
      }
    } else {
      activitiesWithoutDate.push(activity);
    }
  });

  // Sort activities by dateStart in ascending order
  activitiesWithDate.sort(
    (a, b) => new Date(a.fields.dateStart) - new Date(b.fields.dateStart)
  );
  activitiesWithoutDate.sort((a, b) =>
    a.fields.title.localeCompare(b.fields.title)
  );

  // Concatenate sorted activities with those without dateStart
  return [...activitiesWithDate, ...activitiesWithoutDate];
};
