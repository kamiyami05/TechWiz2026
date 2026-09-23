/**
 * BudgetBasics - Financial Calculators & Interactive Planners
 * Implements 50-30-20 Rule Calculator, Savings Goal Planner, and Session Expense Tracker.
 */

document.addEventListener('DOMContentLoaded', () => {
  init503020Calculator();
  initSavingsGoalPlanner();
  initExpensePlanner();
});

/**
 * Module 3: 50-30-20 Budget Calculator
 */
function init503020Calculator() {
  const form = document.getElementById('calc-503020-form');
  const resultsBox = document.getElementById('calc-503020-results');
  const incomeInput = document.getElementById('calc-income-input');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const income = parseFloat(incomeInput.value);

    if (isNaN(income) || income <= 0) {
      alert('Please enter a valid positive monthly income/allowance amount (e.g. 1200).');
      return;
    }

    const needs = income * 0.50;
    const wants = income * 0.30;
    const savings = income * 0.20;

    resultsBox.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.25rem;">
          Suggested Monthly Allocation (\$${income.toLocaleString()})
        </h4>
        <p style="font-size: 0.75rem; color: var(--text-muted);">
          *Educational estimate only. Adjust percentages based on living costs and debt commitments.
        </p>
      </div>

      <div class="preview-bar-row">
        <div class="bar-label">
          <span>🏠 Needs (50% Essential Living):</span>
          <strong style="color: #0284c7;">\$${needs.toFixed(2)}</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: 50%; background-color: #0284c7;"></div>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.2rem;">
          Rent, groceries, utilities, campus commute, health prescriptions.
        </span>
      </div>

      <div class="preview-bar-row">
        <div class="bar-label">
          <span>🎉 Wants (30% Discretionary Comforts):</span>
          <strong style="color: #d97706;">\$${wants.toFixed(2)}</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: 30%; background-color: #d97706;"></div>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.2rem;">
          Dining out, video games, subscriptions, hobbies, movie tickets.
        </span>
      </div>

      <div class="preview-bar-row">
        <div class="bar-label">
          <span>🌱 Savings & Debt (20% Future Security):</span>
          <strong style="color: #10b981;">\$${savings.toFixed(2)}</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: 20%; background-color: #10b981;"></div>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.2rem;">
          Emergency fund buffer, tuition prep, high-interest debt payoffs.
        </span>
      </div>
    `;
    resultsBox.style.display = 'block';
  });
}

/**
 * Module 4: Savings Goals Planner
 */
function initSavingsGoalPlanner() {
  const form = document.getElementById('savings-goal-form');
  const resultsBox = document.getElementById('savings-goal-results');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('goal-name').value.trim() || 'My Savings Goal';
    const target = parseFloat(document.getElementById('goal-target').value);
    const current = parseFloat(document.getElementById('goal-current').value) || 0;
    const monthly = parseFloat(document.getElementById('goal-monthly').value);

    if (isNaN(target) || target <= 0) {
      alert('Please enter a valid target savings goal amount.');
      return;
    }
    if (isNaN(monthly) || monthly <= 0) {
      alert('Please enter a valid planned monthly contribution amount.');
      return;
    }
    if (current >= target) {
      alert('Congratulations! Your current savings already exceed or equal your goal target!');
      return;
    }

    const remaining = target - current;
    const months = Math.ceil(remaining / monthly);
    const progressPercent = Math.min(100, Math.round((current / target) * 100));

    resultsBox.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main);">${name}</h4>
          <span style="font-size: 0.8125rem; font-weight: 800; color: #10b981; background: #ecfdf5; padding: 0.2rem 0.6rem; border-radius: 9999px;">
            ${progressPercent}% Complete
          </span>
        </div>

        <div class="progress-track" style="height: 14px; margin-bottom: 1rem;">
          <div class="progress-fill" style="width: ${progressPercent}%; background-color: #10b981;"></div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center; margin-bottom: 1rem; font-size: 0.8125rem;">
          <div>
            <span style="color: var(--text-muted); display: block;">Saved So Far:</span>
            <strong style="font-size: 1rem; color: var(--text-main); font-weight: 800;">\$${current.toLocaleString()}</strong>
          </div>
          <div>
            <span style="color: var(--text-muted); display: block;">Remaining:</span>
            <strong style="font-size: 1rem; color: #f43f5e; font-weight: 800;">\$${remaining.toLocaleString()}</strong>
          </div>
          <div>
            <span style="color: var(--text-muted); display: block;">Estimated Time:</span>
            <strong style="font-size: 1rem; color: #0284c7; font-weight: 800;">~${months} Month${months > 1 ? 's' : ''}</strong>
          </div>
        </div>

        <div style="background: var(--primary-light); padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.75rem; color: var(--text-main);">
          💡 <strong>BudgetBee Tip:</strong> Automate your \$${monthly} monthly transfer on the day your allowance or paycheck arrives so you aren't tempted to spend it!
        </div>
      </div>
    `;
    resultsBox.style.display = 'block';
  });
}

