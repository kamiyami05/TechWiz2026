import React, { useState, useEffect } from 'react';
import { 
  Star, MessageSquare, ThumbsUp, CheckCircle2, User, 
  Send, ShieldCheck, Sparkles, Lock, LogIn, AlertCircle 
} from 'lucide-react';

export default function MarketReviews({ 
  marketId, 
  marketName, 
  currentUser, 
  onOpenAuth 
}) {
  const storageKey = `freshfind_reviews_${marketId}`;
  const helpfulVotesKey = `freshfind_helpful_votes`;

  // Default initial verified reviews in English
  const getSeedReviews = () => [
    {
      id: `rev-seed-1-${marketId}`,
      author: "David Harrison",
      rating: 5,
      date: "3 days ago",
      comment: "Outstanding morning farmers market! The kale and cherry tomatoes were freshly harvested at dawn. Fair transparent pricing and very accommodating local growers.",
      helpfulCount: 14,
      verifiedShopper: true
    },
    {
      id: `rev-seed-2-${marketId}`,
      author: "Mai Linh Nguyen",
      rating: 5,
      date: "1 week ago",
      comment: "Wonderful community atmosphere on weekends. Free shaded parking, clean amenities, and dog-friendly. The 034 butter avocados and raw pasture milk are exceptional.",
      helpfulCount: 9,
      verifiedShopper: true
    }
  ];

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
      return getSeedReviews();
    } catch (e) {
      return getSeedReviews();
    }
  });

  const [userVotes, setUserVotes] = useState(() => {
    try {
      const saved = localStorage.getItem(helpfulVotesKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Simplified form states: only star rating (score) and review comment
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Persist reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch (e) {}
  }, [reviews, storageKey]);

  // Persist helpful votes
  useEffect(() => {
    try {
      localStorage.setItem(helpfulVotesKey, JSON.stringify(userVotes));
    } catch (e) {}
  }, [userVotes]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    if (!comment.trim()) {
      setErrorMessage('Please write a brief review comment.');
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      author: currentUser.name || "Community Shopper",
      rating: Number(rating),
      date: "Just now",
      comment: comment.trim(),
      helpfulCount: 0,
      verifiedShopper: true
    };

    setReviews(prev => [newRev, ...prev]);
    setComment('');
    setRating(5);
    setErrorMessage('');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const handleHelpfulVote = (reviewId) => {
    if (userVotes.includes(reviewId)) return;
    setUserVotes(prev => [...prev, reviewId]);
    setReviews(prev => prev.map(r => {
      if (r.id === reviewId) {
        return { ...r, helpfulCount: (r.helpfulCount || 0) + 1 };
      }
      return r;
    }));
  };

  // Average Rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const starLabels = ['', '1/5 - Poor', '2/5 - Fair', '3/5 - Good', '4/5 - Very Good', '5/5 - Exceptional!'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8 my-8">
      
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Reviews</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
            Verified Shopper Ratings & Reviews
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Real transparent feedback on crop freshness, organic quality, and vendor hospitality at {marketName}.
          </p>
        </div>

        {/* Rating Score Badge */}
        <div className="flex items-center gap-4 bg-stone-50 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shrink-0">
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
              {averageRating}
            </span>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">/ 5.0 Rating</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-slate-500 block font-medium">
              {reviews.length} verified reviews
            </span>
          </div>
        </div>
      </div>

      {/* Streamlined Review Submission Section */}
      {!currentUser ? (
        /* Login Required Prompt */
        <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Sign In to Leave a Review & Star Rating
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                To guarantee genuine farm-to-table feedback, only signed-in community members can rate this market.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAuth}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 shrink-0 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Review</span>
          </button>
        </div>
      ) : (
        /* Minimalist Form: Star Rating & Review Text Only */
        <form onSubmit={handleSubmitReview} className="p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 space-y-4">
          
          {/* Active User Indicator */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <span className="text-xs text-slate-500">Posting as:</span>{' '}
                <strong className="text-xs font-extrabold text-slate-900 dark:text-white">{currentUser.name}</strong>
              </div>
              <span className="ml-1 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified Member</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Market ID: {marketId}
            </span>
          </div>

          {/* Unified Star Rating Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Select Your Rating (1 - 5 Stars):
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                  >
                    <Star 
                      className={`w-7 h-7 ${
                        star <= (hoverRating || rating) 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-slate-300 dark:text-slate-600'
                      }`} 
                    />
                  </button>
                ))}
              </div>

              {/* Score and text label */}
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                {starLabels[hoverRating || rating]}
              </span>
            </div>
          </div>

          {/* Review Textarea and Submit Button side by side */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Your Review & Comments:
            </label>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <textarea
                rows="2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your feedback regarding produce freshness, prices, or market experience..."
                className="flex-1 text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed resize-none"
              />
              <button
                type="submit"
                className="px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 shrink-0 cursor-pointer self-stretch sm:self-auto"
              >
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Toast */}
          {formSubmitted && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your verified review has been published.</span>
            </div>
          )}
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => {
          const hasVoted = userVotes.includes(rev.id);
          return (
            <div 
              key={rev.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-all space-y-3"
            >
              {/* Reviewer Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-extrabold flex items-center justify-center text-xs shrink-0">
                    {rev.author ? rev.author.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {rev.author}
                      </span>
                      {rev.verifiedShopper && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Verified Shopper</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {rev.date}
                    </span>
                  </div>
                </div>

                {/* Stars & Score */}
                <div className="flex items-center gap-1 text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-200/60 dark:border-amber-900/60">
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400 mr-1">
                    {rev.rating}.0
                  </span>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star 
                      key={s} 
                      className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {rev.comment}
              </p>

              {/* Helpful Upvote Button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Was this review helpful to you?
                </span>
                <button
                  type="button"
                  onClick={() => handleHelpfulVote(rev.id)}
                  disabled={hasVoted}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    hasVoted
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-stone-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'text-emerald-600 fill-emerald-600' : ''}`} />
                  <span>Helpful ({rev.helpfulCount || 0})</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
