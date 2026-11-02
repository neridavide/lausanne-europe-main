import { countryRecords, countryFlagCodes, flagEmoji, statusLabel } from './national-movements-data.js';
import { countryProfiles } from './country-profiles.js';

const params = new URLSearchParams(window.location.search);
const country = params.get('country');

// Filled-in elements lose the placeholder styling.
const fill = (element, text) => {
  element.textContent = text;
  element.classList.remove('wf-pending', 'wf-copy', 'wf-copy-block');
};

const renderProfile = (profile) => {
  document.querySelectorAll('[data-country-name]').forEach((element) => element.classList.remove('wf-copy'));

  const about = document.querySelector('[data-profile-about]');
  about.replaceChildren(...profile.about.map((paragraph) => {
    const element = document.createElement('p');
    element.textContent = paragraph;
    return element;
  }));

  document.querySelectorAll('[data-profile-field]').forEach((element) => {
    const value = element.dataset.profileField.split('.').reduce((field, key) => field?.[key], profile);
    if (value) fill(element, value);
  });
  document.querySelectorAll('[data-profile-link]').forEach((link) => { link.href = profile.connect.href; });

  if (profile.coordinator?.photo) {
    document.querySelectorAll('[data-coordinator-photo]').forEach((element) => {
      const photo = document.createElement('img');
      photo.className = element.className;
      photo.src = profile.coordinator.photo;
      photo.alt = profile.coordinator.name;
      element.replaceWith(photo);
    });
  }
};

const renderRelated = (items) => {
  const list = document.querySelector('[data-profile-related-list]');
  list.replaceChildren(...items.map(({ type, title, href, image }) => {
    const card = document.createElement('a');
    card.className = 'wf-card';
    card.href = href;
    card.innerHTML = '<div class="wf-card-img wf-card-img-photo"></div><div class="wf-card-body"><span class="wf-tag"></span><h3></h3></div>';
    card.querySelector('.wf-card-img').style.backgroundImage = `url("${image}")`;
    card.querySelector('.wf-tag').textContent = type;
    card.querySelector('h3').textContent = title;
    return card;
  }));
  list.closest('[data-profile-related]').hidden = false;
};

if (country) {
  // The shared data decides the status; the URL value is only a fallback.
  const record = countryRecords.find(([, name]) => name === country);
  const status = record?.[2] ?? params.get('status');
  const profile = countryProfiles[country];

  document.querySelectorAll('[data-country-name]').forEach((element) => {
    element.textContent = country;
    element.classList.remove('wf-pending');
  });
  document.querySelectorAll('[data-country-status]').forEach((element) => {
    element.textContent = statusLabel(status) ?? 'National movement';
    element.classList.remove('wf-pending', 'wf-copy');
    if (statusLabel(status)) element.classList.add('wf-status', `wf-status-${status}`);
  });
  document.title = `${country} | Lausanne Europe`;

  if (record) {
    document.querySelectorAll('[data-country-flag]').forEach((element) => {
      element.removeAttribute('style');
      element.className = 'wf-country-mark wf-profile-flag';
      element.setAttribute('aria-hidden', 'true');
      element.textContent = flagEmoji(countryFlagCodes.get(record[0]));
    });
  }

  if (status === 'none') {
    // Without a movement there is no profile to write, so the empty blocks
    // give way to the invitation to help start one.
    document.querySelector('.wf-page-profile').classList.add('wf-profile-no-movement');
    document.querySelectorAll('[data-movement-content]').forEach((element) => { element.hidden = true; });
    document.querySelectorAll('[data-no-movement]').forEach((element) => { element.hidden = false; });
  } else {
    // Countries with a movement get their coordinator preselected on the contact
    // form; unknown ones are routed to Lausanne Europe.
    const contactHref = record
      ? `contact.html?to=nm-${countryFlagCodes.get(record[0])}`
      : 'contact.html?topic=movement';
    document.querySelectorAll('[data-contact-movement]').forEach((link) => { link.href = contactHref; });

    // Every movement has a coordinator line, so a missing profile falls back to
    // the default title; profiles can set a different one.
    document.querySelectorAll('[data-coordinator-role]').forEach((element) => {
      fill(element, `${profile?.coordinator?.title ?? 'Communications Coordinator'} | ${country}`);
    });

    if (profile) renderProfile(profile);
    // Related content only appears once there is something to show.
    if (profile?.related?.length) renderRelated(profile.related);
  }
}
