'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Calendar, ShieldCheck, AlertTriangle, Filter } from 'lucide-react';
import { NewsItem } from '@/types';
import { useLanguage } from '@/components/providers/LanguageProvider';

// Mock News Data with Bilingual Support
const MOCK_NEWS: (NewsItem & { titleHi: string; summaryHi: string; sourceHi: string })[] = [
  {
    id: "n1",
    title: "ECI Announces Final Dates for Phase 7 Polling",
    titleHi: "ईसीआई ने सातवें चरण के मतदान के लिए अंतिम तिथियों की घोषणा की",
    summary: "The Election Commission of India has confirmed that the final phase of polling will take place on June 1st across 57 constituencies in 8 states and UTs.",
    summaryHi: "भारत निर्वाचन आयोग ने पुष्टि की है कि मतदान का अंतिम चरण 1 जून को 8 राज्यों और केंद्र शासित प्रदेशों के 57 निर्वाचन क्षेत्रों में होगा।",
    source: "Election Commission of India",
    sourceHi: "भारत निर्वाचन आयोग",
    url: "#",
    date: "2024-05-25",
    category: "Official",
    factCheck: "verified"
  },
  {
    id: "n2",
    title: "Voter Turnout Reaches 65.3% in Phase 6",
    titleHi: "छठे चरण में मतदाता मतदान 65.3% तक पहुंचा",
    summary: "Phase 6 of the Lok Sabha elections saw a moderate voter turnout, with West Bengal recording the highest at 78%. Delhi recorded 54%.",
    summaryHi: "लोकसभा चुनाव के छठे चरण में मध्यम मतदान देखा गया, जिसमें पश्चिम बंगाल में सबसे अधिक 78% दर्ज किया गया। दिल्ली में 54% दर्ज किया गया।",
    source: "PTI News",
    sourceHi: "पीटीआई न्यूज़",
    url: "#",
    date: "2024-05-26",
    category: "Updates",
    factCheck: "verified"
  },
  {
    id: "n3",
    title: "Fact Check: Viral Video of EVM Tampering is Fake",
    titleHi: "तथ्य जांच: ईवीएम छेड़छाड़ का वायरल वीडियो फर्जी है",
    summary: "A video circulating on social media claiming EVM tampering in Uttar Pradesh is from a mock poll conducted in 2019. ECI has filed an FIR.",
    summaryHi: "उत्तर प्रदेश में ईवीएम छेड़छाड़ का दावा करने वाला सोशल मीडिया पर प्रसारित एक वीडियो 2019 में आयोजित एक मॉक पोल का है। ईसीआई ने प्राथमिकी दर्ज की है।",
    source: "FactCheck Desk",
    sourceHi: "तथ्य जांच डेस्क",
    url: "#",
    date: "2024-05-24",
    category: "Fact Check",
    factCheck: "disputed",
    state: "Uttar Pradesh"
  },
  {
    id: "n4",
    title: "How to Download Digital Voter Slip via WhatsApp",
    titleHi: "WhatsApp के माध्यम से डिजिटल वोटर स्लिप कैसे डाउनलोड करें",
    summary: "Voters can now use the official ECI WhatsApp chatbot to download their digital voter slip and find booth locations.",
    summaryHi: "मतदाता अब अपनी डिजिटल वोटर स्लिप डाउनलोड करने और बूथ स्थानों को खोजने के लिए आधिकारिक ईसीआई व्हाट्सएप चैटबॉट का उपयोग कर सकते हैं।",
    source: "Voter Guide",
    sourceHi: "मतदाता मार्गदर्शिका",
    url: "#",
    date: "2024-05-20",
    category: "Guide",
    factCheck: "verified"
  },
  {
    id: "n5",
    title: "Special Arrangements Made for Elderly Voters in Punjab",
    titleHi: "पंजाब में बुजुर्ग मतदाताओं के लिए विशेष व्यवस्था की गई",
    summary: "Home voting facilities and special transport arrangements have been implemented for voters above 85 years of age in Punjab.",
    summaryHi: "पंजाब में 85 वर्ष से अधिक आयु के मतदाताओं के लिए होम वोटिंग की सुविधा और विशेष परिवहन व्यवस्था लागू की गई है।",
    source: "State Election Office",
    sourceHi: "राज्य चुनाव कार्यालय",
    url: "#",
    date: "2024-05-27",
    category: "Updates",
    state: "Punjab",
    factCheck: "verified"
  }
];

export default function NewsPage() {
  const [filter, setFilter] = useState("All");
  const { t, language } = useLanguage();

  const categories = ["All", "Official", "Updates", "Fact Check", "Guide"];

  const filteredNews = MOCK_NEWS.filter(news => filter === "All" || news.category === filter);

  const getCategoryLabel = (cat: string) => {
    const map: Record<string, string> = {
      "All": t('news.categories.all'),
      "Official": t('news.categories.official'),
      "Updates": t('news.categories.updates'),
      "Fact Check": t('news.categories.factCheck'),
      "Guide": t('news.categories.guide')
    };
    return map[cat] || cat;
  };

  return (
    <div className="page-enter mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {t('news.hubTitle')}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl">
            {t('news.hubSubtitle')}
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-[var(--text-muted)] mr-2 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filter === cat 
                  ? "bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-md"
                  : "bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredNews.map(item => (
          <article key={item.id} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 group hover:border-saffron-500/50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-primary)]">
                  {getCategoryLabel(item.category)}
                </span>
                
                {item.state && (
                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    {item.state}
                  </span>
                )}

                {item.factCheck === 'verified' && (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-green-600 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                    <ShieldCheck className="w-3 h-3" /> {t('news.verified')}
                  </span>
                )}
                
                {item.factCheck === 'disputed' && (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-red-600 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                    <AlertTriangle className="w-3 h-3" /> {t('news.fakeAlert')}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-saffron-500 transition-colors">
                {language === 'en' ? item.title : item.titleHi}
              </h2>
              
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed text-sm">
                {language === 'en' ? item.summary : item.summaryHi}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text-primary)]">{t('news.source')}: {language === 'en' ? item.source : item.sourceHi}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(item.date).toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                </div>
                
                <Link 
                  href={item.url}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-500 hover:text-saffron-600 transition-colors"
                >
                  {t('news.readFull')} <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {filteredNews.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl">
            <span className="text-4xl mb-4 block opacity-50"></span>
            <p className="text-[var(--text-secondary)]">{t('news.noNews')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
