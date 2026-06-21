'use strict';

/* ══ 스탬프 데이터 ══ */
const STAMPS = [
  // 서울
  { id:'gyeongbok',   name:'경복궁',           name_en:'Gyeongbokgung',        city:'서울', region:'서울', cat:'문화재', color:'purple', emoji:'🏯', org:'문화재청',             lat:37.5796, lng:126.9770 },
  { id:'changdeok',   name:'창덕궁',           name_en:'Changdeokgung',        city:'서울', region:'서울', cat:'문화재', color:'purple', emoji:'🏰', org:'문화재청',             lat:37.5792, lng:126.9910 },
  { id:'deoksugung',  name:'덕수궁',           name_en:'Deoksugung',           city:'서울', region:'서울', cat:'문화재', color:'purple', emoji:'🏛️', org:'문화재청',             lat:37.5658, lng:126.9753 },
  { id:'bukchon',     name:'북촌 한옥마을',     name_en:'Bukchon Hanok',        city:'서울', region:'서울', cat:'문화',   color:'purple', emoji:'🏡', org:'서울시 종로구',        lat:37.5826, lng:126.9830 },
  { id:'namsangol',   name:'남산골 한옥마을',   name_en:'Namsangol Hanok',      city:'서울', region:'서울', cat:'문화',   color:'purple', emoji:'🏘️', org:'서울시 문화본부',      lat:37.5623, lng:126.9974 },
  { id:'nseoul',      name:'N서울타워',         name_en:'N Seoul Tower',        city:'서울', region:'서울', cat:'랜드마크',color:'red',   emoji:'🗼', org:'서울시 관광체육국',    lat:37.5512, lng:126.9882 },
  { id:'gwangjang',   name:'광장시장',         name_en:'Gwangjang Market',     city:'서울', region:'서울', cat:'전통시장',color:'red',   emoji:'🍜', org:'서울시 종로구',        lat:37.5700, lng:126.9996 },
  { id:'hongdae',     name:'홍대거리',         name_en:'Hongdae Street',       city:'서울', region:'서울', cat:'문화',   color:'red',    emoji:'🎧', org:'서울시 마포구',        lat:37.5572, lng:126.9254 },
  { id:'insadong',    name:'인사동',           name_en:'Insadong',             city:'서울', region:'서울', cat:'문화',   color:'red',    emoji:'🎎', org:'서울시 종로구',        lat:37.5743, lng:126.9854 },
  { id:'ddp',         name:'동대문 DDP',        name_en:'Dongdaemun DDP',       city:'서울', region:'서울', cat:'랜드마크',color:'red',   emoji:'🌐', org:'서울디자인재단',       lat:37.5670, lng:127.0095 },
  // 부산
  { id:'haeundae',    name:'해운대 해수욕장',   name_en:'Haeundae Beach',       city:'부산', region:'부산', cat:'자연',   color:'blue',   emoji:'🌊', org:'부산시 관광진흥과',    lat:35.1587, lng:129.1604 },
  { id:'gwangalli',   name:'광안리 해수욕장',   name_en:'Gwangalli Beach',      city:'부산', region:'부산', cat:'자연',   color:'blue',   emoji:'🌉', org:'부산시 수영구',        lat:35.1530, lng:129.1188 },
  { id:'gamcheon',    name:'감천문화마을',      name_en:'Gamcheon Village',     city:'부산', region:'부산', cat:'문화',   color:'blue',   emoji:'🎨', org:'부산시 서구',          lat:35.0975, lng:129.0106 },
  { id:'jagalchi',    name:'자갈치시장',        name_en:'Jagalchi Market',      city:'부산', region:'부산', cat:'전통시장',color:'blue',  emoji:'🐟', org:'부산시 중구',          lat:35.0969, lng:129.0305 },
  { id:'haedong',     name:'해동 용궁사',       name_en:'Haedong Yonggungsa',   city:'부산', region:'부산', cat:'문화재', color:'blue',   emoji:'⛩️', org:'부산시 기장군',        lat:35.1888, lng:129.2218 },
  { id:'busan_tower', name:'용두산 공원',       name_en:'Yongdusan Park',       city:'부산', region:'부산', cat:'랜드마크',color:'blue',  emoji:'🏙️', org:'부산시 관광진흥과',    lat:35.1006, lng:129.0325 },
  // 경주
  { id:'bulguksa',    name:'불국사',           name_en:'Bulguksa Temple',      city:'경주', region:'경상', cat:'세계유산',color:'purple', emoji:'🛕', org:'문화재청',             lat:35.7900, lng:129.3320 },
  { id:'seokguram',   name:'석굴암',           name_en:'Seokguram Grotto',     city:'경주', region:'경상', cat:'세계유산',color:'purple', emoji:'🗿', org:'문화재청',             lat:35.7950, lng:129.3468 },
  { id:'daereung',    name:'대릉원',           name_en:'Daereungwon Tumuli',   city:'경주', region:'경상', cat:'문화재', color:'purple', emoji:'🏔️', org:'경주시 문화관광과',    lat:35.8343, lng:129.2189 },
  { id:'wolji',       name:'동궁과 월지',       name_en:'Donggung & Wolji',     city:'경주', region:'경상', cat:'문화재', color:'purple', emoji:'🌙', org:'경주시 문화관광과',    lat:35.8343, lng:129.2277 },
  // 전주
  { id:'jeonju',      name:'전주 한옥마을',     name_en:'Jeonju Hanok Village', city:'전주', region:'전라', cat:'문화',   color:'green',  emoji:'🍚', org:'전주시 관광과',        lat:35.8151, lng:127.1534 },
  { id:'jeonju_mkt',  name:'전주 남부시장',     name_en:'Jeonju Nambu Market',  city:'전주', region:'전라', cat:'전통시장',color:'green', emoji:'🛒', org:'전주시 경제통상과',    lat:35.8127, lng:127.1486 },
  // 제주
  { id:'ilchul',      name:'성산 일출봉',       name_en:'Seongsan Ilchulbong',  city:'제주', region:'제주', cat:'세계유산',color:'teal',  emoji:'🌋', org:'제주도 세계유산본부',  lat:33.4581, lng:126.9425 },
  { id:'hallasan',    name:'한라산 국립공원',   name_en:'Hallasan Nat\'l Park',  city:'제주', region:'제주', cat:'자연',   color:'teal',   emoji:'🏔️', org:'제주도 한라산국립공원',lat:33.3617, lng:126.5292 },
  { id:'manjanggul',  name:'만장굴',           name_en:'Manjanggul Cave',      city:'제주', region:'제주', cat:'세계유산',color:'teal',  emoji:'🕳️', org:'제주도 세계유산본부',  lat:33.5283, lng:126.7711 },
  { id:'jeju_olle',   name:'제주 올레길',       name_en:'Jeju Olle Trail',      city:'제주', region:'제주', cat:'자연',   color:'teal',   emoji:'🥾', org:'제주올레재단',         lat:33.2541, lng:126.5600 },
  // 강원
  { id:'seoraksan',   name:'설악산 국립공원',   name_en:'Seoraksan Nat\'l Park', city:'속초', region:'강원', cat:'자연',  color:'green',  emoji:'🏞️', org:'국립공원공단',         lat:38.1198, lng:128.4655 },
  { id:'nami',        name:'남이섬',           name_en:'Nami Island',          city:'춘천', region:'강원', cat:'자연',   color:'green',  emoji:'🌲', org:'춘천시 관광과',        lat:37.7896, lng:127.5261 },
  { id:'jeongdongjin',name:'정동진',           name_en:'Jeongdongjin',         city:'강릉', region:'강원', cat:'자연',   color:'green',  emoji:'🌅', org:'강릉시 관광과',        lat:37.6835, lng:129.0464 },
  // 경기
  { id:'hwaseong',    name:'수원 화성',         name_en:'Suwon Hwaseong',       city:'수원', region:'경기', cat:'세계유산',color:'purple', emoji:'🏯', org:'수원시 문화체육관광국',lat:37.2871, lng:127.0116 },
  { id:'namhansanseong',name:'남한산성',        name_en:'Namhansanseong',       city:'광주', region:'경기', cat:'세계유산',color:'purple', emoji:'🗺️', org:'경기도 문화유산과',    lat:37.4794, lng:127.1783 },
  // 인천
  { id:'chinatown',   name:'인천 차이나타운',   name_en:'Incheon Chinatown',    city:'인천', region:'인천', cat:'문화',   color:'red',    emoji:'🏮', org:'인천시 중구',          lat:37.4762, lng:126.6176 },
  { id:'ganghwa',     name:'강화 고려궁지',     name_en:'Goryeo Palace Site',   city:'인천', region:'인천', cat:'문화재', color:'purple', emoji:'🏰', org:'인천시 강화군',        lat:37.7472, lng:126.4877 },
];