/**
 * Module 5: Interactive Expense Planner Demonstration
 */
function initExpensePlanner() {
  const addForm = document.getElementById('expense-add-form');
  const tableBody = document.getElementById('expense-table-body');
  const totalExpenseEl = document.getElementById('expense-total-display');
  const balanceDisplayEl = document.getElementById('expense-balance-display');
  const incomeInput = document.getElementById('planner-income-input');

  let expenses = [
    { id: 1, date: '2026-09-01', category: 'Education', desc: 'Calculus II Used Textbook', amount: 45.00 },
    { id: 2, date: '2026-09-03', category: 'Food', desc: 'Weekly Meal Prep Groceries', amount: 62.50 },
    { id: 3, date: '2026-09-05', category: 'Transport', desc: 'Monthly Student Metro Pass', amount: 35.00 }
  ];

  function renderTable() {
    if (!tableBody) return;

    if (expenses.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            No expenses logged yet. Add your first expense entry above!
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = expenses.map(item => `
        <tr style="border-bottom: 1px solid var(--border-light);">
          <td style="padding: 0.75rem 1rem; font-size: 0.8125rem;">${item.date}</td>
          <td style="padding: 0.75rem 1rem; font-size: 0.8125rem;">
            <span style="background: var(--primary-light); color: var(--primary); padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">
              ${item.category}
            </span>
          </td>
          <td style="padding: 0.75rem 1rem; font-size: 0.8125rem; font-weight: 600;">${item.desc}</td>
          <td style="padding: 0.75rem 1rem; font-size: 0.8125rem; font-weight: 800; text-align: right;">\$${item.amount.toFixed(2)}</td>
          <td style="padding: 0.75rem 1rem; text-align: center;">
            <button class="delete-exp-btn" data-id="${item.id}" style="background: none; border: none; color: #f43f5e; cursor: pointer; font-size: 0.875rem;" title="Delete Entry">
              🗑
            </button>
          </td>
        </tr>
      `).join('');
    }

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    if (totalExpenseEl) totalExpenseEl.textContent = `\$${total.toFixed(2)}`;

    const monthlyAllowance = parseFloat(incomeInput ? incomeInput.value : '800') || 800;
    const remaining = monthlyAllowance - total;
    if (balanceDisplayEl) {
      balanceDisplayEl.textContent = `\$${remaining.toFixed(2)}`;
      balanceDisplayEl.style.color = remaining >= 0 ? '#10b981' : '#f43f5e';
    }

    // Attach delete events
    tableBody.querySelectorAll('.delete-exp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        expenses = expenses.filter(e => e.id !== id);
        renderTable();
      });
    });
  }

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('exp-date').value || new Date().toISOString().split('T')[0];
      const category = document.getElementById('exp-category').value;
      const desc = document.getElementById('exp-desc').value.trim();
      const amount = parseFloat(document.getElementById('exp-amount').value);

      if (!desc || isNaN(amount) || amount <= 0) {
        alert('Please provide a description and a valid positive amount.');
        return;
      }

      expenses.unshift({
        id: Date.now(),
        date,
        category,
        desc,
        amount
      });

      addForm.reset();
      renderTable();
    });
  }

  if (incomeInput) {
    incomeInput.addEventListener('input', renderTable);
  }

  renderTable();
}
