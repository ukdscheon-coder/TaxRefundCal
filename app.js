'use strict';

/* ────────────────────────────────────────────
   STAMP LOCATIONS
   color: red=서울 blue=부산/경남 green=자연/국립공원
          purple=역사/문화재 teal=기타지역
   org: 담당 공공기관 (관공서 연계용)
──────────────────────────────────────────── */
const STAMPS = [
  // 서울특별시
  { id:'gyeongbok',  name:'경복궁',           name_en:'Gyeongbokgung',       city:'서울', region:'서울',    cat:'문화재', color:'purple', emoji:'🏯', org:'문화재청',        lat:37.5796, lng:126.9770 },
  { id:'namsangol',  name:'남산골 한옥마을',   name_en:'Namsangol Hanok',     city:'서울', region:'서울',    cat:'문화',   color:'purple', emoji:'🏘️', org:'서울시 문화본부', lat:37.5623, lng:126.9974 },
  { id:'bukchon',    name:'북촌 한옥마을',     name_en:'Bukchon Hanok',       city:'서울', region:'서울',    cat:'문화',   color:'purple', emoji:'🏡', org:'서울시 종로구',   lat:37.5826, lng:126.9830 },
  { id:'nseoul',     name:'N서울타워',         name_en:'N Seoul Tower',       city:'서울', region:'서울',    cat:'랜드마크',color:'red',   emoji:'🗼', org:'서울시 관광체육국',lat:37.5512, lng:126.9882 },
  { id:'changdeok',  name:'창덕궁',           name_en:'Changdeokgung',       city:'서울', region:'서울',    cat:'문화재', color:'purple', emoji:'🏰', org:'문화재청',        lat:37.5792, lng:126.9910 },
  { id:'deoksugung', name:'덕수궁',           name_en:'Deoksugung',          city:'서울', region:'서울',    cat:'문화재', color:'purple', emoji:'🏛️', org:'문화재청',        lat:37.5658, lng:126.9753 },
  { id:'gwangjang',  name:'광장시장',         name_en:'Gwangjang Market',    city:'서울', region:'서울',    cat:'전통시장',color:'red',   emoji:'🍜', org:'서울시 종로구',   lat:37.5700, lng:126.9996 },
  { id:'hongdae',    name:'홍대거리',         name_en:'Hongdae Street',      city:'서울', region:'서울',    cat:'문화',   color:'red',    emoji:'🎧', org:'서울시 마포구',   lat:37.5572, lng:126.9254 },
  { id:'insadong',   name:'인사동',           name_en:'Insadong',            city:'서울', region:'서울',    cat:'문화',   color:'red',    emoji:'🎎', org:'서울시 종로구',   lat:37.5743, lng:126.9854 },
  { id:'dongdaemun', name:'동대문 디자인플라자',name_en:'DDP',               city:'서울', region:'서울',    cat:'랜드마크',color:'red',   emoji:'🌐', org:'서울시 디자인재단',lat:37.5670, lng:127.0095 },

  // 부산광역시
  { id:'haeundae',   name:'해운대 해수욕장',  name_en:'Haeundae Beach',      city:'부산', region:'부산',    cat:'자연',   color:'blue',   emoji:'🌊', org:'부산시 관광진흥과',lat:35.1587, lng:129.1604 },
  { id:'gamcheon',   name:'감천문화마을',     name_en:'Gamcheon Village',    city:'부산', region:'부산',    cat:'문화',   color:'blue',   emoji:'🎨', org:'부산시 서구',     lat:35.0975, lng:129.0106 },
  { id:'jagalchi',   name:'자갈치시장',       name_en:'Jagalchi Market',     city:'부산', region:'부산',    cat:'전통시장',color:'blue',  emoji:'🐟', org:'부산시 중구',     lat:35.0969, lng:129.0305 },
  { id:'gwangalli',  name:'광안리 해수욕장',  name_en:'Gwangalli Beach',     city:'부산', region:'부산',    cat:'자연',   color:'blue',   emoji:'🌉', org:'부산시 수영구',   lat:35.1530, lng:129.1188 },
  { id:'busan_tower',name:'용두산 공원',      name_en:'Yongdusan Park',      city:'부산', region:'부산',    cat:'랜드마크',color:'blue',  emoji:'🏙️', org:'부산시 관광진흥과',lat:35.1006, lng:129.0325 },
  { id:'haedong',    name:'해동 용궁사',      name_en:'Haedong Yonggungsa',  city:'부산', region:'부산',    cat:'문화재', color:'blue',   emoji:'⛩️', org:'부산시 기장군',   lat:35.1888, lng:129.2218 },

  // 경주시
  { id:'bulguksa',   name:'불국사',           name_en:'Bulguksa Temple',     city:'경주', region:'경상',    cat:'세계유산',color:'purple', emoji:'🛕', org:'문화재청',        lat:35.7900, lng:129.3320 },
  { id:'seokguram',  name:'석굴암',           name_en:'Seokguram Grotto',    city:'경주', region:'경상',    cat:'세계유산',color:'purple', emoji:'🗿', org:'문화재청',        lat:35.7950, lng:129.3468 },
  { id:'tumuli',     name:'대릉원 (천마총)',   name_en:'Daereungwon Tumuli',  city:'경주', region:'경상',    cat:'문화재', color:'purple', emoji:'🏔️', org:'경주시 문화관광과',lat:35.8343, lng:129.2189 },
  { id:'anapji',     name:'동궁과 월지',      name_en:'Donggung & Wolji',    city:'경주', region:'경상',    cat:'문화재', color:'purple', emoji:'🌙', org:'경주시 문화관광과',lat:35.8343, lng:129.2277 },

  // 전주시
  { id:'jeonju_hanok',name:'전주 한옥마을',  name_en:'Jeonju Hanok Village', city:'전주', region:'전라',    cat:'문화',   color:'green',  emoji:'🏯', org:'전주시 관광과',   lat:35.8151, lng:127.1534 },
  { id:'jeonju_bibim',name:'전주 남부시장',  name_en:'Jeonju Nambu Market',  city:'전주', region:'전라',    cat:'전통시장',color:'green', emoji:'🍱', org:'전주시 경제통상과',lat:35.8127, lng:127.1486 },

  // 제주도
  { id:'ilchul',     name:'성산 일출봉',      name_en:'Seongsan Ilchulbong', city:'제주', region:'제주',    cat:'세계유산',color:'teal',  emoji:'🌋', org:'제주도 세계유산본부',lat:33.4581, lng:126.9425 },
  { id:'hallasan',   name:'한라산 국립공원',  name_en:'Hallasan Nat\'l Park', city:'제주', region:'제주',    cat:'자연',   color:'teal',   emoji:'🏔️', org:'제주도 한라산국립공원',lat:33.3617, lng:126.5292 },
  { id:'manjanggul',name:'만장굴',            name_en:'Manjanggul Cave',     city:'제주', region:'제주',    cat:'세계유산',color:'teal',  emoji:'🕳️', org:'제주도 세계유산본부',lat:33.5283, lng:126.7711 },
  { id:'jeju_olle',  name:'제주 올레길',      name_en:'Jeju Olle Trail',     city:'제주', region:'제주',    cat:'자연',   color:'teal',   emoji:'🥾', org:'제주올레재단',    lat:33.2541, lng:126.5600 },

  // 강원도
  { id:'seoraksan',  name:'설악산 국립공원',  name_en:'Seoraksan Nat\'l Park',city:'속초', region:'강원',   cat:'자연',   color:'green',  emoji:'🏞️', org:'국립공원공단',    lat:38.1198, lng:128.4655 },
  { id:'nami',       name:'남이섬',           name_en:'Nami Island',         city:'춘천', region:'강원',    cat:'자연',   color:'green',  emoji:'🌲', org:'춘천시 관광과',   lat:37.7896, lng:127.5261 },
  { id:'jeongdongjin',name:'정동진',          name_en:'Jeongdongjin',        city:'강릉', region:'강원',    cat:'자연',   color:'green',  emoji:'🌅', org:'강릉시 관광과',   lat:37.6835, lng:129.0464 },

  // 인천
  { id:'incheon_chinatown',name:'인천 차이나타운',name_en:'Incheon Chinatown',city:'인천', region:'인천',   cat:'문화',   color:'red',    emoji:'🏮', org:'인천시 중구',     lat:37.4762, lng:126.6176 },
  { id:'ganghwado',  name:'강화도 고려궁지',  name_en:'Goryeo Palace Site',  city:'인천', region:'인천',    cat:'문화재', color:'purple', emoji:'🏯', org:'인천시 강화군',   lat:37.7472, lng:126.4877 },

  // 경기도
  { id:'hwaseong',   name:'수원 화성',        name_en:'Suwon Hwaseong',      city:'수원', region:'경기',    cat:'세계유산',color:'purple', emoji:'🏰', org:'수원시 문화체육관광국',lat:37.2871, lng:127.0116 },
  { id:'namhansanseong',name:'남한산성',      name_en:'Namhansanseong',      city:'광주', region:'경기',    cat:'세계유산',color:'purple', emoji:'🗺️', org:'경기도 문화유산과',lat:37.4794, lng:127.1783 },
];

