import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import countriesTopology from 'world-atlas/countries-110m.json';

const countryRecords = [
  ['008', 'Albania', 'emerging'], ['020', 'Andorra', 'none'], ['040', 'Austria', 'none'],
  ['056', 'Belgium', 'emerging'], ['070', 'Bosnia and Herzegovina', 'emerging'], ['100', 'Bulgaria', 'emerging'],
  ['112', 'Belarus', 'none'], ['191', 'Croatia', 'emerging'], ['196', 'Cyprus', 'emerging'],
  ['203', 'Czechia', 'emerging'], ['208', 'Denmark', 'active'], ['233', 'Estonia', 'emerging'],
  ['246', 'Finland', 'emerging'], ['250', 'France', 'active'], ['276', 'Germany', 'active'],
  ['300', 'Greece', 'emerging'], ['348', 'Hungary', 'emerging'], ['352', 'Iceland', 'emerging'],
  ['372', 'Ireland', 'active'], ['380', 'Italy', 'active'], ['383', 'Kosovo', 'emerging'],
  ['428', 'Latvia', 'emerging'], ['438', 'Liechtenstein', 'none'], ['440', 'Lithuania', 'emerging'],
  ['442', 'Luxembourg', 'none'], ['470', 'Malta', 'emerging'], ['492', 'Monaco', 'none'],
  ['498', 'Moldova', 'none'], ['499', 'Montenegro', 'none'], ['807', 'North Macedonia', 'none'],
  ['528', 'Netherlands', 'active'], ['578', 'Norway', 'active'], ['616', 'Poland', 'none'],
  ['620', 'Portugal', 'active'], ['642', 'Romania', 'emerging'],
  ['674', 'San Marino', 'none'], ['688', 'Serbia', 'emerging'], ['703', 'Slovakia', 'active'],
  ['705', 'Slovenia', 'emerging'], ['724', 'Spain', 'active'], ['752', 'Sweden', 'emerging'],
  ['756', 'Switzerland', 'active'], ['792', 'Turkey', 'none'], ['804', 'Ukraine', 'emerging'],
  ['826', 'United Kingdom', 'emerging']
];

const records = new Map(countryRecords.map(([id, name, status]) => [id, { name, status }]));
const mapNode = document.querySelector('[data-national-movement-map]');

if (mapNode) {
  const width = 1000;
  const height = 580;
  const collection = feature(countriesTopology, countriesTopology.objects.countries);
  const europeanCountries = collection.features.filter(({ id }) => records.has(String(id).padStart(3, '0')));
  const projection = geoMercator().fitExtent([[48, 28], [width - 48, height - 26]], {
    type: 'FeatureCollection',
    features: europeanCountries
  });
  const path = geoPath(projection);
  const namespace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(namespace, 'svg');
  const tooltip = document.createElement('div');

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Map of European countries. Select a country to open its national movement profile.');
  tooltip.className = 'wf-map-tooltip';
  tooltip.hidden = true;

  europeanCountries.forEach((country) => {
    const id = String(country.id).padStart(3, '0');
    const { name, status } = records.get(id);
    const link = document.createElementNS(namespace, 'a');
    const shape = document.createElementNS(namespace, 'path');
    const title = document.createElementNS(namespace, 'title');
    const params = new URLSearchParams({ country: name, status });
    const href = `country-profile.html?${params}`;

    link.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
    link.setAttribute('href', href);
    link.setAttribute('aria-label', `View the Lausanne movement profile for ${name} (${status} movement)`);
    shape.setAttribute('d', path(country));
    shape.setAttribute('class', `wf-map-country wf-map-country-${status}`);
    title.textContent = `${name} — ${status === 'active' ? 'Active movement' : status === 'emerging' ? 'Emerging movement' : 'No movement yet'}`;
    link.append(shape, title);
    link.addEventListener('pointerenter', (event) => {
      tooltip.textContent = title.textContent;
      tooltip.hidden = false;
      tooltip.style.left = `${event.offsetX + 16}px`;
      tooltip.style.top = `${event.offsetY + 16}px`;
    });
    link.addEventListener('pointermove', (event) => {
      tooltip.style.left = `${event.offsetX + 16}px`;
      tooltip.style.top = `${event.offsetY + 16}px`;
    });
    link.addEventListener('pointerleave', () => { tooltip.hidden = true; });
    link.addEventListener('focus', () => {
      tooltip.textContent = title.textContent;
      tooltip.hidden = false;
      tooltip.style.left = '50%';
      tooltip.style.top = '18px';
    });
    link.addEventListener('blur', () => { tooltip.hidden = true; });
    link.addEventListener('click', () => { window.location.assign(href); });
    svg.append(link);
  });

  mapNode.append(svg, tooltip);
}
