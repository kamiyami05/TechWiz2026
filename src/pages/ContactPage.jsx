import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, ChevronRight, Phone, Mail, MapPin, 
  Compass, HeartHandshake, ShieldCheck 
} from 'lucide-react';
import ContactAbout from '../components/ContactAbout';

export default function ContactPage() {
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
            Contact & Live Geolocation
          </span>
        </nav>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Support • Cooperative Inquiries • GPS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Contact & Farm Logistics Center
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Reach out for market vendor registrations, cooperative partnerships, or use our live GPS detector to locate your nearest farming hub.
          </p>
        </div>

        {/* Core ContactAbout Component */}
        <ContactAbout />

      </div>
    </div>
  );
}