/* ══ 업적 정의 ══ */
const ACHIEVEMENTS = [
  { id:'first',    icon:'🎉', name:'첫 스탬프',    desc:'첫 번째 스탬프를 수집했습니다.',           cond: e => e.size >= 1,            max:1 },
  { id:'seoul5',   icon:'🗼', name:'서울 탐험가',   desc:'서울 스탬프 5개 이상 수집.',                cond: e => seoulCount(e) >= 5,     max:5, progress: e => seoulCount(e) },
  { id:'busan3',   icon:'🌊', name:'부산 러버',     desc:'부산 스탬프 3개 이상 수집.',                cond: e => busanCount(e) >= 3,     max:3, progress: e => busanCount(e) },
  { id:'heritage', icon:'🏛️', name:'세계유산 수호자', desc:'세계유산 스탬프 4개 이상 수집.',           cond: e => heritageCount(e) >= 4,  max:4, progress: e => heritageCount(e) },
  { id:'jeju',     icon:'🌋', name:'제주 완전정복', desc:'제주 스탬프 4개 모두 수집.',                cond: e => jejuCount(e) >= 4,      max:4, progress: e => jejuCount(e) },
  { id:'half',     icon:'⭐', name:'절반 달성',     desc:'전체 스탬프의 절반 이상 수집.',              cond: e => e.size >= Math.ceil(STAMPS.length/2), max:Math.ceil(STAMPS.length/2), progress: e => e.size },
  { id:'full',     icon:'🏆', name:'한국 완전정복', desc:'모든 스탬프를 수집했습니다!',               cond: e => e.size >= STAMPS.length, max:STAMPS.length, progress: e => e.size },
  { id:'market',   icon:'🛒', name:'시장 마스터',   desc:'전통시장 스탬프 3개 이상 수집.',             cond: e => marketCount(e) >= 3,    max:3, progress: e => marketCount(e) },
];

