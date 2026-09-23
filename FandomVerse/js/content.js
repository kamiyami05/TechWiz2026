/**
 * FandomVerse - Content Modules
 * Articles, Events, Video Trailers, and Contact Form Validation
 */

window.allArticles = [];
window.allEvents = [];
window.allTrailers = [];

document.addEventListener('DOMContentLoaded', () => {
  loadArticles();
  loadEvents();
  loadTrailers();
  initContactForm();

  window.addEventListener('fandomCategoryChanged', (e) => {
    const cat = e.detail.category;
    filterArticles(cat);
    filterEvents(cat);
    filterTrailers(cat);
  });
});

/* ==========================================================================
   Articles Module
   ========================================================================== */
async function loadArticles() {
  const container = document.getElementById('articles-grid');
  if (!container) return;

  try {
    const res = await fetch('data/articles.json');
    if (!res.ok) throw new Error('Failed to load articles');
    window.allArticles = await res.json();
    filterArticles(window.currentFandomCategory || 'all');
  } catch (err) {
    console.error('Error loading articles:', err);
  }
}

function filterArticles(cat) {
  if (!window.allArticles) return;
  const filtered = cat === 'all'
    ? window.allArticles
    : window.allArticles.filter(a => a.category === cat);
  renderArticles(filtered);
}

function renderArticles(list) {
  const container = document.getElementById('articles-grid');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
        No editorial deep-dives available for this category yet.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(a => {
    const isBookmarked = window.BookmarksManager && window.BookmarksManager.isBookmarked('article', a.id);

    return `
      <article class="article-card" data-id="${a.id}">
        <div class="article-thumb">
          <img src="${a.image}" alt="${a.title}" loading="lazy">
          <span class="cat-tag">${a.category}</span>
          <button class="bookmark-icon-btn ${isBookmarked ? 'active' : ''}" 
                  data-type="article" 
                  data-id="${a.id}"
                  title="${isBookmarked ? 'Remove' : 'Save Article'}">
            ★
          </button>
        </div>
        <div class="article-body">
          <div class="article-meta">
            <span>✍️ ${a.author}</span>
            <span>•</span>
            <span>⏱ ${a.readTime}</span>
          </div>
          <h3 class="article-title">${a.title}</h3>
          <p class="article-snippet">${a.snippet}</p>
          <button class="btn btn-outline read-article-btn" data-id="${a.id}" style="margin-top: auto; font-size: 0.8125rem;">
            Read Full Article &rarr;
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach modal trigger
  container.querySelectorAll('.read-article-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const art = window.allArticles.find(a => a.id === id);
      if (art) openArticleModal(art);
    });
  });

  // Attach bookmark toggle
  container.querySelectorAll('.bookmark-icon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type');
      if (window.BookmarksManager) {
        const item = window.allArticles.find(a => a.id === id);
        const newState = window.BookmarksManager.toggleBookmark(type, id, item ? item.title : 'Article');
        btn.classList.toggle('active', newState);
      }
    });
  });
}

function openArticleModal(art) {
  const modal = document.getElementById('article-modal');
  const content = document.getElementById('article-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="height: 240px; border-radius: 12px; overflow: hidden; margin-bottom: 1.25rem;">
      <img src="${art.image}" alt="${art.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
      <span class="cat-tag" style="position: static;">${art.category}</span>
      <span style="font-size: 0.75rem; color: var(--text-muted);">${art.date} • ${art.readTime}</span>
    </div>
    <h2 style="font-size: 1.45rem; font-weight: 900; color: #fff; margin-bottom: 0.75rem; line-height: 1.3;">
      ${art.title}
    </h2>
    <div style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 1.25rem;">
      By ${art.author}
    </div>
    <div style="font-size: 0.925rem; color: #cbd5e1; line-height: 1.7; white-space: pre-line;">
      ${art.content}
    </div>
  `;

  modal.style.display = 'flex';

  const closeBtn = document.getElementById('close-article-modal');
  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = 'none';
  }

  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}

/* ==========================================================================
   Events Module
   ========================================================================== */
async function loadEvents() {
  const container = document.getElementById('events-grid');
  if (!container) return;

  try {
    const res = await fetch('data/events.json');
    if (!res.ok) throw new Error('Failed to load events');
    window.allEvents = await res.json();
    filterEvents(window.currentFandomCategory || 'all');
  } catch (err) {
    console.error('Error loading events:', err);
  }
}

function filterEvents(cat) {
  if (!window.allEvents) return;
  const filtered = cat === 'all'
    ? window.allEvents
    : window.allEvents.filter(e => e.category === cat);
  renderEvents(filtered);
}

function renderEvents(list) {
  const container = document.getElementById('events-grid');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
        No upcoming events listed for this category.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(e => {
    const isBookmarked = window.BookmarksManager && window.BookmarksManager.isBookmarked('event', e.id);

    return `
      <div class="event-card" data-id="${e.id}">
        <div class="event-badge-row">
          <span class="event-date-pill">🗓 ${e.date}</span>
          <button class="bookmark-icon-btn ${isBookmarked ? 'active' : ''}" 
                  style="position: static;" 
                  data-type="event" 
                  data-id="${e.id}"
                  title="${isBookmarked ? 'Remove' : 'Save Event'}">
            ★
          </button>
        </div>
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--secondary); font-weight: 800; margin-bottom: 0.25rem;">
          ${e.category}
        </span>
        <h3 class="event-title">${e.title}</h3>
        <span class="event-location">📍 ${e.location}</span>
        <p class="event-desc">${e.description}</p>
        <button class="btn btn-outline bookmark-event-btn" data-id="${e.id}" style="margin-top: auto; font-size: 0.8125rem;">
          ${isBookmarked ? '★ Saved in Fandom Hub' : '⭐ Add to My Events'}
        </button>
      </div>
    `;
  }).join('');

  // Attach buttons
  container.querySelectorAll('.bookmark-icon-btn, .bookmark-event-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const item = window.allEvents.find(ev => ev.id === id);
      if (window.BookmarksManager && item) {
        const newState = window.BookmarksManager.toggleBookmark('event', id, item.title);
        filterEvents(window.currentFandomCategory || 'all');
      }
    });
  });
}

