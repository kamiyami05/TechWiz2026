import React from 'react';
import { 
  Users, HeartHandshake, ShieldCheck, Sprout, 
  Leaf, Award, Globe, ArrowRight, CheckCircle2, 
  MapPin, Sparkles, TrendingUp
} from 'lucide-react';

export default function AboutUs() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Origin Transparency',
      desc: '100% of produce featured in our directory is traceable to verifiable farm addresses, organic bio-fertilizer practices, and zero toxic chemical residue.'
    },
    {
      icon: Sprout,
      title: 'Respect for Seasonality',
      desc: 'Promoting "Eat with the Seasons" awareness—allowing crops to mature naturally under the sun, delivering peak vitamins, crispness, and authentic flavor.'
    },
    {
      icon: HeartHandshake,
      title: 'Direct Farmer Empowerment',
      desc: 'Disintermediating unnecessary supply middlemen so that hard-working family farmers receive fair-trade value for their honest labor in the fields.'
    },
    {
      icon: Globe,
      title: 'Eco-Footprint Reduction',
      desc: 'Drastically cutting food transport miles, advocating for banana leaf wrapping, natural woven baskets, and eliminating single-use plastics.'
    }
  ];

  const stats = [
    { number: '24+', label: 'Farmers Markets', sub: 'Across Hanoi and regional farming hubs' },
    { number: '150+', label: 'Partner Family Farms', sub: 'VietGAP & organically certified growers' },
    { number: '12,500+', label: 'Active Community Shoppers', sub: 'Using FreshFind market planners every week' },
    { number: '100%', label: 'In-Season Commitment', sub: 'Harvested fresh on market morning' },
  ];

  const ourTeam = [
    {
      name: 'Huong',
      role: 'Project Manager',
      circleColor: '#059669',
      roleColor: 'text-emerald-600 dark:text-emerald-400',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300',
      tagline: 'Product Roadmap & Partner Coordination',
      bio: 'Directs roadmap execution, connects with regional organic farms, and ensures FreshFind adheres to rigorous food transparency standards.'
    },
    {
      name: 'Xuan',
      role: 'Lead Developer',
      circleColor: '#059669',
      roleColor: 'text-emerald-600 dark:text-emerald-400',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300',
      tagline: 'Platform Architecture & Geospatial Systems',
      bio: 'Architects the responsive React SPA, interactive Leaflet mapping, live open-market status logic, and client-side shopping notebook.'
    },
    {
      name: 'Chuong',
      role: 'QA Tester',
      circleColor: '#059669',
      roleColor: 'text-emerald-600 dark:text-emerald-400',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300',
      tagline: 'Data Quality & Usability Testing',
      bio: 'Verifies market locations, seasonal calendar precision, and conducts rigorous cross-device test coverage for a seamless user experience.'
    }
  ];

  const agriculturalPartner = {
    name: 'Alliance of Clean Agriculture Cooperatives',
    role: 'Certified VietGAP Supply Network',
    quote: 'Dedicated to natural regenerative farming practices that honor topsoil health and groundwater reserves for future generations.',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80',
    badge: '150+ Family Farms'
  };

  return (
    <section 
      id="about" 
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-emerald-100 dark:border-emerald-950 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>About Us • Championing Sustainable Agriculture</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Mission & Guiding Principles
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            FreshFind was created as an intuitive digital companion to solve information fragmentation between local farmers markets and eco-conscious urban residents.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-stone-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Numbers Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-8 sm:p-10 text-white shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
                Measurable Environmental & Social Impact
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
                Standing Strong with Regional Growers
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {stats.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="font-mono text-3xl sm:text-4xl font-black text-amber-300 mb-1">
                    {s.number}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-white">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-emerald-100 mt-0.5 opacity-80">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section with Custom Project Adaptation */}
        <div className="mb-16">
          <p className="text-center text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            Our mission is to simplify farmers' market discovery, making it easy for every resident to manage the health, sustainability, and seasonal nutrition of their families through a comprehensive and user-friendly tech platform.
          </p>

          <div className="bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 sm:mb-12 font-display">
              Our Team
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-4xl mx-auto">
              {ourTeam.map((member) => (
                <div key={member.name} className="flex flex-col items-center group">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-lg transition-transform duration-300 group-hover:scale-105 select-none"
                    style={{ backgroundColor: member.circleColor }}
                  >
                    {member.name}
                  </div>

                  <h4 className="mt-4 font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                    {member.name}
                  </h4>

                  <p className={`text-xs sm:text-sm font-bold ${member.roleColor} mt-0.5`}>
                    {member.role}
                  </p>

                  <span className={`inline-block mt-2.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${member.badgeColor}`}>
                    {member.tagline}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed max-w-xs text-center">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agricultural Partner Alliance */}
        <div className="bg-stone-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-16 group hover:border-emerald-500/60 transition-all">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0 border border-emerald-300 dark:border-emerald-800 bg-emerald-100">
            <img 
              src={agriculturalPartner.image} 
              alt={agriculturalPartner.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80"; }}
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                {agriculturalPartner.name}
              </h4>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 self-center sm:self-auto">
                {agriculturalPartner.badge}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-2">
              {agriculturalPartner.role}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "{agriculturalPartner.quote}"
            </p>
          </div>
        </div>

        {/* Visual Story: From Soil to Stall */}
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
              Field Moments • Visual Archive
            </span>
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              From Soil to Market Stall: A Visual Journey
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative rounded-2xl overflow-hidden h-48 group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80" 
                alt="Highland Terraces & Soil" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-white text-xs font-bold">1. Ecological Terraces & Soil</span>
                <span className="text-[11px] text-emerald-300">Clean irrigation & bio-composting</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-48 group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80" 
                alt="Morning Dawn Harvest" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-white text-xs font-bold">2. Hand-Harvesting at Dawn</span>
                <span className="text-[11px] text-emerald-300">Preserving crisp freshness & vitamins</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-48 group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80" 
                alt="Community Market Morning" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-white text-xs font-bold">3. Direct Market Fair</span>
                <span className="text-[11px] text-emerald-300">Fair trade without middlemen</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
