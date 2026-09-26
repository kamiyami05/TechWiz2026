import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Compass, Send, Check, 
  Sparkles, HeartHandshake, ShieldCheck, AlertCircle, MessageSquare, Leaf
} from 'lucide-react';

export default function ContactAbout({ hideHeader = false }) {
  const [gpsLocation, setGpsLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [sentTicketId, setSentTicketId] = useState('');

  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Register a New Farmers Market',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleGetLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            lat: position.coords.latitude.toFixed(4),
            lng: position.coords.longitude.toFixed(4),
            source: 'Live Browser GPS Telemetry'
          });
          setIsLocating(false);
        },
        (error) => {
          setGpsLocation({
            lat: '21.0285',
            lng: '105.7820',
            source: 'Default Regional Hub: Cau Giay, Hanoi'
          });
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setGpsLocation({
        lat: '21.0285',
        lng: '105.7820',
        source: 'Default Regional Hub: Cau Giay, Hanoi'
      });
      setIsLocating(false);
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!feedbackForm.name.trim()) {
      errs.name = 'Please provide your full name.';
    } else if (feedbackForm.name.trim().length < 3) {
      errs.name = 'Full name must contain at least 3 characters.';
    }

    if (!feedbackForm.email.trim()) {
      errs.email = 'Please provide your contact email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackForm.email.trim())) {
      errs.email = 'Please enter a valid email format (e.g., contact@example.com).';
    }

    if (!feedbackForm.phone.trim()) {
      errs.phone = 'Please enter a phone number.';
    } else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(feedbackForm.phone.trim().replace(/\s+/g, '')) && feedbackForm.phone.trim().length < 9) {
      errs.phone = 'Please provide a valid phone number (at least 10 digits).';
    }

    if (!feedbackForm.message.trim()) {
      errs.message = 'Please provide details regarding your inquiry or suggestion.';
    } else if (feedbackForm.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long to provide sufficient context.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const ticketId = `FF-${Date.now().toString().slice(-6)}`;
    setSentTicketId(ticketId);

    // Save feedback to localStorage
    try {
      const stored = localStorage.getItem('freshfind_feedbacks');
      const list = stored ? JSON.parse(stored) : [];
      list.push({
        id: ticketId,
        ...feedbackForm,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('freshfind_feedbacks', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    setFeedbackSent(true);
  };

  const handleResetForm = () => {
    setFeedbackSent(false);
    setFeedbackForm({
      name: '',
      email: '',
      phone: '',
      topic: 'Register a New Farmers Market',
      message: ''
    });
    setFormErrors({});
  };

  const contentGrid = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Geolocation Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Info Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-xl shadow-inner">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    Farm Logistics Coordination Center
                  </h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    FreshFind Ecosystem • Regional Support 24/7
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                FreshFind supports local growers and conscious eaters every step of the way. Reach out through our official channels or propose a new vendor market via the portal.
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-slate-900 flex items-center justify-center text-emerald-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Official Support Desk</span>
                    <a href="mailto:support@freshfind.vn" className="font-semibold hover:text-emerald-600 transition-colors">
                      support@freshfind.vn
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-slate-900 flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Farmer Partner Hotline</span>
                    <a href="tel:+842473008855" className="font-semibold font-mono hover:text-emerald-600 transition-colors">
                      +84 (0) 24 7300 8855 (Grower Liaison)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-slate-900 flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Coordination Headquarters</span>
                    <span className="font-semibold">Agricultural Innovation Center, Cau Giay, Hanoi</span>
                  </div>
                </div>
              </div>

              {/* Geolocation Trigger */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="px-4 py-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Compass className={`w-4 h-4 text-emerald-600 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Detecting GPS Coordinates...' : 'Detect My Live GPS Location'}</span>
                </button>

                {gpsLocation && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs animate-fade-in space-y-1">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      Your Detected Proximity Coordinates:
                    </span>
                    <p className="font-mono text-slate-700 dark:text-slate-300">
                      Latitude: <strong>{gpsLocation.lat}</strong> | Longitude: <strong>{gpsLocation.lng}</strong>
                    </p>
                    <span className="text-[10px] text-slate-500 block">Source: {gpsLocation.source}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Embedded Google Map */}
            <div id="map-section" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 shadow-sm overflow-hidden scroll-mt-28">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Hanoi Regional Agricultural Hubs Map
                </span>
                <span className="text-emerald-600 font-mono text-[11px]">Live Map View</span>
              </div>
              <div className="h-56 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <iframe
                  title="Hanoi Regional Agricultural Hubs Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096814183571!2d105.78010807587847!3d21.02881188777718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86cece9f61%3A0x7720e5506f311be0!2sAptech%20Computer%20Education!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* Right: Validated Feedback & Partner Form */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">
              Propose a Market or Partner With Us
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Are you an organic farm manager or aware of a vibrant local farmers market that should be featured? Submit your details to the coordination board.
            </p>

            {feedbackSent ? (
              <div className="py-12 text-center text-emerald-600 dark:text-emerald-400 space-y-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Submission Successfully Received!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Reference Ticket: <strong className="font-mono text-emerald-700 dark:text-emerald-400">{sentTicketId}</strong>. Our agricultural liaisons have received your proposal and will respond within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Name */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    value={feedbackForm.name}
                    onChange={e => {
                      setFeedbackForm({ ...feedbackForm, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                    }}
                    placeholder="e.g. John Doe / Sarah Jenkins"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                      formErrors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Contact Email:
                    </label>
                    <input
                      type="email"
                      value={feedbackForm.email}
                      onChange={e => {
                        setFeedbackForm({ ...feedbackForm, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      placeholder="farmer@organicfarm.org"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                        formErrors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      value={feedbackForm.phone}
                      onChange={e => {
                        setFeedbackForm({ ...feedbackForm, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      placeholder="+84 912 345 678"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                        formErrors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Topic Selector */}
                <div>
                  <label htmlFor="contact-inquiry-topic" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Inquiry Topic / Proposal Area:
                  </label>
                  <select
                    id="contact-inquiry-topic"
                    name="inquiryTopic"
                    value={feedbackForm.topic}
                    onChange={e => setFeedbackForm({ ...feedbackForm, topic: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Register a New Farmers Market">Register a New Farmers Market in Directory</option>
                    <option value="Propose Seasonal Produce or Farm">Propose Seasonal Produce or Family Farm</option>
                    <option value="Vendor & Cooperative Partnership">Vendor & Cooperative Partnership</option>
                    <option value="General Inquiries & Community Support">General Inquiries & Community Support</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Proposal (≥ 10 characters):
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackForm.message}
                    onChange={e => {
                      setFeedbackForm({ ...feedbackForm, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    placeholder="Provide market name, exact street location, regular operating days, or farm specialty..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                      formErrors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry & Proposal</span>
                </button>
              </form>
            )}
          </div>

        </div>
  );

  if (hideHeader) {
    return contentGrid;
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-stone-50 dark:bg-slate-900 border-t border-emerald-100 dark:border-emerald-950 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Community Outreach & Geographic Lookup</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect with FreshFind Coordinators
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Submit questions, propose a new neighborhood farmers market, or verify your current geographic proximity to nearby markets.
          </p>
        </div>

        {contentGrid}

      </div>
    </section>
  );
}
