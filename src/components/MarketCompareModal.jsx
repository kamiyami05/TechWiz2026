import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, Check, Minus, Star, MapPin, Clock, 
  Leaf, Navigation, ChevronRight, Scale, ShieldCheck,
  Car, Heart, Accessibility, CreditCard, Sparkles, Building2
} from 'lucide-react';
import markets from '../data/markets.json';

export default function MarketCompareModal({ 
  isOpen, 
  onClose, 
  initialMarketAId, 
  initialMarketBId 
}) {
  const [marketAId, setMarketAId] = useState(initialMarketAId || markets[0]?.id);
  const [marketBId, setMarketBId] = useState(() => {
    if (initialMarketBId) return initialMarketBId;
    const second = markets.find(m => m.id !== (initialMarketAId || markets[0]?.id));
    return second ? second.id : markets[1]?.id;
  });

  if (!isOpen) return null;

  const marketA = markets.find(m => m.id === marketAId) || markets[0];
  const marketB = markets.find(m => m.id === marketBId) || markets[1];

  // Helper to calculate Open Now status
  const isMarketOpen = (market) => {
    if (!market) return false;
    const now = new Date();
    const currentDayOfWeek = now.getDay();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    const isOpenToday = market.openDaysOfWeek?.includes(currentDayOfWeek);
    const isInTimeRange = currentHour >= market.openHourStart && currentHour <= market.openHourEnd;
    return isOpenToday && isInTimeRange;
  };

  const isAOpen = isMarketOpen(marketA);
  const isBOpen = isMarketOpen(marketB);

  // Amenities map (simulated based on market profiles)
  const getAmenities = (market) => {
    if (!market) return {};
    return {
      freeParking: true,
      petFriendly: market.id === 'mkt-2' || market.id === 'mkt-1',
      wheelchairAccess: true,
      organicCertified: true,
      cardAccepted: true,
      restrooms: true,
      samplingBooth: market.rating >= 4.8
    };
  };

  const amenitiesA = getAmenities(marketA);
  const amenitiesB = getAmenities(marketB);

  const amenitiesList = [
    { key: 'organicCertified', label: '100% Certified Organic', icon: Leaf },
    { key: 'freeParking', label: 'Free Parking', icon: Car },
    { key: 'petFriendly', label: 'Pet-Friendly Grounds', icon: Heart },
    { key: 'wheelchairAccess', label: 'Wheelchair Accessible', icon: Accessibility },
    { key: 'cardAccepted', label: 'Cashless / Card Payments', icon: CreditCard },
    { key: 'restrooms', label: 'Clean Public Restrooms', icon: Building2 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-scale-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl font-display flex items-center gap-2">
                <span>Side-by-Side Market Comparison</span>
              </h2>
              <p className="text-xs text-emerald-100">
                Compare weekly schedule, key amenities, food travel distance, and featured farm produce.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Comparison Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
          
          {/* Selectors Bar */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="compare-market-select-a" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Market Location A:
              </label>
              <select
                id="compare-market-select-a"
                name="compareMarketA"
                value={marketAId}
                onChange={(e) => setMarketAId(e.target.value)}
                className="w-full text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 p-2.5 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {markets.map(m => (
                  <option key={`a-${m.id}`} value={m.id} disabled={m.id === marketBId}>
                    {m.name} ({m.area.split(',')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="compare-market-select-b" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Market Location B:
              </label>
              <select
                id="compare-market-select-b"
                name="compareMarketB"
                value={marketBId}
                onChange={(e) => setMarketBId(e.target.value)}
                className="w-full text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 p-2.5 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {markets.map(m => (
                  <option key={`b-${m.id}`} value={m.id} disabled={m.id === marketAId}>
                    {m.name} ({m.area.split(',')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Header Preview */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Market A Card */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="h-32 rounded-xl overflow-hidden relative">
                <img 
                  src={marketA.image} 
                  alt={marketA.name} 
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 left-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isAOpen ? 'bg-emerald-600 text-white' : 'bg-black/60 text-slate-200'
                }`}>
                  {isAOpen ? 'OPEN NOW' : 'CLOSED'}
                </span>
                <span className="absolute bottom-2 right-2 bg-black/60 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {marketA.rating}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1">
                  {marketA.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{marketA.area}</span>
                </p>
              </div>
            </div>

            {/* Market B Card */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="h-32 rounded-xl overflow-hidden relative">
                <img 
                  src={marketB.image} 
                  alt={marketB.name} 
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 left-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isBOpen ? 'bg-emerald-600 text-white' : 'bg-black/60 text-slate-200'
                }`}>
                  {isBOpen ? 'OPEN NOW' : 'CLOSED'}
                </span>
                <span className="absolute bottom-2 right-2 bg-black/60 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {marketB.rating}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1">
                  {marketB.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{marketB.area}</span>
                </p>
              </div>
            </div>

          </div>

          {/* Side-by-Side Detailed Breakdown Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs">
            
            {/* Row 1: Operating Days */}
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="p-3">
                <div className="font-bold text-slate-500 text-[10px] uppercase mb-1">Operating Days</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {marketA.operatingDays.join(', ')}
                </div>
              </div>
              <div className="p-3">
                <div className="font-bold text-slate-500 text-[10px] uppercase mb-1">Operating Days</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {marketB.operatingDays.join(', ')}
                </div>
              </div>
            </div>

            {/* Row 2: Hours */}
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700">
              <div className="p-3">
                <div className="font-bold text-slate-500 text-[10px] uppercase mb-1">Operating Hours</div>
                <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {marketA.operatingHours}
                </div>
              </div>
              <div className="p-3">
                <div className="font-bold text-slate-500 text-[10px] uppercase mb-1">Operating Hours</div>
                <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {marketB.operatingHours}
                </div>
              </div>
            </div>

            {/* Row 3: Food Distance & Carbon Offset */}
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700 bg-emerald-50/30 dark:bg-emerald-950/20">
              <div className="p-3">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 text-[10px] uppercase mb-1">Distance & Carbon Offset</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{marketA.distanceKm || 3.5} km • -{((marketA.distanceKm || 3) * 0.45).toFixed(1)} kg CO₂e</span>
                </div>
              </div>
              <div className="p-3">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 text-[10px] uppercase mb-1">Distance & Carbon Offset</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{marketB.distanceKm || 4.2} km • -{((marketB.distanceKm || 4) * 0.45).toFixed(1)} kg CO₂e</span>
                </div>
              </div>
            </div>

            {/* Row 4: Amenities Checklist */}
            <div className="p-3 bg-stone-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] mb-2">
                Market Amenities & Services
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Amenities A */}
                <div className="space-y-1.5">
                  {amenitiesList.map(item => {
                    const Icon = item.icon;
                    const has = amenitiesA[item.key];
                    return (
                      <div key={`a-${item.key}`} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        {has ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                        ) : (
                          <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        <span className="text-[11px]">{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Amenities B */}
                <div className="space-y-1.5">
                  {amenitiesList.map(item => {
                    const Icon = item.icon;
                    const has = amenitiesB[item.key];
                    return (
                      <div key={`b-${item.key}`} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        {has ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                        ) : (
                          <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        <span className="text-[11px]">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 5: Typical Produce */}
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700">
              <div className="p-3">
                <div className="font-bold text-slate-500 text-[10px] uppercase mb-1.5">Typical Organic Produce</div>
                <div className="flex flex-wrap gap-1">
                  {marketA.typicalProduce.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-medium border border-emerald-200 dark:border-emerald-800">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3">
                <div className="font-bold text-slate-500 text-[10px] uppercase mb-1.5">Typical Organic Produce</div>
                <div className="flex flex-wrap gap-1">
                  {marketB.typicalProduce.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-medium border border-emerald-200 dark:border-emerald-800">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 6: Action CTA Links */}
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 p-3">
              <div className="pr-2">
                <Link
                  to={`/markets/${marketA.id}`}
                  onClick={onClose}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>View Details & Map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="pl-2">
                <Link
                  to={`/markets/${marketB.id}`}
                  onClick={onClose}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>View Details & Map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
