// Adaptador de leitura do HTML público para a pré-visualização local.
// Na Eurosys, substituir pela mesma consulta/componente da página original.
const cache = new Map();
function decode(value='') {
  return value.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,'\u00a0').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
}
function text(value='') { return decode(value.replace(/<[^>]*>/g,'')).trim(); }
function parseProducts(html, brand) {
  const cards=[...html.matchAll(/<article\b[^>]*data-testid="product-card"[^>]*>([\s\S]*?)<\/article>/g)];
  return cards.flatMap(([,card])=>{
    const name=text(card.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1]);
    const route=decode(card.match(/href="(\/produto\/[^"#?]+)"/)?.[1]);
    if(!name||!route||!decode(route.split('/').pop()).toUpperCase().startsWith(brand+'-'))return [];
    const paragraphs=[...card.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m=>text(m[1]));
    const price=paragraphs.find(p=>/\d[\d.,\s]*\s*€/.test(p));
    const stock=text(card.match(/<span[^>]*class="eurosys-stock-badge[^"]*"[^>]*>([\s\S]*?)<\/span>/)?.[1]);
    const rawImage=decode(card.match(/<img\b[^>]*\ssrc="([^"]+)"/)?.[1]);
    let image=null;try{const u=new URL(rawImage);if(u.protocol==='https:'&&['iapc.pt','eurosys.pt','www.eurosys.pt'].includes(u.hostname))image=u.href;}catch{}
    return [{name,url:'https://eurosys.pt'+route,image,description:paragraphs.find(p=>p.includes('|'))||'',price:price||null,vat:paragraphs.includes('IVA incluído'),stock:stock||null}];
  });
}
async function loadCatalog(brand) {
  if(!['ASTON','HYDRA','RAPTOR'].includes(brand))throw new Error('Família inválida');
  const saved=cache.get(brand);if(saved&&Date.now()-saved.time<120000)return saved.data;
  const first=new URL('https://eurosys.pt/catalogo');first.search=new URLSearchParams({categoria:'computers',brand,skip_filter:'brand'}).toString();
  const queue=[first.href], visited=new Set(), products=new Map();
  while(queue.length){
    const url=queue.shift();if(visited.has(url))continue;visited.add(url);
    if(visited.size>20)throw new Error('Paginação excede o limite do adaptador');
    const response=await fetch(url,{signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error(`Catálogo: ${response.status}`);
    const html=await response.text();const found=parseProducts(html,brand);if(!found.length)throw new Error('Não foi possível ler os produtos do catálogo');
    found.forEach(p=>products.set(p.url,p));
    for(const [,href]of html.matchAll(/href="([^"]+)"/g)){
      const decoded=decode(href);if(!decoded.includes('page='))continue;
      const next=new URL(decoded,url);
      if(next.origin!==first.origin||next.pathname!=='/catalogo'||next.searchParams.get('brand')!==brand||next.searchParams.get('categoria')!=='computers'||next.searchParams.has('preco')||next.searchParams.has('sort'))continue;
      // Normalizar a ordem dos parâmetros para evitar duplicação da página 1.
      const page=Number(next.searchParams.get('page'));if(!Number.isInteger(page)||page<2)continue;
      const normalized=new URL(first);normalized.searchParams.set('page',String(page));
      if(!visited.has(normalized.href)&&!queue.includes(normalized.href))queue.push(normalized.href);
    }
  }
  const data={products:[...products.values()],updatedAt:new Date().toISOString(),source:first.href,pages:visited.size};cache.set(brand,{time:Date.now(),data});return data;
}
module.exports={parseProducts,loadCatalog};
