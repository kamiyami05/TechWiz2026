/**
 * FandomVerse - Character Profiles Showcase
 * Loads 35+ character profiles across 7 categories from data/characters.json
 */

window.allCharacters = [];

document.addEventListener('DOMContentLoaded', () => {
  loadCharacters();

  window.addEventListener('fandomCategoryChanged', (e) => {
    filterCharacters(e.detail.category);
  });
});

async function loadCharacters() {
  const container = document.getElementById('characters-grid');
  if (!container) return;

  try {
    const res = await fetch('data/characters.json');
    if (!res.ok) throw new Error('Failed to load characters');
    const list = await res.json();
    window.allCharacters = list;
    filterCharacters(window.currentFandomCategory || 'all');
  } catch (err) {
    console.error('Error loading characters:', err);
  }
}

function filterCharacters(category) {
  if (!window.allCharacters) return;
  const filtered = category === 'all' 
    ? window.allCharacters 
    : window.allCharacters.filter(c => c.category === category);
  renderCharacters(filtered);
}

function renderCharacters(list) {
  const container = document.getElementById('characters-grid');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
        No character profiles found for this category.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(c => {
    const isBookmarked = window.BookmarksManager && window.BookmarksManager.isBookmarked('character', c.id);

    return `
      <article class="character-card" data-id="${c.id}">
        <div class="character-thumb">
          <img src="${c.image}" alt="${c.name}" loading="lazy">
          <span class="cat-tag">${c.category}</span>
          <button class="bookmark-icon-btn ${isBookmarked ? 'active' : ''}" 
                  data-type="character" 
                  data-id="${c.id}"
                  title="${isBookmarked ? 'Remove' : 'Save Character'}">
            ★
          </button>
        </div>

        <div class="character-body">
          <h3 class="character-name">${c.name}</h3>
          <span class="character-series">${c.series}</span>
          <p class="character-bio">${c.bio}</p>

          <div class="traits-box">
            ${c.traits.map(t => `<span class="trait-pill">⚡ ${t}</span>`).join('')}
          </div>

          <button class="btn btn-outline view-char-btn" data-id="${c.id}" style="margin-top: 1rem; width: 100%; font-size: 0.8125rem;">
            Full Lore & Bio &rarr;
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach modal trigger
  container.querySelectorAll('.view-char-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const char = window.allCharacters.find(c => c.id === id);
      if (char) openCharacterModal(char);
    });
  });

  // Attach bookmark toggle
  container.querySelectorAll('.bookmark-icon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type');
      if (window.BookmarksManager) {
        const item = window.allCharacters.find(c => c.id === id);
        const newState = window.BookmarksManager.toggleBookmark(type, id, item ? item.name : 'Character');
        btn.classList.toggle('active', newState);
      }
    });
  });
}

function openCharacterModal(c) {
  const modal = document.getElementById('char-modal');
  const content = document.getElementById('char-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="height: 250px; border-radius: 12px; overflow: hidden; margin-bottom: 1.25rem;">
      <img src="${c.image}" alt="${c.name}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <h2 style="font-size: 1.6rem; font-weight: 900; color: #fff;">${c.name}</h2>
      <span class="cat-tag" style="position: static;">${c.category}</span>
    </div>
    <h4 style="color: var(--accent-cyan); font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem;">
      ${c.series} (${c.franchise})
    </h4>
    <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
      ${c.bio}
    </p>

    <h4 style="font-size: 0.875rem; font-weight: 800; text-transform: uppercase; color: #c7d2fe; margin-bottom: 0.5rem;">
      Signature Abilities & Power Traits
    </h4>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
      ${c.traits.map(t => `<span class="trait-pill" style="padding: 0.35rem 0.75rem; font-size: 0.8125rem;">⚡ ${t}</span>`).join('')}
    </div>
  `;

  modal.style.display = 'flex';

  const closeBtn = document.getElementById('close-char-modal');
  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = 'none';
  }

  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}
