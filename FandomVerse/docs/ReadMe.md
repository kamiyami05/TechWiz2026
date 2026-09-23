# FandomVerse - Fandom Universe Multiverse Portal
### TechWiz 7: Web Innovation Unleashed

Welcome to **FandomVerse**, an interactive, responsive web portal developed for the **TechWiz 7 World Tech Championship** under the **Web Innovation Unleashed** category (*Theme: Fandom Universe*).

---

## 🌟 Key Highlights
- **100% Client-Side Architecture:** Zero server-side database dependencies in strict compliance with contest constraints (SRS Section 1.5).
- **7 Fandom Realms:** Seamless category switching across Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga.
- **35 Character Lore Profiles:** 5 iconic profiles per realm featuring biographies, franchise details, and signature power trait chips.
- **21 Global Fandom Conventions:** 3 premier international fan gatherings per realm with dates, venues, and itinerary bookmarking.
- **Editorial Retrospectives:** Long-form journalism covering Gear 5 animation, Unreal Engine 5.5 photorealism, and Dune IMAX cinematography.
- **Exclusive Video Trailers Showcase:** Embedded cinema iframe player with release status badges and view metrics.
- **Merchandise Showcase & Temporary Shopping Cart:** Real-time billing calculations for subtotals, standard sales tax (8.25%), flat shipping, and grand totals.
- **Client-Side Bookmarking & Session Notes:** Save favorite characters and events in `LocalStorage`, record private notes in `SessionStorage`, and export formatted `.txt` collections.
- **Rule-Based AI Virtual Assistant ("VerseBot"):** Pre-scripted conversational assistant loaded from `data/chatbot-faq.json`.
- **Accessibility & Cross-Browser:** Dark cyberpunk neon styling, high contrast, responsive across Mobile, Tablet, and Desktop.

---

## 📁 Directory Structure
```
FandomVerse/
├── index.html            # Master semantic HTML5 portal
├── css/
│   └── style.css         # Dark cyberpunk theme, cart drawer & modal animations
├── js/
│   ├── main.js           # Clock, visitor counter, auth modal, category bus
│   ├── characters.js     # 35 character profiles showcase & lore modal
│   ├── cart.js           # Merchandise showcase & temporary shopping cart
│   ├── content.js        # Articles, conventions calendar, trailers & contact form
│   ├── bookmarks.js      # LocalStorage bookmarks, session notes & .txt export
│   └── chatbot.js        # VerseBot AI Virtual Assistant rule-based logic
├── data/
│   ├── characters.json   # 35 character profiles (5 per realm)
│   ├── events.json       # 21 global conventions (3 per realm)
│   ├── articles.json     # Curated editorial deep-dives
│   ├── trailers.json     # Official video trailers & teasers
│   ├── merchandise.json  # Official fan merchandise catalog
│   └── chatbot-faq.json  # VerseBot knowledge rules & prompt chips
└── docs/
    ├── Project_Report.md # Full project documentation & diagrams
    └── ReadMe.md         # Setup & execution instructions
```

---

## 🚀 How to Run the Project
Because the portal dynamically loads character catalogs, articles, and events via the standard browser `fetch()` API from local JSON files, modern browsers require an HTTP origin rather than a `file://` protocol.

### Option 1: VS Code Live Server (Recommended)
1. Open the `FandomVerse` folder in **Visual Studio Code**.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 2: Python HTTP Server
```bash
cd "C:\Users\chi huong\Desktop\TechWiz7\FandomVerse"
python -m http.server 3002
```
Then visit `http://localhost:3002` in Chrome, Firefox, Edge, or Opera.

### Option 3: Node.js Serve
```bash
npx serve "C:\Users\chi huong\Desktop\TechWiz7\FandomVerse"
```
