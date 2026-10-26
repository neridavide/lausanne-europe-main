import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import countriesTopology from 'world-atlas/countries-110m.json';

const countryRecords = [
  ['008', 'Albania', 'emerging'], ['020', 'Andorra', 'none'], ['040', 'Austria', 'none'], ['056', 'Belgium', 'emerging'], ['070', 'Bosnia and Herzegovina', 'emerging'], ['100', 'Bulgaria', 'emerging'], ['191', 'Croatia', 'emerging'], ['196', 'Cyprus', 'emerging'], ['203', 'Czechia', 'emerging'], ['208', 'Denmark', 'active'], ['233', 'Estonia', 'emerging'], ['246', 'Finland', 'emerging'], ['250', 'France', 'active'], ['276', 'Germany', 'active'], ['300', 'Greece', 'emerging'], ['348', 'Hungary', 'emerging'], ['352', 'Iceland', 'emerging'], ['372', 'Ireland', 'active'], ['380', 'Italy', 'active'], ['383', 'Kosovo', 'none'], ['428', 'Latvia', 'emerging'], ['438', 'Liechtenstein', 'none'], ['440', 'Lithuania', 'emerging'], ['442', 'Luxembourg', 'none'], ['470', 'Malta', 'emerging'], ['492', 'Monaco', 'none'], ['499', 'Montenegro', 'none'], ['807', 'North Macedonia', 'none'], ['528', 'Netherlands', 'active'], ['578', 'Norway', 'active'], ['616', 'Poland', 'none'], ['620', 'Portugal', 'active'], ['642', 'Romania', 'emerging'], ['674', 'San Marino', 'none'], ['688', 'Serbia', 'emerging'], ['703', 'Slovakia', 'active'], ['705', 'Slovenia', 'emerging'], ['724', 'Spain', 'active'], ['752', 'Sweden', 'emerging'], ['756', 'Switzerland', 'active'], ['792', 'Turkey', 'none'], ['804', 'Ukraine', 'emerging'], ['826', 'United Kingdom', 'emerging']
];

// countries-110m omits Kosovo, so include its boundary explicitly rather than
// leaving it as part of the non-interactive background map.
const kosovoFeature = {
  type: 'Feature',
  id: '383',
  properties: { name: 'Kosovo' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [20.346, 42.828], [20.468, 42.857], [20.486, 42.88], [20.457, 42.925], [20.475, 42.953], [20.623, 43.034], [20.648, 43.071], [20.659, 43.1], [20.637, 43.13], [20.608, 43.179], [20.623, 43.199], [20.702, 43.227], [20.763, 43.258], [20.799, 43.262], [20.824, 43.238], [20.824, 43.213], [20.846, 43.173], [20.889, 43.152], [20.968, 43.116], [21.058, 43.092], [21.127, 43.043], [21.224, 42.956], [21.238, 42.913], [21.325, 42.875], [21.404, 42.831], [21.39, 42.751], [21.663, 42.682], [21.724, 42.682], [21.753, 42.67], [21.753, 42.651], [21.732, 42.595], [21.62, 42.423], [21.609, 42.387], [21.53, 42.35], [21.519, 42.328], [21.541, 42.281], [21.562, 42.248], [21.39, 42.22], [21.332, 42.187], [21.296, 42.13], [21.285, 42.1], [21.256, 42.099], [21.206, 42.128], [21.141, 42.175], [21.058, 42.172], [20.778, 42.071], [20.749, 42.019], [20.745, 41.904], [20.724, 41.873], [20.695, 41.854], [20.58, 41.866], [20.565, 41.873], [20.583, 41.918], [20.576, 42.014], [20.522, 42.172], [20.486, 42.224], [20.407, 42.276], [20.349, 42.309], [20.241, 42.338], [20.187, 42.425], [20.104, 42.524], [20.065, 42.547], [20.072, 42.557], [20.09, 42.632], [20.065, 42.685], [20.029, 42.732], [20.054, 42.76], [20.13, 42.76], [20.191, 42.755], [20.216, 42.798], [20.346, 42.828]
    ]]
  }
};

