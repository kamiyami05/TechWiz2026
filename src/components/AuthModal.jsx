import React, { useState } from 'react';
import { 
  X, User, Lock, Mail, Phone, ArrowRight, Check, 
  Eye, EyeOff, ShieldCheck, AlertCircle, Sparkles, LogIn, UserPlus
} from 'lucide-react';

const DEFAULT_USERS = [
  {
    name: 'Sarah Jenkins',
    email: 'consumer@freshfind.vn',
    phone: '0987654321',
    password: 'password123',
    role: 'consumer',
    roleLabel: 'Conscious Consumer'
  },
  {
    name: 'Robert Nguyen',
    email: 'farmer@freshfind.vn',
    phone: '0912345678',
    password: 'password123',
    role: 'farmer',
    roleLabel: 'Moc Chau Eco Orchardist'
  }
];

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('consumer');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgree, setRegAgree] = useState(false);
  const [regErrors, setRegErrors] = useState({});

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [forgotError, setForgotError] = useState('');

  // Success Feedback
  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen) return null;

  // Get all registered users (default + localStorage)
  const getUsersList = () => {
    try {
      const stored = localStorage.getItem('freshfind_registered_users');
      const list = stored ? JSON.parse(stored) : [];
      return [...DEFAULT_USERS, ...list];
    } catch {
      return DEFAULT_USERS;
    }
  };

  // Validate Login
  const validateLogin = () => {
    const errs = {};
    if (!loginEmail.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.trim())) {
      errs.email = 'Invalid email format (e.g., user@freshfind.vn).';
    }

    if (!loginPassword) {
      errs.password = 'Please enter your account password.';
    } else if (loginPassword.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    const allUsers = getUsersList();
    const user = allUsers.find(
      u => u.email.toLowerCase() === loginEmail.trim().toLowerCase()
    );

    if (!user) {
      setLoginErrors({ email: 'This email address is not registered in our system.' });
      return;
    }

    if (user.password !== loginPassword) {
      setLoginErrors({ password: 'Incorrect password. Please verify and try again.' });
      return;
    }

    // Login successful
    const sessionUser = {
      name: user.name,
      email: user.email,
      phone: user.phone || '0987654321',
      role: user.role,
      roleLabel: user.role === 'farmer' ? 'Local Farm Producer' : 'Conscious Consumer'
    };

    localStorage.setItem('freshfind_current_user', JSON.stringify(sessionUser));
    setSuccessMessage(`Sign in successful! Welcome back, ${sessionUser.name}.`);

    setTimeout(() => {
      onAuthSuccess(sessionUser);
      onClose();
      setSuccessMessage(null);
    }, 1000);
  };

  // Validate Register
  const validateRegister = () => {
    const errs = {};
    if (!regName.trim()) {
      errs.name = 'Please enter your full legal name.';
    } else if (regName.trim().length < 3) {
      errs.name = 'Full name must contain at least 3 characters.';
    }

    if (!regEmail.trim()) {
      errs.email = 'Please enter a valid registration email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      errs.email = 'Invalid email format (e.g., name@freshfind.vn).';
    } else {
      const allUsers = getUsersList();
      if (allUsers.some(u => u.email.toLowerCase() === regEmail.trim().toLowerCase())) {
        errs.email = 'This email is already in use. Please sign in or use another email.';
      }
    }

    if (!regPhone.trim()) {
      errs.phone = 'Please enter your contact phone number.';
    } else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(regPhone.trim())) {
      errs.phone = 'Please provide a valid 10-digit mobile number.';
    }

    if (!regPassword) {
      errs.password = 'Please create a secure password.';
    } else if (regPassword.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!regConfirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (regConfirmPassword !== regPassword) {
      errs.confirmPassword = 'Passwords do not match. Please verify.';
    }

    if (!regAgree) {
      errs.agree = 'You must agree to the Platform Guidelines and Privacy Policy.';
    }

    setRegErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    const newUser = {
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      role: regRole,
      roleLabel: regRole === 'farmer' ? 'Local Farm Producer' : 'Conscious Consumer',
      password: regPassword
    };

    // Save to registered users list
    try {
      const stored = localStorage.getItem('freshfind_registered_users');
      const list = stored ? JSON.parse(stored) : [];
      list.push(newUser);
      localStorage.setItem('freshfind_registered_users', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    // Auto login
    const sessionUser = {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      roleLabel: newUser.roleLabel
    };
    localStorage.setItem('freshfind_current_user', JSON.stringify(sessionUser));

    setSuccessMessage(`Registration successful! Welcome ${newUser.name} to the FreshFind community.`);

    setTimeout(() => {
      onAuthSuccess(sessionUser);
      onClose();
      setSuccessMessage(null);
    }, 1200);
  };

  // Handle Quick Demo Login
  const handleQuickLogin = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setLoginErrors({});
  };

  // Handle Forgot Password
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      setForgotError('Please enter a valid email address to receive reset instructions.');
      return;
    }
    setForgotSubmitted(true);
    setForgotError('');
    setTimeout(() => {
      setForgotSubmitted(false);
      setTab('login');
    }, 3500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close user authentication modal"
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 animate-float flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="FreshFind Logo" 
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {tab === 'login' ? 'Sign In to FreshFind' : tab === 'register' ? 'Create an Account' : 'Recover Password'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {tab === 'login'
              ? 'Sign in to sync your shopping notebook and access community harvest updates.'
              : tab === 'register'
              ? 'Join our local farm-to-table network connecting conscious consumers and eco-growers.'
              : 'Enter your registered email address to receive password reset instructions.'}
          </p>
        </div>

        {/* Success Alert */}
        {successMessage ? (
          <div className="py-8 text-center text-emerald-600 dark:text-emerald-400 space-y-3 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">Action Completed!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">{successMessage}</p>
          </div>
        ) : tab === 'forgot' ? (
          /* FORGOT PASSWORD VIEW */
          <div className="space-y-4">
            {forgotSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-2 text-center animate-fade-in">
                <Check className="w-6 h-6 mx-auto text-emerald-600" />
                <p className="font-bold">Recovery Link Sent!</p>
                <p>We have dispatched a secure password reset link to <strong>{forgotEmail}</strong>. Please check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Registered Email Address:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      placeholder="e.g., user@freshfind.vn"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                        forgotError ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                  {forgotError && (
                    <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{forgotError}</span>
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    Back to Sign In
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md transition-colors"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* TAB SWITCHER: LOGIN vs REGISTER */
          <div>
            <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 mb-6 border border-slate-200 dark:border-slate-700/80">
              <button
                type="button"
                onClick={() => { setTab('login'); setLoginErrors({}); }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  tab === 'login'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => { setTab('register'); setRegErrors({}); }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  tab === 'register'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            </div>

            {/* LOGIN TAB CONTENT */}
            {tab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Email Field */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="consumer@freshfind.vn"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                        loginErrors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{loginErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">
                      Password:
                    </label>
                    <button
                      type="button"
                      onClick={() => setTab('forgot')}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                        loginErrors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{loginErrors.password}</span>
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="cursor-pointer">
                    Remember my sign-in on this browser
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Account</span>
                </button>

                {/* Quick Account Fill */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-2 font-medium text-center">
                    Or select a preconfigured demo profile:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('consumer@freshfind.vn', 'password123')}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-left cursor-pointer transition-colors"
                    >
                      <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200 block">🛒 Shopper Account</span>
                      <span className="text-[10px] text-slate-400 font-mono">consumer@...</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('farmer@freshfind.vn', 'password123')}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-left cursor-pointer transition-colors"
                    >
                      <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200 block">🚜 Eco Orchardist</span>
                      <span className="text-[10px] text-slate-400 font-mono">farmer@...</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* REGISTER TAB CONTENT */}
            {tab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs sm:text-sm">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Legal Name:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="e.g., Alex Johnson"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                        regErrors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                  {regErrors.name && (
                    <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{regErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address:
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                          regErrors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                        }`}
                      />
                    </div>
                    {regErrors.email && (
                      <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        <span>{regErrors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Phone:
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value)}
                        placeholder="0912345678"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                          regErrors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                        }`}
                      />
                    </div>
                    {regErrors.phone && (
                      <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        <span>{regErrors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Account Role Selector */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Platform Role:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('consumer')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        regRole === 'consumer'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500 text-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="font-bold text-xs block">🛒 Conscious Consumer</span>
                      <span className="text-[10px] block opacity-80">Discover markets & fresh produce</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegRole('farmer')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        regRole === 'farmer'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500 text-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="font-bold text-xs block">🚜 Farm Producer / Grower</span>
                      <span className="text-[10px] block opacity-80">Manage stalls & harvest batches</span>
                    </button>
                  </div>
                </div>

                {/* Password & Confirm Password Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Password (≥ 6 characters):
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                          regErrors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {regErrors.password && (
                      <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        <span>{regErrors.password}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm Password:
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={e => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 ${
                          regErrors.confirmPassword ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {regErrors.confirmPassword && (
                      <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        <span>{regErrors.confirmPassword}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div>
                  <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      id="regAgree"
                      checked={regAgree}
                      onChange={e => setRegAgree(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="regAgree" className="cursor-pointer leading-tight">
                      I agree to the <span className="text-emerald-600 font-bold">Terms of Service</span> and <span className="text-emerald-600 font-bold">Privacy Policy</span> of FreshFind.
                    </label>
                  </div>
                  {regErrors.agree && (
                    <p className="text-rose-500 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{regErrors.agree}</span>
                    </p>
                  )}
                </div>

                {/* Submit Register */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create FreshFind Account</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
