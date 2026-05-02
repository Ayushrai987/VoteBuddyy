# 🗳️ VoteBuddy

VoteBuddy is a comprehensive, non-partisan civic-tech platform designed to empower Indian voters with verified electoral information, AI-powered assistance, and intuitive data visualizations.

## ✨ Features

- **🗳️ Live Election Hub**: Real-time updates and historical results.
- **🇮🇳 Bilingual Interface**: Full support for English and Hindi (Toggle at top).
- **📈 Advanced Analytics**: Visualizations using Recharts for seat tallies and vote shares.
- **🔍 State & Booth Finder**: Explore constituencies and locate polling booths via Google Maps.
- **📝 Voter Services**: Eligibility checker, Form 6/7/8 guides, and e-EPIC downloads.
- **🛡️ News Fact-Check**: Verified election news and fake-news alerts.
- **📱 PWA Ready**: Installable on mobile devices with offline support.
- **🔒 Secure & Private**: Client-side processing and non-partisan communication.

## 🚀 Deployment

The easiest way to deploy VoteBuddy is using the [Vercel Platform](https://vercel.com/new).

### 1. Configure Environment Variables
Ensure you add the following variables in your Vercel Dashboard:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: For Booth Finder.
- `ANTHROPIC_API_KEY`: For AI Assistant.
- `NEXT_PUBLIC_FIREBASE_*`: For database/auth (optional).

### 2. Push to GitHub
```bash
git add .
git commit -m "feat: complete bilingual support and production ready"
git push origin main
```

### 3. Deploy
Vercel will automatically detect the Next.js project and deploy it.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS + Tailwind
- **Charts**: Recharts
- **Icons**: Lucide React
- **Maps**: Google Maps JS API

## 📝 License

This project is licensed under the MIT License.
