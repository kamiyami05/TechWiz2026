/**
 * FandomVerse - Content Bookmarking & Notes System
 * Persists favorites in LocalStorage and session notes in SessionStorage per SRS Section 1.6
 */

window.BookmarksManager = {
  storageKey: 'fandomverse_bookmarks',
  notesKey: 'fandomverse_session_notes',

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
      this.renderUI();
      return false;
    } else {
      list.push({ type, id, title, addedAt: new Date().toISOString() });
      localStorage.setItem(this.storageKey, JSON.stringify(list));
      this.renderUI();
      return true;
    }
  },

  getSessionNote(type, id) {
    try {
      const all = JSON.parse(sessionStorage.getItem(this.notesKey) || '{}');
      return all[`${type}_${id}`] || '';
    } catch {
      return '';
    }
  },

  setSessionNote(type, id, note) {
    try {
      const all = JSON.parse(sessionStorage.getItem(this.notesKey) || '{}');
      all[`${type}_${id}`] = note;
      sessionStorage.setItem(this.notesKey, JSON.stringify(all));
    } catch (err) {
      console.error('Error saving session note:', err);
    }
  },

  renderUI() {
    const container = document.getElementById('bookmarks-container');
    const badge = document.getElementById('bookmarks-badge');
    const list = this.getBookmarks();

    if (badge) badge.textContent = list.length.toString();
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; background: var(--bg-card); border-radius: 14px; border: 1px dashed var(--border-light); color: var(--text-muted);">
          <span style="font-size: 2rem;">⭐</span>
          <h4 style="font-size: 1.1rem; color: #fff; font-weight: 800; margin-top: 0.5rem;">No Fandom Bookmarks Yet</h4>
          <p style="font-size: 0.8125rem; margin-top: 0.25rem;">
            Click the star icon on any character, event, or article to save it to your personal fandom collection!
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(b => {
      const note = this.getSessionNote(b.type, b.id);
      return `
        <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <div>
              <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 800; color: var(--accent-cyan); background: #1e2844; padding: 0.15rem 0.5rem; border-radius: 4px;">
                ${b.type.toUpperCase()}
              </span>
              <h4 style="font-size: 1rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">${b.title}</h4>
            </div>
            <button class="remove-bk-btn" data-type="${b.type}" data-id="${b.id}" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; padding: 0.25rem 0.5rem; font-size: 0.75rem; cursor: pointer;">
              Remove
            </button>
          </div>

          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.2rem;">
              Personal Fan Note (Session Only):
            </label>
            <input type="text" class="bk-note-input" data-type="${b.type}" data-id="${b.id}" value="${note}" placeholder="e.g. Catch up on Chapter 1100, cosplay prep..." style="width: 100%; padding: 0.4rem 0.6rem; font-size: 0.8125rem; border: 1px solid var(--border-light); border-radius: 6px; background: #0b0f19; color: #fff;">
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.remove-bk-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        const id = btn.getAttribute('data-id');
        this.toggleBookmark(type, id, '');
      });
    });

    container.querySelectorAll('.bk-note-input').forEach(inp => {
      inp.addEventListener('change', () => {
        const type = inp.getAttribute('data-type');
        const id = inp.getAttribute('data-id');
        this.setSessionNote(type, id, inp.value.trim());
      });
    });
  },

  exportList() {
    const list = this.getBookmarks();
    if (list.length === 0) {
      alert('Your bookmarks list is empty!');
      return;
    }

    let text = '=== FANDOMVERSE SAVED COLLECTION ===\n';
    text += `Exported: ${new Date().toLocaleString()}\n`;
    text += `Total Items: ${list.length}\n\n`;

    list.forEach((item, i) => {
      const note = this.getSessionNote(item.type, item.id);
      text += `${i + 1}. [${item.type.toUpperCase()}] ${item.title}\n`;
      if (note) text += `   Note: ${note}\n`;
      text += '\n';
    });

    text += '=== Fandom Universe • TechWiz 7 Solution ===\n';

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FandomVerse_Favorites_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.BookmarksManager.renderUI();

  const exportBtn = document.getElementById('export-bookmarks-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => window.BookmarksManager.exportList());
  }
});
