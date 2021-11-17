const englishCode = 'en-US';
const spanishCode = 'es-ES';

export function getAboutUsLink(language: string) {
  switch (language.toLowerCase()) {
    case englishCode.toLowerCase():
      return '/about-us';
    case spanishCode.toLowerCase():
      return '/acerca-de';
  }
  return '';
}
// module.exports = getAboutUsLink;
