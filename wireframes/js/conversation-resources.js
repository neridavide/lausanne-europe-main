const resources = [
  {
    category: 'Articles',
    date: '2026-10-23',
    title: 'What Is Integral Mission? Why It Matters for the Church Today',
    description: 'A practical invitation to hold proclamation, discipleship, justice, and care for neighbours together in the mission of the local church.',
    topics: ['Europe & Mission', 'Justice & Creation Care'],
    url: 'https://lausanne.org/about/blog/relaunching-integral-mission',
    image: 'https://lausanne.org/wp-content/uploads/2026/10/feature-image-relaunching-integral-mission-holding-together-what-belongs-together-1024x685.png'
  },
  {
    category: 'Stories',
    date: '2026-10-16',
    title: 'Christian Mission in the Nordic Region: Four Stories of Hope',
    description: 'Four stories of faithful witness from the Nordic countries, where patient collaboration is opening fresh possibilities for mission.',
    topics: ['Europe & Mission', 'Church & Community', 'Leadership'],
    url: 'https://lausanne.org/about/blog/kingdom-impact-in-the-nordic-region',
    image: 'https://lausanne.org/wp-content/uploads/2026/10/featured-kingdom-impact-in-Nordic-countries-1024x685.png'
  },
  {
    category: 'Podcasts',
    date: '2026-10-07',
    title: 'Evangelicals and Orthodox Christians Together in Global Mission',
    description: 'A Lausanne Movement Podcast conversation about dialogue, unity, and shared witness between evangelical and Orthodox Christians.',
    topics: ['Europe & Mission', 'Church & Community'],
    url: 'https://lausanne.org/podcast/dialogue-and-unity-the-lausanne-orthodox-initiative',
    image: 'https://lausanne.org/wp-content/uploads/2026/10/91-LOI.jpg'
  },
  {
    category: 'Papers',
    date: '2026-09-11',
    title: 'State of Discipleship & Cross-cultural Missions in African Diaspora Churches in Britain',
    description: 'A missional paper exploring how African diaspora churches in Britain are forming disciples and engaging across cultures.',
    topics: ['Diaspora & Migration', 'Church & Community'],
    url: 'https://lausanne.org/missional-paper/state-of-discipleship-cross-cultural-missions',
    image: 'https://lausanne.org/wp-content/uploads/2026/09/featured-image-state-of-discipleship-cross-cultural-missions-in-african-diaspora-churches-in-britain-1024x685.png'
  },
  {
    category: 'Podcasts',
    date: '2026-08-17',
    title: 'Why Easter 2033 Cannot Be Business as Usual',
    description: 'Olivier Fleury considers how the global church can mobilise together to celebrate and proclaim the 2,000th anniversary of the resurrection.',
    topics: ['Europe & Mission', 'Leadership'],
    url: 'https://lausanne.org/podcast/why-easter-2033-cannot-be-business-as-usual',
    image: 'https://lausanne.org/wp-content/uploads/2026/08/Mobilising-the-Church-to-Proclaim-the-2000th-Anniversary-of-the-Resurrection.jpg'
  },
  {
    category: 'Papers',
    date: '2026-06-25',
    title: 'Digital Life: Reframing Christian Presence in a Technological World',
    description: 'A theological reflection on meaningful Christian presence, community, and witness in the digital spaces that shape European life.',
    topics: ['Digital Life', 'Church & Community'],
    url: 'https://lausanne.org/missional-paper/digital-life-reframing-christian-presence-in-a-technological-world',
    image: 'https://lausanne.org/wp-content/uploads/2026/06/lausanne-movement-missional-paper-17-.jpg'
  },
  {
    category: 'Articles',
    date: '2025-09-12',
    title: 'Rosh Hashanah: An Invitation to Meaningfully Engage with Our Jewish Neighbours',
    description: 'A thoughtful guide to building understanding, love, and witness with Jewish neighbours in a season of deep tension and uncertainty.',
    topics: ['Faith & Culture', 'Europe & Mission'],
    url: 'https://lausanne.org/about/blog/understanding-your-jewish-neighbour-rosh-hashanah',
    image: 'https://lausanne.org/wp-content/uploads/2025/09/Featured-Rosh-HaShanah-The-Feast-of-Trumpets-final-09102025.jpg'
  },
  {
    category: 'Articles',
    date: '2025-01-14',
    title: 'Saving a Planet in Crisis: Why the Church Should Take the Lead on Climate Action',
    description: 'Katharine Hayhoe on why creation care belongs at the heart of Christian love for vulnerable neighbours and public witness.',
    topics: ['Justice & Creation Care', 'Europe & Mission'],
    url: 'https://lausanne.org/global-analysis/loving-our-global-neighbour',
    image: 'https://lausanne.org/wp-content/uploads/2024/12/LGA-73-1-Loving_Our_Global_Neighbour_The_Church_Can_Inspire_Climate-featured.jpg'
  },
  {
    category: 'Stories',
    date: '2024-12-30',
    title: 'Discipling Ukrainian Children in the Midst of War',
    description: 'A story of resilient local ministry, care, and discipleship with children in Ukraine amid the disruption of war.',
    topics: ['Europe & Mission', 'Church & Community'],
    url: 'https://lausanne.org/about/blog/wartime-ministry-in-ukraine',
    image: 'https://lausanne.org/wp-content/uploads/2024/11/Article_Wartime_Ministry_Ukraine_Part1_main-image.jpg'
  },
  {
    category: 'Articles',
    date: '2024-04-08',
    title: 'Europe Regional Report',
    description: 'Major challenges and opportunities for re-evangelising Europe, from truth and community to digital life, climate justice, and demographic change.',
    topics: ['Europe & Mission', 'Faith & Culture'],
    url: 'https://lausanne.org/report/europe',
    image: 'https://lausanne.org/wp-content/uploads/2024/07/image-1-Restoring-Truth.jpg'
  },
  {
    category: 'Papers',
    date: '2023-10-12',
    title: 'People on the Move',
    description: 'An occasional paper offering a theology of migration and a framework for mission alongside people on the move.',
    topics: ['Diaspora & Migration', 'Europe & Mission'],
    url: 'https://lausanne.org/occasional-paper/lausanne-occasional-paper-people-on-the-move',
    image: 'https://lausanne.org/wp-content/uploads/2023/10/Lausanne-Movement-Occasional-Paper-70.png'
  },
  {
    category: 'Articles',
    date: '2022-11-23',
    title: 'Myths, Truths, and Opportunities for Mission in Europe',
    description: 'A call to understand Europe’s diverse local cultures and recognise the opportunities for gospel witness in each one.',
    topics: ['Europe & Mission', 'Faith & Culture'],
    url: 'https://lausanne.org/about/blog/myths-truths-and-opportunities-for-mission-in-europe',
    image: 'https://lausanne.org/wp-content/uploads/2022/11/myths-truths-europe-400x400-1.jpg'
  },
  {
    category: 'Articles',
    date: '2021-10-14',
    title: 'The Extraordinary Re-Evangelization of Europe',
    description: 'How diaspora churches, church-planting movements, and a new generation are bringing fresh hope to the continent.',
    topics: ['Europe & Mission', 'Diaspora & Migration'],
    url: 'https://lausanne.org/about/blog/the-extraordinary-re-evangelization-of-europe',
    image: 'https://lausanne.org/wp-content/uploads/2021/09/reevangelization-europe-400x400-1.jpg'
  }
];

