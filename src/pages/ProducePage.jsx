import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Carrot, Calendar, ChevronRight, Grid, Sparkles, 
  Leaf, Info, ShieldCheck, Sprout, ArrowRight
} from 'lucide-react';
import ProduceGuide from '../components/ProduceGuide';
import FarmRecipesSection from '../components/FarmRecipesSection';
import { useLanguage } from '../context/LanguageContext';

const HARVEST_HEATMAP = [
  { crop: 'Strawberries', type: 'Highland Berry', months: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1] },
  { crop: 'Butter Avocado', type: 'Tree Fruit', months: [0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0] },
  { crop: 'Cherry Tomatoes', type: 'Vine Vegetable', months: [2, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2, 2] },
  { crop: 'Curly Kale', type: 'Cruciferous Green', months: [2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2] },
  { crop: 'Green Pomelo', type: 'Specialty Citrus', months: [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0] },
  { crop: 'Green Rice Flakes', type: 'Heirloom Grain', months: [0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0] },
  { crop: 'Broccoli & Cabbage', type: 'Brassica', months: [2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2] },
  { crop: 'Sweet Herbs & Mint', type: 'Culinary Herb', months: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] }
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ProducePage({ onToggleBookmark, isBookmarked }) {
  const [showMatrix, setShowMatrix] = useState(true);

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
            Produce Guide & Harvest Heatmap
          </span>
        </nav>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Carrot className="w-3.5 h-3.5" />
            <span>Produce Encyclopedia • 12-Month Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Produce Guide & Farm Traceability
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Learn crop origin provenance, optimal refrigeration storage guidelines, and nutritional profiles for peak health.
          </p>
        </div>

        {/* 12-Month Interactive Harvest Heatmap Matrix */}
        <div className="mb-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase mb-1">
                <Grid className="w-3 h-3" />
                <span>Agricultural Heatmap</span>
              </div>
              <h2 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Annual Regional Crop Harvest Heatmap Matrix</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Visual matrix tracking planting, early growth, and peak organic harvest windows in Northern & Central Vietnam.
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-xs bg-stone-50 dark:bg-slate-900/60 p-2 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block shadow-xs" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Peak Harvest (★)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 inline-block" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Early Crop (•)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-stone-200 dark:bg-slate-700 inline-block" />
                <span className="text-slate-400">Off-Season (-)</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/80">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="col" className="py-3 px-4 text-left font-bold text-slate-700 dark:text-slate-300">
                    Crop & Variety
                  </th>
                  {MONTH_NAMES.map((m, idx) => (
                    <th key={idx} scope="col" className="py-3 px-2 text-center font-bold text-slate-600 dark:text-slate-400">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {HARVEST_HEATMAP.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {item.crop}
                      <span className="block text-[10px] font-normal text-slate-500">{item.type}</span>
                    </td>
                    {item.months.map((val, mIdx) => (
                      <td key={mIdx} className="py-3 px-2 text-center">
                        <span
                          className={`inline-block w-7 h-7 rounded-lg text-[11px] font-bold leading-7 transition-all ${
                            val === 2
                              ? 'bg-emerald-600 text-white shadow-xs scale-105'
                              : val === 1
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                              : 'bg-stone-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
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

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              Tip: Buying crops marked with <strong>★ (Peak Harvest)</strong> guarantees maximum natural sweetness without chemical accelerants.
            </span>
            <Link
              to="/seasonal"
              className="text-emerald-600 font-bold hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>Explore 4-Season Recipe Picks →</span>
            </Link>
          </div>
        </div>

        {/* Core Produce Guide Section */}
        <ProduceGuide
          hideHeader={true}
          onToggleBookmark={onToggleBookmark}
          isBookmarked={isBookmarked}
        />

        {/* Farm-to-Kitchen Recipes Section */}
        <FarmRecipesSection />

      </div>
    </div>
  );
}
