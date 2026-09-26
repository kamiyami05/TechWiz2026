import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BookmarkSystem from './components/BookmarkSystem';
import ChatbotWidget from './components/ChatbotWidget';
import AuthModal from './components/AuthModal';

// Multi-Page SPA Route Components
import HomePage from './pages/HomePage';
import MarketsPage from './pages/MarketsPage';
import MarketDetailPage from './pages/MarketDetailPage';
import ProducePage from './pages/ProducePage';
import SeasonalPage from './pages/SeasonalPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('freshfind_dark') === 'true' || false;
  });

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
    showToast(`Welcome back, ${user.name}!`);
  };

  // Bookmarks state (persistent shopping notebook)
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
      showToast(`Saved "${item.title}" to notebook`);
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
      
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl animate-fade-in flex items-center gap-2 border border-emerald-400/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-100 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Shared Header Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarks.length}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Multi-Page SPA Routes */}
      <main className="flex-1">
        <Routes>
          {/* Home: Hero + Platform Overview + Top Hot Markets + Quick Search */}
          <Route 
            path="/" 
            element={
              <HomePage 
                onToggleBookmark={handleToggleBookmark} 
                isBookmarked={isBookmarked} 
              />
            } 
          />

          {/* Markets Directory: Full list with multi-criteria filters */}
          <Route 
            path="/markets" 
            element={
              <MarketsPage 
                onToggleBookmark={handleToggleBookmark} 
                isBookmarked={isBookmarked} 
              />
            } 
          />

          {/* Market Detail: Dedicated full page with weekly table, map & stalls */}
          <Route 
            path="/markets/:id" 
            element={
              <MarketDetailPage 
                onToggleBookmark={handleToggleBookmark} 
                isBookmarked={isBookmarked} 
                currentUser={currentUser}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            } 
          />

          {/* Produce Guide: Produce catalog & 12-month harvest heatmap matrix */}
          <Route 
            path="/produce" 
            element={
              <ProducePage 
                onToggleBookmark={handleToggleBookmark} 
                isBookmarked={isBookmarked} 
              />
            } 
          />

          {/* Seasonal Recommendations: 4-season exploration & specialty picks */}
          <Route 
            path="/seasonal" 
            element={
              <SeasonalPage 
                onToggleBookmark={handleToggleBookmark} 
                isBookmarked={isBookmarked} 
              />
            } 
          />

          {/* About Us: Brand story, impact stats & 3-member team */}
          <Route 
            path="/about" 
            element={<AboutPage />} 
          />

          {/* Contact & Support: GPS proximity detector, map & inquiry form */}
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />

          {/* Fallback redirect */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Bookmarking System Drawer */}
      <BookmarkSystem
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAllBookmarks={handleClearAllBookmarks}
      />

      {/* Floating AI FarmBot Chatbot */}
      <ChatbotWidget onOpenBookmarks={() => setIsBookmarksOpen(true)} />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
