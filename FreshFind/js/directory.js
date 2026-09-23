/**
 * FreshFind - Market Directory & Detail Modal Module
 * Loads markets from data/markets.json, handles filtering, sorting, and detail views.
 */

window.allMarkets = [];

document.addEventListener('DOMContentLoaded', () => {
  loadMarketsData();
  setupDirectoryFilters();
});

async function loadMarketsData() {
  const container = document.getElementById('markets-grid');
  if (!container) return;

  try {
    const res = await fetch('data/markets.json');
    if (!res.ok) throw new Error('Failed to load markets data');
    const markets = await res.json();
    window.allMarkets = markets;
    renderMarkets(markets);
    populateFilterDropdowns(markets);
  } catch (err) {
    console.error('Error loading markets:', err);
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; background: #fff; border-radius: 12px;">
        <p style="color: #dc2626; font-weight: 700;">Unable to load market directory data.</p>
        <p style="color: #64748b; font-size: 0.875rem;">Please ensure you are viewing through a local server or localhost.</p>
      </div>
    `;
  }
}

function renderMarkets(markets) {
  const container = document.getElementById('markets-grid');
  if (!container) return;

  if (markets.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: 18px; border: 1px dashed #cbd5e1;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🧺</span>
        <h4 style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">No Matching Farmers Markets Found</h4>
        <p style="color: #64748b; font-size: 0.875rem; max-width: 400px; margin: 0.5rem auto 1rem;">
          Try adjusting your area filter, selecting a different day of the week, or clearing search keywords.
        </p>
        <button id="reset-filters-btn" class="btn btn-primary" style="font-size: 0.8125rem;">Reset All Filters</button>
      </div>
    `;
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        document.getElementById('filter-area').value = 'all';
        document.getElementById('filter-day').value = 'all';
        document.getElementById('filter-produce').value = 'all';
        document.getElementById('search-input').value = '';
        renderMarkets(window.allMarkets);
      });
    }
    return;
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  container.innerHTML = markets.map(market => {
    // Check if open right now
    const isOpenToday = market.openDaysOfWeek.includes(currentDay);
    let isOpenNow = false;
    if (isOpenToday) {
      const [openH, openM] = market.openTime.split(':').map(Number);
      const [closeH, closeM] = market.closeTime.split(':').map(Number);
      const openTotal = openH * 60 + openM;
      const closeTotal = closeH * 60 + closeM;
      isOpenNow = currentMinutes >= openTotal && currentMinutes <= closeTotal;
    }

    const isBookmarked = window.BookmarksManager && window.BookmarksManager.isBookmarked('market', market.id);

    return `
      <article class="market-card" data-id="${market.id}">
        <div class="card-image-box">
          <img src="${market.image}" alt="${market.name}" loading="lazy">
          <span class="status-badge ${isOpenNow ? 'status-open' : 'status-closed'}">
            ${isOpenNow ? '● Open Now' : (isOpenToday ? '● Opens Today' : 'Closed Today')}
          </span>
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                  data-type="market" 
                  data-id="${market.id}"
                  title="${isBookmarked ? 'Remove Bookmark' : 'Save Market'}">
            ★
          </button>
        </div>

        <div class="card-body">
          <h3 class="card-title">${market.name}</h3>
          <p class="card-location">
            📍 <strong>${market.area}</strong> • ${market.address}
          </p>

          <p style="font-size: 0.8125rem; color: #475569; margin-bottom: 0.75rem; line-height: 1.45;">
            ${market.description.slice(0, 110)}...
          </p>

          <div class="card-tags">
            ${market.produceTypes.slice(0, 4).map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
          </div>

          <div class="card-footer">
            <div style="font-size: 0.75rem; color: #64748b;">
              <strong>${market.days.join(', ')}</strong><br>
              ${market.hours}
            </div>
            <button class="btn btn-outline view-market-btn" data-id="${market.id}" style="padding: 0.4rem 0.85rem; font-size: 0.8125rem;">
              Details & Map
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach Detail Modal click events
  container.querySelectorAll('.view-market-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const marketId = btn.getAttribute('data-id');
      const market = window.allMarkets.find(m => m.id === marketId);
      if (market) openMarketDetailModal(market);
    });
  });

  // Attach bookmark toggle events
  container.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type');
      if (window.BookmarksManager) {
        const item = window.allMarkets.find(m => m.id === id);
        const newState = window.BookmarksManager.toggleBookmark(type, id, item ? item.name : 'Market');
        btn.classList.toggle('active', newState);
      }
    });
  });
}

function setupDirectoryFilters() {
  const searchInput = document.getElementById('search-input');
  const areaFilter = document.getElementById('filter-area');
  const dayFilter = document.getElementById('filter-day');
  const produceFilter = document.getElementById('filter-produce');
  const sortFilter = document.getElementById('sort-by');

  function applyFilters() {
    if (!window.allMarkets) return;

    let filtered = [...window.allMarkets];
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedArea = areaFilter ? areaFilter.value : 'all';
    const selectedDay = dayFilter ? dayFilter.value : 'all';
    const selectedProduce = produceFilter ? produceFilter.value : 'all';
    const selectedSort = sortFilter ? sortFilter.value : 'name';

    // Keyword Search
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchTerm) ||
        m.area.toLowerCase().includes(searchTerm) ||
        m.address.toLowerCase().includes(searchTerm) ||
        m.produceTypes.some(p => p.toLowerCase().includes(searchTerm))
      );
    }

    // Area filter
    if (selectedArea !== 'all') {
      filtered = filtered.filter(m => m.area === selectedArea);
    }

    // Day of the week filter
    if (selectedDay !== 'all') {
      filtered = filtered.filter(m => m.days.includes(selectedDay));
    }

    // Produce type filter
    if (selectedProduce !== 'all') {
      filtered = filtered.filter(m => m.produceTypes.includes(selectedProduce));
    }

    // Sorting
    if (selectedSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'vendors') {
      filtered.sort((a, b) => b.vendorsCount - a.vendorsCount);
    }

    renderMarkets(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (areaFilter) areaFilter.addEventListener('change', applyFilters);
  if (dayFilter) dayFilter.addEventListener('change', applyFilters);
  if (produceFilter) produceFilter.addEventListener('change', applyFilters);
  if (sortFilter) sortFilter.addEventListener('change', applyFilters);
}

function populateFilterDropdowns(markets) {
  const areaSelect = document.getElementById('filter-area');
  if (areaSelect) {
    const areas = Array.from(new Set(markets.map(m => m.area)));
    areas.forEach(area => {
      const opt = document.createElement('option');
      opt.value = area;
      opt.textContent = area;
      areaSelect.appendChild(opt);
    });
  }
}

/**
 * Open Market Detail Modal with Full Weekly Timetable & Map
 */
function openMarketDetailModal(market) {
  const modal = document.getElementById('market-detail-modal');
  if (!modal) return;

  const contentBox = document.getElementById('market-modal-content');
  if (!contentBox) return;

  contentBox.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <div style="height: 220px; border-radius: 12px; overflow: hidden; margin-bottom: 1rem;">
        <img src="${market.image}" alt="${market.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <h2 style="font-size: 1.5rem; font-weight: 900; color: #0f172a; margin-bottom: 0.25rem;">${market.name}</h2>
      <p style="color: #15803d; font-weight: 700; font-size: 0.875rem; margin-bottom: 0.5rem;">
        📍 ${market.area} • ${market.address}
      </p>
      <p style="font-size: 0.875rem; color: #475569; line-height: 1.5; margin-bottom: 1.25rem;">
        ${market.description}
      </p>

      <h4 style="font-size: 0.95rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Weekly Operating Hours</h4>
      <table style="width: 100%; font-size: 0.8125rem; border-collapse: collapse; margin-bottom: 1.25rem;">
        <tbody>
          ${market.schedule.map(s => `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 0.4rem 0; font-weight: 600; color: #334155;">${s.day}</td>
              <td style="padding: 0.4rem 0; text-align: right; color: ${s.hours === 'Closed' ? '#94a3b8' : '#15803d'}; font-weight: ${s.hours === 'Closed' ? 'normal' : '700'};">
                ${s.hours}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h4 style="font-size: 0.95rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Specialty Produce & Amenities</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
        ${market.produceTypes.map(p => `<span class="tag-badge">✓ ${p}</span>`).join('')}
        ${market.features.map(f => `<span style="background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">★ ${f}</span>`).join('')}
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; font-size: 0.8125rem;">
        <p><strong>Direct Market Contact:</strong> ${market.phone} | ${market.email}</p>
        <p style="margin-top: 0.25rem;"><strong>Certified Farmers & Vendors:</strong> ${market.vendorsCount} Local Growers</p>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const closeBtn = document.getElementById('close-market-modal');
  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.remove('active');
  }

  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
  };
}
