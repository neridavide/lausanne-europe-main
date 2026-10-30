const tabs = Array.from(document.querySelectorAll('[data-gathering-filter]'));
const items = Array.from(document.querySelectorAll('[data-gathering-item]'));
const status = document.querySelector('[data-gathering-filter-status]');

const labels = {
  all: 'all events',
  'lausanne-europe': 'Lausanne Europe events',
  'national-movements': 'National Movement events',
  ylg: 'YLG events',
};

const applyFilter = (filter) => {
  items.forEach((item) => {
    item.hidden = filter !== 'all' && item.dataset.gatheringCategory !== filter;
  });

  tabs.forEach((tab) => {
    const selected = tab.dataset.gatheringFilter === filter;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  if (status) status.textContent = `Showing ${labels[filter]}.`;
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => applyFilter(tab.dataset.gatheringFilter));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    applyFilter(tabs[nextIndex].dataset.gatheringFilter);
  });
});
