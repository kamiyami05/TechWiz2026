/**
 * FandomVerse - Core Main Script
 * Clock, Visitor Counter, Category Filter Bus, Dummy Auth
 */

window.currentFandomCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initVisitorCounter();
  initCategoryPills();
  initDummyAuth();
});

function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  function update() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ' • ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC';
    }
  }
  update();
  setInterval(update, 1000);
}

function initVisitorCounter() {
  const countEl = document.getElementById('visitor-count');
  if (!countEl) return;

  let count = parseInt(localStorage.getItem('fandomverse_visits') || '56920', 10);
  if (!sessionStorage.getItem('fandomverse_session_counted')) {
    count += 1;
    localStorage.setItem('fandomverse_visits', count.toString());
    sessionStorage.setItem('fandomverse_session_counted', 'true');
  }
  countEl.textContent = count.toLocaleString();
}

function initCategoryPills() {
  const pills = document.querySelectorAll('.cat-pill-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const cat = pill.getAttribute('data-category');
      window.currentFandomCategory = cat;

      // Broadcast custom event so all modules (characters, events, merch, trailers) update together
      window.dispatchEvent(new CustomEvent('fandomCategoryChanged', { detail: { category: cat } }));
    });
  });
}

function initDummyAuth() {
  const authBtns = document.querySelectorAll('.trigger-auth');
  const authModal = document.getElementById('auth-modal');
  const closeBtn = document.getElementById('close-auth-modal');
  const form = document.getElementById('dummy-auth-form');

  if (!authModal) return;

  authBtns.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      authModal.style.display = 'flex';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      authModal.style.display = 'none';
    });
  }

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.style.display = 'none';
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Welcome, Fandom Citizen! (UI demonstration per SRS 1.6 - no backend session storage).');
      authModal.style.display = 'none';
    });
  }
}
