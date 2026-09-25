import React, { useState } from "react";
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, ShieldCheck, Zap, Cpu, Star, Play, 
  Maximize2, Lock, Download, Phone, RefreshCw, FileText, CheckCircle2,
  ExternalLink, Layers, Terminal, X, ChevronLeft, ChevronRight
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { ClientProduct } from "../types";
import { getYouTubeEmbedUrl, getBinancePayLink } from "../utils/video";
import ProductReviewsSection from "./ProductReviewsSection";

interface ProductDetailPageProps {
  product: ClientProduct;
  onBack: () => void;
  onBuyNow: (prod: ClientProduct) => void;
  settings?: Record<string, string>;
  currentUser?: { name: string; email: string } | null;
}

export default function ProductDetailPage({
  product,
  onBack,
  onBuyNow,
  settings,
  currentUser,
}: ProductDetailPageProps) {
  const prodName = (product.name || "").toLowerCase();
  const isRegular = product.id === 1 || prodName.includes("regular");
  const isExclusive = product.id === 2 || (prodName.includes("exclusive") && !prodName.includes("ultra"));
  const isUltra = product.id === 3 || prodName.includes("ultra");
  const isEnterprise = product.id === 4 || prodName.includes("enterprise");
  const isSupreme = product.id === 5 || prodName.includes("supreme");
  const isUltimate = product.id === 6 || prodName.includes("ultimate") || prodName.includes("infinity");
  const isPriceDisabled = settings?.disable_price_tag === "true";

  // Tier-specific customization
  let tierBadge = "PRO EDITION";
  let badgeBg = "bg-white/10 text-white border-white/20";
  let checkColor = "text-emerald-400";
  let checkBg = "bg-emerald-500/15 border-emerald-500/30";
  let buttonStyle = "bg-white hover:bg-zinc-200 text-black font-extrabold shadow-lg shadow-white/10 cursor-pointer";

  if (isRegular) {
    tierBadge = "REGULAR EDITION • BUILD v2.4";
    badgeBg = "bg-zinc-900 text-zinc-300 border-zinc-700";
    checkColor = "text-zinc-300";
    checkBg = "bg-zinc-800/80 border-zinc-700";
    buttonStyle = "bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold border border-zinc-700 hover:border-zinc-500 shadow-lg cursor-pointer";
  } else if (isExclusive) {
    tierBadge = "EXCLUSIVE TIER • MOST POPULAR";
    badgeBg = "bg-zinc-900 text-white border-zinc-500 shadow-md";
    checkColor = "text-white";
    checkBg = "bg-white/10 border-white/20";
    buttonStyle = "bg-gradient-to-r from-zinc-200 via-white to-zinc-200 hover:from-white hover:to-zinc-100 text-black font-extrabold shadow-lg shadow-white/10 cursor-pointer";
  } else if (isUltra) {
    tierBadge = "ULTRA EXCLUSIVE • VIP PINNACLE";
    badgeBg = "bg-white text-black font-black border-white shadow-md";
    checkColor = "text-black";
    checkBg = "bg-white border-white";
    buttonStyle = "bg-white hover:bg-zinc-100 text-black font-black shadow-lg shadow-white/30 cursor-pointer";
  } else if (isEnterprise) {
    tierBadge = "ENTERPRISE VIP";
    badgeBg = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    checkColor = "text-emerald-400";
    checkBg = "bg-emerald-500/15 border-emerald-500/30";
    buttonStyle = "bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 text-zinc-950 font-black shadow-lg shadow-emerald-500/25 cursor-pointer";
  } else if (isSupreme) {
    tierBadge = "SUPREME MASTER";
    badgeBg = "bg-blue-500/20 text-blue-300 border-blue-500/40";
    checkColor = "text-blue-400";
    checkBg = "bg-blue-500/15 border-blue-500/30";
    buttonStyle = "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:brightness-110 text-white font-black shadow-xl shadow-blue-500/30 cursor-pointer";
  } else if (isUltimate) {
    tierBadge = "ULTIMATE INFINITY";
    badgeBg = "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/30";
    checkColor = "text-amber-400";
    checkBg = "bg-amber-500/20 border-amber-500/40";
    buttonStyle = "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 text-zinc-950 font-black shadow-xl shadow-amber-500/35 cursor-pointer";
  }

  const defaultFallbackScreenshots = [
    "/uploads/screenshot1.png",
    "/uploads/screenshot2.png",
    "/uploads/screenshot3.png",
    "/uploads/screenshot4.png"
  ];

  const getValidUrl = (url?: string, defaultIdx: number = 0) => {
    if (!url) {
      return `/uploads/screenshot${defaultIdx + 1}.png`;
    }
    return url;
  };

  const primaryImageUrl = product.imageUrl || `/uploads/screenshot1.png`;

  const screenshots = [
    {
      title: settings?.screenshot1_title || (isUltra ? "Ultra Secure Auditor Console & API Access" : isExclusive ? "Exclusive Auditor Console & API Access" : "Secure Auditor Console & API Access"),
      caption: "Private API key authorization gate, console unlock controller, and case input fields.",
      url: getValidUrl(settings?.screenshot1_url || primaryImageUrl, 0)
    },
    {
      title: settings?.screenshot2_title || "Case Logs Database & Target Review Snapshot",
      caption: "Firestore database case history logs, confidence score badges, and target review snapshot.",
      url: getValidUrl(settings?.screenshot2_url, 1)
    },
    {
      title: settings?.screenshot3_title || "Gemini Grounded Policy Auditor",
      caption: "Google Search & Maps Policy grounding with processing console & risk flags.",
      url: getValidUrl(settings?.screenshot3_url, 2)
    },
    {
      title: settings?.screenshot4_title || "Policy Evidence Signals Checklist",
      caption: "Real-time compliance checks, URL inspection, and simulated appeal status.",
      url: getValidUrl(settings?.screenshot4_url, 3)
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const videoUrl = settings?.demo_video || "https://youtube.com/shorts/r8-Zgs6BoAY?si=FQfzlgHAj7IO1Hvw";

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-6 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 px-4 py-2.5 rounded-xl border border-white/10 transition-all cursor-pointer group"
            id="product-back-btn"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Products</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500">
            <button type="button" onClick={onBack} className="hover:text-zinc-300 transition-colors cursor-pointer">Store</button>
            <span>/</span>
            <button type="button" onClick={onBack} className="hover:text-zinc-300 transition-colors cursor-pointer">Products</button>
            <span>/</span>
            <span className="text-white font-bold">{product.name}</span>
          </div>
        </div>

        {/* TOP HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT 7 COLUMNS: Interactive Screenshot Gallery Showcase */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-5">
            {/* Phone Chassis Container */}
            <div className="relative group max-w-[290px] sm:max-w-[310px] w-full">
              <div className="relative w-full aspect-[9/20] rounded-[2.5rem] overflow-hidden border-4 border-zinc-800 bg-[#070a0c] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                {/* Punch-hole camera */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-white/10 z-20 pointer-events-none" />

                <img
                  key={activeImageIndex}
                  src={screenshots[activeImageIndex].url}
                  alt={screenshots[activeImageIndex].title}
                  className="w-full h-full object-contain bg-[#070a0c]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith(".png")) {
                      target.src = target.src.replace(".png", ".svg");
                    } else if (target.src.endsWith(".svg")) {
                      target.src = target.src.replace(".svg", ".jpg");
                    } else if (!target.src.includes("screenshot")) {
                      target.src = defaultFallbackScreenshots[activeImageIndex % defaultFallbackScreenshots.length];
                    }
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Expand overlay button */}
                <button
                  type="button"
                  onClick={() => setFullscreenImage(screenshots[activeImageIndex].url)}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 active:scale-95 transition-all cursor-pointer opacity-80 hover:opacity-100 z-20"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Prev / Next Navigation Floating Buttons */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
                }}
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/90 border border-white/20 text-white hover:bg-emerald-500 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg z-30"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev + 1) % screenshots.length);
                }}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/90 border border-white/20 text-white hover:bg-emerald-500 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg z-30"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Active Screenshot Title & Caption Card below phone */}
            <div className="max-w-[340px] w-full p-4 rounded-2xl bg-[#090d10] border border-white/10 text-center">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                SCREENSHOT 0{activeImageIndex + 1} OF 0{screenshots.length}
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">{screenshots[activeImageIndex].title}</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{screenshots[activeImageIndex].caption}</p>
            </div>

            {/* Thumbnails row */}
            <div className="grid grid-cols-4 gap-2.5 max-w-[340px] w-full">
              {screenshots.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-xl overflow-hidden border transition-all active:scale-95 aspect-[9/20] bg-black/40 cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-emerald-400 shadow-md ring-2 ring-emerald-400/50 scale-105"
                      : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith(".png")) {
                        target.src = target.src.replace(".png", ".svg");
                      } else if (target.src.endsWith(".svg")) {
                        target.src = target.src.replace(".svg", ".jpg");
                      } else if (!target.src.includes("screenshot")) {
                        target.src = defaultFallbackScreenshots[idx % defaultFallbackScreenshots.length];
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                  {activeImageIndex === idx && (
                    <div className="absolute inset-0 bg-emerald-400/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLUMNS */}
          <div className="lg:col-span-5 space-y-6 bg-[#080808] p-8 rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${badgeBg}`}>
                {tierBadge}
              </span>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("customer-reviews-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-mono font-bold cursor-pointer transition-colors active:scale-95 bg-amber-400/10 hover:bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/20"
                title="View customer reviews"
                id="header-reviews-badge"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>Reviews & Ratings</span>
              </button>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                {isRegular && !product.name.toLowerCase().includes("only for new reviews")
                  ? `${product.name} (only for new reviews)`
                  : product.name}
              </h1>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {!isPriceDisabled ? (
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-baseline justify-between transition-colors hover:border-white/20">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">License Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black font-mono text-white tracking-tight">${product.price}</span>
                    <span className="text-xs font-mono text-zinc-400">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    One-off Lifetime
                  </span>
                  <span className="block text-[11px] text-zinc-500 mt-1">No monthly recurring fees</span>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">License Access</span>
                  <span className="text-base font-bold font-mono text-emerald-400">Official Software Build</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Lifetime Access
                  </span>
                </div>
              </div>
            )}

            {/* Included Features List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                Included Features & Capabilities
              </h3>
              <div className="space-y-2.5">
                {product.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 text-xs text-zinc-200"
                  >
                    <div className={`w-5 h-5 rounded-full ${checkBg} border flex items-center justify-center shrink-0 mt-0.5`}>
                      <Check className={`w-3 h-3 ${checkColor}`} />
                    </div>
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Specs Pills */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 text-[11px] font-mono">
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Delivery</span>
                  <span className="text-white font-bold">Instant Binance Pay</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">License</span>
                  <span className="text-white font-bold">Cryptographic Key</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Format</span>
                  <span className="text-white font-bold">Verified APK File</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Support</span>
                  <span className="text-white font-bold">VIP Customer Care</span>
                </div>
              </div>
            </div>

            {/* PRIMARY BUY NOW ACTION BUTTON */}
            <div className="pt-4 space-y-3">
              <button
                type="button"
                onClick={() => onBuyNow(product)}
                className={`w-full py-4 px-6 rounded-2xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-150 active:scale-[0.98] cursor-pointer ${buttonStyle}`}
                id={`product-detail-buy-btn-${product.id}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isPriceDisabled ? "Get License with Binance Pay" : `Buy Now with Binance Pay ($${product.price})`}</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 text-center font-mono">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cryptographic API Key & APK generated instantly after payment</span>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: VIDEO SHOWCASE DEMONSTRATION */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              VIDEO DEMONSTRATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              Watch {product.name} Live in Action
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Inspect how the application executes automated routines, node balancing, and key activation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl relative">
            <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-zinc-950">
              {getYouTubeEmbedUrl(videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(videoUrl)!}
                  title={`${product.name} Video Demonstration`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 rounded-2xl"
                />
              ) : (
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-cover rounded-2xl"
                  poster={screenshots[0]?.url}
                />
              )}
            </div>

            <div className="p-5 bg-[#080808] border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-amber-400 font-bold block mb-0.5">00:15</span>
                <span className="text-zinc-300">APK Boot & Initialization</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-emerald-400 font-bold block mb-0.5">00:45</span>
                <span className="text-zinc-300">API Key Activation</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-blue-400 font-bold block mb-0.5">01:30</span>
                <span className="text-zinc-300">Node Task Execution</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-purple-400 font-bold block mb-0.5">02:40</span>
                <span className="text-zinc-300">Verified System Log</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: REVIEWS */}
        <ProductReviewsSection product={product} currentUser={currentUser} />

        {/* BOTTOM CALL TO ACTION BANNER */}
        <div className="pt-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-[#0A0A0A] to-zinc-900 border border-white/15 text-center space-y-6 relative overflow-hidden shadow-2xl">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              READY TO ACTIVATE?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Get Instant Access to {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Checkout securely with Binance Pay to generate your unique license key and unlock the APK download link immediately.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onBuyNow(product)}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-transform duration-150 active:scale-95 ${buttonStyle}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isPriceDisabled ? "Get License with Binance Pay" : `Buy Now with Binance Pay ($${product.price})`}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-95 transition-all cursor-pointer"
                id="product-bottom-back-btn"
              >
                Back to All Products
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {fullscreenImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullscreenImage}
                alt="Fullscreen screenshot"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
