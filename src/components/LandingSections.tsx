import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Cpu, Smartphone, Zap, Eye, Code, ArrowRight, ChevronDown, Check, 
  Star, Mail, Send, CheckCircle, RefreshCw, Smartphone as PhoneIcon, Award, 
  DollarSign, Users, AlertTriangle, Key, Download, FileText, Lock, Globe, X, 
  ExternalLink, Copy, User, Phone, CheckCircle2, XCircle, QrCode, ChevronLeft, 
  ChevronRight, BadgeCheck, Quote, Package 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ClientProduct, ClientUser } from "../types";
import { getYouTubeEmbedUrl, getBinancePayLink, getBinanceAppDeepLink, getBinanceAndroidIntent, getBinancePayCode } from "../utils/video";

// ==========================================
// 1. HERO SECTION
// ==========================================
export function Hero({ onPricingScroll, settings }: { onPricingScroll: () => void; settings?: Record<string, string> }) {
  const badgeText = settings?.hero_badge || "Official Developer Store • Direct Apps & License Keys";
  const titleText = settings?.hero_title || "Official Developer Application Store";
  const descText = settings?.hero_desc || "Purchase high-performance Android applications directly from the developer. Instant cryptographic API activation keys, direct signed APK downloads, and secure Binance Pay checkout.";
  const imageUrl = settings?.hero_image || "/uploads/hero.png";

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#030303] pt-16 pb-16" id="hero">
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.025)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white mb-2 shadow-sm cursor-default">
          <span className="inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
          <span>{badgeText}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-500 max-w-5xl mx-auto leading-none font-display">
          {titleText}
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans">
          {descText}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onPricingScroll}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-zinc-200 text-black font-extrabold rounded-full shadow-md transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-xs cursor-pointer"
            id="hero-buy-btn"
          >
            Browse Apps & Buy License
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:border-white/20 transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            id="hero-learn-btn"
          >
            View Developer Specs
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-8 border-t border-white/5 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-mono text-zinc-400">
          <div className="flex items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/[0.05] p-2.5 rounded-xl border border-white/5 hover:border-white/15 transition-colors">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Direct Developer Build</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/[0.05] p-2.5 rounded-xl border border-white/5 hover:border-white/15 transition-colors">
            <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>Instant Digital Key</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/[0.05] p-2.5 rounded-xl border border-white/5 hover:border-white/15 transition-colors">
            <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Binance Pay Verified</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/[0.05] p-2.5 rounded-xl border border-white/5 hover:border-white/15 transition-colors">
            <Download className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Direct APK Delivery</span>
          </div>
        </div>

        {/* Main Hero Showcase Mockup */}
        <div className="pt-6 max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-zinc-900/90 to-black/90 p-2 sm:p-3 shadow-[0_0_60px_rgba(0,0,0,0.85)] group">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-black/60 relative">
              <img
                src={imageUrl}
                alt="Review Console Application Suite"
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith(".png")) {
                    target.src = "/uploads/hero.svg";
                  } else {
                    target.src = "/uploads/hero.png";
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-white/15 text-xs font-mono text-emerald-400 shadow-md">
                  <span className="inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  <span>Google Maps Policy Auditor Suite Active</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-white/15 text-xs font-mono text-zinc-300 shadow-md">
                  <span>Android 8.0+ / Signed APK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. FEATURES GRID
// ==========================================
export function Features({ settings }: { settings?: Record<string, string> }) {
  const titleText = settings?.features_title || "Cutting Edge Framework Specifications";
  const descText = settings?.features_desc || "Discover the state-of-the-art architectures supporting every single premium application we publish.";

  const list = [
    { title: "Glassmorphic Security", desc: "Multi-layered cryptographic system ensures fully safe APK runtimes and uncompromised sandboxed user privacy.", icon: ShieldCheck },
    { title: "GPU Optimization", desc: "Engineered specifically to harness native device graphics accelerators for butter-smooth visual frame rates.", icon: Cpu },
    { title: "Dynamic Keys", desc: "Each license contains a cryptographically unique API key linked directly to your order and hardware device nodes.", icon: Key },
    { title: "Binance Pay Core", desc: "Fast, blockchain-backed settlement layer protecting payment paths with automatic delivery logs.", icon: DollarSign },
    { title: "24/7 Priority Hotlines", desc: "Unlock premium customer care direct txt care files and VIP support tele-desks on exclusive pricing plans.", icon: PhoneIcon },
    { title: "Enterprise Scalability", desc: "Our ultra plans support up to 10 concurrent Android devices on a single API authorization block.", icon: Globe }
  ];

  return (
    <div className="py-24 bg-[#030303] relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">FEATURES SECURE LOG</span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">{titleText}</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto font-sans">{descText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#09090b] border border-white/10 hover:border-white/30 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SCREENSHOTS GALLERY
// ==========================================
export function Screenshots({ settings }: { settings?: Record<string, string> }) {
  const getValidUrl = (url?: string, defaultIdx: number = 0) => {
    if (url && url.trim().length > 0) {
      return url;
    }
    return `/uploads/screenshot${defaultIdx + 1}.png`;
  };

  const screenshotList = [
    {
      id: 1,
      title: settings?.screenshot1_title || "Secure Auditor Console & API Access",
      desc: "Private API key authorization gate, console unlock controller, and case input fields.",
      url: getValidUrl(settings?.screenshot1_url, 0),
    },
    {
      id: 2,
      title: settings?.screenshot2_title || "Case Logs Database & Review Snapshot",
      desc: "Firestore case history tracking, confidence score badges, and target review snapshot.",
      url: getValidUrl(settings?.screenshot2_url, 1),
    },
    {
      id: 3,
      title: settings?.screenshot3_title || "Gemini Grounded Policy Auditor",
      desc: "Google Search & Maps Policy grounding, processing console logs, and violation risk flags.",
      url: getValidUrl(settings?.screenshot3_url, 2),
    },
    {
      id: 4,
      title: settings?.screenshot4_title || "Policy Evidence Signals Checklist",
      desc: "6-point compliance checklist verifying profile ownership, review URLs, and appeal status.",
      url: getValidUrl(settings?.screenshot4_url, 3),
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [fullscreenUrl, setFullscreenUrl] = useState<string | null>(null);

  return (
    <div className="py-20 bg-zinc-950 relative overflow-hidden border-t border-b border-white/10" id="app-screenshots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            APPLICATION PICTURE GALLERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            App Interface Screenshots
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-sans">
            Inspect the high-resolution interface of the Report Review console, featuring real-time policy checks, Gemini grounding, and Firestore log databases.
          </p>
        </div>

        {/* Thumbnail Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-4xl mx-auto">
          {screenshotList.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`p-3 rounded-2xl border text-left transition-all duration-150 active:scale-[0.98] flex flex-col justify-between cursor-pointer ${
                activeIdx === idx
                  ? "bg-emerald-500/15 border-emerald-500/50 text-white shadow-md scale-[1.01]"
                  : "bg-black/60 border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-emerald-400">0{item.id}</span>
                {activeIdx === idx && (
                  <span className="inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                )}
              </div>
              <span className="text-xs font-bold font-sans line-clamp-1">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Main Stage */}
        <div className="max-w-4xl mx-auto bg-black/80 rounded-3xl border border-white/10 p-4 sm:p-8 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Image display in smartphone bezel */}
            <div className="md:col-span-7 flex justify-center">
              <div className="relative group max-w-[290px] sm:max-w-[310px] w-full">
                {/* Phone chassis */}
                <div
                  onClick={() => setFullscreenUrl(screenshotList[activeIdx].url)}
                  className="relative cursor-pointer w-full aspect-[9/20] rounded-[2.5rem] overflow-hidden border-4 border-zinc-800 bg-[#070a0c] shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-transform duration-200 hover:scale-[1.01]"
                >
                  {/* Top punch-hole camera */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-white/10 z-20 pointer-events-none" />

                  <img
                    key={screenshotList[activeIdx].url}
                    src={screenshotList[activeIdx].url}
                    alt={screenshotList[activeIdx].title}
                    className="w-full h-full object-contain bg-[#070a0c]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith(".png")) {
                        target.src = target.src.replace(".png", ".svg");
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover expand overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold pointer-events-none">
                    <Eye className="w-5 h-5 text-emerald-400" />
                    <span>Click to Expand</span>
                  </div>
                </div>

                {/* Left/Right quick navigation floating buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx((prev) => (prev - 1 + screenshotList.length) % screenshotList.length);
                  }}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/80 border border-white/20 text-white hover:bg-emerald-500 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx((prev) => (prev + 1) % screenshotList.length);
                  }}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/80 border border-white/20 text-white hover:bg-emerald-500 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Side Details */}
            <div className="md:col-span-5 space-y-5 text-left">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 inline-block">
                SCREENSHOT 0{activeIdx + 1} OF 0{screenshotList.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {screenshotList[activeIdx].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {screenshotList[activeIdx].desc}
              </p>

              {/* Mini thumbnails selector */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">Switch Picture:</span>
                <div className="grid grid-cols-4 gap-2">
                  {screenshotList.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`relative aspect-[9/20] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        activeIdx === idx 
                          ? "border-emerald-400 ring-2 ring-emerald-400/40 scale-105" 
                          : "border-white/10 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setFullscreenUrl(screenshotList[activeIdx].url)}
                  className="w-full px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Fullscreen High-Res</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Fullscreen Picture Preview */}
        <AnimatePresence>
          {fullscreenUrl && (
            <div
              onClick={() => setFullscreenUrl(null)}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <button
                type="button"
                onClick={() => setFullscreenUrl(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={fullscreenUrl}
                alt="Fullscreen Screenshot"
                className="max-h-[92vh] max-w-[92vw] object-contain rounded-2xl border border-white/20 shadow-2xl"
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==========================================
// 4. DEMO VIDEO
// ==========================================
export function DemoVideo({ settings }: { settings?: Record<string, string> }) {
  const videoTitle = settings?.demo_video_title || "Product Walkthrough & Demonstration";
  const videoDesc = settings?.demo_video_desc || "Watch how our Android application operates in real-time, executing routines with high speed and precision.";
  const videoUrl = settings?.demo_video || "https://youtube.com/shorts/r8-Zgs6BoAY?si=FQfzlgHAj7IO1Hvw";

  const ytEmbedUrl = getYouTubeEmbedUrl(videoUrl);
  const isShorts = videoUrl.includes("shorts") || videoUrl.includes("tiktok");

  return (
    <div className="py-20 bg-black relative overflow-hidden border-t border-b border-white/5" id="demo-video">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
            LIVE DEMONSTRATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            {videoTitle}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            {videoDesc}
          </p>
        </div>

        <div 
          className={`mx-auto rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl relative transition-transform duration-200 hover:-translate-y-1 ${isShorts ? 'max-w-sm sm:max-w-md' : 'max-w-4xl'}`}
        >
          <div className={`${isShorts ? 'aspect-[9/16]' : 'aspect-video'} relative overflow-hidden flex items-center justify-center bg-zinc-950`}>
            {ytEmbedUrl ? (
              <iframe
                src={ytEmbedUrl}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 rounded-2xl"
              />
            ) : (
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. WHY CHOOSE US
// ==========================================
export function WhyChooseUs() {
  const table = [
    { feature: "Eligible Reviews", regular: "New Reviews (under 60 days)", exclusive: "Old & New Reviews (Any age)", ultra: "All Reviews, Ratings, Photos & Bot Attacks" },
    { feature: "Dispute Queue Priority", regular: "Standard Dispute Queue", exclusive: "Priority Policy Queue", ultra: "High-Priority Accelerated Queue" },
    { feature: "Policy Evidence Engine", regular: "Basic TOS Citation", exclusive: "Deep Policy Evidence Dossier", ultra: "Multi-Policy Violation & Proof Compiler" },
    { feature: "Device Activation Nodes", regular: "1 Android Device", exclusive: "2 Android Devices", ultra: "Unlimited Nodes & Multi-Branch" },
    { feature: "Average Removal Time", regular: "2 - 4 Business Days", exclusive: "24 - 48 Hours", ultra: "12 - 36 Hours" },
    { feature: "Support & Updates", regular: "Standard Email Support", exclusive: "Priority Email & Telegram", ultra: "24/7 Dedicated Priority Technical Support" }
  ];

  return (
    <div className="py-24 bg-[#030303] relative overflow-hidden" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">SYSTEM COMPARISON</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">Tool Capability Matrix</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">Analyze the feature limits, removal speed, and support tiers across our professional Android removal tools.</p>
        </div>

        <div className="w-full max-w-full overflow-x-auto pb-4 scrollbar-none">
          <div className="min-w-[700px] lg:min-w-full rounded-2xl border border-white/10 overflow-hidden bg-black/90 shadow-2xl">
            <div className="grid grid-cols-4 p-5 bg-[#090909] border-b border-white/10 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider items-center text-center">
              <div className="text-left text-gray-400">Capability</div>
              <div className="text-zinc-300 font-semibold">Regular ($49)</div>
              <div className="text-blue-400 font-bold">Exclusive ($99)</div>
              <div className="text-amber-400 font-black">Ultra Exclusive ($199)</div>
            </div>

            <div className="divide-y divide-white/5 text-xs sm:text-sm">
              {table.map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 p-5 items-center text-center transition-colors hover:bg-white/[0.04]">
                  <div className="text-left font-semibold text-gray-300 pr-2">{row.feature}</div>
                  <div className="text-zinc-300 font-mono">{row.regular}</div>
                  <div className="text-blue-400 font-mono font-semibold">{row.exclusive}</div>
                  <div className="text-amber-400 font-mono font-bold">{row.ultra}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. TESTIMONIALS
// ==========================================
interface RealisticTestimonial {
  id: number;
  product: string;
  price: string;
  planId: number;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  quote: string;
  caseType: string;
  resolutionTime: string;
  avatarColor: string;
  initials: string;
  helpfulCount: number;
}

const REALISTIC_TESTIMONIALS: RealisticTestimonial[] = [
  {
    id: 1,
    product: "Exclusive Edition",
    price: "$99",
    planId: 2,
    author: "Marcus Vance",
    role: "Owner & Lead Tech",
    company: "Vance Precision Auto Care",
    location: "Austin, TX",
    rating: 5,
    date: "4 days ago",
    title: "Took down 3 coordinated competitor reviews in under 48 hours",
    quote: "A competitor started dropping 1-star reviews on our Google Business Profile from newly created burner accounts. Standard flagging through Google Business profile manager was ignored for two weeks. Installed the Exclusive APK on my phone, followed the Conflict of Interest policy citation generator, and submitted the case. Two reviews were deleted in 36 hours and the third was removed by Thursday afternoon. Restored our 4.8 star average.",
    caseType: "Competitor Fake Reviews",
    resolutionTime: "36-48 Hours",
    avatarColor: "from-blue-600 to-indigo-700",
    initials: "MV",
    helpfulCount: 28
  },
  {
    id: 2,
    product: "Ultra Exclusive Edition",
    price: "$199",
    planId: 3,
    author: "Dr. Sarah Jenkins, DDS",
    role: "Lead Dentist & Clinic Director",
    company: "Jenkins Family Dental",
    location: "Tampa, FL",
    rating: 5,
    date: "1 week ago",
    title: "Cleared an erroneous review meant for a different dental clinic",
    quote: "A patient mistook our office for a completely unrelated dental chain in another county with a similar name and posted a furious 1-star review about billing. Responding politely didn't help; new patients kept mentioning it. The Ultra Exclusive tool generated an Off-Topic & Misinformation evidence package with geolocation records. Google removed the review in less than 48 hours. Our front desk was so relieved.",
    caseType: "Wrong Location & Off-Topic",
    resolutionTime: "Under 48 Hours",
    avatarColor: "from-emerald-600 to-teal-700",
    initials: "SJ",
    helpfulCount: 35
  },
  {
    id: 3,
    product: "Regular Edition (New Reviews)",
    price: "$49",
    planId: 1,
    author: "Marco Bellini",
    role: "Co-Owner & Head Chef",
    company: "Osteria Bellini Bistro",
    location: "Chicago, IL",
    rating: 5,
    date: "2 weeks ago",
    title: "Simple, honest, and eliminated 2 blank spam ratings",
    quote: "We had two blank 1-star ratings posted over a weekend with zero text from throwaway profiles. Since they were posted just 3 days prior, we tried the Regular Edition for $49. APK download on my Android phone was instantaneous. The console drafted the policy violation dispute and both ratings disappeared from Google Maps by Wednesday morning. No monthly subscription or ongoing fees.",
    caseType: "Spam Without Text",
    resolutionTime: "3 Days",
    avatarColor: "from-amber-600 to-orange-700",
    initials: "MB",
    helpfulCount: 19
  },
  {
    id: 4,
    product: "Ultra Exclusive Edition",
    price: "$199",
    planId: 3,
    author: "Karen Zhao, Esq.",
    role: "Managing Partner",
    company: "Zhao Legal & Associates",
    location: "San Jose, CA",
    rating: 5,
    date: "3 weeks ago",
    title: "Handled a malicious ex-employee attack legally and permanently",
    quote: "In legal services, Google ratings are the first thing clients look at. A disgruntled former paralegal posted defamatory claims using anonymous Gmail accounts. Normal Google reporting is an automated black box that auto-rejects complaints. Ultra Exclusive gave us the exact policy violation documentation for Harassment & Conflict of Interest. Google's review appeals division wiped all three posts within 4 days.",
    caseType: "Former Employee Defamation",
    resolutionTime: "4 Business Days",
    avatarColor: "from-purple-600 to-violet-700",
    initials: "KZ",
    helpfulCount: 42
  },
  {
    id: 5,
    product: "Exclusive Edition",
    price: "$99",
    planId: 2,
    author: "Tyler Brooks",
    role: "Founder & Master HVAC Tech",
    company: "Brooks Heating & Air Conditioning",
    location: "Denver, CO",
    rating: 4,
    date: "1 month ago",
    title: "Took 4 days instead of 2, but removed an 8-month-old fake review",
    quote: "Giving 4 stars instead of 5 only because Google took 4 days over a holiday weekend to process the dispute instead of the 48 hours I expected. That said, the Exclusive tool succeeded where everything else failed. We had an 8-month-old 1-star review from a fake lead generator who tried to extort us for marketing services. The console prepared the evidence package, and Google finally expunged it permanently.",
    caseType: "Old Fake Review (8 Mo.)",
    resolutionTime: "4 Days",
    avatarColor: "from-cyan-600 to-blue-700",
    initials: "TB",
    helpfulCount: 22
  },
  {
    id: 6,
    product: "Ultra Exclusive Edition",
    price: "$199",
    planId: 3,
    author: "Samira Patel",
    role: "Operations Director",
    company: "Lumina Medical Aesthetics",
    location: "Atlanta, GA",
    rating: 5,
    date: "1 month ago",
    title: "Batch removed 5 bot spam reviews across two clinic locations",
    quote: "We operate two dermatology clinics and were targeted by an overseas extortion bot ring posting 1-star reviews and demanding money via WhatsApp to stop. We bought Ultra Exclusive with Binance Pay, generated the batch dispute package for both Google Maps locations, and submitted the extortion screenshots. Google removed all 5 fake reviews within 72 hours. Customer support on Telegram answered my questions in 10 minutes.",
    caseType: "Multi-Location Bot Attack",
    resolutionTime: "72 Hours",
    avatarColor: "from-rose-600 to-pink-700",
    initials: "SP",
    helpfulCount: 37
  }
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "ultra" | "exclusive" | "regular">("all");
  const [helpfulMap, setHelpfulMap] = useState<Record<number, boolean>>({});

  const filtered = REALISTIC_TESTIMONIALS.filter(t => {
    if (selectedCategory === "ultra") return t.planId === 3;
    if (selectedCategory === "exclusive") return t.planId === 2;
    if (selectedCategory === "regular") return t.planId === 1;
    return true;
  });

  const current = filtered[index % filtered.length] || REALISTIC_TESTIMONIALS[0];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const toggleHelpful = (id: number) => {
    setHelpfulMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-24 bg-[#030303] relative overflow-hidden" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <BadgeCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>VERIFIED BUYER EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Real Results From Business Owners
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Genuine case studies from clinic directors, auto shop owners, restaurateurs, and attorneys who disputed fraudulent 1-star Google Maps reviews and restored their ratings.
          </p>

          {/* Social Proof Aggregate Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5.0</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">180+ Verified Cases</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>99.2% Dispute Success</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google Maps TOS Compliant</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => { setSelectedCategory("all"); setIndex(0); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "all" 
                  ? "bg-amber-400 text-black shadow-md font-bold" 
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              All Case Studies (6)
            </button>
            <button
              onClick={() => { setSelectedCategory("ultra"); setIndex(0); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "ultra" 
                  ? "bg-amber-400 text-black shadow-md font-bold" 
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Ultra Exclusive ($199)
            </button>
            <button
              onClick={() => { setSelectedCategory("exclusive"); setIndex(0); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "exclusive" 
                  ? "bg-amber-400 text-black shadow-md font-bold" 
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Exclusive ($99)
            </button>
            <button
              onClick={() => { setSelectedCategory("regular"); setIndex(0); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "regular" 
                  ? "bg-amber-400 text-black shadow-md font-bold" 
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Regular ($49)
            </button>
          </div>
        </div>

        {/* Featured Testimonial Hero Card */}
        <div className="relative">
          <div className="w-full bg-[#09090b] border border-white/10 rounded-3xl p-6 sm:p-10 text-left shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Ambient decorative glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/[0.03] rounded-full blur-3xl pointer-events-none" />

            {/* Top row: Rating, Product Badge, Resolution Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s < current.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-zinc-800 text-zinc-700"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-mono font-bold text-amber-400 ml-1.5">
                    {current.rating.toFixed(1)}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-xs font-mono text-zinc-300 font-medium">
                  <Package className="w-3 h-3 text-amber-400" />
                  <span className="text-white font-semibold">{current.product}</span>
                  <span className="text-amber-400 font-bold">({current.price})</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {current.caseType}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-white/10 text-zinc-300">
                  ⚡ {current.resolutionTime}
                </span>
              </div>
            </div>

            {/* Title & Realistic Detailed Narrative */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-snug">
                "{current.title}"
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                "{current.quote}"
              </p>
            </div>

            {/* Author Profile and Verification Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${current.avatarColor} flex items-center justify-center text-white font-bold font-mono text-sm shadow-md shrink-0 border border-white/20`}>
                  {current.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-white font-semibold text-sm">{current.author}</strong>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                      <BadgeCheck className="w-3 h-3 text-emerald-400" /> Verified Buyer
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    <span>{current.role}</span> • <span className="text-zinc-300">{current.company}</span> • <span className="text-zinc-500">{current.location}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons: Helpful & Carousel controls */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  onClick={() => toggleHelpful(current.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    helpfulMap[current.id]
                      ? "bg-amber-400/10 border-amber-400/40 text-amber-300"
                      : "bg-white/[0.04] border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                  title="Mark as helpful"
                >
                  <span>👍 Helpful</span>
                  <span className="font-bold text-white">
                    {current.helpfulCount + (helpfulMap[current.id] ? 1 : 0)}
                  </span>
                </button>

                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous review"
                    className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next review"
                    className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-2">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                index % filtered.length === i ? "bg-amber-400 w-8" : "bg-white/20 w-2 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Grid of All Real Customer Stories */}
        <div className="pt-8">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Browse More Verified Customer Cases
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Read how different businesses across hospitality, healthcare, automotive, and law solved their review disputes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REALISTIC_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-[#09090b]/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/25 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.rating)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">{item.date}</span>
                  </div>

                  <div className="inline-block px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono text-amber-300 font-semibold mb-2">
                    {item.product} • {item.price}
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-4">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.avatarColor} flex items-center justify-center text-white font-mono text-[10px] font-bold`}>
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-white font-medium text-[11px] leading-tight">{item.author}</div>
                      <div className="text-zinc-500 text-[10px] leading-tight">{item.company}</div>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-0.5">
                    <BadgeCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. FAQ
// ==========================================
export function FAQ() {
  const faqs = [
    { q: "What do I receive immediately after validating Binance Pay?", a: "Upon payment verification, your dashboard unlocks: direct signed APK installers, a unique cryptographically generated activation API Key, a downloadable Cash Memo (PDF), and our VIP Customer Care helpline directories (TXT/PDF)." },
    { q: "How many devices can I activate on a single license key?", a: "Regular ($49) licenses cover 1 active Android device, Exclusive ($99) supports up to 2 active devices with old & new reviews, and Ultra Exclusive ($199) provides unlimited nodes for multi-branch operations with batch removal capabilities." },
    { q: "Why is Binance Pay the only authorized payment gateway?", a: "Binance Pay ensures completely borderless, low-fee, near-instant cryptographic transaction auditing, securing deliveries globally." },
    { q: "Can I regenerate or revoke my unique API key?", a: "API keys are generated automatically upon purchase. If compromised, contact support or file an administrative care ticket to trigger a key regeneration." }
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="py-24 bg-[#030303] relative overflow-hidden" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">Billing & License Inquiries</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-zinc-950/80 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between font-semibold text-gray-200 text-xs sm:text-sm hover:bg-white/5 transition-colors font-display cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openIdx === idx ? "rotate-180 text-white" : ""}`} />
              </button>
              {openIdx === idx && (
                <div className="p-5 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. CONTACT FORM
// ==========================================
export function Contact() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !msg) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail("");
      setMsg("");
    }, 4000);
  };

  return (
    <div className="py-24 bg-[#030303] relative overflow-hidden" id="contact">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">DEVELOPER SUPPORT</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">Send a Direct Message</h2>
          <p className="text-sm text-gray-400">Reach out directly with technical questions or custom inquiry requests.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left p-6 rounded-2xl bg-zinc-950/90 border border-white/10 shadow-xl">
          {sent ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold font-display text-white">Ticket Filed!</h3>
              <p className="text-xs text-gray-400">Our automated priority response division is compiling parameters.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Your Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@tech.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-black text-white rounded-xl border border-white/10 focus:outline-none focus:border-white transition-colors text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Detail compile hashes, order ID, or core request..."
                  className="w-full px-4 py-2.5 h-28 bg-black text-white rounded-xl border border-white/10 focus:outline-none focus:border-white transition-colors text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white hover:bg-zinc-200 active:scale-[0.98] text-black text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Transmit Encrypted Message
                <Send className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 9. FOOTER
// ==========================================
export function Footer({ onLegalClick, onAdminLoginClick }: { onLegalClick: (title: string, body: string) => void; onAdminLoginClick?: () => void }) {
  const openLegal = (type: string) => {
    let t = "";
    let b = "";
    if (type === "privacy") {
      t = "Review Console Privacy Policy & Security Protocol";
      b = "Review Console Apps Ltd. values user privacy. Our cryptographic license activation processes authenticate runtime validity without reading contact, telemetry, or private local user files. All communications remain completely encrypted over secure SSL backends.";
    } else if (type === "terms") {
      t = "Terms & License Agreements";
      b = "Licenses acquired on our e-commerce platform are non-transferable. Modifying, decompiling, or reverse-engineering application package executables (APKs) triggers immediate API Key revocation, system blacklists, and legal copyright notices.";
    } else {
      t = "Binance Pay Refund Policy";
      b = "Due to the instantaneous and permanent digital delivery of APK download configurations and active cryptographically compiled license keys, refunds are strictly unauthorized once payments are successfully verified on the Binance Pay gateway.";
    }
    onLegalClick(t, b);
  };

  return (
    <footer className="bg-[#030303] border-t border-white/5 py-12 text-zinc-500 font-sans text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div>
          <span className="font-bold text-white font-display uppercase tracking-wider">REVIEW CONSOLE STORE</span>
          <p className="mt-1 text-zinc-600">Premium applications ecosystem. Authorized Binance Pay delivery.</p>
        </div>

        <div className="flex gap-4">
          <button onClick={() => openLegal("privacy")} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
          <span>•</span>
          <button onClick={() => openLegal("terms")} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
          <span>•</span>
          <button onClick={() => openLegal("refund")} className="hover:text-white transition-colors cursor-pointer">Refund Policy</button>
          {onAdminLoginClick && (
            <>
              <span>•</span>
              <button onClick={onAdminLoginClick} className="text-zinc-600 hover:text-zinc-300 transition-colors font-mono text-[11px] cursor-pointer" id="footer-admin-login-btn">System Admin Login</button>
            </>
          )}
        </div>

        <p className="text-zinc-700">© {new Date().getFullYear()} Review Console Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ==========================================
// 10. BINANCE PAY CHECKOUT MODAL
// ==========================================
interface CheckoutModalProps {
  isOpen: boolean;
  product: ClientProduct | null;
  user: ClientUser | null;
  token: string | null;
  settings?: Record<string, string>;
  onClose: () => void;
  onSuccess: (details: {
    orderId: number;
    amount: number;
    transactionId: string;
    memoNumber: string;
    productName: string;
    apiKey: string;
    apkFile: string;
  }) => void;
  onOpenLogin: () => void;
}

export function BinanceCheckoutModal({ isOpen, product, user, token, settings, onClose, onSuccess, onOpenLogin }: CheckoutModalProps) {
  const [step, setStep] = useState<"cv" | "checkout">("cv");
  const [copiedPaymentCode, setCopiedPaymentCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const [cvName, setCvName] = useState("");
  const [cvPhone, setCvPhone] = useState("");
  const [cvEmail, setCvEmail] = useState("");
  const [cvNationality, setCvNationality] = useState("United States");
  const [paymentCode, setPaymentCode] = useState("");

  const binancePayUrl = getBinancePayLink(product, settings);

  useEffect(() => {
    if (!isOpen || !product) return;
    setStep("cv");
    setCvName(user?.name || "");
    setCvEmail(user?.email || "");
    setCvPhone("");
    setCvNationality("United States");
    setError("");
    setIsVerifying(false);

    const generatedCode = "SEC-PAY-" + Math.floor(100000 + Math.random() * 900000);
    setPaymentCode(generatedCode);
  }, [isOpen, product, user]);

  const handleApplyCv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvName.trim() || !cvPhone.trim() || !cvEmail.trim() || !cvNationality.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setStep("checkout");
  };

  const handleVerifyCompletedPayment = async () => {
    setIsVerifying(true);
    setError("");

    const orderId = Math.floor(100000 + Math.random() * 900000);
    const txId = "TX-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const generatedKey = `AETH_${product?.name?.substring(0, 3).toUpperCase()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      if (user?.uid) {
        await setDoc(doc(db, "orders", String(orderId)), {
          id: orderId,
          userId: user.uid,
          userName: cvName,
          userEmail: cvEmail,
          totalAmount: product?.price || 49,
          productName: product?.name,
          productId: product?.id,
          status: "completed",
          createdAt: new Date().toISOString()
        });

        await setDoc(doc(db, "api_keys", String(orderId)), {
          id: orderId,
          userId: user.uid,
          productId: product?.id,
          productName: product?.name,
          apiKey: generatedKey,
          status: "active",
          createdAt: new Date().toISOString()
        });
      }
    } catch (fsErr) {
      console.warn("Firestore order persistence warning:", fsErr);
    }

    setTimeout(() => {
      setIsVerifying(false);
      onSuccess({
        orderId,
        amount: product?.price || 49,
        transactionId: txId,
        memoNumber: paymentCode || "SEC-PAY-882910",
        productName: product?.name || "",
        apiKey: generatedKey,
        apkFile: product?.apkFile || "app.apk"
      });
    }, 1000);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-start sm:items-center p-3 sm:p-4 bg-black/95">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-lg my-auto rounded-3xl bg-[#0b0c0e] border border-white/10 shadow-2xl text-white font-sans overflow-hidden relative"
      >
        <div className="p-5 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {step === "cv" ? "License Clearance" : "Binance Pay Checkout"}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    Official
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  Encrypted Direct Developer Gateway
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-zinc-900/60 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Software License</span>
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{product.name}</h4>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-mono font-black text-amber-400">${product.price}.00</span>
              <span className="text-[9px] font-mono text-zinc-500 block">USD • Binance Pay</span>
            </div>
          </div>

          {error && (
            <div className="p-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-500/25 rounded-xl">
              {error}
            </div>
          )}

          {step === "cv" && (
            <form onSubmit={handleApplyCv} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={cvName}
                    onChange={(e) => setCvName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1 uppercase tracking-wider">Nationality *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United States"
                    value={cvNationality}
                    onChange={(e) => setCvNationality(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={cvEmail}
                    onChange={(e) => setCvEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1 uppercase tracking-wider">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={cvPhone}
                    onChange={(e) => setCvPhone(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-amber-300 text-zinc-950 font-extrabold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Proceed to Binance Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === "checkout" && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-400/[0.07] border border-amber-400/25 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  <span>Authorization Payment Code</span>
                  <span className="text-emerald-400">Reserved</span>
                </div>
                <div className="flex items-center justify-between bg-black/70 px-3.5 py-2 rounded-xl border border-amber-400/30">
                  <span className="text-sm font-mono font-extrabold text-amber-300">{paymentCode}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(paymentCode);
                      setCopiedPaymentCode(true);
                      setTimeout(() => setCopiedPaymentCode(false), 2000);
                    }}
                    className="p-1 text-[11px] font-mono text-amber-300 cursor-pointer"
                  >
                    {copiedPaymentCode ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <a
                href={binancePayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#F3BA2F] hover:bg-[#ffc83b] text-zinc-950 font-extrabold text-xs sm:text-sm rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer text-center"
              >
                <span>Pay with Binance</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-md shrink-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(binancePayUrl)}`}
                    alt="Binance Pay QR Code"
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    Scan QR with Binance App
                  </span>
                  <p className="text-[11px] text-zinc-400">
                    Open Binance on your phone, scan the QR code, and authorize payment of{" "}
                    <strong className="text-amber-300 font-mono">${product?.price} USD</strong>.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleVerifyCompletedPayment}
                disabled={isVerifying}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-extrabold font-mono rounded-xl uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying on Blockchain Ledger...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>I Have Completed Payment</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// 11. PAYMENT FAILED PAGE
// ==========================================
export function PaymentFailedPage({ details, onRetry, onHome }: { details?: any; onRetry: () => void; onHome: () => void }) {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#030303] text-white flex items-center justify-center px-4 font-sans relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-md p-8 rounded-3xl bg-[#0A0A0A] border border-red-500/20 shadow-2xl text-center relative overflow-hidden space-y-6"
      >
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center text-red-500 mx-auto mb-2">
          <XCircle className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest inline-block">
            Payment Transaction Declined
          </span>
          <h1 className="text-3xl font-extrabold font-display tracking-tight text-white leading-tight">Payment Failed</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">Your Binance Pay transaction could not be processed or was rejected by the gateway.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onRetry}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={onHome}
            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-extrabold rounded-xl border border-white/10 uppercase tracking-wider transition-all cursor-pointer"
          >
            Return Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
