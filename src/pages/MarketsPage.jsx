import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Store, MapPin, Clock, Star, Filter, ArrowUpDown, 
  ChevronRight, Bookmark, Sparkles, CheckCircle2, Leaf,
  Navigation, Gauge, Search, ArrowRight, Scale
} from 'lucide-react';
import markets from '../data/markets.json';
import MarketCompareModal from '../components/MarketCompareModal';

export default function MarketsPage({ onToggleBookmark, isBookmarked }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterArea, setFilterArea] = useState(() => searchParams.get('area') || 'all');
  const [filterDay, setFilterDay] = useState(() => searchParams.get('day') || 'all');
  const [filterProduce, setFilterProduce] = useState(() => searchParams.get('produce') || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical'); // 'alphabetical' | 'rating' | 'open-now'
  const [showEcoStats, setShowEcoStats] = useState(true);

  // Market comparison state
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);

  const handleToggleCompare = (id) => {
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(item => item !== id));
    } else {
      if (compareList.length >= 2) {
        setCompareList([compareList[1], id]);
      } else {
        setCompareList(prev => [...prev, id]);
      }
    }
  };

  // Sync state if query params change externally
  useEffect(() => {
    const area = searchParams.get('area');
    const day = searchParams.get('day');
    const produce = searchParams.get('produce');
    if (area) setFilterArea(area);
    if (day) setFilterDay(day);
    if (produce) setFilterProduce(produce);
  }, [searchParams]);

  // Determine current day of week and current decimal hour
  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isMarketOpenNow = (market) => {
    const isOpenToday = market.openDaysOfWeek?.includes(currentDayOfWeek);
    const isInTimeRange = currentHour >= market.openHourStart && currentHour <= market.openHourEnd;
    return isOpenToday && isInTimeRange;
  };

  // Unique areas
  const areas = useMemo(() => {
    return ['all', ...Array.from(new Set(markets.map(m => m.area)))];
  }, []);

  const days = ['all', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Filtering & Sorting
  const filteredMarkets = useMemo(() => {
    let list = markets;

    if (filterArea !== 'all') {
      list = list.filter(m => m.area.toLowerCase().includes(filterArea.toLowerCase()) || filterArea.toLowerCase().includes(m.area.toLowerCase()));
    }
    if (filterDay !== 'all') {
      list = list.filter(m => m.operatingDays.includes(filterDay));
    }
    if (filterProduce !== 'all') {
      list = list.filter(m => m.typicalProduce.some(p => p.toLowerCase().includes(filterProduce.toLowerCase())));
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.address.toLowerCase().includes(q) ||
        m.typicalProduce.some(p => p.toLowerCase().includes(q))
      );
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
  }, [filterArea, filterDay, filterProduce, searchTerm, sortBy, currentDayOfWeek, currentHour]);

  const handleResetFilters = () => {
    setFilterArea('all');
    setFilterDay('all');
    setFilterProduce('all');
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div className="py-10 md:py-16 bg-stone-50 dark:bg-slate-900 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-emerald-600 transition-colors font-semibold">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded-md">
            Farmers Market Directory
          </span>
        </nav>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Market Directory • Verified Local Producers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Explore Regional Farmers Markets
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Check live operating hours, weekly stall schedules, and verified harvest origins from local grower cooperatives.
          </p>
        </div>

        {/* Eco Food-Miles & Carbon Offset Calculator Banner */}
        <div className="mb-8 max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-600/10 via-teal-500/10 to-green-600/10 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md shadow-emerald-600/20">
              <Leaf className="w-6 h-6 text-white" />
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
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCompareModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Markets</span>
              {compareList.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-teal-800 text-[10px] font-black flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowEcoStats(!showEcoStats)}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-slate-700 shrink-0 cursor-pointer shadow-xs"
            >
              {showEcoStats ? 'Hide Eco Badges' : 'Show Eco Badges'}
            </button>
          </div>
        </div>

        {/* Multi-Criteria Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 sm:p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            
            {/* Search by name/produce */}
            <div className="lg:col-span-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Search Keyword:
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Market or produce..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Area Filter */}
            <div>
              <label htmlFor="markets-filter-district" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Filter by District:
              </label>
              <select
                id="markets-filter-district"
                name="filterDistrict"
                value={filterArea}
                onChange={e => {
                  setFilterArea(e.target.value);
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value === 'all') newParams.delete('area');
                  else newParams.set('area', e.target.value);
                  setSearchParams(newParams);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {areas.map(a => (
                  <option key={a} value={a}>{a === 'all' ? 'All Districts' : a}</option>
                ))}
              </select>
            </div>

            {/* Day Filter */}
            <div>
              <label htmlFor="markets-filter-day" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Day of Week:
              </label>
              <select
                id="markets-filter-day"
                name="filterOperatingDay"
                value={filterDay}
                onChange={e => {
                  setFilterDay(e.target.value);
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value === 'all') newParams.delete('day');
                  else newParams.set('day', e.target.value);
                  setSearchParams(newParams);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d === 'all' ? 'Any Operating Day' : d}</option>
                ))}
              </select>
            </div>

            {/* Produce Filter */}
            <div>
              <label htmlFor="markets-filter-produce" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Produce Type:
              </label>
              <select
                id="markets-filter-produce"
                name="filterProduceCategory"
                value={filterProduce}
                onChange={e => {
                  setFilterProduce(e.target.value);
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value === 'all') newParams.delete('produce');
                  else newParams.set('produce', e.target.value);
                  setSearchParams(newParams);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Produce Types</option>
                <option value="Greens">Leafy Greens & Kale</option>
                <option value="Tomatoes">Cherry Tomatoes</option>
                <option value="Strawberries">Strawberries</option>
                <option value="Avocados">Butter Avocados</option>
                <option value="Corn">Sweet Corn & Grains</option>
                <option value="Milk">Raw Farm Milk & Dairy</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label htmlFor="markets-sort-by" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Sort Markets:
              </label>
              <select
                id="markets-sort-by"
                name="sortOrder"
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

          {/* Quick Active Chips & Results Count */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-500 text-[11px]">
              Showing <strong>{filteredMarkets.length}</strong> matching verified market locations
            </span>
            {(filterArea !== 'all' || filterDay !== 'all' || filterProduce !== 'all' || searchTerm.trim()) && (
              <button
                onClick={handleResetFilters}
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
            <Store className="w-12 h-12 text-emerald-600/70 dark:text-emerald-400/70 mx-auto mb-3" />
            <h3 className="font-bold text-base text-slate-800 dark:text-white mb-1">
              No matching farmers markets found
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your district, day of week, or search keyword to view nearby markets.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMarkets.map((mkt) => {
              const openNow = isMarketOpenNow(mkt);
              const bookmarked = isBookmarked ? isBookmarked(mkt.id) : false;

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

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleToggleCompare(mkt.id);
                            }}
                            title={compareList.includes(mkt.id) ? "Selected for comparison" : "Compare this market"}
                            className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                              compareList.includes(mkt.id)
                                ? 'bg-teal-600 text-white shadow-md'
                                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                            }`}
                          >
                            <Scale className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (onToggleBookmark) {
                                onToggleBookmark({
                                  id: mkt.id,
                                  title: mkt.name,
                                  type: 'Market',
                                  category: mkt.area,
                                  info: mkt.operatingHours,
                                  image: mkt.image
                                });
                              }
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
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-emerald-600 dark:text-emerald-400">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <Link 
                          to={`/markets/${mkt.id}`}
                          className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug block"
                        >
                          {mkt.name}
                        </Link>
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
                        <span className="text-[10px] bg-white dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-bold shadow-xs flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                          <Leaf className="w-2.5 h-2.5 text-emerald-600" />
                          <span>-{((mkt.distanceKm || 3) * 0.45).toFixed(1)} kg CO₂e</span>
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

                    <Link
                      to={`/markets/${mkt.id}`}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View Full Details & Map</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}
        {/* Floating Sticky Compare Action Bar */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
            <div className="pointer-events-auto bg-slate-900/95 text-white backdrop-blur-md border border-slate-700 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-scale-in">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Scale className="w-4 h-4 text-teal-400" />
                <span>{compareList.length} / 2 Selected for Comparison</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCompareModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Compare Now
                </button>
                <button
                  onClick={() => setCompareList([])}
                  className="text-slate-400 hover:text-white text-xs underline cursor-pointer ml-1"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Side-by-Side Market Comparison Modal */}
        <MarketCompareModal
          isOpen={compareModalOpen}
          onClose={() => setCompareModalOpen(false)}
          initialMarketAId={compareList[0]}
          initialMarketBId={compareList[1]}
        />

      </div>
    </div>
  );
}
