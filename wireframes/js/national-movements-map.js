import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import countriesTopology from 'world-atlas/countries-110m.json';
import { countryRecords, countryFlagCodes, flagEmoji, statusLabel } from './national-movements-data.js';

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

// The source atlas represents Crimea within Russia. For this map, include the
// peninsula in Ukraine so its colour, label, and profile consistently reflect
// Ukraine's internationally recognised borders.
const crimeaCoordinates = [[
  [33.435, 45.972], [33.698, 46.219], [34.411, 46.004], [34.731, 45.965],
  [34.861, 45.767], [35.012, 45.737], [35.019, 45.651], [35.509, 45.41],
  [36.531, 45.469], [36.333, 45.114], [35.239, 44.94], [33.882, 44.361],
  [33.327, 44.566], [33.547, 45.034], [32.453, 45.327], [32.633, 45.519],
  [33.587, 45.852], [33.435, 45.972]
]];

const records = new Map(countryRecords.map(([id, name, status]) => [id, { name, status }]));
const mapNode = document.querySelector('[data-national-movement-map]');

if (mapNode) {
  const width = 1000;
  const height = 580;
  // The projection is laid out on a fixed 1000x580 canvas; the visible viewBox
  // height then adapts to the container so phones get a taller, squarer map
  // instead of a thin letterboxed strip.
  const viewportAspect = () => {
    const containerWidth = mapNode.clientWidth || width;
    if (containerWidth < 560) return 1.05;
    if (containerWidth < 900) return .75;
    return height / width;
  };
  let viewHeight = Math.round(width * viewportAspect());
  const minScale = .8;
  const maxScale = 40;
  const namespace = 'http://www.w3.org/2000/svg';
  const collection = feature(countriesTopology, countriesTopology.objects.countries);
  const ukraine = collection.features.find(({ id }) => String(id).padStart(3, '0') === '804');
  const ukraineOuterRing = ukraine.geometry.coordinates[0];
  const crimeaOuterRing = crimeaCoordinates[0];
  const samePoint = ([longitude, latitude], [targetLongitude, targetLatitude]) => (
    Math.abs(longitude - targetLongitude) < .001 && Math.abs(latitude - targetLatitude) < .001
  );
  const crimeaSeamStart = ukraineOuterRing.findIndex((point) => samePoint(point, crimeaOuterRing[5]));
  const crimeaSeamEnd = ukraineOuterRing.findIndex((point) => samePoint(point, crimeaOuterRing[0]));
  const ukraineWithCrimea = {
    ...ukraine,
    geometry: {
      // Merge the two outlines so the shared Crimea–Ukraine seam is not
      // rendered as a border within Ukraine.
      type: 'Polygon',
      coordinates: [[
        ...ukraineOuterRing.slice(0, crimeaSeamStart + 1),
        ...crimeaOuterRing.slice(6),
        ...ukraineOuterRing.slice(crimeaSeamEnd + 1)
      ]]
    }
  };
  const europeanCountries = [
    ...collection.features
      .filter(({ id }) => records.has(String(id).padStart(3, '0')))
      .map((country) => (String(country.id).padStart(3, '0') === '804' ? ukraineWithCrimea : country)),
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
  const initialTransform = () => ({ scale: initialScale, x: width / 2 - initialFocus[0] * initialScale, y: viewHeight / 2 - initialFocus[1] * initialScale });
  const state = { ...initialTransform(), didDrag: false };

  svg.setAttribute('viewBox', `0 0 ${width} ${viewHeight}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Zoomable map of European countries. Select a country to open its national movement profile.');
  svg.setAttribute('tabindex', '0');
  mapLayer.setAttribute('class', 'wf-map-layer');
  tooltip.className = 'wf-map-tooltip';
  tooltip.hidden = true;
  mapNode.classList.add('wf-map-is-navigable');

  const updateTransform = () => mapLayer.setAttribute('transform', `translate(${state.x} ${state.y}) scale(${state.scale})`);
  const resetMap = () => { Object.assign(state, initialTransform()); updateTransform(); };
  const zoomAt = (factor, point = [width / 2, viewHeight / 2]) => {
    const nextScale = Math.min(maxScale, Math.max(minScale, state.scale * factor));
    const ratio = nextScale / state.scale;
    state.x = point[0] - (point[0] - state.x) * ratio;
    state.y = point[1] - (point[1] - state.y) * ratio;
    state.scale = nextScale;
    updateTransform();
  };
  const svgPoint = (event) => {
    const rect = svg.getBoundingClientRect();
    return [(event.clientX - rect.left) * (width / rect.width), (event.clientY - rect.top) * (viewHeight / rect.height)];
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

  // Pointer gestures: one pointer pans (starting anywhere, including on a
  // country), two pointers pinch-zoom around their midpoint. A tap that never
  // moves past the threshold still follows the country link.
  const pointers = new Map();
  let gesture = null;
  // Capture can throw if the pointer was already released or cancelled; panning still works without it.
  const capture = (id) => { try { if (!svg.hasPointerCapture(id)) svg.setPointerCapture(id); } catch { /* ignore */ } };
  const startGesture = () => {
    const points = [...pointers.values()].map(svgPoint);
    const midpoint = points.length > 1
      ? [(points[0][0] + points[1][0]) / 2, (points[0][1] + points[1][1]) / 2]
      : points[0];
    const distance = points.length > 1 ? Math.hypot(points[0][0] - points[1][0], points[0][1] - points[1][1]) : 0;
    gesture = { midpoint, distance, scale: state.scale, x: state.x, y: state.y, moved: gesture?.moved ?? false };
  };
  svg.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointers.set(event.pointerId, event);
    if (pointers.size > 2) return;
    if (pointers.size === 1) state.didDrag = false;
    startGesture();
    if (pointers.size === 2) {
      gesture.moved = true;
      state.didDrag = true;
      tooltip.hidden = true;
      pointers.forEach((_, id) => capture(id));
    }
  });
  svg.addEventListener('pointermove', (event) => {
    if (!gesture || !pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, event);
    const points = [...pointers.values()].slice(0, 2).map(svgPoint);
    const midpoint = points.length > 1
      ? [(points[0][0] + points[1][0]) / 2, (points[0][1] + points[1][1]) / 2]
      : points[0];
    const dx = midpoint[0] - gesture.midpoint[0];
    const dy = midpoint[1] - gesture.midpoint[1];
    if (!gesture.moved) {
      // Convert the movement threshold to screen pixels so it feels the same at any map size.
      const rect = svg.getBoundingClientRect();
      if (Math.hypot(dx * rect.width / width, dy * rect.height / viewHeight) < 6) return;
      gesture.moved = true;
      state.didDrag = true;
      tooltip.hidden = true;
      // Capture only once a drag starts, so a plain tap still clicks the country underneath.
      capture(event.pointerId);
    }
    let scale = gesture.scale;
    if (points.length > 1 && gesture.distance) {
      const distance = Math.hypot(points[0][0] - points[1][0], points[0][1] - points[1][1]);
      scale = Math.min(maxScale, Math.max(minScale, gesture.scale * (distance / gesture.distance)));
    }
    const ratio = scale / gesture.scale;
    state.scale = scale;
    state.x = midpoint[0] - (gesture.midpoint[0] - gesture.x) * ratio;
    state.y = midpoint[1] - (gesture.midpoint[1] - gesture.y) * ratio;
    updateTransform();
  });
  const endPointer = (event) => {
    if (!pointers.delete(event.pointerId)) return;
    if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    if (pointers.size) { startGesture(); return; }
    gesture = null;
    // Let the click that follows a drag see didDrag before clearing it.
    window.setTimeout(() => { state.didDrag = false; }, 0);
  };
  svg.addEventListener('pointerup', endPointer);
  svg.addEventListener('pointercancel', endPointer);
  svg.addEventListener('dblclick', (event) => { event.preventDefault(); zoomAt(1.6, svgPoint(event)); });

  // Keep the map centred on the same spot when the container changes shape (e.g. rotating a phone).
  new ResizeObserver(() => {
    const nextHeight = Math.round(width * viewportAspect());
    if (nextHeight === viewHeight) return;
    state.y += (nextHeight - viewHeight) / 2;
    viewHeight = nextHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${viewHeight}`);
    updateTransform();
  }).observe(mapNode);

  svg.addEventListener('keydown', (event) => {
    if (event.key === '+' || event.key === '=') { event.preventDefault(); zoomAt(1.16); }
    if (event.key === '-') { event.preventDefault(); zoomAt(.86); }
    if (event.key === '0') { event.preventDefault(); resetMap(); }
  });

  updateTransform();
  svg.append(mapLayer);
  mapNode.append(svg, tooltip);
  const instructions = mapNode.querySelector('.wf-map-instructions');
  if (instructions && window.matchMedia('(pointer: coarse)').matches) {
    instructions.textContent = 'Drag to explore · Pinch to zoom';
  }
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
  const directory = countryRecords
    .map(([id, name, status]) => ({ name, status, flag: flagEmoji(countryFlagCodes.get(id)) }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const renderDirectory = () => {
    const searchTerm = directorySearch?.value.trim().toLocaleLowerCase() ?? '';
    const selectedStatus = directoryStatus?.value ?? '';
    const matchingCountries = directory.filter(({ name, status }) => (
      (!searchTerm || name.toLocaleLowerCase().includes(searchTerm))
      && (!selectedStatus || status === selectedStatus)
    ));

    directoryNode.innerHTML = matchingCountries.map(({ name, status, flag }) => {
      const href = `country-profile.html?${new URLSearchParams({ country: name, status })}`;
      return `<a class="wf-country-row" href="${href}" aria-label="View ${name}: ${statusLabel(status)}">
        <span class="wf-country-mark" aria-hidden="true">${flag}</span>
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
