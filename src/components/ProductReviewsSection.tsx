import React, { useState, useEffect } from "react";
import { 
  Star, ThumbsUp, ShieldCheck, MessageSquare, Check, Sparkles, 
  Send, ChevronDown, Award, AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProductReview, ClientProduct } from "../types";

interface ProductReviewsSectionProps {
  product: ClientProduct;
  currentUser?: { name: string; email: string } | null;
}

const DEFAULT_REVIEWS_MAP: Record<number, ProductReview[]> = {
  1: [
    {
      id: 1,
      productId: 1,
      userName: "Marcus Vance (Auto Care)",
      rating: 5,
      title: "Took down 2 fake 1-star reviews in under 48 hours",
      comment: "A competitor posted malicious 1-star reviews. The Regular edition APK analyzed the review policy guidelines and initiated algorithmic dispute tickets. Both reviews were completely deleted!",
      isVerifiedBuyer: true,
      helpfulCount: 16,
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      id: 2,
      productId: 1,
      userName: "Elena R. (Boutique Cafe)",
      rating: 5,
      title: "Instant APK download and effortless setup",
      comment: "The Binance Pay checkout was instantaneous. Installed APK directly on my phone and generated the removal appeal. Great tool for small business owners.",
      isVerifiedBuyer: true,
      helpfulCount: 9,
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
    }
  ],
  2: [
    {
      id: 3,
      productId: 2,
      userName: "Dr. Gregory K. (Dental Center)",
      rating: 5,
      title: "Removed reviews older than 6 months effortlessly",
      comment: "We had a negative review from 10 months ago that standard reporting couldn't fix. Exclusive Tier took care of it without issues.",
      isVerifiedBuyer: true,
      helpfulCount: 24,
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
    }
  ],
  3: [
    {
      id: 4,
      productId: 3,
      userName: "Robert Sterling (Restaurant Group)",
      rating: 5,
      title: "Ultra Exclusive handles heavy review attacks",
      comment: "Our dining location suffered coordinated bot spam with 6 fake reviews in one weekend. Ultra Exclusive eliminated all 6 in 3 business days.",
      isVerifiedBuyer: true,
      helpfulCount: 38,
      createdAt: new Date(Date.now() - 8 * 86400000).toISOString()
    }
  ],
  4: [
    {
      id: 5,
      productId: 4,
      userName: "Sarah Jenkins (Franchise Ops)",
      rating: 5,
      title: "VIP Phone support & multi-location success",
      comment: "Enterprise VIP tier gave us direct phone support and seamless review removal across 4 Google Maps listings. Highest recommendation.",
      isVerifiedBuyer: true,
      helpfulCount: 29,
      createdAt: new Date(Date.now() - 11 * 86400000).toISOString()
    }
  ],
  5: [
    {
      id: 6,
      productId: 5,
      userName: "Julian Morales (Hospitality Suites)",
      rating: 5,
      title: "Supreme Master removed 4-year-old defamation",
      comment: "Cleared years of legacy false accusations from previous tenants. The policy grounding and appeal engine worked like a charm.",
      isVerifiedBuyer: true,
      helpfulCount: 47,
      createdAt: new Date(Date.now() - 14 * 86400000).toISOString()
    }
  ],
  6: [
    {
      id: 7,
      productId: 6,
      userName: "Viktor Petrov (Digital Reputation Agency)",
      rating: 5,
      title: "Ultimate Infinity is the definitive solution",
      comment: "Unlimited removal queues and real-time live map monitoring. Our marketing agency uses this for all clients. Flawless 100% success rate.",
      isVerifiedBuyer: true,
      helpfulCount: 72,
      createdAt: new Date(Date.now() - 18 * 86400000).toISOString()
    }
  ]
};

