/**
 * BudgetBasics - Interactive Learning Modules
 * Handles Needs vs Wants Game, Money Mistakes Accordion, Knowledge Quiz, Infographics
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeedsVsWantsGame();
  initMoneyMistakesAccordion();
  initKnowledgeQuiz();
  initInfographicsFilter();
});

/**
 * Module 2: Needs vs. Wants Interactive Classification Game
 */
async function initNeedsVsWantsGame() {
  const cardDisplay = document.getElementById('game-item-display');
  const needBtn = document.getElementById('btn-classify-need');
  const wantBtn = document.getElementById('btn-classify-want');
  const feedbackBox = document.getElementById('game-feedback-box');
  const scoreDisplay = document.getElementById('game-score');

  if (!cardDisplay) return;

  let items = [];
  let currentIndex = 0;
  let score = 0;

  try {
    const res = await fetch('data/quiz-questions.json');
    if (!res.ok) return;
    const data = await res.json();
    items = data.needsVsWantsItems || [];
  } catch (err) {
    console.error('Error loading game items:', err);
  }

  function displayCurrentItem() {
    if (currentIndex >= items.length) {
      cardDisplay.innerHTML = `
        <span style="font-size: 2rem;">🏆</span>
        <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">Game Completed!</h4>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">
          You scored ${score} out of ${items.length}! You have a solid grasp of financial priorities.
        </p>
        <button id="restart-game-btn" class="btn btn-primary" style="margin-top: 1rem; font-size: 0.8125rem;">
          Play Again ↺
        </button>
      `;
      const restartBtn = document.getElementById('restart-game-btn');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          currentIndex = 0;
          score = 0;
          scoreDisplay.textContent = `Score: 0 / ${items.length}`;
          feedbackBox.style.display = 'none';
          displayCurrentItem();
        });
      }
      if (needBtn) needBtn.disabled = true;
      if (wantBtn) wantBtn.disabled = true;
      return;
    }

    if (needBtn) needBtn.disabled = false;
    if (wantBtn) wantBtn.disabled = false;

    const item = items[currentIndex];
    cardDisplay.innerHTML = `
      <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--primary); background: var(--primary-light); padding: 0.2rem 0.6rem; border-radius: 9999px; margin-bottom: 0.5rem;">
        Item #${currentIndex + 1} of ${items.length}
      </span>
      <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); max-width: 500px; text-align: center;">
        ${item.name}
      </h3>
    `;
  }

  function handleClassification(choice) {
    if (currentIndex >= items.length) return;
    const item = items[currentIndex];
    const isCorrect = choice === item.correct;

    if (isCorrect) score += 1;
    scoreDisplay.textContent = `Score: ${score} / ${items.length}`;

    feedbackBox.innerHTML = `
      <div style="background: ${isCorrect ? '#ecfdf5' : '#fff1f2'}; border: 1px solid ${isCorrect ? '#a7f3d0' : '#fecdd3'}; border-radius: 10px; padding: 1rem; text-align: left; font-size: 0.8125rem;">
        <strong style="color: ${isCorrect ? '#065f46' : '#9f1239'}; display: block; margin-bottom: 0.25rem;">
          ${isCorrect ? '✓ Correct Decision!' : `✗ Incorrect — This is classified as a ${item.correct.toUpperCase()}`}
        </strong>
        <p style="color: #334155; line-height: 1.45;">${item.explanation}</p>
        <button id="next-game-item-btn" class="btn btn-primary" style="margin-top: 0.75rem; padding: 0.35rem 0.85rem; font-size: 0.75rem;">
          Next Item &rarr;
        </button>
      </div>
    `;
    feedbackBox.style.display = 'block';

    if (needBtn) needBtn.disabled = true;
    if (wantBtn) wantBtn.disabled = true;

    const nextBtn = document.getElementById('next-game-item-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex += 1;
        feedbackBox.style.display = 'none';
        displayCurrentItem();
      });
    }
  }

  if (needBtn) needBtn.addEventListener('click', () => handleClassification('need'));
  if (wantBtn) wantBtn.addEventListener('click', () => handleClassification('want'));

  displayCurrentItem();
}

/**
 * Module 6: Money Mistakes Expandable Accordion
 */
