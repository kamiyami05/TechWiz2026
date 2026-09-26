import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Carrot, ArrowRight, 
  Sparkles, CheckCircle, Clock, ShieldCheck, HeartHandshake,
  Volume2, VolumeX, Radio, Sprout, AlertCircle, Filter, SlidersHorizontal
} from 'lucide-react';
import markets from '../data/markets.json';
import produce from '../data/produce.json';

export default function Hero({ onApplyQuickFilter }) {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedProduceType, setSelectedProduceType] = useState('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioNotice, setAudioNotice] = useState('');

  const areas = [
    'all', 
    'Cau Giay District, Hanoi', 
    'Tay Ho District, Hanoi', 
    'Dong Da District, Hanoi', 
    'Ha Dong District, Hanoi'
  ];
  
  const days = [
    'all', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday', 
    'Sunday'
  ];
  
  const produceTypes = [
    'all', 
    'Fruits', 
    'Vegetables', 
    'Herbs', 
    'Dairy & Eggs'
  ];

  // Handle pill search input
  const handleKeywordSearch = (e) => {
    e.preventDefault();
    const query = searchKeyword.trim();
    if (query) {
      navigate(`/markets?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/markets');
    }
  };

  // Handle advanced 3-dropdown filter
  const handleAdvancedFilter = (e) => {
    e.preventDefault();
    if (onApplyQuickFilter) {
      onApplyQuickFilter({
        area: selectedArea,
        day: selectedDay,
        produceType: selectedProduceType
      });
    } else {
      const params = new URLSearchParams();
      if (selectedArea !== 'all') params.set('area', selectedArea);
      if (selectedDay !== 'all') params.set('day', selectedDay);
      if (selectedProduceType !== 'all') params.set('produce', selectedProduceType);
      navigate(`/markets?${params.toString()}`);
    }
  };

  // Breakthrough Feature: Web Speech API Audio Market Briefing
  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setAudioNotice('Text-to-speech audio is not supported on this browser/device.');
      setTimeout(() => setAudioNotice(''), 4500);
      return;
    }

    if (isPlayingAudio) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
      setIsPlayingAudio(false);
    } else {
      try {
        window.speechSynthesis.cancel();
        const briefingText = "Welcome to FreshFind, your local farmers market companion. Today, Ha Dong Safe Agricultural Trade Fair and Cau Giay Green Market are open with morning-harvested produce. Peak seasonal highlights include sweet Moc Chau strawberries, highland avocados, and organic Ba Vi dairy. Plan your visit to reduce food miles and champion sustainable local farming!";
        
        const utterance = new SpeechSynthesisUtterance(briefingText);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => {
          setIsPlayingAudio(false);
          setAudioNotice('Unable to play audio speech on this device.');
          setTimeout(() => setAudioNotice(''), 4500);
        };

        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      } catch (err) {
        setIsPlayingAudio(false);
        setAudioNotice('Audio playback could not be initiated on this browser.');
        setTimeout(() => setAudioNotice(''), 4500);
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 text-white">
      
      {/* Immersive Farmers Market Photo Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=85" 
          alt="Fresh local farmers market produce"
          className="w-full h-full object-cover scale-105 filter brightness-[0.85]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=2000&q=85";
          }}
        />
        {/* Layered Cinematic Overlays for Optimal Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust & Live Status Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>VietGAP & Organic Certified • Daily Farm-Fresh Harvests</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 backdrop-blur-md border border-emerald-500/40 text-emerald-200 text-xs font-bold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Market Hours • Hanoi Area</span>
          </div>
        </div>

        {/* Banner Headline (Inspired by Reference Banner & Elevated) */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] drop-shadow-xl font-display">
            Find fresh local food <br className="hidden sm:inline" />
            <span className="text-amber-400 drop-shadow-md">
              near you
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-base md:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Farmers markets, organic cooperatives, peak seasonal harvests, and local growers — all in one place.
          </p>

          {/* Pill-Shaped Instant Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto w-full px-2 sm:px-0">
            <form 
              onSubmit={handleKeywordSearch} 
              className="relative flex items-center bg-white rounded-full p-1.5 sm:p-2 shadow-2xl border border-white/40 focus-within:ring-4 focus-within:ring-amber-400/50 transition-all"
            >
              <div className="pl-3 sm:pl-4 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-slate-500" />
              </div>
              <input 
                type="text"
                name="searchQuery"
                id="hero-main-search-input"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search by district, market name, or fresh produce..."
                className="w-full py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent font-semibold"
              />
              <button
                type="submit"
                className="px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Category Filter Pills (Quick Filter Tags) */}
          <div className="mt-5 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 px-2 no-scrollbar">
            <button
              type="button"
              onClick={() => navigate('/markets')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-emerald-600 text-white text-xs font-bold backdrop-blur-md border border-white/20 hover:border-emerald-400 shadow-md transition-all shrink-0 cursor-pointer hover:scale-105"
            >
              <span>🧺</span>
              <span>Farmers Markets</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/markets?produce=Vegetables')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-emerald-600 text-white text-xs font-bold backdrop-blur-md border border-white/20 hover:border-emerald-400 shadow-md transition-all shrink-0 cursor-pointer hover:scale-105"
            >
              <span>🌾</span>
              <span>Farms & Growers</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/produce')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-emerald-600 text-white text-xs font-bold backdrop-blur-md border border-white/20 hover:border-emerald-400 shadow-md transition-all shrink-0 cursor-pointer hover:scale-105"
            >
              <span>🍯</span>
              <span>Artisan Food & Herbs</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/markets?produce=Milk')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-emerald-600 text-white text-xs font-bold backdrop-blur-md border border-white/20 hover:border-emerald-400 shadow-md transition-all shrink-0 cursor-pointer hover:scale-105"
            >
              <span>🏪</span>
              <span>Co-ops & Grocers</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/seasonal')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-emerald-600 text-white text-xs font-bold backdrop-blur-md border border-white/20 hover:border-emerald-400 shadow-md transition-all shrink-0 cursor-pointer hover:scale-105"
            >
              <span>🥦</span>
              <span>Seasonal Harvest</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/markets?sort=open-now')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-bold backdrop-blur-md border border-emerald-400/50 shadow-md transition-all shrink-0 cursor-pointer hover:scale-105"
            >
              <span>⚡</span>
              <span>Open Right Now</span>
            </button>
          </div>

          {/* Action Row: Audio Podcast Briefing & Advanced Filters Toggle */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            
            {/* Audio Podcast Briefing Button */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border transition-all shadow-md cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-rose-600/90 text-white border-rose-400 animate-pulse' 
                  : 'bg-white/15 hover:bg-white/25 text-white border-white/20 hover:border-white/40'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Stop Market Audio Briefing</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Listen to Daily Podcast Briefing</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
                </>
              )}
            </button>

            {/* Toggle Detailed Dropdowns */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>{showAdvancedFilters ? 'Hide Detailed Dropdowns' : 'Filter by District, Day & Category'}</span>
            </button>

          </div>

          {/* Audio Notice Toast */}
          {audioNotice && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold border border-amber-300 dark:border-amber-700 animate-fade-in shadow-lg">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{audioNotice}</span>
            </div>
          )}

        </div>

        {/* Collapsible Advanced Search Dropdowns (Preserves full existing functionality) */}
        {showAdvancedFilters && (
          <div 
            id="find-market" 
            className="mt-8 max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-7 shadow-2xl animate-fade-in"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                <Filter className="w-4 h-4 text-emerald-400" />
                <span>Filter by Precise Criteria:</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                SRS Feature 2
              </span>
            </div>

            <form onSubmit={handleAdvancedFilter} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-2">
              {/* Area */}
              <div>
                <label htmlFor="hero-district-select" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>District / Area:</span>
                </label>
                <select
                  id="hero-district-select"
                  name="districtArea"
                  value={selectedArea}
                  onChange={e => setSelectedArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {areas.map(a => (
                    <option key={a} value={a}>{a === 'all' ? 'All Districts' : a}</option>
                  ))}
                </select>
              </div>

              {/* Day of Week */}
              <div>
                <label htmlFor="hero-operating-day-select" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>Operating Day:</span>
                </label>
                <select
                  id="hero-operating-day-select"
                  name="operatingDay"
                  value={selectedDay}
                  onChange={e => setSelectedDay(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {days.map(d => (
                    <option key={d} value={d}>{d === 'all' ? 'Any Day of the Week' : d}</option>
                  ))}
                </select>
              </div>

              {/* Produce Type */}
              <div>
                <label htmlFor="hero-produce-category-select" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Carrot className="w-3 h-3 text-emerald-400" />
                  <span>Produce Category:</span>
                </label>
                <select
                  id="hero-produce-category-select"
                  name="produceCategory"
                  value={selectedProduceType}
                  onChange={e => setSelectedProduceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {produceTypes.map(p => (
                    <option key={p} value={p}>{p === 'all' ? 'All Produce Categories' : p}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Apply Criteria & View Matching Markets</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Highlights Bar: Open Markets & Seasonal Pick */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Open Markets Highlight */}
          <div 
            onClick={() => {
              navigate('/markets/mkt-4');
            }}
            className="bg-slate-900/80 hover:bg-slate-900 border border-white/15 hover:border-emerald-500 rounded-3xl p-4 sm:p-5 shadow-lg flex items-center gap-4 cursor-pointer transition-all group backdrop-blur-md"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-emerald-500/40 bg-emerald-950">
              <img 
                src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=300&q=80" 
                alt="Ha Dong Trade Fair" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=300&q=80"; }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Open Every Day • Certified VietGAP
                </span>
                <span className="text-[11px] font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  View Market →
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-400 transition-colors">
                Ha Dong Safe Agricultural Trade Fair
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                05:30 AM - 07:30 PM • Heirloom sweet corn & organic root crops.
              </p>
            </div>
          </div>

          {/* Seasonal Pick Highlight */}
          <div 
            onClick={() => {
              navigate('/seasonal');
            }}
            className="bg-slate-900/80 hover:bg-slate-900 border border-white/15 hover:border-rose-400 rounded-3xl p-4 sm:p-5 shadow-lg flex items-center gap-4 cursor-pointer transition-all group backdrop-blur-md"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-rose-500/40 bg-rose-950">
              <img 
                src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=300&q=80" 
                alt="Moc Chau Strawberries" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=300&q=80"; }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                  Top Picks This Week • Peak Harvest
                </span>
                <span className="text-[11px] font-semibold text-rose-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Explore →
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-rose-400 transition-colors">
                Moc Chau Strawberries & Avocados
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                Pure natural sweetness, harvested at dawn for peak aroma.
              </p>
            </div>
          </div>

        </div>

        {/* Visual Trust Strips */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative rounded-2xl overflow-hidden h-24 group shadow-sm bg-slate-900 border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=80" 
              alt="Fresh Produce Stalls" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 flex flex-col justify-end">
              <span className="text-white text-xs font-bold leading-tight">Fresh Market Stalls</span>
              <span className="text-[10px] text-emerald-300 font-medium">Daily Dawn Arrivals</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-24 group shadow-sm bg-slate-900 border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80" 
              alt="Certified Organic Farms" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=80"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 flex flex-col justify-end">
              <span className="text-white text-xs font-bold leading-tight">Organic Certification</span>
              <span className="text-[10px] text-emerald-300 font-medium">VietGAP & GlobalGAP</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-24 group shadow-sm bg-slate-900 border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80" 
              alt="Zero Pesticides" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=80"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 flex flex-col justify-end">
              <span className="text-white text-xs font-bold leading-tight">Microgreen & Kale</span>
              <span className="text-[10px] text-emerald-300 font-medium">100% Pesticide-Free</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-24 group shadow-sm bg-slate-900 border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=500&q=80" 
              alt="Community Growers" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=80"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 flex flex-col justify-end">
              <span className="text-white text-xs font-bold leading-tight">Regional Family Farms</span>
              <span className="text-[10px] text-emerald-300 font-medium">Fair Trade Supported</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
