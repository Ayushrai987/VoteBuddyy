# VoteBuddy - Comprehensive India Election Platform

VoteBuddy is a production-grade, non-partisan civic-tech platform designed to empower the Indian electorate with verified electoral information, AI-powered assistance, and intuitive data visualizations. Built using modern web technologies, the platform provides a centralized hub for voter services, state-wise election data, and real-time news updates.

## Project Vision

The primary mission of VoteBuddy is to bridge the information gap in the Indian democratic process. By aggregating data from the Election Commission of India (ECI) and other verified sources, the platform offers a transparent, accessible, and user-centric interface for citizens, candidates, and election administrators alike.

## Key Modules and Features

### 1. Bilingual UI and Localization
- Full support for English and Hindi.
- Context-aware translation system for complex electoral terminology.
- Dynamic layout adjustments to ensure readability across languages.

### 2. Interactive Election Hub
- Real-time and historical data for Lok Sabha and State Vidhan Sabha elections.
- Phase-wise breakdown of election schedules and constituency distributions.
- Status tracking for ongoing and upcoming electoral cycles.

### 3. State and Booth Explorer
- Detailed statistical profiles for all 28 States and 8 Union Territories.
- Constituency mapping with deep-dive analytics for sensitive divisions.
- Integrated Booth Finder utilizing Google Maps API for precise location services.
- Elector-to-Population ratio visualizations and voter demographic insights.

### 4. Advanced Results Dashboard
- Data-driven visualizations using Recharts.
- Seat tallies, vote share percentages, and swing analysis.
- Geographical winner maps and party-wise performance metrics.

### 5. Voter Services Suite
- Eligibility Checker: Dynamic logic to verify age requirements against ECI qualifying dates.
- Form Assistant: Detailed procedural guides for Form 6, 7, and 8.
- Digital Identity: Direct integration with e-EPIC and Voter Helpline services.
- Helpline Integration: One-click access to the 1950 national voter helpline.

### 6. ECI Guidelines and Rules Library
- Simplified interpretations of the Model Code of Conduct (MCC).
- Detailed breakdown of campaign restrictions, expenditure limits, and EVM/VVPAT protocols.
- "Plain English" explanations for complex legal notifications.

### 7. Fact-Check and News Hub
- Verified news feed with source citations.
- Dedicated fact-checking module to combat election misinformation.
- Official ECI announcement ticker for urgent alerts.

## Technical Architecture

VoteBuddy is built with a focus on performance, scalability, and security.

- **Frontend**: Next.js 14 (App Router) for optimized server-side rendering and routing.
- **Language**: TypeScript for robust type-safety and developer productivity.
- **Styling**: A hybrid design system using Vanilla CSS for core design tokens and Tailwind CSS for utility-first layouts.
- **Design Philosophy**: A "Dark-First" aesthetic with premium glassmorphism effects and India tricolor (Saffron, White, Green) motifs.
- **Visualization**: Recharts (SVG) for high-performance, responsive charts.
- **Deployment**: Optimized for Vercel, featuring Progressive Web App (PWA) capabilities.

## Environment Configuration

To run VoteBuddy locally or in production, the following environment variables are required:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | API key for Google Maps integration. |
| `ANTHROPIC_API_KEY` | API key for the Claude-powered AI Assistant. |
| `ADMIN_WHITELIST` | Comma-separated list of authorized administrator emails. |

## Development Workflow

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Commitment to Neutrality

VoteBuddy is strictly non-partisan and independent. The platform does not host political advertisements, endorse candidates, or collect sensitive personal data beyond what is required for local browser-side features. All information is sourced directly from official government publications and reputable news organizations.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
