// Preview page: renders the draft the form saves in this browser. Anything
// still empty shows grey placeholder text, except the optional Ways to
// engage, which only appears once filled in. It re-renders when the form,
// open in another tab, saves again.
(() => {
  const DRAFT_KEY = 'lausanne-national-page-draft';
  const slot = (name) => document.querySelector(`[data-preview="${name}"]`);

  const readDraft = () => {
    try {
      return JSON.parse(localStorage.getItem(DRAFT_KEY)) ?? {};
    } catch {
      return {};
    }
  };

  // Shows the value, or the placeholder in grey when it is empty.
  const setText = (element, value, placeholder) => {
    element.textContent = value || placeholder;
    element.classList.toggle('nf-empty', !value);
  };

  const paragraphs = (text) => text.split(/\n\s*\n|\n/).map((part) => part.trim()).filter(Boolean);

  const render = () => {
    const draft = readDraft();
    const fields = draft.fields ?? {};
    const value = (name) => (fields[name] ?? '').toString().trim();
    const country = value('country');
    const movement = value('movementName');

    setText(slot('country'), country, 'Your country');
    document.title = `Preview: ${country || 'your page'} | Lausanne Europe`;
    setText(slot('language'), value('language'), 'Your language');
    slot('language').classList.remove('nf-empty');

    const about = paragraphs(value('about'));
    slot('about').replaceChildren(...(about.length ? about : [
      'Your text about the movement will appear here: when and how it started, who is involved, your vision and what you are doing now.',
    ]).map((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      if (!about.length) paragraph.classList.add('nf-empty');
      return paragraph;
    }));

    const engage = ['engage1', 'engage2', 'engage3'].map(value).filter(Boolean);
    slot('engageList').replaceChildren(...engage.map((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    slot('engage').hidden = !engage.length;

    const name = value('coordinatorName');
    setText(slot('coordinatorName'), name, 'Your name');
    setText(slot('coordinatorRole'), country && `Communications Coordinator | ${country}`, 'Communications Coordinator | Your country');

    slot('visit').textContent = movement ? `Visit ${movement}` : 'Visit your movement';
    slot('churchTitle').textContent = `The church in ${country || 'your country'}`;
    setText(slot('church'), value('church'), 'Your text about the church in your country will appear here.');
  };

  render();
  window.addEventListener('storage', (event) => {
    if (event.key === DRAFT_KEY) render();
  });
})();
