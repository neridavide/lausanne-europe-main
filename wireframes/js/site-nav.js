// Mobile menu: below the desktop breakpoint the header nav collapses behind a
// toggle button. The button is injected here so every page gets it from the
// shared script instead of repeating markup in each HTML file.
export function initSiteNav() {
  const header = document.querySelector('.wf-header');
  const headerInner = header?.querySelector('.wf-header-inner');
  const nav = headerInner?.querySelector('.wf-nav');
  if (!nav || headerInner.querySelector('.wf-nav-toggle')) return;

  const desktop = window.matchMedia('(min-width: 901px)');
  const toggle = document.createElement('button');
  nav.id ||= 'site-nav';
  toggle.type = 'button';
  toggle.className = 'wf-nav-toggle';
  toggle.setAttribute('aria-controls', nav.id);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span class="wf-nav-toggle-icon" aria-hidden="true"></span><span class="wf-nav-toggle-label">Menu</span>';
  nav.before(toggle);

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.wf-nav-toggle-label').textContent = open ? 'Close' : 'Menu';
    header.classList.toggle('wf-nav-open', open);
  };
  const isOpen = () => header.classList.contains('wf-nav-open');

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  desktop.addEventListener('change', () => setOpen(false));
}
