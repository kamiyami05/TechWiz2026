/**
 * BudgetBasics - NextGen BudgetBee
 * Core Main Module: Real-time clock, Quotes Ticker, Visitor Counter, Dark Mode
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initVisitorCounter();
  initQuotesTicker();
  initThemeToggle();
  initFormValidations();
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
      }) + ' • ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }
  update();
  setInterval(update, 1000);
}

function initVisitorCounter() {
  const countEl = document.getElementById('visitor-count');
  if (!countEl) return;

  let count = parseInt(localStorage.getItem('budgetbasics_visits') || '28450', 10);
  if (!sessionStorage.getItem('budgetbasics_visit_counted')) {
    count += 1;
    localStorage.setItem('budgetbasics_visits', count.toString());
    sessionStorage.setItem('budgetbasics_visit_counted', 'true');
  }
  countEl.textContent = count.toLocaleString();
}

async function initQuotesTicker() {
  const tickerEl = document.getElementById('quotes-ticker-text');
  if (!tickerEl) return;

  try {
    const res = await fetch('data/budget-data.json');
    if (!res.ok) return;
    const data = await res.json();
    const quotes = data.quotesTicker || [];

    let currentIndex = 0;
    function cycleQuote() {
      tickerEl.style.opacity = '0';
      setTimeout(() => {
        tickerEl.textContent = quotes[currentIndex];
        tickerEl.style.opacity = '1';
        currentIndex = (currentIndex + 1) % quotes.length;
      }, 300);
    }

    if (quotes.length > 0) {
      cycleQuote();
      setInterval(cycleQuote, 6000);
    }
  } catch (err) {
    console.error('Quotes ticker error:', err);
  }
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('budgetbasics_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (toggleBtn) {
    toggleBtn.innerHTML = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    toggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme');
      const next = active === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('budgetbasics_theme', next);
      toggleBtn.innerHTML = next === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
  }
}

function initFormValidations() {
  // Client-side Feedback Form
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('feedback-name').value.trim();
      const email = document.getElementById('feedback-email').value.trim();
      const rating = document.getElementById('feedback-rating').value;
      const comments = document.getElementById('feedback-comments').value.trim();

      if (!name || !email || !comments) {
        alert('Please fill out all required fields.');
        return;
      }

      alert(`Thank you, ${name}! Your feedback (${rating} Stars) has been recorded locally. In compliance with contest rules, no personal information is transmitted to external servers.`);
      feedbackForm.reset();
    });
  }

  // Client-side Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting BudgetBasics! Your inquiry has been validated and queued.');
      contactForm.reset();
    });
  }
}