/* ══ 컬렉션 세트 ══ */
const COLLECTIONS = [
  { id:'palace',   icon:'🏯', name:'조선 5대 궁궐',  desc:'서울 궁궐 컬렉션', ids:['gyeongbok','changdeok','deoksugung'] },
  { id:'hanok',    icon:'🏡', name:'한옥마을 컬렉션', desc:'전통 한옥 마을 모음', ids:['bukchon','namsangol','jeonju'] },
  { id:'world',    icon:'🌍', name:'유네스코 세계유산', desc:'한국의 세계유산 스탬프', ids:['bulguksa','seokguram','ilchul','manjanggul','hwaseong','namhansanseong'] },
  { id:'beach',    icon:'🌊', name:'해변 컬렉션',     desc:'한국의 아름다운 해변', ids:['haeundae','gwangalli','jeju_olle'] },
  { id:'nature',   icon:'🏔️', name:'국립공원 컬렉션', desc:'자연 명소 스탬프', ids:['hallasan','seoraksan','nami','jeongdongjin'] },
  { id:'busan_all',icon:'🎨', name:'부산 완전정복',   desc:'부산 6대 명소 모두 수집', ids:['haeundae','gwangalli','gamcheon','jagalchi','haedong','busan_tower'] },
];

function seoulCount(e)   { return STAMPS.filter(s => s.region==='서울' && e.has(s.id)).length; }
function busanCount(e)   { return STAMPS.filter(s => s.region==='부산' && e.has(s.id)).length; }
function heritageCount(e){ return STAMPS.filter(s => s.cat==='세계유산' && e.has(s.id)).length; }
function jejuCount(e)    { return STAMPS.filter(s => s.region==='제주' && e.has(s.id)).length; }
function marketCount(e)  { return STAMPS.filter(s => s.cat==='전통시장' && e.has(s.id)).length; }

const REGIONS = ['전체', ...new Set(STAMPS.map(s => s.region))];
const COLOR_HEX = { red:'#8b1a1a', blue:'#0a2d6e', green:'#0d4a2d', purple:'#3d1a6e', teal:'#0a4a4a' };

/* ══ State ══ */
const earned = new Set(JSON.parse(localStorage.getItem('kp_earned') || '[]'));
const dates  = JSON.parse(localStorage.getItem('kp_dates')  || '{}');
let activeRegion = '전체';
let searchQuery  = '';
let activeSearchType = '관광지';
let currentModal = null;
let isGridView   = true;
let qrStream     = null;

function save() {
  localStorage.setItem('kp_earned', JSON.stringify([...earned]));
  localStorage.setItem('kp_dates',  JSON.stringify(dates));
}

/* ══ 온보딩 ══ */
(function initOnboarding() {
  if (localStorage.getItem('kp_ob_done')) return;
  const ob = document.getElementById('onboarding');
  ob.classList.remove('hidden');
  let cur = 0;
  const total = 4;
  const dotsEl = document.getElementById('obDots');
  for (let i=0; i<total; i++) {
    const d = document.createElement('div');
    d.className = 'ob-dot' + (i===0?' active':'');
    dotsEl.appendChild(d);
  }
  function goto(n) {
    cur = n;
    document.querySelectorAll('.ob-slide').forEach((s,i) => s.style.display = i===cur?'block':'none');
    document.querySelectorAll('.ob-dot').forEach((d,i) => d.classList.toggle('active',i===cur));
    document.getElementById('obNext').textContent = cur===total-1 ? '시작하기' : '다음';
  }
  goto(0);
  document.getElementById('obNext').addEventListener('click', () => {
    if (cur < total-1) goto(cur+1);
    else { ob.classList.add('hidden'); localStorage.setItem('kp_ob_done','1'); }
  });
  document.getElementById('obSkip').addEventListener('click', () => {
    ob.classList.add('hidden'); localStorage.setItem('kp_ob_done','1');
  });
})();

