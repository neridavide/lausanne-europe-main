import { countryRecords, countryFlagCodes, flagEmoji, statusLabel } from './national-movements-data.js';

const form = document.querySelector('[data-contact-form]');

// Fixed recipients. National movements are added below from the shared data, so
// the list stays in step with the map: every country with an active or emerging
// movement can be contacted directly.
const recipients = new Map([
  ['lausanne-europe', {
    name: 'Lausanne Europe',
    heading: 'Lausanne Europe team',
    body: 'The regional team reads every message, and passes it on when a national movement or network is better placed to help.'
  }],
  ['ylg-europe', {
    name: 'YLG Europe',
    heading: 'YLG Europe coordinators',
    body: 'The Younger Leaders Generation team for Europe, connecting younger leaders across the region with each other and with mentors.'
  }]
]);

const movements = countryRecords
  .filter(([, , status]) => status !== 'none')
  .map(([id, name, status]) => ({ code: countryFlagCodes.get(id), name, status }))
  .sort((a, b) => a.name.localeCompare(b.name));

movements.forEach(({ code, name, status }) => {
  recipients.set(`nm-${code}`, { name: `the Lausanne movement in ${name}`, country: name, code, status });
});

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => `&#${character.charCodeAt(0)};`);

if (form) {
  const recipientSelect = form.querySelector('[data-contact-recipient]');
  const movementGroup = form.querySelector('[data-contact-movements]');
  const topicField = form.querySelector('[data-contact-topic-field]');
  const topicSelect = form.querySelector('[data-contact-topic]');
  const countrySelect = form.querySelector('[data-contact-country]');
  const errorNode = form.querySelector('[data-contact-error]');
  const summaryNode = document.querySelector('[data-contact-summary]');
  const sentNode = document.querySelector('[data-contact-sent]');
  const formSection = document.querySelector('#contact-form');

  movementGroup.innerHTML = movements
    .map(({ code, name }) => `<option value="nm-${code}">${flagEmoji(code)} ${name}</option>`)
    .join('');

  countrySelect.insertAdjacentHTML('beforeend', [...countryRecords]
    .sort(([, a], [, b]) => a.localeCompare(b))
    .map(([, name]) => `<option>${name}</option>`)
    .join('') + '<option>Outside Europe</option>');

  const activeCount = movements.filter(({ status }) => status === 'active').length;
  document.querySelectorAll('[data-movement-count]').forEach((element) => {
    element.textContent = `${movements.length} active and emerging`;
    element.title = `${activeCount} active, ${movements.length - activeCount} emerging`;
  });

  const renderSummary = (recipient) => {
    if (!recipient.country) {
      summaryNode.innerHTML = `<h3>${recipient.heading}</h3><p>${recipient.body}</p>`;
      return;
    }

    const profileHref = `country-profile.html?${new URLSearchParams({ country: recipient.country, status: recipient.status })}`;
    const followUp = recipient.status === 'emerging'
      ? 'This movement is still forming, so the Lausanne Europe team may reply on its behalf.'
      : 'Your message goes to the national coordinator, who will reply directly.';
    summaryNode.innerHTML = `
      <h3><span aria-hidden="true">${flagEmoji(recipient.code)}</span> ${escapeHtml(recipient.country)}</h3>
      <p class="wf-country-status wf-country-status-${recipient.status}"><i></i>${statusLabel(recipient.status)}</p>
      <p>${followUp}</p>
      <a href="${profileHref}">View ${escapeHtml(recipient.country)} profile <span aria-hidden="true">›</span></a>`;
  };

  const syncRecipient = () => {
    const recipient = recipients.get(recipientSelect.value);
    // Topics describe the regional team's enquiry routes, so they only apply there.
    topicField.hidden = recipientSelect.value !== 'lausanne-europe';
    document.querySelectorAll('[data-contact-recipient-name]').forEach((element) => {
      element.textContent = recipient.name;
    });
    if (recipient.country && !countrySelect.value) countrySelect.value = recipient.country;
    renderSummary(recipient);
  };

  const selectRecipient = (key) => {
    if (!recipients.has(key)) return;
    recipientSelect.value = key;
    syncRecipient();
  };

  // Deep links: ?to=lausanne-europe | ylg-europe | nm-FR, and ?topic=press etc.
  const params = new URLSearchParams(window.location.search);
  const requestedRecipient = params.get('to')?.replace(/^nm-(\w+)$/i, (_, code) => `nm-${code.toUpperCase()}`);
  if (requestedRecipient) selectRecipient(requestedRecipient);
  const requestedTopic = params.get('topic');
  if (requestedTopic && topicSelect.querySelector(`option[value="${CSS.escape(requestedTopic)}"]`)) {
    selectRecipient('lausanne-europe');
    topicSelect.value = requestedTopic;
  }
  syncRecipient();

  recipientSelect.addEventListener('change', syncRecipient);

  document.querySelectorAll('[data-contact-pick]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.contactPick;
      if (key !== 'national') selectRecipient(key);
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      recipientSelect.focus({ preventScroll: true });
      if (key === 'national') {
        try { recipientSelect.showPicker(); } catch { /* Not supported everywhere; focus is enough. */ }
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const problems = [];
    if (!data.get('name').trim()) problems.push('your name');
    if (!form.elements.email.validity.valid || !data.get('email').trim()) problems.push('a valid email address');
    if (!data.get('message').trim()) problems.push('a message');
    if (!data.get('consent')) problems.push('your agreement to the privacy notice');

    if (problems.length) {
      errorNode.textContent = `Please add ${problems.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`;
      errorNode.hidden = false;
      return;
    }

    // Prototype only: in production this posts `data` to the mail handler. A filled
    // honeypot is treated as sent so bots get no signal.
    errorNode.hidden = true;
    sentNode.querySelector('[data-contact-sent-to]').textContent = recipients.get(recipientSelect.value).name;
    sentNode.querySelector('[data-contact-sent-email]').textContent = data.get('email').trim();
    form.hidden = true;
    sentNode.hidden = false;
    sentNode.focus();
  });

  sentNode.querySelector('[data-contact-reset]').addEventListener('click', () => {
    const recipientKey = recipientSelect.value;
    form.reset();
    recipientSelect.value = recipientKey;
    syncRecipient();
    sentNode.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
}
