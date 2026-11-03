// National page form: word counters, drafts saved in this browser, and
// submission to Netlify Forms.
(() => {
  const DRAFT_KEY = 'lausanne-national-page-draft';
  const COUNTRIES = [
    'Albania', 'Andorra', 'Austria', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus',
    'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland',
    'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Monaco',
    'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'San Marino',
    'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom',
  ];

  const form = document.getElementById('national-page-form');
  const saveStatus = document.querySelector('[data-save-status]');
  const error = form.querySelector('[data-error]');

  form.querySelector('[data-country]').append(...COUNTRIES.map((name) => new Option(name, name)));

  // Word counters
  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;
  const limitedFields = [...form.querySelectorAll('[data-word-limit]')];
  const updateCount = (field) => {
    const words = countWords(field.value);
    const counter = field.parentElement.querySelector('[data-word-count]');
    counter.textContent = `${words} / ${field.dataset.wordLimit} words`;
    counter.classList.toggle('is-over', words > Number(field.dataset.wordLimit));
  };
  limitedFields.forEach((field) => field.addEventListener('input', () => updateCount(field)));

  // Drafts live in this browser only.
  const namedFields = () => [...form.elements]
    .filter((field) => field.name && field.type !== 'hidden' && field.name !== 'bot-field');
  const collectDraft = () => ({
    fields: Object.fromEntries(namedFields().map((field) => [field.name, field.value])),
    savedAt: new Date().toISOString(),
  });
  const timeLabel = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // "Saved at 14:05" today, "Saved on 2 Nov" for an older draft.
  const savedLabel = (iso) => (new Date(iso).toDateString() === new Date().toDateString()
    ? `Saved at ${timeLabel(iso)}`
    : `Saved on ${new Date(iso).toLocaleDateString([], { day: 'numeric', month: 'short' })}`);
  let unsaved = false;
  const saveDraft = () => {
    try {
      const draft = collectDraft();
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      unsaved = false;
      saveStatus.textContent = savedLabel(draft.savedAt);
      saveStatus.classList.add('is-saved');
      return true;
    } catch {
      saveStatus.textContent = 'Could not save in this browser';
      saveStatus.classList.remove('is-saved');
      return false;
    }
  };
  let saveTimer;
  const scheduleSave = () => {
    unsaved = true;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveDraft, 800);
  };
  form.addEventListener('input', scheduleSave);
  form.addEventListener('change', scheduleSave);

  // Opening the preview or the example saves first, so the preview shows
  // everything typed so far.
  document.querySelectorAll('[data-save-before-open]').forEach((link) => {
    link.addEventListener('click', () => {
      clearTimeout(saveTimer);
      saveDraft();
    });
  });

  // Closing or leaving the tab saves straight away, so the last few
  // keystrokes are never lost.
  window.addEventListener('pagehide', () => {
    clearTimeout(saveTimer);
    if (unsaved) saveDraft();
  });

  const restoreDraft = () => {
    let draft;
    try {
      draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
    } catch {
      return;
    }
    if (!draft) return;
    namedFields().forEach((field) => {
      if (field.name in draft.fields) field.value = draft.fields[field.name];
    });
    saveStatus.textContent = savedLabel(draft.savedAt);
    saveStatus.classList.add('is-saved');
  };

  // Problem fields turn red on send, and back to normal once edited.
  const isProblem = (field) => !field.checkValidity()
    || (field.dataset.wordLimit && countWords(field.value) > Number(field.dataset.wordLimit));
  const clearMark = (event) => {
    event.target.classList.remove('is-invalid');
    if (!form.querySelector('.is-invalid')) error.hidden = true;
  };
  form.addEventListener('input', clearMark);
  form.addEventListener('change', clearMark);

  // Send for review
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const problems = [...form.elements].filter((field) => field.name && field.type !== 'hidden' && isProblem(field));
    if (problems.length) {
      problems.forEach((field) => field.classList.add('is-invalid'));
      const overLimit = problems.some((field) => field.validity.valid);
      error.textContent = overLimit
        ? 'Please check the fields marked in red: some are missing or over their word limit.'
        : 'Please fill in the fields marked in red.';
      error.hidden = false;
      problems[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
      problems[0].focus({ preventScroll: true });
      return;
    }
    error.hidden = true;
    clearTimeout(saveTimer);
    saveDraft();

    form.querySelector('[data-submission-title]').value = form.elements.country.value;

    // Opened from disk or a local server there is no Netlify to receive it.
    if (['localhost', '127.0.0.1', ''].includes(window.location.hostname)) {
      window.location.href = 'thanks.html?preview=1';
      return;
    }
    form.submit();
  });

  restoreDraft();
  limitedFields.forEach(updateCount);
})();
