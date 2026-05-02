'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User as UserIcon, LogOut, MapPin, Bookmark, Bell, Shield, Loader2, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { ElectionPhase } from '@/types';

// Mock upcoming election for dashboard
const UPCOMING_ELECTION = {
  state: "Maharashtra",
  type: "Vidhan Sabha",
  date: "Oct 2024 (Expected)",
  daysLeft: 120
};

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'settings'>('overview');

  useEffect(() => {
    // Redirect if not logged in and not loading
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-saffron-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="glass-card p-6 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-saffron-500 to-india-green opacity-20"></div>
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-[var(--bg-card)] mb-3 z-10 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">{user.displayName}</h2>
            <p className="text-sm text-[var(--text-muted)] truncate mb-4">{user.email}</p>
            
            <div className="flex items-center justify-center gap-1 text-xs font-medium text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full w-max mx-auto border border-green-500/20">
              <Shield className="w-3 h-3" /> Verified Citizen
            </div>
          </div>

          <nav className="glass-card p-2 rounded-2xl flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-gradient-to-r from-saffron-500/15 to-saffron-400/10 text-saffron-500 border border-saffron-500/20' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-glass)]'
              }`}
            >
              <UserIcon className="w-4 h-4" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'saved' 
                  ? 'bg-gradient-to-r from-saffron-500/15 to-saffron-400/10 text-saffron-500 border border-saffron-500/20' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-glass)]'
              }`}
            >
              <Bookmark className="w-4 h-4" /> Saved Items
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'settings' 
                  ? 'bg-gradient-to-r from-saffron-500/15 to-saffron-400/10 text-saffron-500 border border-saffron-500/20' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-glass)]'
              }`}
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
            <div className="my-2 border-t border-[var(--border-color)]"></div>
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'saved' && 'Saved Candidates & Booths'}
            {activeTab === 'settings' && 'Account Settings'}
          </h1>

          {activeTab === 'overview' && (
            <>
              {/* Election Alert */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-saffron-500 to-saffron-600 p-6 text-white shadow-lg">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Bell className="w-24 h-24" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-3">
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                      Upcoming Election
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{UPCOMING_ELECTION.state} {UPCOMING_ELECTION.type}</h3>
                    <p className="text-white/80">Expected: {UPCOMING_ELECTION.date}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center min-w-[120px] border border-white/20">
                    <div className="text-3xl font-extrabold mb-1">{UPCOMING_ELECTION.daysLeft}</div>
                    <div className="text-xs text-white/80 uppercase tracking-wider">Days Left</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/booth-finder" className="glass-card p-5 rounded-2xl hover:border-saffron-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">Find Booth</h3>
                  <p className="text-xs text-[var(--text-muted)]">Locate your polling station on the map.</p>
                </Link>
                
                <Link href="/ai-assistant" className="glass-card p-5 rounded-2xl hover:border-saffron-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">Ask VoteBuddy</h3>
                  <p className="text-xs text-[var(--text-muted)]">Get answers to election queries instantly.</p>
                </Link>

                <Link href="/voter" className="glass-card p-5 rounded-2xl hover:border-saffron-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">Voter Services</h3>
                  <p className="text-xs text-[var(--text-muted)]">Apply for new voter ID or corrections.</p>
                </Link>
              </div>

              {/* Status Section */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Your Profile Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-saffron-500/10 text-saffron-500 flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--text-primary)]">Home State</div>
                        <div className="text-xs text-[var(--text-muted)]">Not set</div>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-saffron-500 hover:underline">Update</button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <Bookmark className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--text-primary)]">Saved Booth</div>
                        <div className="text-xs text-[var(--text-muted)]">None saved yet</div>
                      </div>
                    </div>
                    <Link href="/booth-finder" className="text-xs font-medium text-blue-500 hover:underline">Find Now</Link>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'saved' && (
             <div className="glass-card p-8 rounded-2xl text-center">
               <Bookmark className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-50" />
               <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No Saved Items</h3>
               <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-6">
                 You haven&apos;t bookmarked any candidates, constituencies, or ECI rules yet.
               </p>
               <Link href="/candidates" className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-saffron-500/25 transition-all">
                 Explore Candidates
               </Link>
             </div>
          )}

          {activeTab === 'settings' && (
             <div className="glass-card p-6 rounded-2xl">
               <div className="space-y-6 max-w-md">
                 <div>
                   <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Display Name</label>
                   <input type="text" disabled value={user.displayName || ''} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] opacity-70" />
                   <p className="text-[10px] text-[var(--text-muted)] mt-1">Managed by Google Auth</p>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email Address</label>
                   <input type="email" disabled value={user.email || ''} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] opacity-70" />
                 </div>
                 
                 <div className="pt-4 border-t border-[var(--border-color)]">
                   <button className="text-sm font-medium text-red-500 hover:underline">Delete Account Data</button>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
