"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

const navLinks = [
  { href: "/", key: "home", icon: "" },
  { href: "/elections", key: "elections", icon: "" },
  { href: "/states", key: "states", icon: "" },
  { href: "/booth-finder", key: "boothFinder", icon: "" },
  { href: "/voter", key: "voterServices", icon: "" },
  { href: "/eci-rules", key: "eciRules", icon: "" },
  { href: "/results", key: "results", icon: "" },
  { href: "/ai-assistant", key: "aiChat", icon: "" },
];

/**
 * Primary navigation header component.
 * Provides access to all main platform modules and user session management.
 * Optimized for accessibility with semantic HTML and ARIA landmarks.
 * 
 * @returns {React.ReactElement} The rendered navigation header.
 */
export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, signInWithGoogle, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <header role="banner" className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-xl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-saffron-500 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full animate-spin-slow">
                <circle cx="20" cy="20" r="18" stroke="url(#brandGrad)" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="4" fill="url(#brandGrad)" />
                <path d="M20 6L20 14" stroke="url(#brandGrad)" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 26L20 34" stroke="url(#brandGrad)" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 20L14 20" stroke="url(#brandGrad)" strokeWidth="2" strokeLinecap="round" />
                <path d="M26 20L34 20" stroke="url(#brandGrad)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="brandGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#138808" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold gradient-text leading-tight">
                VoteBuddy
              </h1>
              <span className="text-[0.65rem] text-[var(--text-muted)] font-medium hidden sm:block">
                {language === 'en' ? 'India Election Platform | चुनाव मंच' : 'भारत चुनाव मंच | India Election Platform'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-saffron-500 to-saffron-400 text-white shadow-lg shadow-saffron-500/25"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 h-9 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all gap-1"
              aria-label="Toggle language"
              data-testid="lang-toggle"
            >
              <span className={language === 'hi' ? 'text-saffron-500' : ''}>HI</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className={language === 'en' ? 'text-saffron-500' : ''}>EN</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Login Button */}
            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/dashboard" className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border-color)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" className="w-full h-full object-cover" />
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                >
                  {t('common.logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {t('common.signIn')}
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-xl animate-slide-down">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-saffron-500/15 to-saffron-400/10 text-saffron-500 border border-saffron-500/20"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {t(`nav.${link.key}`)}
                </Link>
              );
            })}
            
            <div className="pt-4 mt-2 border-t border-[var(--border-color)]">
              {user ? (
                <div className="flex items-center justify-between px-4 py-2">
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border-color)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{user.displayName}</span>
                      <span className="text-xs text-[var(--text-muted)]">{t('nav.dashboard')}</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signInWithGoogle();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-primary)] transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {t('common.signIn')}
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
