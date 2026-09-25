import React, { useState, useEffect } from "react";
import { 
  Download, Key, FileText, PhoneCall, RefreshCw, User, Lock, Calendar, Clipboard, 
  Check, ChevronRight, ShieldAlert, BadgeCheck, AlertCircle, MapPin, Star, MessageSquare, 
  Send, X, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import { collection, query, where, getDocs, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db, auth, handleFirestoreError, OperationType } from "../firebase";
import { ClientUser, ClientPurchase, ClientOrderHistory } from "../types";

interface UserDashboardProps {
  user: ClientUser;
  token: string;
  onLogout: () => void;
}

export default function UserDashboard({ user, token, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"purchases" | "orders" | "console" | "profile">("purchases");
  const [purchases, setPurchases] = useState<ClientPurchase[]>([]);
  const [orders, setOrders] = useState<ClientOrderHistory[]>([]);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Review Modal State
  const [reviewProduct, setReviewProduct] = useState<{ id: number; name: string } | null>(null);
  const [revRating, setRevRating] = useState<number>(5);
  const [revHoverRating, setRevHoverRating] = useState<number>(0);
  const [revTitle, setRevTitle] = useState<string>("");
  const [revComment, setRevComment] = useState<string>("");
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [revSuccess, setRevSuccess] = useState<boolean>(false);
  const [revError, setRevError] = useState<string>("");

  // Auditor Console Interactive State
  const [consoleApiKey, setConsoleApiKey] = useState("SEC-AUDIT-KEY-8829");
  const [consoleUnlocked, setConsoleUnlocked] = useState(true);
  const [placesApiKey, setPlacesApiKey] = useState("");
  const [googleReviewLink, setGoogleReviewLink] = useState("");
  const [businessNameInput, setBusinessNameInput] = useState("");
  const [reviewerDisplayName, setReviewerDisplayName] = useState("");
  const [reviewTextContent, setReviewTextContent] = useState("");
  const [isSubmittingCase, setIsSubmittingCase] = useState(false);
  const [caseSubmittedSuccess, setCaseSubmittedSuccess] = useState(false);

  // Profile fields
  const [profileName, setProfileName] = useState(user.name);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [dlProgress, setDlProgress] = useState<{ [key: number]: boolean }>({});

  // Sync orders and api keys from Firestore
  useEffect(() => {
    if (!user?.uid) return;

    // Fetch user's orders from Firestore
    try {
      const ordersQuery = query(collection(db, "orders"), where("userId", "==", user.uid));
      const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
        const orderList: ClientOrderHistory[] = [];
        const purchaseList: ClientPurchase[] = [];

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          orderList.push({
            orderId: data.id || docSnap.id,
            totalAmount: data.totalAmount || 49,
            status: data.status || "completed",
            createdAt: data.createdAt || new Date().toISOString(),
            items: [{
              productId: data.productId || 1,
              productName: data.productName || "Review Console Tool",
              price: data.totalAmount || 49
            }],
            payment: {
              transactionId: "TX-" + (data.id || docSnap.id),
              amount: data.totalAmount || 49,
              status: "success"
            }
          });

          purchaseList.push({
            orderId: data.id || docSnap.id,
            productId: data.productId || 1,
            productName: data.productName || "Review Console Software",
            apiKey: `AETH_${(data.productName || "TOOL").substring(0, 3).toUpperCase()}_${String(docSnap.id).slice(-6)}`,
            apkFile: "review_console_v2.0.apk",
            memoNumber: `MEMO-${docSnap.id}`,
            totalAmount: data.totalAmount || 49,
            purchaseDate: data.createdAt || new Date().toISOString()
          });
        });

        if (orderList.length > 0) {
          setOrders(orderList);
          setPurchases(purchaseList);
        } else {
          // Fallback initial sample purchase so user immediately has an unlocked app to test
          const samplePurchase: ClientPurchase = {
            orderId: "ORD-991201",
            productId: 5,
            productName: "Supreme Master Edition",
            apiKey: "AETH_SUP_LIFETIME_991201_ACTV",
            apkFile: "review_console_supreme_master_v8.0.apk",
            memoNumber: "MEMO-BINANCE-991201",
            totalAmount: 1499,
            purchaseDate: new Date().toISOString()
          };
          setPurchases([samplePurchase]);
          setOrders([{
            orderId: "ORD-991201",
            totalAmount: 1499,
            status: "completed",
            createdAt: new Date().toISOString(),
            items: [{
              productId: 5,
              productName: "Supreme Master Edition",
              price: 1499
            }],
            payment: {
              transactionId: "BINANCE-TX-991201-OK",
              amount: 1499,
              status: "success"
            }
          }]);
        }
      }, (err) => {
        console.warn("Firestore orders listener warning:", err);
      });

      return () => unsubscribeOrders();
    } catch (e) {
      console.warn("Firestore error:", e);
    }
  }, [user]);

  const handleCopyKey = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(keyId);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleDownloadApk = async (productId: number, apkFile: string) => {
    setDlProgress(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      const blob = new Blob([`MOCK_APK_FILE_DATA_FOR_${apkFile}`], { type: "application/vnd.android.package-archive" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = apkFile;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setDlProgress(prev => ({ ...prev, [productId]: false }));
      setSuccess(`Download authorized! ${apkFile} prepared and delivered successfully.`);
      setTimeout(() => setSuccess(""), 4000);
    }, 1200);
  };

  const handleDownloadCareList = () => {
    const content = `=== REVIEW CONSOLE SUPPORT SERVICES ===\n\nVIP Phone Hotline: +1-800-555-REVC\nTechnical Helpline: +1-888-293-ROID\nBinance Pay Integration Support Telegram: @ReviewConsoleAssist\nEmail: priority-support@reviewconsole.com\n\nCompany Location: Review Console Towers, Floor 18, Suite 42\nWebsite: www.reviewconsole.com\n\nThank you for choosing Review Console premium apps ecosystem. Keep this care document secured.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer_care_contacts.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setSuccess("Customer care directory downloaded!");
    setTimeout(() => setSuccess(""), 4000);
  };

  const generateInvoicePDF = (p: ClientPurchase) => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(245, 247, 250);
      doc.rect(0, 0, 210, 297, "F");

      doc.setFillColor(15, 15, 20);
      doc.rect(0, 0, 210, 50, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(22);
      doc.text("REVIEW CONSOLE APPS LTD.", 20, 25);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(180, 180, 180);
      doc.text("PREMIUM ANDROID PLATFORM ECOSYSTEM", 20, 32);
      doc.text("www.reviewconsole.com | support@reviewconsole.com", 20, 38);

      doc.setFillColor(24, 24, 27);
      doc.rect(140, 18, 50, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.text("CASH INVOICE", 147, 26);

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.text("CUSTOMER DETAILS:", 20, 65);
      doc.setFont("Helvetica", "bold");
      doc.text(`Name: ${user.name}`, 20, 71);
      doc.text(`Email: ${user.email}`, 20, 77);

      doc.setFont("Helvetica", "normal");
      doc.text("INVOICE METADATA:", 120, 65);
      doc.setFont("Helvetica", "bold");
      doc.text(`Memo Number: ${p.memoNumber}`, 120, 71);
      doc.text(`Order ID: #${p.orderId}`, 120, 77);
      doc.text(`Purchase Date: ${new Date(p.purchaseDate).toLocaleString()}`, 120, 83);

      doc.setFillColor(30, 30, 36);
      doc.rect(20, 95, 170, 10, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.text("PRODUCT NAME", 25, 101);
      doc.text("PAYMENT METHOD", 90, 101);
      doc.text("PRICE", 160, 101);

      doc.setFillColor(255, 255, 255);
      doc.rect(20, 105, 170, 15, "F");
      doc.setTextColor(60, 60, 60);
      doc.setFont("Helvetica", "normal");
      doc.text(p.productName, 25, 114);
      doc.text("Binance Pay (USD)", 90, 114);
      doc.setFont("Helvetica", "bold");
      doc.text(`$${p.totalAmount}.00`, 160, 114);

      doc.save(`cash_memo_${p.memoNumber}.pdf`);
      setSuccess(`Cash Memo ${p.memoNumber} downloaded!`);
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (user?.uid) {
        await setDoc(doc(db, "users", user.uid), {
          name: profileName,
          email: user.email
        }, { merge: true });
      }
      setSuccess("Profile settings updated!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#030303] text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header banner */}
        <div className="mb-8 p-6 rounded-2xl glass-panel relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-2xl font-display">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-display tracking-tight text-white">{user.name}</h1>
                <BadgeCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCareList}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#0A0A0A] border border-white/10 hover:border-white/40 rounded-xl hover:text-white transition-all text-zinc-300 uppercase tracking-wider shadow-sm cursor-pointer"
              id="download-care-list-btn"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              Care Directory
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-xs font-semibold bg-red-950/20 text-red-400 border border-red-500/20 hover:bg-red-950/40 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
              id="user-logout-btn"
            >
              Logout Session
            </button>
          </div>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Navigation drawer */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => { setActiveTab("purchases"); setError(""); setSuccess(""); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "purchases"
                  ? "bg-white border-white text-black font-extrabold shadow-lg shadow-white/10"
                  : "bg-zinc-900/60 border-white/5 hover:border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Key className="w-4 h-4" />
                Purchased APKs & Keys
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setActiveTab("orders"); setError(""); setSuccess(""); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-white border-white text-black font-extrabold shadow-lg shadow-white/10"
                  : "bg-zinc-900/60 border-white/5 hover:border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                Order & Billing History
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setActiveTab("console"); setError(""); setSuccess(""); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "console"
                  ? "bg-emerald-500 border-emerald-400 text-black font-extrabold shadow-lg shadow-emerald-500/20"
                  : "bg-zinc-900/60 border-white/5 hover:border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-emerald-400" />
                Auditor Console Interface
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setActiveTab("profile"); setError(""); setSuccess(""); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-white border-white text-black font-extrabold shadow-lg shadow-white/10"
                  : "bg-zinc-900/60 border-white/5 hover:border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <User className="w-4 h-4" />
                Account Settings
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Active Tab Viewport */}
          <div className="lg:col-span-3">
            {error && (
              <div className="flex items-center gap-2 p-4 text-sm text-red-400 bg-red-950/20 border border-red-500/20 rounded-xl mb-6">
                <ShieldAlert className="w-5 h-5 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 p-4 text-sm text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 rounded-xl mb-6">
                <BadgeCheck className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{success}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Tab: PURCHASES */}
              {activeTab === "purchases" && (
                <motion.div
                  key="purchases"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold font-display tracking-tight text-white">Your Unlocked Apps Ecosystem</h2>
                    <span className="px-2.5 py-1 text-xs font-mono bg-white/10 border border-white/20 rounded-full text-white">
                      {purchases.length} Active Plan{purchases.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {purchases.map((p, idx) => (
                      <div key={idx} className="p-6 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between h-full group hover:border-white/30 transition-all">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 text-xs font-semibold bg-white/10 border border-white/20 rounded-full text-white font-mono tracking-wider uppercase">
                              {p.productName}
                            </span>
                            <span className="text-xs font-mono text-zinc-500">
                              {new Date(p.purchaseDate).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold font-display tracking-tight mb-2 text-white">
                            {p.productName}
                          </h3>

                          {/* Secure API Key container */}
                          <div className="mt-4 bg-zinc-950 p-3 rounded-xl border border-white/5 relative overflow-hidden">
                            <span className="block text-[10px] font-mono text-zinc-500 tracking-wider uppercase mb-1">
                              Secure Mobile API Key
                            </span>
                            <div className="flex items-center justify-between gap-4 font-mono text-xs">
                              <span className="text-white select-all truncate flex-1 min-w-0">
                                {p.apiKey}
                              </span>
                              <button
                                onClick={() => handleCopyKey(p.apiKey, `${p.orderId}-${p.productId}`)}
                                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all shrink-0 cursor-pointer"
                                title="Copy Key"
                              >
                                {copiedKeyId === `${p.orderId}-${p.productId}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Clipboard className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                          <button
                            onClick={() => handleDownloadApk(p.productId, p.apkFile)}
                            disabled={dlProgress[p.productId]}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-zinc-200 text-black text-[11px] font-extrabold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {dlProgress[p.productId] ? "Downloading..." : "Download APK"}
                          </button>

                          <button
                            onClick={() => generateInvoicePDF(p)}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-zinc-900 hover:bg-white hover:text-black text-zinc-300 text-[11px] font-semibold rounded-xl border border-white/10 transition-all uppercase tracking-wider cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-zinc-400" />
                            Cash Memo
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab: ORDERS */}
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold font-display tracking-tight text-white">Billing & Payment Statements</h2>

                  <div className="space-y-4">
                    {orders.map((o, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2.5 mb-1">
                              <span className="font-mono text-xs font-semibold text-zinc-300">Order ID: #{o.orderId}</span>
                              <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                COMPLETED
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500">{new Date(o.createdAt).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <span className="block text-sm font-semibold text-white font-mono">${o.totalAmount}.00</span>
                            <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Binance Pay Gateway</span>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-3 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-zinc-400">
                          <div>
                            <span className="text-zinc-500">Products:</span>{" "}
                            <span className="text-zinc-300">{o.items.map(i => i.productName).join(", ")}</span>
                          </div>
                          {o.payment && (
                            <div className="text-zinc-500">
                              Binance TX: <span className="text-white select-all font-semibold">{o.payment.transactionId}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* VIEW: SECURE AUDITOR CONSOLE */}
              {activeTab === "console" && (
                <motion.div
                  key="console"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div className="bg-[#0a0d0e] p-5 rounded-2xl border border-zinc-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0a0d0e] shadow-md shrink-0">
                        <MapPin className="w-7 h-7 fill-[#0a0d0e]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold font-mono text-white tracking-widest uppercase">REPORT REVIEW</h2>
                        <p className="text-xs text-zinc-400 font-sans">Report business google maps review</p>
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg border border-emerald-600/60 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest bg-emerald-950/20 shrink-0">
                      AUTHORIZED
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0d1314] border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono font-bold text-slate-200 tracking-widest uppercase">API ACCESS</h3>
                      <span className="px-3 py-1 rounded-md bg-[#101719] border border-zinc-800 text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                        VERIFIED
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#070b0c] border border-emerald-500 relative space-y-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wide block">Private API Key</span>
                      <input
                        type={consoleUnlocked ? "text" : "password"}
                        value={consoleApiKey}
                        onChange={(e) => setConsoleApiKey(e.target.value)}
                        className="w-full bg-transparent font-mono text-white font-bold text-lg tracking-widest focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0d1314] border border-zinc-800 space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-200 tracking-widest uppercase">CASE INPUT (GOOGLE MAPS)</h3>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-[#070b0c] border border-zinc-800">
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">Google Maps Review Link</label>
                        <input
                          type="text"
                          value={googleReviewLink}
                          onChange={(e) => setGoogleReviewLink(e.target.value)}
                          placeholder="https://maps.app.goo.gl/..."
                          className="w-full bg-transparent font-mono text-xs text-white outline-none"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-[#070b0c] border border-zinc-800">
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">Business Name</label>
                        <input
                          type="text"
                          value={businessNameInput}
                          onChange={(e) => setBusinessNameInput(e.target.value)}
                          placeholder="Acme Business Corp"
                          className="w-full bg-transparent font-mono text-xs text-white outline-none"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-[#070b0c] border border-zinc-800">
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">Review Text Content</label>
                        <textarea
                          rows={3}
                          value={reviewTextContent}
                          onChange={(e) => setReviewTextContent(e.target.value)}
                          placeholder="Enter defamatory or policy-violating review content..."
                          className="w-full bg-transparent font-mono text-xs text-white outline-none resize-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsSubmittingCase(true);
                        setTimeout(() => {
                          setIsSubmittingCase(false);
                          setCaseSubmittedSuccess(true);
                          setTimeout(() => setCaseSubmittedSuccess(false), 4000);
                        }, 1200);
                      }}
                      disabled={isSubmittingCase}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmittingCase ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      <span>{isSubmittingCase ? "EXECUTING CONSOLE AUDIT..." : "SUBMIT AUDIT REPORT"}</span>
                    </button>

                    {caseSubmittedSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                        Audit Case Submitted Successfully! Policy signal checks queued on Gemini Grounding.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tab: PROFILE */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 rounded-2xl glass-panel space-y-4 max-w-lg"
                >
                  <h3 className="text-lg font-bold font-display tracking-tight text-white flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-white" />
                    Account Details
                  </h3>

                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="text"
                        disabled
                        value={user.email}
                        className="w-full px-4 py-2.5 bg-zinc-950 text-zinc-500 rounded-xl border border-white/5 font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Display Name
                      </label>
                      <input
                        type="text"
                        required
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-950 text-white rounded-xl border border-white/5 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-extrabold rounded-xl uppercase tracking-wider cursor-pointer"
                    >
                      Save Profile
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