/* ══ SVG 공식 인장 스탬프 ══ */
function makeStampSVG(s, size=90) {
  const c   = COLOR_HEX[s.color] || '#0a4a4a';
  const yes = earned.has(s.id);
  const op  = yes ? 1 : 0.28;
  const dt  = yes ? (dates[s.id]||'') : '';
  const namePath = (s.name_en||s.name).toUpperCase().slice(0,20);
  return `<svg width="${size}" height="${size}" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" style="opacity:${op}">
  <defs>
    <path id="ta-${s.id}" d="M 8,45 a 37,37 0 1,1 74,0"/>
    <path id="tb-${s.id}" d="M 12,51 a 33,33 0 0,0 66,0"/>
  </defs>
  <circle cx="45" cy="45" r="42" fill="none" stroke="${c}" stroke-width="2.5"/>
  <circle cx="45" cy="45" r="35" fill="none" stroke="${c}" stroke-width=".8"/>
  <text x="45" y="52" text-anchor="middle" font-size="20">${s.emoji}</text>
  <text font-size="8.5" font-weight="700" fill="${c}" font-family="Noto Sans KR,sans-serif" letter-spacing="1.8">
    <textPath href="#ta-${s.id}" startOffset="22%">${s.city}</textPath>
  </text>
  <text font-size="6.5" fill="${c}" font-family="Arial,sans-serif" letter-spacing=".8">
    <textPath href="#tb-${s.id}" startOffset="18%">${namePath}</textPath>
  </text>
  ${dt?`<text x="45" y="74" text-anchor="middle" font-size="7" fill="${c}" font-family="monospace" letter-spacing=".4">${dt}</text>`:''}
</svg>`;
}

/* ══ Toast ══ */
let _toastT;
function showToast(s) {
  const el = document.getElementById('toast');
  const ts = document.getElementById('toastStamp');
  ts.innerHTML = makeStampSVG(s, 38); ts.style.fontSize='';
  document.getElementById('toastTitle').textContent = s.name + ' 스탬프 획득!';
  document.getElementById('toastSub').textContent   = s.city + ' · ' + s.org;
  el.classList.remove('hidden');
  clearTimeout(_toastT);
  _toastT = setTimeout(() => el.classList.add('hidden'), 3500);
}
function showToastMsg(e, title, sub) {
  const el = document.getElementById('toast');
  const ts = document.getElementById('toastStamp');
  ts.innerHTML = ''; ts.textContent = e; ts.style.fontSize = '22px';
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastSub').textContent   = sub || '';
  el.classList.remove('hidden');
  clearTimeout(_toastT);
  _toastT = setTimeout(() => el.classList.add('hidden'), 3000);
}

/* ══ 수집 ══ */
function collect(id) {
  if (earned.has(id)) return;
  earned.add(id);
  if (!dates[id]) dates[id] = new Date().toISOString().slice(0,10);
  save();
  const s = STAMPS.find(x => x.id===id);
  if (s) showToast(s);
  checkAchievements();
  renderAll();
}

/* ══ 업적 체크 ══ */
const prevAchieve = new Set(JSON.parse(localStorage.getItem('kp_achieve')||'[]'));
function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (!prevAchieve.has(a.id) && a.cond(earned)) {
      prevAchieve.add(a.id);
      localStorage.setItem('kp_achieve', JSON.stringify([...prevAchieve]));
      setTimeout(() => showToastMsg(a.icon, '업적 달성: ' + a.name, a.desc), 1200);
    }
  });
}

/* ══ Haversine ══ */
function distKm(a,b,c,d) {
  const R=6371, r=Math.PI/180;
  const x = Math.sin((c-a)*r/2)**2 + Math.cos(a*r)*Math.cos(c*r)*Math.sin((d-b)*r/2)**2;
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}

/* ══ 링 업데이트 ══ */
function updateRing() {
  const pct = earned.size / Math.max(STAMPS.length,1);
  const circ = 2*Math.PI*30;
  document.getElementById('ringCircle').style.strokeDashoffset = circ*(1-pct);
  document.getElementById('coverCount').textContent = earned.size;
  document.getElementById('coverTotal').textContent = '/' + STAMPS.length;
  document.getElementById('statCities').textContent  = new Set(STAMPS.filter(s=>earned.has(s.id)).map(s=>s.city)).size;
  document.getElementById('statRegions').textContent = new Set(STAMPS.filter(s=>earned.has(s.id)).map(s=>s.region)).size;
  document.getElementById('statAchieve').textContent = ACHIEVEMENTS.filter(a=>a.cond(earned)).length;
}

/* ══ Stamp Grid ══ */
function renderStampGrid() {
  const grid = document.getElementById('stampGrid');
  const visible = activeRegion==='전체' ? STAMPS : STAMPS.filter(s=>s.region===activeRegion);
  grid.innerHTML = '';
  visible.forEach(s => {
    const wrap = document.createElement('div');
    wrap.className = 'stamp-wrap' + (earned.has(s.id) ? ' earned' : '');
    const circle = document.createElement('div');
    circle.className = `stamp-circle stamp-${s.color} ${earned.has(s.id)?'inked':'ghost'}`;
    circle.innerHTML = makeStampSVG(s);
    const label = document.createElement('div');
    label.className = 'stamp-name';
    label.textContent = s.name;
    wrap.appendChild(circle); wrap.appendChild(label);
    wrap.addEventListener('click', () => openModal(s));
    grid.appendChild(wrap);
  });
}