const REGIONS = ['전체', ...new Set(STAMPS.map(s => s.region))];
const COLOR_MAP = {
  red: '#8b1a1a', blue: '#0a2d6e', green: '#0d4a2d', purple: '#3d1a6e', teal: '#0a4a4a'
};

/* ── State ── */
const earned = new Set(JSON.parse(localStorage.getItem('kp_earned') || '[]'));
let activeRegion = '전체';
let searchQuery = '';

function save() { localStorage.setItem('kp_earned', JSON.stringify([...earned])); }

function collect(id) {
  if (earned.has(id)) return;
  earned.add(id); save();
  const s = STAMPS.find(x => x.id === id);
  showToast(s);
  renderAll();
}

/* ── SVG Official Seal Stamp ── */
function makeStampSVG(s, size = 96) {
  const c = COLOR_MAP[s.color];
  const isEarned = earned.has(s.id);
  const opacity = isEarned ? 1 : 0.3;
  const today = isEarned
    ? (JSON.parse(localStorage.getItem('kp_dates') || '{}')?.[s.id] || new Date().toISOString().slice(0,10))
    : '';

  // Arc text helper (city name around the top)
  const r = 38;
  const arcText = s.city.length <= 3 ? s.city : s.city.slice(0,3);

  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity}">
  <defs>
    <path id="arc-top-${s.id}" d="M 10,48 a 38,38 0 1,1 76,0"/>
    <path id="arc-bot-${s.id}" d="M 14,54 a 34,34 0 0,0 68,0"/>
  </defs>
  <!-- outer ring -->
  <circle cx="48" cy="48" r="45" fill="none" stroke="${c}" stroke-width="2.5"/>
  <!-- inner ring -->
  <circle cx="48" cy="48" r="38" fill="none" stroke="${c}" stroke-width="1"/>
  <!-- center emoji -->
  <text x="48" y="55" text-anchor="middle" font-size="22">${s.emoji}</text>
  <!-- top arc: city name KO -->
  <text font-size="9" font-weight="700" fill="${c}" font-family="Noto Sans KR, sans-serif" letter-spacing="2">
    <textPath href="#arc-top-${s.id}" startOffset="20%">${s.city}</textPath>
  </text>
  <!-- bottom arc: English -->
  <text font-size="7" fill="${c}" font-family="Arial, sans-serif" letter-spacing="1">
    <textPath href="#arc-bot-${s.id}" startOffset="18%">${s.name_en.toUpperCase()}</textPath>
  </text>
  ${isEarned ? `<!-- date -->
  <text x="48" y="79" text-anchor="middle" font-size="7.5" fill="${c}" font-family="monospace" letter-spacing=".5">${today}</text>` : ''}
  ${isEarned ? `<!-- ink bleed circles -->
  <circle cx="48" cy="48" r="44" fill="none" stroke="${c}" stroke-width=".5" opacity=".3"/>` : ''}