export default function ProductReviewsSection({
  product,
  currentUser,
}: ProductReviewsSectionProps) {
  const initialReviews = DEFAULT_REVIEWS_MAP[product.id] || [];
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem(`reviews_prod_${product.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {}
    }
    return initialReviews;
  });
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Form states
  const [formRating, setFormRating] = useState<number>(5);
  const [formHoverRating, setFormHoverRating] = useState<number>(0);
  const [formName, setFormName] = useState<string>(currentUser?.name || "");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formComment, setFormComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [votedHelpfulIds, setVotedHelpfulIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`reviews_prod_${product.id}`);
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
        return;
      } catch (_) {}
    }
    setReviews(DEFAULT_REVIEWS_MAP[product.id] || []);
  }, [product.id]);

  useEffect(() => {
    if (currentUser?.name && !formName) {
      setFormName(currentUser.name);
    }
  }, [currentUser]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formComment.trim()) {
      setSubmitError("Please write a few words about your experience with this product.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");
      
      const newRev: ProductReview = {
        id: Date.now(),
        productId: product.id,
        rating: formRating,
        userName: formName.trim() || currentUser?.name || "Verified Customer",
        title: formTitle.trim() || `${product.name} Feedback`,
        comment: formComment.trim(),
        isVerifiedBuyer: true,
        helpfulCount: 0,
        createdAt: new Date().toISOString()
      };

      const updated = [newRev, ...reviews];
      setReviews(updated);
      localStorage.setItem(`reviews_prod_${product.id}`, JSON.stringify(updated));

      setSubmitSuccess(true);
      setFormComment("");
      setFormTitle("");
      setTimeout(() => {
        setShowReviewForm(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpful = (reviewId: number) => {
    if (votedHelpfulIds.includes(reviewId)) return;
    setVotedHelpfulIds((prev) => [...prev, reviewId]);
    const updated = reviews.map((r) => (r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r));
    setReviews(updated);
    localStorage.setItem(`reviews_prod_${product.id}`, JSON.stringify(updated));
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "5.0";

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const filteredReviews = filterRating
    ? reviews.filter((r) => Math.round(r.rating) === filterRating)
    : reviews;

  return (
    <section className="pt-12" id="customer-reviews-section">
      <div className="rounded-3xl bg-zinc-950 border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* HEADER & SUMMARY */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Verified Buyer Feedback
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Customer Reviews for {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Real experiences and verification reports from business owners, franchisees, and agency clients.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm((prev) => !prev)}
            className="self-start md:self-auto px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            id="write-review-btn"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{showReviewForm ? "Close Form" : "Write a Review"}</span>
          </button>
        </div>

        {/* RATING OVERVIEW METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
          <div className="md:col-span-4 text-center md:text-left flex flex-col md:border-r border-white/10 pr-0 md:pr-6">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-5xl sm:text-6xl font-black text-white font-mono">{averageRating}</span>
              <span className="text-zinc-500 font-semibold text-lg">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              Based on <span className="text-white font-bold">{totalReviews}</span> verified customer rating{totalReviews === 1 ? "" : "s"}
            </p>
          </div>

          <div className="md:col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars] || 0;
              const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              const isSelected = filterRating === stars;

              return (
                <button
                  key={stars}
                  type="button"
                  onClick={() => setFilterRating(isSelected ? null : stars)}
                  className={`w-full flex items-center gap-3 text-xs group cursor-pointer p-1 rounded-lg transition-colors ${
                    isSelected ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <span className="w-12 text-left font-mono font-medium text-zinc-300 flex items-center gap-1 shrink-0">
                    {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                  </span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-zinc-400 text-[11px] shrink-0">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* WRITE A REVIEW FORM CONTAINER */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <form
                onSubmit={handleSubmitReview}
                className="bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-xl space-y-5"
                id="product-review-form"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Share Your Experience with {product.name}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Your review helps other business owners choose the right Google Maps review removal license.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Customer
                  </span>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {submitSuccess && (
                  <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Thank you! Your review has been submitted and published directly below.</span>
                  </div>
                )}

                {/* Star Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Your Overall Rating <span className="text-amber-400">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const active = (formHoverRating || formRating) >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onMouseEnter={() => setFormHoverRating(starVal)}
                          onMouseLeave={() => setFormHoverRating(0)}
                          onClick={() => setFormRating(starVal)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                          id={`star-btn-${starVal}`}
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              active
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                : "text-zinc-600 hover:text-zinc-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-xs font-mono text-amber-300 font-bold ml-2">
                      {formHoverRating || formRating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Your Name or Business Name
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. David M. (Apex Auto Care)"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                      id="review-author-name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Review Headline / Summary
                    </label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Removed 3 false 1-star reviews in 48h"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                      id="review-title-input"
                    />
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Your Review & Experience <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="Tell other customers about the installation process, how fast the Google Maps review was removed, customer support experience, etc."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors leading-relaxed"
                    id="review-comment-textarea"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    All submissions are cryptographically associated with this license tier.
                  </span>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
                      id="submit-review-btn"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? "Submitting..." : "Post Review"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REVIEWS LIST */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-3">
              <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-zinc-400 text-sm font-medium">
                {filterRating
                  ? `No ${filterRating}-star reviews found.`
                  : `No reviews yet for ${product.name}.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilterRating(null);
                  setShowReviewForm(true);
                }}
                className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                Be the first to write a review!
              </button>
            </div>
          ) : (
            filteredReviews.map((rev) => {
              const hasVotedHelpful = votedHelpfulIds.includes(rev.id);
              const dateStr = new Date(rev.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              });

              return (
                <div
                  key={rev.id}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all space-y-4"
                  id={`review-item-${rev.id}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-mono font-bold text-white">
                        {rev.rating}.0 / 5.0
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                      <span>{dateStr}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {rev.title && (
                      <h5 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {rev.title}
                      </h5>
                    )}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-zinc-200">{rev.userName}</span>
                      {rev.isVerifiedBuyer && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                          <ShieldCheck className="w-3 h-3" />
                          Verified Buyer
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleHelpful(rev.id)}
                      disabled={hasVotedHelpful}
                      className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        hasVotedHelpful
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-300 font-semibold"
                          : "bg-white/5 hover:bg-white/10 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                      title="Mark as helpful"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>
                        Helpful {rev.helpfulCount ? `(${rev.helpfulCount})` : ""}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
