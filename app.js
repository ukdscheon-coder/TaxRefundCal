'use strict';

const BADGES = [
  // Seoul
  { id:'nseoul',    name:'N Seoul Tower',       city:'Seoul',    cat:'Landmark', emoji:'🗼', lat:37.5512, lng:126.9882 },
  { id:'gyeongbok', name:'Gyeongbokgung',        city:'Seoul',    cat:'Culture',  emoji:'🏯', lat:37.5796, lng:126.9770 },
  { id:'gwangjang', name:'Gwangjang Market',     city:'Seoul',    cat:'Food',     emoji:'🍜', lat:37.5700, lng:126.9996 },
  { id:'hongdae',   name:'Hongdae Street',       city:'Seoul',    cat:'Vibe',     emoji:'🎧', lat:37.5572, lng:126.9254 },
  { id:'bukchon',   name:'Bukchon Hanok',        city:'Seoul',    cat:'Culture',  emoji:'🏘️', lat:37.5826, lng:126.9830 },
  // Busan
  { id:'haeundae',  name:'Haeundae Beach',       city:'Busan',    cat:'Nature',   emoji:'🌊', lat:35.1587, lng:129.1604 },
  { id:'gamcheon',  name:'Gamcheon Village',     city:'Busan',    cat:'Culture',  emoji:'🎨', lat:35.0975, lng:129.0106 },
  { id:'jagalchi',  name:'Jagalchi Market',      city:'Busan',    cat:'Food',     emoji:'🐟', lat:35.0969, lng:129.0305 },
  // Jeonju / Gyeongju / Jeju / Suwon
  { id:'jeonju',    name:'Jeonju Hanok Village', city:'Jeonju',   cat:'Culture',  emoji:'🍚', lat:35.8151, lng:127.1534 },
  { id:'bulguksa',  name:'Bulguksa Temple',      city:'Gyeongju', cat:'Culture',  emoji:'⛩️', lat:35.7900, lng:129.3320 },
  { id:'ilchul',    name:'Seongsan Ilchulbong',  city:'Jeju',     cat:'Nature',   emoji:'🌋', lat:33.4581, lng:126.9425 },
  { id:'hwaseong',  name:'Suwon Hwaseong',       city:'Suwon',    cat:'Landmark', emoji:'🏰', lat:37.2871, lng:127.0116 },
];

const CITIES = [...new Set(BADGES.map(b => b.city))];
const CATS   = [...new Set(BADGES.map(b => b.cat))];

// --- State ---
const earned = new Set(JSON.parse(localStorage.getItem('kp_earned') || '[]'));
let activeFilter = 'All';

function save() { localStorage.setItem('kp_earned', JSON.stringify([...earned])); }

function collect(id) {
  if (earned.has(id)) return;
  earned.add(id);
  save();
  const b = BADGES.find(x => x.id === id);
  showToast(b.emoji, b.name, `${b.city} · ${b.cat} badge collected!`);
  renderAll();
}

