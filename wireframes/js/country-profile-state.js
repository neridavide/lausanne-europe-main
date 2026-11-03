import { countryRecords, countryFlagCodes, flagEmoji, statusLabel } from './national-movements-data.js';
import { countryProfiles } from './country-profiles.js';
import { socialIcons } from './social-icons.js';
import { visitorCountryCode } from './visitor-country.js';

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

  // Whole sections a profile leaves out are hidden; single fields keep their placeholder.
  document.querySelectorAll('[data-profile-section]').forEach((element) => {
    element.hidden = !profile[element.dataset.profileSection]?.length;
  });

  document.querySelectorAll('[data-profile-take-part]').forEach((list) => {
    list.replaceChildren(...(profile.takePart ?? []).map((item) => {
      const element = document.createElement('li');
      element.textContent = item;
      return element;
    }));
  });

  document.querySelectorAll('[data-profile-field]').forEach((element) => {
    const value = element.dataset.profileField.split('.').reduce((field, key) => field?.[key], profile);
    if (value) fill(element, value);
  });
  document.querySelectorAll('[data-profile-link]').forEach((link) => { link.href = profile.connect.href; });

  // Social media links sit under the website button, when a profile has any,
  // as brand icons; a network without an icon falls back to its name.
  document.querySelectorAll('[data-profile-social]').forEach((list) => {
    list.replaceChildren(...(profile.social ?? []).map(({ label, href }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = href;
      const icon = socialIcons[label];
      if (icon) {
        link.className = 'wf-profile-social-icon';
        link.setAttribute('aria-label', label);
        link.title = label;
        link.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${icon}"/></svg>`;
      } else {
        link.textContent = label;
      }
      item.append(link);
      return item;
    }));
  });
};

// A profile with a national-language version gets a switch between it and
// English. The choice comes from ?lang=, then the visitor's last choice for
// this country; otherwise visitors in the country get the national language
// and everyone else English.
const languageKey = `lausanne-profile-lang-${country}`;

const pickLanguage = (national, countryCode) => {
  const options = ['en', national];
  const requested = params.get('lang');
  if (options.includes(requested)) return requested;
  try {
    const saved = localStorage.getItem(languageKey);
    if (options.includes(saved)) return saved;
  } catch {
    // Storage can be unavailable; fall through to the visitor's location.
  }
  return countryCode && visitorCountryCode() === countryCode ? national : 'en';
};

const renderInLanguage = (profile, language) => {
  renderProfile(language === 'en' ? profile : { ...profile, ...profile.translation });
  document.querySelectorAll('[data-translatable]').forEach((element) => { element.lang = language; });
  document.querySelectorAll('[data-lang-switch] button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.lang === language));
  });
};

const setupLanguageSwitch = (profile, countryCode) => {
  const national = profile.language.code;
  const languages = [[national, profile.language.label], ['en', 'English']];
  const switcher = document.querySelector('[data-lang-switch]');
  switcher.replaceChildren(...languages.map(([code, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.lang = code;
    button.textContent = label;
    button.addEventListener('click', () => {
      renderInLanguage(profile, code);
      try { localStorage.setItem(languageKey, code); } catch { /* not remembered */ }
      const url = new URL(window.location.href);
      url.searchParams.set('lang', code);
      history.replaceState(null, '', url);
    });
    return button;
  }));
  switcher.hidden = false;
  renderInLanguage(profile, pickLanguage(national, countryCode));
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
  } else {
    // A country outside the map data (the fictional Genovia example) has no flag.
    document.querySelectorAll('[data-country-flag]').forEach((element) => element.remove());
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

    if (profile?.translation) setupLanguageSwitch(profile, record && countryFlagCodes.get(record[0]));
    else if (profile) renderProfile(profile);
    // Related content only appears once there is something to show.
    if (profile?.related?.length) renderRelated(profile.related);
  }
}