/* ══ Book View (여권 페이지) ══ */
function renderBookView() {
  const bv = document.getElementById('bookView');
  const stamps = activeRegion==='전체' ? STAMPS : STAMPS.filter(s=>s.region===activeRegion);
  bv.innerHTML = '';
  for (let i=0; i<stamps.length; i+=6) {
    const chunk = stamps.slice(i, i+6);
    const page  = document.createElement('div');
    page.className = 'passport-page';
    const region = chunk[0]?.region || '';
    page.innerHTML = `<div class="page-header"><h3>${region} 스탬프</h3><span>페이지 ${Math.floor(i/6)+1}</span></div>`;
    const grid = document.createElement('div');
    grid.className = 'page-stamps';
    chunk.forEach(s => {
      const slot = document.createElement('div');
      slot.className = 'page-stamp-slot';
      const circle = document.createElement('div');
      circle.className = 'ps-circle' + (earned.has(s.id)?'':' empty');
      circle.style.border = earned.has(s.id) ? `2.5px solid ${COLOR_HEX[s.color]}` : '';
      circle.style.background = earned.has(s.id) ? COLOR_HEX[s.color]+'22' : '';
      const svg = document.createElement('div');
      svg.innerHTML = makeStampSVG({...s}, 72);
      circle.appendChild(svg);
      const nm = document.createElement('div');
      nm.className = 'ps-name';
      nm.textContent = s.name;
      slot.appendChild(circle); slot.appendChild(nm);
      slot.addEventListener('click', () => openModal(s));
      grid.appendChild(slot);
    });
    page.appendChild(grid);
    bv.appendChild(page);
  }
}

/* ══ Region Tabs ══ */
function buildRegionTabs() {
  const row = document.getElementById('regionFilter');
  row.innerHTML = '';
  REGIONS.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'rtab' + (r===activeRegion?' active':'');
    btn.textContent = r;
    btn.addEventListener('click', () => {
      activeRegion = r;
      row.querySelectorAll('.rtab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      isGridView ? renderStampGrid() : renderBookView();
    });
    row.appendChild(btn);
  });
}

/* ══ View Toggle ══ */
document.getElementById('viewGrid').addEventListener('click', () => {
  isGridView = true;
  document.getElementById('viewGrid').classList.add('active');
  document.getElementById('viewBook').classList.remove('active');
  document.getElementById('stampGrid').classList.remove('hidden');
  document.getElementById('bookView').classList.add('hidden');
  renderStampGrid();
});
document.getElementById('viewBook').addEventListener('click', () => {
  isGridView = false;
  document.getElementById('viewBook').classList.add('active');
  document.getElementById('viewGrid').classList.remove('active');
  document.getElementById('stampGrid').classList.add('hidden');
  document.getElementById('bookView').classList.remove('hidden');
  renderBookView();
});

/* ══ Location List ══ */
function renderLocationList() {
  const list = document.getElementById('locationList');
  const q = searchQuery.toLowerCase();
  const visible = q
    ? STAMPS.filter(s => s.name.includes(q)||(s.name_en||'').toLowerCase().includes(q)||s.city.includes(q))
    : STAMPS;
  list.innerHTML = '';
  document.getElementById('locCount').textContent = visible.length;
  visible.forEach(s => {
    const row = document.createElement('div');
    row.className = 'loc-item';
    row.innerHTML = `
      <div class="loc-dot" style="background:${COLOR_HEX[s.color]}"></div>
      <div class="loc-info"><h3>${s.name}</h3><p>${s.city} · ${s.org}</p></div>
      <span class="loc-tag">${s.cat}</span>
      <span class="loc-check">${earned.has(s.id)?'✅':'○'}</span>`;
    row.addEventListener('click', () => openModal(s));
    list.appendChild(row);
  });
}

/* ══ Search ══ */
function buildSearchTypeTabs() {
  const types = ['관광지','문화시설','축제행사','레포츠','음식점'];
  const row = document.getElementById('searchTypeRow');
  types.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'stype-btn' + (t===activeSearchType?' active':'');
    btn.textContent = t;
    btn.addEventListener('click', () => {
      activeSearchType = t;
      row.querySelectorAll('.stype-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
    row.appendChild(btn);
  });
}

document.getElementById('searchApiBtn').addEventListener('click', async () => {
  const kw = document.getElementById('searchInput').value.trim();
  if (!kw) { renderLocationList(); return; }
  if (!TourAPI._hasKey()) { showToastMsg('🔑','API 키 없음','tourapi.js에 serviceKey를 입력하세요.'); return; }
  showToastMsg('🔍','검색 중...',`"${kw}" TourAPI 조회 중`);
  const results = await TourAPI.search(kw);
  results.forEach(s => { if (!STAMPS.find(x=>x.id===s.id)) STAMPS.push(s); });
  searchQuery = kw;
  renderLocationList();
  showToastMsg(results.length?'✅':'😕', results.length?`${results.length}개 결과`:'결과 없음', `"${kw}"${results.length?` 검색 완료`:' 결과 없음'}`);
});

document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  if (!searchQuery) renderLocationList();
});
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key==='Enter') document.getElementById('searchApiBtn').click();
});

