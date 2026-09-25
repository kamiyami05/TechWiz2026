import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Heart, Shield, Globe, Carrot, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email) {
      setNewsletterStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus('error');
      setErrorMessage('Invalid email format. E.g., user@example.com');
      return;
    }

    try {
      const stored = localStorage.getItem('freshfind_newsletter_subscribers');
      const list = stored ? JSON.parse(stored) : [];
      if (list.includes(email.toLowerCase())) {
        setNewsletterStatus('success');
        setErrorMessage('This email is already subscribed to weekly harvest updates!');
        return;
      }
      list.push(email.toLowerCase());
      localStorage.setItem('freshfind_newsletter_subscribers', JSON.stringify(list));
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setErrorMessage('');
    } catch (err) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link 
            to="/"
            className="hover:text-emerald-600 transition-colors"
          >
            FreshFind Home
          </Link>
          <span>/</span>
          <Link 
            to="/markets"
            className="text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Farmers' Market Directory & Farm-to-Table Guide
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="FreshFind Logo" 
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              </div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                Fresh<span className="text-emerald-600">Find</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Certified Local Harvest
              </span>
            </Link>
            <p className="text-xs leading-relaxed">
              Empowering communities to discover local farmers' markets, connect directly with sustainable growers, and minimize food miles with fresh, organic produce.
            </p>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              Motto: <em>Fresh All Along</em> • Farm-fresh every single day
            </div>
          </div>

          {/* Quick Links with SPA Link Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/markets" 
                  className="hover:text-emerald-600 transition-colors"
                >
                  Find a Market Nearby
                </Link>
              </li>
              <li>
                <Link 
                  to="/markets" 
                  className="hover:text-emerald-600 transition-colors"
                >
                  Farmers' Market Directory
                </Link>
              </li>
              <li>
                <Link 
                  to="/seasonal" 
                  className="hover:text-emerald-600 transition-colors"
                >
                  Seasonal Picks & Heatmap
                </Link>
              </li>
              <li>
                <Link 
                  to="/produce" 
                  className="hover:text-emerald-600 transition-colors"
                >
                  Produce & Farm Passports
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-emerald-600 transition-colors"
                >
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="hover:text-emerald-600 transition-colors"
                >
                  Contact & Community Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Weekly Harvest Briefing
            </h4>
            <p className="text-[11px] leading-relaxed">
              Receive early alerts on regional specialty harvests, weekend pop-up markets, and seasonal discount drops.
            </p>
            {newsletterStatus === 'success' ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{errorMessage || 'Subscribed successfully! Thank you for supporting regional family agriculture.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'error') setNewsletterStatus(null);
                    }}
                    placeholder="Enter your email address..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                {newsletterStatus === 'error' && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Subscribe to Newsletter</span>
                </button>
              </form>
            )}
          </div>

          {/* Controls & Badges */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Platform Standards
            </h4>
            <ul className="space-y-2">
              <li className="text-[11px] flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Traceable Origin & Organic / GAP Certified</span>
              </li>
              <li className="text-[11px] flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Universal Responsive & Accessible Design</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-sm"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <span>
            © 2026 FreshFind Vietnam. Empowering sustainable regional agriculture and healthy communities.
          </span>
          <div className="flex items-center gap-4">
            <Link 
              to="/about" 
              className="hover:text-emerald-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/about" 
              className="hover:text-emerald-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-emerald-600 transition-colors"
            >
              Support Center
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
