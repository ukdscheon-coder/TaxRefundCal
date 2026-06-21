'use strict';

/* ── 하드코딩 기본 스탬프 (API 키 없을 때 fallback) ── */
const STAMPS = [
  { id:'gyeongbok',  name:'경복궁',          name_en:'Gyeongbokgung',       city:'서울', region:'서울', cat:'문화재', color:'purple', emoji:'🏯', org:'문화재청',        lat:37.5796, lng:126.9770 },
  { id:'bukchon',    name:'북촌 한옥마을',    name_en:'Bukchon Hanok',       city:'서울', region:'서울', cat:'문화',   color:'purple', emoji:'🏡', org:'서울시 종로구',   lat:37.5826, lng:126.9830 },
  { id:'nseoul',     name:'N서울타워',        name_en:'N Seoul Tower',       city:'서울', region:'서울', cat:'랜드마크',color:'red',   emoji:'🗼', org:'서울시 관광체육국',lat:37.5512, lng:126.9882 },
  { id:'changdeok',  name:'창덕궁',          name_en:'Changdeokgung',       city:'서울', region:'서울', cat:'문화재', color:'purple', emoji:'🏰', org:'문화재청',        lat:37.5792, lng:126.9910 },
  { id:'gwangjang',  name:'광장시장',        name_en:'Gwangjang Market',    city:'서울', region:'서울', cat:'전통시장',color:'red',   emoji:'🍜', org:'서울시 종로구',   lat:37.5700, lng:126.9996 },
  { id:'hongdae',    name:'홍대거리',        name_en:'Hongdae Street',      city:'서울', region:'서울', cat:'문화',   color:'red',    emoji:'🎧', org:'서울시 마포구',   lat:37.5572, lng:126.9254 },
  { id:'insadong',   name:'인사동',          name_en:'Insadong',            city:'서울', region:'서울', cat:'문화',   color:'red',    emoji:'🎎', org:'서울시 종로구',   lat:37.5743, lng:126.9854 },
  { id:'haeundae',   name:'해운대 해수욕장', name_en:'Haeundae Beach',      city:'부산', region:'부산', cat:'자연',   color:'blue',   emoji:'🌊', org:'부산시 관광진흥과',lat:35.1587, lng:129.1604 },
  { id:'gamcheon',   name:'감천문화마을',    name_en:'Gamcheon Village',    city:'부산', region:'부산', cat:'문화',   color:'blue',   emoji:'🎨', org:'부산시 서구',     lat:35.0975, lng:129.0106 },
  { id:'jagalchi',   name:'자갈치시장',      name_en:'Jagalchi Market',     city:'부산', region:'부산', cat:'전통시장',color:'blue',  emoji:'🐟', org:'부산시 중구',     lat:35.0969, lng:129.0305 },
  { id:'haedong',    name:'해동 용궁사',     name_en:'Haedong Yonggungsa',  city:'부산', region:'부산', cat:'문화재', color:'blue',   emoji:'⛩️', org:'부산시 기장군',   lat:35.1888, lng:129.2218 },
  { id:'bulguksa',   name:'불국사',          name_en:'Bulguksa Temple',     city:'경주', region:'경상', cat:'세계유산',color:'purple', emoji:'🛕', org:'문화재청',        lat:35.7900, lng:129.3320 },
  { id:'seokguram',  name:'석굴암',          name_en:'Seokguram Grotto',    city:'경주', region:'경상', cat:'세계유산',color:'purple', emoji:'🗿', org:'문화재청',        lat:35.7950, lng:129.3468 },
  { id:'jeonju_hanok',name:'전주 한옥마을', name_en:'Jeonju Hanok Village', city:'전주', region:'전라', cat:'문화',   color:'green',  emoji:'🏯', org:'전주시 관광과',   lat:35.8151, lng:127.1534 },
  { id:'ilchul',     name:'성산 일출봉',     name_en:'Seongsan Ilchulbong', city:'제주', region:'제주', cat:'세계유산',color:'teal',  emoji:'🌋', org:'제주도 세계유산본부',lat:33.4581, lng:126.9425 },
  { id:'hallasan',   name:'한라산 국립공원', name_en:'Hallasan Nat\'l Park', city:'제주', region:'제주', cat:'자연',   color:'teal',   emoji:'🏔️', org:'제주도 한라산국립공원',lat:33.3617, lng:126.5292 },
  { id:'seoraksan',  name:'설악산 국립공원', name_en:'Seoraksan Nat\'l Park',city:'속초', region:'강원', cat:'자연',   color:'green',  emoji:'🏞️', org:'국립공원공단',    lat:38.1198, lng:128.4655 },
  { id:'nami',       name:'남이섬',          name_en:'Nami Island',         city:'춘천', region:'강원', cat:'자연',   color:'green',  emoji:'🌲', org:'춘천시 관광과',   lat:37.7896, lng:127.5261 },
  { id:'hwaseong',   name:'수원 화성',       name_en:'Suwon Hwaseong',      city:'수원', region:'경기', cat:'세계유산',color:'purple', emoji:'🏰', org:'수원시 문화체육관광국',lat:37.2871, lng:127.0116 },
];