/* ══ 축제 버튼 ══ */
document.getElementById('festivalBtn').addEventListener('click', async () => {
  if (!TourAPI._hasKey()) { showToastMsg('🔑','API 키 없음','tourapi.js에 serviceKey를 입력하세요.'); return; }
  showToastMsg('🎪','축제 조회 중...','현재 진행 중인 행사를 불러옵니다.');
  const results = await TourAPI.festivals();
  results.forEach(s => { if (!STAMPS.find(x=>x.id===s.id)) STAMPS.push(s); });
  searchQuery = '';
  renderLocationList();
  showToastMsg('🎪',`${results.length}개 축제`,'목록에 추가되었습니다.');
});

/* ══ 두루누비 ══ */
document.getElementById('loadTrailBtn').addEventListener('click', async () => {
  if (!KEYS.DRN) { showToastMsg('🔑','DRN 키 없음','tourapi.js KEYS.DRN에 두루누비 키를 입력하세요.'); return; }
  showToastMsg('🥾','두루누비 조회 중...','걷기여행길을 불러옵니다.');
  const trails = await TourAPI.trails();
  const list = document.getElementById('trailList');
  list.innerHTML = '';
  trails.forEach(t => {
    if (!STAMPS.find(x=>x.id===t.id)) STAMPS.push(t);
    const item = document.createElement('div');
    item.className = 'trail-item';
    item.innerHTML = `<span class="trail-icon">🥾</span>
      <div class="trail-info"><h4>${t.name}</h4><p>${t.city} · ${t.org}</p></div>
      ${t.dist?`<span class="trail-dist">${t.dist}</span>`:''}
      <span class="trail-check">${earned.has(t.id)?'✅':'○'}</span>`;
    item.addEventListener('click', () => { if(!dates[t.id])dates[t.id]=new Date().toISOString().slice(0,10); collect(t.id); item.querySelector('.trail-check').textContent='✅'; });
    list.appendChild(item);
  });
  if (!trails.length) list.innerHTML = '<p style="padding:10px;color:var(--muted);font-size:12px">불러올 수 없습니다.</p>';
});

/* ══ GPS ══ */
document.getElementById('gpsBtn').addEventListener('click', () => {
  if (!navigator.geolocation) { showToastMsg('⚠️','GPS 미지원','이 브라우저는 위치 서비스를 지원하지 않습니다.'); return; }
  navigator.geolocation.getCurrentPosition(async pos => {
    const {latitude:lat, longitude:lng} = pos.coords;
    const today = new Date().toISOString().slice(0,10);
    let found = 0;
    STAMPS.forEach(s => {
      if (!earned.has(s.id) && distKm(lat,lng,s.lat,s.lng)<0.3) { dates[s.id]=today; collect(s.id); found++; }
    });
    if (TourAPI._hasKey()) {
      showToastMsg('📡','TourAPI 조회 중...','반경 500m 내 관광지 검색');
      const api = await TourAPI.nearby(lat,lng,500);
      api.forEach(s => {
        if (!STAMPS.find(x=>x.id===s.id)) STAMPS.push(s);
        if (!earned.has(s.id)) { dates[s.id]=today; collect(s.id); found++; }
      });
    }
    if (!found) showToastMsg('📍','근처 스탬프 없음','장소를 탭해 수집하거나 QR을 스캔하세요.');
  }, () => showToastMsg('⚠️','위치 거부됨','Safari 설정 > 위치 서비스를 허용하세요.'));
});

/* ══ QR 스캔 ══ */
document.getElementById('qrBtn').addEventListener('click', async () => {
  if (!navigator.mediaDevices?.getUserMedia) { showToastMsg('📷','카메라 미지원','이 기기에서는 QR 스캔을 사용할 수 없습니다.'); return; }
  try {
    qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    document.getElementById('qrVideo').srcObject = qrStream;
    document.getElementById('qrOverlay').classList.remove('hidden');
    showToastMsg('📷','QR 스캔 중','스탬프 QR코드에 카메라를 맞춰주세요.');
  } catch { showToastMsg('⚠️','카메라 거부됨','Safari 설정에서 카메라 접근을 허용하세요.'); }
});

document.getElementById('qrClose').addEventListener('click', () => {
  if (qrStream) { qrStream.getTracks().forEach(t=>t.stop()); qrStream=null; }
  document.getElementById('qrOverlay').classList.add('hidden');
});

/* ══ Share ══ */
document.getElementById('shareBtn').addEventListener('click', async () => {
  const text = `🇰🇷 Korea Stamp Passport: ${earned.size}/${STAMPS.length}개 스탬프 획득!\n업적 ${ACHIEVEMENTS.filter(a=>a.cond(earned)).length}개 달성. 한국 여행을 스탬프로 기록하세요.`;
  try {
    if (navigator.share) await navigator.share({title:'Korea Stamp Passport',text});
    else { await navigator.clipboard.writeText(text); showToastMsg('📋','복사 완료','클립보드에 복사되었습니다.'); }
  } catch {}
});

