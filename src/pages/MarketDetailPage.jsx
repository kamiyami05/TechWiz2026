import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Clock, Phone, Bookmark, Calendar, 
  Check, Star, ShieldCheck, Share2, Navigation, Leaf, Store,
  ChevronRight, Award, Sprout, HeartHandshake, CheckCircle2, UserCheck
} from 'lucide-react';
import markets from '../data/markets.json';
import MarketReviews from '../components/MarketReviews';

export default function MarketDetailPage({ 
  onToggleBookmark, 
  isBookmarked,
  currentUser,
  onOpenAuth
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const market = markets.find(m => m.id === id);

  // If market not found, render 404-style recovery screen
  if (!market) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center animate-fade-in">
        <Store className="w-16 h-16 text-emerald-600/60 mx-auto mb-4" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          Farmers Market Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
          The requested market profile could not be located. It may have moved or been updated.
        </p>
        <Link
          to="/markets"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Market Directory</span>
        </Link>
      </div>
    );
  }

  // Determine current day of week and current decimal hour
  const now = new Date();
  const currentDayOfWeek = now.getDay();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isOpenToday = market.openDaysOfWeek?.includes(currentDayOfWeek);
  const isInTimeRange = currentHour >= market.openHourStart && currentHour <= market.openHourEnd;
  const openNow = isOpenToday && isInTimeRange;

  const bookmarked = isBookmarked ? isBookmarked(market.id) : false;

  // Stalls data for this market
  const stalls = [
    {
      name: "Moc Chau Highland Greens Cooperative",
      stallNo: "Stall A01 - A04",
      grower: "Mr. Tran Van Thao",
      specialty: "Crisp Kale, Bok Choy, Certified Hydroponic Lettuces",
      cert: "VietGAP Certified"
    },
    {
      name: "Da Lat Berry & Tomato Haven",
      stallNo: "Stall B08 - B10",
      grower: "Ms. Nguyen Thi Mai",
      specialty: "Sweet Strawberries, Chocolate Cherry Tomatoes",
      cert: "GlobalGAP Certified"
    },
    {
      name: "Ba Vi Eco-Pasture Dairy & Eggs",
      stallNo: "Stall C02",
      grower: "Cooperative Farm #12",
      specialty: "Raw Morning Milk, Free-Range Herbal Eggs",
      cert: "100% Organic Pasture"
    },
    {
      name: "Central Highlands Honey & Avocados",
      stallNo: "Stall D05 - D06",
      grower: "Mr. Y-Ksor",
      specialty: "034 Butter Avocados, Wild Forest Raw Honey",
      cert: "Forest Certified Origin"
    }
  ];

  // Other recommended markets
  const otherMarkets = markets.filter(m => m.id !== market.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: market.name,
        text: `Check out ${market.name} on FreshFind!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Market link copied to clipboard!');
    }
  };

  return (
    <div className="py-8 md:py-14 bg-stone-50 dark:bg-slate-900 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-emerald-600 transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/markets" className="hover:text-emerald-600 transition-colors font-medium">
              Market Directory
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[200px] sm:max-w-none">
              {market.name}
            </span>
          </nav>

          <Link
            to="/markets"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Markets</span>
          </Link>
        </div>

        {/* Grand Hero Photo Banner */}
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden mb-8 bg-slate-100 dark:bg-slate-800 shadow-xl">
          <img 
            src={market.image} 
            alt={market.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none" />

          {/* Top Floating Controls on Banner */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 text-emerald-800 dark:text-emerald-300 backdrop-blur-md shadow-md">
                {market.area}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                openNow ? 'bg-emerald-600 text-white' : 'bg-black/70 text-slate-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${openNow ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
                <span>{openNow ? 'OPEN RIGHT NOW' : 'CLOSED NOW'}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                title="Share Market Link"
                className="p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:bg-white backdrop-blur-md shadow-md cursor-pointer transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (onToggleBookmark) {
                    onToggleBookmark({
                      id: market.id,
                      title: market.name,
                      type: 'Market',
                      category: market.area,
                      info: market.operatingHours,
                      image: market.image
                    });
                  }
                }}
                title={bookmarked ? "Saved in Notebook" : "Save Market"}
                className={`p-2.5 rounded-2xl backdrop-blur-md shadow-md transition-all cursor-pointer flex items-center gap-2 font-bold text-xs ${
                  bookmarked 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:bg-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">{bookmarked ? 'Saved in Notebook' : 'Save to Notebook'}</span>
              </button>
            </div>
          </div>

          {/* Bottom Info Floating on Banner */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white pointer-events-none">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-white shadow-sm">
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span>{market.rating} / 5.0 Rating</span>
                </div>
                <div className="flex items-center gap-1 bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-white shadow-sm">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>{market.distanceKm || 3.5} km from Center</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                {market.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 flex items-center gap-1.5 drop-shadow-sm">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{market.address}</span>
              </p>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <a
                href={`tel:${market.phone.replace(/[^0-9+]/g, '')}`}
                className="px-4 py-2.5 rounded-2xl bg-white text-emerald-800 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{market.phone}</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(market.name + ' ' + market.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-700 transition-colors shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Column (2 Cols): Overview, Schedule, Stalls */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview & Credentials */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-600" />
                <span>About this Farmers Market</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {market.description}
              </p>

              {/* Eco stats pill */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Estimated Food Distance: <strong>{market.distanceKm || 3.5} km</strong></span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold">
                  -{( (market.distanceKm || 3.5) * 0.45 ).toFixed(1)} kg CO₂e / Basket
                </span>
              </div>
            </div>

            {/* Weekly Operating Hours & Schedule Table */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>Weekly Schedule & Operating Hours</span>
              </h2>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-700 dark:text-slate-300">
                    <tr>
                      <th scope="col" className="py-3 px-4">Day of Week</th>
                      <th scope="col" className="py-3 px-4">Operating Hours</th>
                      <th scope="col" className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {market.weeklySchedule?.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                          {s.day}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">
                          {s.hours}
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status.toLowerCase().includes('open') 
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stalls & Cooperative Growers Directory */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  <span>Stall Directory & Family Growers</span>
                </h2>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md">
                  4 Verified Stalls
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stalls.map((stall, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-400 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{stall.stallNo}</span>
                      <span className="text-[10px] bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-sans">
                        {stall.cert}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {stall.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Grower Lead: <strong>{stall.grower}</strong>
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 bg-white dark:bg-slate-800/80 p-2 rounded-xl border border-slate-100 dark:border-slate-700/50">
                      {stall.specialty}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (1 Col): Typical Produce, Interactive Map, Contact Card */}
          <div className="space-y-6">
            
            {/* Typical Produce Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Fresh Produce Available</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Typically harvested on market morning and delivered directly by growers:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {market.typicalProduce.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5"
                  >
                    <Leaf className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{p}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>Location & Directions</span>
              </h3>
              <div className="h-48 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-3">
                <iframe
                  title={`Interactive Map for ${market.name}`}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096814183571!2d105.78010807587847!3d21.02881188777718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86cece9f61%3A0x7720e5506f311be0!2sAptech%20Computer%20Education!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-slate-500 mb-3">
                {market.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(market.name + ' ' + market.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate in Google Maps</span>
              </a>
            </div>

            {/* Market Contact Desk */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Management Desk</span>
              </h3>
              <p className="text-xs text-slate-500">
                For stall bookings, wholesale produce inquiries, or volunteer market coordinating:
              </p>
              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700">
                <div className="text-[11px] text-slate-500">Telephone / Zalo:</div>
                <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                  {market.phone}
                </div>
              </div>
              <button
                onClick={() => {
                  if (onToggleBookmark) {
                    onToggleBookmark({
                      id: market.id,
                      title: market.name,
                      type: 'Market',
                      category: market.area,
                      info: market.operatingHours,
                      image: market.image
                    });
                  }
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-emerald-600" />
                <span>{bookmarked ? 'Remove from Notebook' : 'Save Market to Notebook'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Community Reviews & Ratings Section */}
        <MarketReviews 
          marketId={market.id} 
          marketName={market.name} 
          currentUser={currentUser}
          onOpenAuth={onOpenAuth}
        />

        {/* Other Recommended Farmers Markets */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Discover Other Nearby Farmers Markets
              </h3>
              <p className="text-xs text-slate-500">
                Explore neighboring community markets in Hanoi.
              </p>
            </div>
            <Link
              to="/markets"
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherMarkets.map((other) => (
              <Link
                key={other.id}
                to={`/markets/${other.id}`}
                className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="h-32 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                    <img 
                      src={other.image} 
                      alt={other.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                    {other.area.split(',')[0]}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {other.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {other.operatingHours}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-amber-500 font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {other.rating}
                  </span>
                  <span className="text-emerald-600 font-bold text-[11px] group-hover:translate-x-1 transition-transform">
                    Explore Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