const REGIONS = ['전체', ...new Set(STAMPS.map(s => s.region))];
const COLOR_MAP = { red:'#8b1a1a', blue:'#0a2d6e', green:'#0d4a2d', purple:'#3d1a6e', teal:'#0a4a4a' };

/* ── State ── */
const earned = new Set(JSON.parse(localStorage.getItem('kp_earned') || '[]'));
const dates  = JSON.parse(localStorage.getItem('kp_dates')  || '{}');
let activeRegion = '전체';
let searchQuery  = '';
let activeSearchType = '관광지';
let currentModal = null;
let langPanelOpen = false;

function save() {
  localStorage.setItem('kp_earned', JSON.stringify([...earned]));
  localStorage.setItem('kp_dates',  JSON.stringify(dates));
}

function collect(id, name, org) {
  if (earned.has(id)) return false;
  earned.add(id);
  if (!dates[id]) dates[id] = new Date().toISOString().slice(0,10);
  save();
  const s = STAMPS.find(x => x.id === id);
  if (s) showToast(s);
  else    showToastMsg('✅', name || id, org || '스탬프 획득!');
  renderPassport();
  renderLocationList();
  return true;
}

/* ── SVG Official Seal ── */
function makeStampSVG(s, size = 92) {
  const c = COLOR_MAP[s.color] || '#0a4a4a';
  const isEarned = earned.has(s.id);
  const opacity  = isEarned ? 1 : 0.28;
  const dateStr  = isEarned ? (dates[s.id] || '') : '';

  return `<svg width="${size}" height="${size}" viewBox="0 0 92 92" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity}">
  <defs>
    <path id="a-${s.id}" d="M 9,46 a 37,37 0 1,1 74,0"/>
    <path id="b-${s.id}" d="M 13,52 a 33,33 0 0,0 66,0"/>
  </defs>
  <circle cx="46" cy="46" r="43" fill="none" stroke="${c}" stroke-width="2.5"/>
  <circle cx="46" cy="46" r="36" fill="none" stroke="${c}" stroke-width=".8"/>
  <text x="46" y="53" text-anchor="middle" font-size="20">${s.emoji}</text>
  <text font-size="8.5" font-weight="700" fill="${c}" font-family="Noto Sans KR,sans-serif" letter-spacing="1.8">
    <textPath href="#a-${s.id}" startOffset="22%">${s.city}</textPath>
  </text>
  <text font-size="6.5" fill="${c}" font-family="Arial,sans-serif" letter-spacing=".8">
    <textPath href="#b-${s.id}" startOffset="16%">${(s.name_en || s.name).toUpperCase().slice(0,20)}</textPath>
  </text>
  ${dateStr ? `<text x="46" y="76" text-anchor="middle" font-size="7" fill="${c}" font-family="monospace" letter-spacing=".4">${dateStr}</text>` : ''}
</svg>`;
}

