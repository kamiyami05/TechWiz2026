/**
 * FreshFind - Core Application Logic
 * Implements Real-time Clock, Visitor Counter, Geolocation & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initRealtimeClock();
  initVisitorCounter();
  initMobileNavigation();
  initDummyAuthModal();
});

/**
 * Real-Time Clock & Dynamic "Open Right Now" Status Engine
 */
function initRealtimeClock() {
  const clockElement = document.getElementById('live-clock');
  const openCountElement = document.getElementById('live-open-count');

  function updateClock() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = days[now.getDay()];

    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

    if (clockElement) {
      clockElement.textContent = `${currentDayName}, ${dateStr} • ${timeStr}`;
    }

    // Update open markets counter dynamically if window.allMarkets exists
    if (window.allMarkets && openCountElement) {
      const currentDay = now.getDay();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const openNowList = window.allMarkets.filter(market => {
        if (!market.openDaysOfWeek.includes(currentDay)) return false;
        const [openH, openM] = market.openTime.split(':').map(Number);
        const [closeH, closeM] = market.closeTime.split(':').map(Number);
        const openTotal = openH * 60 + openM;
        const closeTotal = closeH * 60 + closeM;
        return currentMinutes >= openTotal && currentMinutes <= closeTotal;
      });

      openCountElement.textContent = `${openNowList.length} Market${openNowList.length !== 1 ? 's' : ''} Open Today`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * Simulated Visitor Counter with LocalStorage Persistence
 */
function initVisitorCounter() {
  const countDisplay = document.getElementById('visitor-count');
  if (!countDisplay) return;

  let currentCount = parseInt(localStorage.getItem('freshfind_visitor_count') || '14280', 10);
  
  // Increment visit counter per session visit
  if (!sessionStorage.getItem('freshfind_session_counted')) {
    currentCount += 1;
    localStorage.setItem('freshfind_visitor_count', currentCount.toString());
    sessionStorage.setItem('freshfind_session_counted', 'true');
  }

  // Format with commas (e.g. 14,281)
  countDisplay.textContent = currentCount.toLocaleString();
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/**
 * Dummy Login / Signup Modals for Design Continuity (per SRS 1.6)
 */
function initDummyAuthModal() {
  const authModal = document.getElementById('auth-modal');
  const authButtons = document.querySelectorAll('.trigger-auth');
  const closeAuthBtn = document.getElementById('close-auth-modal');
  const authForm = document.getElementById('dummy-auth-form');

  if (!authModal) return;

  authButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      authModal.classList.add('active');
    });
  });

  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', () => {
      authModal.classList.remove('active');
    });
  }

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.remove('active');
    }
  });

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Welcome to FreshFind! (UI Demonstration: In compliance with Web Innovation Unleashed constraints, no personal server session is stored.)');
      authModal.classList.remove('active');
    });
  }
}