/* ==========================================================================
   Video Trailers Module
   ========================================================================== */
async function loadTrailers() {
  const container = document.getElementById('trailers-grid');
  if (!container) return;

  try {
    const res = await fetch('data/trailers.json');
    if (!res.ok) throw new Error('Failed to load trailers');
    window.allTrailers = await res.json();
    filterTrailers(window.currentFandomCategory || 'all');
  } catch (err) {
    console.error('Error loading trailers:', err);
  }
}

function filterTrailers(cat) {
  if (!window.allTrailers) return;
  const filtered = cat === 'all'
    ? window.allTrailers
    : window.allTrailers.filter(t => t.category === cat);
  renderTrailers(filtered);
}

function renderTrailers(list) {
  const container = document.getElementById('trailers-grid');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
        No video trailers available for this category.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(t => `
    <article class="trailer-card">
      <div class="trailer-thumb play-trailer-btn" data-url="${t.videoUrl}" data-title="${t.title}">
        <img src="${t.thumbnail}" alt="${t.title}" loading="lazy">
        <div class="play-overlay-btn">▶</div>
        <span class="trailer-duration">${t.duration}</span>
        <span class="cat-tag">${t.category}</span>
      </div>
      <div class="trailer-body">
        <h4 class="trailer-title">${t.title}</h4>
        <div class="trailer-meta">
          <span>📅 ${t.releaseDate} (${t.status})</span>
          <span>👁 ${t.views}</span>
        </div>
      </div>
    </article>
  `).join('');

  // Attach trailer player
  container.querySelectorAll('.play-trailer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      const title = btn.getAttribute('data-title');
      openTrailerModal(url, title);
    });
  });
}

function openTrailerModal(videoUrl, title) {
  const modal = document.getElementById('trailer-modal');
  const titleEl = document.getElementById('trailer-modal-title');
  const playerWrap = document.getElementById('trailer-player-wrap');
  if (!modal || !playerWrap) return;

  if (titleEl) titleEl.textContent = title;
  playerWrap.innerHTML = `
    <iframe src="${videoUrl}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;

  modal.style.display = 'flex';

  const closeBtn = document.getElementById('close-trailer-modal');
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = 'none';
      playerWrap.innerHTML = '';
    };
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      playerWrap.innerHTML = '';
    }
  };
}

/* ==========================================================================
   Contact Form Validation
   Client-side validation per SRS Section 1.5 Constraints
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('fandom-contact-form');
  const alertBox = document.getElementById('contact-alert-msg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const category = document.getElementById('contact-cat')?.value;
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showAlert('Please complete all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Success response without server reliance
    showAlert(`Thank you, ${name}! Your fandom submission regarding [${category}] has been received. Our moderator team will review it.`, 'success');
    form.reset();
  });

  function showAlert(msg, type) {
    if (!alertBox) {
      alert(msg);
      return;
    }
    alertBox.textContent = msg;
    alertBox.style.display = 'block';
    alertBox.style.padding = '0.75rem 1rem';
    alertBox.style.borderRadius = '8px';
    alertBox.style.marginBottom = '1rem';
    alertBox.style.fontSize = '0.85rem';
    alertBox.style.fontWeight = '700';

    if (type === 'error') {
      alertBox.style.background = 'rgba(239, 68, 68, 0.2)';
      alertBox.style.color = '#fca5a5';
      alertBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
    } else {
      alertBox.style.background = 'rgba(34, 197, 94, 0.2)';
      alertBox.style.color = '#86efac';
      alertBox.style.border = '1px solid rgba(34, 197, 94, 0.4)';
    }
  }
}
