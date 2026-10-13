(() => {
  const isPlaceholder = (value) => /^\[[\s\S]+\]$/.test(value.trim());

  document.querySelectorAll('body *').forEach((element) => {
    const ownText = Array.from(element.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent)
      .join('')
      .trim();

    if (isPlaceholder(ownText)) element.classList.add('wf-pending');
  });

  document.querySelectorAll('[placeholder]').forEach((element) => {
    if (isPlaceholder(element.getAttribute('placeholder'))) {
      element.classList.add('wf-pending');
    }
  });

  document.querySelectorAll('select').forEach((select) => {
    const options = Array.from(select.options);
    if (options.length && options.every((option) => isPlaceholder(option.textContent))) {
      select.classList.add('wf-pending');
    }
  });
})();
