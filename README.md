# 🌱 FreshFind — Fresh All Along
> **A Next-Generation Digital Platform Connecting Conscious Urban Consumers with Local Farmers' Markets, Seasonal Produce, and Sustainable Agricultural Communities.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-techwiz2026.vercel.app-emerald?style=for-the-badge&logo=vercel)](https://techwiz2026.vercel.app)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-purple?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-teal?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Competition](https://img.shields.io/badge/TechWiz_7-eGreen_Basket-orange?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/Deployment-Production_Ready-brightgreen?style=for-the-badge)]()

---

## 📋 Table of Contents
1. [Executive Summary & Background](#-1-executive-summary--background)
2. [Problem Statement & Proposed Solution](#-2-problem-statement--proposed-solution)
3. [System Architecture & Constraints](#-3-system-architecture--constraints)
4. [Technology Stack & Specifications](#-4-technology-stack--specifications)
5. [Comprehensive Feature Breakdown (SRS Mapped)](#-5-comprehensive-feature-breakdown-srs-mapped)
   - [5.1 Home & Landing Page (`/`)](#51-home--landing-page-)
   - [5.2 Farmers' Market Directory (`/markets`)](#52-farmers-market-directory-markets)
   - [5.3 Dedicated Market Detail View (`/markets/:id`)](#53-dedicated-market-detail-view-marketsid)
   - [5.4 Produce Guide & Harvest Matrix (`/produce`)](#54-produce-guide--harvest-matrix-produce)
   - [5.5 Seasonal Recommendations & Farm Recipes (`/seasonal`)](#55-seasonal-recommendations--farm-recipes-seasonal)
   - [5.6 Rule-Based AI Assistant — FarmBot AI](#56-rule-based-ai-assistant--farmbot-ai)
   - [5.7 Content Bookmarking & Shopping Notebook System](#57-content-bookmarking--shopping-notebook-system)
   - [5.8 About Us & Eco-Impact Dashboard (`/about`)](#58-about-us--eco-impact-dashboard-about)
   - [5.9 Contact Us & GPS Proximity Finder (`/contact`)](#59-contact-us--gps-proximity-finder-contact)
   - [5.10 Platform-Wide Global Features](#510-platform-wide-global-features)
6. [Innovation & Competitive Edge](#-6-innovation--competitive-edge)
7. [Non-Functional Requirements & Design Standards](#-7-non-functional-requirements--design-standards)
8. [Project Structure & Directory Layout](#-8-project-structure--directory-layout)
9. [Installation & Local Development](#-9-installation--local-development)
10. [Competition & Team Acknowledgements](#-10-competition--team-acknowledgements)

---

## 🌿 1. Executive Summary & Background

In contemporary metropolitan life, a deep disconnect has widened between urban consumers and local agricultural producers. While consumers increasingly demand clean, fresh, chemical-free, and ethically grown organic food, they face severe friction finding it:
* **Fragmented Operating Information:** Local farmers' markets operate on varied, irregular schedules (e.g., weekend mornings, bi-weekly pop-ups) with schedules scattered across unmaintained social media pages.
* **Loss of Seasonal Awareness:** Supermarket supply chains import off-season produce thousands of kilometers, concealing natural harvest windows and imposing massive environmental costs (**food miles** and greenhouse gas emissions).
* **Middleman Exploitation:** Smallholder farms and agricultural cooperatives (such as VietGAP/GlobalGAP cooperatives in Moc Chau, Ba Vi, and Da Lat) capture only a minor fraction of retail food revenue due to excessive wholesale intermediaries.

**FreshFind ("Fresh All Along")** is conceived and built as a comprehensive digital ecosystem to bridge this gap. Designed under the **"eGreen Basket"** theme for the **TechWiz 7 (Web Innovation Unleashed)** competition, FreshFind empowers conscious urban citizens to discover local markets, explore seasonal harvest cycles, compare venues, compute their carbon savings, and plan farm-to-table shopping with zero friction.

🔗 **Live Production URL:** [https://techwiz2026.vercel.app](https://techwiz2026.vercel.app)  
📦 **Source Repository:** [https://github.com/kamiyami05/TechWiz2026](https://github.com/kamiyami05/TechWiz2026)

---

## 🎯 2. Problem Statement & Proposed Solution

| Challenge in Status Quo | FreshFind Innovation & Solution |
| :--- | :--- |
| **Scattered & Outdated Market Schedules** | Centralized, verified directory of local farmers' markets with a down-to-the-second **Real-Time Digital Clock** indicating live `OPEN RIGHT NOW` status. |
| **Ignorance of Natural Seasonal Cycles** | Interactive **4-Season Exploration** and an industry-first **12-Month Annual Harvest Heatmap** displaying peak harvest periods for all produce items. |
| **High Food Miles & Hidden Carbon Footprint** | Built-in **Eco Food-Miles Engine** calculating transit kilometers saved and kg of CO₂e emissions offset compared to conventional supermarket imports. |
| **Cumbersome Market Evaluation** | **Side-by-Side Market Comparison Modal** allowing shoppers to compare two markets on hours, distance, amenities, VietGAP certification, and user ratings. |
| **Friction in Meal & Shopping Planning** | Curated **Farm-to-Kitchen Recipes** featuring a 1-click **"Add Ingredients to Shopping Notebook"** button and downloadable `.TXT` exportable lists. |
| **Expensive Backend API Dependency** | **100% Client-Side Single Page Application (SPA)** with zero server dependencies, powered by structured JSON databases and an offline-capable **Rule-Based AI Chatbot**. |

---

## 🏗️ 3. System Architecture & Constraints

FreshFind is engineered strictly in compliance with the **TechWiz 7 Web Innovation Unleashed Software Requirements Specification (SRS)**:

```
+-----------------------------------------------------------------------------------+
|                                  USER BROWSER                                     |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                    React 18 Single Page Application (SPA)                   |  |
|  |                                                                             |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  |  |  React Router DOM   |  |   Tailwind CSS UI    |  |  React Context API |  |  |
|  |  |  (Dynamic Routing)  |  | (eGreen Basket Theme)|  | (Auth, Bookmarks)  |  |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  +-----------------------------------------------------------------------------+  |
|                                         |                                         |
|         +-------------------------------+-------------------------------+         |
|         |                               |                               |         |
|  +--------------+              +-----------------+             +----------------+ |
|  |  Data Layer  |              | Web Storage API |             | Native Web APIs| |
|  | (Local JSON) |              | (Dual-Tier)     |             | (Client-Side)  | |
|  |              |              |                 |             |                | |
|  | markets.json |              | localStorage:   |             | Web Speech API | |
|  | produce.json |              | - Bookmarks     |             | Geolocation API| |
|  | recipes.json |              | - Visitor Count |             | Web Share API  | |
|  | chatbot-kb   |              | - User Reviews  |             | Clipboard API  | |
|  |              |              | sessionStorage: |             | Google Maps    | |
|  |              |              | - Shopping Notes|             | Embed Iframe   | |
|  +--------------+              +-----------------+             +----------------+ |
+-----------------------------------------------------------------------------------+
```

### Architectural Guarantees:
1. **Pure Client-Side Execution:** Zero dependency on backend server runtimes (Node.js/Express, Python/Django, etc.) or cloud databases. The entire platform runs natively within modern web browsers.
2. **Deterministic Data Layer:** Pre-populated, schema-validated JSON data structures (`markets.json`, `produce.json`, `recipes.json`, `chatbot-kb.json`) loaded statically via ES modules.
3. **Dual-Tier Web Storage:**
   * **Persistent Storage (`localStorage`):** Retains saved favorite markets, bookmarked produce, user review submissions, theme preferences (light/dark), and the simulated visitor counter across browser restarts.
   * **Ephemeral Privacy Storage (`sessionStorage`):** Houses personal shopping scratchpad notes, automatically wiping when the user closes their browser tab for maximum privacy.
4. **Native Browser API Integration:**
   * **Web Speech API (`speechSynthesis`):** Provides a voice-narrated morning harvest audio briefing.
   * **HTML5 Geolocation API:** Acquires GPS coordinates and computes real-time distances to all markets using the spherical Haversine formula.
   * **Web Share API & Navigator Clipboard API:** One-tap list sharing and URL link copying.

---

## 💻 4. Technology Stack & Specifications

### 4.1 Software & Framework Specifications

| Category | Technology | Version | Purpose & Rationale |
| :--- | :--- | :--- | :--- |
| **Core Framework** | **React** | `^18.3.1` | Declarative component architecture, functional hooks (`useState`, `useEffect`, `useMemo`, `useCallback`), React Context for global state. |
| **DOM Renderer** | **React DOM** | `^18.3.1` | Efficient virtual DOM reconciliation and high-frequency DOM updates. |
| **Application Routing** | **React Router DOM** | `^7.18.4` | Client-side routing, URL query parameter state synchronization, nested routes, and 404 recovery handling. |
| **Build & Bundling** | **Vite** | `^5.4.11` | Instant Lightning-fast Hot Module Replacement (HMR), optimized Rollup chunking, and modern ES module delivery. |
| **Styling Engine** | **Tailwind CSS** | `^3.4.14` | Utility-first, zero-runtime CSS stylesheet with an organic color palette (`emerald`, `green`, `teal`, `stone`). |
| **Iconography** | **Lucide React** | `^0.460.0` | Accessible, ultra-crisp SVG icon set optimized for modern web standards. |
| **Micro-Interactions** | **Canvas Confetti** | `^1.9.3` | Lightweight celebration particle effect triggered upon recipe ingredient bookmarking. |
| **Typography** | **Plus Jakarta Sans** | Modern Web Font | Geometric, humanistic sans-serif typeface designed for optimal readability across mobile and desktop. |
| **Cloud Hosting** | **Vercel Edge Network** | Latest | Global edge CDN, atomic deployments, automatic HTTPS, and SPA route rewrite optimization (`vercel.json`). |

### 4.2 Hardware & System Requirements (SRS Section 1.8)

* **Operating System:** Windows 10/11, macOS 12+, or modern Linux distribution (Ubuntu 22.04+).
* **Runtime Environment:** Node.js `>= 18.x` (LTS recommended), npm `>= 9.x`.
* **Hardware Requirements:** Minimum 4 GB RAM (8 GB recommended), Dual-Core 1.5 GHz CPU, 500 MB free disk space.
* **Target Browsers:** Google Chrome `>= 110`, Mozilla Firefox `>= 110`, Microsoft Edge `>= 110`, Apple Safari `>= 16`. Fully tested for touch devices, tablets, and desktop displays.

---

## 🚀 5. Comprehensive Feature Breakdown (SRS Mapped)

---

### 5.1 Home & Landing Page (`/`)

The platform's welcoming storefront designed to captivate first-time visitors and route them to relevant markets and seasonal goods within seconds.

* **Grand Hero Banner & Audio Morning Briefing:**
  * High-resolution, responsive hero photography with clear text contrast (`text-white`, `drop-shadow-md`) over an organic marketplace background.
  * Slogan: *"Fresh All Along — Taste the Season, Support Your Community"*.
  * **Audio Briefing Feature (Web Speech API):** Accessible button that reads aloud today's market highlights, open hours, and seasonal produce arrivals. Gracefully shows a toast notification if the device's voice engine is busy or unsupported.
* **Prominent Quick Find Search & Filter Prompt:**
  * Immediate 3-dimension search form:
    1. **District / Area** (e.g., Cau Giay, Tay Ho, Dong Da, Ha Dong, etc.)
    2. **Day of the Week** (Monday through Sunday, or Everyday)
    3. **Produce Category** (Vegetables, Fruits, Herbs, Dairy & Eggs)
  * Seamlessly passes form values as URL search parameters (`/markets?area=...&day=...&produce=...`) for instant filtered directory results.
* **Real-Time Digital Clock & "OPEN RIGHT NOW" Engine:**
  * Embedded digital clock updating every second, synchronized with the user's browser device time.
  * Real-time calculation engine that parses market opening hours and operating days to dynamically tag markets as `OPEN NOW` or `CLOSED TODAY`.
* **Simulated Persistent Visitor Counter:**
  * Stored in `localStorage` to increment dynamically per visitor session, simulating a thriving community hub.
* **Highlights Showcase:**
  * **Top-Rated Markets:** Curated cards displaying the highest-rated farmer collectives with direct links to full market profiles.
  * **Weekly Seasonal Picks:** Badged crop spotlights (e.g., Moc Chau Strawberries, Dak Lak Avocados, Ba Vi Raw Milk).
* **Value Pillars & Stallholder Partnership Call-to-Action:**
  * 3 core community commitments: *100% Local Sourcing*, *Fair Farmer Compensation*, and *Zero Food Waste*.
  * Dedicated callout inviting local agricultural cooperatives and smallholder family farmers to apply for stalls.
* **Floating AI Chatbot Launcher:**
  * Persistent, unobtrusive chat bubble positioned at the bottom-right of every viewport.

---

### 5.2 Farmers' Market Directory (`/markets`)

A comprehensive, searchable directory cataloging regional farmers' markets.

* **Multi-Criteria Filter Bar:**
  * **Keyword Search:** Real-time search across market names, addresses, and specialties.
  * **District Filter:** Dropdown of urban and suburban districts.
  * **Day of Week Filter:** Monday through Sunday, plus "All Days" or "Everyday Markets".
  * **Produce Category Filter:** Filter by specific agricultural offerings.
* **Multi-Sorting Capabilities:**
  * Alphabetical sorting (A – Z).
  * Customer Rating (Highest to Lowest).
  * **Open Right Now Priority:** Intelligently sorts currently open markets to the very top of the list based on real-time clock evaluation.
* **Rich Market Cards:**
  * High-definition imagery, verified district tag, full address, live open/closed status badge, operating hours, phone hotline, and distance (km).
  * **Eco Food-Miles Badge:** Displays transit kilometers saved and estimated carbon offset per basket.
  * 1-Click "View Details" navigation.
  * Interactive **"Compare"** selection checkbox.
* **Side-by-Side Market Comparison Floating Bar & Modal:**
  * Select any 2 markets to launch an in-depth comparison modal.
  * Compares operating days, opening hours, exact distance, VietGAP / Organic certifications, amenities (Parking, Pet friendly, Wheelchair access), and rating.
  * Clean user-driven selector interface allowing users to choose or swap markets freely with helpful empty states.

---

### 5.3 Dedicated Market Detail View (`/markets/:id`)

A dynamic, in-depth profile page for every participating farmers' market, driven by URL route parameters (`useParams`).

* **Header & Status Banner:**
  * Large cover banner, high-contrast badges, dynamic `OPEN RIGHT NOW` / `CLOSED` indicator, aggregate star rating, and direct phone dialer (`tel:`).
  * 1-Click **"Get Directions"** link that launches Google Maps with destination coordinates pre-loaded.
* **Eco-Impact & Food Miles Metric Card:**
  * Quantified sustainability metric showing exact transit distances and kg of CO₂e saved compared to standard multi-tier distribution logistics.
* **Weekly Schedule & Operating Hours Table:**
  * Comprehensive 7-day schedule indicating standard trading hours, special morning sessions, and weekend artisan fairs.
  * Mobile-responsive table with smooth horizontal scroll on small viewports.
* **Stallholders & Cooperatives Directory:**
  * Complete breakdown of individual stalls, cooperative names, agricultural certifications (VietGAP, GlobalGAP, Organic USDA), and signature farm goods.
* **Interactive Google Maps Embed:**
  * Embedded responsive Google Maps iframe pinpointing the precise venue location.
* **Verified Shopper Review & Rating System:**
  * Aggregated star rating breakdown with average score and review counts.
  * **Star Rating Filter:** Filter reviews by star level (All, 5 Stars, 4 Stars, etc.).
  * **Pagination:** Clean 3-reviews-per-page pagination with previous/next controls.
  * **Interactive Submission Form:** Star rating selection (1–5 stars) and review text area. Automatically verifies simulated authentication state.
  * **Helpful Voting System:** Toggleable "Helpful" like counter on each review stored in `localStorage`.
  * **Formatted Timestamps:** Clean date display (`Sep 25, 2026`).
* **Friendly 404 Recovery:**
  * Gracefully handles non-existent market IDs (e.g., `/markets/invalid-id`) with a polished error display and direct links to suggested markets.

---

### 5.4 Produce Guide & Harvest Matrix (`/produce`)

An educational encyclopedia and catalog of regional agricultural produce.

* **Categorized Produce Directory:**
  * 4 intuitive categories: *Fruits*, *Vegetables*, *Herbs*, and *Dairy & Eggs*.
  * Instant keyword search across produce names, nutritional profiles, and culinary tags.
* **Comprehensive Crop Passport Cards:**
  * Produce name, icon/visual preview, seasonality classification (*Peak Season*, *Early Harvest*, *Off-Season*).
  * Nutritional benefits (Vitamins, minerals, dietary fiber).
  * Kitchen culinary tips and proper storage instructions (extending freshness and zero-waste utilization).
  * **Available Markets Linkage:** Directly lists all local markets currently stocking this produce item.
* **Innovation: 12-Month Annual Harvest Heatmap:**
  * An interactive visual grid tracking every produce item across all 12 calendar months (January through December).
  * Color-coded status: **Peak Harvest** (deep green), **Moderate Availability** (light green), and **Off-Season** (gray).

---

### 5.5 Seasonal Recommendations & Farm Recipes (`/seasonal`)

Celebrates the natural cycle of the four seasons with curated culinary inspirations.

* **Interactive 4-Season Selector:**
  * Tabs for **Spring (Mùa Xuân)**, **Summer (Mùa Hạ)**, **Autumn (Mùa Thu)**, and **Winter (Mùa Đông)**.
  * Dynamic atmospheric descriptions, weather context, and dietary wellness tips.
* **Farm-to-Kitchen Recipes Library:**
  * Wholesome recipes utilizing seasonal ingredients (e.g., *Ba Vi Strawberry & Goat Cheese Salad*, *Highland Avocado Toast*, *Wild Forest Mushroom Sauté*).
  * Key culinary metrics: Preparation time, cooking time, calorie count, and difficulty rating.
  * Full ingredient breakdown with precise measurements and step-by-step culinary instructions.
* **1-Click "Add All Ingredients to Shopping Notebook":**
  * Automatically transfers all recipe ingredients into the user's Bookmarking & Shopping Notebook with confetti celebration feedback.

---

### 5.6 Rule-Based AI Assistant — FarmBot AI

An offline-first, client-side intelligent assistant accessible across every page of the web application.

* **Zero Backend Dependency:** Operates entirely within the browser via a local knowledge base (`src/data/chatbot-kb.json`). Zero external API latency, zero token costs, and 100% uptime even on offline networks.
* **Natural Language Intent Recognition:**
  * Matches keywords and conversational patterns regarding market schedules, nearest locations, seasonal fruit advice, and food preservation tips.
  * Handles casual greetings, FAQs, and error recovery gracefully.
* **Quick-Reply Suggestion Pills:**
  * Interactive action chips above the input field (e.g., *"Which markets are open today?"*, *"What's in season right now?"*, *"Where to buy organic strawberries?"*).
* **Contextual In-App Deep-Link Navigation:**
  * Equipped with an interactive **"View on website"** action button.
  * Powered by `useNavigate()`, clicking routes the user directly to `/markets`, `/seasonal`, `/produce`, or opens the Bookmarks drawer smoothly.

---

### 5.7 Content Bookmarking & Shopping Notebook System

A multi-functional sliding drawer providing continuous organization across sessions.

* **Sliding Drawer Architecture:** Accessible from the top navigation bar or floating action button, opening a slide-over panel.
* **Tri-Tab Organization:**
  1. **Saved Markets:** Quick-access list of favorite markets with direct links to view details.
  2. **Saved Produce:** Catalog of bookmarked seasonal fruits and vegetables.
  3. **Shopping Notebook:** Interactive shopping checklist with strike-through completion toggles.
* **Dual-Tier Storage Strategy:**
  * Market and produce bookmarks persist permanently via `localStorage`.
  * Personal scratchpad notes utilize `sessionStorage`, safeguarding private notes and automatically clearing when the browser tab closes.
* **Export & Social Sharing:**
  * **Export to `.TXT`:** Formats saved markets, produce checklist, and shopping notes into a downloadable text file for offline market shopping.
  * **1-Click Social Sharing:** Native Web Share API integration or one-tap link copying to clipboard.

---

### 5.8 About Us & Eco-Impact Dashboard (`/about`)

Communicates the foundational mission, ethical values, and sustainability impact of the FreshFind initiative.

* **Mission & Brand Story:** Highlighting our goal to eliminate unnecessary middlemen, guarantee fair farmer wages, and reduce food miles.
* **Eco-Impact Metrics Dashboard:** Quantified achievements including verified partner markets, smallholder farm families supported, percentage reduction in commercial markup, and estimated metric tons of CO₂ emissions prevented.
* **Founding Team Showcase:** Profiles of project leads covering Software Architecture, UI/UX Design, and Sustainable Supply Chain Research.

---

### 5.9 Contact Us & GPS Proximity Finder (`/contact`)

Facilitates direct collaboration and real-time geographic exploration.

* **GPS Proximity Finder (HTML5 Geolocation API):**
  * Requests user location permission to calculate real-time distances (in km) to all partner markets using the mathematical Haversine formula.
  * Displays the nearest market sorted dynamically with exact distance feedback.
* **Validated Contact & Inquiry Form:**
  * Comprehensive validation: Name, valid email format regex, category dropdown, and minimum 10-character message requirement.
  * WCAG-compliant form elements with explicit labels, focus rings, and animated submission toast alerts.
* **Headquarters Map & Contact Details:**
  * Embedded Google Maps view of the FreshFind administrative office, official hotline, and support email.

---

### 5.10 Platform-Wide Global Features

* **Light & Dark Theme Engine:** Seamless one-click theme switcher persisting user preference in `localStorage`.
* **Simulated User Authentication (AuthModal):** Sign-in and registration modal for verified shopper reviews.
* **Breadcrumb Navigation:** Clear navigational trail across directory and detail views for optimal orientation.
* **Scroll Restoration:** Automatically resets scroll position to the top on every route transition via `ScrollToTop.jsx`.
* **Toast Notification System:** Non-blocking feedback notifications for user actions (bookmarking, copying links, error alerts).

---

## 💡 6. Innovation & Competitive Edge

FreshFind incorporates multiple high-value innovations that elevate it beyond a static directory:

1. **Side-by-Side Market Comparison Engine:** Eliminates the friction of toggling between browser tabs by placing two market profiles into an interactive comparison matrix evaluating hours, distance, amenities, and certifications.
2. **Eco Food-Miles & Carbon Offset Calculator:** Translates everyday grocery trips into measurable environmental impact metrics, directly supporting the UN Sustainable Development Goals (SDG 12 & SDG 13).
3. **12-Month Annual Harvest Heatmap:** An intuitive, full-year visual matrix that educates consumers on seasonal harvest rhythms at a glance.
4. **Web Speech API Audio Harvest Briefing:** Inclusive, hands-free morning audio updates accessible for visually impaired users or busy cooks on the go.
5. **Real-Time Client-Side Schedule Parser:** Continuously computes `OPEN RIGHT NOW` status down to the second against complex weekly schedules without querying an external server.
6. **Zero-Cost, Zero-Latency Offline AI:** Rule-based chatbot architecture requiring zero API subscriptions, eliminating operational costs while delivering instantaneous responses.

---

## 🛡️ 7. Non-Functional Requirements & Design Standards

### 7.1 Visual & UX Design ("eGreen Basket" Aesthetic)
* **Organic Nature Palette:** Styled with emerald, green, teal, and earthy stone tones reflecting sustainable agriculture.
* **Typography & Hierarchy:** Clear font scaling with Plus Jakarta Sans ensuring legibility on screens ranging from 320px mobile displays to 4K desktop monitors.
* **Micro-Interactions & Transitions:** Gentle hover zooms, slide-in drawers, and glassmorphic translucent headers.

### 7.2 Web Accessibility (WCAG 2.1 AA/AAA Compliance)
* Semantic HTML5 markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* Appropriate ARIA roles and attributes (`aria-label`, `aria-expanded`, `aria-hidden`, `role="dialog"`).
* Full keyboard navigability across modals, drawers, and form inputs.
* High contrast ratios meeting WCAG AAA specifications for all text elements.

### 7.3 Performance Optimization
* Vite 5 Rollup bundle splitting for minimal initial payload.
* Native browser lazy-loading on imagery (`loading="lazy"`).
* Zero heavy CSS or jQuery dependencies.
* Google PageSpeed / Lighthouse score **> 90** across Performance, Accessibility, Best Practices, and SEO.

### 7.4 Production Security & HTTP Headers
Configured via `vercel.json` for edge security compliance:
* `X-Frame-Options: DENY` (Clickjacking prevention).
* `X-Content-Type-Options: nosniff` (MIME-sniffing prevention).
* `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (Forced HTTPS).
* `Referrer-Policy: strict-origin-when-cross-origin`.
* `Permissions-Policy: camera=(), microphone=(), geolocation=(self)`.
* Long-term caching for static assets: `Cache-Control: public, max-age=31536000, immutable`.

---

## 📁 8. Project Structure & Directory Layout

```
TechWiz7/
├── public/                     # Static assets (Favicons, manifest, icons)
├── src/
│   ├── assets/                 # Brand assets (logo.png, chatbot-avatar.png)
│   ├── components/             # Reusable UI component modules
│   │   ├── AboutUs.jsx         # Mission, impact metrics, and team profile component
│   │   ├── AuthModal.jsx       # Simulated login and registration modal
│   │   ├── BookmarkSystem.jsx  # Sliding notebook drawer (Bookmarks, notes, export)
│   │   ├── ChatbotWidget.jsx   # Rule-based FarmBot AI widget with deep-linking
│   │   ├── ContactAbout.jsx    # Contact form and headquarters information
│   │   ├── ErrorBoundary.jsx   # React crash boundary fallback component
│   │   ├── FarmRecipesSection.jsx # Seasonal farm recipes with ingredient adding
│   │   ├── Footer.jsx          # Comprehensive footer with links and newsletter
│   │   ├── Hero.jsx            # Grand hero banner, audio briefing, and quick find
│   │   ├── MarketCompareModal.jsx # Side-by-side market comparison modal
│   │   ├── MarketDetailModal.jsx  # Quick-view market modal
│   │   ├── MarketDirectory.jsx # Search, filtering, and market grid display
│   │   ├── MarketReviews.jsx   # Shopper reviews, star breakdown, and form
│   │   ├── Navbar.jsx          # Sticky navigation, theme toggle, and search trigger
│   │   ├── ProduceGuide.jsx    # Produce directory and 12-month harvest heatmap
│   │   ├── ScrollToTop.jsx     # Route transition scroll restoration
│   │   └── SeasonalRecommendations.jsx # 4-season exploration tabs
│   ├── data/                   # Structured client-side JSON databases
│   │   ├── chatbot-kb.json     # Rule-based knowledge base and intent dictionary
│   │   ├── markets.json        # Farmers' markets database (hours, coordinates, stalls)
│   │   ├── produce.json        # Produce catalog (seasonality, nutrition, tips)
│   │   └── recipes.json        # Farm-to-kitchen recipes and ingredients
│   ├── pages/                  # Page-level route views
│   │   ├── AboutPage.jsx       # Route: /about
│   │   ├── ContactPage.jsx     # Route: /contact
│   │   ├── HomePage.jsx        # Route: /
│   │   ├── MarketDetailPage.jsx# Route: /markets/:id
│   │   ├── MarketsPage.jsx     # Route: /markets
│   │   ├── ProducePage.jsx     # Route: /produce
│   │   └── SeasonalPage.jsx    # Route: /seasonal
│   ├── utils/                  # Utility helpers and calculations
│   │   └── navigation.js       # Navigation and deep-link routing helpers
│   ├── App.jsx                 # Main application component & route configuration
│   ├── index.css               # Global Tailwind CSS definitions and custom utilities
│   └── main.jsx                # Application root entry point
├── index.html                  # HTML5 entry template with meta tags
├── package.json                # Project dependencies and npm scripts
├── postcss.config.js           # PostCSS configuration for Tailwind
├── tailwind.config.js          # Tailwind CSS theme customization
├── vercel.json                 # Vercel deployment rewrites and security headers
└── vite.config.js              # Vite build tool and plugin configuration
```

---

## 🛠️ 9. Installation & Local Development

Follow these steps to run FreshFind on your local machine:

### Prerequisites:
* **Node.js:** Version `18.0.0` or higher ([Download Node.js](https://nodejs.org/))
* **npm:** Version `9.0.0` or higher (bundled with Node.js)
* **Git:** Version `2.x` or higher

### Step-by-Step Setup:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kamiyami05/TechWiz2026.git
   cd TechWiz2026
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *The development server will launch at `http://localhost:5173` (or the port indicated in your terminal).*

4. **Build for production:**
   ```bash
   npm run build
   ```
   *Compiles and optimizes all assets into the `/dist` directory with Rollup chunking.*

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```
   *Launches a local static server to test the production bundle.*

---

## 🏆 10. Competition & Team Acknowledgements

* **Competition:** **TechWiz 7 (Aptech Limited)**
* **Category:** **Web Innovation Unleashed**
* **Theme:** **eGreen Basket**
* **Project Name:** **FreshFind — Fresh All Along**
* **Live Deployment:** [https://techwiz2026.vercel.app](https://techwiz2026.vercel.app)
* **GitHub Repository:** [https://github.com/kamiyami05/TechWiz2026](https://github.com/kamiyami05/TechWiz2026)

*Copyright © 2026 FreshFind Team. All rights reserved. Created with passion for sustainable agriculture and community health.*
