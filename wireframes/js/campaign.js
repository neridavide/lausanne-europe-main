// The one switch for giving campaigns.
// Set `campaign` to null when nothing is running: the site-wide strip, the panel on the
// Donate page and any [data-campaign] block disappear, leaving only the footer Donate link.
// A campaign also switches itself off the day after its `ends` date.
export const campaign = {
  id: 'le27-scholarships',
  title: 'LE27 scholarship fund',
  strip: 'Help a leader get to LE27: the scholarship fund is open.',
  summary: 'Many national movement and younger leaders cannot cover their own travel and accommodation. Scholarships make sure every nation and every YLG Europe cohort can be in the room in November 2027.',
  goal: '[Goal TBC]',
  ends: '2027-10-31',
  page: 'gatherings/le27.html#support',
  // Replace with the campaign's own Stripe link once it exists.
  donateUrl: 'https://buy.stripe.com/bJe4gAckA7vE9cvfaL0co01',
};

const isLive = (item) => Boolean(item) && new Date() <= new Date(`${item.ends}T23:59:59`);

const dismissKey = (item) => `le-campaign-dismissed:${item.id}`;

const wasDismissed = (item) => {
  try {
    return localStorage.getItem(dismissKey(item)) === '1';
  } catch {
    return false;
  }
};

const rememberDismissed = (item) => {
  try {
    localStorage.setItem(dismissKey(item), '1');
  } catch {
    // Private mode or blocked storage: the strip simply comes back on the next page.
  }
};

export function renderCampaign(siteRoot) {
  const active = isLive(campaign) ? campaign : null;
  const resolve = (path) => new URL(path, siteRoot).href;

  // Blocks written into a page for one campaign (e.g. the LE27 giving block) stay hidden otherwise.
  document.querySelectorAll('[data-campaign]').forEach((element) => {
    element.hidden = element.dataset.campaign !== active?.id;
  });

  if (!active) return;

  document.querySelectorAll('[data-campaign-donate]').forEach((link) => {
    link.href = active.donateUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('[data-campaign-panel]').forEach((panel) => {
    panel.innerHTML = `
      <div>
        <p class="wf-label">Current need</p>
        <h2>${active.title}</h2>
        <p>${active.summary}</p>
        <p class="wf-campaign-meta"><span>Goal: <strong>${active.goal}</strong></span><span>Open until ${new Date(active.ends).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
      </div>
      <div class="wf-campaign-panel-actions">
        <a class="wf-btn wf-btn-primary" href="${active.donateUrl}" target="_blank" rel="noopener noreferrer">Give to the ${active.title} <span aria-hidden="true">↗</span></a>
        <a class="wf-campaign-more" href="${resolve(active.page)}">Why it matters <span aria-hidden="true">›</span></a>
      </div>`;
    panel.hidden = false;
  });

  // No strip on the campaign's own page or on the Donate page, which already carry the ask.
  const campaignPage = new URL(resolve(active.page)).pathname;
  const here = window.location.pathname;
  const onCampaignPage = here === campaignPage || here.endsWith('/donate.html');
  const header = document.querySelector('.wf-header');
  if (onCampaignPage || !header || wasDismissed(active)) return;

  header.insertAdjacentHTML('afterend', `
    <aside class="wf-campaign-strip" aria-label="${active.title}">
      <p><span>${active.strip}</span> <a href="${resolve(active.page)}">Find out more <span aria-hidden="true">›</span></a></p>
      <button type="button" aria-label="Hide this message">×</button>
    </aside>`);

  const strip = header.nextElementSibling;
  strip.querySelector('button').addEventListener('click', () => {
    rememberDismissed(active);
    strip.remove();
  });
}