/* ══ 언어 패널 (간소화) ══ */
document.getElementById('langBtn').addEventListener('click', () => {
  const avail = TourAPI.availableLangs();
  if (!avail.length) { showToastMsg('🔑','API 키 필요','tourapi.js에 언어별 키를 입력하면 다국어 전환이 가능합니다.'); return; }
  showToastMsg('🌐','언어 선택','현재: ' + LANG_META[TourAPI.lang]?.label);
});

/* ══ 업적 렌더 ══ */
function renderAchievements() {
  const sc = document.getElementById('statsCard');
  const pct = Math.round(earned.size/STAMPS.length*100);
  sc.innerHTML = `<div class="stats-grid">
    <div class="stat-item"><div class="si-num">${earned.size}</div><div class="si-label">수집한 스탬프</div></div>
    <div class="stat-item"><div class="si-num">${ACHIEVEMENTS.filter(a=>a.cond(earned)).length}</div><div class="si-label">달성 업적</div></div>
    <div class="stat-item"><div class="si-num">${new Set(STAMPS.filter(s=>earned.has(s.id)).map(s=>s.city)).size}</div><div class="si-label">방문 도시</div></div>
    <div class="stat-item"><div class="si-num">${heritageCount(earned)}</div><div class="si-label">세계유산</div></div>
  </div>
  <div class="overall-bar">
    <div class="overall-bar-label"><span>전체 달성률</span><span>${pct}%</span></div>
    <div class="bar"><div style="width:${pct}%"></div></div>
  </div>`;

  const al = document.getElementById('achieveList');
  al.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const done = a.cond(earned);
    const prog = a.progress ? a.progress(earned) : (done ? a.max : 0);
    const pct2 = Math.min(100, Math.round(prog/a.max*100));
    const item = document.createElement('div');
    item.className = 'achieve-item' + (done?' unlocked':'');
    item.innerHTML = `<div class="achieve-badge">${done?a.icon:'🔒'}</div>
      <div class="achieve-info">
        <h4>${a.name}</h4>
        <p>${a.desc}</p>
        <div class="achieve-progress">
          <div class="achieve-bar"><div style="width:${pct2}%"></div></div>
        </div>
      </div>
      <span style="font-size:11px;color:var(--muted);flex-shrink:0;margin-left:auto">${prog}/${a.max}</span>`;
    al.appendChild(item);
  });

  const cl = document.getElementById('collectionList');
  cl.innerHTML = '';
  COLLECTIONS.forEach(col => {
    const done = col.ids.filter(id=>earned.has(id)).length;
    const pct3 = Math.round(done/col.ids.length*100);
    const card = document.createElement('div');
    card.className = 'col-card';
    card.innerHTML = `<div class="col-card-head">
        <span class="col-icon">${col.icon}</span>
        <div><h4>${col.name}</h4><p>${col.desc}</p></div>
        <div class="col-progress">
          <span class="col-pct">${pct3}%</span>
          <div class="col-mini-bar"><div style="width:${pct3}%"></div></div>
        </div>
      </div>
      <div class="col-stamps">${col.ids.map(id=>{
        const s=STAMPS.find(x=>x.id===id);
        return `<span class="col-stamp-chip ${earned.has(id)?'done':''}">${s?s.name:id}</span>`;
      }).join('')}</div>`;
    cl.appendChild(card);
  });
}

/* ══ API 상태 ══ */
function renderApiStatus() {
  const all = [{code:'KOR',l:'국문'},{code:'ENG',l:'영문'},{code:'JPN',l:'일문'},{code:'CHS',l:'중문간'},{code:'CHT',l:'중문번'},{code:'SPN',l:'서어'},{code:'GER',l:'독어'},{code:'FRE',l:'불어'},{code:'DRN',l:'두루누비'}];
  const list = document.getElementById('apiStatusList');
  list.innerHTML = '';
  all.forEach(({code,l}) => {
    const on = !!KEYS[code];
    const item = document.createElement('div');
    item.className = 'api-status-item';
    item.innerHTML = `<div class="api-dot ${on?'on':'off'}"></div><span>${on?`<strong>${l}</strong>`:l}</span>`;
    list.appendChild(item);
  });
}

