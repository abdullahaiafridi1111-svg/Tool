import { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, Cpu, Smartphone, Zap, Eye, Code, ArrowRight, ChevronDown, Check, 
  Star, Mail, Send, CheckCircle, RefreshCw, Smartphone as PhoneIcon, Award, 
  DollarSign, Users, AlertTriangle, Key, Download, FileText, Lock, Globe, 
  Sparkles, Megaphone, X, Clock, Headphones, Target, CheckCircle2, Crown 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { ClientProduct, ClientUser } from "./types";

// Import modular panels
import LoginModal from "./components/LoginModal.tsx";
import UserDashboard from "./components/UserDashboard.tsx";
import AdminDashboard from "./components/AdminDashboard.tsx";
import ProductDetailPage from "./components/ProductDetailPage.tsx";
import { 
  Hero, Features, Screenshots, DemoVideo, WhyChooseUs, Testimonials, FAQ, Contact, 
  Footer, BinanceCheckoutModal, PaymentFailedPage 
} from "./components/LandingSections.tsx";

const DEFAULT_PRODUCTS: ClientProduct[] = [
  {
    id: 1,
    name: "Regular (only for new reviews)",
    price: 49,
    description: "Essential Google Maps bad review removal tool. Removes standard reviews with reliable speed.",
    features: [
      "Validity: 2 Years",
      "Remove under 3 days",
      "80% Removal Accuracy",
      "Can only remove 1-28 days old reviews"
    ],
    apkFile: "review_console_regular_v2.4.apk",
    imageUrl: "/uploads/screenshot1.png",
    binancePayUrl: "https://app.binance.com/uni-qr/request-to-pay?billOrderId=454519522728255488&billType=request_a_payment",
    displayOrder: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Exclusive",
    price: 99,
    description: "Advanced Google Maps bad review removal tool. Higher accuracy, wider eligible review age, and support.",
    features: [
      "Validity: 2 Years",
      "Remove under 3 days",
      "90% Removal Accuracy",
      "Removes 1 day to 2 years old reviews",
      "Dedicated Customer Care Support"
    ],
    apkFile: "review_console_exclusive_v3.1.apk",
    imageUrl: "/uploads/screenshot2.png",
    binancePayUrl: "https://app.binance.com/uni-qr/request-to-pay?billOrderId=454520053332451328&billType=request_a_payment",
    displayOrder: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Ultra Exclusive",
    price: 199,
    description: "The absolute pinnacle of Google Maps bad review removal. Unrivalled accuracy, lightning fast speed, and 24/7 care.",
    features: [
      "Validity: 4 Years",
      "Remove under 2 days (max 3 days)",
      "95% Removal Accuracy",
      "Removes all types of Google Maps bad reviews",
      "24/7 VIP Customer Care Support"
    ],
    apkFile: "review_console_ultra_exclusive_v5.0.apk",
    imageUrl: "/uploads/screenshot3.png",
    binancePayUrl: "https://app.binance.com/uni-qr/request-to-pay?billOrderId=454520345259950080&billType=request_a_payment",
    displayOrder: 3,
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const isDarkMode = true;

  // Firebase Auth user state
  const [user, setUser] = useState<ClientUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  // Admin auth state
  const [admin, setAdmin] = useState<{ id: number; name: string; email: string } | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Navigation state
  const [activeView, setActiveView] = useState<"landing" | "dashboard" | "admin" | "failed">("landing");

  // Dynamic products
  const [products, setProducts] = useState<ClientProduct[]>(DEFAULT_PRODUCTS);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});

  // Modals & Navigation
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginInitialTab, setLoginInitialTab] = useState<"login" | "register" | "admin">("register");
  const [selectedProductDetail, setSelectedProductDetail] = useState<ClientProduct | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ClientProduct | null>(null);
  const [checkoutDetails, setCheckoutDetails] = useState<any>(null);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; title: string; body: string }>({ isOpen: false, title: "", body: "" });

  const pricingRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        const clientUser: ClientUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Client User",
          email: firebaseUser.email || "",
          isVerified: firebaseUser.emailVerified || true,
          photoURL: firebaseUser.photoURL || undefined,
          createdAt: new Date().toISOString()
        };

        setUser(clientUser);
        setToken(idToken);
        localStorage.setItem("aether_user", JSON.stringify(clientUser));
        localStorage.setItem("aether_token", idToken);

        // Sync with Firestore user document
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            await setDoc(userDocRef, {
              uid: firebaseUser.uid,
              name: clientUser.name,
              email: clientUser.email,
              isVerified: true,
              createdAt: new Date().toISOString()
            });
          }
        } catch (e) {
          console.warn("Firestore user sync warning:", e);
        }
      } else {
        const savedUser = localStorage.getItem("aether_user");
        const savedToken = localStorage.getItem("aether_token");
        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
        }
      }
    });

    const savedAdmin = localStorage.getItem("aether_admin");
    const savedAdminToken = localStorage.getItem("aether_admin_token");
    if (savedAdmin && savedAdminToken) {
      setAdmin(JSON.parse(savedAdmin));
      setAdminToken(savedAdminToken);
    }

    return () => unsubscribe();
  }, []);

  const handleUserAuth = (u: ClientUser, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem("aether_user", JSON.stringify(u));
    localStorage.setItem("aether_token", t);
    setActiveView("dashboard");
  };

  const handleAdminAuth = (adm: { id: number; name: string; email: string }, t: string) => {
    setAdmin(adm);
    setAdminToken(t);
    localStorage.setItem("aether_admin", JSON.stringify(adm));
    localStorage.setItem("aether_admin_token", t);
    setActiveView("admin");
  };

  const toggleView = (target: "landing" | "dashboard" | "admin") => {
    if (activeView === target) {
      setActiveView("landing");
    } else {
      setActiveView(target);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (_) {}
    setUser(null);
    setToken(null);
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem("aether_user");
    localStorage.removeItem("aether_token");
    localStorage.removeItem("aether_admin");
    localStorage.removeItem("aether_admin_token");
    setActiveView("landing");
  };

  const openProductDetail = (prod: ClientProduct) => {
    savedScrollY.current = window.scrollY;
    setSelectedProductDetail(prod);
    setActiveView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setSelectedProductDetail(null);
    setActiveView("landing");
    if (savedScrollY.current > 0) {
      setTimeout(() => {
        window.scrollTo({ top: savedScrollY.current, behavior: "smooth" });
      }, 60);
    }
  };

  const scrollToPricing = () => {
    if (selectedProductDetail) {
      handleBackToHome();
    }
    setTimeout(() => {
      if (pricingRef.current) {
        pricingRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        const el = document.getElementById("pricing");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  const handleBuyNow = (prod: ClientProduct) => {
    setSelectedProduct(prod);
  };

  const handlePaymentSuccess = (details: any) => {
    setSelectedProduct(null);
    setCheckoutDetails(details);
    setActiveView("dashboard");
  };

  return (
    <div className={`min-h-screen max-w-full overflow-x-hidden transition-colors duration-300 ${
      isDarkMode ? "bg-[#030303] text-white selection:bg-white/30" : "bg-zinc-50 text-zinc-900 selection:bg-white/20"
    }`}>

      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#030303] to-zinc-900 border-b border-white/10 text-white py-2 px-4 text-center text-xs relative overflow-hidden flex items-center justify-center gap-3">
        <Megaphone className="w-3.5 h-3.5 text-white shrink-0 relative z-10" />
        <div className="relative z-10 tracking-wide truncate max-w-xl text-[11px] font-semibold">
          <span>Official Developer Store • Google Sign-in with Firebase Auth Enabled</span>
        </div>
      </div>

      {/* Global Header */}
      <header className="sticky top-0 z-40 border-b bg-[#030303] border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => {
              setSelectedProductDetail(null);
              setActiveView("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-9 h-9 bg-white text-black border border-white/80 rounded-xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105">
              <svg className="w-5 h-5 fill-current text-black" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <span className="font-bold uppercase tracking-wider text-sm font-display text-white">
              Review Console
            </span>
          </div>

          {/* Navigation link triggers */}
          {activeView === "landing" && !selectedProductDetail && (
            <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-zinc-400">
              <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToPricing(); }} className="hover:text-white transition-colors">Pricing</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#app-screenshots" className="hover:text-white transition-colors">Screenshots</a>
              <a href="#why-choose-us" className="hover:text-white transition-colors">Comparison</a>
              <a href="#faq" className="hover:text-white transition-colors">Inquiries</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>
          )}

          {/* Session Actions */}
          <div className="flex items-center gap-3">
            {/* Authenticated Admin action trigger */}
            {admin && (
              <button
                onClick={() => toggleView("admin")}
                className="px-3.5 py-1.5 text-[10px] font-bold bg-red-950/20 text-red-400 border border-red-500/20 hover:bg-red-950/40 rounded-xl uppercase tracking-widest transition-all cursor-pointer"
                id="header-admin-btn"
              >
                {activeView === "admin" ? "Storefront" : "Admin Panel"}
              </button>
            )}

            {/* Authenticated User action trigger */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleView("dashboard")}
                  className="px-4 py-2 text-[10px] font-bold bg-white hover:bg-zinc-200 text-black rounded-xl shadow-md uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
                  id="header-user-btn"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{activeView === "dashboard" ? "Store" : "User Cabinet"}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline-block text-[10px] font-semibold text-zinc-400 hover:text-red-400 transition-colors uppercase tracking-widest cursor-pointer px-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoginInitialTab("register");
                  setIsLoginOpen(true);
                }}
                className="px-4 py-2 text-[10px] font-bold bg-white hover:bg-zinc-200 text-black rounded-xl shadow-md uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
                id="header-signin-btn"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Sign In / Sign Up</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Views */}
      <main>
        <AnimatePresence mode="wait">
          
          {/* VIEW: PRODUCT DETAIL */}
          {activeView === "landing" && selectedProductDetail && (
            <motion.div
              key="product-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductDetailPage
                product={selectedProductDetail}
                onBack={handleBackToHome}
                onBuyNow={(prod) => handleBuyNow(prod)}
                settings={siteSettings}
                currentUser={user}
              />
            </motion.div>
          )}

          {/* VIEW: LANDING PAGE */}
          {activeView === "landing" && !selectedProductDetail && (
            <motion.div
              key="landing"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* DYNAMIC PRICING CATALOG (COMPLETE 6 TIERS) */}
              <div className="pt-20 sm:pt-24 pb-20 bg-[#030303] relative overflow-hidden" id="pricing" ref={pricingRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-center mb-16 space-y-3">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold uppercase tracking-widest text-white shadow-sm">
                      <span className="inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      OFFICIAL SOFTWARE LICENSES
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
                      Review Removal Tool
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
                      Select your cryptographic build tier. Instant automated APK delivery and API key compilation verified via Binance Pay.
                    </p>
                  </div>

                  {/* 3-Tier Premium Pricing Grid: Regular, Exclusive, Ultra Exclusive (Pure Black, Grey & White, Fully Seeable Badges) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mx-auto">
                    {products.map((prod) => {
                      const isRegular = prod.id === 1;
                      const isExclusive = prod.id === 2;
                      const isUltra = prod.id === 3;

                      if (isRegular) {
                        return (
                          <div
                            key={prod.id}
                            onClick={() => openProductDetail(prod)}
                            className="group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full border transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-[#121216]/95 via-[#0b0b0e]/95 to-[#040405] border-white/10 hover:border-zinc-400/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl text-white"
                          >
                            {/* Inner clipped decorative layer */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                              <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500" />
                              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-white/[0.03] rounded-full blur-3xl group-hover:bg-white/[0.06] transition-all" />
                            </div>

                            <div className="relative z-10">
                              {/* Fully Seeable Header Badge */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 bg-[#18181b] text-zinc-300 border border-zinc-700/80 shadow-sm">
                                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                                  <span>REGULAR BUILD</span>
                                </div>
                                <span className="text-[10px] font-mono text-zinc-400 font-semibold px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                                  BUILD v2.4
                                </span>
                              </div>

                              <h3 className="text-2xl font-black font-display tracking-tight text-white mb-2">
                                {prod.name}
                              </h3>

                              <div className="mb-4 flex items-baseline gap-2">
                                <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
                                  ${prod.price}
                                </span>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-semibold">
                                    ONE-TIME
                                  </span>
                                  <span className="text-[10px] font-mono text-zinc-400">
                                    2-Year License
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-zinc-400 leading-relaxed mb-5 min-h-[34px]">
                                {prod.description}
                              </p>

                              {/* Specs Bar */}
                              <div className="grid grid-cols-2 gap-2 mb-5 py-2.5 px-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                <div>
                                  <p className="text-[9px] uppercase font-mono text-zinc-400">Review Age</p>
                                  <p className="text-xs font-semibold text-zinc-200">1 - 28 Days</p>
                                </div>
                                <div>
                                  <p className="text-[9px] uppercase font-mono text-zinc-400">Accuracy</p>
                                  <p className="text-xs font-semibold text-zinc-200">80% Verified</p>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="space-y-2.5 pt-3 border-t border-white/10 mb-7">
                                {prod.features.map((feature, i) => (
                                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-white/[0.06] border border-white/[0.12]">
                                      <Check className="w-3 h-3 text-zinc-300" />
                                    </div>
                                    <span className="truncate">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="relative z-10">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openProductDetail(prod);
                                }}
                                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 hover:border-zinc-500 shadow-md group/btn"
                              >
                                <span>View Specs & Purchase</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-400">
                                <Lock className="w-2.5 h-2.5 text-zinc-400" />
                                <span>Instant APK Delivery • Binance Pay</span>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (isExclusive) {
                        return (
                          <div
                            key={prod.id}
                            onClick={() => openProductDetail(prod)}
                            className="group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full border-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-[#18181f]/95 via-[#101014]/95 to-[#060608] border-zinc-400/60 hover:border-white shadow-[0_0_40px_-10px_rgba(255,255,255,0.15),0_25px_50px_-20px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.2)] backdrop-blur-xl text-white"
                          >
                            {/* Inner clipped decorative layer */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                              <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
                              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-56 h-56 bg-white/[0.05] rounded-full blur-3xl group-hover:bg-white/[0.09] transition-all" />
                            </div>

                            <div className="relative z-10">
                              {/* Fully Seeable Header Badge */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase flex items-center gap-2 bg-[#1c1c22] text-white border border-zinc-400 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                  </span>
                                  <span>MOST POPULAR • ADVANCED</span>
                                </div>
                                <span className="text-[10px] font-mono text-white font-bold px-2 py-0.5 rounded bg-white/10 border border-white/20">
                                  BUILD v3.1
                                </span>
                              </div>

                              <h3 className="text-2xl font-black font-display tracking-tight text-white mb-2 flex items-center gap-2">
                                <span>{prod.name}</span>
                                <Sparkles className="w-4 h-4 text-zinc-300 shrink-0" />
                              </h3>

                              <div className="mb-4 flex items-baseline gap-2">
                                <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
                                  ${prod.price}
                                </span>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-200 font-bold">
                                    ONE-TIME
                                  </span>
                                  <span className="text-[10px] font-mono text-zinc-300">
                                    2-Year Full License
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-zinc-300 leading-relaxed mb-5 min-h-[34px]">
                                {prod.description}
                              </p>

                              {/* Specs Bar */}
                              <div className="grid grid-cols-2 gap-2 mb-5 py-2.5 px-3 rounded-2xl bg-white/[0.06] border border-white/15">
                                <div>
                                  <p className="text-[9px] uppercase font-mono text-zinc-300">Review Age</p>
                                  <p className="text-xs font-bold text-white">1 Day - 2 Years</p>
                                </div>
                                <div>
                                  <p className="text-[9px] uppercase font-mono text-zinc-300">Accuracy</p>
                                  <p className="text-xs font-bold text-white">90% Verified</p>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="space-y-2.5 pt-3 border-t border-white/15 mb-7">
                                {prod.features.map((feature, i) => (
                                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-100 font-medium">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-white/10 border border-white/20">
                                      <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="truncate">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="relative z-10">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openProductDetail(prod);
                                }}
                                className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-zinc-200 via-white to-zinc-200 hover:from-white hover:to-zinc-100 text-black font-extrabold shadow-[0_0_30px_rgba(255,255,255,0.25)] group/btn"
                              >
                                <span>Get Exclusive License</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-300">
                                <Zap className="w-3 h-3 text-zinc-300" />
                                <span>Instant APK Delivery • Dedicated Support</span>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (isUltra) {
                        return (
                          <div
                            key={prod.id}
                            onClick={() => openProductDetail(prod)}
                            className="group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full border-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-[#202028]/95 via-[#131318]/95 to-[#060608] border-white hover:border-white shadow-[0_0_60px_-10px_rgba(255,255,255,0.3),0_25px_50px_-20px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.35)] backdrop-blur-xl text-white"
                          >
                            {/* Inner clipped decorative layer */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                              <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_#ffffff]" />
                              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-56 h-56 bg-white/[0.1] rounded-full blur-3xl group-hover:bg-white/[0.16] transition-all" />
                            </div>

                            <div className="relative z-10">
                              {/* Fully Seeable Header Badge */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 bg-white text-black border border-white shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                  <Crown className="w-3.5 h-3.5 text-black fill-black" />
                                  <span>ULTRA EXCLUSIVE • VIP PINNACLE</span>
                                </div>
                                <span className="text-[10px] font-mono text-white font-extrabold px-2 py-0.5 rounded bg-white/10 border border-white/20">
                                  BUILD v5.0
                                </span>
                              </div>

                              <h3 className="text-2xl font-black font-display tracking-tight text-white mb-2 flex items-center gap-2">
                                <span>{prod.name}</span>
                                <Award className="w-4 h-4 text-white shrink-0" />
                              </h3>

                              <div className="mb-4 flex items-baseline gap-2">
                                <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                                  ${prod.price}
                                </span>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">
                                    ONE-TIME
                                  </span>
                                  <span className="text-[10px] font-mono text-zinc-300 font-semibold">
                                    4-Year Extended License
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-zinc-200 leading-relaxed mb-5 min-h-[34px]">
                                {prod.description}
                              </p>

                              {/* Specs Bar */}
                              <div className="grid grid-cols-2 gap-2 mb-5 py-2.5 px-3 rounded-2xl bg-white/[0.08] border border-white/20 shadow-inner">
                                <div>
                                  <p className="text-[9px] uppercase font-mono text-zinc-300 font-semibold">Review Scope</p>
                                  <p className="text-xs font-black text-white">ALL BAD REVIEWS</p>
                                </div>
                                <div>
                                  <p className="text-[9px] uppercase font-mono text-zinc-300 font-semibold">Speed / Accuracy</p>
                                  <p className="text-xs font-bold text-white">&lt; 2 Days • 95% Rate</p>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="space-y-2.5 pt-3 border-t border-white/20 mb-7">
                                {prod.features.map((feature, i) => (
                                  <div key={i} className="flex items-center gap-2.5 text-xs text-white font-medium">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-white border border-white shadow-sm">
                                      <Check className="w-3 h-3 text-black" />
                                    </div>
                                    <span className="truncate">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="relative z-10">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openProductDetail(prod);
                                }}
                                className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer bg-white hover:bg-zinc-100 text-black font-black shadow-[0_0_40px_rgba(255,255,255,0.35)] group/btn"
                              >
                                <span>Get Ultra Exclusive License</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-300">
                                <Headphones className="w-3 h-3 text-white" />
                                <span>24/7 VIP Concierge & Setup • Instant APK</span>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Fallback for any other tier
                      return (
                        <div
                          key={prod.id}
                          onClick={() => openProductDetail(prod)}
                          className="group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full border transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-[#0f1115]/95 via-[#0b0c0f]/95 to-[#060709] border-white/10 hover:border-zinc-500/50 shadow-xl text-white"
                        >
                          <div>
                            <h3 className="text-2xl font-black text-white mb-2">{prod.name}</h3>
                            <div className="text-4xl font-extrabold font-mono text-white mb-4">${prod.price}</div>
                            <p className="text-xs text-zinc-400 mb-5">{prod.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openProductDetail(prod);
                            }}
                            className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                          >
                            View Specs & Purchase
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. FEATURES SPECIFICATIONS */}
              <Features settings={siteSettings} />

              {/* 4. HIGH-RESOLUTION SCREENSHOTS GALLERY */}
              <Screenshots settings={siteSettings} />

              {/* 5. LIVE VIDEO DEMONSTRATION */}
              <DemoVideo settings={siteSettings} />

              {/* 6. COMPARISON MATRIX */}
              <WhyChooseUs />

              {/* 7. CUSTOMER TESTIMONIALS */}
              <Testimonials />

              {/* 8. FAQ */}
              <FAQ />

              {/* 9. CONTACT FORM */}
              <Contact />

              {/* 10. FOOTER */}
              <Footer 
                onLegalClick={(t, b) => setLegalModal({ isOpen: true, title: t, body: b })} 
                onAdminLoginClick={() => { setLoginInitialTab("admin"); setIsLoginOpen(true); }}
              />
            </motion.div>
          )}

          {/* VIEW: USER DASHBOARD */}
          {activeView === "dashboard" && user && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UserDashboard user={user} token={token || "valid_token"} onLogout={handleLogout} />
              <Footer 
                onLegalClick={(t, b) => setLegalModal({ isOpen: true, title: t, body: b })} 
                onAdminLoginClick={() => { setLoginInitialTab("admin"); setIsLoginOpen(true); }}
              />
            </motion.div>
          )}

          {/* VIEW: ADMIN PANEL */}
          {activeView === "admin" && admin && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminDashboard token={adminToken || "valid_admin"} onLogout={handleLogout} />
              <Footer 
                onLegalClick={(t, b) => setLegalModal({ isOpen: true, title: t, body: b })} 
                onAdminLoginClick={() => { setLoginInitialTab("admin"); setIsLoginOpen(true); }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {isLoginOpen && (
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onAuthSuccess={handleUserAuth}
            onAdminAuthSuccess={handleAdminAuth}
            initialTab={loginInitialTab}
          />
        )}
      </AnimatePresence>

      {/* Binance Pay Checkout Modal Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <BinanceCheckoutModal
            isOpen={!!selectedProduct}
            product={selectedProduct}
            user={user}
            token={token}
            settings={siteSettings}
            onClose={() => setSelectedProduct(null)}
            onSuccess={handlePaymentSuccess}
            onOpenLogin={() => {
              setSelectedProduct(null);
              setLoginInitialTab("login");
              setIsLoginOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Legal Dialog Modal */}
      <AnimatePresence>
        {legalModal.isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-start sm:items-center p-4 bg-black/90">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md my-auto p-6 rounded-2xl glass-panel text-white text-center space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Legal Document</span>
                <button onClick={() => setLegalModal({ isOpen: false, title: "", body: "" })} className="text-zinc-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <h3 className="text-lg font-bold font-display tracking-tight text-white">{legalModal.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed text-left bg-zinc-950 p-4 rounded-xl border border-white/5">{legalModal.body}</p>
              <button
                onClick={() => setLegalModal({ isOpen: false, title: "", body: "" })}
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
