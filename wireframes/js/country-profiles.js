// Written profile content for country pages, keyed by country name.
// Countries without an entry keep the wireframe placeholders.
// The United Kingdom entry is dummy content to preview a finished page.
export const countryProfiles = {
  'United Kingdom': {
    about: [
      'Lausanne UK brings together church leaders, mission agencies, theologians and marketplace leaders across England, Scotland, Wales and Northern Ireland around one shared calling: the whole church taking the whole gospel to the whole world.',
      'Since the Fourth Lausanne Congress in 2024, the UK delegation has continued to meet as a national movement. Current priorities include equipping younger leaders, strengthening partnerships with diaspora churches in cities such as London, Birmingham and Glasgow, and a monthly online prayer gathering for the nations of Europe.',
    ],
    // The page appends the country name to the title.
    coordinator: { name: 'Usha Reifsnider', title: 'Communications Coordinator', photo: 'assets/photos/Usha-Reifsnider-Dec2021.jpeg' },
    connect: { text: 'Follow Lausanne UK for news, gatherings and resources from the national movement.', label: 'Visit Lausanne UK', href: '#' },
    region: 'Western Europe',
    updated: 'October 2026',
    related: [
      {
        type: 'Story',
        title: 'The Legacy of John Stott through the Lausanne Movement',
        href: 'story-article.html?slug=the-legacy-of-john-stott-through-the-lausanne-movement',
        image: 'assets/legacy/the-legacy-of-john-stott-through-the-lausanne-movement-hero.jpg',
      },
      {
        type: 'Gathering',
        title: 'YLG Europe 2026 Gathering',
        href: 'gatherings/ylg-europe-2026.html',
        image: 'assets/photos/ylg-europe-thumb.jpg',
      },
    ],
  },
};