async function initMoneyMistakesAccordion() {
  const container = document.getElementById('mistakes-accordion-container');
  if (!container) return;

  try {
    const res = await fetch('data/budget-data.json');
    if (!res.ok) return;
    const data = await res.json();
    const mistakes = data.moneyMistakes || [];

    container.innerHTML = mistakes.map((m, idx) => `
      <div class="accordion-item" data-id="${m.id}">
        <div class="accordion-header" tabindex="0" role="button" aria-expanded="false">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="width: 28px; height: 28px; border-radius: 50%; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 0.8125rem; font-weight: 800;">
              ${idx + 1}
            </span>
            <span style="font-size: 1rem;">${m.title}</span>
          </div>
          <span class="chevron" style="transition: transform 0.2s;">▼</span>
        </div>
        <div class="accordion-body">
          <div style="margin-bottom: 0.5rem;">
            <strong style="color: var(--text-main);">Realistic Student Scenario:</strong>
            <p style="margin-top: 0.2rem;">${m.scenario}</p>
          </div>
          <div style="margin-bottom: 0.5rem; color: #b45309;">
            <strong>Financial Impact:</strong> ${m.impact}
          </div>
          <div style="background: var(--primary-light); padding: 0.75rem 1rem; border-radius: 8px; color: var(--text-main); font-size: 0.8125rem;">
            🛡 <strong>Corrective Action:</strong> ${m.fix}
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.accordion-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const parent = hdr.parentElement;
        parent.classList.toggle('active');
        const isExp = parent.classList.contains('active');
        hdr.setAttribute('aria-expanded', isExp.toString());
        hdr.querySelector('.chevron').style.transform = isExp ? 'rotate(180deg)' : 'rotate(0deg)';
      });
      hdr.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          hdr.click();
        }
      });
    });
  } catch (err) {
    console.error('Error loading money mistakes:', err);
  }
}

/**
 * Module 1: Interactive Knowledge Check Quiz
 */
async function initKnowledgeQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  try {
    const res = await fetch('data/quiz-questions.json');
    if (!res.ok) return;
    const data = await res.json();
    const questions = data.knowledgeQuiz || [];

    let currentQ = 0;
    let quizScore = 0;

    function renderQuestion() {
      if (currentQ >= questions.length) {
        container.innerHTML = `
          <div style="text-align: center; padding: 2rem;">
            <span style="font-size: 2.5rem;">🎓</span>
            <h4 style="font-size: 1.35rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">Knowledge Check Complete!</h4>
            <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem;">
              You earned ${quizScore} out of ${questions.length} points!
            </p>
            <button id="retry-quiz-btn" class="btn btn-primary" style="margin-top: 1rem; font-size: 0.8125rem;">
              Try Again ↺
            </button>
          </div>
        `;
        const retryBtn = document.getElementById('retry-quiz-btn');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            currentQ = 0;
            quizScore = 0;
            renderQuestion();
          });
        }
        return;
      }

      const q = questions[currentQ];
      container.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--primary);">
              Question ${currentQ + 1} of ${questions.length}
            </span>
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--text-muted);">
              Score: ${quizScore}
            </span>
          </div>

          <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 1.25rem;">
            ${q.question}
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;" id="quiz-options-box">
            ${q.options.map((opt, i) => `
              <button class="quiz-option-btn btn btn-outline" data-index="${i}" style="justify-content: flex-start; text-align: left; padding: 0.75rem 1rem;">
                <span style="margin-right: 0.5rem; font-weight: 800;">${String.fromCharCode(65 + i)}.</span> ${opt}
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback-box" style="display: none; padding: 1rem; border-radius: 8px; font-size: 0.8125rem; line-height: 1.45;"></div>
        </div>
      `;

      container.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
          const isCorrect = selectedIdx === q.correctIndex;
          if (isCorrect) quizScore += 1;

          const fBox = document.getElementById('quiz-feedback-box');
          fBox.style.display = 'block';
          fBox.style.background = isCorrect ? '#ecfdf5' : '#fff1f2';
          fBox.style.color = isCorrect ? '#065f46' : '#9f1239';
          fBox.style.border = `1px solid ${isCorrect ? '#a7f3d0' : '#fecdd3'}`;
          fBox.innerHTML = `
            <strong>${isCorrect ? '✓ Excellent!' : '✗ Not quite.'}</strong> ${q.explanation}
            <div style="margin-top: 0.75rem;">
              <button id="next-quiz-btn" class="btn btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.75rem;">
                Continue &rarr;
              </button>
            </div>
          `;

          container.querySelectorAll('.quiz-option-btn').forEach(b => b.disabled = true);
          const nextBtn = document.getElementById('next-quiz-btn');
          if (nextBtn) {
            nextBtn.addEventListener('click', () => {
              currentQ += 1;
              renderQuestion();
            });
          }
        });
      });
    }

    renderQuestion();
  } catch (err) {
    console.error('Error loading quiz:', err);
  }
}

/**
 * Module 7: Infographics & Learning Gallery Topic Filter
 */
async function initInfographicsFilter() {
  const container = document.getElementById('infographics-grid');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  if (!container) return;

  try {
    const res = await fetch('data/budget-data.json');
    if (!res.ok) return;
    const data = await res.json();
    const infographics = data.infographics || [];

    function renderCards(list) {
      if (list.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
            No visual guides match this topic.
          </div>
        `;
        return;
      }

      container.innerHTML = list.map(item => `
        <div class="feature-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <span class="pill-badge" style="margin: 0; font-size: 0.7rem;">${item.tag}</span>
            <span style="font-size: 1.25rem;">📊</span>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.4rem;">
            ${item.title}
          </h4>
          <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">
            ${item.desc}
          </p>
          <div style="margin-top: auto;">
            <span style="font-size: 0.75rem; color: var(--primary); font-weight: 700;">Topic: ${item.topic.toUpperCase()}</span>
          </div>
        </div>
      `).join('');
    }

    renderCards(infographics);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
        filterBtns.forEach(b => b.classList.add('btn-outline'));
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-outline');

        const topic = btn.getAttribute('data-topic');
        if (topic === 'all') {
          renderCards(infographics);
        } else {
          renderCards(infographics.filter(i => i.topic === topic));
        }
      });
    });
  } catch (err) {
    console.error('Error loading infographics:', err);
  }
}
