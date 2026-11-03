import { countryRecords } from './national-movements-data.js';

const form = document.querySelector('[data-intake-form]');

if (form) {
  // Only countries with a movement have a page to fill in.
  form.querySelector('[data-intake-country]').append(...countryRecords
    .filter(([, , status]) => status !== 'none')
    .map(([, name]) => new Option(name, name)));

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  form.querySelectorAll('[data-word-limit]').forEach((field) => {
    const limit = Number(field.dataset.wordLimit);
    const counter = field.parentElement.querySelector('[data-word-count]');
    const update = () => {
      const words = countWords(field.value);
      counter.textContent = `${words} / ${limit} words`;
      counter.classList.toggle('wf-word-count-over', words > limit);
    };
    field.addEventListener('input', update);
    update();
  });

  const error = form.querySelector('[data-intake-error]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const overLimit = [...form.querySelectorAll('[data-word-limit]')]
      .some((field) => countWords(field.value) > Number(field.dataset.wordLimit));
    if (!form.checkValidity() || overLimit) {
      error.textContent = overLimit
        ? 'Some answers are over their word limit. Please shorten them.'
        : 'Please fill in the required fields marked with *.';
      error.hidden = false;
      return;
    }
    const sent = form.querySelector('[data-intake-sent]');
    [...form.children].forEach((element) => { element.hidden = element !== sent; });
    sent.hidden = false;
    sent.focus();
  });
}
