# BudgetBasics - NextGen BudgetBee
### TechWiz 7: Web Innovation Unleashed

Welcome to **BudgetBasics**, an educational personal finance and student budgeting Single Page Application (SPA) designed for the **TechWiz 7 World Tech Championship**.

---

## 🌟 Key Features
- **50-30-20 Rule Budget Calculator:** Real-time percentage breakdowns with animated progress bars.
- **Interactive Needs vs. Wants Classification Game:** Test financial discernment on realistic college expenses.
- **Savings Goals Planner:** Target estimation, remaining balance, and timeline calculation with motivational tips.
- **Session-Based Interactive Expense Tracker:** Log, categorize, edit, and delete temporary daily spending without database overhead.
- **Common Money Mistakes Accordion:** 5 realistic student scenarios and corrective behaviors.
- **AI Financial Learning Guide ("BeeBot"):** Rule-based FAQ chatbot with suggested prompts.
- **Dark Mode Support:** Smooth light/dark theme toggle persisted in `localStorage`.
- **WCAG 2.1 AA Accessibility:** Keyboard navigable, clear focus states, high contrast ratios.

---

## 📁 Directory Structure
```
BudgetBasics/
├── index.html          # Master Single Page Application portal
├── css/
│   └── style.css       # Complete theme styling & Dark Mode definitions
├── js/
│   ├── main.js         # Clock, visitor counter, quotes ticker, theme toggle
│   ├── calculators.js  # 50-30-20, savings goals, and expense planner logic
│   ├── learning.js     # Needs vs wants game, money mistakes, quiz, gallery
│   └── chatbot.js      # BeeBot AI Virtual Assistant rule matching
├── data/
│   ├── budget-data.json    # Student budgets, money mistakes, infographics
│   ├── quiz-questions.json # Needs vs wants items & quiz questions
│   └── chatbot-faq.json    # BeeBot conversational knowledge dataset
└── docs/
    ├── Project_Report.md   # Full project report, diagrams & specifications
    └── ReadMe.md           # Setup and usage guide
```

---

## 🚀 How to Run
```bash
cd "C:\Users\chi huong\Desktop\TechWiz7\BudgetBasics"
python -m http.server 3001
```
Open `http://localhost:3001` in any modern web browser.
