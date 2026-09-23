import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarketDirectory from './components/MarketDirectory';
import MarketDetailModal from './components/MarketDetailModal';
import SeasonalRecommendations from './components/SeasonalRecommendations';
import ProduceGuide from './components/ProduceGuide';
import AboutUs from './components/AboutUs';
import BookmarkSystem from './components/BookmarkSystem';
import ChatbotWidget from './components/ChatbotWidget';
import ContactAbout from './components/ContactAbout';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('freshfind_dark') === 'true' || false;
  });

  const [quickFilter, setQuickFilter] = useState({
    area: 'all',
    day: 'all',
    produceType: 'all'
  });

  const [selectedMarketModal, setSelectedMarketModal] = useState(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // User session state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('freshfind_current_user');
    showToast('Successfully signed out.');
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}! 🌿`);
  };

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('freshfind_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('freshfind_dark', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('freshfind_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const handleToggleBookmark = (item) => {
    if (isBookmarked(item.id)) {
      setBookmarks(prev => prev.filter(b => b.id !== item.id));
      showToast(`Removed "${item.title}" from saved notebook`);
    } else {
      setBookmarks(prev => [...prev, item]);
      showToast(`Saved "${item.title}" to notebook 🌿`);
    }
  };

  const handleRemoveBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const handleClearAllBookmarks = () => {
    if (window.confirm('Are you sure you want to clear your entire saved shopping notebook?')) {
      setBookmarks([]);
      showToast('Cleared all items from notebook');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl animate-fade-in flex items-center gap-2 border border-emerald-400/30">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarks.length}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* Hero Section & Quick Find Prompt (Sitemap: Find a Market) */}
        <Hero onApplyQuickFilter={setQuickFilter} />

        {/* Market Directory with Live Open Right Now indicators */}
        <MarketDirectory
          quickFilter={quickFilter}
          onSelectMarket={setSelectedMarketModal}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isBookmarked}
        />

        {/* Seasonal Recommendations (Sitemap Core: Seasonal Recommendations) */}
        <SeasonalRecommendations
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isBookmarked}
        />

        {/* Produce Guide (Sitemap Core: Produce Guide) */}
        <ProduceGuide
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isBookmarked}
        />

        {/* About Us (Sitemap Core: About Us) */}
        <AboutUs />

        {/* Contact Us, Geolocation & Map (Sitemap Core: Contact Us) */}
        <ContactAbout />
      </main>

      {/* Footer */}
      <Footer />

      {/* Market Detail Modal */}
      <MarketDetailModal
        market={selectedMarketModal}
        onClose={() => setSelectedMarketModal(null)}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={isBookmarked}
      />

      {/* Bookmarking System Drawer */}
      <BookmarkSystem
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAllBookmarks={handleClearAllBookmarks}
      />

      {/* Floating AI FarmBot Chatbot */}
      <ChatbotWidget />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
