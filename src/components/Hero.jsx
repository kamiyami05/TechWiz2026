import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Carrot, ArrowRight, 
  Sparkles, Volume2, VolumeX, AlertCircle
} from 'lucide-react';

export default function Hero({ onApplyQuickFilter }) {
  const navigate = useNavigate();
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

  // Web Speech API Audio Market Briefing
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
    <div className="relative">
      {/* Upper Hero Banner with Lush Macro Vegetable Background */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-28 sm:pb-36 text-white bg-slate-950">
        
        {/* Fresh Garden Vegetables Background Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2000&q=85" 
            alt="Fresh crisp vegetables with water droplets"
            className="w-full h-full object-cover scale-105 filter brightness-[0.82] contrast-[1.08]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=2000&q=85";
            }}
          />
          {/* Subtle vignettes and dark gradient for AAA text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/80 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Trust Badge: VietGAP & Organic Certified */}
          <div className="flex items-center justify-center mb-5 sm:mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 dark:bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>VietGAP &amp; Organic Certified • Daily Farm-Fresh Harvests</span>
            </div>
          </div>

          {/* Main Hero Headline: 3-line layout matching FreshFind Project */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.14] drop-shadow-xl font-display">
              <span className="block">Discover Local Farmers</span>
              <span className="block">Markets &amp;</span>
              <span className="block">Peak Seasonal Produce</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-xs sm:text-base md:text-lg text-slate-100/90 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Your all-in-one companion for live market operating hours, interactive vendor schedules, and sustainable organic produce grown by regional family farmers.
            </p>

            {/* Podcast Audio Briefing Button */}
            <div className="mt-6 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleToggleAudio}
                className={`inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer border ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white border-rose-400 animate-pulse shadow-rose-600/30'
                    : 'bg-white/95 hover:bg-white text-slate-900 border-white/80 hover:shadow-2xl'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white" />
                    <span>Stop Market Podcast Briefing</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Listen to Today's Market Podcast Briefing</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-0.5" />
                  </>
                )}
              </button>

              {/* Audio Notice Toast */}
              {audioNotice && (
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold border border-amber-300 dark:border-amber-700 animate-fade-in shadow-lg">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{audioNotice}</span>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Floating Bridge Section: Search Card & 2 Highlights Bar */}
      <div className="relative -mt-20 sm:-mt-24 z-20 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Floating Quick Find Card */}
        <div className="relative">
          {/* Top-Right Pill Badge: 100% MORNING HARVESTED */}
          <div className="absolute -top-3.5 right-5 sm:right-8 z-30">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-md border border-emerald-400/40">
              <span>🌱</span>
              <span>100% MORNING HARVESTED</span>
            </span>
          </div>

          {/* Search Card Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white transition-all">
            
            {/* Card Header Title */}
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-emerald-600" />
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Find a Farmers Market Near You:
              </h2>
            </div>

            {/* 3 Criteria Select Filters */}
            <form onSubmit={handleAdvancedFilter}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
                
                {/* District / Area Select */}
                <div>
                  <label htmlFor="hero-district-select" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>District / Area:</span>
                  </label>
                  <select
                    id="hero-district-select"
                    name="districtArea"
                    value={selectedArea}
                    onChange={e => setSelectedArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
                  >
                    {areas.map(a => (
                      <option key={a} value={a}>{a === 'all' ? 'All Districts' : a}</option>
                    ))}
                  </select>
                </div>

                {/* Operating Day Select */}
                <div>
                  <label htmlFor="hero-operating-day-select" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Operating Day:</span>
                  </label>
                  <select
                    id="hero-operating-day-select"
                    name="operatingDay"
                    value={selectedDay}
                    onChange={e => setSelectedDay(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>{d === 'all' ? 'Any Day of the Week' : d}</option>
                    ))}
                  </select>
                </div>

                {/* Produce Category Select */}
                <div>
                  <label htmlFor="hero-produce-category-select" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Carrot className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Produce Category:</span>
                  </label>
                  <select
                    id="hero-produce-category-select"
                    name="produceCategory"
                    value={selectedProduceType}
                    onChange={e => setSelectedProduceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
                  >
                    {produceTypes.map(p => (
                      <option key={p} value={p}>{p === 'all' ? 'All Produce Categories' : p}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Full Width Green Search Button */}
              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Matching Farmers Markets</span>
              </button>
            </form>
          </div>
        </div>

        {/* 2 Highlight Cards Directly Below Search Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
          
          {/* Left Highlight Card: Ha Dong Trade Fair */}
          <div 
            onClick={() => navigate('/markets/mkt-4')}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-3.5"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img 
                src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=300&q=80" 
                alt="Ha Dong Safe Agricultural Trade Fair" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { 
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=300&q=80"; 
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  OPEN EVERY DAY
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors inline-flex items-center gap-0.5 shrink-0">
                  View Market →
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors truncate">
                Ha Dong Safe Agricultural Trade Fair
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                05:30 AM - 07:30 PM • Certified VietGAP stalls
              </p>
            </div>
          </div>

          {/* Right Highlight Card: Moc Chau Strawberries */}
          <div 
            onClick={() => navigate('/seasonal')}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-400 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-3.5"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img 
                src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=300&q=80" 
                alt="Moc Chau Strawberries & Avocados" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { 
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=300&q=80"; 
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10px] font-black text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                  TOP PICKS THIS WEEK
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-rose-500 transition-colors inline-flex items-center gap-0.5 shrink-0">
                  Explore →
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors truncate">
                Moc Chau Strawberries &amp; Avocados
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                Dawn-harvested highland sweetness &amp; butter avocados
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
