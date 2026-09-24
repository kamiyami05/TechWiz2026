import React from 'react';
import { 
  X, MapPin, Clock, Phone, Bookmark, Calendar, 
  Check, Star, ShieldCheck, Share2, Navigation, Leaf
} from 'lucide-react';

export default function MarketDetailModal({ 
  market, 
  onClose, 
  onToggleBookmark, 
  isBookmarked 
}) {
  if (!market) return null;

  const bookmarked = isBookmarked(market.id);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close Market Details"
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-4 pr-10 font-medium">
          <span>Home</span>
          <span>/</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Directory</span>
          <span>/</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{market.name}</span>
        </div>

        {/* Market Cover Photography Banner */}
        <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800 shadow-sm">
          <img 
            src={market.image} 
            alt={market.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md shadow-sm">
              {market.area}
            </span>
            <span className="text-xs bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-bold flex items-center gap-1 text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              {market.rating} / 5.0 Rating
            </span>
          </div>
        </div>

        {/* Market Title & Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-4xl shadow-md shrink-0">
            {market.thumbnailIcon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                {market.area}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{market.rating}</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {market.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{market.address}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700">
          {market.description}
        </p>

        {/* Weekly Schedule Table */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Weekly Operating Hours & Schedule:</span>
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                <tr>
                  <th scope="col" className="py-2.5 px-3">Day of Week</th>
                  <th scope="col" className="py-2.5 px-3">Operating Hours</th>
                  <th scope="col" className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {market.weeklySchedule.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {s.day}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {s.hours}
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium">
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

        {/* Typical Products Available Grid */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Farm Produce Typically Available:</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {market.typicalProduce.map((p, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5"
              >
                <span>🌱</span>
                <span>{p}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>Market Location & Directions Map:</span>
          </h4>
          <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
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
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <a 
              href={`tel:${market.phone.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
              title="Call Market Management Desk"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="font-mono">{market.phone}</span>
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(market.name + ' ' + market.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <button
            onClick={() => onToggleBookmark({
              id: market.id,
              title: market.name,
              type: 'Market',
              category: market.area,
              info: market.operatingHours
            })}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{bookmarked ? 'Saved in Notebook' : 'Save Market'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