</svg>`;
}

/* ── Toast ── */
let toastTimer;
function showToast(s) {
  const el = document.getElementById('toast');
  document.getElementById('toastStamp').innerHTML = makeStampSVG(s, 44);
  document.getElementById('toastStamp').style.cssText = '';
  document.getElementById('toastTitle').textContent = s.name + ' 스탬프 획득!';
  document.getElementById('toastSub').textContent = `${s.city} · ${s.org}`;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3500);
}

/* ── GPS ── */
function distKm(a, b, c, d) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (c-a)*r, dLng = (d-b)*r;
  const x = Math.sin(dLat/2)**2 + Math.cos(a*r)*Math.cos(c*r)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

/* ── Render ── */
function renderAll() {
  renderCover();
  renderStampGrid();
  renderLocationList();
}

function renderCover() {
  document.getElementById('coverCount').textContent = earned.size;
  document.getElementById('coverTotal').textContent = STAMPS.length;
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
    wrap.appendChild(circle);
    wrap.appendChild(label);
    wrap.addEventListener('click', () => {
      // save date on first collect
      if (!earned.has(s.id)) {
        const dates = JSON.parse(localStorage.getItem('kp_dates') || '{}');
        dates[s.id] = new Date().toISOString().slice(0,10);
        localStorage.setItem('kp_dates', JSON.stringify(dates));
      }
      collect(s.id);
    });
    grid.appendChild(wrap);
  });
}

function renderLocationList() {
  const list = document.getElementById('locationList');
  const q = searchQuery.toLowerCase();
  const visible = STAMPS.filter(s =>
    !q || s.name.includes(q) || s.name_en.toLowerCase().includes(q) || s.city.includes(q) || s.org.includes(q)
  );
  list.innerHTML = '';
  visible.forEach(s => {
    const row = document.createElement('div');
    row.className = 'loc-item';
    row.innerHTML = `
      <div class="loc-dot" style="background:${COLOR_MAP[s.color]}"></div>
      <div class="loc-info">
        <h3>${s.name}</h3>
        <p>${s.city} · ${s.org}</p>
      </div>
      <span class="loc-tag">${s.cat}</span>
      <span class="loc-check">${earned.has(s.id) ? '✅' : '○'}</span>`;
    row.addEventListener('click', () => collect(s.id));
    list.appendChild(row);
  });
}

function renderRegionTabs() {
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

function renderPartners() {
  const PARTNERS = [
    {
      icon: '🏛️',
      name: '지자체 관광과 제안',
      sub: '서울·부산·제주·경주·전주 관광진흥과',
      items: [
        '앱을 지자체 공식 디지털 스탬프 투어로 등록',
        '지자체 CI(심볼마크) 사용 협약 체결 후 공식 인장으로 교체',
        '관광안내소 QR코드 비치 → 현장 스탬프 발급',
        '제안 대상: 각 시·군·구 문화관광과 또는 관광진흥과',
      ],
      badge: '제안 준비 중'
    },
    {
      icon: '🇰🇷',
      name: '한국관광공사(KTO) 연계',
      sub: 'Korea Tourism Organization',
      items: [
        'KTO 공식 관광지 DB API 연동 → 장소 자동 업데이트',
        '외래관광객 유치 캠페인과 공동 홍보',
        '관광두레·지역관광 활성화 사업 연계',
        '담당: KTO 디지털관광본부 (1330 관광통역안내)',
      ],
      badge: 'API 연동 가능'
    },
    {
      icon: '🏯',
      name: '문화재청 / 국립박물관',
      sub: '국가문화유산포털 연계',
      items: [
        '유네스코 세계유산 7개소 공식 스탬프 발급 협약',
        '국립박물관 무인 스탬프기 디지털 대체 제안',
        '문화재청 "방문예약제" 시스템 연동',
        '담당: 문화재청 활용정책과 / 국립중앙박물관 디지털혁신팀',
      ],
      badge: '우선 협의 대상'
    },
    {
      icon: '📮',
      name: '기존 스탬프 투어 디지털 대체',
      sub: '지자체 종이 스탬프 투어 앱 전환',
      items: [
        '현재 운영 중인 종이 스탬프북 → 앱으로 전환',
        '경주 스탬프 투어, 부산 해파랑길 등 기존 사업 인수',
        '스탬프 발급 키오스크 QR 연동 (현장 방문 인증)',
        '지자체에 유지보수 SaaS 형태로 공급',
      ],
      badge: '수익 모델 핵심'
    },
  ];

  const container = document.getElementById('partnerCards');
  container.innerHTML = '';
  PARTNERS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'partner-card';
    card.innerHTML = `
      <div class="partner-card-header">
        <span class="partner-icon">${p.icon}</span>
        <div><h3>${p.name}</h3><p>${p.sub}</p></div>
      </div>
      <div class="partner-body">
        <ul>${p.items.map(i => `<li>${i}</li>`).join('')}</ul>
        <span class="partner-badge">${p.badge}</span>
      </div>`;
    container.appendChild(card);
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
});

/* ── GPS Button ── */
document.getElementById('gpsBtn').addEventListener('click', () => {
  if (!navigator.geolocation) { showToastMsg('⚠️', 'GPS 미지원', '이 브라우저에서는 위치 서비스를 사용할 수 없습니다.'); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    let found = 0;
    STAMPS.forEach(s => {
      if (!earned.has(s.id) && distKm(latitude, longitude, s.lat, s.lng) < 0.3) {
        const dates = JSON.parse(localStorage.getItem('kp_dates') || '{}');
        dates[s.id] = new Date().toISOString().slice(0,10);
        localStorage.setItem('kp_dates', JSON.stringify(dates));
        collect(s.id); found++;
      }
    });
    if (!found) showToastMsg('📍', '근처 스탬프 없음', '장소를 직접 탭해 데모 수집이 가능합니다.');
  }, () => showToastMsg('⚠️', '위치 거부됨', 'Safari 설정 > 개인정보 > 위치 서비스를 허용하세요.'));
});

function showToastMsg(emoji, title, sub) {
  const el = document.getElementById('toast');
  document.getElementById('toastStamp').textContent = emoji;
  document.getElementById('toastStamp').style.fontSize = '28px';
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastSub').textContent = sub;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

/* ── Share ── */
document.getElementById('shareBtn').addEventListener('click', async () => {
  const text = `🇰🇷 Korea Stamp Passport: ${earned.size}/${STAMPS.length}개 스탬프 획득! 당신도 한국 여행 스탬프를 모아보세요.`;
  try {
    if (navigator.share) { await navigator.share({ title: 'Korea Stamp Passport', text }); }
    else { await navigator.clipboard.writeText(text); showToastMsg('📋', '복사 완료', '공유 텍스트가 복사되었습니다.'); }
  } catch {}
});

/* ── Search ── */
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  renderLocationList();
});

/* ── Service Worker ── */
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js').catch(() => {}); }

/* ── Init ── */
renderRegionTabs();
renderPartners();
renderAll();
