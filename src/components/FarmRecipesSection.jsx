import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, Clock, Flame, Sparkles, Check, ChevronRight,
  X, Store, ArrowRight, Utensils, Award, BookOpen, Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import recipes from '../data/recipes.json';
import produceData from '../data/produce.json';
import marketsData from '../data/markets.json';

export default function FarmRecipesSection({ targetProduceId }) {
  const { t, language } = useLanguage();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filterSeason, setFilterSeason] = useState('all');

  const filteredRecipes = recipes.filter(r => {
    if (targetProduceId && r.produceId !== targetProduceId) return false;
    if (filterSeason !== 'all' && !r.season.toLowerCase().includes(filterSeason.toLowerCase())) return false;
    return true;
  });

  // Find markets that sell the key ingredient
  const getMarketsForRecipe = (recipe) => {
    if (!recipe) return [];
    const prod = produceData.find(p => p.id === recipe.produceId);
    if (!prod || !prod.marketsFound) return [];
    return marketsData.filter(m => prod.marketsFound.includes(m.name));
  };

  return (
    <section className="my-12">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ChefHat className="w-3.5 h-3.5" />
            <span>{t('farmToKitchen')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            {t('cookWithProduce')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'vi' 
              ? 'Khám phá công thức nấu ăn ngon, thanh lành và dễ làm từ nông sản tươi thu hoạch tại các chợ nông dân.' 
              : 'Wholesome, chef-curated culinary recipes crafted to highlight the crisp flavor of freshly harvested market produce.'}
          </p>
        </div>

        {/* Season Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['all', 'Spring', 'Summer', 'Autumn', 'Winter'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterSeason(s)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterSeason === s
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {s === 'all' ? t('all') : s}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-emerald-500/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Photo Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={recipe.image} 
                  alt={language === 'vi' ? recipe.title_vi : recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                  {language === 'vi' ? recipe.season_vi : recipe.season}
                </span>

                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                  {language === 'vi' ? recipe.difficulty_vi : recipe.difficulty}
                </span>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{recipe.time}</span>
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {recipe.calories}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {language === 'vi' ? recipe.title_vi : recipe.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {language === 'vi' ? recipe.description_vi : recipe.description}
                </p>

                {/* Key produce tag */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'vi' ? 'Nông sản chủ đạo:' : 'Hero Produce:'}
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs">
                    {language === 'vi' ? recipe.produceName_vi : recipe.produceName}
                  </span>
                </div>
              </div>
            </div>

            {/* Card CTA */}
            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-200/60 dark:border-emerald-800/60 hover:border-emerald-600"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Xem Công Thức & Cách Nấu' : 'View Recipe & Steps'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div 
            className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-scale-in"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header Photo Banner */}
            <div className="relative h-64 sm:h-72 w-full shrink-0 bg-slate-900">
              <img 
                src={selectedRecipe.image} 
                alt={language === 'vi' ? selectedRecipe.title_vi : selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 p-2 rounded-2xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase">
                    {language === 'vi' ? selectedRecipe.season_vi : selectedRecipe.season}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
                    {selectedRecipe.servings}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
                    {selectedRecipe.time}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display leading-tight">
                  {language === 'vi' ? selectedRecipe.title_vi : selectedRecipe.title}
                </h2>
              </div>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
              
              {/* Description */}
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {language === 'vi' ? selectedRecipe.description_vi : selectedRecipe.description}
              </p>

              {/* Chef Tip Box */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-amber-900 dark:text-amber-200 text-xs uppercase tracking-wider mb-0.5">
                    {t('chefTip')}
                  </h4>
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    {language === 'vi' ? selectedRecipe.chefTip_vi : selectedRecipe.chefTip}
                  </p>
                </div>
              </div>

              {/* Ingredients List */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-600" />
                  <span>{t('ingredients')}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {language === 'vi' ? ing.name_vi : ing.name}
                        </span>
                      </div>
                      <span className="font-mono text-slate-500 font-semibold text-[11px]">
                        {ing.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>{t('instructions')}</span>
                </h3>
                <div className="space-y-3">
                  {(language === 'vi' ? selectedRecipe.instructions_vi : selectedRecipe.instructions).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where to Buy Ingredients at Nearby Markets */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-2 font-bold text-emerald-900 dark:text-emerald-200 text-xs">
                  <Store className="w-4 h-4 text-emerald-600" />
                  <span>{t('findIngredientsAt')}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  {language === 'vi'
                    ? `Nguyên liệu "${selectedRecipe.produceName_vi}" được bày bán tại các chợ sau:`
                    : `The fresh "${selectedRecipe.produceName}" is sourced directly at these verified farmers markets:`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {getMarketsForRecipe(selectedRecipe).map((m) => (
                    <Link
                      key={m.id}
                      to={`/markets/${m.id}`}
                      onClick={() => setSelectedRecipe(null)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-slate-700 hover:bg-emerald-600 hover:text-white transition-all shadow-xs"
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>{m.name}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                {language === 'vi' ? 'Đóng Công Thức' : 'Close Recipe'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