/* ── Toast ── */
let toastTimer;
function showToast(s) {
  const el = document.getElementById('toast');
  document.getElementById('toastStamp').innerHTML = makeStampSVG(s, 40);
  document.getElementById('toastTitle').textContent = s.name + ' 스탬프 획득!';
  document.getElementById('toastSub').textContent   = `${s.city} · ${s.org}`;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3500);
}
function showToastMsg(emoji, title, sub) {
  const el = document.getElementById('toast');
  const ts = document.getElementById('toastStamp');
  ts.innerHTML = ''; ts.textContent = emoji; ts.style.fontSize = '24px';
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastSub').textContent   = sub || '';
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

/* ── Haversine ── */
function distKm(a, b, c, d) {
  const R = 6371, r = Math.PI/180;
  const dLat = (c-a)*r, dLng = (d-b)*r;
  const x = Math.sin(dLat/2)**2 + Math.cos(a*r)*Math.cos(c*r)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

/* ── Render Passport ── */
function renderPassport() {
  document.getElementById('coverCount').textContent = earned.size;
  document.getElementById('coverTotal').textContent = STAMPS.length;
  renderStampGrid();
}

function renderStampGrid() {
  const grid = document.getElementById('stampGrid');
  const visible = activeRegion === '전체' ? STAMPS : STAMPS.filter(s => s.region === activeRegion);
  grid.innerHTML = '';
  visible.forEach(s => {
    const wrap = document.createElement('div');
    wrap.className = 'stamp-wrap' + (earned.has(s.id) ? ' earned' : '');
    const circle = document.createElement('div');
    circle.className = `stamp-circle stamp-${s.color} ${earned.has(s.id) ? 'inked' : 'ghost'}`;
    circle.innerHTML = makeStampSVG(s);
    const label = document.createElement('div');
    label.className = 'stamp-name';
    label.textContent = s.name;
    if (s._trail) {
      const tb = document.createElement('div');
      tb.className = 'stamp-trail-badge';
      tb.textContent = s.dist || '🥾';
      wrap.appendChild(circle); wrap.appendChild(label); wrap.appendChild(tb);
    } else {
      wrap.appendChild(circle); wrap.appendChild(label);
    }
    wrap.addEventListener('click', () => {
      if (TourAPI._hasKey() && s._fromAPI) openModal(s);
      else { if (!dates[s.id]) dates[s.id] = new Date().toISOString().slice(0,10); collect(s.id); renderPassport(); }
    });
    grid.appendChild(wrap);
  });
}

function buildRegionTabs() {
  const row = document.getElementById('regionFilter');
  row.innerHTML = '';
  REGIONS.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'rtab' + (r === activeRegion ? ' active' : '');
    btn.textContent = r;
    btn.addEventListener('click', () => {
      activeRegion = r;
      row.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStampGrid();
    });
    row.appendChild(btn);
  });
}

