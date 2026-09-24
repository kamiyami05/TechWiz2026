import React, { useState, useEffect } from 'react';
import { 
  Bookmark, Trash2, Download, StickyNote, X, 
  Share2, Check, ExternalLink, Copy
} from 'lucide-react';

export default function BookmarkSystem({ 
  isOpen, 
  onClose, 
  bookmarks, 
  onRemoveBookmark,
  onClearAllBookmarks 
}) {
  const [personalNotes, setPersonalNotes] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('freshfind_session_notes');
      if (saved) {
        setPersonalNotes(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleUpdateNote = (id, text) => {
    const updated = { ...personalNotes, [id]: text };
    setPersonalNotes(updated);
    sessionStorage.setItem('freshfind_session_notes', JSON.stringify(updated));
  };

  const handleExportBookmarks = () => {
    if (bookmarks.length === 0) {
      alert('No markets or produce saved yet to export.');
      return;
    }

    let content = `# FRESHFIND - MY LOCAL MARKET & PRODUCE SHOPPING LIST\n`;
    content += `Generated Date: ${new Date().toLocaleDateString('en-US')}\n`;
    content += `Total Saved Items: ${bookmarks.length}\n\n`;

    bookmarks.forEach((item, index) => {
      content += `--------------------------------------------------\n`;
      content += `${index + 1}. [${item.type === 'Market' ? 'FARMERS MARKET' : 'PRODUCE'}] ${item.title}\n`;
      content += `   Location / Category: ${item.category}\n`;
      content += `   Operating Hours / Season: ${item.info || ''}\n`;
      if (personalNotes[item.id]) {
        content += `   Personal Note: ${personalNotes[item.id]}\n`;
      }
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FreshFind_ShoppingList_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-end animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 border-l border-emerald-200 dark:border-slate-800 w-full max-w-lg h-full p-6 shadow-2xl flex flex-col justify-between"
        onClick={e => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Saved Market Notebook ({bookmarks.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Notebook"
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-[12px] text-emerald-800 dark:text-emerald-200 mb-4 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/60 leading-relaxed flex items-center gap-2">
            <span>🌿</span>
            <span>Saved directly to your local device. Add shopping reminders for each market venue and seasonal crop!</span>
          </div>

          {/* Bookmarks List */}
          {bookmarks.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <div className="text-5xl mb-3">🧺</div>
              <p className="font-semibold text-sm text-slate-600 dark:text-slate-300">Your shopping notebook is empty</p>
              <p className="text-xs text-slate-400 mt-1">Tap the Bookmark ribbon on any market or produce item to save it for your next trip!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1">
              {bookmarks.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {item.type === 'Market' ? '🏪 Farmers Market' : '🥕 Organic Produce'}
                    </span>
                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-start gap-3">
                    {item.image && (
                      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-xs shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h4>
                      {item.info && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5 line-clamp-1">
                          {item.info}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Personal Note in Session Storage */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <label className="block text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                      <StickyNote className="w-3 h-3" />
                      <span>Shopping Reminder Note:</span>
                    </label>
                    <input
                      type="text"
                      value={personalNotes[item.id] || ''}
                      onChange={e => handleUpdateNote(item.id, e.target.value)}
                      placeholder="e.g. Remember to buy 2kg strawberries & sweet corn..."
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions: Export, Share, Clear */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          {bookmarks.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportBookmarks}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Export Shopping List (.TXT)</span>
              </button>
              <button
                onClick={onClearAllBookmarks}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 text-xs font-semibold cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Share Recommendations */}
          <button
            onClick={handleShare}
            className="w-full py-2 bg-stone-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Share FreshFind Market Guide'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
