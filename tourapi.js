/* ── TourAPI 4.0 연동 모듈 ──
   발급: https://www.data.go.kr → "한국관광공사_국문 관광정보 서비스_GW" 검색 → 활용신청
   개발계정: 일 1,000건, 자동승인(10분), 운영계정: 별도 신청
─────────────────────────────────────── */

const TOUR_API = {
  BASE: 'https://apis.data.go.kr/B551011/KorService2',
  KEY: '',          // ← 발급받은 serviceKey 여기에 입력
  APP: 'KoreaPassport',

  /* 공통 파라미터 */
  _params(extra = {}) {
    const p = new URLSearchParams({
      serviceKey: this.KEY,
      MobileOS: /iPhone|iPad/.test(navigator.userAgent) ? 'IOS' : 'AND',
      MobileApp: this.APP,
      _type: 'json',
      ...extra
    });
    return p.toString();
  },

  /* 1. GPS 기반 반경 내 관광지 검색 (스탬프 체크인 핵심) */
  async nearbyStamps(lat, lng, radiusM = 300) {
    if (!this.KEY) return [];
    const url = `${this.BASE}/locationBasedList2?${this._params({
      mapX: lng, mapY: lat, radius: radiusM,
      contentTypeId: 12,   // 관광지
      numOfRows: 20, pageNo: 1
    })}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      const items = json?.response?.body?.items?.item ?? [];
      return (Array.isArray(items) ? items : [items]).map(i => ({
        id:       'kto_' + i.contentid,
        name:     i.title,
        name_en:  i.title,
        city:     i.addr1?.split(' ')[0] ?? '',
        region:   AREA_CODE_MAP[i.areacode] ?? '기타',
        cat:      '관광지',
        color:    REGION_COLOR[AREA_CODE_MAP[i.areacode]] ?? 'teal',
        emoji:    '📍',
        org:      'KTO TourAPI',
        lat:      parseFloat(i.mapy),
        lng:      parseFloat(i.mapx),
        image:    i.firstimage ?? '',
        addr:     i.addr1 ?? '',
        _fromAPI: true
      }));
    } catch { return []; }
  },

  /* 2. 지역별 관광지 목록 (지역 탭 확장용) */
  async areaStamps(areaCode, rows = 30) {
    if (!this.KEY) return [];
    const url = `${this.BASE}/areaBasedList2?${this._params({
      areaCode, contentTypeId: 12,
      numOfRows: rows, pageNo: 1, arrange: 'P'  // P=조회순
    })}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      const items = json?.response?.body?.items?.item ?? [];
      return (Array.isArray(items) ? items : [items]).map(i => ({
        id:       'kto_' + i.contentid,
        name:     i.title,
        name_en:  i.title,
        city:     i.addr1?.split(' ')[0] ?? '',
        region:   AREA_CODE_MAP[i.areacode] ?? '기타',
        cat:      '관광지',
        color:    REGION_COLOR[AREA_CODE_MAP[i.areacode]] ?? 'teal',
        emoji:    '📍',
        org:      'KTO TourAPI',
        lat:      parseFloat(i.mapy),
        lng:      parseFloat(i.mapx),
        image:    i.firstimage ?? '',
        addr:     i.addr1 ?? '',
        _fromAPI: true
      }));
    } catch { return []; }
  },

  /* 3. 관광지 상세 (이미지·설명 팝업용) */
  async detail(contentId) {
    if (!this.KEY) return null;
    const url = `${this.BASE}/detailCommon2?${this._params({
      contentId, defaultYN: 'Y', firstImageYN: 'Y', addrinfoYN: 'Y', overviewYN: 'Y'
    })}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json?.response?.body?.items?.item?.[0] ?? null;
    } catch { return null; }
  }
};

/* 지역코드 → 지역명 매핑 */
const AREA_CODE_MAP = {
  1:'서울', 2:'인천', 3:'대전', 4:'대구', 5:'광주',
  6:'부산', 7:'울산', 8:'세종', 31:'경기', 32:'강원',
  33:'충북', 34:'충남', 35:'전북', 36:'전남', 37:'경상', 38:'경남', 39:'제주'
};

/* 지역 → 스탬프 색상 */
const REGION_COLOR = {
  '서울':'red', '인천':'red', '경기':'red',
  '부산':'blue', '울산':'blue', '경남':'blue',
  '제주':'teal',
  '강원':'green',
  '경상':'purple', '대구':'purple', '경북':'purple',
  '전북':'green', '전남':'green', '광주':'green',
  '충북':'purple', '충남':'purple', '대전':'purple', '세종':'purple'
};
