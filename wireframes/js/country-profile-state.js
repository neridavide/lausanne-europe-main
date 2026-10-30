import { countryRecords, countryFlagCodes } from './national-movements-data.js';

const params = new URLSearchParams(window.location.search);
const country = params.get('country');
const status = params.get('status');

if (country) {
  document.querySelectorAll('[data-country-name]').forEach((element) => {
    element.textContent = country;
    element.classList.remove('wf-pending');
  });
  document.querySelectorAll('[data-country-status]').forEach((element) => {
    element.textContent = status ? `${status.charAt(0).toUpperCase()}${status.slice(1)} movement` : 'National movement';
    element.classList.remove('wf-pending');
  });
  document.title = `${country} | Lausanne Europe`;

  // Countries with a movement get their coordinator preselected on the contact
  // form; the rest are routed to Lausanne Europe about starting one.
  const record = countryRecords.find(([, name]) => name === country);
  const contactHref = record && record[2] !== 'none'
    ? `contact.html?to=nm-${countryFlagCodes.get(record[0])}`
    : 'contact.html?topic=movement';
  document.querySelectorAll('[data-contact-movement]').forEach((link) => {
    link.href = contactHref;
    if (record?.[2] === 'none') link.textContent = 'Help start a movement';
  });
}
