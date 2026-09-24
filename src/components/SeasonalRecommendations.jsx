import React, { useState } from 'react';
import { 
  Calendar, Sparkles, Sun, CloudRain, Snowflake, 
  Wind, Bookmark, Check, ArrowRight, HeartHandshake,
  ShieldCheck, Leaf, ShoppingBag, Info, Grid, Layers
} from 'lucide-react';
import { scrollToSection } from '../utils/navigation';

const SEASONS_DATA = {
  autumn: {
    id: 'autumn',
    name: 'Autumn Season',
    period: 'August - October • Current Peak Harvest',
    icon: Wind,
    color: 'from-amber-500 to-orange-500',
    themeBg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40',
    accentText: 'text-amber-700 dark:text-amber-400',
    tagBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200',
    description: 'Mild autumn weather brings the golden harvest window for aromatic green rice flakes, sweet heirloom persimmons, and crisp early brassicas.',
    items: [
      {
        id: 'season-p1',
        title: 'Young Green Rice Flakes & Sweet Bananas',
        category: 'Autumn Heritage Special',
        icon: '🌾',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
        harvestStatus: 'Peak Harvest 100%',
        nutrition: 'Abundant in natural prebiotic starch, vitamin B6, and potassium to nurture healthy digestion.',
        culinaryTip: 'Wrap in fragrant lotus leaves, enjoy fresh with ripe dwarf bananas, or simmer into sweet lotus seed dessert soup.',
        markets: ['Cau Giay Green Farmers Market', 'Tay Ho EcoMarket & Artisanal Fair'],
        storage: 'Refrigerate airtight for up to 3 days, or vacuum-freeze for 3 months.'
      },
      {
        id: 'season-p2',
        title: 'Phuc Trach & Pink-Flesh Green Pomelos',
        category: 'Specialty Citrus',
        icon: '🍈',
        image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80',
        harvestStatus: 'Prime Citrus Sweetness',
        nutrition: 'Extremely high in Vitamin C and natural naringin, supporting balanced cholesterol and liver wellness.',
        culinaryTip: 'Juicy firm sacs with crisp crunch, sublime for shrimp and herb pomelo salads or refreshing cold-pressed juice.',
        markets: ['Dong Da Organic Farmers Pavilion', 'Ha Dong Safe Agricultural Trade Fair'],
        storage: 'Store in cool ventilated space for 1-2 months; slight skin withering deepens the natural sweetness.'
      },
      {
        id: 'season-p3',
        title: 'Crisp Lang Son Persimmons',
        category: 'Highland Orchard Crop',
        icon: '🍅',
        image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80',
        harvestStatus: 'Daily Influx',
        nutrition: 'Rich in dietary fiber, provitamin A carotenoids, and polyphenols to revitalize skin health.',
        culinaryTip: 'Slice chilled into artisanal goat cheese salads, or enjoy raw with no astringency whatsoever.',
        markets: ['Cau Giay Green Farmers Market', 'Tay Ho EcoMarket & Artisanal Fair'],
        storage: 'Wash, peel, and enjoy immediately, or refrigerate unpeeled for 5-7 days.'
      },
      {
        id: 'season-p4',
        title: 'Early Crop Asian Mustard Greens & Bok Choy',
        category: 'Safe Organic Greens',
        icon: '🥬',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        harvestStatus: 'Hand-Picked at Dawn',
        nutrition: 'High concentrations of glucosinolate antioxidants, natural plant calcium, and dietary folate.',
        culinaryTip: 'Simmer into comforting broth with minced lean pork, flash-steam, or stir-fry with wild oyster mushrooms.',
        markets: ['All 4 Directory Farmers Markets'],
        storage: 'Wrap in clean unbleached paper inside crisper drawer for 3-4 days of crispness.'
      }
    ]
  },
  winter: {
    id: 'winter',
    name: 'Winter Season',
    period: 'November - January • Cool-Climate Superfoods',
    icon: Snowflake,
    color: 'from-blue-500 to-cyan-500',
    themeBg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/40',
    accentText: 'text-blue-700 dark:text-blue-400',
    tagBg: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200',
    description: 'Chilly Northern weather allows cool-season vegetables and berries to concentrate natural sugars, yielding maximum crispness and sweetness.',
    items: [
      {
        id: 'season-p5',
        title: 'Moc Chau Hana White-Snow Strawberries',
        category: 'Temperate Berries',
        icon: '🍓',
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
        harvestStatus: 'Early Crop Mellow',
        nutrition: 'Supercharged Vitamin C content and anthocyanins to protect winter cellular immunity.',
        culinaryTip: 'Pair with organic chia yogurt bowls, blend into antioxidant smoothies, or enjoy fresh right off the vine.',
        markets: ['Cau Giay Green Farmers Market', 'Tay Ho EcoMarket & Artisanal Fair'],
        storage: 'Do not wash prior to storage; keep refrigerated between 2°C and 4°C.'
      },
      {
        id: 'season-p6',
        title: 'Broccoli Crowns & Romanesco Cauliflower',
        category: 'Cruciferous Powerhouse',
        icon: '🥦',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80',
        harvestStatus: 'Tight Crisp Florets',
        nutrition: 'Features Sulforaphane - a potent bioactive compound known for anti-inflammatory and cellular protection properties.',
        culinaryTip: 'Steam for 4 minutes to preserve delicate heat-sensitive enzymes, or roast lightly with garlic and sea salt.',
        markets: ['Dong Da Organic Farmers Pavilion', 'Ha Dong Safe Agricultural Trade Fair'],
        storage: 'Enclose in silicone pouch in vegetable drawer for 5-7 days.'
      }
    ]
  },
  spring: {
    id: 'spring',
    name: 'Spring Season',
    period: 'February - April • Renewal of Sprouts & Microgreens',
    icon: CloudRain,
    color: 'from-emerald-500 to-teal-500',
    themeBg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40',
    accentText: 'text-emerald-700 dark:text-emerald-400',
    tagBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200',
    description: 'Spring rains stimulate tender shoots, edible garden peas, wild mountain bamboo, and vibrant sweet microgreens.',
    items: [
      {
        id: 'season-p7',
        title: 'Heirloom Snow Peas & Tender Pea Shoots',
        category: 'Spring Harvest',
        icon: '🫛',
        image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
        harvestStatus: 'Sweet & Tender',
        nutrition: 'Rich in plant-based proteins, vitamin K1 for bone health, and essential minerals.',
        culinaryTip: 'Quickly wok-toss with garlic on high heat for 60 seconds to lock in bright emerald color and sweet snap.',
        markets: ['Cau Giay Green Farmers Market', 'Tay Ho EcoMarket & Artisanal Fair'],
        storage: 'Keep dry in perforated pouch; consume within 3 days for best snap.'
      }
    ]
  },
  summer: {
    id: 'summer',
    name: 'Summer Season',
    period: 'May - July • Tropical Fruit Abundance',
    icon: Sun,
    color: 'from-amber-400 to-rose-500',
    themeBg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/40',
    accentText: 'text-rose-700 dark:text-rose-400',
    tagBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200',
    description: 'High summer sun delivers concentrated natural sugars in tropical stone fruits, avocados, lychees, and succulent melons.',
    items: [
      {
        id: 'season-p8',
        title: 'Dak Lak Butter Avocados & Golden Melons',
        category: 'Highland Summer Pick',
        icon: '🥑',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
        harvestStatus: 'Rich & Creamy',
        nutrition: 'Packed with oleic acid, lutein for vision support, and natural vitamin E.',
        culinaryTip: 'Mash onto whole grain artisanal toast with sea salt flakes, or blend into creamy vegan smoothies.',
        markets: ['Tay Ho EcoMarket & Artisanal Fair', 'Dong Da Organic Farmers Pavilion'],
        storage: 'Ripen at room temperature; once soft, refrigerate for up to 4 days.'
      }
    ]
  }
};

