/**
 * Smoothly scrolls to a section ID with precise sticky header offset.
 * Handles desktop and mobile sticky header dimensions dynamically.
 * 
 * @param {string} targetId - Element ID or hash (e.g. 'find-market', '#directory', 'top')
 * @param {number} extraPadding - Extra buffer space in px below the header (default 16)
 */
export const scrollToSection = (targetId, extraPadding = 16) => {
  const id = (targetId || '').replace('#', '').trim();

  // Scroll to absolute top if target is top, home, or empty
  if (!id || id === 'top' || id === 'home') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  // Dynamically calculate sticky header height
  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 88;
  const totalOffset = headerHeight + extraPadding;

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = el.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = Math.max(0, elementPosition - totalOffset);

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};
