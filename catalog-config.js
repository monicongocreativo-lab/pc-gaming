// Local: consulta atual. GitHub Pages: cópia datada para avaliação do desenho.
const localPreview = ['127.0.0.1', 'localhost', '[::1]'].includes(location.hostname) && location.port === '4173';
window.EUROSYS_CATALOG = localPreview
  ? { endpoint: '/api/catalog' }
  : { endpoint: new URL('catalog-pages.json', document.currentScript.src).href, snapshot: true };
