import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, ChevronRight, HeartHandshake, ShieldCheck, 
  Sprout, Leaf, ArrowRight, Store, MessageSquare 
} from 'lucide-react';
import AboutUs from '../components/AboutUs';

export default function AboutPage() {
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
            About Our Mission & Team
          </span>
        </nav>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Our Story • Core Pillars • Team</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            The Story Behind FreshFind
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Dedicated to championing sustainable family agriculture, short supply chains, and healthy, non-toxic meals for every community.
          </p>
        </div>

        {/* Core AboutUs Component */}
        <AboutUs />

        {/* Navigation CTAs */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-2">
            Experience Farm-Fresh Living in Person
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto mb-6">
            Find the closest market stall opening this weekend or send our organizing team a message.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/markets"
              className="px-6 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-md flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-emerald-700" />
              <span>Browse Farmers Markets</span>
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs border border-emerald-500 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Logistics Center</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