/* ── Language Panel ── */
function buildLangPanel() {
  const grid = document.getElementById('langGrid');
  grid.innerHTML = '';
  const available = TourAPI.availableLangs();
  Object.entries(LANG_META).forEach(([code, meta]) => {
    const chip = document.createElement('div');
    const isAvail = available.includes(code);
    chip.className = 'lang-chip' + (code === TourAPI.lang ? ' active' : '') + (isAvail ? '' : ' disabled');
    chip.innerHTML = `<span class="lc-flag">${meta.flag}</span><span class="lc-label">${meta.label}</span>`;
    chip.addEventListener('click', () => {
      if (!isAvail) { showToastMsg('🔑', 'API 키 필요', `${meta.label} 키를 tourapi.js에 입력하세요.`); return; }
      TourAPI.setLang(code);
      grid.querySelectorAll('.lang-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      document.getElementById('langBtn').textContent = `🌐 ${meta.label}`;
    });
    grid.appendChild(chip);
  });
}

document.getElementById('langBtn').addEventListener('click', () => {
  langPanelOpen = !langPanelOpen;
  document.getElementById('langPanel').classList.toggle('hidden', !langPanelOpen);
});

/* ── Location List ── */
function renderLocationList() {
  const list = document.getElementById('locationList');
  const q = searchQuery.toLowerCase();
  const visible = q
    ? STAMPS.filter(s => s.name.includes(q) || (s.name_en||'').toLowerCase().includes(q) || s.city.includes(q))
    : STAMPS;
  list.innerHTML = '';
  visible.forEach(s => {
    const row = document.createElement('div');
    row.className = 'loc-item';
    row.innerHTML = `
      <div class="loc-dot" style="background:${COLOR_MAP[s.color]}"></div>
      <div class="loc-info"><h3>${s.name}</h3><p>${s.city} · ${s.org}</p></div>
      <span class="loc-tag">${s.cat}</span>
      <span class="loc-check">${earned.has(s.id) ? '✅' : '○'}</span>`;
    row.addEventListener('click', () => {
      if (!dates[s.id]) dates[s.id] = new Date().toISOString().slice(0,10);
      collect(s.id); renderPassport(); renderLocationList();
    });
    list.appendChild(row);
  });
}

/* ── Search Type Tabs ── */
function buildSearchTypeTabs() {
  const types = ['관광지','문화시설','축제행사','레포츠','음식점'];
  const row = document.getElementById('searchTypeRow');
  types.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'stype-btn' + (t === activeSearchType ? ' active' : '');
    btn.textContent = t;
    btn.addEventListener('click', () => {
      activeSearchType = t;
      row.querySelectorAll('.stype-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    row.appendChild(btn);
  });
}

/* ── API Search ── */
document.getElementById('searchApiBtn').addEventListener('click', async () => {
  const kw = document.getElementById('searchInput').value.trim();
  if (!kw) { renderLocationList(); return; }
  if (!TourAPI._hasKey()) { showToastMsg('🔑', 'API 키 없음', 'tourapi.js에 serviceKey를 입력하세요.'); return; }
  showToastMsg('🔍', '검색 중...', `"${kw}" TourAPI 조회 중`);
  const results = await TourAPI.search(kw);
  results.forEach(s => { if (!STAMPS.find(x => x.id === s.id)) STAMPS.push(s); });
  renderLocationList();
  if (results.length) showToastMsg('✅', `${results.length}개 결과`, `"${kw}" 검색 완료`);
  else showToastMsg('😕', '결과 없음', `"${kw}" 검색 결과가 없습니다.`);
});

document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  if (!searchQuery) renderLocationList();
});
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('searchApiBtn').click();
});

/* ── Festival Button ── */
document.getElementById('festivalBtn').addEventListener('click', async () => {
  if (!TourAPI._hasKey()) { showToastMsg('🔑', 'API 키 없음', 'tourapi.js에 serviceKey를 입력하세요.'); return; }
  showToastMsg('🎪', '축제 조회 중...', '현재 진행 중인 행사를 불러옵니다.');
  const results = await TourAPI.festivals();
  results.forEach(s => { if (!STAMPS.find(x => x.id === s.id)) STAMPS.push(s); });
  renderLocationList();
  showToastMsg('🎪', `${results.length}개 축제`, '목록에 추가되었습니다.');
});

/* ── Trail (두루누비) ── */
document.getElementById('loadTrailBtn').addEventListener('click', async () => {
  if (!KEYS.DRN) { showToastMsg('🔑', 'DRN 키 없음', 'tourapi.js KEYS.DRN에 두루누비 키를 입력하세요.'); return; }
  showToastMsg('🥾', '두루누비 조회 중...', '걷기여행길 데이터를 불러옵니다.');
  const trails = await TourAPI.trails();
  const list = document.getElementById('trailList');
  list.innerHTML = '';
  trails.forEach(t => {
    if (!STAMPS.find(x => x.id === t.id)) STAMPS.push(t);
    const item = document.createElement('div');
    item.className = 'trail-item';
    item.innerHTML = `<span class="trail-icon">🥾</span>
      <div class="trail-info"><h4>${t.name}</h4><p>${t.city} · ${t.org}</p></div>
      ${t.dist ? `<span class="trail-dist">${t.dist}</span>` : ''}`;
    item.addEventListener('click', () => {
      if (!dates[t.id]) dates[t.id] = new Date().toISOString().slice(0,10);
      collect(t.id, t.name, t.org); renderStampGrid();
    });
    list.appendChild(item);
  });
  if (!trails.length) list.innerHTML = '<p style="padding:12px;color:var(--muted);font-size:12px">데이터 없음</p>';
});

