# TechWiz 7 — Category: Web Innovation Unleashed
### World Tech Championship Submission
**Official Team Repository:** `https://github.com/kamiyami05/TechWiz2026.git`  
**Evaluation Standard:** Strictly adheres to TechWiz 7 Category *Web Innovation Unleashed* Parameters & SRS Section 1.5 Constraints.

---

## 🏆 Project Portfolio Overview

This repository contains the complete, production-grade solutions for all three official problem statements under Category **Web Innovation Unleashed**:

| Directory | Project Name | Official Theme | Description | Architecture |
|---|---|---|---|---|
| [`FreshFind/`](./FreshFind/) | **FreshFind** (*Fresh All Along*) | **eGreen Basket** | Local Farmers Market Directory, Real-Time "Open Right Now" Status, Seasonal Produce Nutrition Guide, LocalStorage Bookmarks, and Rule-Based "Sprout" AI Assistant. | 100% Client-Side JSON Data Store |
| [`BudgetBasics/`](./BudgetBasics/) | **BudgetBasics** (*Financial Literacy SPA*) | **NextGen BudgetBee** | Student Financial Literacy Portal, 50-30-20 Rule Calculator, Interactive Needs vs Wants Game, Financial Mistakes Accordion, Infographics Filter, and "BeeBot" AI Assistant. | 100% Client-Side JSON Data Store |
| [`FandomVerse/`](./FandomVerse/) | **FandomVerse** (*Multiverse Pop Culture Hub*) | **Fandom Universe** | 7 Entertainment Realms (Anime, Gaming, Movies, TV, K-Pop, Comics, Manga), 35 Character Lore Profiles, 21 Global Conventions, Retrospectives, Video Trailers, Temporary Shopping Cart, and "VerseBot" AI Assistant. | 100% Client-Side JSON Data Store |

---

## 📋 Competition Constraints Compliance (SRS Section 1.5)

Every project within this repository was engineered in strict compliance with the competition parameters:
1. **Client-Side Data Stores (No Server Database):**
   - Zero remote database servers (no MySQL, MongoDB, PostgreSQL, Firebase DB).
   - Structured local JSON files (`data/*.json`) queried dynamically using the modern JavaScript `fetch()` API.
   - Client-side persistence using `localStorage` (saved bookmarks, visitor counters) and `sessionStorage` (private session notes, in-session calculators).
2. **Standardized Directory Hierarchy:**
   - Every project implements the required folder layout:
     ```
     ├── index.html
     ├── css/
     │   └── style.css
     ├── js/
     │   ├── main.js
     │   └── [feature_modules].js
     ├── data/
     │   ├── [catalogs].json
     │   └── chatbot-faq.json
     ├── images/
     └── docs/
         ├── Project_Report.md
         └── ReadMe.md
     ```
3. **AI Chatbot Assistants (Rule-Based & Pre-Scripted):**
   - Each project features an interactive floating virtual assistant powered by rule-based keyword pattern matchers and quick-prompt chips (`Sprout`, `BeeBot`, `VerseBot`).
   - Zero reliance on external paid AI APIs or runtime network tokens.
4. **Client-Side Validations & Temporary Carts:**
   - All forms (contact forms, calculators, sign-in modals) validate strictly on the client side with immediate inline user feedback.
   - Shopping cart calculations (subtotals, taxes, shipping, grand totals) execute in real-time in memory.
5. **Comprehensive Academic Documentation:**
   - Detailed `Project_Report.md` in each `docs/` folder complete with Mermaid User Journey Flowcharts, Data Flow Diagrams (DFD Level 0 & Level 1), module breakdowns, and testing logs.

---

## 🚀 Quick Execution Guide

Modern web browsers enforce CORS security policies on the `fetch()` API when accessing local JSON files from the `file://` protocol. Therefore, run any project via a local HTTP server:

### Option 1: VS Code Live Server (Easiest)
1. Open any project folder (`FreshFind`, `BudgetBasics`, or `FandomVerse`) in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option 2: Python One-Line HTTP Server
```bash
# To run FreshFind:
cd FreshFind
python -m http.server 3000

# To run BudgetBasics:
cd BudgetBasics
python -m http.server 3001

# To run FandomVerse:
cd FandomVerse
python -m http.server 3002
```

### Option 3: Node.js Serve
```bash
npx serve .
```

---

## 🌐 Cross-Browser Compatibility Matrix

All 3 projects have been verified across the 4 major desktop browsers:
- **Google Chrome** (v128+) — Fully functional, smooth animations, CSS Grid & Flexbox alignment.
- **Microsoft Edge** (v128+) — Complete feature parity, font rendering and modal backdrop blur verified.
- **Mozilla Firefox** (v130+) — Validated CSS scrollbar styling, LocalStorage operations, and responsive viewports.
- **Opera** (v113+) — Validated form interactions, audio/video embeds, and custom event listeners.

---
*Built with ❤️ for TechWiz 7 — Web Innovation Unleashed.*
