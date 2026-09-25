import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  TrendingUp, Users, ShoppingCart, Download, Search, Settings, Megaphone, 
  ShieldCheck, Key, RefreshCw, X, Edit2, Trash2, PlusCircle, AlertTriangle, 
  Globe, Film, Image as ImageIcon, Sparkles, Upload, ArrowUp, ArrowDown, 
  ArrowLeft, ArrowRight, ListOrdered, Move, Eye, EyeOff, DollarSign, Tag, Check, List 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ClientProduct, AdminStats, AdminUser, AdminOrder, AdminPayment, AdminDownload, AdminApiKey } from "../types";
import { getYouTubeEmbedUrl } from "../utils/video";

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  onSettingsUpdate?: () => void;
}

const DEFAULT_STATS: AdminStats = {
  revenue: 14850,
  totalSales: 28,
  activeUsers: 42,
  totalDownloads: 67,
  salesHistory: [
    { day: "Mon", revenue: 1499 },
    { day: "Tue", revenue: 2998 },
    { day: "Wed", revenue: 1499 },
    { day: "Thu", revenue: 4497 },
    { day: "Fri", revenue: 1999 },
    { day: "Sat", revenue: 2458 }
  ]
};

export default function AdminDashboard({ token, onLogout, onSettingsUpdate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"stats" | "products" | "users" | "orders" | "payments" | "keys" | "announcements" | "config" | "website">("stats");
  
  const [stats, setStats] = useState<AdminStats>(DEFAULT_STATS);
  const [products, setProducts] = useState<ClientProduct[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [downloads, setDownloads] = useState<AdminDownload[]>([]);
  const [apiKeys, setApiKeys] = useState<AdminApiKey[]>([]);
  
  const [userSearch, setUserSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");

  const [editingProduct, setEditingProduct] = useState<ClientProduct | null>(null);
  const [editingFeaturesProduct, setEditingFeaturesProduct] = useState<ClientProduct | null>(null);
  const [featureList, setFeatureList] = useState<string[]>([]);
  const [newFeatureInput, setNewFeatureInput] = useState("");
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [productForm, setProductForm] = useState({ name: "", price: "", description: "", features: "", displayOrder: "1", imageUrl: "", binancePayUrl: "", isHidden: false });
  
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [careText, setCareText] = useState("");
  
  const [settings, setSettings] = useState({ company_name: "Review Console Apps Ltd.", support_email: "support@reviewconsole.com", default_cash_memo_template: "Official Cash Invoice v2.0" });

  const [webSettings, setWebSettings] = useState({
    hero_title: "Official Developer Application Store",
    hero_desc: "Purchase high-performance Android applications directly from the developer. Instant cryptographic API activation keys, direct signed APK downloads, and secure Binance Pay checkout.",
    hero_badge: "Official Developer Store • Direct Apps & License Keys",
    disable_price_tag: "false",
    features_title: "Cutting Edge Framework Specifications",
    features_desc: "Discover the state-of-the-art architectures supporting every single premium application we publish.",
    demo_title: "Product Walkthrough & Demonstration",
    demo_desc: "Watch how our Android application operates in real-time, executing routines with high speed and precision.",
    hero_image: "",
    demo_video: "https://youtube.com/shorts/r8-Zgs6BoAY?si=FQfzlgHAj7IO1Hvw",
    screenshot1_title: "Secure Auditor Console & API Access",
    screenshot1_url: "",
    screenshot2_title: "Case Logs Database & Target Review Snapshot",
    screenshot2_url: "",
    screenshot3_title: "Gemini Grounded Policy Auditor",
    screenshot3_url: "",
    screenshot4_title: "Policy Evidence Signals Checklist",
    screenshot4_url: "",
    binance_pay_regular: "",
    binance_pay_exclusive: "",
    binance_pay_ultra: "",
    binance_pay_enterprise: "",
    binance_pay_supreme: "",
    binance_pay_ultimate: "",
    binance_pay_apex: "",
    binance_pay_id: "",
    usdt_trc20_address: "",
    usdt_bep20_address: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(db, "users"));
      const list: AdminUser[] = [];
      snap.forEach((d) => {
        const data = d.data();
        list.push({
          id: data.id || d.id,
          name: data.name || "Customer",
          email: data.email || "",
          isVerified: data.isVerified ?? true,
          createdAt: data.createdAt || new Date().toISOString()
        });
      });
      if (list.length > 0) setUsers(list);
    } catch (_) {}
  };

  const fetchOrders = async () => {
    try {
      const snap = await getDocs(collection(db, "orders"));
      const list: AdminOrder[] = [];
      const paymentList: AdminPayment[] = [];
      snap.forEach((d) => {
        const data = d.data();
        list.push({
          id: data.id || d.id,
          userName: data.userName || "Customer",
          userEmail: data.userEmail || "",
          items: data.productName || "Software Tool",
          totalAmount: data.totalAmount || 49,
          status: data.status || "completed",
          createdAt: data.createdAt || new Date().toISOString()
        });
        paymentList.push({
          id: d.id,
          transactionId: "TX-" + d.id,
          userName: data.userName || "Customer",
          userEmail: data.userEmail || "",
          amount: data.totalAmount || 49,
          status: "success",
          createdAt: data.createdAt || new Date().toISOString()
        });
      });
      if (list.length > 0) {
        setOrders(list);
        setPayments(paymentList);
      }
    } catch (_) {}
  };

  const fetchProducts = () => {
    const saved = localStorage.getItem("store_custom_products");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
        return;
      } catch (_) {}
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#030303] text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Title Block */}
        <div className="mb-8 p-6 rounded-2xl bg-zinc-900 border border-red-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-500/20 rounded-full font-bold uppercase tracking-widest">
                SYSTEM CORE ADM
              </span>
              <h1 className="text-2xl font-bold font-display tracking-tight text-white">Administration Console</h1>
            </div>
            <p className="text-xs text-zinc-500 mt-1">Review Console Store global analytics, user auditing, and key configuration panel.</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-750 text-red-400 rounded-xl transition-all uppercase tracking-wider border border-white/5 cursor-pointer"
            id="admin-logout-btn"
          >
            Revoke Credentials
          </button>
        </div>

        {error && (
          <div className="p-4 text-sm bg-red-950/20 border border-red-500/20 rounded-xl mb-6 text-red-400 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-4 text-sm bg-emerald-950/20 border border-emerald-500/20 rounded-xl mb-6 text-emerald-400 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        {/* Tab Selection Row */}
        <div className="flex flex-wrap gap-2 mb-8 bg-zinc-900/40 p-1.5 rounded-xl border border-white/5">
          {[
            { id: "stats", label: "Analytics Dashboard", icon: TrendingUp },
            { id: "users", label: "Search Users", icon: Users },
            { id: "orders", label: "Search Orders", icon: ShoppingCart },
            { id: "website", label: "Website Customizer", icon: Globe },
            { id: "config", label: "Core Config", icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setError(""); setSuccess(""); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-black font-extrabold shadow-lg shadow-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic viewport panel */}
        <div className="glass-panel p-6 rounded-2xl min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* VIEW: STATS & GRAPHS */}
            {activeTab === "stats" && (
              <motion.div
                key="stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Gross Revenue", value: `$${stats.revenue}.00`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-950/10" },
                    { label: "Purchased Licenses", value: stats.totalSales, icon: ShoppingCart, color: "text-white", bg: "bg-white/10" },
                    { label: "Registered Users", value: stats.activeUsers, icon: Users, color: "text-white", bg: "bg-white/10" },
                    { label: "Secure APK DLs", value: stats.totalDownloads, icon: Download, color: "text-amber-400", bg: "bg-amber-950/10" }
                  ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                      <div key={i} className="p-5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                            {card.label}
                          </span>
                          <span className="text-2xl font-bold font-mono tracking-tight text-white">{card.value}</span>
                        </div>
                        <div className={`p-3 rounded-xl ${card.bg} ${card.color} border border-white/5`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-6 font-display">
                    E-Commerce Transaction Velocity Log (USD)
                  </h3>
                  <div className="h-80 w-full font-mono text-xs text-zinc-400">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.salesHistory}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                        <XAxis dataKey="day" stroke="#52525b" />
                        <YAxis stroke="#52525b" />
                        <Tooltip contentStyle={{ backgroundColor: "#09090b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }} />
                        <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#ffffff" fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW: USERS MANAGEMENT & SEARCH */}
            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-lg font-bold font-display uppercase tracking-wider text-white">Registered Customer Ledger (Firestore)</h2>
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Search accounts name/email..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-zinc-950 text-white text-xs rounded-xl border border-white/5 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead className="bg-zinc-950 text-zinc-500 font-mono uppercase tracking-wider">
                      <tr>
                        <th className="p-3 border-b border-white/5">ID</th>
                        <th className="p-3 border-b border-white/5">Client Name</th>
                        <th className="p-3 border-b border-white/5">Email Address</th>
                        <th className="p-3 border-b border-white/5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(users.length === 0 ? [
                        { id: "usr_google_sample_1", name: "Abdullah Afridi", email: "abdullah.ai.afridi1111@gmail.com", isVerified: true },
                        { id: "usr_google_sample_2", name: "David Miller", email: "david.miller@gmail.com", isVerified: true }
                      ] : users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())))
                        .map((u) => (
                        <tr key={u.id} className="hover:bg-white/5">
                          <td className="p-3 font-mono text-zinc-400">#{u.id}</td>
                          <td className="p-3 text-zinc-200 font-semibold">{u.name}</td>
                          <td className="p-3 font-mono text-zinc-400">{u.email}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/50 text-emerald-400 border border-emerald-500/20">
                              VERIFIED
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* VIEW: ORDERS MANAGEMENT */}
            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-lg font-bold font-display uppercase tracking-wider text-white">Purchase Orders Logs</h2>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-zinc-950 text-zinc-500 font-mono uppercase tracking-wider">
                      <tr>
                        <th className="p-3 border-b border-white/5">ID</th>
                        <th className="p-3 border-b border-white/5">Customer</th>
                        <th className="p-3 border-b border-white/5">Items</th>
                        <th className="p-3 border-b border-white/5 font-mono">Amount</th>
                        <th className="p-3 border-b border-white/5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(orders.length === 0 ? [
                        { id: 1001, userName: "Abdullah Afridi", userEmail: "abdullah.ai.afridi1111@gmail.com", items: "Supreme Master", totalAmount: 1499, status: "completed" },
                        { id: 1002, userName: "David Miller", userEmail: "david.miller@gmail.com", items: "Ultimate Infinity", totalAmount: 1999, status: "completed" }
                      ] : orders).map((o) => (
                        <tr key={o.id} className="hover:bg-white/5">
                          <td className="p-3 font-mono text-zinc-400">#{o.id}</td>
                          <td className="p-3">
                            <span className="block font-semibold text-zinc-200">{o.userName}</span>
                            <span className="block text-[10px] font-mono text-zinc-500">{o.userEmail}</span>
                          </td>
                          <td className="p-3 text-zinc-300 font-medium">{o.items}</td>
                          <td className="p-3 font-mono text-white font-semibold">${o.totalAmount}.00</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/50 text-emerald-400 border border-emerald-500/20">
                              {o.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* VIEW: WEBSITE CUSTOMIZATION */}
            {activeTab === "website" && (
              <motion.div
                key="website"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto p-6 rounded-xl bg-zinc-950 border border-white/5 space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white">Website Customizer</h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure copy, videos, and payment URLs.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Hero Headline</label>
                    <input
                      type="text"
                      value={webSettings.hero_title}
                      onChange={(e) => setWebSettings(prev => ({ ...prev, hero_title: e.target.value }))}
                      className="w-full px-4 py-2 bg-zinc-900 text-white rounded-xl border border-white/10 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Hero Description</label>
                    <textarea
                      value={webSettings.hero_desc}
                      onChange={(e) => setWebSettings(prev => ({ ...prev, hero_desc: e.target.value }))}
                      className="w-full px-4 py-2 bg-zinc-900 text-white rounded-xl border border-white/10 text-xs h-24 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Demo Video URL</label>
                    <input
                      type="text"
                      value={webSettings.demo_video}
                      onChange={(e) => setWebSettings(prev => ({ ...prev, demo_video: e.target.value }))}
                      className="w-full px-4 py-2 bg-zinc-900 text-white rounded-xl border border-white/10 text-xs focus:outline-none font-mono"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setSuccess("Website settings updated successfully!");
                      setTimeout(() => setSuccess(""), 4000);
                    }}
                    className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-extrabold text-xs rounded-xl uppercase tracking-wider cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW: CONFIG */}
            {activeTab === "config" && (
              <motion.div
                key="config"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-xl mx-auto p-6 rounded-xl bg-zinc-950 border border-white/5 space-y-4"
              >
                <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white">Core System Config</h3>
                
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Company Name</label>
                  <input
                    type="text"
                    value={settings.company_name}
                    onChange={(e) => setSettings(prev => ({ ...prev, company_name: e.target.value }))}
                    className="w-full px-4 py-2 bg-zinc-900 text-white text-xs rounded-xl border border-white/10 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Support Email</label>
                  <input
                    type="email"
                    value={settings.support_email}
                    onChange={(e) => setSettings(prev => ({ ...prev, support_email: e.target.value }))}
                    className="w-full px-4 py-2 bg-zinc-900 text-white text-xs rounded-xl border border-white/10 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setSuccess("System configurations updated!");
                    setTimeout(() => setSuccess(""), 4000);
                  }}
                  className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-extrabold text-xs rounded-xl uppercase tracking-wider cursor-pointer"
                >
                  Save Configuration
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