const records = new Map(countryRecords.map(([id, name, status]) => [id, { name, status }]));
const mapNode = document.querySelector('[data-national-movement-map]');
const statusLabel = (status) => ({ active: 'Active movement', emerging: 'Emerging movement', none: 'No movement' }[status]);

if (mapNode) {
  const width = 1000;
  const height = 580;
  const namespace = 'http://www.w3.org/2000/svg';
  const collection = feature(countriesTopology, countriesTopology.objects.countries);
  const europeanCountries = [
    ...collection.features.filter(({ id }) => records.has(String(id).padStart(3, '0'))),
    kosovoFeature
  ];
  const projection = geoNaturalEarth1().fitExtent([[28, 28], [width - 28, height - 28]], { type: 'FeatureCollection', features: collection.features });
  const path = geoPath(projection);
  const svg = document.createElementNS(namespace, 'svg');
  const mapLayer = document.createElementNS(namespace, 'g');
  const tooltip = document.createElement('div');
  const [[x0, y0], [x1, y1]] = path.bounds({ type: 'FeatureCollection', features: europeanCountries });
  const europeCenter = [(x0 + x1) / 2, (y0 + y1) / 2];
  // Centre the continental region rather than the geographic bounds' outliers,
  // so Europe fills the initial view without requiring visitors to zoom first.
  const initialFocus = [europeCenter[0] + 45, europeCenter[1] - 34];
  const initialScale = 5.2;
  const initialTransform = { scale: initialScale, x: width / 2 - initialFocus[0] * initialScale, y: height / 2 - initialFocus[1] * initialScale };
  const state = { ...initialTransform, drag: null, didDrag: false };

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Zoomable map of European countries. Select a country to open its national movement profile.');
  svg.setAttribute('tabindex', '0');
  mapLayer.setAttribute('class', 'wf-map-layer');
  tooltip.className = 'wf-map-tooltip';
  tooltip.hidden = true;
  mapNode.classList.add('wf-map-is-navigable');

  const updateTransform = () => mapLayer.setAttribute('transform', `translate(${state.x} ${state.y}) scale(${state.scale})`);
  const resetMap = () => { state.scale = initialTransform.scale; state.x = initialTransform.x; state.y = initialTransform.y; updateTransform(); };
  const zoomAt = (factor, point = [width / 2, height / 2]) => {
    const nextScale = Math.min(7, Math.max(.8, state.scale * factor));
    const ratio = nextScale / state.scale;
    state.x = point[0] - (point[0] - state.x) * ratio;
    state.y = point[1] - (point[1] - state.y) * ratio;
    state.scale = nextScale;
    updateTransform();
  };
  const svgPoint = (event) => {
    const rect = svg.getBoundingClientRect();
    return [(event.clientX - rect.left) * (width / rect.width), (event.clientY - rect.top) * (height / rect.height)];
  };
  const setTooltipPosition = (event) => {
    const rect = mapNode.getBoundingClientRect();
    tooltip.style.left = `${event.clientX - rect.left + 16}px`;
    tooltip.style.top = `${event.clientY - rect.top + 16}px`;
  };

  collection.features.forEach((country) => {
    const land = document.createElementNS(namespace, 'path');
    land.setAttribute('d', path(country));
    land.setAttribute('class', 'wf-map-world');
    land.setAttribute('aria-hidden', 'true');
    mapLayer.append(land);
  });

  europeanCountries.forEach((country) => {
    const id = String(country.id).padStart(3, '0');
    const { name, status } = records.get(id);
    const link = document.createElementNS(namespace, 'a');
    const shape = document.createElementNS(namespace, 'path');
    const title = document.createElementNS(namespace, 'title');
    const href = `country-profile.html?${new URLSearchParams({ country: name, status })}`;
    const label = `${name} — ${statusLabel(status)}`;
    link.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
    link.setAttribute('href', href);
    link.setAttribute('aria-label', `View the Lausanne movement profile for ${label}`);
    shape.setAttribute('d', path(country));
    shape.setAttribute('class', `wf-map-country wf-map-country-${status}`);
    title.textContent = label;
    link.append(shape, title);
    link.addEventListener('pointerenter', (event) => { tooltip.textContent = label; tooltip.hidden = false; setTooltipPosition(event); });
    link.addEventListener('pointermove', setTooltipPosition);
    link.addEventListener('pointerleave', () => { tooltip.hidden = true; });
    link.addEventListener('focus', () => { tooltip.textContent = label; tooltip.hidden = false; tooltip.style.left = '50%'; tooltip.style.top = '18px'; });
    link.addEventListener('blur', () => { tooltip.hidden = true; });
    link.addEventListener('click', (event) => {
      if (state.didDrag) { event.preventDefault(); return; }
      window.location.assign(href);
    });
    mapLayer.append(link);
  });

  svg.addEventListener('wheel', (event) => { event.preventDefault(); zoomAt(event.deltaY < 0 ? 1.16 : .86, svgPoint(event)); }, { passive: false });
  svg.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a')) return;
    state.drag = { x: event.clientX, y: event.clientY, originX: state.x, originY: state.y };
    state.didDrag = false;
    svg.setPointerCapture(event.pointerId);
  });
  svg.addEventListener('pointermove', (event) => {
    if (!state.drag) return;
    const rect = svg.getBoundingClientRect();
    const dx = (event.clientX - state.drag.x) * (width / rect.width);
    const dy = (event.clientY - state.drag.y) * (height / rect.height);
    state.didDrag = state.didDrag || Math.hypot(dx, dy) > 4;
    state.x = state.drag.originX + dx;
    state.y = state.drag.originY + dy;
    updateTransform();
  });
  svg.addEventListener('pointerup', (event) => {
    state.drag = null;
    svg.releasePointerCapture(event.pointerId);
    window.setTimeout(() => { state.didDrag = false; }, 0);
  });
  svg.addEventListener('keydown', (event) => {
    if (event.key === '+' || event.key === '=') { event.preventDefault(); zoomAt(1.16); }
    if (event.key === '-') { event.preventDefault(); zoomAt(.86); }
    if (event.key === '0') { event.preventDefault(); resetMap(); }
  });

  updateTransform();
  svg.append(mapLayer);
  mapNode.append(svg, tooltip);
  mapNode.closest('.wf-movement-map').querySelectorAll('[data-map-action]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.mapAction === 'in') zoomAt(1.24);
      if (button.dataset.mapAction === 'out') zoomAt(.8);
      if (button.dataset.mapAction === 'reset') resetMap();
    });
  });
}

