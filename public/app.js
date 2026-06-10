/* ============================================================
   NIVASA - data + interactivity (vanilla)
   ============================================================ */

/* ---------- Image helpers (Unsplash + graceful fallback) ---------- */
const IMG = {
  hero:        'photo-1564013799919-ab600027ffc6',
  villa:       'photo-1600596542815-ffad4c1539a9',
  apt:         'photo-1545324418-cc1a3fa10c00',
  plot:        'photo-1500382017468-9049fed747ef',
  penthouse:   'photo-1567496898669-ee935f5f647a',
  farmhouse:   'photo-1416331108676-a22ccb276e35',
  l1:          'photo-1568605114967-8130f3a36994',
  l2:          'photo-1512917774080-9991f1c4c750',
  l3:          'photo-1613490493576-7fde63acd811',
  l4:          'photo-1564013799919-ab600027ffc6',
  l5:          'photo-1600585154340-be6161a56a0c',
  l6:          'photo-1570129477492-45c003edd2be',
  cta:         'photo-1600607687939-ce8a6c25118c',
  f1:          'photo-1600566753086-00f18fb6b3ea',
  f2:          'photo-1605276374104-dee2a0ed3cd6',
  // Udupi apartments
  sairadha:    'photo-1560448204-e02f11c3d0e2',
  grasslands:  'photo-1493809842364-78817add7ffb',
  mandavi:     'photo-1502672260266-1c1ef2d93688',
  // hotels & resorts
  resort:      'photo-1571896349842-33c89424de2d',
  hotel:       'photo-1566073771259-6a8506099945',
  beachresort: 'photo-1520250497591-112f2f40a3f4',
};
const FALLBACKS = [
  'linear-gradient(150deg,#8aa0b1,#586c61 60%,#36433a)',
  'linear-gradient(150deg,#c9b79b,#9c8362 60%,#5f4f3a)',
  'linear-gradient(150deg,#9fb0a6,#6d7d72 55%,#3b463d)',
  'linear-gradient(150deg,#b8c2cc,#7d8c98 60%,#4a5560)',
];
function uns(id, w){ return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w||900}&q=80`; }
function imgEl(key, w, alt){
  const i = document.createElement('img');
  i.src = (window.__resources && window.__resources[key]) ? window.__resources[key] : uns(IMG[key], w); i.alt = alt||''; i.loading='lazy';
  i.dataset.fb = FALLBACKS[(Math.abs(hash(key))) % FALLBACKS.length];
  i.onerror = () => { i.style.display='none'; if(i.parentElement) i.parentElement.style.background = i.dataset.fb; };
  return i;
}
function hash(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return h;}

/* ---------- Cities ---------- */
const CITIES = [
  {name:'Bangalore', region:'Karnataka', count:'1,240'},
  {name:'Udupi',     region:'Karnataka', count:'186'},
  {name:'Mumbai',    region:'Maharashtra', count:'2,090'},
  {name:'Goa',       region:'Goa', count:'412'},
  {name:'Pune',      region:'Maharashtra', count:'968'},
  {name:'Chennai',   region:'Tamil Nadu', count:'1,015'},
  {name:'Hyderabad', region:'Telangana', count:'1,302'},
  {name:'Kochi',     region:'Kerala', count:'524'},
  {name:'Mysuru',    region:'Karnataka', count:'288'},
];

/* ---------- Listings ---------- */
const LISTINGS = [
  {img:'l1', price:'₹4.2', unit:'Cr', tag:'New', accent:true, ttl:'Courtyard House, Whitefield', loc:'Whitefield, Bangalore', beds:4, baths:5, area:'3,800', city:'Bangalore', type:'Villa'},
  {img:'l2', price:'₹2.85', unit:'Cr', tag:'Verified', ttl:'The Banyan Residences', loc:'Indiranagar, Bangalore', beds:3, baths:3, area:'2,150', city:'Bangalore', type:'Apartment'},
  {img:'l3', price:'₹6.5', unit:'Cr', tag:'Sea View', ttl:'Malpe Cliff Villa', loc:'Malpe, Udupi', beds:5, baths:6, area:'5,200', city:'Udupi', type:'Villa'},
  {img:'l4', price:'₹1.95', unit:'Cr', tag:'New', accent:true, ttl:'Laurel Court Penthouse', loc:'Koramangala, Bangalore', beds:3, baths:4, area:'2,640', city:'Bangalore', type:'Penthouse'},
  {img:'l5', price:'₹3.4', unit:'Cr', tag:'Verified', ttl:'Heritage Plot - Manipal', loc:'Manipal, Udupi', beds:0, baths:0, area:'8,000', city:'Udupi', type:'Plot'},
  {img:'l6', price:'₹5.1', unit:'Cr', tag:'Featured', accent:true, ttl:'Skyline Duplex 21', loc:'HSR Layout, Bangalore', beds:4, baths:4, area:'3,200', city:'Bangalore', type:'Apartment'},
  {img:'sairadha', price:'₹1.45', unit:'Cr', tag:'New', accent:true, ttl:'Sai Radha Heights', loc:'Kunjibettu, Udupi', beds:3, baths:3, area:'1,860', city:'Udupi', type:'Apartment'},
  {img:'grasslands', price:'₹1.1', unit:'Cr', tag:'New', ttl:'Grasslands Greens', loc:'Manipal, Udupi', beds:2, baths:2, area:'1,340', city:'Udupi', type:'Apartment'},
  {img:'mandavi', price:'₹1.78', unit:'Cr', tag:'Verified', ttl:'Mandavi Riviera', loc:'Court Road, Udupi', beds:3, baths:3, area:'2,050', city:'Udupi', type:'Apartment'},
  {img:'beachresort', price:'₹18.5', unit:'Cr', tag:'Hospitality', accent:true, ttl:'Malpe Beach Resort', loc:'Malpe, Udupi', beds:24, baths:26, area:'62 cents', city:'Udupi', type:'Hotel & Resort'},
  {img:'resort', price:'₹32', unit:'Cr', tag:'Featured', ttl:'Kaup Backwater Retreat', loc:'Kaup, Udupi', beds:40, baths:42, area:'1.4 acres', city:'Udupi', type:'Hotel & Resort'},
  {img:'hotel', price:'₹12.8', unit:'Cr', tag:'New', ttl:'The Manipal Boutique Hotel', loc:'Tiger Circle, Manipal', beds:32, baths:34, area:'38 cents', city:'Udupi', type:'Hotel & Resort'},
];

/* ---------- Featured carousel ---------- */
const FEATURED = [
  {name:'Courtyard House - Vista Line', loc:'Whitefield, Bangalore', completion:'Q4 2026', plot:'30', area:'4,200', price:'₹4.2', unit:'Cr', thumbs:['l1','villa']},
  {name:'Malpe Cliff Villa - Shore Line', loc:'Malpe, Udupi', completion:'Q2 2027', plot:'52', area:'6,100', price:'₹6.5', unit:'Cr', thumbs:['l3','l4']},
  {name:'Malpe Beach Resort - Shoreline', loc:'Malpe, Udupi', completion:'Ready', plot:'62', area:'24,000', price:'₹18.5', unit:'Cr', thumbs:['beachresort','resort']},
  {name:'Skyline Duplex - Crest Line', loc:'HSR Layout, Bangalore', completion:'Ready', plot:'20', area:'3,200', price:'₹5.1', unit:'Cr', thumbs:['l6','l2']},
];

const CATEGORIES = [
  {n:'Villas', c:'820 homes', img:'villa'},
  {n:'Apartments', c:'3,140 homes', img:'apt'},
  {n:'Hotels & Resorts', c:'95 properties', img:'resort'},
  {n:'Plots & Land', c:'640 listings', img:'plot'},
];

const TABS = [
  {id:'buy', label:'Buy', cnt:'8.2k'},
  {id:'rent', label:'Rent', cnt:'3.1k'},
  {id:'stays', label:'Hotels', cnt:'95'},
  {id:'plots', label:'Plots', cnt:'640'},
  {id:'commercial', label:'Commercial', cnt:'910'},
];

/* ============================================================
   ICONS
   ============================================================ */
const I = {
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  caret:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>',
  geo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v3M12 19v3M22 12h-3M5 12H2"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  left:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 6l-6 6 6 6"/></svg>',
  right:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6l6 6-6 6"/></svg>',
  key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="15" r="4"/><path d="M10.8 12.2 20 3M16 7l3 3M14 9l2 2"/></svg>',
  ruler:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 12 12 3l9 9-9 9z"/><path d="M7.5 7.5l1.5 1.5M10.5 10.5l1.5 1.5M13.5 13.5l1.5 1.5"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 11 12 4l8 7M6 9.5V20h12V9.5"/></svg>',
  rupee:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 4h10M7 8h10M7 8c5 0 5 7 0 7M13 15l5 5"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 20S4 14.5 4 8.8A4.3 4.3 0 0 1 12 6a4.3 4.3 0 0 1 8 2.8C20 14.5 12 20 12 20Z"/></svg>',
  bed:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18M7 9V6.5"/></svg>',
  bath:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 11V6a2 2 0 0 1 4 0M7 21l-1 1M18 21l1 1"/></svg>',
  area:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v5M12 16v5M3 12h5M16 12h5M5.6 5.6l3 3M15.4 15.4l3 3M18.4 5.6l-3 3M8.6 15.4l-3 3"/></svg>',
  filter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18M6 12h12M10 19h4"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v4h-4"/></svg>',
  ghost:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 21V9a7 7 0 0 1 14 0v12l-2.5-2-2.5 2-2.5-2-2 2-2.5-2L5 21Z"/><circle cx="9.5" cy="10" r="1" fill="currentColor"/><circle cx="14.5" cy="10" r="1" fill="currentColor"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-11"/></svg>',
  moon2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>',
  sun2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.1 5.1l1.8 1.8M17.1 17.1l1.8 1.8M18.9 5.1l-1.8 1.8M6.9 17.1l-1.8 1.8"/></svg>',
  // contextual brand mark: a heritage arch (threshold) enclosing an N monogram that reads as columns + roofline
  logo:'<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M7 35.5V17.5a13 13 0 0 1 26 0v18" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/><path d="M14 34.5V16l12 16.5V16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1"><path d="M12 5v14M5 12h14"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v4.4M12 17.6V22M2 12h4.4M17.6 12H22"/></svg>',
  building:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5.5" y="3" width="13" height="18"/><path d="M9 7h2.2M12.8 7H15M9 11h2.2M12.8 11H15M9 15h2.2M12.8 15H15M10.5 21v-3h3v3"/></svg>',
};

/* ============================================================
   STATE
   ============================================================ */
const state = { city:'Bangalore', tab:'buy', empty:false, fav:new Set(), featIdx:0, filter:'All', sort:'newest' };
window.I = I; // expose icon set for the inline icon-setter (and robustness when bundled)

/* ============================================================
   BUILD
   ============================================================ */
function el(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstElementChild;}
function $(s,r=document){return r.querySelector(s);}
function $all(s,r=document){return [...r.querySelectorAll(s)];}

function buildNav(){
  $('#logoMark').innerHTML = I.logo;
  $('#brandMark').innerHTML = 'NYVASA';
  const links = $('#navLinks');
  // the four journeys you can start on Nyvasa
  ['Buy','Rent','Book','Sell'].forEach((l,i)=>{
    const a=el(`<a class="nav-link ${i===0?'active':''}" href="#">${l}</a>`);
    a.addEventListener('click',e=>{
      e.preventDefault();
      $all('.nav-link').forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
      if(window.openJourney) window.openJourney(l.toLowerCase());
    });
    links.appendChild(a);
  });
  $('#bookIc').innerHTML = I.plus;
}

/* mobile app bottom tab bar - 5 slots with a central Post FAB (owner-first) */
function buildTabbar(){
  const left=[
    {ic:'home', label:'Home', href:'#top'},
    {ic:'search', label:'Explore', href:'#listings'},
  ];
  const right=[
    {ic:'heart', label:'Saved', href:'#listings'},
    {ic:'user', label:'Account', href:'#listings'},
  ];
  const bar=$('#tabbar'); if(!bar) return;
  const mk=(t,i)=>{
    const b=el(`<a class="tab ${t.ic==='home'?'active':''}" href="${t.href}"><span class="ti">${I[t.ic]}</span><span class="tl">${t.label}</span></a>`);
    b.addEventListener('click',()=>{ $all('.tab').forEach(x=>x.classList.remove('active')); b.classList.add('active'); });
    return b;
  };
  left.forEach(mk2=>bar.appendChild(mk(mk2)));
  // central Post FAB
  const fab=el(`<button class="tab-fab" aria-label="Post a listing"><span class="fi">${I.plus}</span><span class="fl">Post</span></button>`);
  fab.addEventListener('click',()=>{ if(window.openJourney) window.openJourney('sell'); });
  bar.appendChild(fab);
  right.forEach(mk2=>bar.appendChild(mk(mk2)));
}

/* The Nyvasa offering - image-led category picker */
const CAT_PICK=[
  {img:'farmhouse',  title:'All Properties',      verb:'Browse',     filter:'All'},
  {img:'apt',        title:'Premium Apartments', verb:'Buy',        filter:'Apartment'},
  {img:'villa',      title:'Villas & Courtyards', verb:'Buy',       filter:'Villa'},
  {img:'penthouse',  title:'Penthouses',          verb:'Buy',       filter:'Penthouse'},
  {img:'beachresort',title:'Hotels & Resorts',    verb:'Book',      filter:'Hotel & Resort'},
  {img:'plot',       title:'Plots & Land',        verb:'Buy · Sell', filter:'Plot'},
];

function buildHero(){
  $('#heroImg').appendChild(imgEl('hero',1900,'Modern luxury villa at dusk'));
  // giant wordmark letters (entrance staggered via transition-delay)
  const head=$('#heroHead');
  'NYVASA'.split('').forEach((ch)=>{
    const s=el(`<span class="hh-l">${ch}</span>`);
    head.appendChild(s);
  });
  // command bar
  $('#hbLocIc').innerHTML=I.pin;
  $('#hbLocCaret').innerHTML=I.caret;
  $('#hbCatCaret').innerHTML=I.caret;
  $('#hbLocText').textContent=state.city;
  $('#searchGo').innerHTML=`${I.search} Search`;
  setCategory('All', false);
  buildCatPicker();
}

function buildFeatured(){ renderFeatured(); }
function renderFeatured(){
  const f = FEATURED[state.featIdx];
  $('#fxTag').textContent = `Featured Project · ${String(state.featIdx+1).padStart(2,'0')} / ${String(FEATURED.length).padStart(2,'0')}`;
  $('#fxName').textContent = f.name;
  $('#fxLoc').innerHTML = `${I.pin} ${f.loc}`;
  $('#fxStats').innerHTML = `
    <div class="fx-stat"><div class="k">${I.key} Completion</div><div class="v">${f.completion}</div></div>
    <div class="fx-stat"><div class="k">${I.ruler} Plot Size</div><div class="v">${f.plot}<span style="font-size:.42em"> cents</span></div></div>
    <div class="fx-stat"><div class="k">${I.home} Built-up Area</div><div class="v">${f.area}<span style="font-size:.42em"> sq ft</span></div></div>
    <div class="fx-stat fx-price"><div class="k">${I.rupee} Guide Price</div><div class="v">${f.price}<span style="font-size:.5em"> ${f.unit}</span></div></div>`;
  const tw = $('#fxThumbs'); tw.innerHTML='';
  f.thumbs.forEach(t=>tw.appendChild(imgEl(t,200)));
  $('#fxNavL').innerHTML = I.left; $('#fxNavR').innerHTML = I.right;
  // cinematic property photo behind the blueprint panel
  const plan = document.querySelector('.fx-plan');
  let ph = plan.querySelector('.fx-photo');
  if(!ph){ ph = document.createElement('div'); ph.className='fx-photo'; plan.insertBefore(ph, plan.firstChild); }
  ph.innerHTML=''; ph.appendChild(imgEl(f.thumbs[0],1100,f.name));
}

function buildCats(){
  const wrap = $('#cats');
  CATEGORIES.forEach(c=>{
    const card = el(`<a class="cat reveal" href="#listings"><div class="pad"><div class="c-n">${c.n}</div><div class="c-c">${c.c}</div></div></a>`);
    card.insertBefore(imgEl(c.img,800,c.n), card.firstChild);
    wrap.appendChild(card);
  });
}

function cardHTML(d){
  return `<article class="card reveal">
    <div class="ph">
      <div class="tags">${d.tag?`<span class="tagb ${d.accent?'accent':''}">${d.tag}</span>`:''}</div>
      <button class="fav" data-fav="${d.ttl}" aria-label="Save">${I.heart}</button>
    </div>
    <div class="body">
      <div class="price">${d.price}<span class="pm">${d.unit}</span></div>
      <div class="ttl">${d.ttl}</div>
      <div class="loc">${I.pin} ${d.loc}</div>
      <div class="specs">
        ${d.beds?`<span>${I.bed} ${d.beds} ${d.type==='Hotel & Resort'?'Keys':'Beds'}</span>`:''}
        ${d.baths && d.type!=='Hotel & Resort'?`<span>${I.bath} ${d.baths} Baths</span>`:''}
        <span>${I.area} ${/[a-z]/i.test(d.area)?d.area:d.area+' sqft'}</span>
      </div>
    </div></article>`;
}
function skeletonHTML(){
  return `<article class="card sk skeleton">
    <div class="ph"></div>
    <div class="body">
      <div class="skeleton-line price"></div>
      <div class="skeleton-line ttl"></div>
      <div class="skeleton-line loc"></div>
      <div class="skeleton-line specs"></div>
    </div></article>`;
}
function priceToLakhs(d){ const n=parseFloat(String(d.price).replace(/[^\d.]/g,''))||0; return d.unit==='Cr'? n*100 : n; }
function visibleListings(){
  let arr = LISTINGS.filter(l=> l.city===state.city);
  if(arr.length<3) arr = LISTINGS.slice(); // fallback to all if city has few
  if(state.filter!=='All') arr = arr.filter(l=>l.type===state.filter);
  if(state.sort==='price-asc') arr = arr.slice().sort((a,b)=>priceToLakhs(a)-priceToLakhs(b));
  else if(state.sort==='price-desc') arr = arr.slice().sort((a,b)=>priceToLakhs(b)-priceToLakhs(a));
  return arr;
}
function renderListings(loading){
  const grid = $('#grid');
  grid.innerHTML='';
  if(loading){ for(let i=0;i<6;i++) grid.appendChild(el(skeletonHTML())); return; }
  if(state.empty){
    grid.appendChild(el(`<div class="empty reveal in">
      <div class="ei">${I.ghost}</div>
      <h3>No homes match those filters</h3>
      <p>We couldn't find listings in ${state.city} for this combination. Try widening your budget or exploring a nearby area.</p>
      <button class="btn" id="resetEmpty">${I.refresh} Reset filters</button>
    </div>`));
    $('#resetEmpty').onclick = ()=>{ state.empty=false; loadListings(); };
    const rc=$('#resultCount'); if(rc) rc.textContent='0 homes';
    return;
  }
  const arr = visibleListings();
  const rc=$('#resultCount'); if(rc) rc.textContent = arr.length + (arr.length===1?' home':' homes');
  if(arr.length===0){ state.empty=true; renderListings(false); return; }
  arr.forEach(d=>{
    const c = el(cardHTML(d));
    c.querySelector('.ph').insertBefore(imgEl(d.img,800,d.ttl), c.querySelector('.ph').firstChild);
    if(state.fav.has(d.ttl)) c.querySelector('.fav').classList.add('on');
    grid.appendChild(c);
  });
  wireFavs(); observeReveal();
}
function loadListings(){
  renderListings(true);
  clearTimeout(loadListings._t);
  loadListings._t = setTimeout(()=>renderListings(false), 1100);
}
function buildFilters(){
  const bar = $('#listFilters');
  ['All','Villa','Apartment','Hotel & Resort','Penthouse','Plot'].forEach(f=>{
    bar.appendChild(el(`<button class="chip ${f==='All'?'active':''}" data-filter="${f}">${f==='All'?'All':f==='Hotel & Resort'?'Hotels':f+'s'}</button>`));
  });
}

function buildCities(){
  const row = $('#cityRow');
  CITIES.slice(0,4).forEach(c=>{
    const card = el(`<div class="city" data-city="${c.name}">
      <div class="go">${I.arrow}</div>
      <div class="cn">${c.name}</div>
      <div class="cc">${c.count}</div>
      <div class="cl">homes in ${c.region}</div>
    </div>`);
    card.onclick = ()=>{ setCity(c.name); document.querySelector('#listings').scrollIntoView({block:'start'}); };
    row.appendChild(card);
  });
}

function buildValues(){
  const data=[
    {i:'shield',h:'Verified, end-to-end',p:'Every listing is title-checked and RERA-validated before it reaches you.'},
    {i:'eye',h:'See it before you visit',p:'3D tours, floor plans and real owner photography - shortlist with confidence.'},
    {i:'user',h:'Advisors, not agents',p:'A dedicated manager handles negotiation and paperwork, at zero cost to buyers.'},
  ];
  const wrap=$('#values');
  data.forEach(v=>{
    wrap.appendChild(el(`<div class="value reveal"><div class="vi">${I[v.i]}</div><h3>${v.h}</h3><p>${v.p}</p></div>`));
  });
}

function buildCTA(){
  $('#ctaMedia').appendChild(imgEl('cta',1700,'Architect interior'));
  $('#ctaBtn1').innerHTML = `${I.plus} Post your listing - free`;
  $('#ctaBtn2').innerHTML = `${I.user} Talk to an advisor`;
}

function buildFooter(){
  $('#footLogo').innerHTML = I.logo;
  $('#footBrand').textContent='NYVASA';
  const cols=[
    {h:'Explore',a:['Buy a home','Rent a home','New projects','Plots & land','Commercial']},
    {h:'Company',a:['Our story','Careers','Press','Advisors','Contact']},
    {h:'Resources',a:['Home loans','Price trends','Area guides','Help centre','Sitemap']},
  ];
  const wrap=$('#footCols');
  cols.forEach(c=>{
    const col=el(`<div class="foot-col"><h4>${c.h}</h4></div>`);
    c.a.forEach(a=>col.appendChild(el(`<a href="#">${a}</a>`)));
    wrap.appendChild(col);
  });
}

/* ---------- Location modal ---------- */
function buildModal(){
  $('#detectIc').innerHTML = I.geo;
  $('#modalX').innerHTML = I.x;
  const grid=$('#cityGrid');
  CITIES.forEach(c=>{
    const o=el(`<button class="city-opt ${c.name===state.city?'sel':''}" data-city="${c.name}"><div class="con">${c.name}</div><div class="coc">${c.region} · ${c.count}</div></button>`);
    o.onclick=()=>{ setCity(c.name); closeModal(); };
    grid.appendChild(o);
  });
}
function openModal(){ $('#modalBg').classList.add('open'); }
function closeModal(){ $('#modalBg').classList.remove('open'); }
function openCatModal(){ $('#catModalBg').classList.add('open'); }
function closeCatModal(){ $('#catModalBg').classList.remove('open'); }

/* image-led category picker */
function buildCatPicker(){
  const grid=$('#catPickGrid'); if(!grid) return;
  CAT_PICK.forEach(c=>{
    const card=el(`<button class="cat-pick" data-filter="${c.filter}">
      <span class="cpk-media"></span>
      <span class="cpk-body">
        <span class="cpk-verb">${c.verb}</span>
        <span class="cpk-title">${c.title}</span>
        <span class="cpk-go">${I.arrow}</span>
      </span>
    </button>`);
    card.querySelector('.cpk-media').appendChild(imgEl(c.img,640,c.title));
    card.onclick=()=>{ setCategory(c.filter,true); closeCatModal(); };
    grid.appendChild(card);
  });
}
function setCategory(filter, reload){
  state.filter=filter;
  const c=CAT_PICK.find(x=>x.filter===filter) || CAT_PICK[0];
  const label=$('#hbCatText'); if(label) label.textContent=c.title;
  const thumb=$('#hbCatThumb');
  if(thumb){ thumb.innerHTML=''; thumb.appendChild(imgEl(c.img,120,c.title)); }
  if(reload){ syncListFilterChips(); loadListings(); toast(`${c.verb==='Book'?'Booking':'Browsing'} ${c.title.toLowerCase()} · ${state.city}`); }
}
function syncListFilterChips(){ $all('#listFilters .chip').forEach(c=>c.classList.toggle('active', c.dataset.filter===state.filter)); }
function setCity(name){
  state.city=name;
  const hb=$('#hbLocText'); if(hb) hb.textContent=name;
  $all('.city-opt').forEach(o=>o.classList.toggle('sel',o.dataset.city===name));
  $('#listCity').textContent=name;
  toast(`Showing homes in ${name}`);
  loadListings();
}
function detectLocation(btn){
  btn.classList.add('loading');
  const t=$('#detectTxt'); const prev=t.innerHTML;
  t.innerHTML='<b>Detecting…</b><span>Reading your approximate location</span>';
  setTimeout(()=>{
    btn.classList.remove('loading');
    t.innerHTML=prev;
    setCity('Udupi');
    closeModal();
  },1600);
}

/* ---------- favourites ---------- */
function wireFavs(){
  $all('.fav').forEach(b=>{
    b.onclick=()=>{
      const id=b.dataset.fav;
      if(state.fav.has(id)){state.fav.delete(id);b.classList.remove('on');}
      else{state.fav.add(id);b.classList.add('on');toast('Saved to your shortlist');}
    };
  });
}

/* ---------- toast ---------- */
let toastT;
function toast(msg){
  const t=$('#toast'); t.querySelector('span').textContent=msg;
  t.classList.add('show'); clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove('show'),2400);
}

/* ---------- reveal on scroll ---------- */
/* ---------- reveal on scroll (robust, no IO dependency) ---------- */
function showEl(n){ n.classList.add('in'); n.style.opacity='1'; n.style.transform='none'; }
function revealCheck(){
  $all('.reveal:not(.in)').forEach(n=>{ if(n.getBoundingClientRect().top < innerHeight*0.92) showEl(n); });
}
let revealTick=false;
function onScrollReveal(){ if(revealTick)return; revealTick=true; requestAnimationFrame(()=>{revealCheck();revealTick=false;}); }
function observeReveal(){
  revealCheck();
  // hard fallback: never leave content hidden (covers fast scroll / export / reduced-motion)
  clearTimeout(observeReveal._t);
  observeReveal._t=setTimeout(()=>$all('.reveal:not(.in)').forEach(n=>showEl(n)),900);
}

/* ============================================================
   EVENTS
   ============================================================ */
function wireEvents(){
  // nav links active
  $('#navLinks').addEventListener('click',e=>{
    const a=e.target.closest('.nav-link'); if(!a)return;
    $all('#navLinks .nav-link').forEach(x=>x.classList.remove('active')); a.classList.add('active');
  });
  // location: search field opens the city picker
  // location: command bar + listings eyebrow open the picker
  $('#hbLoc').onclick=openModal;
  $('#listCityBtn').onclick=openModal;
  $('#modalX').onclick=closeModal;
  $('#modalBg').addEventListener('click',e=>{if(e.target===$('#modalBg'))closeModal();});
  $('#detectBtn').onclick=()=>detectLocation($('#detectBtn'));
  // category picker
  $('#hbCat').onclick=openCatModal;
  $('#catModalX').onclick=closeCatModal;
  $('#catModalBg').addEventListener('click',e=>{if(e.target===$('#catModalBg'))closeCatModal();});
  // search → listings
  $('#searchGo').onclick=()=>{
    toast(`Searching ${state.tab==='rent'?'rentals':'homes'} · ${state.city}`);
    document.querySelector('#listings').scrollIntoView({block:'start'});
    loadListings();
  };
  // theme toggle - single source: nav button
  $('#themeBtn').onclick=()=>setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark');
  // featured carousel
  $('#fxNavL').onclick=()=>{state.featIdx=(state.featIdx-1+FEATURED.length)%FEATURED.length;renderFeatured();};
  $('#fxNavR').onclick=()=>{state.featIdx=(state.featIdx+1)%FEATURED.length;renderFeatured();};
  // listing filters
  $('#listFilters').addEventListener('click',e=>{
    const c=e.target.closest('.chip'); if(!c)return;
    $all('#listFilters .chip').forEach(x=>x.classList.remove('active')); c.classList.add('active');
    state.filter=c.dataset.filter; loadListings();
  });
  // sort cycle: Newest → Price: Low → Price: High
  const SORTS=[['newest','Newest'],['price-asc','Price: Low'],['price-desc','Price: High']];
  $('#sortBtn').onclick=()=>{
    const i=SORTS.findIndex(s=>s[0]===state.sort);
    const next=SORTS[(i+1)%SORTS.length];
    state.sort=next[0]; $('#sortLabel').textContent=next[1];
    renderListings(false);
  };

  // nav: Post a Listing → open the Sell journey
  document.querySelector('.btn-book')?.addEventListener('click',()=>{
    if(window.openJourney) window.openJourney('sell');
  });

  // Owner CTA buttons
  $('#ctaBtn1')?.addEventListener('click',e=>{ e.preventDefault(); e.stopPropagation(); if(window.openJourney) window.openJourney('sell'); });
  $('#ctaBtn2')?.addEventListener('click',e=>{ e.preventDefault(); e.stopPropagation(); toast('Advisor will be in touch within 24 hours'); });

  // brand: scroll to top
  document.querySelector('.brand')?.addEventListener('click',e=>{
    e.preventDefault(); e.stopPropagation();
    window.scrollTo({top:0,behavior:'smooth'});
  });

  // Listing cards → open detail (placeholder)
  $('#grid')?.addEventListener('click',e=>{
    if(e.target.closest('.fav')) return; // fav has its own handler
    const card=e.target.closest('.card'); if(!card||card.classList.contains('sk')) return;
    const title=card.querySelector('.ttl')?.textContent||'listing';
    toast(`Opening ${title}`);
  });

  // Featured panel → open detail
  document.querySelector('.featured .fx-plan')?.addEventListener('click',e=>{
    if(e.target.closest('button')) return;
    const name=document.querySelector('#fxName')?.textContent||'featured estate';
    toast(`Opening ${name}`);
  });

  // catch-all: any unhandled placeholder link (href="#") should feel alive
  document.body.addEventListener('click',e=>{
    const a=e.target.closest('a[href="#"]');
    if(!a) return;
    e.preventDefault();
    const label=(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,40)||'link';
    toast(`${label} - coming soon`);
  });
}
function setTheme(mode){
  const root=document.documentElement;
  // suspend transitions during the swap so no var()-based paint gets stuck
  root.classList.add('theme-switching');
  root.setAttribute('data-theme',mode);
  // nav button shows the icon for the mode you'll switch TO
  const tb=$('#themeBtn'); if(tb) tb.innerHTML = mode==='dark' ? I.sun2 : I.moon2;
  // browser/status-bar chrome colour
  const meta=$('#themeColorMeta'); if(meta) meta.setAttribute('content', mode==='dark' ? '#15160f' : '#f4f1ea');
  const sb=document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if(sb) sb.setAttribute('content', mode==='dark' ? 'black-translucent' : 'default');
  try{ localStorage.setItem('nyvasa-theme',mode); }catch(e){}
  // re-enable transitions after the paint settles
  void root.offsetWidth;
  requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove('theme-switching')));
}
function initTheme(){
  let mode='light';
  try{ mode=localStorage.getItem('nyvasa-theme')|| (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'); }catch(e){}
  setTheme(mode);
}
/* nav contrast: solidify the floating nav once we scroll off the hero image */
function initNavScroll(){
  const nav=document.querySelector('.nav');
  const hero=document.querySelector('.hero');
  if(!nav||!hero) return;
  const onScroll=()=>{ nav.classList.toggle('scrolled', window.scrollY > hero.offsetHeight - 90); };
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  onScroll();
}

/* ============================================================
   INIT
   ============================================================ */
function init(){
  buildNav(); buildTabbar(); buildHero(); buildFeatured(); buildCats(); buildFilters();
  buildCities(); buildValues(); buildCTA(); buildFooter(); buildModal();
  wireEvents(); initTheme(); initNavScroll();
  loadListings(); observeReveal();
  window.addEventListener('scroll',onScrollReveal,{passive:true});
  window.addEventListener('resize',onScrollReveal,{passive:true});
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
else init();


/* ===== journeys ===== */
/* ============================================================
   NYVASA - End-to-end journeys (Buy / Rent / Book / Sell)
   Full-screen multi-step flows with a progress tracker.
   Reuses globals from app.js: $, el, I, LISTINGS, CITIES, imgEl,
   toast, state, setCategory, loadListings, setCity, syncListFilterChips
   ============================================================ */
(function(){

  /* ---- flow definitions: ordered steps shown in the tracker ---- */
  const FLOWS = {
    buy:{
      accent:'var(--brass)', label:'Buy',
      eyebrow:'Buy with Nyvasa',
      intro:'Own a home, verified to the last detail.',
      sub:'Set your brief, tour privately, and let an advisor handle the paperwork.',
      steps:['Brief','Browse','Viewing','Review','Confirmed'],
    },
    rent:{
      accent:'var(--accent)', label:'Rent',
      eyebrow:'Rent with Nyvasa',
      intro:'Rent a home, move in without the friction.',
      sub:'Tell us what you need, visit, and sign digitally with a verified owner.',
      steps:['Brief','Browse','Visit','Apply','Confirmed'],
    },
    book:{
      accent:'#bd6a4e', label:'Book',
      eyebrow:'Book a stay',
      intro:'Stay at India\'s finest homes and resorts.',
      sub:'Pick your dates, choose a property, and reserve in a few taps.',
      steps:['Dates','Choose','Guests','Review','Reserved'],
    },
    sell:{
      accent:'var(--brass)', label:'Sell',
      eyebrow:'Sell or list with Nyvasa',
      intro:'List your property to verified buyers.',
      sub:'Free to list. An advisor manages enquiries, viewings and price guidance.',
      steps:['Property','Highlights','Contact','Review','Listed'],
    },
  };

  /* ---- pricing helpers ---- */
  const cr = d => d.unit==='Cr' ? parseFloat(String(d.price).replace(/[^\d.]/g,'')) : parseFloat(String(d.price).replace(/[^\d.]/g,''))/100;
  const monthlyK = d => Math.max(18, Math.round(cr(d)*24));
  const nightly  = d => Math.max(8000, Math.round(cr(d)*1.5)*1000);
  const inr = n => '₹'+Math.round(n).toLocaleString('en-IN');
  const isoPlus = days => { const dt=new Date(); dt.setDate(dt.getDate()+days); return dt.toISOString().slice(0,10); };
  const fmtDate = iso => { if(!iso) return '-'; const d=new Date(iso); return d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); };
  const nights = (a,b)=>{ if(!a||!b) return 0; const d=(new Date(b)-new Date(a))/86400000; return d>0?Math.round(d):0; };

  /* ---- per-open state ---- */
  let cur='buy', step=0, maxStep=0, D={};

  function resetData(){
    D={ city:'Any', type:'Any', budget:'any', property:null,
        checkin:isoPlus(14), checkout:isoPlus(16), guests:2,
        date:isoPlus(3), time:'', name:'', phone:'',
        moveIn:'', furnish:'Furnished',
        sType:'Apartment', sCity:CITIES[0].name, sArea:'', sPrice:'', highlights:[] };
  }

  /* ---- shell ---- */
  function ensureShell(){
    if($('#journey')) return;
    const ov=el(`<div class="journey" id="journey" role="dialog" aria-modal="true">
      <div class="j-bar">
        <span class="j-brand"><span class="j-logo" id="jLogo"></span><span class="j-label" id="jLabel"></span></span>
        <div class="j-progress" id="jProgress"></div>
        <button class="j-close" id="jClose" aria-label="Close"></button>
      </div>
      <div class="j-scroll"><div class="j-inner" id="jInner"></div></div>
      <div class="j-foot" id="jFoot"></div>
    </div>`);
    document.body.appendChild(ov);
    $('#jLogo').innerHTML=I.logo;
    $('#jClose').innerHTML=I.x;
    $('#jClose').onclick=closeJourney;
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && $('#journey').classList.contains('open')) closeJourney(); });
  }

  function openJourney(type){
    if(!FLOWS[type]) return;
    ensureShell();
    cur=type; step=0; maxStep=0; resetData();
    const f=FLOWS[type];
    const o=$('#journey');
    o.setAttribute('data-j',type);
    o.style.setProperty('--j-accent', f.accent);
    $('#jLabel').textContent=f.label;
    paint();
    document.body.style.overflow='hidden';
    void o.offsetWidth;
    o.classList.add('open');
  }
  function closeJourney(){ const o=$('#journey'); if(!o) return; o.classList.remove('open'); document.body.style.overflow=''; }

  function go(n){
    step=Math.max(0,Math.min(FLOWS[cur].steps.length-1,n));
    maxStep=Math.max(maxStep,step);
    paint();
    const sc=$('.j-scroll'); if(sc) sc.scrollTop=0;
  }

  /* ---- results for browse steps ---- */
  function results(){
    let arr=LISTINGS.slice();
    if(cur==='book') arr=arr.filter(d=>d.type==='Hotel & Resort');
    else { arr=arr.filter(d=>d.type!=='Hotel & Resort'); if(cur==='rent') arr=arr.filter(d=>d.type!=='Plot'); }
    if(D.city!=='Any') arr=arr.filter(d=>d.city===D.city);
    if(D.type!=='Any') arr=arr.filter(d=>d.type===D.type);
    if(cur==='buy' && D.budget!=='any') arr=arr.filter(d=>{const v=cr(d);
      return D.budget==='u2'?v<2:D.budget==='2_4'?(v>=2&&v<4):D.budget==='4_8'?(v>=4&&v<8):v>=8;});
    if(cur==='rent' && D.budget!=='any') arr=arr.filter(d=>{const m=monthlyK(d);
      return D.budget==='u50'?m<50:D.budget==='50_1'?(m>=50&&m<100):D.budget==='1_2'?(m>=100&&m<200):m>=200;});
    return arr;
  }
  function priceHTML(d){
    if(cur==='rent') return `<b>₹${monthlyK(d)}k</b><small>/mo</small>`;
    if(cur==='book') return `<b>${inr(nightly(d))}</b><small>/night</small>`;
    return `<b>${d.price} ${d.unit}</b>`;
  }
  function specsHTML(d){
    return d.type==='Hotel & Resort'
      ? `<i>${I.bed} ${d.beds} keys</i><i>${I.area} ${/[a-z]/i.test(d.area)?d.area:d.area+' sqft'}</i>`
      : `${d.beds?`<i>${I.bed} ${d.beds}</i>`:''}${d.baths?`<i>${I.bath} ${d.baths}</i>`:''}<i>${I.area} ${/[a-z]/i.test(d.area)?d.area:d.area+' sqft'}</i>`;
  }
  function cardHTML(d,idx,selectable){
    const sel = selectable && D.property && D.property.img===d.img;
    return `<article class="jcard ${selectable?'selectable':''} ${sel?'sel':''}" data-idx="${idx}" tabindex="0">
      <span class="jc-media" data-img="${d.img}"></span>
      <span class="jc-tag">${d.tag||'Verified'}</span>
      ${sel?`<span class="jc-check">${I.check}</span>`:''}
      <span class="jc-body">
        <span class="jc-price">${priceHTML(d)}</span>
        <span class="jc-ttl">${d.ttl}</span>
        <span class="jc-loc">${I.pin} ${d.loc}</span>
        <span class="jc-specs">${specsHTML(d)}</span>
      </span>
    </article>`;
  }

  /* ---- small field builders ---- */
  const citySelect = (val,id)=>`<span class="j-select"><span class="j-pin">${I.pin}</span><select id="${id}">${['Any',...CITIES.map(c=>c.name)].map(c=>`<option ${c===val?'selected':''} value="${c}">${c==='Any'?'Any city':c}</option>`).join('')}</select><span class="j-caret">${I.caret}</span></span>`;
  const chips = (id,opts,val,multi)=>`<div class="j-chips" id="${id}">${opts.map(o=>{const v=Array.isArray(o)?o[0]:o,l=Array.isArray(o)?o[1]:o;const on=multi?val.includes(v):val===v;return `<button type="button" class="j-chip ${on?'on':''}" data-v="${v}">${l}</button>`;}).join('')}</div>`;

  /* ---- summary of selected property ---- */
  function propSummary(d){
    if(!d) return '';
    return `<div class="j-prop"><span class="j-prop-media" data-img="${d.img}"></span>
      <div class="j-prop-tx"><div class="j-prop-ttl">${d.ttl}</div>
      <div class="j-prop-loc">${I.pin} ${d.loc}</div>
      <div class="j-prop-price">${priceHTML(d)}</div></div></div>`;
  }

  /* ============================================================
     PAINT
     ============================================================ */
  function paint(){
    const f=FLOWS[cur];
    // progress
    $('#jProgress').innerHTML = f.steps.map((s,i)=>
      `<button class="j-pstep ${i===step?'active':''} ${i<step?'done':''}" data-i="${i}" ${i<=maxStep?'':'disabled'}>
        <span class="j-pdot">${i<step?I.check:(i+1)}</span><span class="j-plabel">${s}</span></button>`
    ).join('<span class="j-pline"></span>');
    $$('.j-pstep').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i; if(i<=maxStep) go(i); });

    const body = (cur==='buy'||cur==='rent') ? residentialStep()
               : cur==='book' ? bookStep()
               : sellStep();
    $('#jInner').innerHTML = body.html;
    $('#jFoot').innerHTML = body.foot;
    if(body.after) body.after();
    hydrate();
    wireFoot();
  }
  function $$(s,r=document){return [...r.querySelectorAll(s)];}
  function hydrate(){ $$('.jc-media,[data-img]').forEach(m=>{ if(m.dataset.img && !m.firstChild){ m.appendChild(imgEl(m.dataset.img, m.classList.contains('j-prop-media')?240:560, '')); } }); }

  function foot(backLabel, nextLabel, nextOk, onNext){
    return {label:nextLabel};
  }
  function footHTML(showBack, nextLabel, ok){
    return `${showBack?`<button class="j-back" id="jBack">${I.left} Back</button>`:'<span></span>'}
      <button class="j-go" id="jNext" ${ok?'':'disabled'}>${nextLabel}</button>`;
  }
  let _onNext=null;
  function wireFoot(){
    const b=$('#jBack'); if(b) b.onclick=()=>go(step-1);
    const n=$('#jNext'); if(n) n.onclick=()=>{ if(_onNext) _onNext(); };
  }

  /* ---- intro header ---- */
  function head(title,sub){ return `<header class="j-intro"><div class="j-eyebrow">${FLOWS[cur].eyebrow}</div><h2 class="j-title">${title}</h2>${sub?`<p class="j-sub">${sub}</p>`:''}</header>`; }

  /* ============================================================
     BUY + RENT
     ============================================================ */
  function residentialStep(){
    const f=FLOWS[cur];
    const budgets = cur==='buy'
      ? [['any','Any'],['u2','Under ₹2 Cr'],['2_4','₹2-4 Cr'],['4_8','₹4-8 Cr'],['8p','₹8 Cr+']]
      : [['any','Any'],['u50','< ₹50k'],['50_1','₹50k-1L'],['1_2','₹1-2L'],['2p','₹2L+']];
    const types = cur==='buy' ? ['Any','Apartment','Villa','Penthouse','Plot'] : ['Any','Apartment','Villa','Penthouse'];

    if(step===0){
      _onNext=()=>{ D.city=$('#jCity').value; go(1); };
      const extra = cur==='rent' ? `
        <div class="j-field"><span class="j-flab">Move-in</span><span class="j-input">${I.cal}<input type="month" id="jMoveIn" value="${D.moveIn}"></span></div>
        <div class="j-field"><span class="j-flab">Furnishing</span>${chips('jFurnish',['Furnished','Semi','Unfurnished'],D.furnish,false)}</div>` : '';
      return { html: head(f.intro,f.sub)+`
        <div class="j-form">
          <div class="j-field"><span class="j-flab">Location</span>${citySelect(D.city,'jCity')}</div>
          <div class="j-field"><span class="j-flab">Property type</span>${chips('jType',types,D.type,false)}</div>
          <div class="j-field"><span class="j-flab">Budget</span>${chips('jBudget',budgets,D.budget,false)}</div>
          ${extra}
        </div>
        <div class="j-steps">
          <div class="j-step"><span class="j-step-n">01</span><div><div class="j-step-h">Set your brief</div><div class="j-step-p">Location, type and budget - refine anytime.</div></div></div>
          <div class="j-step"><span class="j-step-n">02</span><div><div class="j-step-h">${cur==='buy'?'Tour privately':'Visit'}</div><div class="j-step-p">Shortlist, then book a viewing that suits you.</div></div></div>
          <div class="j-step"><span class="j-step-n">03</span><div><div class="j-step-h">${cur==='buy'?'Own it':'Move in'}</div><div class="j-step-p">An advisor handles ${cur==='buy'?'negotiation and paperwork':'agreement and handover'}.</div></div></div>
        </div>`,
        foot: footHTML(false, `Browse ${cur==='rent'?'rentals':'homes'} ${I.arrow}`, true),
        after:()=>{
          $('#jType')&&wireChips('jType',v=>D.type=v);
          $('#jBudget')&&wireChips('jBudget',v=>D.budget=v);
          $('#jFurnish')&&wireChips('jFurnish',v=>D.furnish=v);
        }};
    }

    if(step===1){
      const arr=results();
      _onNext=()=>{ if(D.property) go(2); };
      return { html: head(cur==='buy'?'Choose a home to tour.':'Choose a home to visit.', `Showing ${arr.length} ${arr.length===1?'home':'homes'}${D.city!=='Any'?' in '+D.city:''}.`)+
        `<div class="j-results">${arr.length?arr.map((d,i)=>cardHTML(d, LISTINGS.indexOf(d), true)).join(''):`<div class="j-empty">${I.ghost}<p>Nothing matches yet. Go back and widen your brief.</p></div>`}</div>`,
        foot: footHTML(true, D.property?`Continue ${I.arrow}`:'Select a home to continue', !!D.property),
        after:()=>wireSelect() };
    }

    if(step===2){
      const slots=['9:00 AM','11:30 AM','2:00 PM','4:30 PM','6:00 PM'];
      _onNext=()=>{ D.name=$('#jName').value.trim(); D.phone=$('#jPhone').value.trim(); if(valid2()) go(3); };
      const title = cur==='buy'?'Book a private viewing.':'Book a visit.';
      return { html: head(title, 'Pick a time. Your advisor confirms within the hour.')+
        propSummary(D.property)+
        `<div class="j-form">
          <div class="j-field"><span class="j-flab">Preferred date</span><span class="j-input">${I.cal}<input type="date" id="jDate" value="${D.date}" min="${isoPlus(0)}"></span></div>
          <div class="j-field j-span2"><span class="j-flab">Time slot</span>${chips('jTime',slots,D.time,false)}</div>
          <div class="j-field"><span class="j-flab">Your name</span><span class="j-input"><input type="text" id="jName" value="${D.name}" placeholder="Full name"></span></div>
          <div class="j-field"><span class="j-flab">Phone</span><span class="j-input"><input type="tel" id="jPhone" value="${D.phone}" placeholder="+91 ....."></span></div>
        </div>`,
        foot: footHTML(true, 'Add a time and your details', false),
        after:()=>{
          wireChips('jTime',v=>{D.time=v; gate(valid2,`Review ${I.arrow}`,'Add a time and your details');});
          $('#jDate').onchange=e=>D.date=e.target.value;
          ['jName','jPhone'].forEach(id=>$('#'+id).oninput=()=>{D[id==='jName'?'name':'phone']=$('#'+id).value; gate(valid2,`Review ${I.arrow}`,'Add a time and your details');});
          gate(valid2,`Review ${I.arrow}`,'Add a time and your details');
        }};
    }

    if(step===3){
      _onNext=()=>go(4);
      return { html: head('Review and confirm.', '')+
        propSummary(D.property)+
        reviewRows([
          [cur==='buy'?'Viewing date':'Visit date', fmtDate(D.date)],
          ['Time', D.time||'-'],
          cur==='rent'?['Move-in', D.moveIn?fmtDate(D.moveIn+'-01'):'Flexible']:null,
          cur==='rent'?['Furnishing', D.furnish]:null,
          ['Name', D.name||'-'],
          ['Phone', D.phone||'-'],
        ])+
        `<p class="j-fine">By confirming you agree to a callback from a Nyvasa advisor. No charge, no obligation.</p>`,
        foot: footHTML(true, `Confirm ${cur==='buy'?'viewing':'visit'} ${I.arrow}`, true) };
    }

    // done
    return doneStep(
      `${cur==='buy'?'Viewing':'Visit'} booked for ${fmtDate(D.date)}.`,
      `We have your request for <b>${D.property?D.property.ttl:''}</b>. An advisor will call ${D.phone?('on '+D.phone):''} to confirm ${D.time?('your '+D.time+' slot'):'a time'}.`);
  }
  function valid2(){ return D.date && D.time && D.name.trim() && D.phone.trim().length>=6; }

  /* ============================================================
     BOOK
     ============================================================ */
  function bookStep(){
    if(step===0){
      _onNext=()=>{ D.city=$('#jCity').value; D.checkin=$('#jIn').value; D.checkout=$('#jOut').value; if(nights(D.checkin,D.checkout)>0) go(1); };
      return { html: head(FLOWS.book.intro, FLOWS.book.sub)+
        `<div class="j-form">
          <div class="j-field"><span class="j-flab">Destination</span>${citySelect(D.city,'jCity')}</div>
          <div class="j-field"><span class="j-flab">Check in</span><span class="j-input">${I.cal}<input type="date" id="jIn" value="${D.checkin}" min="${isoPlus(0)}"></span></div>
          <div class="j-field"><span class="j-flab">Check out</span><span class="j-input">${I.cal}<input type="date" id="jOut" value="${D.checkout}" min="${isoPlus(1)}"></span></div>
          <div class="j-field"><span class="j-flab">Guests</span><span class="j-stepper"><button type="button" data-g="-1">-</button><b id="jGuests">${D.guests}</b><button type="button" data-g="1">+</button></span></div>
        </div>
        <div class="j-steps">
          <div class="j-step"><span class="j-step-n">01</span><div><div class="j-step-h">Choose dates</div><div class="j-step-p">Check availability across our collection.</div></div></div>
          <div class="j-step"><span class="j-step-n">02</span><div><div class="j-step-h">Reserve</div><div class="j-step-p">Instant confirmation, flexible cancellation.</div></div></div>
          <div class="j-step"><span class="j-step-n">03</span><div><div class="j-step-h">Arrive</div><div class="j-step-p">Concierge and in-stay support throughout.</div></div></div>
        </div>`,
        foot: footHTML(false, `Find stays ${I.arrow}`, true),
        after:()=>{
          $('#jIn').onchange=e=>{D.checkin=e.target.value;};
          $('#jOut').onchange=e=>{D.checkout=e.target.value;};
          $$('.j-stepper button').forEach(btn=>btn.onclick=()=>{D.guests=Math.max(1,Math.min(16,D.guests+ +btn.dataset.g));$('#jGuests').textContent=D.guests;});
        }};
    }
    if(step===1){
      const arr=results();
      _onNext=()=>{ if(D.property) go(2); };
      return { html: head('Choose your stay.', `${arr.length} ${arr.length===1?'property':'properties'}${D.city!=='Any'?' in '+D.city:''} for ${fmtDate(D.checkin)} - ${fmtDate(D.checkout)}.`)+
        `<div class="j-results">${arr.length?arr.map(d=>cardHTML(d,LISTINGS.indexOf(d),true)).join(''):`<div class="j-empty">${I.ghost}<p>No stays in this city yet. Go back and pick another destination.</p></div>`}</div>`,
        foot: footHTML(true, D.property?`Continue ${I.arrow}`:'Select a stay to continue', !!D.property),
        after:()=>wireSelect() };
    }
    if(step===2){
      _onNext=()=>{ D.name=$('#jName').value.trim(); D.phone=$('#jPhone').value.trim(); if(D.name&&D.phone.length>=6) go(3); };
      return { html: head('Guest details.', 'Who shall we prepare the stay for?')+
        propSummary(D.property)+
        `<div class="j-form">
          <div class="j-field"><span class="j-flab">Lead guest</span><span class="j-input"><input type="text" id="jName" value="${D.name}" placeholder="Full name"></span></div>
          <div class="j-field"><span class="j-flab">Phone</span><span class="j-input"><input type="tel" id="jPhone" value="${D.phone}" placeholder="+91 ....."></span></div>
          <div class="j-field"><span class="j-flab">Guests</span><span class="j-stepper"><button type="button" data-g="-1">-</button><b id="jGuests">${D.guests}</b><button type="button" data-g="1">+</button></span></div>
        </div>`,
        foot: footHTML(true, 'Add guest details to continue', false),
        after:()=>{
          ['jName','jPhone'].forEach(id=>$('#'+id).oninput=()=>{D[id==='jName'?'name':'phone']=$('#'+id).value; gate(()=>D.name.trim()&&D.phone.trim().length>=6,`Review ${I.arrow}`,'Add guest details to continue');});
          $$('.j-stepper button').forEach(btn=>btn.onclick=()=>{D.guests=Math.max(1,Math.min(16,D.guests+ +btn.dataset.g));$('#jGuests').textContent=D.guests;});
          gate(()=>D.name.trim()&&D.phone.trim().length>=6,`Review ${I.arrow}`,'Add guest details to continue');
        }};
    }
    if(step===3){
      const n=nights(D.checkin,D.checkout); const rate=nightly(D.property); const sub=n*rate; const taxes=Math.round(sub*0.12); const total=sub+taxes;
      _onNext=()=>go(4);
      return { html: head('Review your reservation.', '')+
        propSummary(D.property)+
        reviewRows([
          ['Check in', fmtDate(D.checkin)],
          ['Check out', fmtDate(D.checkout)],
          ['Guests', String(D.guests)],
          [`${inr(rate)} x ${n} ${n===1?'night':'nights'}`, inr(sub)],
          ['Taxes & fees', inr(taxes)],
        ])+
        `<div class="j-total"><span>Total</span><b>${inr(total)}</b></div>
        <p class="j-fine">Free cancellation up to 72 hours before check in. Pay at the property.</p>`,
        foot: footHTML(true, `Reserve ${I.arrow}`, true) };
    }
    const n=nights(D.checkin,D.checkout);
    return doneStep(`Reserved for ${fmtDate(D.checkin)}.`,
      `<b>${D.property?D.property.ttl:''}</b> is held for ${D.guests} ${D.guests===1?'guest':'guests'}, ${n} ${n===1?'night':'nights'}. A confirmation goes to ${D.phone||'your phone'}.`);
  }

  /* ============================================================
     SELL
     ============================================================ */
  function sellStep(){
    if(step===0){
      _onNext=()=>{ D.sType=$('#sType').value; D.sCity=$('#sCity').value; D.sArea=$('#sArea').value.trim(); D.sPrice=$('#sPrice').value.trim(); go(1); };
      return { html: head(FLOWS.sell.intro, FLOWS.sell.sub)+
        `<div class="j-form">
          <div class="j-field"><span class="j-flab">Property type</span><span class="j-select"><select id="sType">${['Apartment','Villa','Penthouse','Plot / Land','Hotel / Resort'].map(t=>`<option ${t===D.sType?'selected':''}>${t}</option>`).join('')}</select><span class="j-caret">${I.caret}</span></span></div>
          <div class="j-field"><span class="j-flab">City</span><span class="j-select"><span class="j-pin">${I.pin}</span><select id="sCity">${CITIES.map(c=>`<option ${c.name===D.sCity?'selected':''}>${c.name}</option>`).join('')}</select><span class="j-caret">${I.caret}</span></span></div>
          <div class="j-field"><span class="j-flab">Built-up area</span><span class="j-input"><input type="text" id="sArea" value="${D.sArea}" placeholder="e.g. 1,860 sqft"></span></div>
          <div class="j-field"><span class="j-flab">Expected price</span><span class="j-input"><input type="text" id="sPrice" value="${D.sPrice}" placeholder="e.g. ₹1.8 Cr"></span></div>
        </div>
        <div class="j-steps">
          <div class="j-step"><span class="j-step-n">01</span><div><div class="j-step-h">Free to list</div><div class="j-step-p">No charge to publish. We earn only when you do.</div></div></div>
          <div class="j-step"><span class="j-step-n">02</span><div><div class="j-step-h">Advisor on every enquiry</div><div class="j-step-p">One person manages viewings and negotiation.</div></div></div>
          <div class="j-step"><span class="j-step-n">03</span><div><div class="j-step-h">Verified buyers</div><div class="j-step-p">KYC-checked buyers across India.</div></div></div>
        </div>`,
        foot: footHTML(false, `Continue ${I.arrow}`, true) };
    }
    if(step===1){
      _onNext=()=>go(2);
      const opts=['Gated','Parking','Power backup','Furnished','Corner plot','Sea view','New build','Vaastu'];
      return { html: head('Highlight what makes it special.', 'Pick all that apply. You can add photos after listing.')+
        `<div class="j-form"><div class="j-field j-span2"><span class="j-flab">Highlights</span>${chips('sHigh',opts,D.highlights,true)}</div></div>
        <div class="j-photos">${[0,1,2,3].map(()=>`<div class="j-photo">${I.plus}<span>Add photo</span></div>`).join('')}</div>`,
        foot: footHTML(true, `Continue ${I.arrow}`, true),
        after:()=>wireChips('sHigh',null,true) };
    }
    if(step===2){
      _onNext=()=>{ D.name=$('#jName').value.trim(); D.phone=$('#jPhone').value.trim(); if(D.name&&D.phone.length>=6) go(3); };
      return { html: head('How should buyers reach you?', 'Your number is shared only with verified, interested buyers.')+
        `<div class="j-form">
          <div class="j-field"><span class="j-flab">Your name</span><span class="j-input"><input type="text" id="jName" value="${D.name}" placeholder="Full name"></span></div>
          <div class="j-field"><span class="j-flab">Phone</span><span class="j-input"><input type="tel" id="jPhone" value="${D.phone}" placeholder="+91 ....."></span></div>
        </div>`,
        foot: footHTML(true, 'Add your name and phone', false),
        after:()=>{ ['jName','jPhone'].forEach(id=>$('#'+id).oninput=()=>{D[id==='jName'?'name':'phone']=$('#'+id).value; gate(()=>D.name.trim()&&D.phone.trim().length>=6,`Review ${I.arrow}`,'Add your name and phone');}); gate(()=>D.name.trim()&&D.phone.trim().length>=6,`Review ${I.arrow}`,'Add your name and phone'); }};
    }
    if(step===3){
      _onNext=()=>go(4);
      return { html: head('Review your listing.', '')+
        reviewRows([
          ['Property', D.sType],
          ['City', D.sCity],
          ['Built-up area', D.sArea||'-'],
          ['Expected price', D.sPrice||'-'],
          ['Highlights', D.highlights.length?D.highlights.join(', '):'-'],
          ['Contact', `${D.name||'-'}${D.phone?' · '+D.phone:''}`],
        ])+
        `<p class="j-fine">Submitting requests a free valuation. An advisor reviews and lists within 24 hours.</p>`,
        foot: footHTML(true, `Submit listing ${I.arrow}`, true) };
    }
    return doneStep(`Your ${D.sType.toLowerCase()} in ${D.sCity} is in review.`,
      `An advisor will call ${D.phone?('on '+D.phone):''} within 24 hours with a free valuation and a listing plan. No obligation.`);
  }

  /* ---- shared pieces ---- */
  function reviewRows(rows){
    return `<div class="j-review">${rows.filter(Boolean).map(r=>`<div class="j-rrow"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div>`;
  }
  function doneStep(title,body){
    _onNext=()=>{ handoff(); closeJourney(); };
    return { html:`<div class="j-done">
        <div class="j-done-ic">${I.check}</div>
        <h2 class="j-title">${title}</h2>
        <p class="j-sub">${body}</p>
      </div>`,
      foot: `<button class="j-back" id="jBack2">Start over</button><button class="j-go" id="jNext">Browse listings ${I.arrow}</button>`,
      after:()=>{ const b=$('#jBack2'); if(b) b.onclick=()=>{ openJourney(cur); }; } };
  }
  function handoff(){
    if(cur==='book'){ state.tab='stays'; setCategory&&setCategory('Hotel & Resort',false); }
    else if(cur==='sell'){ /* stay on home */ }
    else { state.tab=cur==='rent'?'rent':'buy'; setCategory&&setCategory(D.type==='Any'?'All':D.type,false); }
    const city = cur==='sell'?D.sCity:D.city;
    if(city && city!=='Any'){ state.city=city; const hb=$('#hbLocText'); if(hb) hb.textContent=city; const lc=$('#listCity'); if(lc) lc.textContent=city; }
    if(typeof syncListFilterChips==='function') syncListFilterChips();
    if(typeof loadListings==='function') loadListings();
    const sec=document.querySelector('#listings'); if(sec) sec.scrollIntoView({block:'start',behavior:'smooth'});
  }

  /* ---- wiring helpers ---- */
  function wireSelect(){
    $$('.jcard.selectable').forEach(card=>{
      const pick=()=>{ const d=LISTINGS[+card.dataset.idx]; D.property=d; paint(); };
      card.onclick=pick;
      card.onkeydown=e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } };
    });
  }
  function wireChips(id,cb,multi){
    const wrap=$('#'+id); if(!wrap) return;
    $$('#'+id+' .j-chip').forEach(c=>c.onclick=()=>{
      const v=c.dataset.v;
      if(multi){
        const i=D.highlights.indexOf(v);
        if(i>=0){D.highlights.splice(i,1);c.classList.remove('on');} else {D.highlights.push(v);c.classList.add('on');}
      } else {
        $$('#'+id+' .j-chip').forEach(x=>x.classList.remove('on')); c.classList.add('on');
        if(cb) cb(v);
      }
    });
  }
  function refreshNext(okFn){ const n=$('#jNext'); if(n) n.disabled=!okFn(); }
  function gate(okFn, okLabel, needLabel){ const n=$('#jNext'); if(!n) return; const ok=okFn(); n.disabled=!ok; n.innerHTML = ok?okLabel:needLabel; }

  window.openJourney=openJourney;
  window.closeJourney=closeJourney;
})();
