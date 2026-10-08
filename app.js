(() => {
'use strict';
const root = document.querySelector('.eurosys-gaming');
if (!root || root.dataset.initialized === 'true') return;
root.dataset.initialized = 'true';
const options = window.EUROSYS_GAMING || {};
const scriptBase = new URL('.', document.currentScript?.src || location.href);
const assetBase = new URL(options.assetBase || '.', options.assetBase ? location.href : scriptBase);
const asset = value => new URL(value, assetBase).href;
const families = {
  ASTON: { logo: 'ASTON/Aston.svg', image: 'ASTON/ASTON-57U7V1.png', setupImage: 'ASTON/exec-5abb6f11-c557-4e0a-bd1f-3a892f17c9ed.png', detail: 'ASTON/Asset 31.png', accent: '#d8fb65', title: 'O teu próximo<br>nível começa aqui.' },
  HYDRA: { logo: 'HYDRA/Hydra.svg', image: 'HYDRA/exec-f8052d7d-3463-4f6c-9e36-7187faed5ab7.png', setupImage: 'HYDRA/exec-b3183f69-669a-4d25-982e-1677948ee019.png', detail: 'HYDRA/Asset 30.png', accent: '#6be5ef', title: 'Entra no jogo.<br>Cria o teu mundo.' },
  RAPTOR: { logo: 'RAPTOR/Raptor.svg', image: 'RAPTOR/exec-fa39c1fa-863a-415c-a973-8e89f02fbb21.png', setupImage: 'RAPTOR/exec-6b096ded-a3e5-4f7f-9319-771886ba08a3.png', detail: 'RAPTOR/Asset 32.png', accent: '#ff865b', title: 'O jogo começa<br>no teu setup.' }
};
const routeFamily = location.pathname.match(/^\/pcgaming\/(aston|hydra|raptor)\/?$/i)?.[1];
const requested = (root.dataset.family || options.family || routeFamily || new URLSearchParams(location.search).get('familia'))?.toUpperCase();
const family = Object.hasOwn(families, requested) ? requested : 'ASTON';
const data = families[family];
root.dataset.family = family;
root.querySelectorAll('[data-family]').forEach(link => { link.href = options.familyLinks?.[link.dataset.family] || (routeFamily ? `/pcgaming/${link.dataset.family.toLowerCase()}` : `?familia=${link.dataset.family}`); });
const catalog = `https://eurosys.pt/catalogo?categoria=computers&brand=${family}&skip_filter=brand`;
document.title = `${family} — Gaming com presença | Eurosys`;
root.style.setProperty('--accent', data.accent);
root.querySelector('#family-logo').src = asset(data.logo);
root.querySelector('#family-logo').alt = family;
root.querySelector('#hero-pc').src = asset(data.image);
root.querySelector('#hero-pc').alt = `Imagem ilustrativa da família ${family}`;
root.querySelector('#setup-pc').src = asset(data.setupImage);
root.querySelector('#setup-pc').alt = `Composição ilustrativa com uma máquina da família ${family}`;
root.querySelector('#detail-image').src = asset(data.detail);
root.querySelector('#detail-image').alt = `Apresentação visual da família ${family}`;
root.querySelector('#hero-title').innerHTML = data.title;
root.querySelector('#hero-description').textContent = `Um setup com presença. Descobre a família ${family} e encontra a máquina para o teu próximo capítulo.`;
root.querySelector('#identity-copy').textContent = `Há máquinas que fazem parte do espaço. E há máquinas que lhe dão identidade. Explora a ${family} através do seu design e das configurações disponíveis na Eurosys.`;
root.querySelector('#stage-family').textContent = `${family} SERIES`;
root.querySelector('#catalog-family').textContent = family;
root.querySelectorAll('.catalog-link').forEach(a => a.href = catalog);
root.querySelector('#catalog-status .button').textContent = `Ver máquinas ${family} ↗`;
root.querySelector(`[data-family="${family}"]`).setAttribute('aria-current', 'page');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: .08});
  root.querySelectorAll('.identity, .detail, .hardware-section').forEach(el => {el.classList.add('reveal');observer.observe(el);});
  root.classList.add('js-ready');
}
if (!reduced && matchMedia('(pointer: fine)').matches) {
  const stage = root.querySelector('.hero-stage');
  stage.addEventListener('pointermove', e => { if(root.classList.contains('motion-paused'))return;const box=stage.getBoundingClientRect(); stage.style.setProperty('--px', `${((e.clientX-box.left)/box.width-.5)*14}px`);stage.style.setProperty('--py', `${((e.clientY-box.top)/box.height-.5)*10}px`); });
  stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--px','0px');stage.style.setProperty('--py','0px');});
}
// SVG original preservado; movimento aplicado ao contentor, sem duplicar os vetores.
async function animateBrand() {
  try {
    const response=await fetch(asset(data.logo));if(!response.ok)return;
    const xml=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
    if(xml.querySelector('parsererror'))return;
    const svg=xml.documentElement;svg.setAttribute('role','img');svg.setAttribute('aria-label',family);svg.classList.add('animated-brand');
    svg.removeAttribute('id');
    svg.querySelectorAll('image').forEach(image=>{const href=image.getAttribute('href')||image.getAttributeNS('http://www.w3.org/1999/xlink','href');if(href&&!href.startsWith('data:')){const url=new URL(href,asset(data.logo)).href;image.setAttribute('href',url);image.setAttributeNS('http://www.w3.org/1999/xlink','href',url);if(family==='HYDRA')image.classList.add('brand-glow-image');}});
    // Os estilos do ficheiro SVG ficam limitados a esta marca, evitando colisões.
    svg.querySelectorAll('style').forEach(style=>style.textContent=style.textContent.replace(/\.(cls-\d+|st\d+)\b/g,'.animated-brand .$1'));
    root.querySelector('#brand-mark').replaceChildren(document.importNode(svg,true));
  }catch{ /* Preservar a imagem original caso o SVG inline não carregue. */ }
}
animateBrand();
const motionButton=root.querySelector('#motion-toggle');
motionButton.addEventListener('click',()=>{const paused=root.classList.toggle('motion-paused');motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Retomar animações':'Pausar animações');motionButton.textContent=paused?'▷':'Ⅱ';root.querySelector('.hero-stage').style.setProperty('--px','0px');root.querySelector('.hero-stage').style.setProperty('--py','0px');});

const components={
  cooling:{number:'01 / ARREFECIMENTO',title:'O equilíbrio<br>também está no interior.',description:'O arrefecimento ajuda a gerir o calor produzido pelos componentes. O sistema instalado depende da configuração de cada máquina.'},
  memory:{number:'02 / MEMÓRIA',title:'Espaço para<br>o que está a acontecer.',description:'A memória mantém disponíveis os dados das aplicações em utilização. Consulta a capacidade, o tipo e a configuração de RAM na ficha de cada modelo.'},
  graphics:{number:'03 / GRÁFICA',title:'O teu mundo.<br>Imagem a imagem.',description:'O processamento gráfico participa na construção das imagens dos jogos. O desempenho depende da gráfica, dos restantes componentes e das definições utilizadas.'}
};
root.querySelectorAll('[data-component]').forEach(button=>button.addEventListener('click',()=>{
  const info=components[button.dataset.component];root.querySelectorAll('[data-component]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  root.querySelector('#component-number').textContent=info.number;root.querySelector('#component-title').innerHTML=info.title;root.querySelector('#component-description').textContent=info.description;
}));
function safeEurosysUrl(value) { try {const url=new URL(value,'https://eurosys.pt/');return url.protocol==='https:' && ['eurosys.pt','www.eurosys.pt'].includes(url.hostname) ? url.href : null;} catch {return null;} }
function safeImageUrl(value) {try{const url=new URL(value);return url.protocol==='https:'&&['iapc.pt','eurosys.pt','www.eurosys.pt'].includes(url.hostname)?url.href:null;}catch{return null;}}
async function loadProducts() {
  const grid = root.querySelector('#products');
  // Na Eurosys, preservar os cartões renderizados pelo catálogo existente.
  if (grid.children.length) {root.querySelector('#catalog-status').hidden=true;return;}
  const endpoint = options.catalogEndpoint ?? window.EUROSYS_CATALOG?.endpoint;
  if (!endpoint) return;
  try {
    const url = new URL(endpoint, location.href);url.searchParams.set('brand',family);
    root.querySelector('.catalog-intro').textContent=`A carregar as máquinas ${family}…`;
    root.querySelector('#catalog-status').hidden=true;
    const response=await fetch(url, {signal:AbortSignal.timeout(60000)});
    if(!response.ok) throw new Error('Catálogo indisponível');
    const result=await response.json();const products=Array.isArray(result)?result:result.products;if(!Array.isArray(products)||!products.length) throw new Error('Formato inválido');
    let count=0;
    products.forEach(item=>{
      const href=safeEurosysUrl(item.url);if(!href||typeof item.name!=='string')return;
      const card=document.createElement('article');card.className='product';
      const imageUrl=safeImageUrl(item.image);
      if(imageUrl){const imageLink=document.createElement('a');imageLink.className='product-image';imageLink.href=href;const img=document.createElement('img');img.src=imageUrl;img.alt=item.name;img.loading='lazy';img.addEventListener('error',()=>{img.hidden=true;imageLink.classList.add('image-unavailable');imageLink.textContent='Ver imagem na Eurosys ↗';},{once:true});imageLink.append(img);card.append(imageLink);}
      const name=document.createElement('h3');name.textContent=item.name;card.append(name);
      if(typeof item.description==='string'){const description=document.createElement('p');description.textContent=item.description;card.append(description);}
      const details=document.createElement('div');details.className='product-details';
      if(typeof item.price==='string'){const price=document.createElement('strong');price.className='product-price';price.textContent=item.price;details.append(price);if(item.vat){const vat=document.createElement('small');vat.textContent='IVA incluído';details.append(vat);}}
      if(typeof item.stock==='string'){const stock=document.createElement('span');stock.className='product-stock';if(item.stock.toLowerCase().includes('esgotado'))stock.classList.add('unavailable');stock.textContent=item.stock;details.append(stock);}
      card.append(details);
      const link=document.createElement('a');link.className='product-action';link.href=href;link.textContent='Ver máquina ↗';card.append(link);grid.append(card);count++;
    });
    if (!count) throw new Error('Sem produtos válidos');
    if(count)root.querySelector('#catalog-status').hidden=true;
    root.querySelector('.catalog-intro').textContent=`${count} máquinas ${family} · Preços e disponibilidade consultados na Eurosys. Confirma as condições na ficha de produto.`;
  } catch(error) { root.querySelector('#catalog-status').hidden=false;root.querySelector('.catalog-intro').textContent='Não foi possível carregar as máquinas neste momento. Consulta a gama no catálogo Eurosys.';console.warn('Integração do catálogo:',error.message); }
}
loadProducts();
})();