const state = { category: 'All', topic: 'All', query: '' };
const feature = document.querySelector('[data-resource-feature]');
const grid = document.querySelector('[data-resource-grid]');
const count = document.querySelector('[data-resource-count]');
const search = document.querySelector('[data-resource-search]');
const topic = document.querySelector('[data-resource-topic]');
const tabs = [...document.querySelectorAll('[data-resource-category]')];

const formatDate = (date) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
const escapeHTML = (value) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
const resourceText = (resource) => [resource.title, resource.description, resource.category, ...resource.topics].join(' ').toLocaleLowerCase();

const resourceCard = (resource) => `
  <a class="wf-card wf-resource-card" href="${resource.url}" target="_blank" rel="noopener noreferrer">
    <img class="wf-card-img" src="${resource.image}" alt="" />
    <span class="wf-card-body">
      <span class="wf-tag">${escapeHTML(resource.category)}</span>
      <h3>${escapeHTML(resource.title)}</h3>
      <p>${escapeHTML(formatDate(resource.date))} · ${escapeHTML(resource.topics.join(' · '))}</p>
    </span>
  </a>`;

const featuredResource = (resource) => `
  <div class="wf-resource-feature-label">Featured · latest resource</div>
  <article class="wf-resource-feature-card">
    <img src="${resource.image}" alt="" />
    <div>
      <span class="wf-tag">${escapeHTML(resource.category)}</span>
      <p class="wf-resource-date">${escapeHTML(formatDate(resource.date))} · ${escapeHTML(resource.topics.join(' · '))}</p>
      <h2 id="featured-resource-heading">${escapeHTML(resource.title)}</h2>
      <p>${escapeHTML(resource.description)}</p>
      <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="wf-btn wf-btn-primary">Open on Lausanne Global <span aria-hidden="true">↗</span></a>
    </div>
  </article>`;

const render = () => {
  const matches = resources.filter((resource) => (
    (state.category === 'All' || resource.category === state.category)
    && (state.topic === 'All' || resource.topics.includes(state.topic))
    && (!state.query || resourceText(resource).includes(state.query))
  ));

  tabs.forEach((tab) => {
    const isActive = tab.dataset.resourceCategory === state.category;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  if (!matches.length) {
    feature.hidden = true;
    grid.innerHTML = '<p class="wf-resource-empty">No resources match those filters. Try another topic or search term.</p>';
    count.textContent = '0 resources';
    return;
  }

  feature.hidden = false;
  feature.innerHTML = featuredResource(matches[0]);
  grid.innerHTML = matches.slice(1).map(resourceCard).join('');
  count.textContent = `${matches.length} resource${matches.length === 1 ? '' : 's'}`;
};

tabs.forEach((tab) => tab.addEventListener('click', () => {
  state.category = tab.dataset.resourceCategory;
  render();
}));

topic.addEventListener('change', () => {
  state.topic = topic.value;
  render();
});

search.addEventListener('input', () => {
  state.query = search.value.trim().toLocaleLowerCase();
  render();
});

render();
