import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, ShieldAlert, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db, handleFirestoreError, OperationType } from "../firebase";
import { ClientUser } from "../types";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: ClientUser, token: string) => void;
  onAdminAuthSuccess: (admin: { id: number; name: string; email: string }, token: string) => void;
  initialTab?: "login" | "register" | "verify" | "forgot" | "reset" | "admin";
}

type AuthTab = "login" | "register" | "verify" | "forgot" | "reset" | "admin";

export default function LoginModal({ isOpen, onClose, onAuthSuccess, onAdminAuthSuccess, initialTab = "register" }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  // Google Sign-In with Firebase Auth
  const handleGoogleSignIn = async () => {
    setError("");
    setInfo("");
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      
      const clientUser: ClientUser = {
        uid: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split("@")[0] || "Authenticated User",
        email: fbUser.email || "",
        isVerified: fbUser.emailVerified || true,
        photoURL: fbUser.photoURL || undefined,
        createdAt: new Date().toISOString()
      };

      // Persist user record in Firestore
      try {
        const userRef = doc(db, "users", fbUser.uid);
        const existingSnap = await getDoc(userRef);
        if (!existingSnap.exists()) {
          await setDoc(userRef, {
            uid: fbUser.uid,
            name: clientUser.name,
            email: clientUser.email,
            isVerified: true,
            createdAt: new Date().toISOString()
          });
        }
      } catch (fsErr) {
        console.warn("Firestore user sync warning:", fsErr);
      }

      const idToken = await fbUser.getIdToken();
      onAuthSuccess(clientUser, idToken);
      onClose();
    } catch (err: any) {
      console.error("Google Auth error:", err);
      setError(err.message || "Google Sign-In failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith("@gmail.com")) {
      setError("Only Gmail addresses (@gmail.com) are allowed to sign up.");
      return;
    }

    setIsLoading(true);

    try {
      const dummyUid = "user_" + Math.random().toString(36).substring(2, 10);
      const clientUser: ClientUser = {
        uid: dummyUid,
        name: name.trim() || cleanEmail.split("@")[0],
        email: cleanEmail,
        isVerified: true,
        createdAt: new Date().toISOString()
      };

      // Save user to Firestore
      try {
        await setDoc(doc(db, "users", dummyUid), {
          uid: dummyUid,
          name: clientUser.name,
          email: clientUser.email,
          isVerified: true,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn("Firestore save warning:", err);
      }

      onAuthSuccess(clientUser, "mock_token_" + dummyUid);
      onClose();
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (activeTab === "admin") {
      // Check admin key
      if (password === "admin123" || password === "reviewconsole_admin") {
        onAdminAuthSuccess({ id: 1, name: "System Admin", email: "admin@reviewconsole.com" }, "admin_jwt_secret_token");
        onClose();
        return;
      } else {
        setError("Invalid admin access key. Default key is 'admin123'.");
        return;
      }
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith("@gmail.com")) {
      setError("Only Gmail addresses (@gmail.com) are allowed to sign in.");
      return;
    }

    setIsLoading(true);

    try {
      const dummyUid = "user_" + cleanEmail.replace(/[^a-zA-Z0-9]/g, "_");
      const clientUser: ClientUser = {
        uid: dummyUid,
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
        isVerified: true,
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, "users", dummyUid), {
          uid: dummyUid,
          name: clientUser.name,
          email: clientUser.email,
          isVerified: true,
          createdAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn("Firestore sync:", err);
      }

      onAuthSuccess(clientUser, "token_" + dummyUid);
      onClose();
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-start sm:items-center p-4 bg-black/90">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-md my-auto p-6 overflow-hidden rounded-2xl glass-panel border border-white/10 shadow-2xl"
        id="auth-modal-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white font-display uppercase tracking-wide">
            {activeTab === "register" && "Create Account"}
            {activeTab === "login" && "Sign In"}
            {activeTab === "admin" && "System Admin Login"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            id="auth-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Action: Google Sign-in with Firebase Auth */}
        {activeTab !== "admin" && (
          <div className="mb-6 space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-extrabold text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-md cursor-pointer disabled:opacity-60"
              id="google-signin-btn"
            >
              {isGoogleLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin text-black" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              )}
              <span>Continue with Google Account</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                Or with Gmail address
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        {(activeTab === "login" || activeTab === "register") && (
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5 mb-6">
            <button
              onClick={() => { setActiveTab("register"); setError(""); setInfo(""); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "register" ? "bg-white text-black font-extrabold shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setActiveTab("login"); setError(""); setInfo(""); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "login" ? "bg-white text-black font-extrabold shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-950/40 border border-red-500/20 rounded-xl mb-4">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {info && (
          <div className="p-3 text-sm text-zinc-200 bg-zinc-900 border border-white/10 rounded-xl mb-4">
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Notification</span>
            </div>
            <p className="text-xs text-zinc-300">{info}</p>
          </div>
        )}

        {/* Auth Forms */}
        <AnimatePresence mode="wait">
          {activeTab === "register" && (
            <motion.form
              key="register"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleRegister}
              className="space-y-4"
              id="auth-register-form"
            >
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 text-white rounded-xl border border-white/5 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Email Address (@gmail.com)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 text-white rounded-xl border border-white/5 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 font-sans text-sm"
                  />
                </div>
              </div>

              <p className="text-[11px] text-zinc-500">
                ⚡ Simple & Fast: Only @gmail.com email addresses are supported.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
                id="register-submit-btn"
              >
                {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Create Instant Account"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </motion.form>
          )}

          {(activeTab === "login" || activeTab === "admin") && (
            <motion.form
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleLogin}
              className="space-y-4"
              id="auth-login-form"
            >
              {activeTab === "login" && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Email Address (@gmail.com)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 text-white rounded-xl border border-white/5 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 font-sans text-sm"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1.5">
                    Enter your @gmail.com address to sign in.
                  </p>
                </div>
              )}

              {activeTab === "admin" && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Admin Access Key
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin access key (default: admin123)..."
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 text-white rounded-xl border border-white/5 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 font-sans text-sm"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 mt-2 rounded-xl text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer ${
                  activeTab === "admin" ? "bg-red-700 hover:bg-red-600 text-white font-bold" : "bg-white hover:bg-zinc-200 text-black font-extrabold"
                }`}
                id="login-submit-btn"
              >
                {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : activeTab === "admin" ? "Unlock Admin Panel" : "Sign In"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>

              {activeTab === "admin" && (
                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => { setActiveTab("register"); setError(""); setInfo(""); }}
                    className="text-[11px] font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    ← Switch to Store Sign Up
                  </button>
                </div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
