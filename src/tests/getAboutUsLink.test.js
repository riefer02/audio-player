const getAboutUsLink = require('../utililties/getAboutUsLink');

test('Returns about-us for english language', () => {
  expect(getAboutUsLink('en-US')).toBe('/about-us');
  // expect(getAboutUsLink('cs-CZ')).toBe('/o-nas');
});

test('Test spanish translation', () => {
  expect(getAboutUsLink('es-ES')).toBe('/acerca-de');
});
