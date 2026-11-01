import { access, mkdir, writeFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';

const source = 'https://www.lausanneeurope.org/wp-json/wp/v2';
const output = new URL('../wireframes/', import.meta.url);
const assetDirectory = new URL('assets/legacy/', output);
const articleCategoryId = 75;
// Linked from the legacy Conversation page, though filed outside the Articles category or the podcast feed.
const conversationExtras = new Set(['the-church-in-a-sexualised-culture', 'the-legacy-of-john-stott-through-the-lausanne-movement', 'episode-1-the-conversation']);
// Items without a featured image or podcast cover on the legacy site.
const imageOverrides = { 'lausanne-global-classroom-nominalism': 'https://lausanne.org/wp-content/uploads/2024/03/table-discussion.jpg' };
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

const decodeHTML = (value = '') => value
  .replace(/&#8211;/g, '–')
  .replace(/&#8217;/g, '’')
  .replace(/&#8220;/g, '“')
  .replace(/&#8221;/g, '”')
  .replace(/&#124;/g, '|')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#039;/g, "'");

const stripHTML = (value = '') => decodeHTML(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
const normalise = (value) => stripHTML(value).toLocaleLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const htmlEscape = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

const requestJSON = async (path) => {
  const response = await fetch(`${source}${path}`);
  if (!response.ok) throw new Error(`Could not read ${path}: ${response.status}`);
  return response.json();
};

const requestText = async (url) => {
  const response = await fetch(url, { headers: { 'User-Agent': userAgent } });
  if (!response.ok) throw new Error(`Could not read ${url}: ${response.status}`);
  return response.text();
};

const extensionFor = (url, fallback = '.jpg') => {
  const extension = extname(new URL(url).pathname).toLocaleLowerCase();
  return /^\.(?:avif|gif|jpe?g|m4a|mp3|pdf|png|svg|webp)$/.test(extension) ? extension : fallback;
};

const fetchAsset = async (url, name, kind = 'image') => {
  if (!url) return null;
  const extension = extensionFor(url, kind === 'audio' ? '.mp3' : '.jpg');
  const filename = `${name}${extension}`.replace(/[^a-z0-9._-]/gi, '-');
  const destination = new URL(filename, assetDirectory);
  try {
    await access(destination);
    return `assets/legacy/${filename}`;
  } catch { /* Fetch the asset when it has not already been copied. */ }

  let response;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    response = await fetch(url.replace('http://', 'https://'), { headers: { 'User-Agent': userAgent } });
    if (response.ok) break;
    if (response.status !== 429 || attempt === 4) throw new Error(`Could not download ${url}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
  }
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  return `assets/legacy/${filename}`;
};

// Cornerstone pages render their body server-side, so the API only returns an empty #cs-content wrapper.
const usesCornerstone = (content) => /<div id="cs-content" class="cs-content">\s*<\/div>/.test(content);

const extractCornerstone = (html) => {
  const start = html.indexOf('id="cs-content"');
  if (start < 0) return '';
  const open = html.indexOf('>', start) + 1;
  let depth = 1;
  for (const match of html.slice(open).matchAll(/<(\/?)div\b/gi)) {
    depth += match[1] ? -1 : 1;
    if (depth === 0) return html.slice(open, open + match.index);
  }
  return '';
};

const cornerstoneToHTML = (markup) => markup
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<h1 class="x-text-content-text-primary">([\s\S]*?)<\/h1>/gi, (tag, text) => `<h2>${text.trim()}</h2>`)
  .replace(/<div class="x-text x-content[^"]*">([\s\S]*?)<\/div>/gi, (block, text) => {
    const parts = text.split(/(<(?:ol|ul)\b[\s\S]*?<\/(?:ol|ul)>)/i)
      .flatMap((part) => (/^<(?:ol|ul)\b/i.test(part) ? [part] : part.split(/(?:\s*<br\s*\/?>\s*){2,}/i)))
      .map((part) => part.trim().replace(/^(?:<br\s*\/?>\s*)+|(?:\s*<br\s*\/?>)+$/gi, ''))
      .filter(Boolean);
    return parts.map((part) => {
      if (/^<(?:ol|ul)\b/i.test(part)) return part;
      return /^Photo by\b/i.test(stripHTML(part)) ? `<figcaption>${part}</figcaption>` : `<p>${part}</p>`;
    }).join('\n');
  })
  .replace(/<\/?(?:span|div)\b[^>]*>/gi, '')
  // A headline straight after another one is a subtitle.
  .replace(/(<\/h[23]>)\s*<h2>([\s\S]*?)<\/h2>/g, '$1\n<h3>$2</h3>')
  .replace(/(<\/h3>)\s*<h2>([\s\S]*?)<\/h2>/g, '$1\n<h3>$2</h3>');

const parseFeed = (xml) => [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
  const item = match[1];
  const title = (item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || '';
  const enclosure = (item.match(/<enclosure\s+url="([^"]+)"/) || [])[1];
  const duration = (item.match(/<itunes:duration>([^<]+)<\/itunes:duration>/) || [])[1];
  return { title: normalise(title), enclosure, duration };
}).filter((item) => item.enclosure);

const topicsFor = ({ title, summary }) => {
  const text = `${title} ${summary}`.toLocaleLowerCase();
  const topics = ['Europe & Mission'];
  const add = (topic, expression) => { if (expression.test(text)) topics.push(topic); };
  add('Diaspora & Migration', /refugee|migration|migrant|muslim|diaspora/);
  add('Digital Life', /digital|online|media|internet|zoom/);
  add('Justice & Creation Care', /climate|planet|creation|environment|justice|persecut/);
  add('Leadership', /leader|leadership|mobilis|church plant/);
  add('Church & Community', /church|discipleship|community|pastor|youth/);
  add('Faith & Culture', /culture|secular|sexual|idea|nominal|religion/);
  return [...new Set(topics)];
};

// Name inline assets after their source file so re-runs reuse the same local copy.
const assetName = (slug, url) => `${slug}-${basename(new URL(url).pathname, extname(new URL(url).pathname)).toLocaleLowerCase()}`;

const withLimitedConcurrency = async (items, limit, callback) => {
  const results = [];
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await callback(items[index], index);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
};

const rewriteContent = (content, internalSlugs, imageMap) => {
  let output = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/\s(?:on\w+|style|class|id|srcset|sizes)=("[^"]*"|'[^']*')/gi, '')
    .replace(/<\/?(?:div|section|article|figure)(?:\s[^>]*)?>/gi, '')
    .replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, '<p class="wf-article-caption">$1</p>');

  output = output.replace(/<img\b[^>]*\bsrc=("|')([^"']+)\1[^>]*>/gi, (tag, quote, url) => (
    imageMap.has(url.replace('http://', 'https://')) ? tag : ''
  ));

  output = output.replace(/(src|href)=("|')([^"']+)(\2)/gi, (full, attribute, quote, url) => {
    const local = imageMap.get(url.replace('http://', 'https://'));
    if (local) return `${attribute}=${quote}${local}${quote}`;
    if (attribute.toLocaleLowerCase() === 'href') {
      try {
        const parsed = new URL(url, 'https://www.lausanneeurope.org');
        const slug = parsed.pathname.replace(/^\/+|\/+$/g, '');
        if (/^(?:www\.)?lausanneeurope\.org$/i.test(parsed.hostname) && internalSlugs.has(slug)) return `${attribute}=${quote}story-article.html?slug=${encodeURIComponent(slug)}${quote}`;
      } catch { /* Retain malformed source URLs as text links. */ }
    }
    return full;
  });

  return output.replace(/<a\b(?![^>]*\btarget=)([^>]*)>/gi, '<a$1 target="_blank" rel="noopener noreferrer">');
};

const main = async () => {
  await mkdir(assetDirectory, { recursive: true });
  const [articles, podcasts, feed, users] = await Promise.all([
    requestJSON('/posts?per_page=100&_embed=1'),
    requestJSON('/podcast?per_page=100&_embed=1'),
    requestText('https://www.lausanneeurope.org/podcast/feed/'),
    requestJSON('/users?per_page=100&context=embed')
  ]);
  const audioByTitle = new Map(parseFeed(feed).map((item) => [item.title, item]));
  const actualArticles = articles.filter((item) => item.categories.includes(articleCategoryId) || conversationExtras.has(item.slug));
  const actualPodcasts = podcasts.filter((item) => audioByTitle.has(normalise(item.title.rendered)) || (conversationExtras.has(item.slug) && item.meta?.audio_file));
  for (const item of actualPodcasts) {
    if (!audioByTitle.has(normalise(item.title.rendered))) audioByTitle.set(normalise(item.title.rendered), { enclosure: item.meta.audio_file, duration: item.meta.duration || null });
  }
  await withLimitedConcurrency([...actualArticles, ...actualPodcasts].filter((item) => usesCornerstone(item.content.rendered)), 2, async (item) => {
    item.content.rendered = cornerstoneToHTML(extractCornerstone(await requestText(item.link)));
    console.log(`Read Cornerstone body for ${item.slug}`);
  });
  const items = [
    ...actualArticles.map((item) => ({ ...item, resourceType: 'Articles' })),
    ...actualPodcasts.map((item) => ({ ...item, resourceType: 'Podcasts' }))
  ];
  const internalSlugs = new Set(items.map((item) => item.slug));
  const imageMap = new Map();
  const assetJobs = [];
  const authors = new Map(users.map((user) => [decodeHTML(user.name), user]));
  const usedAuthorNames = new Set(items.map((item) => decodeHTML(item._embedded?.author?.[0]?.name || 'Lausanne Europe')));

  const heroFor = (item) => item._embedded?.['wp:featuredmedia']?.[0]?.source_url || item.meta?.cover_image || imageOverrides[item.slug] || null;

  for (const item of items) {
    const hero = heroFor(item);
    if (hero) assetJobs.push({ url: hero, name: `${item.slug}-hero`, kind: 'image' });
    for (const match of item.content.rendered.matchAll(/<img[^>]+\bsrc=("|')([^"']+)\1/gi)) assetJobs.push({ url: match[2], name: assetName(item.slug, match[2]), kind: 'image' });
    for (const match of item.content.rendered.matchAll(/href=("|')(https?:\/\/(?:www\.)?lausanneeurope\.org\/wp-content\/[^"']+)\1/gi)) assetJobs.push({ url: match[2], name: assetName(item.slug, match[2]), kind: 'document' });
    if (item.resourceType === 'Podcasts') {
      const audio = audioByTitle.get(normalise(item.title.rendered));
      if (audio?.enclosure) assetJobs.push({ url: audio.enclosure, name: `${item.slug}-audio`, kind: 'audio' });
    }
  }

  for (const [name, author] of authors) {
    if (!usedAuthorNames.has(name)) continue;
    const avatar = author.simple_local_avatar?.['400'] || author.avatar_urls?.['96'];
    if (avatar) assetJobs.push({ url: avatar, name: `author-${author.slug}`, kind: 'image' });
  }

  const uniqueJobs = [...new Map(assetJobs.map((job) => [job.url.replace('http://', 'https://'), job])).values()];
  console.log(`Migrating ${actualArticles.length} articles and ${actualPodcasts.length} podcasts with ${uniqueJobs.length} local assets.`);
  await withLimitedConcurrency(uniqueJobs, 2, async (job, index) => {
    try {
      const local = await fetchAsset(job.url, job.name, job.kind);
      imageMap.set(job.url.replace('http://', 'https://'), local);
      console.log(`Downloaded ${index + 1}/${uniqueJobs.length}: ${basename(new URL(job.url).pathname)}`);
    } catch (error) {
      console.warn(`Skipped ${basename(new URL(job.url).pathname)}: ${error.message}`);
    }
  });

  const content = {};
  const resources = items.map((item) => {
    const bodyBeforeCleanup = item.resourceType === 'Podcasts'
      ? item.content.rendered.replace(/<div id="podcast-subscribe-button[\s\S]*/i, '')
      : item.content.rendered;
    const hero = heroFor(item);
    const audio = item.resourceType === 'Podcasts' ? audioByTitle.get(normalise(item.title.rendered)) : null;
    const body = rewriteContent(bodyBeforeCleanup, internalSlugs, imageMap);
    const title = stripHTML(item.title.rendered);
    const author = decodeHTML(item._embedded?.author?.[0]?.name || 'Lausanne Europe');
    const authorRecord = authors.get(author);
    const avatar = authorRecord?.simple_local_avatar?.['400'] || authorRecord?.avatar_urls?.['96'];
    const authorBio = authorRecord?.description ? stripHTML(authorRecord.description) : null;
    const image = hero ? imageMap.get(hero.replace('http://', 'https://')) : null;
    const words = stripHTML(body).split(/\s+/).filter(Boolean).length;
    content[item.slug] = {
      slug: item.slug,
      category: item.resourceType,
      title,
      author,
      authorBio,
      authorImage: avatar ? imageMap.get(avatar.replace('http://', 'https://')) || null : null,
      date: item.date.slice(0, 10),
      image,
      imageAlt: title,
      body,
      audio: audio?.enclosure ? imageMap.get(audio.enclosure.replace('http://', 'https://')) : null,
      duration: audio?.duration || null,
      readTime: Math.max(1, Math.ceil(words / 220))
    };
    return {
      category: item.resourceType,
      publisher: 'Lausanne Europe',
      date: item.date.slice(0, 10),
      title,
      description: stripHTML(item.excerpt.rendered),
      topics: topicsFor({ title, summary: stripHTML(item.excerpt.rendered) }),
      url: `story-article.html?slug=${encodeURIComponent(item.slug)}`,
      image: image || 'assets/lausanne-europe-logo.png',
      internal: true
    };
  });

  const header = '// Generated from the legacy Lausanne Europe WordPress API. Re-run scripts/migrate-legacy-conversation.mjs to refresh.\n';
  await writeFile(new URL('js/legacy-content.js', output), `${header}export const legacyContent = ${JSON.stringify(content, null, 2)};\n`);
  await writeFile(new URL('js/legacy-resources.js', output), `${header}export const legacyResources = ${JSON.stringify(resources, null, 2)};\n`);
  console.log(`Wrote ${resources.length} internal resources and ${Object.keys(content).length} content records.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
