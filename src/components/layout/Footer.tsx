import Link from "next/link";

const footerLinks = [
  { label: "Elections", href: "/elections" },
  { label: "States", href: "/states" },
  { label: "Booth Finder", href: "/booth-finder" },
  { label: "Voter Services", href: "/voter" },
  { label: "ECI Rules", href: "/eci-rules" },
  { label: "Results", href: "/results" },
  { label: "AI Assistant", href: "/ai-assistant" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-black italic text-saffron-500">VB</span>
              <div>
                <h3 className="text-lg font-extrabold gradient-text">VoteBuddy</h3>
                <p className="text-xs text-[var(--text-muted)]">India Election Platform</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Your comprehensive guide to Indian elections. Information sourced from 
              Election Commission of India (ECI) official guidelines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-saffron-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              Official Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] hover:text-saffron-500 transition-colors flex items-center gap-1">
                  ECI Official Website
                </a>
              </li>
              <li>
                <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] hover:text-saffron-500 transition-colors flex items-center gap-1">
                  NVSP Portal
                </a>
              </li>
              <li>
                <a href="https://results.eci.gov.in" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] hover:text-saffron-500 transition-colors flex items-center gap-1">
                  ECI Results
                </a>
              </li>
              <li>
                <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  Voter Helpline: <strong className="text-saffron-500">1950</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] text-center sm:text-left">
            © {new Date().getFullYear()} VoteBuddy. Not affiliated with ECI. For informational purposes only. 
            Always verify with official sources.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Made for Indian Democracy
          </p>
        </div>
      </div>
    </footer>
  );
}
