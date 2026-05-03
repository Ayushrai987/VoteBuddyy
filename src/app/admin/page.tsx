'use client';

import { useAuth } from "@/components/auth/AuthProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useState, useEffect } from "react";
import Link from "next/link";

// Mock Admin Whitelist (In production, this would be in .env)
const ADMIN_WHITELIST = ["admin@votebuddy.in", "umesh@example.com"]; 

export default function AdminPage() {
  const { user, signInWithGoogle, logout } = useAuth();
  const { t, language } = useLanguage();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (user?.email) {
      // Check against env or whitelist
      const envEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
      const isWhitelisted = ADMIN_WHITELIST.includes(user.email) || envEmails.includes(user.email);
      setIsAuthorized(isWhitelisted);
    } else {
      setIsAuthorized(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="glass-card p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-black text-[var(--text-primary)] mb-4">Admin Access Required</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Please sign in with an authorized Google account to access platform management tools.
          </p>
          <button 
            onClick={signInWithGoogle}
            className="btn-accent w-full py-4 rounded-xl text-lg shadow-xl shadow-saffron-500/20"
          >
            Sign in as Admin
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="glass-card p-8 text-center max-w-md w-full border-red-500/30">
          <h1 className="text-2xl font-black text-red-500 mb-4">Access Denied</h1>
          <p className="text-[var(--text-secondary)] mb-2">
            Your account <span className="font-bold text-[var(--text-primary)]">{user.email}</span> is not authorized.
          </p>
          <p className="text-xs text-[var(--text-muted)] mb-8">
            Please contact the system administrator to request access.
          </p>
          <button 
            onClick={logout}
            className="btn-ghost w-full py-3 rounded-xl"
          >
            Sign out & Try another account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-india-green/10 text-india-green text-[10px] font-bold uppercase tracking-widest border border-india-green/20">
              Verified Administrator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-1">
            Platform Management
          </h1>
          <p className="text-[var(--text-secondary)]">
            Welcome back, {user.displayName?.split(' ')[0] || 'Admin'}. Manage data and monitor systems.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[var(--text-primary)]">{user.email}</p>
            <p className="text-[10px] text-[var(--text-muted)]">Active Session</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.photoURL || ''} alt="Admin" className="w-10 h-10 rounded-full border-2 border-saffron-500 p-0.5" />
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Users", value: "12.4K", icon: "", trend: "+12%" },
          { label: "API Uptime", value: "99.98%", icon: "", trend: "Stable" },
          { label: "Chat Volume", value: "842", icon: "", trend: "+5%" },
          { label: "System Health", value: "Optimal", icon: "", trend: "Good" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-5 group hover:border-saffron-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">{stat.trend}</span>
            </div>
            <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-[var(--text-primary)]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Admin Tools */}
      <h2 className="text-xl font-black text-[var(--text-primary)] mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-saffron-500 rounded-full" />
        Management Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: "", title: "News Curation", desc: "Add, edit, or flag election news and fact-checks.", action: "Launch Tool" },
          { icon: "", title: "Announcements", desc: "Post global alerts to the home page ticker.", action: "Manage" },
          { icon: "", title: "Data Review", desc: "Validate constituency and candidate updates.", action: "Review" },
          { icon: "", title: "Analytics", desc: "View deep engagement metrics and heatmaps.", action: "Open Dashboard" },
          { icon: "", title: "Access Control", desc: "Manage admin whitelist and permissions.", action: "Configure" },
          { icon: "", title: "System Config", desc: "Update API keys and platform constants.", action: "Settings" },
        ].map((tool) => (
          <div key={tool.title} className="glass-card p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-color)] flex items-center justify-center text-2xl">
                {tool.icon}
              </div>
              <h3 className="font-bold text-[var(--text-primary)]">{tool.title}</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{tool.desc}</p>
            <button className="mt-auto w-full py-2.5 rounded-xl border border-saffron-500/20 text-saffron-500 text-xs font-bold hover:bg-saffron-500 hover:text-white transition-all">
              {tool.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