// --- Toast ---
let toastTimer;
function showToast(emoji, title, sub) {
  const el = document.getElementById('toast');
  document.getElementById('toastEmoji').textContent = emoji;
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastSub').textContent = sub;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

// --- Haversine distance (km) ---
function distKm(lat1, lng1, lat2, lng2) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (lat2 - lat1) * r, dLng = (lng2 - lng1) * r;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// --- Render ---
function renderAll() {
  renderPassport();
  renderBadges();
  renderStats();
}

function renderPassport() {
  const total = BADGES.length;
  const count = earned.size;
  document.getElementById('overallText').textContent = `${count} / ${total}`;
  document.getElementById('overallBar').style.width = `${count / total * 100}%`;

  const cityProgress = document.getElementById('cityProgress');
  cityProgress.innerHTML = '';
  CITIES.forEach(city => {
    const all = BADGES.filter(b => b.city === city);
    const done = all.filter(b => earned.has(b.id)).length;
    const pct = Math.round(done / all.length * 100);
    const card = document.createElement('div');
    card.className = 'city-card';
    card.innerHTML = `<h3>${city}</h3><div class="city-bar"><div style="width:${pct}%"></div></div><p class="city-pct">${done}/${all.length} · ${pct}%</p>`;
    cityProgress.appendChild(card);
  });
}

function renderBadges() {
  const grid = document.getElementById('badgeGrid');
  grid.innerHTML = '';
  const visible = activeFilter === 'All' ? BADGES : BADGES.filter(b => b.city === activeFilter || b.cat === activeFilter);
  visible.forEach(b => {
    const div = document.createElement('div');
    div.className = 'badge-item' + (earned.has(b.id) ? ' earned' : '');
    div.innerHTML = `
      <div class="badge-icon">${b.emoji}</div>
      <div class="badge-info">
        <h3>${b.name}</h3>
        <p>${b.city}</p>
        <span class="badge-tag">${b.cat}</span>
      </div>
      <span class="badge-check">${earned.has(b.id) ? '✅' : '○'}</span>`;
    div.addEventListener('click', () => collect(b.id));
    grid.appendChild(div);
  });
}

function renderStats() {
  const panel = document.getElementById('statsPanel');
  const count = earned.size;
  const total = BADGES.length;
  const pct = Math.round(count / total * 100);

  const catCounts = {};
  CATS.forEach(c => {
    const all = BADGES.filter(b => b.cat === c);
    catCounts[c] = `${all.filter(b => earned.has(b.id)).length}/${all.length}`;
  });

  panel.innerHTML = `
    <div class="stat-card">
      <h3>Total Badges</h3>
      <div class="stat-number">${count}</div>
      <div class="stat-sub">${pct}% of Korea explored</div>
    </div>
    <div class="stat-card">
      <h3>Cities Visited</h3>
      <div class="stat-number">${CITIES.filter(c => BADGES.some(b => b.city===c && earned.has(b.id))).length}</div>
      <div class="stat-sub">of ${CITIES.length} cities</div>
    </div>
    <div class="stat-card">
      <h3>By Category</h3>
      <div class="category-list">
        ${CATS.map(c => `<div class="category-row"><span>${c}</span><span>${catCounts[c]}</span></div>`).join('')}
      </div>
    </div>`;
}

function buildFilters() {
  const row = document.getElementById('filterRow');
  ['All', ...CITIES, ...CATS].forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'filter-chip' + (f === 'All' ? ' active' : '');
    btn.textContent = f;
    btn.addEventListener('click', () => {
      activeFilter = f;
      row.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBadges();
    });
    row.appendChild(btn);
  });
}

// --- Tab navigation ---
document.getElementById('bottomNav').addEventListener('click', e => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  const tab = btn.dataset.tab;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
});

// --- GPS check ---
document.getElementById('gpsBtn').addEventListener('click', () => {
  if (!navigator.geolocation) { showToast('⚠️', 'GPS unavailable', 'Location not supported on this browser.'); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    let found = 0;
    BADGES.forEach(b => {
      if (!earned.has(b.id) && distKm(latitude, longitude, b.lat, b.lng) < 0.5) {
        collect(b.id);
        found++;
      }
    });
    if (!found) showToast('📍', 'No badge nearby', 'Tap any badge to collect in demo mode.');
  }, () => showToast('⚠️', 'Location denied', 'Allow location access in Safari > Settings.'));
});

// --- Share ---
document.getElementById('shareBtn').addEventListener('click', async () => {
  const text = `🇰🇷 Korea Passport: I collected ${earned.size}/${BADGES.length} badges! Can you complete Korea?`;
  try {
    if (navigator.share) { await navigator.share({ title: 'Korea Passport', text }); }
    else { await navigator.clipboard.writeText(text); showToast('📋', 'Copied!', 'Share text copied to clipboard.'); }
  } catch {}
});

// --- Service Worker ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// --- Init ---
buildFilters();
renderAll();