// Breakthrough Feature: 12-Month Harvest Heatmap Data
const HARVEST_HEATMAP = [
  { crop: 'Strawberries', type: 'Fruit', months: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1] },
  { crop: 'Butter Avocado', type: 'Fruit', months: [0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0] },
  { crop: 'Cherry Tomatoes', type: 'Vegetable', months: [2, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2, 2] },
  { crop: 'Curly Kale', type: 'Vegetable', months: [2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2] },
  { crop: 'Green Pomelo', type: 'Fruit', months: [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0] },
  { crop: 'Green Rice Flakes', type: 'Grain', months: [0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0] },
  { crop: 'Broccoli & Cabbage', type: 'Vegetable', months: [2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2] },
  { crop: 'Sweet Herbs & Mint', type: 'Herb', months: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] }
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function SeasonalRecommendations({ onToggleBookmark, isBookmarked }) {
  const [selectedSeason, setSelectedSeason] = useState('autumn');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'heatmap'

  const currentSeasonData = SEASONS_DATA[selectedSeason];

  return (
    <section id="seasonal" className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-emerald-100 dark:border-emerald-950 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Seasonal Recommendations • Farm-to-Table Peak Calendar
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Eat with the Seasons: What's Fresh Right Now
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Produce harvested in its natural season holds the highest nutrient density, superior flavor, and lower agricultural footprint.
          </p>

          {/* View Mode Switcher */}
          <div className="mt-5 inline-flex p-1 rounded-2xl bg-stone-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Seasonal Highlights</span>
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'heatmap'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>12-Month Harvest Heatmap</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </button>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <>
            {/* Season Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {Object.values(SEASONS_DATA).map((s) => {
                const Icon = s.icon;
                const isSelected = selectedSeason === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSeason(s.id)}
                    className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                        : 'bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{s.name}</span>
                    {s.id === 'autumn' && (
                      <span className="text-[10px] bg-white text-emerald-800 px-1.5 py-0.5 rounded font-black">
                        Current
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Current Season Description Card */}
            <div className={`p-5 rounded-3xl border ${currentSeasonData.themeBg} mb-10 text-center max-w-3xl mx-auto shadow-xs`}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xl">🍂</span>
                <h3 className={`font-bold text-sm sm:text-base ${currentSeasonData.accentText}`}>
                  {currentSeasonData.period}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentSeasonData.description}
              </p>
            </div>

            {/* Seasonal Produce Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSeasonData.items.map((item) => {
                const bookmarked = isBookmarked(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-stone-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Seasonal Produce Photo Banner */}
                      <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-700">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80";
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs ${currentSeasonData.tagBg}`}>
                            {item.category}
                          </span>

                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {item.harvestStatus}
                          </span>
                        </div>

                        {/* Bottom Tag on Photo */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                          <span className="text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            {currentSeasonData.name} Pick
                          </span>
                        </div>
                      </div>

                      {/* Header with Icon */}
                      <div className="flex items-start gap-3.5 mb-3.5">
                        <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Available at:&nbsp;</span>
                            <span 
                              onClick={() => {
                                scrollToSection('directory', 20);
                              }}
                              className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                              title="Click to view in Directory"
                            >
                              {item.markets.join(', ')}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Nutrition & Tip Boxes */}
                      <div className="space-y-2.5 mb-5 text-xs text-slate-600 dark:text-slate-300">
                        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 leading-relaxed">
                          <strong className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1 font-bold text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            <Sparkles className="w-3 h-3" />
                            Peak Season Nutritional Profile:
                          </strong>
                          <span>{item.nutrition}</span>
                        </div>

                        <div className="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 leading-relaxed">
                          <strong className="text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1 font-bold text-[11px] uppercase tracking-wider">
                            <Leaf className="w-3 h-3" />
                            Farm Culinary & Preparation Tip:
                          </strong>
                          <span>{item.culinaryTip}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer action */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        💡 {item.storage}
                      </span>

                      <button
                        onClick={() => onToggleBookmark({
                          id: item.id,
                          title: item.title,
                          type: 'Seasonal Produce',
                          category: item.category,
                          info: `${currentSeasonData.name} • ${item.harvestStatus}`,
                          image: item.image
                        })}
                        className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          bookmarked
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-emerald-50 dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{bookmarked ? 'Saved in Notebook' : 'Save to Notebook'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Breakthrough Feature: 12-Month Interactive Harvest Heatmap */
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <span>📅</span>
                  <span>Annual Regional Crop Harvest Heatmap Matrix</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Visual calendar of when key regional fruits and greens reach peak organic harvest.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block" />
                  <span>Peak Harvest</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-200 dark:bg-emerald-950 inline-block" />
                  <span>Early Crop</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-stone-100 dark:bg-slate-700 inline-block" />
                  <span>Off-Season</span>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <th scope="col" className="py-2.5 px-3 text-left font-bold text-slate-700 dark:text-slate-300">
                      Crop & Category
                    </th>
                    {MONTH_NAMES.map((m, idx) => (
                      <th key={idx} scope="col" className="py-2.5 px-2 text-center font-bold text-slate-500">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {HARVEST_HEATMAP.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">
                        {item.crop}
                        <span className="block text-[10px] font-normal text-slate-400">{item.type}</span>
                      </td>
                      {item.months.map((val, mIdx) => (
                        <td key={mIdx} className="py-3 px-2 text-center">
                          <span
                            className={`inline-block w-6 h-6 rounded-lg text-[10px] font-bold leading-6 transition-all ${
                              val === 2
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : val === 1
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                : 'bg-stone-100 dark:bg-slate-700/40 text-slate-300 dark:text-slate-600'
                            }`}
                          >
                            {val === 2 ? '★' : val === 1 ? '•' : '-'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
