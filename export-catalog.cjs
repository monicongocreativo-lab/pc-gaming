// Atualizar a cópia pública antes de publicar a pré-visualização em GitHub Pages.
const fs = require('node:fs/promises');
const path = require('node:path');
const { loadCatalog } = require('./catalog-source.cjs');
(async () => {
  const families = {};
  for (const family of ['ASTON', 'HYDRA', 'RAPTOR']) {
    families[family] = await loadCatalog(family);
    console.log(`${family}: ${families[family].products.length} produtos`);
  }
  const target = path.join(__dirname, 'catalog-pages.json');
  await fs.writeFile(target, JSON.stringify({ purpose: 'Pré-visualização do desenho; confirmar preços e stock na Eurosys.', families }, null, 2) + '\n');
  console.log('Cópia datada guardada em catalog-pages.json');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