/* ══ Partner Cards ══ */
function renderPartners() {
  const P = [
    {icon:'🏛️',name:'지자체 관광과 제안',sub:'서울·부산·제주·경주·전주',
     items:['앱을 지자체 공식 디지털 스탬프 투어로 등록','지자체 CI 사용 협약 → 공식 인장으로 교체','관광안내소 QR코드 비치 → 현장 스탬프 발급','제안 대상: 각 시·군·구 문화관광과'],badge:'제안 준비 중'},
    {icon:'🇰🇷',name:'한국관광공사(KTO) 연계',sub:'TourAPI 4.0 다국어 8개 언어 연동',
     items:['국문·영문·일문·중문·서어·독어·불어 API 연동','GPS 반경 내 관광지 실시간 조회','두루누비 걷기여행길 스탬프 연동','관광벤처 공모 지원 가능'],badge:'API 키 입력 시 즉시 작동'},
    {icon:'🏯',name:'문화재청 / 국립박물관',sub:'국가문화유산포털 연계',
     items:['유네스코 세계유산 공식 스탬프 발급 협약','국립박물관 무인 스탬프기 디지털 대체','문화재청 방문예약제 시스템 연동','담당: 문화재청 활용정책과'],badge:'우선 협의 대상'},
    {icon:'📮',name:'기존 스탬프 투어 대체',sub:'종이 스탬프북 → 디지털 전환',
     items:['경주·부산 해파랑길 기존 스탬프 투어 인수','두루누비 QR 연동 현장 인증','지자체 SaaS 형태 공급','키오스크 QR ↔ 앱 스탬프 연동'],badge:'수익 모델 핵심'},
  ];
  const c = document.getElementById('partnerCards');
  c.innerHTML = '';
  P.forEach(p => {
    const card = document.createElement('div');
    card.className = 'partner-card';
    card.innerHTML = `<div class="partner-card-header"><span class="partner-icon">${p.icon}</span><div><h3>${p.name}</h3><p>${p.sub}</p></div></div>
      <div class="partner-body"><ul>${p.items.map(i=>`<li>${i}</li>`).join('')}</ul><span class="partner-badge">${p.badge}</span></div>`;
    c.appendChild(card);
  });
}

/* ══ Detail Modal ══ */
async function openModal(s) {
  currentModal = s;
  document.getElementById('modalTitle').textContent   = s.name;
  document.getElementById('modalAddr').textContent    = (s.addr||'') + (s.addr&&s.city?' · ':'') + s.city;
  document.getElementById('modalStamp').innerHTML     = makeStampSVG(s, 56);
  document.getElementById('modalOverview').textContent= '로딩 중...';
  document.getElementById('modalMeta').innerHTML      = '';
  const img = document.getElementById('modalImg');
  img.src = s.image||''; img.style.display = s.image?'':'none';
  document.getElementById('modal').classList.remove('hidden');

  if (TourAPI._hasKey() && s._fromAPI) {
    const cid = s.id.replace('kto_','');
    const [det, intro] = await Promise.all([TourAPI.detail(cid), TourAPI.intro(cid,'76')]);
    if (det) {
      document.getElementById('modalOverview').textContent = det.overview || s.name;
      if (det.firstimage) { img.src=det.firstimage; img.style.display=''; }
      const meta = document.getElementById('modalMeta');
      if (det.homepage) meta.innerHTML += `<div class="modal-meta-row"><span>홈페이지</span><span>${det.homepage.replace(/<[^>]+>/g,'').slice(0,40)}</span></div>`;
    } else {
      document.getElementById('modalOverview').textContent = s.org;
    }
    if (intro) {
      const meta = document.getElementById('modalMeta');
      if (intro.usetime)  meta.innerHTML += `<div class="modal-meta-row"><span>운영시간</span><span>${intro.usetime}</span></div>`;
      if (intro.restdate) meta.innerHTML += `<div class="modal-meta-row"><span>휴무일</span><span>${intro.restdate}</span></div>`;
      if (intro.usefee)   meta.innerHTML += `<div class="modal-meta-row"><span>이용요금</span><span>${intro.usefee}</span></div>`;
      if (intro.parking)  meta.innerHTML += `<div class="modal-meta-row"><span>주차</span><span>${intro.parking}</span></div>`;
    }
  } else {
    document.getElementById('modalOverview').textContent = s.org + (s.dist?' · '+s.dist:'');
    if (s.addr) document.getElementById('modalMeta').innerHTML = `<div class="modal-meta-row"><span>주소</span><span>${s.addr}</span></div>`;
  }

  const btn = document.getElementById('modalCollect');
  btn.textContent = earned.has(s.id) ? '✅ 이미 수집됨' : '✅ 스탬프 수집하기';
  btn.disabled = earned.has(s.id);
  btn.style.opacity = earned.has(s.id) ? '.5' : '1';
}

document.getElementById('modalClose').addEventListener('click',   () => document.getElementById('modal').classList.add('hidden'));
document.getElementById('modalBackdrop').addEventListener('click', () => document.getElementById('modal').classList.add('hidden'));
document.getElementById('modalCollect').addEventListener('click',  () => {
  if (currentModal && !earned.has(currentModal.id)) {
    if (!dates[currentModal.id]) dates[currentModal.id]=new Date().toISOString().slice(0,10);
    collect(currentModal.id);
  }
  document.getElementById('modal').classList.add('hidden');
});

/* ══ Tab Nav ══ */
document.getElementById('bottomNav').addEventListener('click', e => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  const tab = btn.dataset.tab;
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
  if (tab==='achieve') renderAchievements();
  if (tab==='partner') { renderApiStatus(); renderPartners(); }
});

/* ══ Service Worker ══ */
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});

/* ══ Init ══ */
buildRegionTabs();
buildSearchTypeTabs();
renderStampGrid();
updateRing();
renderLocationList();
checkAchievements();
