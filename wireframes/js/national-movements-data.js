// Shared by the national movements map/directory and the contact form.
// Each record: [ISO 3166-1 numeric id, country name, movement status].
export const countryRecords = [
  ['008', 'Albania', 'emerging'], ['020', 'Andorra', 'none'], ['040', 'Austria', 'none'], ['056', 'Belgium', 'emerging'], ['070', 'Bosnia and Herzegovina', 'emerging'], ['100', 'Bulgaria', 'emerging'], ['191', 'Croatia', 'emerging'], ['196', 'Cyprus', 'emerging'], ['203', 'Czechia', 'emerging'], ['208', 'Denmark', 'active'], ['233', 'Estonia', 'emerging'], ['246', 'Finland', 'emerging'], ['250', 'France', 'active'], ['276', 'Germany', 'active'], ['300', 'Greece', 'emerging'], ['348', 'Hungary', 'emerging'], ['352', 'Iceland', 'emerging'], ['372', 'Ireland', 'active'], ['380', 'Italy', 'active'], ['383', 'Kosovo', 'none'], ['428', 'Latvia', 'emerging'], ['438', 'Liechtenstein', 'none'], ['440', 'Lithuania', 'emerging'], ['442', 'Luxembourg', 'none'], ['470', 'Malta', 'emerging'], ['492', 'Monaco', 'none'], ['499', 'Montenegro', 'none'], ['807', 'North Macedonia', 'none'], ['528', 'Netherlands', 'active'], ['578', 'Norway', 'active'], ['616', 'Poland', 'none'], ['620', 'Portugal', 'active'], ['642', 'Romania', 'emerging'], ['674', 'San Marino', 'none'], ['688', 'Serbia', 'emerging'], ['703', 'Slovakia', 'active'], ['705', 'Slovenia', 'emerging'], ['724', 'Spain', 'active'], ['752', 'Sweden', 'emerging'], ['756', 'Switzerland', 'active'], ['792', 'Turkey', 'none'], ['804', 'Ukraine', 'emerging'], ['826', 'United Kingdom', 'emerging']
];

export const countryFlagCodes = new Map([
  ['008', 'AL'], ['020', 'AD'], ['040', 'AT'], ['056', 'BE'], ['070', 'BA'], ['100', 'BG'],
  ['191', 'HR'], ['196', 'CY'], ['203', 'CZ'], ['208', 'DK'], ['233', 'EE'], ['246', 'FI'],
  ['250', 'FR'], ['276', 'DE'], ['300', 'GR'], ['348', 'HU'], ['352', 'IS'], ['372', 'IE'],
  ['380', 'IT'], ['383', 'XK'], ['428', 'LV'], ['438', 'LI'], ['440', 'LT'], ['442', 'LU'],
  ['470', 'MT'], ['492', 'MC'], ['499', 'ME'], ['528', 'NL'], ['578', 'NO'], ['616', 'PL'],
  ['620', 'PT'], ['642', 'RO'], ['674', 'SM'], ['688', 'RS'], ['703', 'SK'], ['705', 'SI'],
  ['724', 'ES'], ['752', 'SE'], ['756', 'CH'], ['792', 'TR'], ['804', 'UA'], ['807', 'MK'],
  ['826', 'GB']
]);

export const flagEmoji = (countryCode) => String.fromCodePoint(
  ...[...countryCode].map((letter) => 0x1F1A5 + letter.charCodeAt(0))
);

export const statusLabel = (status) => ({ active: 'Active movement', emerging: 'Emerging movement', none: 'No movement' }[status]);
