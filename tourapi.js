/* ═══════════════════════════════════════════════════
   TourAPI 4.0 – 한국관광공사 다국어 연동 모듈
   serviceKey는 아래 KEYS 객체에 직접 입력하세요.
   모든 endpoint는 동일한 인증키를 공유합니다.
═══════════════════════════════════════════════════ */

/* ── API 인증키: 여기에 입력 ── */
const KEYS = {
  KOR: '',   // 한국관광공사_국문 관광정보서비스_GW
  ENG: '',   // 한국관광공사_영문 관광정보서비스_GW
  JPN: '',   // 한국관광공사_일문 관광정보서비스_GW
  CHS: '',   // 한국관광공사_중문 간체 관광정보서비스_GW
  CHT: '',   // 한국관광공사_중문 번체 관광정보서비스_GW
  SPN: '',   // 한국관광공사_서어 관광정보서비스_GW
  GER: '',   // 한국관광공사_독어 관광정보서비스_GW
  FRE: '',   // 한국관광공사_불어 관광정보서비스_GW
  DRN: '',   // 한국관광공사_두루누비 정보 서비스_GW
};

/* ── Endpoint 맵 ── */
const ENDPOINTS = {
  KOR: 'https://apis.data.go.kr/B551011/KorService2',
  ENG: 'https://apis.data.go.kr/B551011/EngService2',
  JPN: 'https://apis.data.go.kr/B551011/JpnService2',
  CHS: 'https://apis.data.go.kr/B551011/ChsService2',
  CHT: 'https://apis.data.go.kr/B551011/ChtService2',
  SPN: 'https://apis.data.go.kr/B551011/SpnService2',
  GER: 'https://apis.data.go.kr/B551011/GerService2',
  FRE: 'https://apis.data.go.kr/B551011/FreService2',
  DRN: 'https://apis.data.go.kr/B551011/Durunubi',
};

