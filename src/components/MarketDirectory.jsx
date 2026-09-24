import React, { useState, useMemo } from 'react';
import { 
  Store, MapPin, Clock, Star, Filter, ArrowUpDown, 
  ChevronRight, Bookmark, Sparkles, CheckCircle2, Leaf,
  Navigation, Gauge
} from 'lucide-react';
import markets from '../data/markets.json';

export default function MarketDirectory({ 
  quickFilter, 
  onSelectMarket, 
  onToggleBookmark, 
  isBookmarked 
}) {
  const [filterArea, setFilterArea] = useState(quickFilter?.area || 'all');
  const [filterDay, setFilterDay] = useState(quickFilter?.day || 'all');
  const [filterProduce, setFilterProduce] = useState(quickFilter?.produceType || 'all');
  const [sortBy, setSortBy] = useState('alphabetical'); // 'alphabetical' | 'rating' | 'open-now'
  const [showEcoStats, setShowEcoStats] = useState(true);

  React.useEffect(() => {
    if (quickFilter) {
      if (quickFilter.area !== undefined) setFilterArea(quickFilter.area);
      if (quickFilter.day !== undefined) setFilterDay(quickFilter.day);
      if (quickFilter.produceType !== undefined) setFilterProduce(quickFilter.produceType);
    }
  }, [quickFilter]);

  // Determine current day of week and current decimal hour
  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isMarketOpenNow = (market) => {
    const isOpenToday = market.openDaysOfWeek.includes(currentDayOfWeek);
    const isInTimeRange = currentHour >= market.openHourStart && currentHour <= market.openHourEnd;
    return isOpenToday && isInTimeRange;
  };

  // Unique areas
  const areas = useMemo(() => {
    return ['all', ...Array.from(new Set(markets.map(m => m.area)))];
  }, []);

  const days = ['all', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Filtering
  const filteredMarkets = useMemo(() => {
    let list = markets;

    if (filterArea !== 'all') {
      list = list.filter(m => m.area === filterArea);
    }
    if (filterDay !== 'all') {
      list = list.filter(m => m.operatingDays.includes(filterDay));
    }
    if (filterProduce !== 'all') {
      list = list.filter(m => m.typicalProduce.some(p => p.toLowerCase().includes(filterProduce.toLowerCase())));
    }

    if (sortBy === 'alphabetical') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'open-now') {
      list = [...list].sort((a, b) => {
        const aOpen = isMarketOpenNow(a) ? 1 : 0;
        const bOpen = isMarketOpenNow(b) ? 1 : 0;
        return bOpen - aOpen;
      });
    }

    return list;
  }, [filterArea, filterDay, filterProduce, sortBy, currentDayOfWeek, currentHour]);

  return (
    <section id="directory" className="py-16 md:py-24 bg-stone-50 dark:bg-slate-900 border-t border-emerald-100 dark:border-emerald-950 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-emerald-600 transition-colors font-semibold">
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md">
            Farmers Market Directory
          </span>
        </nav>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5" />
            Market Directory • Verified Local Producers
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Explore Regional Farmers Markets
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Check live operating hours, weekly stall schedules, and verified harvest origins from local growers.
          </p>
        </div>

        {/* Breakthrough Feature: Eco Food-Miles & Carbon Offset Calculator Banner */}
        <div className="mb-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-600/10 via-teal-500/10 to-green-600/10 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md shadow-emerald-600/20">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Eco Food-Miles & Carbon Offset Engine
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">
                  Green Tech
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Buying from regional Hanoi markets reduces average food travel from <strong>1,800+ km</strong> to under <strong>10 km</strong>, saving <strong>~2.4 kg CO₂e</strong> per grocery basket.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowEcoStats(!showEcoStats)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-slate-700 shrink-0 cursor-pointer shadow-xs"
          >
            {showEcoStats ? 'Hide Eco Badges' : 'Show Eco Badges'}
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 sm:p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Area Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Filter by District:
              </label>
              <select
                value={filterArea}
                onChange={e => setFilterArea(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {areas.map(a => (
                  <option key={a} value={a}>{a === 'all' ? 'All Districts' : a}</option>
                ))}
              </select>
            </div>

            {/* Day Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Day of Week:
              </label>
              <select
                value={filterDay}
                onChange={e => setFilterDay(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d === 'all' ? 'Any Operating Day' : d}</option>
                ))}
              </select>
            </div>

            {/* Produce Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Produce Type:
              </label>
              <select
                value={filterProduce}
                onChange={e => setFilterProduce(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Produce</option>
                <option value="Greens">Leafy Greens & Kale</option>
                <option value="Tomatoes">Cherry Tomatoes</option>
                <option value="Strawberries">Strawberries</option>
                <option value="Avocados">Butter Avocados</option>
                <option value="Corn">Sweet Corn & Grains</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Sort Markets:
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="alphabetical">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
                <option value="open-now">Open Right Now First</option>
              </select>
            </div>

          </div>

          {/* Quick Active Chips */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-500 text-[11px]">
              Showing <strong>{filteredMarkets.length}</strong> matching verified market locations
            </span>
            {(filterArea !== 'all' || filterDay !== 'all' || filterProduce !== 'all') && (
              <button
                onClick={() => {
                  setFilterArea('all');
                  setFilterDay('all');
                  setFilterProduce('all');
                }}
                className="text-rose-500 hover:underline text-[11px] font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Markets Grid */}
        {filteredMarkets.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700">
            <div className="text-4xl mb-3">🧺</div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white mb-1">
              No matching farmers markets found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your district or day of week filters to view nearby markets.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMarkets.map((mkt) => {
              const openNow = isMarketOpenNow(mkt);
              const bookmarked = isBookmarked(mkt.id);

              return (
                <div
                  key={mkt.id}
                  className={`bg-white dark:bg-slate-800 rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl flex flex-col justify-between group ${
                    openNow 
                      ? 'border-emerald-500/80 shadow-emerald-500/5' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                  }`}
                >
                  <div>
                    {/* Market Photography Banner */}
                    <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-700">
                      <img 
                        src={mkt.image} 
                        alt={mkt.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 pointer-events-none" />

                      {/* Badges on Top of Photo */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-emerald-800 dark:text-emerald-300 backdrop-blur-md shadow-xs">
                            {mkt.area.split(',')[0]}
                          </span>

                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-xs ${
                            openNow 
                              ? 'bg-emerald-600/95 text-white' 
                              : 'bg-black/60 text-slate-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${openNow ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
                            <span>{openNow ? 'OPEN NOW' : 'CLOSED'}</span>
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark({
                              id: mkt.id,
                              title: mkt.name,
                              type: 'Market',
                              category: mkt.area,
                              info: mkt.operatingHours,
                              image: mkt.image
                            });
                          }}
                          title={bookmarked ? "Saved in Notebook" : "Save to Notebook"}
                          className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                            bookmarked 
                              ? 'bg-emerald-600 text-white shadow-md' 
                              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Bottom Info on Photo */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span>{mkt.rating}</span>
                          <span className="text-[10px] text-slate-300 font-normal">({mkt.rating >= 4.9 ? 'Exceptional' : 'Verified'})</span>
                        </div>

                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] text-emerald-300 font-semibold">
                          <Leaf className="w-3 h-3 text-emerald-400" />
                          <span>{mkt.distanceKm || 3.5} km away</span>
                        </div>
                      </div>
                    </div>

                    {/* Header info */}
                    <div className="flex items-start gap-3 mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                        {mkt.thumbnailIcon}
                      </div>
                      <div>
                        <h3 
                          onClick={() => onSelectMarket(mkt)}
                          className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors cursor-pointer leading-snug"
                        >
                          {mkt.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{mkt.address}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {mkt.description}
                    </p>

                    {/* Eco Food Miles Indicator */}
                    {showEcoStats && (
                      <div className="mb-4 px-3 py-2 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                        <span className="flex items-center gap-1 font-semibold">
                          <Leaf className="w-3 h-3 text-emerald-600" />
                          <span>Food Distance: <strong>{mkt.distanceKm || 3.5} km</strong></span>
                        </span>
                        <span className="text-[10px] bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold shadow-xs">
                          🌱 -{((mkt.distanceKm || 3) * 0.45).toFixed(1)} kg CO₂e
                        </span>
                      </div>
                    )}

                    {/* Hours & Schedule info */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-700 mb-4 text-xs space-y-1">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Hours: <strong className="font-mono">{mkt.operatingHours}</strong></span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Operating Days: {mkt.operatingDays.join(', ')}
                      </div>
                    </div>

                    {/* Typical produce tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {mkt.typicalProduce.map((prod, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{mkt.rating} / 5.0</span>
                    </div>

                    <button
                      onClick={() => onSelectMarket(mkt)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View Schedule & Map</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
