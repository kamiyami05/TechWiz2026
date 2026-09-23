/**
 * FreshFind - Produce Guide & Seasonal Recommendations Module
 * Loads produce from data/produce.json, filters by category and season.
 */

window.allProduce = [];

document.addEventListener('DOMContentLoaded', () => {
  loadProduceData();
  setupProduceCategoryFilters();
});

async function loadProduceData() {
  const container = document.getElementById('produce-grid');
  if (!container) return;

  try {
    const res = await fetch('data/produce.json');
    if (!res.ok) throw new Error('Failed to load produce data');
    const produceList = await res.json();
    window.allProduce = produceList;
    renderProduce(produceList);
  } catch (err) {
    console.error('Error loading produce:', err);
  }
}

function renderProduce(produceList) {
  const container = document.getElementById('produce-grid');
  if (!container) return;

  if (produceList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; background: #fff; border-radius: 12px;">
        <p style="color: #64748b;">No produce items match this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = produceList.map(item => {
    const isBookmarked = window.BookmarksManager && window.BookmarksManager.isBookmarked('produce', item.id);

    return `
      <article class="produce-card" data-id="${item.id}">
        <div class="produce-thumb">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="produce-content">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;">
            <h4 class="produce-title">${item.name}</h4>
            <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                    data-type="produce" 
                    data-id="${item.id}"
                    title="${isBookmarked ? 'Remove' : 'Save to Favorites'}"
                    style="position: static; width: 28px; height: 28px; font-size: 0.9rem;">
              ★
            </button>
          </div>
          <span class="produce-season">🗓 Season: ${item.season}</span>
          <p class="produce-desc">${item.description}</p>
          
          <div class="produce-nutrition">
            <strong>Nutrition:</strong> ${item.nutrition}
          </div>

          <div style="font-size: 0.75rem; color: #475569; margin-bottom: 0.75rem;">
            <strong>💡 Storage:</strong> ${item.storageTip}
          </div>

          <div style="margin-top: auto; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; font-size: 0.75rem;">
            <span style="color: #15803d; font-weight: 700;">Find at Markets:</span>
            <p style="color: #64748b; line-height: 1.35; margin-top: 0.2rem;">
              ${item.availableMarkets.join(' • ')}
            </p>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach bookmark handlers
  container.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type');
      if (window.BookmarksManager) {
        const item = window.allProduce.find(p => p.id === id);
        const newState = window.BookmarksManager.toggleBookmark(type, id, item ? item.name : 'Produce');
        btn.classList.toggle('active', newState);
      }
    });
  });
}

function setupProduceCategoryFilters() {
  const buttons = document.querySelectorAll('.produce-cat-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active', 'btn-primary'));
      buttons.forEach(b => b.classList.add('btn-outline'));
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline');

      const cat = btn.getAttribute('data-category');
      if (!window.allProduce) return;

      if (cat === 'all') {
        renderProduce(window.allProduce);
      } else {
        const filtered = window.allProduce.filter(p => p.category === cat);
        renderProduce(filtered);
      }
    });
  });
}