/* ── 언어 메타 ── */
const LANG_META = {
  KOR: { label: '한국어', flag: '🇰🇷', dir: 'ltr' },
  ENG: { label: 'English', flag: '🇺🇸', dir: 'ltr' },
  JPN: { label: '日本語', flag: '🇯🇵', dir: 'ltr' },
  CHS: { label: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  CHT: { label: '繁體中文', flag: '🇹🇼', dir: 'ltr' },
  SPN: { label: 'Español', flag: '🇪🇸', dir: 'ltr' },
  GER: { label: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  FRE: { label: 'Français', flag: '🇫🇷', dir: 'ltr' },
};

/* ── contentTypeId (신규 스펙) ── */
const CONTENT_TYPE = {
  관광지: '76',
  문화시설: '78',
  축제행사: '85',
  레포츠: '75',
  쇼핑: '79',
  숙박: '80',
  음식점: '82',
  교통: '77',
};

/* ── 법정동 시도코드 (신규 스펙) ── */
const LDONG_CODE = {
  서울: '11', 부산: '26', 대구: '27', 인천: '28',
  광주: '29', 대전: '30', 울산: '31', 세종: '36',
  경기: '41', 강원: '42', 충북: '43', 충남: '44',
  전북: '45', 전남: '46', 경북: '47', 경남: '48', 제주: '50',
};

/* ═══ TourAPI 클라이언트 ═══ */
const TourAPI = {
  lang: 'KOR',

  _os() { return /iPhone|iPad/.test(navigator.userAgent) ? 'IOS' : 'AND'; },

  _base(langCode = this.lang) { return ENDPOINTS[langCode]; },

  _key(langCode = this.lang) { return KEYS[langCode]; },

  _hasKey(langCode = this.lang) { return !!KEYS[langCode]; },

  _params(langCode, extra = {}) {
    const key = KEYS[langCode];
    if (!key) return null;
    return new URLSearchParams({
      serviceKey: key,
      MobileOS: this._os(),
      MobileApp: 'KoreaPassport',
      _type: 'json',
      numOfRows: 20,
      pageNo: 1,
      ...extra
    }).toString();
  },

  async _get(langCode, endpoint, params) {
    if (!params) return [];
    try {
      const res = await fetch(`${ENDPOINTS[langCode]}/${endpoint}?${params}`);
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      const item = json?.response?.body?.items?.item;
      if (!item) return [];
      return Array.isArray(item) ? item : [item];
    } catch (e) {
      console.warn(`TourAPI [${langCode}/${endpoint}] 오류:`, e.message);
      return [];
    }
  },

  /* ── 1. GPS 반경 내 관광지 (스탬프 핵심) ── */
  async nearby(lat, lng, radiusM = 500, langCode = this.lang) {
    const p = this._params(langCode, {
      mapX: lng, mapY: lat, radius: radiusM,
      contentTypeId: CONTENT_TYPE.관광지,
      arrange: 'S',   // S=거리순
      numOfRows: 30,
    });
    const items = await this._get(langCode, 'locationBasedList2', p);
    return items.map(i => this._toStamp(i, langCode));
  },

  /* ── 2. 지역 기반 목록 ── */
  async byRegion(regionKo, contentType = '관광지', langCode = this.lang) {
    const lDongRegnCd = LDONG_CODE[regionKo];
    if (!lDongRegnCd) return [];
    const p = this._params(langCode, {
      lDongRegnCd,
      contentTypeId: CONTENT_TYPE[contentType],
      arrange: 'O',   // O=대표이미지있는 제목순
      numOfRows: 30,
    });
    const items = await this._get(langCode, 'areaBasedList2', p);
    return items.map(i => this._toStamp(i, langCode));
  },

  /* ── 3. 키워드 검색 ── */
  async search(keyword, langCode = this.lang) {
    const encoded = encodeURIComponent(keyword);
    const p = this._params(langCode, {
      keyword: encoded,
      arrange: 'O',
      numOfRows: 20,
    });
    const items = await this._get(langCode, 'searchKeyword2', p);
    return items.map(i => this._toStamp(i, langCode));
  },

  /* ── 4. 축제/행사 (기간 내) ── */
  async festivals(langCode = this.lang) {
    const today = new Date().toISOString().slice(0,10).replace(/-/g,'');
    const p = this._params(langCode, {
      eventStartDate: today,
      arrange: 'O',
      numOfRows: 20,
    });
    const items = await this._get(langCode, 'searchFestival2', p);
    return items.map(i => this._toStamp(i, langCode, '축제'));
  },

  /* ── 5. 공통 상세정보 (팝업용) ── */
  async detail(contentId, langCode = this.lang) {
    const p = this._params(langCode, { contentId });
    const items = await this._get(langCode, 'detailCommon2', p);
    return items[0] ?? null;
  },

  /* ── 6. 소개정보 (운영시간, 휴무일) ── */
  async intro(contentId, contentTypeId, langCode = this.lang) {
    const p = this._params(langCode, { contentId, contentTypeId });
    const items = await this._get(langCode, 'detailIntro2', p);
    return items[0] ?? null;
  },

  /* ── 7. 이미지 목록 ── */
  async images(contentId, langCode = this.lang) {
    const p = this._params(langCode, { contentId, imageYN: 'Y' });
    return await this._get(langCode, 'detailImage2', p);
  },

  /* ── 8. 두루누비 걷기여행길 ── */
  async trails(lDongRegnCd = '') {
    if (!KEYS.DRN) return [];
    try {
      const p = new URLSearchParams({
        serviceKey: KEYS.DRN,
        MobileOS: this._os(),
        MobileApp: 'KoreaPassport',
        _type: 'json',
        numOfRows: 20,
        pageNo: 1,
        ...(lDongRegnCd && { lDongRegnCd }),
      });
      const res = await fetch(`${ENDPOINTS.DRN}/durunubi?${p}`);
      const json = await res.json();
      const item = json?.response?.body?.items?.item;
      if (!item) return [];
      const arr = Array.isArray(item) ? item : [item];
      return arr.map(i => ({
        id: 'trail_' + (i.routeIdx || i.contentid),
        name: i.routeNm || i.title || '걷기여행길',
        name_en: i.routeNm || i.title || 'Trail',
        city: i.siNm || '',
        region: i.sidoNm || '기타',
        cat: '걷기여행',
        color: 'green',
        emoji: '🥾',
        org: '한국관광공사 두루누비',
        lat: parseFloat(i.startLat || i.mapy || 0),
        lng: parseFloat(i.startLng || i.mapx || 0),
        image: i.imgFileUrl || '',
        addr: i.siNm || '',
        dist: i.totalLen ? `${(i.totalLen/1000).toFixed(1)}km` : '',
        _fromAPI: true,
        _trail: true,
      }));
    } catch (e) {
      console.warn('두루누비 오류:', e.message);
      return [];
    }
  },

  /* ── 내부: API 응답 → 스탬프 객체 변환 ── */
  _toStamp(i, langCode, overrideCat) {
    const regionKey = Object.entries(LDONG_CODE).find(([, v]) => v === i.lDongRegnCd)?.[0]
      || Object.keys(LDONG_CODE).find(k => (i.addr1 || '').startsWith(k))
      || '기타';
    return {
      id: 'kto_' + i.contentid,
      name: i.title || '',
      name_en: i.title || '',
      city: (i.addr1 || '').split(' ').slice(0,2).join(' '),
      region: regionKey,
      cat: overrideCat || CONTENT_TYPE_LABEL[i.contenttypeid] || '관광지',
      color: REGION_COLOR_MAP[regionKey] || 'teal',
      emoji: CAT_EMOJI[i.contenttypeid] || '📍',
      org: 'KTO TourAPI',
      lat: parseFloat(i.mapy || 0),
      lng: parseFloat(i.mapx || 0),
      image: i.firstimage || '',
      addr: i.addr1 || '',
      dist: i.dist ? `${(parseFloat(i.dist)/1000).toFixed(2)}km` : '',
      _fromAPI: true,
      _lang: langCode,
    };
  },

  /* ── 현재 언어 변경 ── */
  setLang(code) {
    if (ENDPOINTS[code]) this.lang = code;
  },

  /* ── 키 입력 여부 확인 ── */
  availableLangs() {
    return Object.keys(KEYS).filter(k => k !== 'DRN' && !!KEYS[k]);
  },
};

/* ── contentTypeId → 한글 레이블 ── */
const CONTENT_TYPE_LABEL = {
  '75':'레포츠','76':'관광지','77':'교통','78':'문화시설',
  '79':'쇼핑','80':'숙박','82':'음식점','85':'축제행사',
};

/* ── contentTypeId → 이모지 ── */
const CAT_EMOJI = {
  '75':'🏄','76':'📍','77':'🚆','78':'🏛️',
  '79':'🛍️','80':'🏨','82':'🍽️','85':'🎪',
};

/* ── 지역 → 스탬프 색상 ── */
const REGION_COLOR_MAP = {
  서울:'red', 인천:'red', 경기:'red',
  부산:'blue', 울산:'blue', 경남:'blue', 대구:'blue', 경북:'purple',
  제주:'teal',
  강원:'green',
  전북:'green', 전남:'green', 광주:'green',
  충북:'purple', 충남:'purple', 대전:'purple', 세종:'purple',
};
