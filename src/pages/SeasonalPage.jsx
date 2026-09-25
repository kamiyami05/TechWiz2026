import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, ChevronRight, Sparkles, Wind, Sun, 
  CloudRain, Snowflake, Leaf, ArrowRight 
} from 'lucide-react';
import SeasonalRecommendations from '../components/SeasonalRecommendations';

export default function SeasonalPage({ onToggleBookmark, isBookmarked }) {
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
            Seasonal Recommendations
          </span>
        </nav>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Eat with the Seasons • 4-Season Calendar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Seasonal Specialties & Harvest Calendar
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Produce harvested in its true natural season holds maximum nutritional density, superior aroma, and requires minimal agricultural interventions.
          </p>
        </div>

        {/* Seasonal Recommendations Core Component */}
        <SeasonalRecommendations
          onToggleBookmark={onToggleBookmark}
          isBookmarked={isBookmarked}
        />

      </div>
    </div>
  );
}