/* ── GPS ── */
document.getElementById('gpsBtn').addEventListener('click', () => {
  if (!navigator.geolocation) { showToastMsg('⚠️', 'GPS 미지원', '이 브라우저는 위치 서비스를 지원하지 않습니다.'); return; }
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    const today = new Date().toISOString().slice(0,10);
    let found = 0;

    /* 하드코딩 스탬프 체크 */
    STAMPS.forEach(s => {
      if (!earned.has(s.id) && distKm(lat, lng, s.lat, s.lng) < 0.3) {
        dates[s.id] = today; collect(s.id); found++;
      }
    });

    /* TourAPI 반경 검색 */
    if (TourAPI._hasKey()) {
      showToastMsg('📡', 'TourAPI 조회 중...', '반경 500m 내 관광지 검색');
      const apiStamps = await TourAPI.nearby(lat, lng, 500);
      apiStamps.forEach(s => {
        if (!STAMPS.find(x => x.id === s.id)) STAMPS.push(s);
        if (!earned.has(s.id)) { dates[s.id] = today; collect(s.id); found++; }
      });
    }

    renderPassport();
    if (!found) showToastMsg('📍', '근처 스탬프 없음', '장소를 직접 탭해 수집할 수 있습니다.');
  }, () => showToastMsg('⚠️', '위치 거부됨', 'Safari 설정 > 위치 서비스를 허용하세요.'));
});

/* ── Share ── */
document.getElementById('shareBtn').addEventListener('click', async () => {
  const text = `🇰🇷 Korea Stamp Passport: ${earned.size}/${STAMPS.length}개 스탬프 획득! 한국 여행 스탬프를 모아보세요.`;
  try {
    if (navigator.share) await navigator.share({ title: 'Korea Stamp Passport', text });
    else { await navigator.clipboard.writeText(text); showToastMsg('📋', '복사 완료', '공유 텍스트가 복사되었습니다.'); }
  } catch {}
});

/* ── Detail Modal ── */
async function openModal(s) {
  currentModal = s;
  document.getElementById('modalTitle').textContent = s.name;
  document.getElementById('modalAddr').textContent  = s.addr || s.city;
  document.getElementById('modalStamp').innerHTML   = makeStampSVG(s, 60);
  document.getElementById('modalOverview').textContent = '상세 정보 로딩 중...';
  document.getElementById('modalImg').src = s.image || '';
  document.getElementById('modalMeta').innerHTML = '';
  document.getElementById('modal').classList.remove('hidden');

  if (TourAPI._hasKey() && s._fromAPI) {
    const contentId = s.id.replace('kto_','');
    const [detail, intro] = await Promise.all([
      TourAPI.detail(contentId),
      TourAPI.intro(contentId, '76'),
    ]);
    if (detail) {
      document.getElementById('modalOverview').textContent = detail.overview || '';
      if (detail.firstimage) document.getElementById('modalImg').src = detail.firstimage;
      const meta = document.getElementById('modalMeta');
      if (detail.homepage) meta.innerHTML += `<div class="modal-meta-row"><span>홈페이지</span><span>${detail.homepage.replace(/<[^>]+>/g,'').slice(0,40)}</span></div>`;
    }
    if (intro) {
      const meta = document.getElementById('modalMeta');
      if (intro.usetime)   meta.innerHTML += `<div class="modal-meta-row"><span>운영시간</span><span>${intro.usetime}</span></div>`;
      if (intro.restdate)  meta.innerHTML += `<div class="modal-meta-row"><span>휴무일</span><span>${intro.restdate}</span></div>`;
      if (intro.usefee)    meta.innerHTML += `<div class="modal-meta-row"><span>이용요금</span><span>${intro.usefee}</span></div>`;
      if (intro.parking)   meta.innerHTML += `<div class="modal-meta-row"><span>주차</span><span>${intro.parking}</span></div>`;
    }
  } else {
    document.getElementById('modalOverview').textContent = `${s.city} · ${s.org}`;
  }
}

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});
document.getElementById('modalBackdrop').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});
document.getElementById('modalCollect').addEventListener('click', () => {
  if (currentModal) {
    if (!dates[currentModal.id]) dates[currentModal.id] = new Date().toISOString().slice(0,10);
    collect(currentModal.id);
    renderPassport();
  }
  document.getElementById('modal').classList.add('hidden');
});

