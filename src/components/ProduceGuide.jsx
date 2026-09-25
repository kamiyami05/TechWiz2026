import React, { useState, useMemo } from 'react';
import { 
  Carrot, Calendar, MapPin, Bookmark, Sparkles, 
  Info, Check, ChevronRight, ShieldCheck, QrCode,
  X, Truck, Sprout, Award, CheckCircle2, Leaf
} from 'lucide-react';
import produceData from '../data/produce.json';
import markets from '../data/markets.json';
import { Link, useNavigate } from 'react-router-dom';

export default function ProduceGuide({ onToggleBookmark, isBookmarked, hideHeader = false }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inspectedProduce, setInspectedProduce] = useState(null);

  const categories = [
    { id: 'all', label: 'All Produce' },
    { id: 'Fruits', label: 'Fruits' },
    { id: 'Vegetables', label: 'Vegetables' },
    { id: 'Herbs', label: 'Culinary Herbs' },
    { id: 'Dairy & Eggs', label: 'Dairy & Eggs' },
  ];

  const filteredProduce = useMemo(() => {
    if (selectedCategory === 'all') return produceData;
    return produceData.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const content = (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Produce Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduce.map((item) => {
            const bookmarked = isBookmarked(item.id);

            return (
              <div
                key={item.id}
                className="bg-stone-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Produce Photography Banner */}
                  <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-700">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-emerald-800 dark:text-emerald-300 backdrop-blur-md shadow-xs">
                        {item.category}
                      </span>
                      <button
                        onClick={() => onToggleBookmark({
                          id: item.id,
                          title: item.name,
                          type: 'Produce',
                          category: item.category,
                          info: item.season,
                          image: item.image
                        })}
                        title={bookmarked ? "Saved in Notebook" : "Save to Notebook"}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                          bookmarked 
                            ? 'bg-emerald-600 text-white shadow-md' 
                            : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Info on Photo */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                      <span className="text-[11px] font-semibold text-emerald-300 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        {item.season}
                      </span>
                      <span className="text-[10px] bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-lg font-medium text-slate-200">
                        {item.foodMiles || 45} km food miles
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs group-hover:scale-105 transition-transform shrink-0">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {item.farmOrigin?.split(',')[0] || 'Local Certified Grower'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="p-3 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-xs mb-4">
                    <span className="font-bold text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Key Nutritional Facts:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      {item.nutrition}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Available At Farmers Markets:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.marketsFound.map((mName, idx) => (
                        <span
                          key={idx}
                          onClick={() => {
                            const found = markets.find(m => m.name.toLowerCase().includes(mName.toLowerCase()) || mName.toLowerCase().includes(m.name.toLowerCase()));
                            if (found) {
                              navigate(`/markets/${found.id}`);
                            } else {
                              navigate('/markets');
                            }
                          }}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 cursor-pointer transition-colors"
                          title="Click to view market schedule & map"
                        >
                          {mName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Breakthrough Action: Inspect Farm Passport */}
                  <button
                    onClick={() => setInspectedProduce(item)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inspect Digital Farm Passport</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Breakthrough Modal: Digital Farm Passport & Batch Traceability Explorer */}
        {inspectedProduce && (
          <div 
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setInspectedProduce(null)}
          >
            <div 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[88vh] overflow-y-auto animate-scale-in"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setInspectedProduce(null)}
                aria-label="Close Farm Passport"
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Agricultural Provenance</span>
              </div>

              {/* Farm Passport Cover Photo */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 shadow-sm">
                <img 
                  src={inspectedProduce.image} 
                  alt={inspectedProduce.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-md">
                    {inspectedProduce.category}
                  </span>
                  <span className="text-[11px] font-mono bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    {inspectedProduce.harvestBatch || 'MC-2026-HQ01'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs shrink-0">
                  <Leaf className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                    {inspectedProduce.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Batch Code: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{inspectedProduce.harvestBatch || 'MC-2026-HQ01'}</strong>
                  </p>
                </div>
              </div>

              {/* Provenance Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Farm of Origin</span>
                  <strong className="text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">
                    {inspectedProduce.farmOrigin || 'Regional Organic Cooperative'}
                  </strong>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Eco Food Distance</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 text-xs mt-0.5 block">
                    {inspectedProduce.foodMiles || 45} km (Saves {inspectedProduce.carbonSavedKg || 2.5} kg CO₂e)
                  </strong>
                </div>
              </div>

              {/* 4-Step Interactive Farm-to-Table Timeline */}
              <div className="mb-6">
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  Crop Lifecycle & Custody Timeline:
                </h4>
                <div className="space-y-3 pl-2 border-l-2 border-emerald-500/40 ml-2">
                  <div className="relative pl-5">
                    <span className="absolute -left-[1.4rem] top-0.5 w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white block">Step 1: Bio-Soil Seeding & Organic Cultivation</span>
                    <p className="text-[11px] text-slate-500">Grown without chemical pesticides using micro-organic fertilization.</p>
                  </div>
                  <div className="relative pl-5">
                    <span className="absolute -left-[1.4rem] top-0.5 w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white block">Step 2: VietGAP Inspection & Lab Certification</span>
                    <p className="text-[11px] text-slate-500">Soil, water, and nitrate residue verified compliant with safety standards.</p>
                  </div>
                  <div className="relative pl-5">
                    <span className="absolute -left-[1.4rem] top-0.5 w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white block">Step 3: Dawn Harvesting (05:00 AM)</span>
                    <p className="text-[11px] text-slate-500">Hand-picked at peak moisture and sugar balance on market morning.</p>
                  </div>
                  <div className="relative pl-5">
                    <span className="absolute -left-[1.4rem] top-0.5 w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block">Step 4: Cold-Chain Transport to Market Stall</span>
                    <p className="text-[11px] text-slate-500">Delivered within 3 hours directly to authorized community farmers market stalls.</p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setInspectedProduce(null)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Farm Passport
              </button>
            </div>
          </div>
        )}
    </div>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <section id="produce" className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-emerald-100 dark:border-emerald-950 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-emerald-600 transition-colors font-semibold">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md">
            Produce Guide
          </span>
        </nav>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Carrot className="w-3.5 h-3.5" />
            Produce Guide • Regional Agricultural Directory
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Nutritional Excellence & Seasonal Provenance
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Explore nutritional facts, harvest cycles, and trace your food directly back to certified local family orchards.
          </p>
        </div>

        {content}

      </div>
    </section>
  );
}
