/**
 * FreshFind - Content Bookmarking & Notes System
 * Persists favorites in LocalStorage, personal notes in SessionStorage,
 * exports formatted shopping lists, and handles sharing.
 */

window.BookmarksManager = {
  storageKey: 'freshfind_bookmarks',
  notesKey: 'freshfind_session_notes',

  getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  },

  isBookmarked(type, id) {
    const list = this.getBookmarks();
    return list.some(item => item.type === type && item.id === id);
  },

  toggleBookmark(type, id, title) {
    let list = this.getBookmarks();
    const existingIndex = list.findIndex(item => item.type === type && item.id === id);

    if (existingIndex > -1) {
      list.splice(existingIndex, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(list));
      this.renderBookmarksUI();
      return false;
    } else {
      list.push({ type, id, title, addedAt: new Date().toISOString() });
      localStorage.setItem(this.storageKey, JSON.stringify(list));
      this.renderBookmarksUI();
      return true;
    }
  },

  getSessionNotes(type, id) {
    try {
      const allNotes = JSON.parse(sessionStorage.getItem(this.notesKey) || '{}');
      return allNotes[`${type}_${id}`] || '';
    } catch {
      return '';
    }
  },

  setSessionNotes(type, id, note) {
    try {
      const allNotes = JSON.parse(sessionStorage.getItem(this.notesKey) || '{}');
      allNotes[`${type}_${id}`] = note;
      sessionStorage.setItem(this.notesKey, JSON.stringify(allNotes));
    } catch (err) {
      console.error('Error saving session note:', err);
    }
  },

  renderBookmarksUI() {
    const container = document.getElementById('bookmarks-list-container');
    const countBadge = document.getElementById('bookmarks-count-badge');
    const bookmarks = this.getBookmarks();

    if (countBadge) {
      countBadge.textContent = bookmarks.length.toString();
    }

    if (!container) return;

    if (bookmarks.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <p style="font-size: 1.1rem; font-weight: 700; color: #0f172a;">No Bookmarks Saved Yet</p>
          <p style="color: #64748b; font-size: 0.8125rem; margin-top: 0.25rem;">
            Click the star icon on any farmers market or produce item to save it here for quick access.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = bookmarks.map((b, idx) => {
      const currentNote = this.getSessionNotes(b.type, b.id);
      return `
        <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: #15803d; background: #f0fdf4; padding: 0.15rem 0.5rem; border-radius: 4px;">
                ${b.type === 'market' ? '📍 Farmers Market' : '🥕 Seasonal Produce'}
              </span>
              <h4 style="font-size: 1rem; font-weight: 800; color: #0f172a; margin-top: 0.25rem;">${b.title}</h4>
            </div>
            <button class="remove-bookmark-btn" data-type="${b.type}" data-id="${b.id}" 
                    style="background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; border-radius: 6px; padding: 0.3rem 0.6rem; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
              Remove
            </button>
          </div>

          <!-- Session Personal Notes Field -->
          <div style="margin-top: 0.25rem;">
            <label style="font-size: 0.75rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 0.2rem;">
              Personal Shopping Note (Session Only):
            </label>
            <input type="text" class="bookmark-note-input" data-type="${b.type}" data-id="${b.id}" 
                   value="${currentNote}" placeholder="e.g. Bring cash for sourdough, arrive by 9 AM..." 
                   style="width: 100%; padding: 0.4rem 0.6rem; font-size: 0.8125rem; border: 1px solid #cbd5e1; border-radius: 6px;">
          </div>
        </div>
      `;
    }).join('');

    // Attach remove handlers
    container.querySelectorAll('.remove-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        const id = btn.getAttribute('data-id');
        this.toggleBookmark(type, id, '');
      });
    });

    // Attach note input handlers
    container.querySelectorAll('.bookmark-note-input').forEach(input => {
      input.addEventListener('change', () => {
        const type = input.getAttribute('data-type');
        const id = input.getAttribute('data-id');
        this.setSessionNotes(type, id, input.value.trim());
      });
    });
  },

  exportBookmarksAsFile() {
    const bookmarks = this.getBookmarks();
    if (bookmarks.length === 0) {
      alert('Your bookmarks list is empty. Add markets or produce items first!');
      return;
    }

    let output = '=== FRESHFIND SAVED FARMERS MARKETS & PRODUCE LIST ===\n';
    output += `Generated: ${new Date().toLocaleString()}\n`;
    output += `Total Items: ${bookmarks.length}\n\n`;

    bookmarks.forEach((b, i) => {
      const note = this.getSessionNotes(b.type, b.id);
      output += `${i + 1}. [${b.type.toUpperCase()}] ${b.title}\n`;
      if (note) output += `   Note: ${note}\n`;
      output += '\n';
    });

    output += '=== Fresh All Along • Certified eGreen Basket Platform ===\n';

    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FreshFind_My_Market_Plan_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  },

  shareBookmarks() {
    const text = 'Check out my favorite local farmers markets and seasonal produce on FreshFind!';
    if (navigator.share) {
      navigator.share({
        title: 'FreshFind Market Recommendations',
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} - ${window.location.href}`);
      alert('Link and recommendation copied to clipboard for sharing!');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.BookmarksManager.renderBookmarksUI();

  const exportBtn = document.getElementById('export-bookmarks-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => window.BookmarksManager.exportBookmarksAsFile());
  }

  const shareBtn = document.getElementById('share-bookmarks-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => window.BookmarksManager.shareBookmarks());
  }
});
