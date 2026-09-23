# FreshFind - Fresh All Along (eGreen Basket)
### TechWiz 7: Web Innovation Unleashed

Welcome to **FreshFind**, an interactive, responsive web portal developed for the **TechWiz 7 World Tech Championship** under the **Web Innovation Unleashed** category.

---

## 🌟 Key Highlights
- **100% Client-Side Architecture:** Zero server-side database dependencies in strict compliance with contest constraints (SRS Section 1.5).
- **Dynamic Farmers Market Directory:** Searchable by area, days of the week, and produce categories with weekly timetable popups.
- **Real-Time "Open Right Now" Engine:** Analyzes current system time and day-of-week to highlight open markets.
- **Seasonal Produce Guide:** Complete nutritional values, storage tips, and harvest peak periods linked directly to vendor markets.
- **Client-Side Bookmarking & Notes:** Save favorite markets in `LocalStorage`, record private shopping notes in `SessionStorage`, and export formatted shopping plans.
- **Rule-Based AI Virtual Assistant ("Sprout"):** Pre-scripted conversational assistant loaded from `data/chatbot-faq.json`.
- **Accessibility & Cross-Browser:** High-contrast text, keyboard navigable, responsive across Mobile, Tablet, and Desktop.

---

## 📁 Directory Structure
```
FreshFind/
├── index.html          # Master semantic HTML5 portal
├── css/
│   └── style.css       # Clean, modern CSS variables & responsive styles
├── js/
│   ├── main.js         # Real-time clock, visitor counter, auth demo, navigation
│   ├── directory.js    # Market directory search, filter, sort, detail modal
│   ├── produce.js      # Seasonal produce guide & category filters
│   ├── bookmarks.js    # LocalStorage bookmarks & SessionStorage notes
│   └── chatbot.js      # Sprout AI Virtual Assistant rule-based logic
├── data/
│   ├── markets.json    # Verified local farmers markets dataset
│   ├── produce.json    # Seasonal produce & nutritional guide dataset
│   └── chatbot-faq.json# Chatbot questions, answers, and prompt chips
└── docs/
    ├── Project_Report.md # Full project documentation & diagrams
    └── ReadMe.md       # Setup & execution instructions
```

---

## 🚀 How to Run the Project
Because the portal dynamically loads market and produce catalogs via the standard browser `fetch()` API from local JSON files, modern browsers require an HTTP origin rather than a `file://` protocol.

### Option 1: VS Code Live Server (Fastest)
1. Open the `FreshFind` folder in **Visual Studio Code**.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 2: Python HTTP Server
```bash
cd "C:\Users\chi huong\Desktop\TechWiz7\FreshFind"
python -m http.server 3000
```
Then visit `http://localhost:3000` in Chrome, Firefox, Edge, or Opera.

### Option 3: Node.js Serve
```bash
npx serve "C:\Users\chi huong\Desktop\TechWiz7\FreshFind"
```
