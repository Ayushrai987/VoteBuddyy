'use client';

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

/**
 * Animated countdown timer for upcoming election dates.
 * 
 * @param {string} targetDate - ISO date string of the target event.
 * @returns {JSX.Element} The rendered countdown timer.
 */
export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { language } = useLanguage();

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: language === 'en' ? "Days" : "दिन", value: timeLeft.days },
    { label: language === 'en' ? "Hours" : "घंटे", value: timeLeft.hours },
    { label: language === 'en' ? "Mins" : "मिनट", value: timeLeft.minutes },
    { label: language === 'en' ? "Secs" : "सेकंड", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-extrabold gradient-text tabular-nums min-w-[2.5rem]">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="text-[0.6rem] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
              {u.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="text-saffron-500 text-xl font-bold opacity-50">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
