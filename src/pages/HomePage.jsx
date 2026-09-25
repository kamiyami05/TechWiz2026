import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Store, MapPin, Clock, Star, Leaf, ArrowRight, 
  Sparkles, CheckCircle2, Sprout, HeartHandshake, ShieldCheck, 
  TrendingUp, Calendar, ChevronRight, Bookmark
} from 'lucide-react';
import Hero from '../components/Hero';
import markets from '../data/markets.json';

export default function HomePage({ onToggleBookmark, isBookmarked }) {
  const navigate = useNavigate();

  // Handle quick search from Hero -> redirect to /markets with query params
  const handleQuickFilter = (filter) => {
    const params = new URLSearchParams();
    if (filter.area && filter.area !== 'all') params.set('area', filter.area);
    if (filter.day && filter.day !== 'all') params.set('day', filter.day);
    if (filter.produceType && filter.produceType !== 'all') params.set('produce', filter.produceType);
    
    navigate(`/markets?${params.toString()}`);
  };

  // Determine current day of week and current decimal hour for live badges
  const now = new Date();
  const currentDayOfWeek = now.getDay();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isMarketOpenNow = (market) => {
    const isOpenToday = market.openDaysOfWeek?.includes(currentDayOfWeek);
    const isInTimeRange = currentHour >= market.openHourStart && currentHour <= market.openHourEnd;
    return isOpenToday && isInTimeRange;
  };

  // Top hot markets (sorted by rating descending)
  const topMarkets = [...markets].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Audio Briefing & Quick Search */}
      <Hero onApplyQuickFilter={handleQuickFilter} />

      {/* Value Pillars Section */}
      <section className="py-14 bg-white dark:bg-slate-900 border-y border-emerald-100 dark:border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              The FreshFind Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Why Shop at Local Farmers Markets?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Building a direct, transparent bridge between conscious urban families and sustainable Vietnamese farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-stone-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-400 transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                100% Origin Verified
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct traceability to certified VietGAP and GlobalGAP family cooperatives. Zero hidden middlemen.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-400 transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Peak Dawn Harvests
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Produce cut at 4:00 AM arrives on market stalls by 7:00 AM, locking in natural crispness and vitamins.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-400 transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Fair Farmer Wages
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                More than 88% of your grocery spending returns directly to the grower's hands and local community.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-400 transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Minimal Food Miles
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Shrinking transport distances from thousands of kilometers to under 10 km, reducing carbon emissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Top Hot Markets Section */}
      <section className="py-16 md:py-20 bg-stone-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Store className="w-3.5 h-3.5" />
                <span>Featured Destinations</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Top Rated Farmers Markets
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Explore the highest-rated community markets with live operating hours and stall schedules.
              </p>
            </div>

            <Link
              to="/markets"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all shrink-0"
            >
              <span>Explore All Markets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMarkets.map((mkt) => {
              const openNow = isMarketOpenNow(mkt);
              const bookmarked = isBookmarked ? isBookmarked(mkt.id) : false;

              return (
                <div
                  key={mkt.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Market Cover Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-xs ${
                          openNow ? 'bg-emerald-600/95 text-white' : 'bg-black/60 text-slate-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${openNow ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
                          <span>{openNow ? 'OPEN NOW' : 'CLOSED'}</span>
                        </span>

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
                          title={bookmarked ? "Saved in Notebook" : "Save Market"}
                          className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                            bookmarked 
                              ? 'bg-emerald-600 text-white shadow-md' 
                              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none text-xs font-bold">
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-lg">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span>{mkt.rating}</span>
                        </div>
                        <span className="text-[11px] text-emerald-300 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-lg">
                          {mkt.distanceKm || 3.5} km
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                        {mkt.area.split(',')[0]}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                        {mkt.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{mkt.address}</span>
                      </p>

                      <div className="mt-3 p-2 rounded-xl bg-stone-50 dark:bg-slate-900/60 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-mono truncate">{mkt.operatingHours}</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {mkt.typicalProduce.slice(0, 2).map((prod, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 truncate max-w-[120px]"
                          >
                            {prod}
                          </span>
                        ))}
                        {mkt.typicalProduce.length > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md text-slate-400">
                            +{mkt.typicalProduce.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="p-4 pt-0">
                    <Link
                      to={`/markets/${mkt.id}`}
                      className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white dark:bg-emerald-950/60 dark:hover:bg-emerald-600 dark:text-emerald-300 dark:hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Stall Schedule</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Two-Column Feature Teaser: Seasonal & Produce Heatmap */}
      <section className="py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Seasonal Teaser Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-200 dark:border-amber-900/50 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Autumn Peak Harvest</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Eat with the Seasons
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Discover what vegetables and heirloom fruits are at peak vitamin density right now. Seasonal harvests require zero artificial ripening and taste unmatched.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                      Young Green Rice Flakes & Sweet Lotus Seeds
                    </span>
                    <span className="text-[10px] ml-auto font-mono text-amber-700 dark:text-amber-400 font-bold">
                      Prime Harvest
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                      Phuc Trach & Pink-Flesh Green Pomelos
                    </span>
                    <span className="text-[10px] ml-auto font-mono text-amber-700 dark:text-amber-400 font-bold">
                      Prime Citrus
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-200/50 dark:border-slate-800">
                <Link
                  to="/seasonal"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-md shadow-amber-600/20"
                >
                  <span>Explore 4-Season Calendar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Produce & Heatmap Matrix Teaser Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200 dark:border-emerald-900/50 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Harvest Intelligence</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  12-Month Crop Harvest Heatmap
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Interactive monthly matrix tracking planting, flowering, and peak harvest windows across 16+ staple vegetables, highland berries, and exotic fruits.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Total Catalog</span>
                    <strong className="text-sm font-extrabold text-slate-900 dark:text-white">16+ Verified Crops</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Farming Standards</span>
                    <strong className="text-sm font-extrabold text-emerald-600">VietGAP & Organic</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Storage Insights</span>
                    <strong className="text-sm font-extrabold text-slate-900 dark:text-white">Crisp Shelf Life</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Traceability</span>
                    <strong className="text-sm font-extrabold text-slate-900 dark:text-white">Farm Passports</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-200/50 dark:border-slate-800">
                <Link
                  to="/produce"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-600/20"
                >
                  <span>Open Produce Guide & Heatmap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Community Action Banner */}
      <section className="py-14 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-800 text-emerald-200">
            Join the Local Food Revolution
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-3">
            Are You a Sustainable Farmer or Cooperative?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-emerald-200 leading-relaxed">
            Register your weekly farmers market or produce stall on FreshFind. Reach conscious local families without intermediary agent fees.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-lg"
            >
              Register a New Market Stall
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm border border-emerald-700 transition-all"
            >
              Learn About Our Mission
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
