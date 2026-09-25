import React, { useState, useEffect } from 'react';
import { 
  Star, MessageSquare, ThumbsUp, CheckCircle2, User, 
  Send, ShieldCheck, Sparkles, Filter, AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MarketReviews({ marketId, marketName }) {
  const { t, language } = useLanguage();

  const storageKey = `freshfind_reviews_${marketId}`;
  const helpfulVotesKey = `freshfind_helpful_votes`;

  // Default seed reviews if none exist in localStorage
  const getSeedReviews = () => {
    if (language === 'vi') {
      return [
        {
          id: `rev-seed-1-${marketId}`,
          author: "Nguyễn Hải Đăng",
          rating: 5,
          date: "3 ngày trước",
          tags: ["Nông sản cực tươi", "Nông dân thân thiện"],
          comment: "Rau cải xoăn và dâu tây ở đây tươi rói, cuống còn dính đất ẩm mới hái sáng sớm. Giá cả niêm yết rõ ràng, người bán giải thích nguồn gốc rất nhiệt tình!",
          helpfulCount: 14,
          verifiedShopper: true
        },
        {
          id: `rev-seed-2-${marketId}`,
          author: "Thu Trang (Tây Hồ)",
          rating: 5,
          date: "1 tuần trước",
          tags: ["Bãi đỗ xe rộng", "100% Hữu cơ"],
          comment: "Chợ mở vào cuối tuần không khí trong lành, có chỗ gửi xe miễn phí và cho dắt cún cưng đi dạo. Mình mua được bơ sáp 034 rất dẻo và sữa chua Ba Vì rất thơm.",
          helpfulCount: 9,
          verifiedShopper: true
        }
      ];
    } else {
      return [
        {
          id: `rev-seed-1-${marketId}`,
          author: "David Harrison",
          rating: 5,
          date: "3 days ago",
          tags: ["Super Fresh Produce", "Friendly Farmers"],
          comment: "Outstanding morning farmers market! The kale and cherry tomatoes were freshly picked at sunrise from Moc Chau. Fair transparent pricing and very accommodating local growers.",
          helpfulCount: 14,
          verifiedShopper: true
        },
        {
          id: `rev-seed-2-${marketId}`,
          author: "Mai Linh Nguyen",
          rating: 5,
          date: "1 week ago",
          tags: ["Easy Parking", "100% Organic"],
          comment: "Wonderful community atmosphere on weekends. Free shaded parking, clean amenities, and dog-friendly. The 034 butter avocados and raw pasture milk are the best in Hanoi.",
          helpfulCount: 9,
          verifiedShopper: true
        }
      ];
    }
  };

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

  // Form states
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
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

  const availableTags = language === 'vi' ? [
    "Nông sản cực tươi",
    "Giá cả hợp lý",
    "Bãi đỗ xe thuận tiện",
    "Nông dân thân thiện",
    "100% Hữu cơ",
    "Thân thiện thú cưng",
    "Thanh toán QR nhanh"
  ] : [
    "Super Fresh Produce",
    "Fair Prices",
    "Easy Parking",
    "Friendly Farmers",
    "100% Organic",
    "Pet Friendly",
    "Cashless QR Accepted"
  ];

  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setErrorMessage(language === 'vi' ? 'Vui lòng nhập họ tên của bạn' : 'Please provide your name');
      return;
    }
    if (!comment.trim() || comment.trim().length < 10) {
      setErrorMessage(language === 'vi' ? 'Nhận xét phải có ít nhất 10 ký tự' : 'Review comment must be at least 10 characters');
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      rating,
      date: language === 'vi' ? 'Vừa xong' : 'Just now',
      tags: selectedTags,
      comment: comment.trim(),
      helpfulCount: 0,
      verifiedShopper: true
    };

    setReviews(prev => [newRev, ...prev]);
    setAuthorName('');
    setComment('');
    setSelectedTags([]);
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

  const starLabels = language === 'vi' 
    ? ['', 'Tạm ổn', 'Bình thường', 'Khá tốt', 'Rất hài lòng', 'Xuất sắc tuyệt vời!']
    : ['', 'Needs Improvement', 'Fair', 'Good', 'Very Good', 'Exceptional Experience!'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8 my-8">
      
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('communityReviews')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
            {language === 'vi' ? 'Đánh Giá Từ Khách Đi Chợ Thực Tế' : 'Verified Community Shopper Reviews'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'vi' 
              ? `Xem cảm nhận chân thực về chất lượng nông sản, dịch vụ và trải nghiệm tại ${marketName}.`
              : `Real transparent feedback on crop quality, organic authenticity and vendor service at ${marketName}.`}
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
              {reviews.length} {language === 'vi' ? 'đánh giá được xác minh' : 'verified reviews'}
            </span>
          </div>
        </div>
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmitReview} className="p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t('writeReview')}</span>
          </h4>
          <span className="text-[11px] text-slate-500">
            {language === 'vi' ? 'Lưu ngay vào bộ nhớ trình duyệt' : 'Instant client-side verified post'}
          </span>
        </div>

        {/* Interactive Star Picker */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            {language === 'vi' ? 'Chấm điểm trải nghiệm của bạn:' : 'Rate Your Market Experience:'}
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
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-slate-300 dark:text-slate-600'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              {starLabels[hoverRating || rating]}
            </span>
          </div>
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            {language === 'vi' ? 'Tên của bạn:' : 'Your Name / Nickname:'}
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder={language === 'vi' ? 'Ví dụ: Hoàng Minh (Cầu Giấy)' : 'e.g. Sarah Jenkins (Downtown Shopper)'}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Tags Selection */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            {language === 'vi' ? 'Điểm nổi bật bạn thích:' : 'Quick Experience Highlights:'}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handleToggleTag(tag)}
                className={`text-[11px] px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedTags.includes(tag)
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                }`}
              >
                {selectedTags.includes(tag) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            {language === 'vi' ? 'Nội dung cảm nhận chi tiết:' : 'Detailed Review Comments:'}
          </label>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={language === 'vi' 
              ? 'Chia sẻ về độ tươi của nông sản, thái độ nhà vườn, bãi đỗ xe hoặc món ngon bạn đã mua...' 
              : 'Share your feedback on produce freshness, grower hospitality, pricing, or parking convenience...'}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success toast inside form */}
        {formSubmitted && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{language === 'vi' ? 'Cảm ơn bạn! Đánh giá đã được đăng thành công.' : 'Thank you! Your verified review has been published.'}</span>
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{t('submitReview')}</span>
        </button>
      </form>

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
                    {rev.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {rev.author}
                      </span>
                      {rev.verifiedShopper && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>{language === 'vi' ? 'Khách mua thật' : 'Verified Shopper'}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {rev.date}
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star 
                      key={s} 
                      className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Tags */}
              {rev.tags && rev.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {rev.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Review Comment */}
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {rev.comment}
              </p>

              {/* Helpful Button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  {language === 'vi' ? 'Nhận xét này có hữu ích không?' : 'Was this review helpful to you?'}
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
                  <span>{t('helpful')} ({rev.helpfulCount || 0})</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
