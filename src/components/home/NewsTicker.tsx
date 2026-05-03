'use client';

import { useLanguage } from "@/components/providers/LanguageProvider";

/**
 * Continuous news ticker for showing latest election announcements.
 * Supports bilingual content and smooth CSS animations.
 * 
 * @returns {JSX.Element} The rendered scrolling news ticker.
 */
export function NewsTicker() {
  const { language } = useLanguage();
  const announcements = language === 'en' ? [
    "West Bengal Assembly Election 2026 - Preparation in full swing",
    "Tamil Nadu 2026 Election - Voter list updation drive starts",
    "Kerala Assembly Elections 2026 - Schedule Not Announced",
    "Assam 2026 - Delimitation updates for new constituencies",
    "Puducherry 2026 - Security measures review completed",
    "Use Booth Finder to locate your nearest polling station",
  ] : [
    "पश्चिम बंगाल विधानसभा चुनाव 2026 - तैयारियां जोरों पर",
    "तमिलनाडु 2026 चुनाव - मतदाता सूची अद्यतन अभियान शुरू",
    "केरल विधानसभा चुनाव 2026 - कार्यक्रम की घोषणा नहीं की गई",
    "असम 2026 - नए निर्वाचन क्षेत्रों के लिए परिसीमन अपडेट",
    "पुडुचेरी 2026 - सुरक्षा उपायों की समीक्षा पूरी",
    "अपने नजदीकी मतदान केंद्र का पता लगाने के लिए बूथ फाइंडर का उपयोग करें",
  ];

  return (
    <div className="overflow-hidden border-y border-[var(--border-color)] bg-[var(--bg-glass)] py-3">
      <div className="animate-ticker whitespace-nowrap flex gap-16">
        {[...announcements, ...announcements].map((a, i) => (
          <span key={i} className="text-sm text-[var(--text-secondary)] font-medium inline-block">
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