const directoryNode = document.querySelector('[data-country-directory]');
const directorySearch = document.querySelector('[data-directory-search]');
const directoryStatus = document.querySelector('[data-directory-status]');

if (directoryNode) {
  const abbreviation = (name) => name
    .split(/[\s-]+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const directory = countryRecords
    .map(([, name, status]) => ({ name, status }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const renderDirectory = () => {
    const searchTerm = directorySearch?.value.trim().toLocaleLowerCase() ?? '';
    const selectedStatus = directoryStatus?.value ?? '';
    const matchingCountries = directory.filter(({ name, status }) => (
      (!searchTerm || name.toLocaleLowerCase().includes(searchTerm))
      && (!selectedStatus || status === selectedStatus)
    ));

    directoryNode.innerHTML = matchingCountries.map(({ name, status }) => {
      const href = `country-profile.html?${new URLSearchParams({ country: name, status })}`;
      return `<a class="wf-country-row" href="${href}" aria-label="View ${name}: ${statusLabel(status)}">
        <span class="wf-country-mark" aria-hidden="true">${abbreviation(name)}</span>
        <span class="wf-country-row-copy">
          <strong>${name}</strong>
          <span class="wf-country-status wf-country-status-${status}"><i></i>${statusLabel(status)}</span>
        </span>
        <span class="wf-country-row-arrow" aria-hidden="true">›</span>
      </a>`;
    }).join('') || '<p class="wf-country-directory-empty">No countries match this filter.</p>';
  };

  directorySearch?.addEventListener('input', renderDirectory);
  directoryStatus?.addEventListener('change', renderDirectory);
  renderDirectory();
}