/* ── API Status (연계 탭) ── */
function renderApiStatus() {
  const list = document.getElementById('apiStatusList');
  const all = [
    { code:'KOR', label:'국문' }, { code:'ENG', label:'영문' },
    { code:'JPN', label:'일문' }, { code:'CHS', label:'중문(간)' },
    { code:'CHT', label:'중문(번)' }, { code:'SPN', label:'서어' },
    { code:'GER', label:'독어' }, { code:'FRE', label:'불어' },
    { code:'DRN', label:'두루누비' },
  ];
  list.innerHTML = '';
  all.forEach(({ code, label }) => {
    const on = !!KEYS[code];
    const item = document.createElement('div');
    item.className = 'api-status-item';
    item.innerHTML = `<div class="api-dot ${on ? 'on' : 'off'}"></div><span>${on ? '<strong>' : ''}${label}${on ? '</strong>' : ''}</span>`;
    list.appendChild(item);
  });
}

/* ── Partner Cards ── */
function renderPartners() {
  const PARTNERS = [
    { icon:'🏛️', name:'지자체 관광과 제안', sub:'서울·부산·제주·경주·전주 관광진흥과',
      items:['앱을 지자체 공식 디지털 스탬프 투어로 등록','지자체 CI 사용 협약 체결 후 공식 인장으로 교체','관광안내소 QR코드 비치 → 현장 스탬프 발급','제안 대상: 각 시·군·구 문화관광과'], badge:'제안 준비 중' },
    { icon:'🇰🇷', name:'한국관광공사(KTO) 연계', sub:'TourAPI 4.0 다국어 연동 완료',
      items:['국문·영문·일문·중문·서어·독어·불어 7개 언어 API 연동','GPS 반경 500m 이내 관광지 실시간 조회','두루누비 걷기여행길 스탬프 연동','관광벤처 공모 지원 가능'], badge:'API 키 입력 시 즉시 작동' },
    { icon:'🏯', name:'문화재청 / 국립박물관', sub:'국가문화유산포털 연계',
      items:['유네스코 세계유산 공식 스탬프 발급 협약','국립박물관 무인 스탬프기 디지털 대체 제안','문화재청 방문예약제 시스템 연동','담당: 문화재청 활용정책과'], badge:'우선 협의 대상' },
    { icon:'📮', name:'기존 스탬프 투어 디지털 대체', sub:'종이 스탬프북 → 앱 전환',
      items:['경주 스탬프 투어, 부산 해파랑길 등 기존 사업 인수','두루누비 걷기여행길 QR 연동 (현장 인증)','지자체에 유지보수 SaaS 형태로 공급','키오스크 QR ↔ 앱 스탬프 연동'], badge:'수익 모델 핵심' },
  ];
  const c = document.getElementById('partnerCards');
  c.innerHTML = '';
  PARTNERS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'partner-card';
    card.innerHTML = `<div class="partner-card-header"><span class="partner-icon">${p.icon}</span><div><h3>${p.name}</h3><p>${p.sub}</p></div></div>
      <div class="partner-body"><ul>${p.items.map(i=>`<li>${i}</li>`).join('')}</ul><span class="partner-badge">${p.badge}</span></div>`;
    c.appendChild(card);
  });
}

/* ── Tab Nav ── */
document.getElementById('bottomNav').addEventListener('click', e => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  const tab = btn.dataset.tab;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  if (tab === 'partner') { renderApiStatus(); }
});

/* ── Service Worker ── */
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});

/* ── Init ── */
buildRegionTabs();
buildLangPanel();
buildSearchTypeTabs();
renderPartners();
renderPassport();
renderLocationList();
