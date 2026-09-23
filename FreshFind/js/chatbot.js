/**
 * FreshFind - AI-Powered Virtual Market Assistant (Sprout)
 * Loads rule-based FAQ dataset from data/chatbot-faq.json
 * Strictly client-side per SRS Section 1.5 Constraints
 */

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

async function initChatbot() {
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

  // Toggle open/close
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

  // Render initial greeting and quick prompts
  if (faqData) {
    addBotMessage(faqData.greeting);

    if (promptsBar && faqData.prompts) {
      promptsBar.innerHTML = faqData.prompts.map(p => `
        <button class="prompt-chip" data-question="${p}">${p}</button>
      `).join('');

      promptsBar.querySelectorAll('.prompt-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const question = chip.getAttribute('data-question');
          handleUserQuery(question);
        });
      });
    }
  }

  function handleUserQuery(text) {
    if (!text || !text.trim()) return;
    const query = text.trim();

    addUserMessage(query);
    if (inputField) inputField.value = '';

    // Simulate natural AI thinking delay
    setTimeout(() => {
      respondToQuery(query);
    }, 450);
  }

  function respondToQuery(query) {
    if (!faqData) {
      addBotMessage("I'm having trouble accessing my knowledge base. Please check back shortly!");
      return;
    }

    const lower = query.toLowerCase();
    let matchedRule = null;

    for (const rule of faqData.rules) {
      if (rule.keywords.some(kw => lower.includes(kw))) {
        matchedRule = rule;
        break;
      }
    }

    if (matchedRule) {
      addBotMessage(matchedRule.response, matchedRule.link, matchedRule.linkLabel);
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

    // Parse simple markdown bold **text**
    let formatted = msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (link && linkLabel) {
      formatted += `<div style="margin-top: 0.5rem;"><a href="${link}" class="btn btn-primary" style="padding: 0.25rem 0.65rem; font-size: 0.75rem; text-decoration: none;">${linkLabel} &rarr;</a></div>`;
    }

    div.innerHTML = formatted;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  if (sendBtn && inputField) {
    sendBtn.addEventListener('click', () => handleUserQuery(inputField.value));
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserQuery(inputField.value);
    });
  }
}
