/**
 * FandomVerse - AI Virtual Fandom Assistant (VerseBot)
 * Client-side rule-based knowledge engine per SRS Section 1.5 Constraints
 */

document.addEventListener('DOMContentLoaded', () => {
  initVerseBot();
});

async function initVerseBot() {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const widget = document.getElementById('chatbot-widget');
  const closeBtn = document.getElementById('close-chatbot');
  const messagesBox = document.getElementById('chat-messages');
  const promptsBar = document.getElementById('chat-prompts-bar');
  const inputField = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-chat-btn');

  if (!toggleBtn || !widget) return;

  let faqData = null;

  try {
    const res = await fetch('data/chatbot-faq.json');
    if (res.ok) {
      faqData = await res.json();
    }
  } catch (err) {
    console.error('Error loading chatbot dataset:', err);
  }

  toggleBtn.addEventListener('click', () => {
    widget.classList.toggle('active');
    if (widget.classList.contains('active') && inputField) {
      inputField.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      widget.classList.remove('active');
    });
  }

  if (faqData) {
    addBotMessage(faqData.greeting);

    if (promptsBar && faqData.prompts) {
      promptsBar.innerHTML = faqData.prompts.map(p => `
        <button class="prompt-chip" data-question="${p}">${p}</button>
      `).join('');

      promptsBar.querySelectorAll('.prompt-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const q = chip.getAttribute('data-question');
          handleQuery(q);
        });
      });
    }
  }

  function handleQuery(text) {
    if (!text || !text.trim()) return;
    const q = text.trim();
    addUserMessage(q);
    if (inputField) inputField.value = '';

    setTimeout(() => {
      respond(q);
    }, 400);
  }

  function respond(query) {
    if (!faqData) {
      addBotMessage("I am syncing with the FandomVerse database. Try asking again in a moment!");
      return;
    }

    const lower = query.toLowerCase();
    let match = null;

    for (const rule of faqData.rules) {
      if (rule.keywords.some(k => lower.includes(k))) {
        match = rule;
        break;
      }
    }

    if (match) {
      addBotMessage(match.response, match.link, match.linkLabel);
    } else {
      addBotMessage(faqData.fallback);
    }
  }

  function addUserMessage(msg) {
    const div = document.createElement('div');
    div.className = 'chat-bubble chat-bubble-user';
    div.textContent = msg;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function addBotMessage(msg, link, linkLabel) {
    const div = document.createElement('div');
    div.className = 'chat-bubble chat-bubble-bot';

    let formatted = msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (link && linkLabel) {
      formatted += `<div style="margin-top: 0.5rem;"><a href="${link}" class="btn btn-primary" style="padding: 0.2rem 0.6rem; font-size: 0.75rem; text-decoration: none;">${linkLabel} &rarr;</a></div>`;
    }

    div.innerHTML = formatted;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  if (sendBtn && inputField) {
    sendBtn.addEventListener('click', () => handleQuery(inputField.value));
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleQuery(inputField.value);
    });
  }
}
