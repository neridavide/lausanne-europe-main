// Written profile content for country pages, keyed by country name.
// Countries without an entry keep the wireframe placeholders.
// The United Kingdom entry is dummy content to preview a finished page.
// Genovia is fictional: the worked example linked from the national page form.
// The other countries come from their national page form answers, written in
// their national language; the English is translated from them.
export const countryProfiles = {
  Denmark: {
    about: [
      'Lausanne Denmark is part of the Evangelical Alliance in Denmark, and we work to share inspiration for mission.',
      'We do this mainly by sending people to Lausanne conferences and by connecting those who are interested with networks on specific themes in mission (Issue Networks).',
      'From time to time we also hold theme days, preferably together with other churches and/or organisations, with inspiration for mission at their centre.',
    ],
    church: 'Church life in Denmark is shaped by the Lutheran national church, which is closely tied to the state, and by free churches of other confessions (Pentecostal, Baptist, Catholic and others). Within the national church, a number of independent organisations focus on areas such as global mission, mission in Denmark, diaconal work, and children’s and youth work.',
    resources: [
      { title: 'The Lausanne Covenant in Danish', href: 'https://usercontent.one/wp/www.evangeliskalliance.dk/wp-content/uploads/2017/08/lausannepagten.pdf' },
      { title: 'The Cape Town Commitment in Danish', href: 'https://usercontent.one/wp/www.evangeliskalliance.dk/wp-content/uploads/2017/08/capetown-2.pdf' },
      { title: 'Sendt', detail: 'A podcast made in response to the Fourth Lausanne Congress', href: 'https://open.spotify.com/show/47dePp69Y32L5ZedGBJpFn' },
    ],
    language: { code: 'da', label: 'Dansk' },
    translation: {
      about: [
        'Lausanne Danmark er en del af Evangelisk Alliance i Danmark, og vi arbejder for at formidle inspiration til mission.',
        'Det gør vi primært ved at sende folk til konferencer i regi af Lausanne og forbinde interesserede med netværk for specifikke temaer inden for mission (Issue Networks).',
        'Vi afholder også en gang imellem temadage – gerne i samarbejde med andre kirker og/eller organisationer – hvor inspiration til mission er i centrum.',
      ],
      church: 'Kirkelivet i Danmark er præget af den lutherske folkekirke, som er tæt forbundet med staten, og af frikirker som har andre konfessioner (pentecostal, baptistisk, katolsk m.v.). I folkekirken er der en del selvstændige organisationer som fokuserer på fx global mission, mission i Danmark, diakoni, børne- og ungdomsarbejde m.v.',
      resources: [
        { title: 'Lausannepagten på dansk', href: 'https://usercontent.one/wp/www.evangeliskalliance.dk/wp-content/uploads/2017/08/lausannepagten.pdf' },
        { title: 'Cape Town-erklæringen på dansk', href: 'https://usercontent.one/wp/www.evangeliskalliance.dk/wp-content/uploads/2017/08/capetown-2.pdf' },
        { title: 'Sendt', detail: 'Podcast lavet på baggrund af Lausannes fjerde verdenskongres', href: 'https://open.spotify.com/show/47dePp69Y32L5ZedGBJpFn' },
      ],
    },
    coordinator: { name: 'Lasse Holmgaard Iversen', title: 'Communications Coordinator' },
    connect: { text: 'Find Lausanne Denmark on the website of the Evangelical Alliance in Denmark.', label: 'Visit Lausanne Denmark', href: 'https://www.evangeliskalliance.dk/lausanne/' },
    region: 'Northern Europe',
    updated: 'November 2026',
  },
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
  Germany: {
    about: [
      'The Lausanne Movement in Germany was founded in 1985 and has been an independent association since 2015. It connects leaders from churches, free churches, mission agencies and Christian organisations. Since March 2026 it has been led by Evi Rodemann and Andreas Schlamm. Our vision is to bring people and ideas together for mission and evangelism, and to encourage collaboration. Our activities include the annual Lausanne Forum, the Younger Leaders Gathering, prayer initiatives, podcasts and publications. Together we want to encourage Christians to share their faith in Jesus authentically.',
    ],
    takePart: [
      'Find out more on our website, subscribe to the newsletter and explore our media',
      'Come to the Lausanne Forum or the Younger Leaders Gathering',
      'Join the WhatsApp community',
    ],
    church: 'Germany has been shaped historically by Christianity and the Reformation. In the 19th century, many evangelical free churches and mission agencies were founded. Today membership of the large churches is falling, while religious diversity and secularisation are growing. At the same time, new forms of church and missional initiatives are emerging. International churches enrich the church landscape and open up new perspectives for evangelism and mission.',
    resources: [
      { title: 'Lausanne Forum 2027', detail: '25–26 January 2027, Magdeburg', href: 'https://lausannerbewegung.de/2026/09/03/lausanner-forum-2027-aufbruch-am-rand/' },
      { title: 'The Lausanne Movement Germany podcast', href: 'https://lausannerbewegung.podigee.io/' },
    ],
    language: { code: 'de', label: 'Deutsch' },
    translation: {
      about: [
        'Die Lausanner Bewegung in Deutschland wurde 1985 gegründet und ist seit 2015 ein eigenständiger Verein. Sie vernetzt Verantwortliche aus Kirchen, Freikirchen, Missionswerken und christlichen Organisationen. Seit März 2026 wird sie von Evi Rodemann und Andreas Schlamm geleitet. Unsere Vision ist es, Menschen und Ideen für Mission und Evangelisation zusammenzubringen und Zusammenarbeit zu fördern. Zu unseren Aktivitäten gehören das jährliche Lausanner Forum, das Younger Leaders Gathering, Gebetsinitiativen, Podcasts und Publikationen. Gemeinsam möchten wir Christen ermutigen, den Glauben an Jesus authentisch weiterzugeben.',
      ],
      takePart: [
        'Informiere Dich auf unserer Homepage, abonniere den Newsletter und schau Dir unsere Medien an',
        'Besuche das Lausanner Forum oder das Younger Leaders Gathering',
        'Tritt der WhatsApp-Community bei',
      ],
      church: 'Deutschland ist historisch vom Christentum und der Reformation geprägt. Im 19. Jahrhundert entstanden zahlreiche evangelische Freikirchen und Missionswerke. Heute sinken Mitgliederzahlen der großen Kirchen, während religiöse Vielfalt und Säkularisierung zunehmen. Gleichzeitig entstehen neue Gemeindeformen und missionarische Initiativen. Internationale Gemeinden bereichern die Kirchenlandschaft und eröffnen neue Perspektiven für Evangelisation und Mission.',
      resources: [
        { title: 'Lausanner Forum 2027', detail: '25.–26. Januar 2027 in Magdeburg', href: 'https://lausannerbewegung.de/2026/09/03/lausanner-forum-2027-aufbruch-am-rand/' },
        { title: 'Podcast der Lausanner Bewegung', href: 'https://lausannerbewegung.podigee.io/' },
      ],
    },
    coordinator: { name: 'Simon Diercks', title: 'Communications Coordinator' },
    connect: { text: 'Follow the Lausanne Movement in Germany for news, the Lausanne Forum, podcasts and publications.', label: 'Visit Lausanne Germany', href: 'https://lausannerbewegung.de/' },
    social: [
      { label: 'YouTube', href: 'https://www.youtube.com/@lausannerbewegung' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/lausanner-bewegung' },
    ],
    region: 'Central Europe',
    updated: 'November 2026',
  },
  Latvia: {
    about: [
      'The story of the Lausanne Movement in Latvia begins with the Second Lausanne Congress in Manila, the Philippines, when the first delegates from Latvia travelled there. Latvia was also represented at the Third Congress in Cape Town, South Africa, and the Fourth Congress in Seoul, South Korea. Those involved in the movement in Latvia are people whose hearts burn for Christian mission and who want to take part in God’s great mission with their gifts.',
      'Linked with the Lausanne Movement are the Evangelical Alliance of Latvia, Youth With A Mission, various churches and denominations, the Kairos course, church planting and much more.',
    ],
    takePart: [
      'If you have a passion for mission, get in touch: perhaps we can build something together',
    ],
    church: 'The first records of Christianity in what is now Latvia date from the 11th century. Roman Catholic Christianity came from the west and Orthodoxy from the east. In 1522, Riga became the first city outside the German lands to adopt the Lutheran Reformation. In the 18th century Vidzeme experienced the Moravian Brethren revival, and in the 19th century a Baptist movement took shape in Courland.',
    language: { code: 'lv', label: 'Latviešu' },
    translation: {
      about: [
        'Lozannas kustības vēsture Latvijā sākas ar otro Lozannas kongresu Manilā, Filipīnās, kad turp devās pirmie delegāti no Latvijas. Latvija ir bijusi pārstāvēta trešajā kongresā Keiptaunā, Dienvidāfrikā un ceturtajā kongresā Seulā, Dienvidkorejā. Šajā kustībā Latvijā iesaistās tie, kuriem sirds deg par kristīgo misiju un kas vēlas piedalīties Dieva lielajā misijā ar savām dāvanām.',
        'Ar Lozannas kustību ir saistītas gan Latvijas Evaņģēliskā alianse, gan Jaunatne ar Misiju, dažādas draudzes un konfesijas, Kairos kurss, jaunu draudžu dibināšana un vēl daudzas citas.',
      ],
      takePart: [
        'Ja dedz par misijas darbu, sazinies ar mums, varbūt varam veidot ko kopā',
      ],
      church: 'Pirmās ziņas par kristietību Latvijas teritorijā ir sastopamas jau kopš 11. gadsimta. Romas katoļu kristietība ienāk no rietumiem un pareizticība ienāk no austrumiem. 1522. gadā Rīga ir pirmā pilsēta ārpus vācu teritorijām, kas pieņem luterisko reformāciju. 18. gadsimtā Vidzeme piedzīvo Brāļu draudžu atmodu, bet 19. gs. Kurzemē veidojas baptistu kustība.',
    },
    // Two coordinators share the role.
    coordinator: { name: 'Kristīna Ēce & Pēteris Eisāns', title: 'Communications Coordinators' },
    // No website yet, so Connect has no Visit button.
    connect: { text: 'Get in touch with the coordinators to find out more about the Lausanne Movement in Latvia.' },
    region: 'Northern Europe',
    updated: 'November 2026',
  },
  Portugal: {
    about: [
      'The Lausanne Movement in Portugal seeks to inspire, connect and mobilise leaders, churches, organisations and Christians to take a more active part in God’s mission. We want to bring people and initiatives closer together, encourage collaboration and create opportunities for the Church, in all its diversity, to walk with a shared missional vision. We believe that by valuing what is already happening and building new bridges, we can help the gospel reach more people, in Portugal and from Portugal.',
    ],
    takePart: [
      'Join spaces for reflection, prayer and collaboration around mission in Portugal',
      'Meet leaders, churches and initiatives who share the desire to make Jesus known, and explore ways to work together',
      'Share what God is doing where you are and discover how you can help mobilise the Church for mission',
    ],
    church: 'The evangelical church in Portugal took root from the 19th century onwards and has grown and diversified, partly thanks to immigration. In a country with a strong Catholic tradition and growing secularisation, it faces challenges and opportunities to make Jesus known, make disciples and strengthen collaboration between churches and organisations.',
    resources: [
      { title: 'Discover your role in mission', href: 'https://lausanneportugal.pt/movimento-lausanne-para-ti' },
    ],
    language: { code: 'pt', label: 'Português' },
    translation: {
      about: [
        'O Movimento de Lausanne em Portugal procura inspirar, conectar e mobilizar líderes, igrejas, organizações e cristãos para uma participação mais ativa na missão de Deus. Queremos aproximar pessoas e iniciativas, incentivar a colaboração e criar oportunidades para que a Igreja, na sua diversidade, caminhe com uma visão missionária partilhada. Acreditamos que, ao valorizar o que já acontece e promover novas pontes, podemos contribuir para que o Evangelho alcance mais pessoas, em Portugal e a partir de Portugal.',
      ],
      takePart: [
        'Junta-te a espaços de reflexão, oração e colaboração em torno da missão em Portugal',
        'Conhece líderes, igrejas e iniciativas que partilham o desejo de tornar Jesus conhecido e explora oportunidades de colaboração',
        'Partilha o que Deus está a fazer no teu contexto e descobre como podes contribuir para mobilizar a Igreja para a missão',
      ],
      church: 'A Igreja evangélica em Portugal consolidou-se a partir do século XIX e tem crescido e ganho diversidade, também graças à imigração. Num país de forte tradição católica e crescente secularização, enfrenta desafios e oportunidades para tornar Jesus conhecido, formar discípulos e fortalecer a colaboração entre igrejas e organizações.',
      resources: [
        { title: 'Descobre o teu papel na missão', href: 'https://lausanneportugal.pt/movimento-lausanne-para-ti' },
      ],
    },
    coordinator: { name: 'Rita Messias Pimentel', title: 'Communications Coordinator' },
    connect: { text: 'Follow the Lausanne Movement in Portugal for news and ways to take part in mission.', label: 'Visit Lausanne Portugal', href: 'https://lausanneportugal.pt/' },
    social: [
      { label: 'YouTube', href: 'https://www.youtube.com/@MovimentoLausannePortugal' },
      { label: 'Instagram', href: 'https://www.instagram.com/lausanne.portugal/' },
      { label: 'Facebook', href: 'https://www.facebook.com/lausanne.portugal/' },
    ],
    region: 'Southern Europe',
    updated: 'November 2026',
  },
  Spain: {
    about: [
      'The first standing committee of the Lausanne Movement Spain was founded around 2008, during the preparations for the Third Congress in Cape Town. Since then we have sought to keep a committee that represents the Evangelical Church of Spain in mission. As part of Lausanne, we connect influential people and ideas to accelerate global mission. We encourage ongoing reflection on church planting, discipleship, evangelism among the least reached, creation care and more.',
    ],
    takePart: [
      'Take part in working groups on discipleship, evangelism among people born in Spain, creation care and more',
      'Come to the annual gathering of the Lausanne Movement Spain, on the third weekend of November',
      'Serve the movement in support roles (administration, social media and more)',
    ],
    church: 'Spain has been predominantly Catholic. Today’s evangelical church dates from the so-called Second Reformation in the mid-19th century. From the time of the Reformation it was harshly persecuted, until the last quarter of the 20th century. Thanks to immigration over the last 30 years, the church has multiplied.',
    resources: [
      { title: 'Annual gathering of the Lausanne Movement Spain', detail: '19–20 November 2026, Guadarrama (Madrid)' },
      { title: 'Los que dan fruto', detail: 'A series of 12 podcasts on discipleship, released every other Wednesday', href: 'https://www.losquedanfruto.com' },
      { title: 'Leaders with the character of Christ', detail: 'Lausanne Spain’s focus for 2026: gap 18 of The State of the Great Commission. Materials on the Lausanne Spain website.', href: 'https://lausanaespana.org/' },
    ],
    language: { code: 'es', label: 'Español' },
    translation: {
      about: [
        'Durante la preparación del tercer congreso en Ciudad del Cabo, allá por 2008, se funda el primer comité permanente del Movimiento de Lausana España. Desde ese momento hemos tratado de mantener un comité que sea representativo de la Iglesia Evangélica de España en misión. Como parte de Lausana, vinculamos ideas y personas de influencia para acelerar la misión global. Promovemos una constante reflexión sobre plantación de iglesias, discipulado, evangelización hacia los menos alcanzados, cuidado de la creación, etc.',
      ],
      takePart: [
        'Participando en mesas de trabajo de discipulado, evangelización de autóctonos, cuidado de la creación, etc.',
        'Participando en el encuentro anual del Movimiento de Lausana el tercer fin de semana de noviembre',
        'Sirviendo en tareas de soporte al Movimiento (administración, redes sociales, etc.)',
      ],
      church: 'España ha sido mayoritariamente católica. La iglesia evangélica actual existe desde la llamada segunda Reforma a mediados del siglo XIX. Desde el período de la Reforma fue duramente perseguida hasta el último cuarto del siglo XX. Gracias a la inmigración de los últimos 30 años la iglesia se ha multiplicado.',
      resources: [
        { title: 'Encuentro anual del Movimiento de Lausana España', detail: '19 y 20 de noviembre de 2026, Guadarrama (Madrid)' },
        { title: 'Los que dan fruto', detail: 'Una serie de 12 podcasts sobre discipulado, que aparece los miércoles cada dos semanas', href: 'https://www.losquedanfruto.com' },
        { title: 'Líderes con el carácter de Cristo', detail: 'Énfasis de Lausana España en 2026: la brecha 18 de El Estado de la Gran Comisión. Materiales en la web de Lausana España.', href: 'https://lausanaespana.org/' },
      ],
    },
    coordinator: { name: 'Carlos Fumero', title: 'Communications Coordinator' },
    connect: { text: 'Follow the Lausanne Movement Spain for news, its annual gathering and resources.', label: 'Visit Lausanne Spain', href: 'https://lausanaespana.org/' },
    social: [
      { label: 'YouTube', href: 'https://www.youtube.com/@LausanaSpain' },
      { label: 'Instagram', href: 'https://www.instagram.com/movimientolausanaspain/' },
      { label: 'Facebook', href: 'https://www.facebook.com/LausanaSpain/' },
    ],
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
    resources: [
      { title: 'Uppdrag: Guds rike', href: 'https://uppdraggudsrike.se' },
      { title: 'Alla folk', href: 'https://allafolk.nu' },
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
