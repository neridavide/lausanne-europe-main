// Example and preview pages: the English version is prepared by the
// Lausanne Europe team, so the English button explains that in a tooltip
// instead of switching the page.
(() => {
  const button = document.querySelector('[data-english]');
  const tooltip = document.querySelector('[data-english-tooltip]');
  if (!button || !tooltip) return;

  let hideTimer;
  const hide = () => {
    clearTimeout(hideTimer);
    tooltip.hidden = true;
  };
  const show = () => {
    tooltip.hidden = false;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 6000);
  };

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    if (tooltip.hidden) show();
    else hide();
  });
  document.addEventListener('click', hide);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hide();
  });
})();
