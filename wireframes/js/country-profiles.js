// Written profile content for country pages, keyed by country name.
// Countries without an entry keep the wireframe placeholders.
// The United Kingdom entry is dummy content to preview a finished page.
// Genovia is fictional: the worked example linked from the national page form.
// France and Switzerland come from their national page form answers, written
// in French; the English is translated from them.
export const countryProfiles = {
  France: {
    about: [
      'The Lausanne France group was founded in Paris in December 2010, on returning from the Third Lausanne Congress on World Evangelization, held in Cape Town, South Africa, from 16 to 25 October 2010.',
      'Its first members were participants in Lausanne III. Others have joined since, with care taken to keep a balance between theologians and practitioners. The group works in partnership with the CNEF (French Evangelical Alliance).',
    ],
    takePart: [
      'Regular meetings for members',
      'A Lausanne dinner with people engaged in mission',
    ],
    church: 'France has a Catholic and secular background. Evangelicals make up less than 1% of the population.',
    // The movement's own text in its national language; the page offers a
    // switch between it and the English above.
    language: { code: 'fr', label: 'Français' },
    translation: {
      about: [
        'Le groupe « Lausanne France » a été créé en décembre 2010 à Paris au retour du troisième Congrès de Lausanne pour l’évangélisation du monde qui s’est tenu du 16 au 25 octobre 2010 au Cap (Afrique du Sud).',
        'Constitué au départ de participants à Lausanne III, d’autres personnes ont rejoint le groupe ensuite en veillant à un équilibre entre théologiens et praticiens. Le groupe travaille en collaboration avec le CNEF (Alliance Evangélique Française).',
      ],
      takePart: [
        'Rencontre régulière pour les membres',
        'Dîner Lausanne avec les acteurs de la mission',
      ],
      church: 'La France est d’arrière-plan catholique et laïque. Les évangéliques représentent moins de 1% de la population.',
    },
    coordinator: { name: 'Philippe Monnery', title: 'Communications Coordinator' },
    connect: { text: 'Find Lausanne France on the website of the CNEF, the French Evangelical Alliance.', label: 'Visit Lausanne France', href: 'https://www.lecnef.org/page/512150-lausanne' },
    region: 'Western Europe',
    updated: 'November 2026',
  },
  Genovia: {
    about: [
      'Lausanne Genovia sprang into life after the Fourth Lausanne Congress in 2024, with a particular vision to help Genovia’s historic churches collaborate in mission with the new diaspora churches.',
      'The movement has been holding a series of regional Lausanne gatherings in cities around the country and has launched a podcast on whole-life discipleship. Its first Lausanne Genovia National Gathering is planned for June 2027.',
    ],
    takePart: [
      'Come to a regional Lausanne gathering near you',
      'Listen to the podcast on whole-life discipleship',
      'Save the date: Lausanne Genovia National Gathering, June 2027',
    ],
    church: 'Genovia is primarily Catholic, with Lutheran churches since the 1700s. The evangelical movement began with a revival in 1926 and grew with the arrival of Baptist, Pentecostal and independent missionaries in the 1960s. Since 2004, migration from Latin America has brought significant growth in diaspora churches across the country.',
    coordinator: { name: 'Elena Marchetti', title: 'Communications Coordinator' },
    connect: { text: 'Follow Lausanne Genovia for news, gatherings and the whole-life discipleship podcast.', label: 'Visit Lausanne Genovia', href: '#' },
    region: 'Southern Europe',
    updated: 'November 2026',
  },
  Sweden: {
    about: [
      'Sweden’s Lausanne Committee was founded in 1976. In 2001, its work was taken forward by the Swedish Evangelical Alliance (SEA), which is connected to the World and European Evangelical Alliances and serves as Sweden’s formal link with Lausanne.',
      'For the past few years, SEA General Secretary Olof Edsinger and Daniel Råsberg of the Evangelical Free Church (EFK) have coordinated Lausanne work in Sweden. Together, they have hosted seminars and conferences.',
    ],
    takePart: [
      'Become a personal member of the Swedish Evangelical Alliance',
      'Connect your organisation with the Swedish Evangelical Mission Alliance',
      'Contact the Swedish Lausanne team directly',
    ],
    church: 'Sweden has been shaped by several centuries of Lutheran state-church tradition, alongside many free churches and revival movements, most of them evangelical and/or Pentecostal. While free churches have declined in recent decades, new congregations are also being planted, notably by missionaries from the Global South.',
    language: { code: 'sv', label: 'Svenska' },
    translation: {
      about: [
        '1976 bildades en svensk Lausannekommitté. År 2001 bildades i stället Svenska Evangeliska Alliansen (SEA), som en förlängning av Lausannekommittén och med anslutning till World och European Evangelical Alliance. SEA är i dag den formella kontaktlänken mellan Sverige och Lausanne, men kontakter finns också genom enskilda och organisationer som står Lausannerörelsen nära.',
        'Sedan några år tillbaka fungerar SEA:s generalsekreterare Olof Edsinger och EFK:s Daniel Råsberg som samordnare för Lausannearbetet i Sverige. Tillsammans har de stått värdar för flera seminarier och konferenser.',
      ],
      takePart: [
        'Bli personlig medlem i Svenska Evangeliska Alliansen',
        'Anslut din organisation till Svenska Evangeliska Missionsalliansen',
        'Maila olof.edsinger@sea.nu eller daniel.råsberg@efk.se för direktkontakt med det svenska Lausannearbetet',
      ],
      church: 'Sverige präglas av flera hundra år av luthersk statskyrka. Men vi har även många frikyrkor och väckelserörelser, av vilka de flesta är av evangelikalt och/eller pentekostalt snitt. De senaste decennierna har antalet frikyrkor minskat, men vi har också sett nya församlingar planteras – inte minst av missionärer från globala Syd.',
    },
    coordinator: { name: 'Olof Edsinger', title: 'Communications Coordinator' },
    connect: { text: 'Follow the Swedish Evangelical Alliance for news and gatherings connected with Lausanne in Sweden.', label: 'Visit the Swedish Evangelical Alliance', href: 'https://www.sea.nu' },
    social: [
      { label: 'Facebook', href: 'https://www.facebook.com/svenskaevangeliskaalliansen' },
      { label: 'YouTube', href: 'https://www.youtube.com/@StudioSEA/' },
    ],
    region: 'Northern Europe',
    updated: 'November 2026',
  },
  Switzerland: {
    about: [
      'Today, the movement in French-speaking Switzerland is carried by the Swiss Evangelical Network (RES). It brings together leaders of churches and Christian organisations, people from the professional and academic worlds, and young leaders from different denominations. Our vision is to see the gospel within everyone’s reach, churches that make disciples, Christlike leaders, and a tangible impact of the Kingdom in every sphere of society.',
    ],
    takePart: [
      'Join our gatherings for prayer, reflection and networking',
      'Put your skills and experience to work in shared initiatives',
      'Join our network to work alongside Christian leaders in French-speaking Switzerland',
    ],
    church: 'French-speaking Switzerland, heir to both the Reformation and Catholicism, saw its modern evangelical movement born in the 19th century with the Geneva Revival. Having grown into churches, ministries and networks, it now lives in a secularised, multicultural society that calls for collaboration, integration and dialogue between the generations.',
    language: { code: 'fr', label: 'Français' },
    translation: {
      about: [
        'Aujourd’hui, la dynamique en Suisse romande est portée par le Réseau évangélique suisse (RES) et rassemble des responsables d’Églises et d’œuvres chrétiennes, des acteurs du monde professionnel et académique ainsi que de jeunes leaders issus de différentes dénominations. Notre vision est de voir l’Évangile accessible à chacun, des Églises qui forment des disciples, des responsables à l’image du Christ et un impact concret du Royaume dans toutes les sphères de la société.',
      ],
      takePart: [
        'Participez à nos rencontres de prière, de réflexion et de réseautage',
        'Mettez vos compétences et votre expérience au service d’initiatives communes',
        'Rejoignez notre réseau pour collaborer avec des responsables chrétiens en Suisse romande',
      ],
      church: 'La Suisse romande, héritière de la Réforme et du catholicisme, voit naître son mouvement évangélique moderne au XIXᵉ siècle avec le Réveil de Genève. Développé en Églises, œuvres et réseaux, il évolue aujourd’hui dans une société sécularisée et multiculturelle, appelant à la collaboration, l’intégration et le dialogue avec les générations.',
    },
    coordinator: { name: 'Christian Kuhn', title: 'Communications Coordinator' },
    connect: { text: 'Follow the Swiss Evangelical Network (RES) for news and gatherings in French-speaking Switzerland.', label: 'Visit the RES', href: 'https://evangelique.ch' },
    social: [{ label: 'Facebook', href: 'https://www.facebook.com/evangelique.ch' }],
    region: 'Central Europe',
    updated: 'November 2026',
  },
  'United Kingdom': {
    about: [
      'Lausanne UK brings together church leaders, mission agencies, theologians and marketplace leaders across England, Scotland, Wales and Northern Ireland around one shared calling: the whole church taking the whole gospel to the whole world.',
      'Since the Fourth Lausanne Congress in 2024, the UK delegation has continued to meet as a national movement. Current priorities include equipping younger leaders, strengthening partnerships with diaspora churches in cities such as London, Birmingham and Glasgow, and a monthly online prayer gathering for the nations of Europe.',
    ],
    // The page appends the country name to the title.
    coordinator: { name: 'Usha Reifsnider', title: 'Communications Coordinator' },
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
