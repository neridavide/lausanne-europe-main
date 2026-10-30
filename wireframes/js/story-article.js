import { legacyContent } from './legacy-content.js';
import { legacyResources } from './legacy-resources.js';

const root = document.querySelector('[data-article-root]');
const slug = new URLSearchParams(window.location.search).get('slug');
const content = slug ? legacyContent[slug] : null;

const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
const formatDate = (date) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`));

const relatedResources = (resource) => legacyResources
  .filter((item) => item.category === resource.category && item.url !== `story-article.html?slug=${resource.slug}`)
  .slice(0, 3);

if (!content) {
  document.title = 'Resource not found | Lausanne Europe';
  root.innerHTML = `
    <nav class="wf-breadcrumb"><a href="homepage.html">Home</a> / <a href="conversation.html">Resources</a> / Resource not found</nav>
    <section class="wf-article-not-found">
      <span class="wf-tag">Resource</span>
      <h1 class="wf-page-title">We couldn’t find that resource.</h1>
      <p><a class="wf-btn wf-btn-primary" href="conversation.html">Return to Resources</a></p>
    </section>`;
} else {
  const listeningTime = content.duration ? ` · ${escapeHTML(content.duration)} listen` : '';
  const detail = content.category === 'Podcasts' ? 'Podcast' : 'Article';
  const metadata = `By ${escapeHTML(content.author)} <span aria-hidden="true">|</span> ${formatDate(content.date)}${content.category === 'Articles' ? ` <span aria-hidden="true">|</span> ${content.readTime} min read` : listeningTime}`;
  const authorBio = content.authorBio ? `
        <section class="wf-author-bio" aria-labelledby="author-bio-heading">
          <p class="wf-author-bio-label">Author's bio</p>
          <div class="wf-author-bio-content ${content.authorImage ? '' : 'wf-author-bio-content--no-image'}">
            ${content.authorImage ? `<img src="${content.authorImage}" alt="${escapeHTML(content.author)}">` : ''}
            <div>
              <h2 id="author-bio-heading">${escapeHTML(content.author)}</h2>
              <p>${escapeHTML(content.authorBio)}</p>
            </div>
          </div>
        </section>` : '';
  const articleHeader = content.image ? `
    <header class="wf-article-hero">
      <img src="${content.image}" alt="${escapeHTML(content.imageAlt)}">
      <div class="wf-article-hero-content">
        <p class="wf-article-kind"><span aria-hidden="true"></span>${detail}</p>
        <h1 class="wf-page-title">${escapeHTML(content.title)}</h1>
        <p class="wf-article-meta">${metadata}</p>
      </div>
    </header>` : `
    <header class="wf-article-no-hero-header">
      <div>
        <nav class="wf-breadcrumb"><a href="homepage.html">Home</a> / <a href="conversation.html">Resources</a></nav>
        <p class="wf-article-kind"><span aria-hidden="true"></span>${detail}</p>
        <h1 class="wf-page-title">${escapeHTML(content.title)}</h1>
        <p class="wf-article-meta">${metadata}</p>
      </div>
    </header>`;
  document.title = `${content.title} | Lausanne Europe`;
  root.innerHTML = `
    <article class="wf-article ${content.image ? 'wf-article--with-hero' : 'wf-article--no-hero'}">
      ${articleHeader}
      <div class="wf-article-content">
      ${content.audio ? `
        <section class="wf-podcast-player" aria-label="Podcast player">
          <span class="wf-label">Listen</span>
          <audio controls preload="metadata" src="${content.audio}">Your browser does not support audio playback.</audio>
        </section>` : ''}
      <div class="wf-article-body">${content.body}</div>
      ${authorBio}
      <footer class="wf-article-footer"><a href="conversation.html" class="wf-btn wf-btn-secondary">Back to Resources</a></footer>
      </div>
    </article>
    <div class="wf-article-related-wrap"><section class="wf-article-related" aria-labelledby="related-heading">
        <h2 id="related-heading" class="wf-section-heading">More resources</h2>
        <div class="wf-grid wf-grid-3">
          ${relatedResources(content).map((item) => `<a class="wf-card wf-article-related-card" href="${item.url}"><img class="wf-card-img" src="${item.image}" alt=""><span class="wf-card-body"><span class="wf-tag">${item.category === 'Podcasts' ? 'Podcast' : 'Article'}</span><h3>${escapeHTML(item.title)}</h3></span></a>`).join('')}
        </div>
      </section></div>`;
}
