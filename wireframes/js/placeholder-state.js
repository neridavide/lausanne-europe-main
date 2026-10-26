(() => {
  const footerMarkup = `
    <div class="wf-footer-inner">
      <div>
        <div class="wf-logo"><span class="wf-logo-mark"></span>Lausanne Europe</div>
        <p class="wf-copy" style="margin:0;font-size:14px;color:rgba(255,255,255,0.65)">Connecting leaders across Europe to collaborate in God&rsquo;s mission.</p>
      </div>
      <div><h4>Engage</h4><ul><li><a href="national-movements.html">National Movements</a></li><li><a href="gatherings.html">Gatherings</a></li><li><a href="get-involved.html">Get Involved</a></li><li><a href="newsletter.html">Stay connected</a></li></ul></div>
      <div><h4>Resources</h4><ul><li><a href="conversation.html">Conversation</a></li></ul></div>
      <div><h4>About</h4><ul><li><a href="about.html">Who we are</a></li><li><a href="contact.html">Contact</a></li><li><a href="donate.html">Donate</a></li><li><a href="legal.html">Privacy</a></li></ul></div>
    </div>
    <div class="wf-footer-bottom"><span>© Lausanne Europe</span><span><a href="legal.html">Privacy | Cookies</a></span></div>`;
  const footer = document.querySelector('.wf-footer');

  if (footer) {
    footer.innerHTML = footerMarkup;
  } else {
    document.body.insertAdjacentHTML('beforeend', `<footer class="wf-footer">${footerMarkup}</footer>`);
  }

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
