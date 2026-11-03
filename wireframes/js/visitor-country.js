// Best guess at which country the visitor is in, as an ISO 3166-1 alpha-2 code.
//
// The prototype reads the device time zone (Europe/Berlin → DE): no permission
// prompt, no network request and no personal data leaves the browser. It is a
// guess: Kosovo shares Belgrade's zone, and a laptop keeps its home zone until
// its clock follows a trip. In production, swap this for the country the host
// already knows from the visitor's IP address (Netlify, Vercel and Cloudflare
// all provide it at the edge) without changing the callers.
//
// For testing, ?from=DE pretends the visitor is in that country.
const timeZoneCountries = {
  'Europe/Tirane': 'AL', 'Europe/Andorra': 'AD', 'Europe/Vienna': 'AT', 'Europe/Brussels': 'BE',
  'Europe/Sarajevo': 'BA', 'Europe/Sofia': 'BG', 'Europe/Zagreb': 'HR', 'Asia/Nicosia': 'CY',
  'Asia/Famagusta': 'CY', 'Europe/Nicosia': 'CY', 'Europe/Prague': 'CZ', 'Europe/Copenhagen': 'DK',
  'Europe/Tallinn': 'EE', 'Europe/Helsinki': 'FI', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE',
  'Europe/Busingen': 'DE', 'Europe/Athens': 'GR', 'Europe/Budapest': 'HU', 'Atlantic/Reykjavik': 'IS',
  'Europe/Dublin': 'IE', 'Europe/Rome': 'IT', 'Europe/Riga': 'LV', 'Europe/Vaduz': 'LI',
  'Europe/Vilnius': 'LT', 'Europe/Luxembourg': 'LU', 'Europe/Malta': 'MT', 'Europe/Monaco': 'MC',
  'Europe/Podgorica': 'ME', 'Europe/Amsterdam': 'NL', 'Europe/Oslo': 'NO', 'Europe/Skopje': 'MK',
  'Europe/Warsaw': 'PL', 'Europe/Lisbon': 'PT', 'Atlantic/Madeira': 'PT', 'Atlantic/Azores': 'PT',
  'Europe/Bucharest': 'RO', 'Europe/San_Marino': 'SM', 'Europe/Belgrade': 'RS', 'Europe/Bratislava': 'SK',
  'Europe/Ljubljana': 'SI', 'Europe/Madrid': 'ES', 'Africa/Ceuta': 'ES', 'Atlantic/Canary': 'ES',
  'Europe/Stockholm': 'SE', 'Europe/Zurich': 'CH', 'Europe/Istanbul': 'TR', 'Europe/Kyiv': 'UA',
  'Europe/Kiev': 'UA', 'Europe/London': 'GB', 'Europe/Belfast': 'GB',
};

export const visitorCountryCode = () => {
  const testCountry = new URLSearchParams(window.location.search).get('from');
  if (testCountry) return testCountry.toUpperCase();
  try {
    return timeZoneCountries[Intl.DateTimeFormat().resolvedOptions().timeZone] ?? null;
  } catch {
    return null;
  }
};
