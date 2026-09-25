import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Store, Carrot, Clock, Users, Bookmark, Sun, 
  Moon, User, Menu, X, MapPin, Sparkles, Compass,
  ChevronDown, LogOut, ShieldCheck, Search, Calendar,
  Heart, MessageSquare, Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  onOpenBookmarks, 
  bookmarkCount, 
  onOpenAuth,
  currentUser,
  onLogout 
}) {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(2150);
  const [currentTime, setCurrentTime] = useState('');
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Clock in English format
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      }) + ' • ' + now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Visitor Counter
  useEffect(() => {
    const key = 'freshfind_visitor_count';
    let count = parseInt(localStorage.getItem(key) || '0', 10);
    if (!count || isNaN(count)) {
      count = 2150;
    }
    count += 1;
    localStorage.setItem(key, count.toString());
    setVisitorCount(count);
  }, []);

  // Multi-Page SPA Navigation links with dynamic translations
  const navLinks = [
    { path: '/', name: t('home'), icon: Compass, end: true },
    { path: '/markets', name: t('markets'), icon: Store, end: false },
    { path: '/seasonal', name: t('seasonal'), icon: Calendar, end: false },
    { path: '/produce', name: t('produce'), icon: Carrot, end: false },
    { path: '/about', name: t('about'), icon: Users, end: false },
    { path: '/contact', name: t('contact'), icon: MessageSquare, end: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-200/70 dark:border-slate-800 text-slate-800 dark:text-slate-100 transition-colors shadow-xs">
      
      {/* Top Utility Bar */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40 text-[11px] px-4 py-1 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('topBarSlogan')}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-500 dark:text-slate-400">{t('hotline')}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{currentTime}</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1 font-mono">
              <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t('liveVisits')}: <strong className="text-emerald-800 dark:text-emerald-300 font-bold">{visitorCount.toLocaleString()}</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
            <div className="w-10 h-10 group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="FreshFind Logo" 
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Fresh<span className="text-emerald-600 dark:text-emerald-400">Find</span>
              </span>
              <span className="hidden 2xl:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t('organicBadge')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links via React Router NavLink */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={({ isActive }) => `px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-extrabold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Language Switcher Button [EN | VI] */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? "Chuyển sang Tiếng Việt" : "Switch to English"}
              className="px-2.5 py-1.5 rounded-xl border border-emerald-300/80 dark:border-emerald-700/80 bg-emerald-50/80 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-slate-800 text-[11px] font-extrabold text-emerald-800 dark:text-emerald-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="text-xs">{language === 'en' ? '🇬🇧' : '🇻🇳'}</span>
              <span className="font-mono tracking-wider font-bold">{language === 'en' ? 'EN' : 'VI'}</span>
            </button>

            {/* Bookmarks Drawer Trigger */}
            <button
              onClick={onOpenBookmarks}
              title={t('savedNotebook')}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Light and Dark Mode"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* User Profile / Auth Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-2xl z-50 animate-scale-in text-xs space-y-2">
                    <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono truncate">{currentUser.email}</div>
                      <span className="mt-1 inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                        {currentUser.roleLabel || 'Active Member'}
                      </span>
                    </div>

                    <button
                      onClick={() => { setUserMenuOpen(false); onOpenBookmarks(); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4 text-emerald-600" />
                        <span>My Market Notebook</span>
                      </span>
                      <span className="font-bold font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                        {bookmarkCount}
                      </span>
                    </button>

                    <button
                      onClick={() => { setUserMenuOpen(false); onLogout(); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out Account</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('signIn')}</span>
              </button>
            )}

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Mobile Menu"
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-emerald-200 dark:border-slate-800 px-4 py-4 space-y-3 animate-fade-in shadow-xl">
          <div className="text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800 flex justify-between">
            <span>{currentTime}</span>
            <span>Visits: {visitorCount}</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white font-extrabold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600'
                  }`}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                      <span>{link.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {currentUser ? (
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{currentUser.name}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{currentUser.roleLabel}</span>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                    className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
