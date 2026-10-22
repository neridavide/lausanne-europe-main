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
}
