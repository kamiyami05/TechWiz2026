import React, { useState } from 'react';
import { 
  Search, MapPin, Calendar, Carrot, ArrowRight, 
  Sparkles, CheckCircle, Clock, ShieldCheck, HeartHandshake,
  Volume2, VolumeX, Radio
} from 'lucide-react';
import markets from '../data/markets.json';
import produce from '../data/produce.json';

export default function Hero({ onApplyQuickFilter }) {
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedProduceType, setSelectedProduceType] = useState('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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

  const handleQuickSearch = (e) => {
    e.preventDefault();
    onApplyQuickFilter({
      area: selectedArea,
      day: selectedDay,
      produceType: selectedProduceType
    });
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Breakthrough Feature: Web Speech API Audio Market Briefing
  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech audio briefing is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const briefingText = "Welcome to FreshFind, your local farmers market companion. Today, Ha Dong Safe Agricultural Trade Fair and Cau Giay Green Market are open with morning-harvested produce. Peak seasonal highlights include sweet Moc Chau strawberries, highland avocados, and organic Ba Vi dairy. Plan your visit to reduce food miles and champion sustainable local farming!";
      
      const utterance = new SpeechSynthesisUtterance(briefingText);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-slate-900/60 dark:to-slate-900">
      
      {/* Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-400/20 dark:bg-emerald-500/10 blur-[110px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>VietGAP & Organic Certified • Daily Farm-Fresh Harvests</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Discover Local Farmers Markets & <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
              Peak Seasonal Produce
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Your all-in-one companion for live market operating hours, interactive vendor schedules, and sustainable organic produce grown by regional family farmers.
          </p>

          {/* Audio Briefing Podcast Pill */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleToggleAudio}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-rose-600 text-white animate-pulse' 
                  : 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Stop Daily Audio Briefing</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>🎧 Listen to Today's Market Podcast Briefing</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Find Component */}
        <div 
          id="find-market" 
          className="mt-10 max-w-4xl mx-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-emerald-200 dark:border-slate-700 rounded-3xl p-5 sm:p-7 shadow-xl scroll-mt-28 relative"
        >
          {/* Decorative floating badge */}
          <div className="hidden sm:block absolute -top-4 -right-3 px-3 py-1 bg-gradient-to-r from-emerald-600 to-green-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-emerald-600/30 uppercase tracking-wider animate-float pointer-events-none">
            🌱 100% Morning Harvested
          </div>

          <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
            <span className="text-xl">🔍</span>
            <span>Find a Farmers Market Near You:</span>
          </div>

          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
            {/* Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>District / Area:</span>
              </label>
              <select
                value={selectedArea}
                onChange={e => setSelectedArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {areas.map(a => (
                  <option key={a} value={a}>{a === 'all' ? 'All Districts' : a}</option>
                ))}
              </select>
            </div>

            {/* Day of Week */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-600" />
                <span>Operating Day:</span>
              </label>
              <select
                value={selectedDay}
                onChange={e => setSelectedDay(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d === 'all' ? 'Any Day of the Week' : d}</option>
                ))}
              </select>
            </div>

            {/* Produce Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                <Carrot className="w-3 h-3 text-emerald-600" />
                <span>Produce Category:</span>
              </label>
              <select
                value={selectedProduceType}
                onChange={e => setSelectedProduceType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {produceTypes.map(p => (
                  <option key={p} value={p}>{p === 'all' ? 'All Produce Categories' : p}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Matching Farmers Markets</span>
              </button>
            </div>
          </form>
        </div>

        {/* Highlights Bar */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Open Markets Highlight */}
          <div 
            onClick={() => {
              onApplyQuickFilter({ area: 'Ha Dong District, Hanoi', day: 'all', produceType: 'all' });
              const el = document.getElementById('directory');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-3xl p-5 shadow-sm hover:shadow-md flex items-center gap-4 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              🏪
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Open Every Day
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  View Market →
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Ha Dong Safe Agricultural Trade Fair (05:30 AM - 07:30 PM)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Heirloom sweet corn, herbal brown rice, and seasonal root crops.
              </p>
            </div>
          </div>

          {/* Seasonal Pick Highlight */}
          <div 
            onClick={() => {
              const el = document.getElementById('seasonal');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-500 rounded-3xl p-5 shadow-sm hover:shadow-md flex items-center gap-4 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              🍓
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                  Top Picks This Week
                </span>
                <span className="text-[11px] font-semibold text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Explore →
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Moc Chau Strawberries & Highland Avocados
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Pure natural sweetness and creamy texture, available at Tay Ho & Cau Giay.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
