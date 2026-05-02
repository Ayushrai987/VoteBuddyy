"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageProvider";

const mobileLinks = [
  { href: "/", key: "home", icon: "" },
  { href: "/booth-finder", key: "boothFinder", icon: "" },
  { href: "/ai-assistant", key: "aiChat", icon: "" },
  { href: "/dashboard", key: "dashboard", icon: "" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="mobile-nav fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-xl safe-area-bottom md:hidden">
      <div className="flex items-center justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom))]">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px] ${
                isActive
                  ? "text-saffron-500"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="text-xl leading-none">{link.icon}</span>
              <span className={`text-[0.6rem] font-semibold ${isActive ? "text-saffron-500" : ""}`}>
                {t(`nav.${link.key}`)}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-6 h-0.5 rounded-full bg-saffron-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
