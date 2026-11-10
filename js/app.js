/* CampusMate — 데모 SPA (로그인 없이 둘러보기, 인증·채팅·지도는 가짜 데이터) */
(() => {
  'use strict';
  const D = window.CM_DATA;

  /* ───────── Icons (lucide 스타일) ───────── */
  const ICONS = {
    home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    door: '<path d="M3 21h18"/><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M14 12h.01"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    chats: '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C9 3 12 8 12 8s3-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    id: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h4"/>',
    sparkle: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    walk: '<circle cx="13" cy="4" r="2"/><path d="m9 20 3-6 3 3v4M6 12l3-4 4 1 3 3h3M9 8l-1 5"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    thumb: '<path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  };
  const icon = (n, s = 20, extra = '') => `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${ICONS[n] || ''}</svg>`;

  /* ───────── Utils ───────── */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const won = (n) => (n === 0 ? '무료 나눔' : n.toLocaleString('ko-KR') + '원');
  const distLabel = (m) => (m >= 1000 ? (m / 1000).toFixed(1) + 'km' : m + 'm');
  const fmtDate = (s) => { const [y, m, d] = s.split('-').map(Number); return `${y !== 2026 ? `'${String(y).slice(2)}년 ` : ''}${m}월 ${d}일`; };
  const termLabel = (m) => (m <= 6 ? `단기 ${m}개월` : `${m}개월`);
  const hash = (s) => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const nowTime = () => { const d = new Date(); return `${d.getHours() < 12 ? '오전' : '오후'} ${((d.getHours() + 11) % 12) + 1}:${String(d.getMinutes()).padStart(2, '0')}`; };
  const gradeLabel = (g) => D.questions.find((q) => q.k === 'grade').opts[g];

  /* ───────── State (localStorage, 실패해도 동작) ───────── */
  const LS = 'campusmate-demo-v1';
  const defaults = () => ({
    verified: false, email: '', idVerified: false,
    survey: JSON.parse(JSON.stringify(D.mySurvey)), weights: { ...D.myWeights },
    interests: [], favRooms: [], favItems: [], blocked: [], reports: [],
    myRooms: [], myItems: [], myPosts: [], comments: {}, likedPosts: [], reviewed: [], trustBonus: 0, chats: {}, followClubs: [], applied: {}, going: [], clubQ: {}, stype: '신입생', scrapContests: [], teamApplied: {}, myTeams: [], myCard: null, proposals: [],
  });
  let S = load();
  function load() {
    try { const raw = localStorage.getItem(LS); if (raw) return Object.assign(defaults(), JSON.parse(raw)); } catch (e) { /* ignore */ }
    return defaults();
  }
  function save() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { /* ignore */ } }
  const toggleIn = (arr, v) => { const i = arr.indexOf(v); if (i >= 0) { arr.splice(i, 1); return false; } arr.push(v); return true; };

  /* ───────── Matching (양방향 가중치) ───────── */
  const W = [1, 3, 6];
  const IMP = ['낮음', '보통', '매우 중요'];
  function sim(q, a, b) {
    if (q.type === 'multi') { const n = a.filter((x) => b.includes(x)).length; return n >= 2 ? 1 : n === 1 ? 0.7 : 0.3; }
    if (q.type === 'select') return a === b ? 1 : 0.4;
    if (q.k === 'smoke') { if (a === b) return 1; if (a === 0 || b === 0) return Math.abs(a - b) === 2 ? 0 : 0.35; return 0.7; }
    return 1 - Math.abs(a - b) / (q.opts.length - 1);
  }
  const optText = (q, v) => (q.type === 'multi' ? (v.length ? v.join(', ') : '없음') : q.type === 'select' ? v : q.opts[v]);
  function reasonText(r) {
    const o = r.q.opts;
    switch (r.q.k) {
      case 'sleep': return r.s === 1 ? `수면 시간이 비슷해요 (둘 다 ${o[r.mine]} 취침)` : '수면 시간이 비슷해요';
      case 'wake': return '기상 시간이 비슷해 아침 루틴이 잘 맞아요';
      case 'smoke': return r.mine === 0 && r.theirs === 0 ? '둘 다 비흡연자예요' : '흡연 여부가 같아요';
      case 'drink': return '음주 빈도가 잘 맞아요';
      case 'clean': return '청결 기준이 잘 맞아요';
      case 'study': return '방에서 공부하는 시간이 비슷해요';
      case 'noise': return '소음에 대한 민감도가 비슷해요';
      case 'temp': return r.s === 1 ? `냉난방 선호가 같아요 (${o[r.mine]})` : '냉난방 선호가 비슷해요';
      case 'guest': return '방문객 허용 기준이 같아요';
      case 'hobby': return `취미가 겹쳐요: ${r.mine.filter((x) => r.theirs.includes(x)).join(', ')}`;
      case 'dept': return '같은 학과라 시간표 리듬이 비슷할 수 있어요';
      case 'grade': return '같은 학년이에요';
    }
    return '';
  }
  function match(c) {
    const me = S.survey, meW = S.weights;
    let n1 = 0, d1 = 0, n2 = 0, d2 = 0;
    const rows = D.questions.map((q) => {
      const s = sim(q, me[q.k], c.answers[q.k]);
      const w1 = W[meW[q.k] ?? 1], w2 = W[c.weights[q.k] ?? 1];
      n1 += w1 * s; d1 += w1; n2 += w2 * s; d2 += w2;
      return { q, s, w1, w2, mine: me[q.k], theirs: c.answers[q.k] };
    });
    const s1 = n1 / d1, s2 = n2 / d2;
    const score = Math.min(99, Math.round(100 * Math.sqrt(s1 * s2)));
    const primary = rows.filter((r) => r.s >= 0.75 && r.w1 >= 3 && !['hobby', 'dept', 'grade'].includes(r.q.k)).sort((a, b) => b.w1 * b.s - a.w1 * a.s);
    const extra = rows.filter((r) => ['hobby', 'dept', 'grade'].includes(r.q.k) && r.s >= 0.7 && (r.q.k !== 'grade' || r.s === 1));
    const reasons = [...primary, ...extra].map(reasonText);
    const cautions = rows.filter((r) => r.s < 0.5 && (r.w1 >= 3 || r.w2 >= 3) && r.q.type !== 'multi' && r.q.type !== 'select' && r.q.k !== 'grade')
      .map((r) => `${r.q.label} 차이가 있어요 — 나: ${optText(r.q, r.mine)} / 상대: ${optText(r.q, r.theirs)}`);
    return { score, s1: Math.round(s1 * 100), s2: Math.round(s2 * 100), rows, reasons, cautions };
  }
  const ranked = () => D.mates.filter((c) => c.gender === S.survey.gender && !S.blocked.includes(c.nick)).map((c) => ({ c, m: match(c) })).sort((a, b) => b.m.score - a.m.score);
  const isMutual = (c) => S.interests.includes(c.id) && c.likedMe;

  /* ───────── Data accessors ───────── */
  const allRooms = () => [...S.myRooms, ...D.rooms].filter((r) => !S.blocked.includes(r.author.nick));
  const allItems = () => [...S.myItems, ...D.items].filter((i) => !S.blocked.includes(i.seller.nick));
  const allPosts = () => [...S.myPosts, ...D.posts].filter((p) => !S.blocked.includes(p.author));
  const findRoom = (id) => [...S.myRooms, ...D.rooms].find((r) => r.id === id);
  const findItem = (id) => [...S.myItems, ...D.items].find((i) => i.id === id);
  const findPost = (id) => [...S.myPosts, ...D.posts].find((p) => p.id === id);
  const place = (id) => D.safePlaces.find((p) => p.id === id) || D.safePlaces[0];
  const myTrust = () => Math.min(99, D.me.baseTrust + (S.verified ? 6 : 0) + (S.idVerified ? 4 : 0) + (S.myRooms.length ? 3 : 0) + S.trustBonus);

  /* ───────── Small components ───────── */
  const avatar = (name, cls = '') => { const h = hash(name) % 360; return `<span class="avatar ${cls}" style="background:hsl(${h} 42% 40%)" aria-hidden="true">${esc(String(name).replace(/[^가-힣A-Za-z0-9]/g, '').charAt(0) || '익')}</span>`; };
  const ring = (v, size = 64, unit = "%", label = "호환도") => `<div class="ring ${v >= 85 ? '' : v >= 70 ? 'mid' : 'low'}" style="--v:${v};--s:${size}px" role="img" aria-label="${label} ${v}${unit === "%" ? "퍼센트" : "점"}"><span>${v}<small>${unit}</small></span></div>`;
  const BADGE = { school: ['b-school', 'shield', '학교 인증'], proof: ['b-proof', 'file', '거주 증빙'], id: ['b-id', 'id', '신원 인증'], review: ['b-review', 'clock', '증빙 검토 중'] };
  const badges = (arr) => `<div class="badges">${arr.map((b) => `<span class="badge ${BADGE[b][0]}">${icon(BADGE[b][1], 13)}${BADGE[b][2]}</span>`).join('')}</div>`;
  const trust = (v) => `<span class="trust" title="신뢰도 점수">신뢰도 ${v}<span class="trust-bar"><i style="width:${v}%"></i></span></span>`;
  const favBtn = (kind, id, on, label) => `<button class="fav-btn ${on ? 'on' : ''}" data-act="fav-${kind}" data-id="${id}" aria-pressed="${on}" aria-label="${on ? '찜 해제' : '찜하기'}: ${esc(label)}">${icon('heart', 20)}</button>`;
  const CAT_BG = { 전공책: '#E8EEFF', 생활용품: '#FFF1E6', 전자기기: '#E6F4FF', 가구: '#F3EDE4', '무료 나눔': '#E1F7EE' };
  const safetyBanner = (compact) => `<div class="safety" role="note">${icon('alert', 22)}<div><b>직접 확인 전 송금하지 마세요</b><p>가계약금·선입금을 먼저 요구하거나 외부 메신저로 유도하면 사기일 가능성이 높아요.</p>${compact ? '' : '<ul><li>방문해서 실물·집주인 동의 여부 확인</li><li>등기부등본으로 소유자·근저당 확인</li><li>계약은 집주인과 직접, 송금은 계약서 작성 후</li></ul>'}</div></div>`;

  function roomArt(seed) {
    const walls = ['#F3E9DC', '#E4ECF7', '#ECE6F5', '#E5F2EA', '#FBEAE4', '#EDEFF3', '#F6EEDB', '#E3EEF0'];
    const acc = ['#2E5BE6', '#2BC79A', '#FF6F5E', '#F5B942', '#7C5CE0', '#13264D', '#E2799B', '#3AA3C9'];
    const s = Math.abs(seed);
    const wall = walls[s % 8], a = acc[(s * 3 + 1) % 8], b = acc[(s + 5) % 8];
    const flip = s % 2 === 1;
    const g = flip ? 'transform="translate(320 0) scale(-1 1)"' : '';
    return `<svg class="art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="200" fill="${wall}"/>
      <rect y="152" width="320" height="48" fill="#D8C3A8"/><rect y="152" width="320" height="4" fill="#C8B191"/>
      <g ${g}>
        <rect x="196" y="28" width="96" height="74" rx="4" fill="#CFE6FA" stroke="#fff" stroke-width="6"/>
        <path d="M199 31h90v30c-30 10-60-6-90 8z" fill="#E6F2FC"/>
        <line x1="244" y1="28" x2="244" y2="102" stroke="#fff" stroke-width="4"/>
        <rect x="18" y="92" width="14" height="70" rx="4" fill="${b}"/>
        <rect x="28" y="122" width="134" height="38" rx="8" fill="${a}"/>
        <rect x="28" y="116" width="134" height="14" rx="7" fill="#fff" opacity=".9"/>
        <rect x="36" y="104" width="38" height="20" rx="8" fill="#fff"/>
        <rect x="196" y="120" width="86" height="7" rx="2" fill="#8B6B4A"/>
        <rect x="202" y="127" width="5" height="30" fill="#8B6B4A"/><rect x="271" y="127" width="5" height="30" fill="#8B6B4A"/>
        <rect x="222" y="100" width="34" height="20" rx="2" fill="#2B2F3A"/><rect x="236" y="120" width="6" height="2" fill="#2B2F3A"/>
        <circle cx="110" cy="58" r="16" fill="${b}" opacity=".25"/><rect x="104" y="40" width="12" height="20" rx="2" fill="${b}" opacity=".5"/>
        <rect x="292" y="132" width="16" height="26" rx="3" fill="#6FA46F"/><circle cx="300" cy="124" r="12" fill="#86C086"/>
      </g>
    </svg>`;
  }

  function mapBg() {
    return `<svg class="map-bg" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
      <rect width="600" height="400" fill="#EDF1E8"/>
      <path d="M0 362 C120 330 220 392 340 360 S520 320 600 346 V400 H0Z" fill="#CFE3F5"/>
      <g fill="#E1E7DA">
        <rect x="20" y="20" width="120" height="80" rx="8"/><rect x="20" y="130" width="120" height="76" rx="8"/><rect x="20" y="236" width="120" height="90" rx="8"/>
        <rect x="176" y="236" width="128" height="90" rx="8"/><rect x="340" y="236" width="94" height="90" rx="8"/><rect x="466" y="160" width="116" height="60" rx="8"/>
        <rect x="466" y="236" width="116" height="90" rx="8"/><rect x="466" y="20" width="116" height="110" rx="8"/>
      </g>
      <rect x="180" y="20" width="262" height="186" rx="14" fill="#D9F2E6" stroke="#A9DEC8" stroke-width="2"/>
      <g fill="#BFE6D4"><rect x="204" y="44" width="60" height="34" rx="5"/><rect x="290" y="40" width="74" height="44" rx="5"/><rect x="384" y="50" width="40" height="64" rx="5"/><rect x="206" y="120" width="54" height="56" rx="5"/><rect x="296" y="122" width="62" height="40" rx="5"/></g>
      <g stroke="#fff" stroke-linecap="round" fill="none">
        <path d="M0 220 H600" stroke-width="14"/><path d="M158 0 V400" stroke-width="10"/><path d="M452 0 V400" stroke-width="10"/>
        <path d="M0 116 H158" stroke-width="7"/><path d="M452 146 H600" stroke-width="7"/><path d="M318 220 V340" stroke-width="7"/><path d="M158 334 H452" stroke-width="6"/>
      </g>
      <path d="M0 220 H600" stroke="#F6D88B" stroke-width="2" stroke-dasharray="10 10"/>
      <circle cx="320" cy="212" r="7" fill="#13264D" stroke="#fff" stroke-width="3"/>
      <circle cx="540" cy="92" r="9" fill="#2E5BE6" stroke="#fff" stroke-width="3"/>
    </svg>
    <span style="position:absolute;left:52%;top:20%;transform:translateX(-50%);font-size:12px;font-weight:800;color:#0A6B52;z-index:1">${D.school.name}</span>
    <span style="position:absolute;left:53.3%;top:57.5%;font-size:11px;font-weight:800;color:#13264D;z-index:1;background:#fff;padding:1px 5px;border-radius:5px">정문</span>
    <span style="position:absolute;left:84%;top:26%;font-size:11px;font-weight:800;color:#2E5BE6;z-index:1;background:#fff;padding:1px 5px;border-radius:5px">한빛역</span>`;
  }

  /* ───────── Cards ───────── */
  function mateCard({ c, m }, compact) {
    const mutual = isMutual(c), sent = S.interests.includes(c.id);
    return `<article class="mate-card clickable" data-href="#roommate-${c.id}">
      <div class="mate-top">${avatar(c.nick)}
        <div class="who"><div class="mate-nick"><a href="#roommate-${c.id}">${esc(c.nick)}</a></div>
        <div class="meta">${esc(c.dept)} · ${gradeLabel(c.grade)}${mutual ? ' · <b style="color:var(--mint-800)">서로 관심</b>' : ''}</div></div>
        ${ring(m.score, 56)}</div>
      <ul class="reasons">${m.reasons.slice(0, compact ? 2 : 3).map((r) => `<li>${icon('check', 16)}${esc(r)}</li>`).join('')}</ul>
      <div class="card-actions">${mutual
        ? `<button class="btn btn-mint" data-act="mate-chat" data-id="${c.id}">${icon('chat', 18)}채팅하기</button>`
        : sent ? `<button class="btn btn-done" data-act="interest" data-id="${c.id}" aria-pressed="true">${icon('check', 18)}관심 보냄</button>`
          : `<button class="btn btn-primary" data-act="interest" data-id="${c.id}" aria-pressed="false">${icon('heart', 18)}관심 보내기</button>`}</div>
    </article>`;
  }

  function roomCard(r, row) {
    const fav = S.favRooms.includes(r.id);
    const proof = r.badges.includes('proof');
    return `<article class="room-card clickable ${row ? 'row' : ''}" data-href="#rooms-${r.id}" data-room="${r.id}">
      <div class="thumb">${roomArt(r.seed)}
        ${r.status === 'review' ? '<span class="tag badge b-review">검토 중</span>' : ''}
        ${favBtn('room', r.id, fav, r.title)}</div>
      <div class="room-body">
        <span class="room-kicker">${esc(r.deal)} · ${esc(r.type)}</span>
        <div class="price">월세 ${r.deposit}/${r.rent}</div>
        <h3><a href="#rooms-${r.id}">${esc(r.title)}</a></h3>
        <div class="meta">정문 도보 ${r.walk}분 · 관리비 ${r.maint}만${proof ? ` · <span class="vmark">${icon('shield', 14)}증빙</span>` : ''}</div>
      </div></article>`;
  }

  function itemCard(i) {
    const fav = S.favItems.includes(i.id);
    return `<article class="item-card clickable" data-href="#market-${i.id}">
      <div class="item-art" style="background:${CAT_BG[i.cat]}"><span aria-hidden="true">${i.emoji}</span>${favBtn('item', i.id, fav, i.title)}</div>
      <div class="item-body">
        <h3><a href="#market-${i.id}">${esc(i.title)}</a></h3>
        <div class="item-price ${i.price === 0 ? 'free' : ''}">${won(i.price)}</div>
        <span class="meta">${esc(place(i.place).name)} · ${i.time}</span>
      </div></article>`;
  }

  function postRow(p, showBoard = true) {
    const cc = p.comments.length + (S.comments[p.id] || []).length;
    const liked = S.likedPosts.includes(p.id);
    return `<a class="post-row" href="#post-${p.id}">
      ${showBoard ? `<span class="board-tag">${D.boards[p.board]}</span>` : ''}
      <h3>${esc(p.title)}</h3>
      <div class="post-meta"><span>${p.anon ? '익명' : esc(p.author)} · ${p.time}</span>
        <span class="${p.likes > 50 ? 'hot' : ''}">${icon('heart')}${p.likes + (liked ? 1 : 0)}</span><span>${icon('chat')}${cc}</span></div></a>`;
  }

  /* ───────── Pages ───────── */
  function pageHome() {
    const all = ranked();
    const top = all.slice(0, 3);
    const best = top[0];
    const rooms = allRooms().slice(0, 6);
    const items = [...allItems()].sort((a, b) => b.likes - a.likes).slice(0, 6);
    const posts = [...allPosts()].sort((a, b) => b.likes - a.likes).slice(0, 3);
    return `
    <section class="greet">
      ${avatar(D.me.nick)}
      <div class="greet-txt"><b>안녕하세요, ${D.me.nick}님</b><span>11월 10일 화요일 · ${D.school.name}</span></div>
      <a class="icon-btn round" href="#rooms" aria-label="방 검색하기">${icon('search', 20)}</a>
    </section>

    <div class="home-top">
      <div class="ht-left">
        <a class="hero-card" href="${best ? `#roommate-${best.c.id}` : '#roommate'}">
          <div class="hc-text">
            <span class="hc-kicker">오늘의 룸메이트</span>
            <h1>${best ? `나와 ${best.m.score}% 맞는<br>룸메이트가 있어요` : '내게 맞는<br>룸메이트 찾기'}</h1>
            <p>${best ? esc(best.m.reasons[0] || '') : '생활 습관 설문으로 시작해요'}</p>
            <div class="stack">${top.map((x) => avatar(x.c.nick, 'sm')).join('')}${all.length > 3 ? `<span class="more-dot">+${all.length - 3}</span>` : ''}</div>
          </div>
          <div class="hc-art" aria-hidden="true"><span class="o o2"></span><span class="o o1"></span><span class="o o3"></span><span class="o o4"></span></div>
        </a>
        ${S.verified ? '' : `<a class="notice" href="#verify">${icon('shield', 20)}<span><b>학교 인증</b>을 마치면 채팅·글쓰기를 할 수 있어요</span>${icon('right', 18)}</a>`}
      </div>
      <section class="section" aria-labelledby="h-go">
        <div class="section-head"><h2 id="h-go">무엇을 찾고 있나요?</h2></div>
        <div class="bento">
          <a class="tile t-peach tall" href="#roommate"><span class="tile-tag">생활 습관 매칭</span><b>룸메이트<br>찾기</b><span class="tile-sub">추천 ${all.length}명</span>
            ${best ? `<span class="tile-foot">${avatar(best.c.nick, 'sm')}<span><small>최고 호환도</small><br>${best.m.score}% · ${esc(best.c.nick)}</span></span>` : ''}</a>
          <a class="tile t-sky" href="#rooms"><span class="tile-tag">양도 · 룸쉐어</span><b>방 구하기</b><span class="tile-sub">매물 ${allRooms().length}개</span><span class="tile-ic">${icon('door', 22)}</span></a>
          <a class="tile t-pink" href="#market"><span class="tile-tag">전공책 · 나눔</span><b>중고거래</b><span class="tile-sub">${allItems().length}개 거래 중</span><span class="tile-ic">${icon('bag', 22)}</span></a>
          <a class="tile t-lav" href="#clubs"><span class="tile-tag">신입생 · 복학생</span><b>동아리·행사</b><span class="tile-sub">모집 중 ${D.clubs.filter((c) => c.recruit.status !== 'closed').length}곳</span><span class="tile-ic">${icon('calendar', 22)}</span></a>
          <a class="tile t-mint" href="#community"><span class="tile-tag">HOT</span><b>커뮤니티</b><span class="tile-sub ellip">${esc(posts[0] ? posts[0].title : '')}</span><span class="tile-ic">${icon('chats', 22)}</span></a>
          <a class="tile t-yellow wide" href="#contests"><span class="tile-ic">${icon('trophy', 20)}</span><span style="flex:1;min-width:0"><b>프로젝트 · 공모전</b><span class="tile-sub ellip">접수 중 공모전 ${D.contests.filter((k) => dday(k.deadline) >= 0).length}개 · 팀원 모집 ${allTeams().filter((t) => !t.closed).length}건</span></span>${icon('right', 20)}</a>
        </div>
      </section>
    </div>

    <section class="section" aria-labelledby="h-ev">
      <div class="section-head"><h2 id="h-ev">이번 주 캠퍼스 행사</h2><a class="more" href="#events">행사 캘린더${icon('right', 16)}</a></div>
      ${homeEvents()}
    </section>

    <section class="section" aria-labelledby="h-room">
      <div class="section-head"><h2 id="h-room">새로 올라온 방</h2><a class="more" href="#rooms">전체 보기${icon('right', 16)}</a></div>
      <div class="hscroll">${rooms.map((r) => roomCard(r)).join('')}</div>
    </section>

    <section class="section" aria-labelledby="h-market">
      <div class="section-head"><h2 id="h-market">인기 중고거래</h2><a class="more" href="#market">전체 보기${icon('right', 16)}</a></div>
      <div class="hscroll small">${items.map(itemCard).join('')}</div>
    </section>

    <section class="section" aria-labelledby="h-post">
      <div class="section-head"><h2 id="h-post">지금 인기 있는 글</h2><a class="more" href="#community">전체 보기${icon('right', 16)}</a></div>
      <div class="card post-list">${posts.map((p) => postRow(p)).join('')}</div>
    </section>

    <section class="section trust-strip" aria-labelledby="h-trust">
      <h2 id="h-trust">인증된 학생만, 안전하게</h2>
      <div class="trust-row">
        <div>${icon('mail', 20)}<span>학교 이메일 인증</span></div>
        <div>${icon('file', 20)}<span>거주 증빙 확인</span></div>
        <div>${icon('flag', 20)}<span>신고 24시간 검토</span></div>
        <div>${icon('pin', 20)}<span>교내 안전 거래</span></div>
      </div>
    </section>
    ${footer()}`;
  }

  function footer() {
    return `<footer class="footer"><b>CampusMate · 데모 프로토타입</b><span>${D.school.unofficial}</span><span>모든 학교·인물·매물·후기는 가상의 데이터예요. 인증·채팅·지도는 실제로 동작하지 않아요.</span></footer>`;
  }

  /* ── 룸메이트 ── */
  function pageRoommate() {
    const list = ranked();
    const mutualCount = list.filter((x) => isMutual(x.c)).length;
    const s = S.survey;
    const q = (k) => D.questions.find((x) => x.k === k);
    return `
    <div class="page-head"><div><h1>룸메이트 매칭</h1><p>생활 습관 설문과 항목별 중요도로 계산한 <b>양방향</b> 호환도예요.</p></div>
      <a class="btn btn-outline" href="#roommate-survey">${icon('edit', 18)}설문 수정</a></div>
    <div class="card pad" style="display:grid;gap:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><b>내 생활 습관 요약</b><span class="small muted">${s.gender === '여' ? '여학생' : '남학생'} 기숙사 · 같은 성별끼리만 매칭돼요</span></div>
      <div class="chip-row">
        <span class="chip">${icon('moon', 14)}${q('sleep').opts[s.sleep]} 취침</span><span class="chip">${q('wake').opts[s.wake]} 기상</span>
        <span class="chip">${q('smoke').opts[s.smoke]}</span><span class="chip">청결 ${q('clean').opts[s.clean]}</span><span class="chip">소음 ${q('noise').opts[s.noise]}</span>
        <span class="chip">방문객 ${q('guest').opts[s.guest]}</span>
      </div>
      <div class="small muted">매우 중요: ${D.questions.filter((x) => S.weights[x.k] === 2).map((x) => x.label).join(', ') || '없음'}</div>
    </div>
    <div class="info-box" style="margin-top:12px">${icon('lock', 18)}<span>처음엔 닉네임·학과·생활 습관만 보여요. <b>서로 관심</b>을 누르면 실명·사진·SNS가 공개되고 채팅이 열려요.${mutualCount ? ` 현재 <b>${mutualCount}명</b>과 서로 관심 상태예요.` : ''}</span></div>
    <div class="section-head" style="margin-top:24px"><h2>추천 룸메이트 ${list.length}명</h2><span class="small muted">호환도 높은 순</span></div>
    ${list.length ? `<div class="mate-grid">${list.map((x) => mateCard(x)).join('')}</div>`
      : `<div class="card empty">${icon('users', 40)}<b>추천할 룸메이트가 없어요</b>차단을 해제하거나 설문을 수정해 보세요.</div>`}
    ${footer()}`;
  }

  function pageSurvey() {
    const s = S.survey, wt = S.weights;
    const qs = D.questions;
    const field = (q, i) => {
      let opts;
      if (q.type === 'multi') opts = `<div class="opts">${q.opts.map((o) => `<label class="opt"><input type="checkbox" name="${q.k}" value="${esc(o)}" ${s[q.k].includes(o) ? 'checked' : ''}><span>${esc(o)}</span></label>`).join('')}</div>`;
      else if (q.type === 'select') opts = `<select class="select" name="${q.k}" aria-label="${q.label}">${q.opts.map((o) => `<option ${s[q.k] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
      else opts = `<div class="opts" role="radiogroup" aria-label="${q.label}">${q.opts.map((o, j) => `<label class="opt"><input type="radio" name="${q.k}" value="${j}" ${s[q.k] === j ? 'checked' : ''}><span>${esc(o)}</span></label>`).join('')}</div>`;
      return `<fieldset class="card q-card">
        <legend><span class="q-num">Q${i + 2}</span>${q.label}</legend>
        ${q.help ? `<p class="help">${q.help}</p>` : ''}${opts}
        <div class="imp-row"><span>${icon('star', 15)}이 항목의 중요도</span>
          <div class="seg imp" role="radiogroup" aria-label="${q.label} 중요도">${IMP.map((t, j) => `<label><input type="radio" name="w_${q.k}" value="${j}" ${wt[q.k] === j ? 'checked' : ''}><span class="lv${j}">${t}</span></label>`).join('')}</div></div>
      </fieldset>`;
    };
    return `<div class="survey-wrap">
      <a class="back-link" href="#roommate">${icon('left', 18)}매칭 결과로</a>
      <div class="page-head"><div><h1>생활 습관 설문</h1><p>MBTI보다 중요한 건 같이 사는 리듬이에요. 약 2분 걸려요.</p></div></div>
      <div class="info-box mint" style="margin-bottom:14px">${icon('sparkle', 18)}<span>“매우 중요”로 고른 항목은 호환도 계산에 6배, “보통”은 3배 반영돼요. 상대의 중요도도 함께 반영해 <b>양방향</b>으로 계산해요.</span></div>
      <form data-form="survey" class="grid" style="gap:12px">
        <fieldset class="card q-card"><legend><span class="q-num">Q1</span>성별 (기숙사 배정 기준)</legend><p class="help">기숙사는 같은 성별끼리만 배정되므로 같은 성별 학생만 추천돼요.</p>
          <div class="opts">${['여', '남'].map((g) => `<label class="opt"><input type="radio" name="gender" value="${g}" ${s.gender === g ? 'checked' : ''}><span>${g}학생</span></label>`).join('')}</div></fieldset>
        ${qs.map(field).join('')}
        <div class="sticky-cta"><div class="txt"><b>총 ${qs.length + 1}개 문항</b>저장하면 호환도가 바로 다시 계산돼요</div><button class="btn btn-primary btn-lg" type="submit">저장하고 결과 보기</button></div>
      </form></div>`;
  }

  function pageMate(id) {
    const c = D.mates.find((x) => x.id === id);
    if (!c) return notFound();
    const m = match(c);
    const mutual = isMutual(c), sent = S.interests.includes(c.id);
    return `<a class="back-link" href="#roommate">${icon('left', 18)}룸메이트 목록</a>
    <div class="detail-grid">
      <div class="grid" style="gap:16px">
        <section class="card score-hero">${ring(m.score, 92)}
          <div style="min-width:0"><div class="mate-nick" style="font-size:20px">${esc(c.nick)} <span class="badge b-school">${icon('shield', 13)}학교 인증</span></div>
          <div class="meta">${esc(c.dept)} · ${gradeLabel(c.grade)} · ${esc(c.dorm)} · ${c.term}</div>
          <div class="score-split"><span>내 기준 만족도 <b>${m.s1}%</b></span><span>상대 기준 만족도 <b>${m.s2}%</b></span></div></div>
        </section>
        <section class="card pad"><h2 class="block-title">${icon('sparkle', 18)}이래서 잘 맞아요</h2>
          <ul class="reasons">${m.reasons.map((r) => `<li>${icon('check')}${esc(r)}</li>`).join('') || '<li class="muted">뚜렷하게 겹치는 항목이 적어요.</li>'}</ul>
          ${m.cautions.length ? `<div class="divider"></div><h3 class="block-title" style="font-size:15px">미리 이야기해 보면 좋아요</h3><ul class="reasons">${m.cautions.map((r) => `<li class="caution">${icon('alert')}${esc(r)}</li>`).join('')}</ul>` : ''}
        </section>
        <section class="card pad"><h2 class="block-title">자기소개</h2><p class="prose">${esc(c.intro)}</p></section>
        <section class="card pad"><h2 class="block-title">항목별 비교</h2>
          <div class="cmp-table">${m.rows.map((r) => `<div class="cmp-row">
            <div class="cmp-head"><b>${r.q.label}</b><span class="small muted">내 중요도 ${IMP[W.indexOf(r.w1)]} · ${Math.round(r.s * 100)}%</span></div>
            <div class="bar"><i class="${r.s >= .75 ? '' : r.s >= .5 ? 'mid' : 'low'}" style="width:${Math.max(6, r.s * 100)}%"></i></div>
            <div class="cmp-vals"><div><small>나</small>${esc(optText(r.q, r.mine))}</div><div><small>상대</small>${esc(optText(r.q, r.theirs))}</div></div></div>`).join('')}</div>
        </section>
      </div>
      <aside class="detail-aside grid" style="gap:16px">
        <section class="card pad">
          <h2 class="block-title">${mutual ? icon('check', 18) : icon('lock', 18)}${mutual ? '전체 프로필 공개됨' : '상세 프로필'}</h2>
          ${mutual ? `<div class="author-card"><span class="avatar lg" style="background:hsl(${c.real.photoHue} 45% 42%)">${esc(c.real.name[0])}</span><div class="who"><b>${esc(c.real.name)}</b><div class="meta">${esc(c.real.insta)}</div><div class="meta">신뢰도 ${c.trust}</div></div></div>`
            : `<div class="locked card" style="border-style:dashed;box-shadow:none"><div class="blur author-card" style="padding:16px"><span class="avatar lg" style="background:#8a9bb8">김</span><div class="who"><b>김○○</b><div class="meta">@insta_hidden</div><div class="meta">010-0000-0000</div></div></div>
              <div class="lock-over"><div>${icon('lock', 22)}<b>서로 관심 시 공개</b><span>실명 · 사진 · SNS</span></div></div></div>`}
          <div style="display:grid;gap:8px;margin-top:14px">
            ${mutual ? `<button class="btn btn-mint btn-lg btn-block" data-act="mate-chat" data-id="${c.id}">${icon('chat', 18)}채팅하기</button>`
              : `<button class="btn ${sent ? 'btn-done' : 'btn-primary'} btn-lg btn-block" data-act="interest" data-id="${c.id}" aria-pressed="${sent}">${icon(sent ? 'check' : 'heart', 18)}${sent ? '관심 보냄 · 상대 응답 대기 중' : '관심 보내기'}</button>
                 <button class="btn btn-outline btn-block" disabled>${icon('lock', 16)}채팅은 서로 관심 후 가능</button>`}
          </div>
          <div class="report-row"><button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="룸메이트 프로필 · ${esc(c.nick)}">${icon('flag', 15)}신고하기</button><button class="btn btn-sm btn-ghost" data-act="block" data-key="${esc(c.nick)}">${icon('ban', 15)}차단하기</button></div>
        </section>
        <div class="info-box amber">${icon('alert', 18)}<span>첫 만남은 학생회관·도서관처럼 사람이 많은 교내에서 하고, 개인 연락처는 충분히 대화한 뒤 공유하세요.</span></div>
      </aside>
    </div>
    <div class="mobile-cta">
      ${ring(m.score, 46)}
      <div class="mc-price"><b>${esc(c.nick)}</b><span>${mutual ? '서로 관심 · 채팅 가능' : sent ? '상대 응답 대기 중' : '관심을 보내면 상대에게 알림이 가요'}</span></div>
      ${mutual ? `<button class="btn btn-mint" data-act="mate-chat" data-id="${c.id}">${icon('chat', 18)}채팅하기</button>`
        : `<button class="btn ${sent ? 'btn-done' : 'btn-primary'}" data-act="interest" data-id="${c.id}" aria-pressed="${sent}">${icon(sent ? 'check' : 'heart', 18)}${sent ? '관심 보냄' : '관심 보내기'}</button>`}
    </div>`;
  }

  /* ── 방 찾기 (지도 + 리스트, 필터 pill) ── */
  ICONS.down = '<path d="m6 9 6 6 6-6"/>';
  const RF_DEFAULT = () => ({ rent: 80, deposit: 'all', maint: 'all', from: '', term: 'all', dist: 'all', gender: 'all', smoke: 'all', deal: 'all', options: [] });
  const RF = Object.assign(RF_DEFAULT(), { sort: 'rec', q: '' });
  let activeRoom = null, rfOpen = null;
  const OPTIONS = ['에어컨', '세탁기', '냉장고', '침대', '책상', '인덕션', '와이파이', '엘리베이터', '주차'];
  const GROUP_TITLE = { deal: '거래 유형', price: '가격', term: '계약 기간', more: '추가필터' };
  function filteredRooms() {
    let list = allRooms().filter((r) => {
      if (RF.rent < 80 && r.rent > RF.rent) return false;
      if (RF.deposit !== 'all' && r.deposit > +RF.deposit) return false;
      if (RF.maint !== 'all' && r.maint > +RF.maint) return false;
      if (RF.from && r.avail > RF.from) return false;
      if (RF.term === 'short' && r.months > 6) return false;
      if (RF.term === 'mid' && (r.months <= 6 || r.months > 12)) return false;
      if (RF.term === 'long' && r.months < 12) return false;
      if (RF.dist !== 'all' && r.dist > +RF.dist) return false;
      if (RF.gender === '여' && r.gender === '남성') return false;
      if (RF.gender === '남' && r.gender === '여성') return false;
      if (RF.smoke === 'no' && r.smoke !== '비흡연') return false;
      if (RF.deal !== 'all' && r.deal !== RF.deal) return false;
      if (RF.options.some((o) => !r.options.includes(o))) return false;
      if (RF.q && !(r.title + r.area + r.type).includes(RF.q)) return false;
      return true;
    });
    const sorters = { rent: (a, b) => a.rent - b.rent, dist: (a, b) => a.dist - b.dist, rec: (a, b) => b.badges.length * 10 + b.likes / 5 - (a.badges.length * 10 + a.likes / 5) };
    if (sorters[RF.sort]) list = list.sort(sorters[RF.sort]);
    return list;
  }
  const radioChips = (name, opts, cur) => `<div class="opts">${opts.map(([v, t]) => `<label class="opt sm"><input type="radio" name="${name}" value="${v}" ${String(cur) === String(v) ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div>`;
  function pillState() {
    const more = [RF.dist !== 'all', RF.gender !== 'all', RF.smoke !== 'all', RF.maint !== 'all', RF.options.length > 0].filter(Boolean).length;
    const priceOn = RF.rent < 80 || RF.deposit !== 'all';
    return [
      ['deal', RF.deal === 'all' ? '거래 유형' : RF.deal, RF.deal !== 'all'],
      ['price', priceOn ? [RF.rent < 80 ? `월세 ~${RF.rent}만` : '', RF.deposit !== 'all' ? `보증금 ~${RF.deposit}만` : ''].filter(Boolean).join(' · ') : '가격', priceOn],
      ['term', RF.term !== 'all' ? { short: '6개월 이하', mid: '7~12개월', long: '12개월 이상' }[RF.term] : RF.from ? `${fmtDate(RF.from)}까지 입주` : '계약 기간', RF.term !== 'all' || !!RF.from],
      ['more', more ? `추가필터 ${more}` : '추가필터', more > 0],
    ];
  }
  function filterBar() {
    return pillState().map(([g, label, on]) => `<button type="button" class="fpill ${on ? 'on' : ''} ${rfOpen === g ? 'open' : ''}" data-act="rf-pop" data-g="${g}" aria-expanded="${rfOpen === g}" aria-controls="rf">${esc(label)}${icon('down', 16)}</button>`).join('')
      + `<button type="button" class="fpill icon" data-act="rf-reset" aria-label="필터 초기화">${icon('refresh', 16)}</button>`;
  }
  function filtersPanel() {
    const sel = (id, name, opts, cur) => `<select class="select" id="${id}" name="${name}">${opts.map(([v, t]) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${t}</option>`).join('')}</select>`;
    return `<form class="filter-pop" id="rf" data-group="${rfOpen || ''}" aria-label="방 검색 필터" onsubmit="return false">
      <div class="fp-head"><b id="fp-title">${GROUP_TITLE[rfOpen] || '필터'}</b><button type="button" class="icon-btn" data-act="rf-close" aria-label="필터 닫기">${icon('x')}</button></div>
      <div class="fg" data-g="deal">${radioChips('deal', [['all', '전체'], ['양도', '자취방 양도'], ['룸쉐어', '룸쉐어']], RF.deal)}</div>
      <div class="fg" data-g="price">
        <div class="field"><div class="range-head"><label class="field-label" for="rf-rent">월세</label><b id="rent-val">${RF.rent >= 80 ? '제한 없음' : `${RF.rent}만원 이하`}</b></div>
          <input id="rf-rent" type="range" name="rent" min="20" max="80" step="1" value="${RF.rent}"></div>
        <div class="field"><label class="field-label" for="rf-dep">보증금</label>${sel('rf-dep', 'deposit', [['all', '전체'], [100, '100만 이하'], [300, '300만 이하'], [500, '500만 이하'], [1000, '1000만 이하']], RF.deposit)}</div>
      </div>
      <div class="fg" data-g="term">
        <div class="field"><span class="field-label">계약 기간</span>${radioChips('term', [['all', '전체'], ['short', '6개월 이하'], ['mid', '7~12개월'], ['long', '12개월 이상']], RF.term)}</div>
        <div class="field"><label class="field-label" for="rf-from">입주 희망일</label><input class="input" id="rf-from" type="date" name="from" value="${RF.from}" min="2026-11-10"><span class="hint">이 날짜까지 입주 가능한 방만 보여요</span></div>
      </div>
      <div class="fg" data-g="more">
        <div class="field"><span class="field-label">정문까지 거리</span>${radioChips('dist', [['all', '전체'], [500, '500m'], [1000, '1km'], [2000, '2km']], RF.dist)}</div>
        <div class="field"><span class="field-label">입주 가능 성별</span>${radioChips('gender', [['all', '전체'], ['여', '여성 가능'], ['남', '남성 가능']], RF.gender)}</div>
        <div class="field"><span class="field-label">흡연</span>${radioChips('smoke', [['all', '전체'], ['no', '비흡연 매물만']], RF.smoke)}</div>
        <div class="field"><label class="field-label" for="rf-maint">관리비</label>${sel('rf-maint', 'maint', [['all', '전체'], [5, '5만 이하'], [7, '7만 이하'], [10, '10만 이하']], RF.maint)}</div>
        <div class="field"><span class="field-label">옵션 (모두 포함)</span><div class="opts">${OPTIONS.map((o) => `<label class="opt sm"><input type="checkbox" name="options" value="${o}" ${RF.options.includes(o) ? 'checked' : ''}><span>${o}</span></label>`).join('')}</div></div>
      </div>
      <div class="fp-foot"><button type="button" class="btn btn-ghost" data-act="rf-reset">초기화</button><button type="button" class="btn btn-primary" data-act="rf-close">매물 <span id="fp-count">${filteredRooms().length}</span>개 보기</button></div>
    </form>`;
  }
  function pageRooms() {
    rfOpen = null;
    return `<div class="rooms-page">
      <div class="rooms-top">
        <label class="search-box">${icon('search', 18)}<input id="room-q" type="search" placeholder="동네, 방 종류 검색" value="${esc(RF.q)}" aria-label="매물 검색"></label>
        <div class="filter-bar" id="filter-bar" role="toolbar" aria-label="필터">${filterBar()}</div>
        <a class="btn btn-primary btn-sm add-room" href="#rooms-new">${icon('plus', 16)}방 등록</a>
      </div>
      ${filtersPanel()}
      <div class="rooms-split">
        <div class="rooms-mapcol"><div class="map-wrap" id="room-map" aria-label="매물 지도 (데모)"></div></div>
        <section class="rooms-listcol" aria-label="매물 목록">
          <div class="list-head"><span class="count" id="room-count"></span>
            <select class="sort-select" id="room-sort" aria-label="정렬">${[['rec', '추천순'], ['rent', '월세 낮은 순'], ['dist', '가까운 순'], ['new', '최신순']].map(([v, t]) => `<option value="${v}" ${RF.sort === v ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
          <div class="safe-line" role="note">${icon('alert', 16)}<span><b>직접 확인 전 송금하지 마세요.</b> 선입금을 요구하면 사기일 수 있어요.</span></div>
          <div class="room-list" id="room-list"></div>
          <a class="btn btn-outline btn-block mobile-only" href="#rooms-new">${icon('plus', 18)}내 방 등록하기</a>
        </section>
      </div></div>`;
  }
  function updateRooms() {
    const list = filteredRooms();
    const mapEl = $('#room-map'), listEl = $('#room-list'), cnt = $('#room-count');
    if (!mapEl) return;
    cnt.innerHTML = `매물 <b>${list.length}</b>개`;
    const fc = $('#fp-count'); if (fc) fc.textContent = list.length;
    const fb = $('#filter-bar'); if (fb) fb.innerHTML = filterBar();
    renderRoomMap(mapEl, list);
    listEl.innerHTML = list.length ? list.map((r) => roomCard(r, true)).join('')
      : `<div class="empty">${icon('search', 40)}<b>조건에 맞는 방이 없어요</b>필터를 조금 넓혀 보세요.<div style="margin-top:12px"><button class="btn btn-outline" data-act="rf-reset">필터 초기화</button></div></div>`;
    listEl.insertAdjacentHTML('beforeend', extCard('blooming'));
    $$('.room-card', listEl).forEach((el) => el.classList.toggle('active', el.dataset.room === activeRoom));
  }
  function readFilters() {
    const f = $('#rf'); if (!f) return;
    const fd = new FormData(f);
    Object.assign(RF, { rent: +fd.get('rent'), deposit: fd.get('deposit'), maint: fd.get('maint'), from: fd.get('from') || '', term: fd.get('term'), dist: fd.get('dist'), gender: fd.get('gender'), smoke: fd.get('smoke'), deal: fd.get('deal'), options: fd.getAll('options') });
    const rv = $('#rent-val'); if (rv) rv.textContent = RF.rent >= 80 ? '제한 없음' : `${RF.rent}만원 이하`;
  }
  function openFilter(g) {
    const rf = $('#rf'); if (!rf) return;
    if (rfOpen === g) return closeFilter();
    rfOpen = g; rf.dataset.group = g; rf.classList.add('open');
    $('#fp-title').textContent = GROUP_TITLE[g];
    $('#filter-bar').innerHTML = filterBar();
    const page = $('.rooms-page'), pill = $(`.fpill[data-g="${g}"]`), bar = $('#filter-bar');
    if (innerWidth >= 768 && pill) {
      const pr = page.getBoundingClientRect();
      rf.style.left = Math.max(0, Math.min(pill.getBoundingClientRect().left - pr.left, page.clientWidth - 380)) + 'px';
      rf.style.top = (bar.getBoundingClientRect().bottom - pr.top + 8) + 'px';
    } else {
      rf.style.left = ''; rf.style.top = '';
      if (!$('.scrim')) { const sc = document.createElement('div'); sc.className = 'scrim'; sc.dataset.act = 'rf-close'; document.body.appendChild(sc); document.body.style.overflow = 'hidden'; }
    }
    const first = rf.querySelector(`.fg[data-g="${g}"] input, .fg[data-g="${g}"] select`); if (first) first.focus({ preventScroll: true });
  }
  function closeFilter() {
    rfOpen = null;
    const rf = $('#rf'); if (rf) { rf.classList.remove('open'); rf.dataset.group = ''; }
    $$('.scrim').forEach((s) => s.remove()); document.body.style.overflow = '';
    const fb = $('#filter-bar'); if (fb) fb.innerHTML = filterBar();
  }

  function pageRoom(id) {
    const r = findRoom(id);
    if (!r) return notFound();
    const fav = S.favRooms.includes(r.id);
    const seeds = Array.from({ length: 4 }, (_, i) => r.seed + i * 3);
    return `<a class="back-link" href="#rooms">${icon('left', 18)}방 목록</a>
    <div class="detail-grid">
      <div class="grid" style="gap:16px">
        <div class="gallery"><div class="main" id="gal-main">${roomArt(r.seed)}<span class="photo-count">${icon('camera', 13)}1 / ${r.photos}</span></div>
          <div class="thumbs">${seeds.map((s, i) => `<button class="${i === 0 ? 'active' : ''}" data-act="gal" data-seed="${s}" data-i="${i + 1}" data-total="${r.photos}" aria-label="사진 ${i + 1} 보기">${roomArt(s)}</button>`).join('')}</div></div>
        <section>
          ${badges(r.status === 'review' ? ['school', 'review'] : r.badges)}
          <h1 class="detail-title">${esc(r.title)}</h1>
          <div class="meta">${icon('pin')}${esc(r.area)} · ${esc(r.type)} ${esc(r.size)} · ${esc(r.floor)} · ${r.posted} · 조회 ${r.views}</div>
        </section>
        ${safetyBanner(false)}
        <section class="card pad"><h2 class="block-title">비용</h2>
          <div class="kv three"><div><small>보증금</small><b>${r.deposit}만</b></div><div><small>월세</small><b>${r.rent}만</b></div><div><small>관리비</small><b>${r.maint}만</b></div></div>
          <p class="small muted" style="margin-top:10px">관리비 포함: ${esc(r.maintIncl)}${r.deal === '룸쉐어' ? ' · 표시 금액은 1인 부담 기준' : ''}</p></section>
        <section class="card pad"><h2 class="block-title">계약 정보</h2>
          <div class="kv"><div><small>입주 가능일</small><b>${fmtDate(r.avail)}</b></div><div><small>계약 기간</small><b>${termLabel(r.months)} (~${r.until})</b></div><div><small>입주 가능 성별</small><b>${r.gender}</b></div><div><small>흡연</small><b>${r.smoke}</b></div></div></section>
        <section class="card pad"><h2 class="block-title">옵션</h2>
          <div class="opt-grid">${OPTIONS.map((o) => `<div class="${r.options.includes(o) ? 'on' : 'off'}">${icon(r.options.includes(o) ? 'check' : 'x', 18)}${o}<span class="sr-only">${r.options.includes(o) ? '있음' : '없음'}</span></div>`).join('')}</div></section>
        ${r.share ? `<section class="card pad"><h2 class="block-title">${icon('users', 18)}기존 룸메이트 · 생활 규칙</h2><p class="small muted" style="margin-bottom:6px">현재 거주: ${esc(r.share.current)}</p>
          <ul class="rules">${r.share.rules.map((x) => `<li>${icon('check')}${esc(x)}</li>`).join('')}</ul>
          <a class="btn btn-outline btn-sm" style="margin-top:8px" href="#roommate-survey">내 생활 습관과 비교해 보기</a></section>` : ''}
        <section class="card pad"><h2 class="block-title">방 설명</h2><p class="prose">${esc(r.desc)}</p></section>
        <section class="card pad"><h2 class="block-title">위치</h2>
          <div class="map-wrap mini" id="room-mini" aria-label="매물 위치 지도">${mapBg()}<span class="pin active" style="left:${(r.x / 6).toFixed(1)}%;top:${(r.y / 4).toFixed(1)}%">${r.rent}만</span></div>
          <div class="meta" style="margin-top:10px">${icon('walk')}정문까지 ${distLabel(r.dist)} · 도보 ${r.walk}분${r.bus ? ` · 버스 ${r.bus}분` : ''} · 정확한 주소는 문의 후 공개돼요</div></section>
      </div>
      <aside class="detail-aside grid" style="gap:16px">
        <section class="card pad desk-only">
          <div class="price" style="font-size:22px">월 ${r.rent}만 <span>/ 보증금 ${r.deposit}만 · 관리비 ${r.maint}만</span></div>
          <div style="display:flex;gap:8px;margin-top:14px">
            <button class="btn btn-outline fav-btn ${fav ? 'on' : ''}" data-act="fav-room" data-id="${r.id}" aria-pressed="${fav}">${icon('heart', 18)}${fav ? '찜 완료' : '찜하기'}</button>
            <button class="btn btn-primary" style="flex:1" data-act="room-chat" data-id="${r.id}">${icon('chat', 18)}작성자에게 문의하기</button></div>
        </section>
        <section class="card pad">
          <h2 class="block-title">작성자</h2>
          <div class="author-card">${avatar(r.author.nick)}<div class="who"><b>${esc(r.author.nick)}</b><div class="meta">${esc(r.author.dept)} · 거래 ${r.author.deals}회</div></div></div>
          <div class="trust-meter"><div class="tm-head"><span>신뢰도 점수</span><span>${r.author.trust}점</span></div><div class="bar"><i style="width:${r.author.trust}%"></i></div></div>
          <div style="margin-top:12px">${badges(r.badges)}</div>
          <div class="report-row"><button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="방 매물 · ${esc(r.title)}" data-fake="1">${icon('flag', 15)}허위 매물 신고</button><button class="btn btn-sm btn-ghost" data-act="block" data-key="${esc(r.author.nick)}">${icon('ban', 15)}작성자 차단</button></div>
        </section>
        <div class="info-box">${icon('shield', 18)}<span>이 매물은 <b>${r.badges.includes('proof') ? '거주 증빙을 확인한' : '학교 인증만 완료한'}</b> 학생이 올렸어요. ${r.badges.includes('proof') ? '' : '방문해서 꼭 실물을 확인하세요.'}</span></div>
      </aside>
    </div>
    <div class="mobile-cta">
      <button class="fav-btn ${fav ? 'on' : ''}" data-act="fav-room" data-id="${r.id}" aria-pressed="${fav}" aria-label="${fav ? '찜 해제' : '찜하기'}">${icon('heart', 22)}</button>
      <div class="mc-price"><b>월 ${r.rent}만 · 보증금 ${r.deposit}만</b><span>관리비 ${r.maint}만 · ${fmtDate(r.avail)} 입주</span></div>
      <button class="btn btn-primary" data-act="room-chat" data-id="${r.id}">${icon('chat', 18)}문의하기</button>
    </div>`;
  }

  function gatePanel(what) {
    return `<div class="card pad" style="text-align:center;max-width:520px;margin:20px auto;padding:32px 22px">
      <div class="verify-hero"><div class="vi">${icon('lock', 30)}</div><h1>학교 인증이 필요해요</h1><p>${what}은(는) ${D.school.name} 이메일 인증을 마친 학생만 할 수 있어요. 둘러보기는 인증 없이도 가능해요.</p></div>
      <a class="btn btn-primary btn-lg btn-block" href="#verify">${icon('mail', 18)}학교 이메일로 인증하기</a></div>`;
  }

  function pageRoomNew() {
    if (!S.verified) return `<a class="back-link" href="#rooms">${icon('left', 18)}방 목록</a>` + gatePanel('방 등록');
    return `<div class="survey-wrap">
      <a class="back-link" href="#rooms">${icon('left', 18)}방 목록</a>
      <div class="page-head"><div><h1>방 등록하기</h1><p>거주 증빙을 올리면 <b>거주 증빙</b> 배지가 붙어 문의가 평균 2.4배 많아요.</p></div></div>
      ${safetyBanner(true)}
      <form data-form="room" class="grid" style="gap:14px;margin-top:14px" novalidate>
        <section class="card form-section"><h2><span class="num">1</span>기본 정보</h2>
          <div class="field"><span class="field-label">거래 유형</span>${radioChips('deal', [['양도', '자취방 양도'], ['룸쉐어', '룸쉐어 (방 일부)']], '양도')}</div>
          <div class="field"><span class="field-label">방 종류</span>${radioChips('type', [['원룸', '원룸'], ['1.5룸', '1.5룸'], ['투룸', '투룸'], ['쓰리룸', '쓰리룸'], ['오피스텔', '오피스텔']], '원룸')}</div>
          <div class="field"><label for="rn-title">제목</label><input class="input" id="rn-title" name="title" maxlength="40" placeholder="예) 정문 도보 5분 풀옵션 원룸 양도" required></div>
        </section>
        <section class="card form-section"><h2><span class="num">2</span>사진</h2>
          <label class="upload"><span class="ui">${icon('camera', 22)}</span><span><b>방 사진 올리기</b><br><span class="small muted">최대 10장 · 창문, 화장실, 옵션이 보이게 찍어 주세요</span></span><input type="file" name="photos" accept="image/*" multiple data-preview="pv-photos"></label>
          <div class="previews" id="pv-photos"></div>
        </section>
        <section class="card form-section"><h2><span class="num">3</span>위치</h2>
          <div class="field"><label for="rn-addr">주소</label><div style="display:flex;gap:8px"><input class="input" id="rn-addr" name="addr" placeholder="도로명 주소" required><button type="button" class="btn btn-outline" data-act="addr-search">주소 검색</button></div>
            <span class="hint">상세 주소는 공개되지 않고, 문의한 인증 학생에게만 보여요.</span></div>
        </section>
        <section class="card form-section"><h2><span class="num">4</span>비용 · 계약</h2>
          <div class="form-grid three">
            <div class="field"><label for="rn-dep">보증금</label><div class="input-group"><input class="input" id="rn-dep" name="deposit" type="number" min="0" inputmode="numeric" placeholder="300" required><span class="suffix">만원</span></div></div>
            <div class="field"><label for="rn-rent">월세</label><div class="input-group"><input class="input" id="rn-rent" name="rent" type="number" min="0" inputmode="numeric" placeholder="45" required><span class="suffix">만원</span></div></div>
            <div class="field"><label for="rn-maint">관리비</label><div class="input-group"><input class="input" id="rn-maint" name="maint" type="number" min="0" inputmode="numeric" placeholder="7"><span class="suffix">만원</span></div></div>
          </div>
          <div class="form-grid two">
            <div class="field"><label for="rn-avail">입주 가능일</label><input class="input" id="rn-avail" name="avail" type="date" min="2026-11-10" value="2027-01-01"></div>
            <div class="field"><label for="rn-months">남은 계약 기간</label><div class="input-group"><input class="input" id="rn-months" name="months" type="number" min="1" max="24" value="12"><span class="suffix">개월</span></div></div>
          </div>
          <div class="form-grid two">
            <div class="field"><label for="rn-gender">입주 가능 성별</label><select class="select" id="rn-gender" name="gender"><option>무관</option><option>여성</option><option>남성</option></select></div>
            <div class="field"><label for="rn-smoke">흡연</label><select class="select" id="rn-smoke" name="smoke"><option>비흡연</option><option>무관</option></select></div>
          </div>
          <div class="field"><span class="field-label">옵션</span><div class="opts">${OPTIONS.map((o) => `<label class="opt sm"><input type="checkbox" name="options" value="${o}"><span>${o}</span></label>`).join('')}</div></div>
        </section>
        <section class="card form-section"><h2><span class="num">5</span>방 설명</h2>
          <div class="field"><label for="rn-desc">설명</label><textarea class="textarea" id="rn-desc" name="desc" placeholder="채광, 소음, 주변 편의시설, 양도 사유 등을 적어 주세요. 룸쉐어라면 생활 규칙도 함께 적어 주세요."></textarea>
          <span class="hint">계좌번호·외부 메신저 아이디·선입금 요구 문구는 자동으로 차단돼요.</span></div>
        </section>
        <section class="card form-section"><h2><span class="num">6</span>거주 증빙</h2>
          <div class="info-box">${icon('file', 18)}<span>임대차계약서 또는 최근 3개월 공과금 고지서 중 하나를 올려 주세요. 주민등록번호 등 민감 정보는 가리고 올려 주세요. 검토 후 바로 파기돼요.</span></div>
          <label class="upload"><span class="ui">${icon('file', 22)}</span><span><b>증빙 서류 올리기</b><br><span class="small muted">JPG, PNG, PDF · 1개</span></span><input type="file" name="proof" accept="image/*,.pdf" data-preview="pv-proof"></label>
          <div class="previews" id="pv-proof"></div>
          <label class="check"><input type="checkbox" name="agree" required><span>집주인(임대인)에게 양도·전대 동의를 받았거나 받을 예정이며, 허위 매물 등록 시 이용이 제한될 수 있음에 동의해요.</span></label>
        </section>
        <p class="error-text" id="room-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">등록하고 검토 요청하기</button>
      </form></div>`;
  }

  /* ── 중고거래 ── */
  let marketCat = '전체';
  const CATS = ['전체', '전공책', '생활용품', '전자기기', '가구', '무료 나눔'];
  function pageMarket() {
    const list = allItems().filter((i) => marketCat === '전체' || i.cat === marketCat);
    return `<div class="page-head"><div><h1>중고거래 · 무료 나눔</h1><p>같은 학교 학생끼리, 캠퍼스 안에서 안전하게</p></div>
      <a class="btn btn-primary" href="#market-new">${icon('plus', 18)}글쓰기</a></div>
    <div class="tabs" role="tablist" aria-label="카테고리">${CATS.map((c) => `<button class="tab ${marketCat === c ? 'active' : ''}" role="tab" aria-selected="${marketCat === c}" data-act="cat" data-cat="${c}">${c === '무료 나눔' ? icon('gift', 16) : ''}${c}</button>`).join('')}</div>
    <div class="places-strip" aria-label="추천 안전 거래 장소"><span class="chip">${icon('shield', 15)}안전 거래 장소</span>${D.safePlaces.map((p) => `<span class="chip">${icon('pin', 14)}${p.name}</span>`).join('')}</div>
    ${list.length ? `<div class="market-grid">${list.map(itemCard).join('')}</div>` : `<div class="card empty">${icon('bag', 40)}<b>아직 글이 없어요</b>첫 거래 글을 올려 보세요.</div>`}
    <a class="btn btn-primary fab" href="#market-new">${icon('plus', 20)}글쓰기</a>
    ${footer()}`;
  }

  function pageItem(id) {
    const i = findItem(id);
    if (!i) return notFound();
    const fav = S.favItems.includes(i.id);
    const pl = place(i.place);
    return `<a class="back-link" href="#market">${icon('left', 18)}중고거래</a>
    <div class="detail-grid">
      <div class="grid" style="gap:16px">
        <div class="item-art card" style="background:${CAT_BG[i.cat]};aspect-ratio:16/10;font-size:110px;border-radius:var(--radius)"><span aria-hidden="true">${i.emoji}</span></div>
        <section class="card pad">
          <div class="author-card">${avatar(i.seller.nick)}<div class="who"><b>${esc(i.seller.nick)}</b><div class="meta">${esc(i.seller.dept)} · 거래 후기 ${i.seller.reviews}개</div></div><span class="badge b-school">${icon('shield', 13)}학교 인증</span></div>
          <div class="trust-meter"><div class="tm-head"><span>신뢰도 점수</span><span>${i.seller.trust}점</span></div><div class="bar"><i style="width:${i.seller.trust}%"></i></div></div>
        </section>
        <section>
          <div class="chip-row"><span class="board-tag">${esc(i.cat)}</span><span class="chip" style="height:22px">${esc(i.cond)}</span></div>
          <h1 class="detail-title">${esc(i.title)}</h1>
          <div class="item-price ${i.price === 0 ? 'free' : ''}" style="font-size:24px">${won(i.price)}</div>
          <div class="meta" style="margin-top:4px">${i.time} · 찜 ${i.likes + (fav ? 1 : 0)} · 채팅 ${i.chats}</div>
          <p class="prose" style="margin-top:14px">${esc(i.desc)}</p>
        </section>
        <section class="card pad"><h2 class="block-title">${icon('pin', 18)}거래 장소</h2>
          <div class="place-list">${D.safePlaces.map((p) => `<div class="place ${p.id === pl.id ? 'rec' : ''}"><span class="pi">${icon(p.id === pl.id ? 'check' : 'pin', 18)}</span><div><b>${p.name}${p.id === pl.id ? ' · 판매자 희망' : ''}</b><span>${p.desc} · ${p.hours}</span></div></div>`).join('')}</div>
          <p class="small muted" style="margin-top:10px">자취방·기숙사 호실 등 개인 공간에서의 거래는 피해 주세요.</p></section>
        <section class="card pad"><h2 class="block-title">${icon('star', 18)}판매자가 받은 후기 ${i.seller.reviews}</h2>
          ${D.sellerReviews.map((r) => `<div class="review"><div style="display:flex;justify-content:space-between"><b class="small">${esc(r.from)}</b><span class="small muted">${r.when}</span></div><div class="stars" aria-label="별점 ${r.stars}점">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div><p style="font-size:14px;margin:4px 0">${esc(r.text)}</p><div class="chip-row">${r.tags.map((t) => `<span class="chip" style="height:24px">${t}</span>`).join('')}</div></div>`).join('')}</section>
      </div>
      <aside class="detail-aside grid" style="gap:16px">
        <section class="card pad desk-only">
          <div class="item-price ${i.price === 0 ? 'free' : ''}" style="font-size:22px">${won(i.price)}</div>
          <div style="display:flex;gap:8px;margin-top:14px">
            <button class="btn btn-outline fav-btn ${fav ? 'on' : ''}" data-act="fav-item" data-id="${i.id}" aria-pressed="${fav}">${icon('heart', 18)}${fav ? '찜 완료' : '찜하기'}</button>
            <button class="btn btn-primary" style="flex:1" data-act="item-chat" data-id="${i.id}">${icon('chat', 18)}채팅하기</button></div>
        </section>
        <div class="info-box mint">${icon('shield', 18)}<span>거래 완료 후 서로 후기를 남기면 두 사람의 신뢰도 점수에 반영돼요.</span></div>
        <div class="info-box amber">${icon('alert', 18)}<span>택배 거래·선입금 요청은 응하지 마세요. 직접 만나 물건을 확인한 뒤 결제하세요.</span></div>
        <div class="report-row"><button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="중고거래 · ${esc(i.title)}">${icon('flag', 15)}신고하기</button><button class="btn btn-sm btn-ghost" data-act="block" data-key="${esc(i.seller.nick)}">${icon('ban', 15)}판매자 차단</button></div>
      </aside>
    </div>
    <div class="mobile-cta">
      <button class="fav-btn ${fav ? 'on' : ''}" data-act="fav-item" data-id="${i.id}" aria-pressed="${fav}" aria-label="${fav ? '찜 해제' : '찜하기'}">${icon('heart', 22)}</button>
      <div class="mc-price"><b>${won(i.price)}</b><span>${esc(pl.name)}</span></div>
      <button class="btn btn-primary" data-act="item-chat" data-id="${i.id}">${icon('chat', 18)}채팅하기</button>
    </div>`;
  }

  function pageItemNew() {
    if (!S.verified) return `<a class="back-link" href="#market">${icon('left', 18)}중고거래</a>` + gatePanel('거래 글쓰기');
    return `<div class="survey-wrap"><a class="back-link" href="#market">${icon('left', 18)}중고거래</a>
      <div class="page-head"><h1>거래 글쓰기</h1></div>
      <form data-form="item" class="card form-section" novalidate>
        <label class="upload"><span class="ui">${icon('camera', 22)}</span><span><b>사진 올리기</b><br><span class="small muted">최대 10장</span></span><input type="file" accept="image/*" multiple data-preview="pv-item"></label>
        <div class="previews" id="pv-item"></div>
        <div class="field"><label for="it-title">제목</label><input class="input" id="it-title" name="title" maxlength="40" placeholder="예) 경영통계학 8판 · 필기 거의 없음" required></div>
        <div class="field"><span class="field-label">카테고리</span>${radioChips('cat', CATS.slice(1).map((c) => [c, c]), '전공책')}</div>
        <div class="form-grid two">
          <div class="field"><label for="it-price">가격</label><div class="input-group"><input class="input" id="it-price" name="price" type="number" min="0" inputmode="numeric" placeholder="0이면 나눔"><span class="suffix">원</span></div></div>
          <div class="field"><label for="it-cond">상태</label><select class="select" id="it-cond" name="cond"><option>새 상품급</option><option selected>사용감 적음</option><option>사용감 있음</option></select></div>
        </div>
        <div class="field"><span class="field-label">거래 희망 장소</span><div class="radio-list">${D.safePlaces.map((p, j) => `<label><input type="radio" name="place" value="${p.id}" ${j === 1 ? 'checked' : ''}><span>${p.name}<br><span class="small muted" style="font-weight:500">${p.desc}</span></span></label>`).join('')}</div></div>
        <div class="field"><label for="it-desc">설명</label><textarea class="textarea" id="it-desc" name="desc" placeholder="구매 시기, 사용감, 하자 여부를 솔직하게 적어 주세요."></textarea></div>
        <p class="error-text" id="item-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">등록하기</button>
      </form></div>`;
  }

  /* ── 커뮤니티 ── */
  function pageCommunity(board) {
    const b = D.boards[board] ? board : 'all';
    const list = allPosts().filter((p) => b === 'all' || p.board === b);
    const hot = [...allPosts()].sort((x, y) => y.likes - x.likes).slice(0, 4);
    return `<div class="page-head"><div><h1>커뮤니티</h1><p>${D.school.name} 인증 학생만 글을 쓸 수 있는 공간</p></div>
      <a class="btn btn-primary" href="#write-${b === 'all' ? 'free' : b}">${icon('edit', 18)}글쓰기</a></div>
    <div class="tabs" role="tablist" aria-label="게시판">${[['all', '전체'], ...Object.entries(D.boards)].map(([k, t]) => `<a class="tab ${b === k ? 'active' : ''}" role="tab" aria-selected="${b === k}" href="#community-${k}">${t}</a>`).join('')}</div>
    <div class="community-layout">
      <div class="card post-list">${list.length ? list.map((p) => postRow(p, b === 'all')).join('') : `<div class="empty">${icon('chats', 40)}<b>아직 글이 없어요</b>첫 글을 남겨 보세요.</div>`}</div>
      <aside class="grid" style="gap:16px">
        <section class="card pad"><h2 class="block-title">${icon('sparkle', 18)}HOT 게시글</h2>
          <ol style="display:grid;gap:10px;list-style:none">${hot.map((p, i) => `<li><a href="#post-${p.id}" style="display:flex;gap:10px;font-size:14px;font-weight:600"><b style="color:var(--blue-600);width:14px">${i + 1}</b><span style="flex:1">${esc(p.title)}</span></a></li>`).join('')}</ol></section>
        <section class="card pad"><h2 class="block-title">${icon('shield', 18)}커뮤니티 이용 규칙</h2>
          <ul class="rules small"><li>${icon('check')}익명이어도 욕설·비하·혐오 표현 금지</li><li>${icon('check')}개인정보(실명·연락처·학번) 노출 금지</li><li>${icon('check')}신고 3회 누적 시 글이 자동으로 가려져요</li><li>${icon('check')}허위 정보·광고는 즉시 이용 제한</li></ul></section>
      </aside>
    </div>
    <a class="btn btn-primary fab" href="#write-${b === 'all' ? 'free' : b}">${icon('edit', 20)}글쓰기</a>
    ${footer()}`;
  }

  function pagePost(id) {
    const p = findPost(id);
    if (!p || S.blocked.includes(p.author)) return notFound();
    const liked = S.likedPosts.includes(p.id);
    const comments = [...p.comments, ...(S.comments[p.id] || [])].filter((c) => !S.blocked.includes(c.author));
    const anonIdx = {}; let n = 0;
    const cname = (c) => { if (!c.anon) return c.author; if (c.author === p.author) return '익명(글쓴이)'; if (!anonIdx[c.author]) anonIdx[c.author] = ++n; return `익명${anonIdx[c.author]}`; };
    return `<div style="max-width:760px;margin:0 auto"><a class="back-link" href="#community-${p.board}">${icon('left', 18)}${D.boards[p.board]}</a>
      <article class="card post-detail">
        <span class="board-tag">${D.boards[p.board]}</span>
        <h1>${esc(p.title)}</h1>
        <div class="author-card">${p.anon ? '<span class="avatar sm" style="background:#8A93A6" aria-hidden="true">익</span>' : avatar(p.author, 'sm')}<div class="who"><b style="font-size:14px">${p.anon ? '익명' : esc(p.author)}</b><div class="meta">${p.time} · 조회 ${p.views}</div></div><span class="badge b-school">${icon('shield', 13)}인증 학생</span></div>
        <div class="divider"></div>
        <p class="prose">${esc(p.body)}</p>
        <div class="post-actions">
          <button class="btn btn-sm ${liked ? 'btn-done' : 'btn-outline'}" data-act="like-post" data-id="${p.id}" aria-pressed="${liked}">${icon('thumb', 16)}공감 ${p.likes + (liked ? 1 : 0)}</button>
          <button class="btn btn-sm btn-outline" data-act="share">${icon('send', 16)}공유</button>
          <span style="flex:1"></span>
          <button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="게시글 · ${esc(p.title)}">${icon('flag', 15)}신고</button>
          ${p.mine ? '' : `<button class="btn btn-sm btn-ghost" data-act="block" data-key="${esc(p.author)}">${icon('ban', 15)}작성자 차단</button>`}
        </div>
      </article>
      <section class="card pad" style="margin-top:14px"><h2 class="block-title">댓글 ${comments.length}</h2>
        ${comments.map((c) => `<div class="comment">${c.anon ? '<span class="avatar sm" style="background:#8A93A6" aria-hidden="true">익</span>' : avatar(c.author, 'sm')}<div class="cbody">
          <div class="chead"><b>${esc(cname(c))}</b><span style="display:flex;gap:2px"><button class="btn btn-sm btn-ghost-danger" style="height:28px;padding:0 8px;font-size:12.5px" data-act="report" data-label="댓글 · ${esc(c.text.slice(0, 20))}">신고</button>${c.mine ? '' : `<button class="btn btn-sm btn-ghost" style="height:28px;padding:0 8px;font-size:12.5px" data-act="block" data-key="${esc(c.author)}">차단</button>`}</span></div>
          <p>${esc(c.text)}</p><div class="meta">${c.time} · 공감 ${c.likes}</div></div></div>`).join('') || '<p class="muted small">첫 댓글을 남겨 보세요.</p>'}
        <form class="comment-form" data-form="comment" data-id="${p.id}">
          <label class="check small" style="align-self:center"><input type="checkbox" name="anon" checked>익명</label>
          <input class="input" name="text" placeholder="${S.verified ? '따뜻한 댓글을 남겨 주세요' : '학교 인증 후 댓글을 쓸 수 있어요'}" aria-label="댓글 입력" maxlength="300">
          <button class="btn btn-primary" type="submit">등록</button>
        </form>
      </section></div>`;
  }

  function pageWrite(board) {
    if (!S.verified) return `<a class="back-link" href="#community">${icon('left', 18)}커뮤니티</a>` + gatePanel('글쓰기');
    const b = D.boards[board] ? board : 'free';
    return `<div class="survey-wrap"><a class="back-link" href="#community-${b}">${icon('left', 18)}커뮤니티</a>
      <div class="page-head"><h1>글쓰기</h1></div>
      <form data-form="post" class="card form-section" novalidate>
        <div class="field"><label for="w-board">게시판</label><select class="select" id="w-board" name="board">${Object.entries(D.boards).map(([k, t]) => `<option value="${k}" ${k === b ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="field"><label for="w-title">제목</label><input class="input" id="w-title" name="title" maxlength="60" placeholder="제목을 입력하세요" required></div>
        <div class="field"><label for="w-body">내용</label><textarea class="textarea" id="w-body" name="body" style="min-height:200px" placeholder="학교 생활에 도움이 되는 이야기를 나눠 주세요." required></textarea></div>
        <label class="switch"><span><b style="font-size:14.5px">익명으로 쓰기</b><br><span class="small muted">닉네임 대신 ‘익명’으로 표시돼요. 신고 처리 시에만 운영팀이 확인할 수 있어요.</span></span><input type="checkbox" name="anon" checked aria-label="익명으로 쓰기"></label>
        <div class="info-box amber">${icon('alert', 18)}<span>욕설·비하, 개인정보 노출, 광고성 글은 신고 없이도 삭제될 수 있어요.</span></div>
        <p class="error-text" id="post-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">등록하기</button>
      </form></div>`;
  }

  /* ── 마이페이지 ── */
  function pageMy(tab = 'listings') {
    const t = myTrust();
    const s = S.survey, q = (k) => D.questions.find((x) => x.k === k);
    const BT = [
      ['shield', '학교 인증', S.verified], ['id', '신원 인증', S.idVerified], ['file', '거주 증빙', S.myRooms.length > 0],
      ['star', '후기 10+', false], ['sparkle', '매칭 설문', true], ['heart', '나눔 천사', D.deals.some((d) => d.price === 0)],
    ];
    const tabs = [['clubs', '동아리·행사'], ['teams', '팀·공모전'], ['listings', '내 매물'], ['favs', '찜한 목록'], ['deals', '거래 내역'], ['reviews', '받은 후기'], ['reports', '신고·차단']];
    let body = '';
    if (tab === 'teams') {
      body = teamsMyBody();
    } else if (tab === 'clubs') {
      body = clubsMyBody();
    } else if (tab === 'listings') {
      const rows = [...S.myRooms.map((r) => ({ art: roomArt(r.seed), title: r.title, sub: `월 ${r.rent}만 · 보증금 ${r.deposit}만`, status: '<span class="badge b-review">증빙 검토 중</span>', href: `#rooms-${r.id}` })),
        ...S.myItems.map((i) => ({ art: i.emoji, bg: CAT_BG[i.cat], title: i.title, sub: won(i.price), status: '<span class="badge b-school">판매 중</span>', href: `#market-${i.id}` })),
        ...D.myListings.map((l) => { const i = findItem(l.id); return { art: i.emoji, bg: CAT_BG[i.cat], title: i.title, sub: won(i.price), status: `<span class="badge b-gray">${l.status}</span>`, href: `#market-${i.id}` }; })];
      body = rows.map((r) => `<a class="list-row" href="${r.href}"><span class="lr-art" style="background:${r.bg || '#EEF1F5'}">${r.art}</span><span class="lr-body"><b>${esc(r.title)}</b><span class="small muted">${r.sub}</span></span>${r.status}</a>`).join('')
        + `<div style="display:flex;gap:8px;margin-top:12px"><a class="btn btn-outline btn-sm" href="#rooms-new">${icon('plus', 15)}방 등록</a><a class="btn btn-outline btn-sm" href="#market-new">${icon('plus', 15)}거래 글쓰기</a></div>`;
    } else if (tab === 'favs') {
      const rs = S.favRooms.map(findRoom).filter(Boolean), is = S.favItems.map(findItem).filter(Boolean);
      body = rs.length + is.length === 0 ? `<div class="empty">${icon('heart', 36)}<b>찜한 매물이 없어요</b>마음에 드는 방이나 물건에 하트를 눌러 보세요.</div>`
        : [...rs.map((r) => `<a class="list-row" href="#rooms-${r.id}"><span class="lr-art">${roomArt(r.seed)}</span><span class="lr-body"><b>${esc(r.title)}</b><span class="small muted">월 ${r.rent}만 · 보증금 ${r.deposit}만 · 정문 ${distLabel(r.dist)}</span></span><span class="badge b-proof">방</span></a>`),
          ...is.map((i) => `<a class="list-row" href="#market-${i.id}"><span class="lr-art" style="background:${CAT_BG[i.cat]}">${i.emoji}</span><span class="lr-body"><b>${esc(i.title)}</b><span class="small muted">${won(i.price)} · ${place(i.place).name}</span></span><span class="badge b-coral">거래</span></a>`)].join('');
    } else if (tab === 'deals') {
      body = D.deals.map((d) => { const done = d.reviewed || S.reviewed.includes(d.id); return `<div class="list-row"><span class="lr-art" style="background:var(--blue-50);color:var(--navy-800)">${icon(d.price === 0 ? 'gift' : 'bag', 24)}</span><span class="lr-body"><b>${esc(d.title)}</b><span class="small muted">${d.role} · ${won(d.price)} · ${esc(d.with)} · ${d.date}<br>${icon('pin', 12, 'style="display:inline;vertical-align:-1px"')} ${d.place}</span></span>
        ${done ? '<span class="badge b-school">후기 완료</span>' : `<button class="btn btn-sm btn-primary" data-act="review" data-id="${d.id}">후기 남기기</button>`}</div>`; }).join('');
    } else if (tab === 'reviews') {
      const extra = S.reviewed.map(() => ({ from: '책정리중', stars: 5, text: '책 상태 설명 그대로였고 시간 약속도 잘 지켜주셨어요!', tags: ['시간 약속을 잘 지켜요'], when: '방금' }));
      body = [...extra, ...D.myReviews].map((r) => `<div class="review"><div style="display:flex;justify-content:space-between"><b class="small">${esc(r.from)}</b><span class="small muted">${r.when}</span></div><div class="stars" aria-label="별점 ${r.stars}점">${'★'.repeat(r.stars)}</div><p style="font-size:14px;margin:4px 0">${esc(r.text)}</p><div class="chip-row">${r.tags.map((x) => `<span class="chip" style="height:24px">${x}</span>`).join('')}</div></div>`).join('');
    } else {
      const reps = [...S.reports.map((r) => ({ ...r, status: '접수 · 24시간 내 검토' })), ...D.pastReports];
      body = `<h3 class="block-title" style="font-size:15px">신고 내역</h3>${reps.map((r) => `<div class="list-row"><span class="lr-art" style="background:var(--coral-100);color:var(--coral-800)">${icon('flag', 22)}</span><span class="lr-body"><b>${esc(r.target)}</b><span class="small muted">${esc(r.reason)} · ${r.date}</span></span><span class="badge ${r.status.startsWith('조치') ? 'b-school' : 'b-review'}">${r.status.split(' · ')[0]}</span></div>`).join('')}
        <div class="divider"></div><h3 class="block-title" style="font-size:15px">차단한 사용자 ${S.blocked.length}</h3>
        ${S.blocked.length ? S.blocked.map((b) => `<div class="list-row"><span class="lr-body"><b>${b.startsWith('anon') ? '익명 사용자' : esc(b)}</b></span><button class="btn btn-sm btn-outline" data-act="unblock" data-key="${esc(b)}">차단 해제</button></div>`).join('') : '<p class="small muted">차단한 사용자가 없어요.</p>'}`;
    }
    return `<div class="page-head"><h1>마이페이지</h1></div>
    <div class="my-grid">
      <div class="grid" style="gap:16px">
        <section class="card profile-card">
          <div class="profile-top">${avatar(D.me.nick, 'lg')}<div><b style="font-size:18px">${D.me.nick}</b><div class="meta">${D.school.name} · ${s.dept} · ${q('grade').opts[s.grade]}</div><div class="meta">가입 ${D.me.joined}</div></div></div>
          <div class="status-box ${S.verified ? 'on' : 'off'}">${icon(S.verified ? 'shield' : 'alert', 24)}<div><b>${S.verified ? '학교 인증 완료' : '학교 인증 전'}</b><span>${S.verified ? esc(S.email) : '둘러보기만 가능해요'}</span></div>${S.verified ? '' : '<a class="btn btn-sm btn-primary" href="#verify">인증하기</a>'}</div>
          ${S.verified && !S.idVerified ? `<button class="btn btn-outline btn-block" style="margin-top:10px" data-act="id-verify">${icon('id', 18)}신원 인증 추가하기 (휴대폰)</button>` : ''}
        </section>
        <section class="card pad">
          <h2 class="block-title">신뢰도 점수</h2>
          <div class="gauge">${ring(t, 84, "점", "신뢰도")}<div><div class="big">${t}<small> / 100</small></div><div class="small muted">상위 ${Math.max(3, 100 - t - 6)}% · 거래 ${D.deals.length}회 · 후기 ${D.myReviews.length + S.reviewed.length}개</div></div></div>
          <details style="margin-top:12px"><summary class="small" style="cursor:pointer;font-weight:700;color:var(--blue-600)">신뢰도는 어떻게 계산되나요?</summary>
            <p class="small muted" style="margin-top:8px">학교 인증(+6), 신원 인증(+4), 거주 증빙(+3), 받은 거래 후기, 응답률을 합산해요. 신고가 확인되면 점수가 깎여요.</p></details>
          <div class="badge-grid">${BT.map(([ic, l, on]) => `<div class="badge-tile ${on ? 'on' : 'off'}"><span class="bt">${icon(ic, 18)}</span>${l}<span class="sr-only">${on ? '획득' : '미획득'}</span></div>`).join('')}</div>
        </section>
        <section class="card pad">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><h2 class="block-title" style="margin:0">룸메이트 생활 습관</h2><a class="btn btn-sm btn-outline" href="#roommate-survey">${icon('edit', 15)}수정</a></div>
          <div class="habit-grid">${['sleep', 'wake', 'smoke', 'clean', 'noise', 'guest'].map((k) => `<div><small>${q(k).label} · ${IMP[S.weights[k]]}</small><b>${q(k).opts[s[k]]}</b></div>`).join('')}</div>
        </section>
      </div>
      <section class="card pad">
        <div class="tabs" role="tablist">${tabs.map(([k, l]) => `<a class="tab ${tab === k ? 'active' : ''}" role="tab" aria-selected="${tab === k}" href="#my-${k}">${l}</a>`).join('')}</div>
        ${body}
        <div class="divider"></div>
        <button class="btn btn-sm btn-ghost" data-act="reset">${icon('refresh', 15)}데모 데이터 초기화</button>
      </section>
    </div>`;
  }

  /* ── 학교 인증 ── */
  const V = { step: 1, email: '', code: '' };
  function pageVerify() {
    if (S.verified) V.step = 3;
    const steps = `<div class="steps" aria-hidden="true">${[1, 2, 3].map((n) => `<i class="${V.step >= n ? 'on' : ''}"></i>`).join('')}</div>`;
    let inner = '';
    if (V.step === 1) inner = `<div class="verify-hero"><div class="vi">${icon('mail', 30)}</div><h1>학교 이메일 인증</h1><p>${D.school.name} 재학생만 이용할 수 있어요.<br>학교 메일로 인증번호를 보내드릴게요.</p></div>
      <form data-form="v-email" class="grid" style="gap:12px" novalidate>
        <div class="field"><label for="v-email">학교 이메일</label><div class="input-group"><input class="input" id="v-email" name="id" placeholder="학번 또는 아이디" autocomplete="username" value="${esc(V.email.split('@')[0])}" required><span class="suffix">@${D.school.domain}</span></div>
        <span class="demo-hint">${icon('sparkle', 13)}데모: 아무 아이디나 입력해도 돼요</span></div>
        <p class="error-text" id="v-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">인증번호 받기</button>
      </form>`;
    else if (V.step === 2) inner = `<div class="verify-hero"><div class="vi">${icon('lock', 30)}</div><h1>인증번호 입력</h1><p><b>${esc(V.email)}</b>(으)로 보낸<br>6자리 인증번호를 입력해 주세요.</p></div>
      <form data-form="v-code" class="grid" style="gap:12px" novalidate>
        <input class="input code-input" name="code" inputmode="numeric" maxlength="6" autocomplete="one-time-code" aria-label="인증번호 6자리" placeholder="······" required>
        <span class="demo-hint" style="justify-self:center">${icon('sparkle', 13)}데모 인증번호: <b>${V.code}</b></span>
        <p class="error-text" id="v-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">인증 완료</button>
        <button class="btn btn-ghost" type="button" data-act="v-back">이메일 다시 입력</button>
      </form>`;
    else inner = `<div class="verify-hero"><div class="vi" style="background:var(--navy-800);color:var(--mint-400)">${icon('shield', 32)}</div><h1>학교 인증 완료!</h1><p><b>${esc(S.email)}</b><br>이제 글쓰기 · 채팅 · 매물 등록 · 룸메이트 관심 보내기를 할 수 있어요.</p></div>
      <div class="grid" style="gap:10px">
        <div class="info-box mint">${icon('check', 18)}<span><b>학교 인증</b> 배지가 프로필에 표시되고 신뢰도가 +6 올랐어요.</span></div>
        ${S.idVerified ? `<div class="info-box mint">${icon('check', 18)}<span><b>신원 인증</b>도 완료했어요.</span></div>` : `<button class="btn btn-outline btn-lg btn-block" data-act="id-verify">${icon('id', 18)}신원 인증도 하기 (휴대폰 본인확인 · 데모)</button>`}
        <a class="btn btn-primary btn-lg btn-block" href="#roommate">${icon('users', 18)}룸메이트 찾으러 가기</a>
        <a class="btn btn-ghost" href="#home">홈으로</a>
      </div>`;
    return `<div class="verify-wrap"><a class="back-link" href="#home">${icon('left', 18)}홈</a><div class="card pad" style="padding:28px 22px">${steps}${inner}</div>
      <p class="small muted" style="text-align:center;margin-top:14px">학교 이메일은 재학 여부 확인에만 쓰이며 다른 사용자에게 공개되지 않아요.</p></div>`;
  }

  /* ── 동아리 · 행사 ── */
  const TODAY = '2026-11-10';
  const WD = ['일', '월', '화', '수', '목', '금', '토'];
  const dday = (s) => Math.round((new Date(s + 'T00:00:00') - new Date(TODAY + 'T00:00:00')) / 86400000);
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const dayInfo = (s) => { const d = new Date(s + 'T00:00:00'); return { m: d.getMonth() + 1, d: d.getDate(), w: WD[d.getDay()] }; };
  const findClub = (id) => D.clubs.find((c) => c.id === id);
  const CF = { cat: '전체', open: false, returner: false };
  let evWeek = 0, evDay = TODAY, evFilter = '전체';

  function clubFit(c) {
    const hob = S.survey.hobby || [];
    const common = c.tags.filter((t) => hob.includes(t));
    const score = 52 + Math.min(2, common.length) * 18 + (c.welcome.includes(S.stype) ? 10 : 0) + (c.recruit.status !== 'closed' ? 4 : 0) + (c.welcome.length === 1 && c.welcome[0] === S.stype ? 6 : 0);
    return { score: Math.min(97, score), common };
  }
  function recruitPill(c) {
    const r = c.recruit;
    if (r.status === 'open') return `<span class="rpill open">모집 중 · D-${dday(r.until)}</span>`;
    if (r.status === 'always') return '<span class="rpill always">상시 모집</span>';
    return '<span class="rpill closed">모집 마감</span>';
  }
  const clubArt = (c, cls = '') => `<span class="club-art ${cls}" style="background:${c.color}" aria-hidden="true">${c.emoji}</span>`;
  const officialMark = (c) => (c.official ? `<span class="vmark" title="총동아리연합회 등록 동아리">${icon('shield', 14)}<span class="sr-only">공식 등록</span></span>` : '');

  function clubCard(c) {
    const fol = S.followClubs.includes(c.id);
    return `<article class="club-card clickable" data-href="#clubs-${c.id}">
      <div class="cc-top">${clubArt(c)}<div class="who"><b><a href="#clubs-${c.id}">${esc(c.name)}</a>${officialMark(c)}</b><span class="meta">${c.cat} · 부원 ${c.members}명 · ${esc(c.day)}</span></div>
        <button class="fav-btn ${fol ? 'on' : ''}" data-act="club-follow" data-id="${c.id}" aria-pressed="${fol}" aria-label="${fol ? '관심 해제' : '관심 동아리 등록'}: ${esc(c.name)}">${icon('heart', 20)}</button></div>
      <p class="cc-intro">${esc(c.intro)}</p>
      <div class="cc-foot">${recruitPill(c)}${c.welcome.map((w) => `<span class="chip">${w} 환영</span>`).join('')}</div>
    </article>`;
  }

  function eventCard(e, compact) {
    const di = dayInfo(e.date), going = S.going.includes(e.id);
    return `<article class="event-card">
      <div class="ev-date" aria-label="${di.m}월 ${di.d}일 ${di.w}요일"><small>${di.m}월</small><b>${di.d}</b><small>${di.w}</small></div>
      <div class="ev-body"><span class="ev-type">${e.type}${e.for.length === 1 ? ` · ${e.for[0]} 추천` : ''}</span><h3>${esc(e.title)}</h3>
        <div class="meta">${e.time} · ${esc(e.place)}</div>
        ${compact ? '' : `<div class="meta">${e.club ? `<a class="ev-host" href="#clubs-${e.club}">${esc(e.host)}</a>` : esc(e.host)}</div>`}</div>
      <div class="ev-act"><button class="btn btn-sm ${going ? 'btn-done' : 'btn-outline'}" data-act="event-join" data-id="${e.id}" aria-pressed="${going}">${going ? `${icon('check', 15)}참여 예정` : '참여하기'}</button><span class="small muted">${e.going + (going ? 1 : 0)}명 참여</span></div>
    </article>`;
  }

  function weekDays() {
    const start = new Date('2026-11-08T00:00:00'); start.setDate(start.getDate() + evWeek * 7);
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); const s = ymd(d); return { s, d: d.getDate(), m: d.getMonth() + 1, w: WD[i], has: D.events.some((e) => e.date === s) }; });
  }
  function weekStrip() {
    const days = weekDays();
    return `<div class="week-head"><b>${days[3].m}월 ${evWeek === 0 ? '이번 주' : evWeek === 1 ? '다음 주' : `${days[0].d}일 주`}</b>
        <span><button class="icon-btn" data-act="ev-week" data-dir="-1" aria-label="이전 주" ${evWeek <= 0 ? 'disabled' : ''}>${icon('left', 18)}</button><button class="icon-btn" data-act="ev-week" data-dir="1" aria-label="다음 주" ${evWeek >= 2 ? 'disabled' : ''}>${icon('right', 18)}</button></span></div>
      <div class="week-strip" role="tablist" aria-label="날짜 선택">${days.map((x) => `<button class="day ${x.s === evDay ? 'on' : ''} ${x.s === TODAY ? 'today' : ''}" role="tab" aria-selected="${x.s === evDay}" aria-label="${x.m}월 ${x.d}일 ${x.w}요일${x.has ? ', 행사 있음' : ''}" data-act="ev-day" data-day="${x.s}"><span class="ddot ${x.has ? '' : 'none'}"></span><small>${x.w}</small><b>${x.d}</b></button>`).join('')}</div>`;
  }
  const clubTabs = (active) => `<nav class="seg nav" aria-label="동아리 메뉴"><a href="#clubs" class="${active === 'clubs' ? 'active' : ''}" ${active === 'clubs' ? 'aria-current="page"' : ''}>동아리 찾기</a><a href="#events" class="${active === 'events' ? 'active' : ''}" ${active === 'events' ? 'aria-current="page"' : ''}>행사 캘린더</a></nav>`;

  function pageClubs() {
    const recs = D.clubs.map((c) => ({ c, f: clubFit(c) })).sort((a, b) => b.f.score - a.f.score).slice(0, 3);
    const list = D.clubs.filter((c) => (CF.cat === '전체' || c.cat === CF.cat) && (!CF.open || c.recruit.status !== 'closed') && (!CF.returner || c.welcome.includes('복학생')));
    return `<div class="page-head"><div><h1>동아리 · 행사</h1><p>처음 온 신입생도, 다시 돌아온 복학생도 편하게 시작해요</p></div>${clubTabs('clubs')}</div>
    <div class="stype-row"><span>나는</span><div class="seg solid" role="group" aria-label="학생 구분">${['신입생', '복학생', '재학생'].map((t) => `<button class="${S.stype === t ? 'active' : ''}" data-act="stype" data-v="${t}" aria-pressed="${S.stype === t}">${t}</button>`).join('')}</div><span>이에요</span></div>
    <section class="section" style="margin-top:20px" aria-labelledby="h-rec">
      <div class="section-head"><h2 id="h-rec">${S.stype}에게 추천하는 동아리</h2><a class="more" href="#roommate-survey">취미 수정${icon('right', 16)}</a></div>
      <div class="hscroll cols-3">${recs.map(({ c, f }) => `<a class="club-rec" href="#clubs-${c.id}" style="background:${c.color}"><span class="cr-emoji" aria-hidden="true">${c.emoji}</span><span class="cr-score">${f.score}% 맞음</span><b>${esc(c.name)}</b><span class="cr-why">${f.common.length ? `취미가 겹쳐요: ${f.common.join(', ')}` : esc(c.intro)}</span>${recruitPill(c)}</a>`).join('')}</div>
    </section>
    <section class="section" aria-labelledby="h-all">
      <div class="section-head"><h2 id="h-all">전체 동아리 ${list.length}</h2></div>
      <div class="tabs">${['전체', ...D.clubCats].map((k) => `<button class="tab ${CF.cat === k ? 'active' : ''}" data-act="club-cat" data-cat="${k}" aria-pressed="${CF.cat === k}">${k}</button>`).join('')}
        <button class="tab ${CF.open ? 'active' : ''}" data-act="club-flt" data-k="open" aria-pressed="${CF.open}">모집 중만</button><button class="tab ${CF.returner ? 'active' : ''}" data-act="club-flt" data-k="returner" aria-pressed="${CF.returner}">복학생 환영</button></div>
      ${list.length ? `<div class="club-grid">${list.map(clubCard).join('')}</div>` : `<div class="empty">${icon('search', 40)}<b>조건에 맞는 동아리가 없어요</b>필터를 줄여 보세요.</div>`}
    </section>
    <div class="info-box mint" style="margin-top:20px">${icon('shield', 18)}<span>방패 표시는 총동아리연합회에 등록된 공식 동아리예요. 음주·참석 강요나 과도한 회비 요구는 동아리 페이지에서 바로 신고할 수 있어요.</span></div>
    ${footer()}`;
  }

  function pageClub(id) {
    const c = findClub(id);
    if (!c) return notFound();
    const fol = S.followClubs.includes(c.id), ap = S.applied[c.id], r = c.recruit;
    const evs = D.events.filter((e) => e.club === c.id);
    const qna = [...c.qna, ...(S.clubQ[c.id] || [])];
    const applyBtn = (cls) => (r.status === 'closed' ? `<button class="btn ${cls}" disabled>모집 마감</button>`
      : ap ? `<button class="btn btn-done ${cls}" disabled>${icon('check', 18)}지원 완료 · ${ap}</button>`
        : `<button class="btn btn-primary ${cls}" data-act="club-apply" data-id="${c.id}">${icon('send', 18)}지원하기</button>`);
    return `<a class="back-link" href="#clubs">${icon('left', 18)}동아리 목록</a>
    <div class="detail-grid">
      <div class="grid" style="gap:16px">
        <section class="club-hero" style="background:${c.color}">${clubArt(c, 'xl')}
          <div><span class="hc-kicker">${c.cat}${c.official ? ' · 공식 등록 동아리' : ''}</span><h1>${esc(c.name)}</h1><p>${esc(c.intro)}</p>
          <div class="chip-row" style="margin-top:12px">${c.welcome.map((w) => `<span class="chip on-color">${w} 환영</span>`).join('')}</div></div></section>
        <div class="kv"><div><small>부원</small><b>${c.members}명</b></div><div><small>정기 모임</small><b>${esc(c.day)}</b></div><div><small>회비</small><b>${esc(c.fee)}</b></div><div><small>동아리방</small><b>${esc(c.room)}</b></div></div>
        <section class="card pad"><h2 class="block-title">동아리 소개</h2><p class="prose">${esc(c.desc)}</p>
          <div class="chip-row" style="margin-top:14px">${c.activities.map((a) => `<span class="chip">${esc(a)}</span>`).join('')}</div></section>
        ${evs.length ? `<section><div class="section-head"><h2>다가오는 행사</h2><a class="more" href="#events">캘린더${icon('right', 16)}</a></div><div class="grid" style="gap:10px">${evs.map((e) => eventCard(e, true)).join('')}</div></section>` : ''}
        <section class="card pad"><h2 class="block-title">${icon('chats', 18)}궁금한 점 물어보기 ${qna.length}</h2>
          ${qna.map((q) => `<div class="qa"><p class="qa-q"><b aria-label="질문">Q</b><span>${esc(q.q)}</span></p>${q.a ? `<p class="qa-a"><b aria-label="답변">A</b><span>${esc(q.a)}<small>${esc(c.name)} 운영진</small></span></p>` : '<p class="qa-a pending"><b aria-label="답변">A</b><span>운영진 답변을 기다리고 있어요</span></p>'}</div>`).join('') || '<p class="small muted">아직 질문이 없어요. 첫 질문을 남겨 보세요.</p>'}
          <form class="comment-form" data-form="club-q" data-id="${c.id}"><input class="input" id="club-q-${c.id}" name="q" maxlength="200" placeholder="${S.verified ? '예) 복학생도 지원할 수 있나요?' : '학교 인증 후 질문할 수 있어요'}" aria-label="동아리에 질문하기"><button class="btn btn-primary" type="submit">질문하기</button></form>
          <p class="small muted" style="margin-top:8px">질문은 익명으로 올라가요.</p></section>
      </div>
      <aside class="detail-aside grid" style="gap:16px">
        <section class="card pad"><h2 class="block-title">모집 정보</h2>
          <div class="recruit-box">${recruitPill(c)}<b>${esc(r.title)}</b><span class="small muted">${r.status === 'open' ? `${fmtDate(r.until)}까지 · ${r.seats}명 모집` : r.status === 'always' ? '언제든 지원할 수 있어요' : '다음 모집은 2027년 3월 예정이에요'}</span></div>
          <ol class="steps-list">${r.steps.map((s, i) => `<li><span>${i + 1}</span>${esc(s)}</li>`).join('')}</ol>
          <div style="display:grid;gap:8px;margin-top:14px">${applyBtn('btn-lg btn-block')}
            <button class="btn btn-outline btn-block fav-btn ${fol ? 'on' : ''}" data-act="club-follow" data-id="${c.id}" aria-pressed="${fol}">${icon('heart', 18)}${fol ? '관심 동아리 · 새 소식 알림 켜짐' : '관심 동아리로 등록'}</button>
            <button class="btn btn-ghost btn-block" data-act="club-chat" data-id="${c.id}">${icon('chat', 18)}운영진에게 1:1 문의</button></div>
          <div class="report-row"><button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="동아리 · ${esc(c.name)}">${icon('flag', 15)}신고하기</button></div>
        </section>
        <div class="info-box amber">${icon('alert', 18)}<span>환영회 참석이나 음주는 강요할 수 없어요. 불편한 일이 있으면 신고해 주세요.</span></div>
      </aside>
    </div>
    <div class="mobile-cta">${clubArt(c, 'sm')}<div class="mc-price"><b>${esc(c.name)}</b><span>${r.status === 'open' ? `모집 중 · D-${dday(r.until)}` : r.status === 'always' ? '상시 모집' : '모집 마감'}</span></div>${applyBtn('')}</div>`;
  }

  function pageEvents() {
    const filt = (e) => evFilter === '전체' || e.for.includes(evFilter) || e.type === evFilter;
    const dayList = D.events.filter((e) => e.date === evDay && filt(e));
    const upcoming = D.events.filter((e) => e.date >= TODAY && filt(e)).sort((a, b) => a.date.localeCompare(b.date));
    const di = dayInfo(evDay);
    return `<div class="page-head"><div><h1>동아리 · 행사</h1><p>박람회, 공연, 체험, 복학생 설명회까지 한곳에서</p></div>${clubTabs('events')}</div>
    <section class="card pad">${weekStrip()}</section>
    <div class="tabs" style="margin-top:16px">${[['전체', '전체'], ['신입생', '신입생 추천'], ['복학생', '복학생 추천'], ['공연', '공연'], ['체험', '체험']].map(([k, l]) => `<button class="tab ${evFilter === k ? 'active' : ''}" data-act="ev-filter" data-k="${k}" aria-pressed="${evFilter === k}">${l}</button>`).join('')}</div>
    <section aria-labelledby="h-day"><div class="section-head"><h2 id="h-day">${di.m}월 ${di.d}일 (${di.w})${evDay === TODAY ? ' · 오늘' : ''}</h2></div>
      ${dayList.length ? `<div class="grid" style="gap:10px">${dayList.map((e) => eventCard(e)).join('')}</div>` : `<div class="empty">${icon('calendar', 36)}<b>이날은 예정된 행사가 없어요</b>점이 찍힌 날짜를 눌러 보세요.</div>`}</section>
    <section class="section" aria-labelledby="h-up"><div class="section-head"><h2 id="h-up">다가오는 행사 ${upcoming.length}</h2></div>
      <div class="grid" style="gap:10px">${upcoming.map((e) => eventCard(e)).join('')}</div></section>
    ${footer()}`;
  }

  function homeEvents() {
    let list = D.events.filter((e) => e.date === evDay);
    const label = list.length ? '' : '<p class="small muted" style="margin:12px 0 0">이날은 행사가 없어요. 가까운 행사를 보여 드릴게요.</p>';
    if (!list.length) list = D.events.filter((e) => e.date >= evDay).slice(0, 2);
    return `<div class="card pad">${weekStrip()}${label}<div class="grid" style="gap:8px;margin-top:12px">${list.slice(0, 3).map((e) => eventCard(e, true)).join('')}</div></div>`;
  }

  function openApply(id) {
    const c = findClub(id);
    openModal(modalBox(`${esc(c.name)} 지원하기`, `<form data-form="apply" data-id="${id}" class="grid" style="gap:16px">
      <div class="field"><span class="field-label">지원 구분</span>${radioChips('stype', [['신입생', '신입생'], ['복학생', '복학생'], ['재학생', '재학생']], S.stype)}</div>
      <div class="form-grid two"><div class="field"><label for="ap-dept">학과</label><input class="input" id="ap-dept" name="dept" value="${esc(S.survey.dept)}"></div>
        <div class="field"><label for="ap-grade">학년</label><select class="select" id="ap-grade" name="grade">${['1학년', '2학년', '3학년', '4학년'].map((g, i) => `<option ${S.survey.grade === i ? 'selected' : ''}>${g}</option>`).join('')}</select></div></div>
      <div class="field"><span class="field-label">활동 가능한 요일</span><div class="opts">${WD.slice(1).concat('일').map((d) => `<label class="opt sm"><input type="checkbox" name="days" value="${d}"><span>${d}</span></label>`).join('')}</div></div>
      <div class="field"><label for="ap-msg">${esc(c.recruit.question)}</label><textarea class="textarea" id="ap-msg" name="msg" style="min-height:96px" placeholder="짧게 적어도 괜찮아요"></textarea></div>
      <p class="small muted">지원서는 ${esc(c.name)} 운영진에게만 전달돼요. 연락처는 공개되지 않고, 결과는 앱 알림과 채팅으로 안내돼요.</p>
      <p class="error-text" id="ap-err" role="alert"></p>
      <button class="btn btn-primary btn-lg btn-block" type="submit">지원서 보내기</button></form>`));
  }

  function clubsMyBody() {
    const ap = Object.entries(S.applied).filter(([id]) => findClub(id));
    const fol = S.followClubs.map(findClub).filter(Boolean);
    const ev = S.going.map((id) => D.events.find((e) => e.id === id)).filter(Boolean);
    const row = (c, right) => `<a class="list-row" href="#clubs-${c.id}"><span class="lr-art" style="background:${c.color}">${c.emoji}</span><span class="lr-body"><b>${esc(c.name)}</b><span class="small muted">${c.cat} · ${esc(c.day)}</span></span>${right}</a>`;
    if (!ap.length && !fol.length && !ev.length) return `<div class="empty">${icon('users', 36)}<b>아직 관심 동아리가 없어요</b>신입생·복학생 추천 동아리부터 둘러보세요.<div style="margin-top:12px"><a class="btn btn-primary" href="#clubs">동아리 둘러보기</a></div></div>`;
    const h = (t) => `<h3 class="block-title" style="font-size:15px;margin-top:6px">${t}</h3>`;
    return [
      ap.length ? h('지원한 동아리') + ap.map(([id, st]) => row(findClub(id), `<span class="badge b-review">${st}</span>`)).join('') : '',
      fol.length ? h('관심 동아리') + fol.map((c) => row(c, recruitPill(c))).join('') : '',
      ev.length ? h('참여 예정 행사') + ev.map((e) => { const d = dayInfo(e.date); return `<div class="list-row"><span class="lr-art" style="background:var(--lav);font-size:14px;font-weight:800">${d.m}/${d.d}</span><span class="lr-body"><b>${esc(e.title)}</b><span class="small muted">${e.time} · ${esc(e.place)}</span></span></div>`; }).join('') : '',
    ].filter(Boolean).join('<div class="divider"></div>');
  }

  /* ── 프로젝트 · 공모전 ── */
  ICONS.trophy = '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>';
  ICONS.grid = '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>';
  const findContest = (id) => D.contests.find((k) => k.id === id);
  const allTeams = () => [...S.myTeams, ...D.teams].filter((t) => !S.blocked.includes(t.leader.nick));
  const findTeam = (id) => allTeams().find((t) => t.id === id);
  const teamsFor = (kid) => allTeams().filter((t) => t.contest === kid && !t.closed);
  const openSlots = (t) => t.positions.reduce((s, p) => s + Math.max(0, p.need - p.got), 0);
  const KF = { cat: '전체', sort: 'deadline', campus: false }, TF = { role: '전체', kind: '전체' }, PF = { role: '전체' };
  let newTeamContest = '';
  const ddayPill = (date, closed) => { const n = dday(date); if (closed || n < 0) return '<span class="dpill closed">마감</span>'; return `<span class="dpill ${n <= 7 ? 'hot' : ''}">${n === 0 ? 'D-Day' : `D-${n}`}</span>`; };
  const posPill = (p) => `<span class="pos ${p.need > p.got ? 'open' : 'full'}">${esc(p.role)} <b>${p.got}/${p.need}</b></span>`;
  const teamTabs = (active) => `<nav class="seg nav" aria-label="프로젝트·공모전 메뉴">${[['contests', '공모전'], ['teams', '팀원 모집'], ['people', '팀 구해요']].map(([k, l]) => `<a href="#${k}" class="${active === k ? 'active' : ''}" ${active === k ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</nav>`;
  const headTeams = (active, sub) => `<div class="page-head"><div><h1>프로젝트 · 공모전</h1><p>${sub}</p></div>${teamTabs(active)}</div>`;
  const chipBtns = (act, list, cur, label = (x) => x) => list.map((x) => `<button class="tab ${cur === x ? 'active' : ''}" data-act="${act}" data-v="${x}" aria-pressed="${cur === x}">${label(x)}</button>`).join('');

  function contestCard(k) {
    const sc = S.scrapContests.includes(k.id), n = teamsFor(k.id).length;
    return `<article class="contest-card clickable" data-href="#contests-${k.id}">
      <div class="poster" style="background:${k.color}"><span aria-hidden="true">${k.emoji}</span>${ddayPill(k.deadline)}${favBtn('contest', k.id, sc, k.title)}</div>
      <div class="cc-body"><span class="room-kicker">${k.cat}${k.campus ? ' · 교내' : ''}</span><h3><a href="#contests-${k.id}">${esc(k.title)}</a></h3>
        <span class="meta">${esc(k.host)}</span>
        <div class="cc-row"><b>${esc(k.prize)}</b>${n ? `<span class="team-count">${icon('users', 14)}팀원 모집 ${n}</span>` : ''}</div></div></article>`;
  }

  function teamCard(t) {
    const k = t.contest && findContest(t.contest), ap = S.teamApplied[t.id];
    return `<article class="team-card clickable ${t.closed ? 'is-closed' : ''}" data-href="#teams-${t.id}">
      <div class="tc-top"><span class="kind">${t.kind}</span>${k ? `<span class="tc-contest">${esc(k.title)}</span>` : '<span class="tc-contest"></span>'}${ddayPill(t.deadline, t.closed)}</div>
      <h3><a href="#teams-${t.id}">${esc(t.title)}</a></h3>
      <div class="pos-row">${t.positions.map(posPill).join('')}</div>
      <div class="meta">${esc(t.mode)} · ${esc(t.period)}</div>
      <div class="tc-foot">${avatar(t.leader.nick, 'sm')}<span class="small" style="flex:1;min-width:0"><b>${esc(t.leader.nick)}</b> · 완주율 ${t.leader.rate}%</span>${ap ? `<span class="badge b-review">${esc(ap.role)} 지원함</span>` : `<span class="small muted">지원 ${t.applicants}명</span>`}</div>
    </article>`;
  }

  function pageContests() {
    const sorters = { deadline: (a, b) => a.deadline.localeCompare(b.deadline), popular: (a, b) => b.scraps - a.scraps, teams: (a, b) => teamsFor(b.id).length - teamsFor(a.id).length };
    const list = D.contests.filter((k) => (KF.cat === '전체' || k.cat === KF.cat) && (!KF.campus || k.campus) && dday(k.deadline) >= 0).sort(sorters[KF.sort]);
    return headTeams('contests', '공모전·대외활동을 찾고, 같은 학교 학생과 바로 팀을 꾸려요') + `
    <div class="tabs" aria-label="분야">${chipBtns('k-cat', ['전체', ...D.contestCats], KF.cat)}</div>
    <div class="list-head" style="margin-bottom:12px"><span class="count">접수 중 <b>${list.length}</b>개</span>
      <div style="display:flex;gap:6px;align-items:center"><button class="tab ${KF.campus ? 'active' : ''}" data-act="k-campus" aria-pressed="${KF.campus}">교내만</button>
      <select class="sort-select" id="k-sort" aria-label="정렬">${[['deadline', '마감 임박순'], ['popular', '스크랩 많은 순'], ['teams', '팀원 모집 많은 순']].map(([v, l]) => `<option value="${v}" ${KF.sort === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div></div>
    ${list.length ? `<div class="contest-grid">${list.map(contestCard).join('')}</div>` : `<div class="empty">${icon('trophy', 36)}<b>조건에 맞는 공모전이 없어요</b>분야를 바꿔 보세요.</div>`}
    <div class="info-box" style="margin-top:20px">${icon('alert', 18)}<span>공모전 정보는 주최 측 공지를 정리한 거예요. 지원 전에 공식 요강을 꼭 확인하세요.</span></div>
    ${footer()}`;
  }

  function pageContest(id) {
    const k = findContest(id);
    if (!k) return notFound();
    const sc = S.scrapContests.includes(k.id), ts = allTeams().filter((t) => t.contest === k.id), n = dday(k.deadline);
    return `<a class="back-link" href="#contests">${icon('left', 18)}공모전 목록</a>
    <div class="detail-grid">
      <div class="grid" style="gap:16px">
        <section class="contest-hero" style="background:${k.color}"><span class="ch-emoji" aria-hidden="true">${k.emoji}</span>
          <div><span class="hc-kicker">${k.cat}${k.campus ? ' · 교내' : ''}</span><h1>${esc(k.title)}</h1><p>주최 ${esc(k.host)} · 주관 ${esc(k.org)}</p></div></section>
        <div class="kv"><div><small>접수 기간</small><b>${fmtDate(k.start)} ~ ${fmtDate(k.deadline)}</b></div><div><small>참가 대상</small><b>${esc(k.target)}</b></div><div><small>참가 형태</small><b>${esc(k.team)}</b></div><div><small>시상</small><b>${esc(k.prize)}</b></div></div>
        <section class="card pad"><h2 class="block-title">공모 내용</h2><p class="prose">${esc(k.desc)}</p>
          <h3 class="block-title" style="font-size:15px;margin-top:16px">혜택</h3><ul class="rules">${[k.top, ...k.benefits].map((b) => `<li>${icon('trophy', 16)}${esc(b)}</li>`).join('')}</ul></section>
        <section aria-labelledby="h-kt"><div class="section-head"><h2 id="h-kt">이 공모전 팀원 모집 ${ts.length}</h2><button class="more" data-act="new-team" data-contest="${k.id}">모집글 쓰기${icon('right', 16)}</button></div>
          ${ts.length ? `<div class="grid" style="gap:10px">${ts.map(teamCard).join('')}</div>` : `<div class="empty">${icon('users', 36)}<b>아직 팀원 모집 글이 없어요</b>먼저 팀을 만들어 보세요.</div>`}</section>
      </div>
      <aside class="detail-aside grid" style="gap:16px">
        <section class="card pad"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px">${ddayPill(k.deadline)}<span class="small muted">스크랩 ${k.scraps + (sc ? 1 : 0)} · 조회 ${k.views.toLocaleString()}</span></div>
          <p style="font-size:14.5px;margin-top:12px">${n === 0 ? '오늘 접수가 마감돼요.' : `접수 마감까지 <b>${n}일</b> 남았어요.`}</p>
          <div style="display:grid;gap:8px;margin-top:14px">
            <button class="btn btn-primary btn-lg btn-block" data-act="new-team" data-contest="${k.id}">${icon('users', 18)}이 공모전으로 팀 만들기</button>
            <a class="btn btn-outline btn-block" href="#people">${icon('search', 18)}팀을 찾는 학생 보기</a>
            <button class="btn btn-ghost btn-block fav-btn ${sc ? 'on' : ''}" data-act="fav-contest" data-id="${k.id}" aria-pressed="${sc}">${icon('heart', 18)}${sc ? '스크랩함 · 마감 3일 전에 알려드려요' : '스크랩하고 마감 알림 받기'}</button></div>
          <p class="small muted" style="margin-top:12px">데모에서는 공식 홈페이지 링크를 제공하지 않아요.</p></section>
      </aside>
    </div>
    <div class="mobile-cta"><button class="fav-btn ${sc ? 'on' : ''}" data-act="fav-contest" data-id="${k.id}" aria-pressed="${sc}" aria-label="${sc ? '스크랩 해제' : '스크랩'}">${icon('heart', 22)}</button>
      <div class="mc-price"><b>${n === 0 ? '오늘 마감' : `마감 D-${n}`}</b><span>${esc(k.prize)} · 팀원 모집 ${ts.length}</span></div><button class="btn btn-primary" data-act="new-team" data-contest="${k.id}">팀 만들기</button></div>`;
  }

  function pageTeams() {
    const roleOk = (t) => TF.role === '전체' || t.positions.some((p) => p.need > p.got && (TF.role === '개발' ? ['프론트엔드', '백엔드'].includes(p.role) : p.role === TF.role));
    const list = allTeams().filter((t) => roleOk(t) && (TF.kind === '전체' || t.kind === TF.kind)).sort((a, b) => (a.closed ? 1 : 0) - (b.closed ? 1 : 0) || a.deadline.localeCompare(b.deadline));
    return headTeams('teams', '포지션별 모집 현황을 보고 바로 지원해요') + `
    <div class="tabs" aria-label="포지션">${chipBtns('t-role', ['전체', '기획', '디자인', '개발', '영상', '마케팅', '리서치'], TF.role, (x) => (x === '전체' ? '전체 포지션' : x))}</div>
    <div class="tabs" aria-label="유형">${chipBtns('t-kind', ['전체', '공모전', '캡스톤', '사이드 프로젝트'], TF.kind, (x) => (x === '전체' ? '전체 유형' : x))}</div>
    <div class="list-head" style="margin-bottom:12px"><span class="count">모집 중 <b>${list.filter((t) => !t.closed).length}</b>건</span><button class="btn btn-primary btn-sm" data-act="new-team">${icon('plus', 16)}팀원 모집하기</button></div>
    ${list.length ? `<div class="team-grid">${list.map(teamCard).join('')}</div>` : `<div class="empty">${icon('users', 36)}<b>이 포지션을 찾는 팀이 아직 없어요</b>팀 구해요 탭에 내 카드를 올려 두면 팀장이 먼저 제안해요.</div>`}
    <div class="info-box mint" style="margin-top:20px">${icon('shield', 18)}<span><b>완주율</b>은 참여한 프로젝트를 끝까지 마친 비율이에요. 프로젝트가 끝나면 팀원끼리 서로 평가하고, 그 결과가 신뢰도에 반영돼요.</span></div>
    ${footer()}`;
  }

  function pageTeam(id) {
    const t = findTeam(id);
    if (!t) return notFound();
    const k = t.contest && findContest(t.contest), ap = S.teamApplied[t.id], open = openSlots(t);
    const applyBtn = (cls) => (t.closed || open === 0 ? `<button class="btn ${cls}" disabled>모집 마감</button>`
      : t.mine ? `<button class="btn btn-outline ${cls}" disabled>내가 올린 모집글</button>`
        : ap ? `<button class="btn btn-done ${cls}" disabled>${icon('check', 18)}${esc(ap.role)} 지원 · 검토 중</button>`
          : `<button class="btn btn-primary ${cls}" data-act="team-apply" data-id="${t.id}">${icon('send', 18)}지원하기</button>`);
    return `<a class="back-link" href="#teams">${icon('left', 18)}팀원 모집</a>
    <div class="detail-grid">
      <div class="grid" style="gap:16px">
        <section class="card pad"><div class="tc-top"><span class="kind">${t.kind}</span><span class="tc-contest"></span>${ddayPill(t.deadline, t.closed)}</div>
          <h1 class="detail-title">${esc(t.title)}</h1>
          ${k ? `<a class="contest-link" href="#contests-${k.id}"><span class="cl-emoji" style="background:${k.color}" aria-hidden="true">${k.emoji}</span><span class="cl-txt"><small>참가 공모전 · ${ddayPill(k.deadline).replace(/<[^>]+>/g, '')}</small><b>${esc(k.title)}</b></span>${icon('right', 18)}</a>` : ''}
          ${t.tags.length ? `<div class="chip-row" style="margin-top:12px">${t.tags.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>` : ''}</section>
        <section class="card pad"><h2 class="block-title">모집 포지션</h2>
          <div class="pos-table">${t.positions.map((p) => { const o = p.need - p.got; return `<div class="pos-line"><b>${esc(p.role)}</b><span class="bar"><i style="width:${Math.round((p.got / p.need) * 100)}%"></i></span><span class="small">${p.got}/${p.need}명</span>${o > 0 ? `<span class="rpill open">${o}명 모집</span>` : '<span class="rpill closed">완료</span>'}</div>`; }).join('')}</div></section>
        <div class="kv"><div><small>진행 방식</small><b>${esc(t.mode)}</b></div><div><small>기간</small><b>${esc(t.period)}</b></div><div><small>정기 회의</small><b>${esc(t.meet)}</b></div><div><small>모집 마감</small><b>${fmtDate(t.deadline)}</b></div></div>
        <section class="card pad"><h2 class="block-title">프로젝트 소개</h2><p class="prose">${esc(t.desc)}</p>
          ${t.tools.length ? `<h3 class="block-title" style="font-size:15px;margin-top:16px">사용 도구</h3><div class="chip-row">${t.tools.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>` : ''}</section>
        <section class="card pad"><h2 class="block-title">${icon('shield', 18)}팀 운영 약속</h2>
          <ul class="rules"><li>${icon('check')}첫 회의에서 역할과 마감일을 문서로 정리해요</li><li>${icon('check')}2회 연속 무단 불참하면 팀원 교체를 논의해요</li><li>${icon('check')}끝나면 서로 평가를 남기고, 완주율에 반영돼요</li></ul></section>
      </div>
      <aside class="detail-aside grid" style="gap:16px">
        <section class="card pad"><h2 class="block-title">팀장</h2>
          <div class="author-card">${avatar(t.leader.nick)}<div class="who"><b>${esc(t.leader.nick)}</b><div class="meta">${esc(t.leader.dept)}</div></div><span class="badge b-school">${icon('shield', 13)}인증</span></div>
          <div class="kv" style="margin-top:12px"><div><small>완주율</small><b>${t.leader.rate}%</b></div><div><small>완료 프로젝트</small><b>${t.leader.done}개</b></div></div>
          <div style="display:grid;gap:8px;margin-top:14px">${applyBtn('btn-lg btn-block')}${t.mine ? '' : `<button class="btn btn-outline btn-block" data-act="team-chat" data-id="${t.id}">${icon('chat', 18)}팀장에게 먼저 물어보기</button>`}</div>
          <p class="small muted" style="margin-top:10px">지원 ${t.applicants}명 · 조회 ${t.views} · ${t.created}</p>
          <div class="report-row"><button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="팀원 모집 · ${esc(t.title)}">${icon('flag', 15)}신고</button>${t.mine ? '' : `<button class="btn btn-sm btn-ghost" data-act="block" data-key="${esc(t.leader.nick)}">${icon('ban', 15)}차단</button>`}</div></section>
      </aside>
    </div>
    <div class="mobile-cta"><div class="mc-price"><b>${open > 0 && !t.closed ? `${open}자리 남음` : '모집 마감'}</b><span>${t.closed ? '' : `마감 D-${Math.max(0, dday(t.deadline))} · `}지원 ${t.applicants}명</span></div>${applyBtn('')}</div>`;
  }

  function personCard(p) {
    const sent = S.proposals.includes(p.id);
    return `<article class="person-card">
      <div class="cc-top">${avatar(p.nick)}<div class="who"><b>${esc(p.nick)}</b><span class="meta">${esc(p.dept)}</span></div></div>
      <div class="chip-row">${p.roles.map((r) => `<span class="pos open">${r}</span>`).join('')}${p.tools.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>
      <p class="cc-intro">${esc(p.intro)}</p>
      <div class="meta">관심 ${p.want.join(', ')} · ${esc(p.time)} · ${p.rate === null ? '첫 프로젝트' : `완주율 ${p.rate}%`}</div>
      <button class="btn ${sent ? 'btn-done' : 'btn-outline'} btn-block" data-act="propose" data-id="${p.id}" ${sent ? 'disabled' : ''}>${sent ? `${icon('check', 16)}제안 보냄` : '팀 제안하기'}</button>
    </article>`;
  }

  function pagePeople() {
    const list = D.people.filter((p) => !S.blocked.includes(p.nick) && (PF.role === '전체' || p.roles.includes(PF.role)));
    const me = S.myCard;
    return headTeams('people', '팀을 찾는 학생에게 먼저 제안하거나, 내 카드를 올려 제안을 받아요') + `
    <section class="my-card ${me ? 'on' : ''}">
      ${me ? `<div class="mc-left">${avatar(D.me.nick)}<div><b>내 팀원 카드 공개 중</b><span class="small">${me.roles.join(', ')} · ${esc(me.time)}${me.want.length ? ` · ${me.want.join(', ')}` : ''}</span></div></div><div style="display:flex;gap:6px"><button class="btn btn-sm btn-outline" data-act="my-card">수정</button><button class="btn btn-sm btn-ghost" data-act="my-card-off">비공개로</button></div>`
        : `<div class="mc-left"><span class="mc-ic">${icon('user', 22)}</span><div><b>나도 팀을 찾고 있어요</b><span class="small">역할과 가능한 시간을 올려 두면 팀장이 먼저 제안해요</span></div></div><button class="btn btn-primary btn-sm" data-act="my-card">팀원 카드 만들기</button>`}
    </section>
    <div class="tabs" style="margin-top:16px" aria-label="역할">${chipBtns('p-role', ['전체', ...D.roles], PF.role, (x) => (x === '전체' ? '전체 역할' : x))}</div>
    ${list.length ? `<div class="team-grid">${list.map(personCard).join('')}</div>` : `<div class="empty">${icon('users', 36)}<b>이 역할로 팀을 찾는 학생이 아직 없어요</b></div>`}
    ${footer()}`;
  }

  function pageTeamNew() {
    if (!S.verified) return `<a class="back-link" href="#teams">${icon('left', 18)}팀원 모집</a>` + gatePanel('팀원 모집');
    return `<div class="survey-wrap"><a class="back-link" href="#teams">${icon('left', 18)}팀원 모집</a>
      <div class="page-head"><div><h1>팀원 모집하기</h1><p>포지션별 인원을 정해 두면 지원자가 남은 자리를 한눈에 봐요</p></div></div>
      <form data-form="team" class="grid" style="gap:14px" novalidate>
        <section class="form-section"><h2><span class="num">1</span>어떤 프로젝트인가요?</h2>
          <div class="field"><span class="field-label">유형</span>${radioChips('kind', [['공모전', '공모전'], ['캡스톤', '캡스톤·수업'], ['사이드 프로젝트', '사이드 프로젝트']], '공모전')}</div>
          <div class="field"><label for="tn-contest">참가 공모전 (선택)</label><select class="select" id="tn-contest" name="contest"><option value="">선택 안 함</option>${D.contests.filter((k) => dday(k.deadline) >= 0).map((k) => `<option value="${k.id}" ${newTeamContest === k.id ? 'selected' : ''}>${esc(k.title)} · D-${dday(k.deadline)}</option>`).join('')}</select></div>
          <div class="field"><label for="tn-title">제목</label><input class="input" id="tn-title" name="title" maxlength="50" placeholder="예) 공공데이터 앱 공모전, 디자이너 1명 구해요" required></div></section>
        <section class="form-section"><h2><span class="num">2</span>모집 포지션</h2>
          <p class="small muted" style="margin-top:-8px">0명인 포지션은 모집하지 않아요.</p>
          <div class="pos-inputs">${D.roles.map((r) => `<label class="pos-input"><span>${r}</span><select class="select" name="pos-${r}" aria-label="${r} 모집 인원">${[0, 1, 2, 3].map((n) => `<option value="${n}">${n}명</option>`).join('')}</select></label>`).join('')}</div></section>
        <section class="form-section"><h2><span class="num">3</span>진행 방식</h2>
          <div class="field"><span class="field-label">진행</span>${radioChips('mode', [['오프라인', '오프라인'], ['온라인', '온라인'], ['혼합', '혼합']], '혼합')}</div>
          <div class="form-grid two"><div class="field"><label for="tn-period">예상 기간</label><input class="input" id="tn-period" name="period" placeholder="예) 11월 ~ 1월 (8주)"></div>
            <div class="field"><label for="tn-dl">모집 마감일</label><input class="input" id="tn-dl" type="date" name="deadline" min="2026-11-10" value="2026-11-24"></div></div>
          <div class="field"><label for="tn-meet">정기 회의</label><input class="input" id="tn-meet" name="meet" placeholder="예) 매주 수 19:00 · 중앙도서관"></div>
          <div class="field"><label for="tn-tools">사용 도구 (쉼표로 구분)</label><input class="input" id="tn-tools" name="tools" placeholder="예) Figma, React, Notion"></div></section>
        <section class="form-section"><h2><span class="num">4</span>소개</h2>
          <div class="field"><label for="tn-desc">프로젝트 소개</label><textarea class="textarea" id="tn-desc" name="desc" placeholder="무엇을 만들고, 지금 어디까지 진행됐고, 어떤 팀원을 찾는지 적어 주세요"></textarea></div>
          <div class="field"><span class="field-label">태그</span><div class="opts">${['비전공자 가능', '신입생 환영', '복학생 환영', '포트폴리오용', '학점 연계'].map((x) => `<label class="opt sm"><input type="checkbox" name="tags" value="${x}"><span>${x}</span></label>`).join('')}</div></div></section>
        <p class="error-text" id="tn-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">모집글 올리기</button>
      </form></div>`;
  }

  function openTeamApply(id) {
    const t = findTeam(id), open = t.positions.filter((p) => p.need > p.got);
    openModal(modalBox('팀 지원하기', `<p class="small muted" style="margin-bottom:14px">${esc(t.title)}</p>
      <form data-form="team-apply" data-id="${id}" class="grid" style="gap:16px">
        <div class="field"><span class="field-label">지원 포지션</span>${radioChips('role', open.map((p) => [p.role, `${p.role} · ${p.need - p.got}자리`]), open[0].role)}</div>
        <div class="field"><label for="ta-intro">한 줄 소개</label><input class="input" id="ta-intro" name="intro" maxlength="80" placeholder="예) Figma로 앱 UI 3개를 작업해 봤어요"></div>
        <div class="field"><label for="ta-pf">포트폴리오 링크 (선택)</label><input class="input" id="ta-pf" name="pf" placeholder="노션, 깃허브, 비핸스 주소"></div>
        <div class="field"><span class="field-label">일주일에 쓸 수 있는 시간</span>${radioChips('time', [['주 3시간', '~3시간'], ['주 6시간', '~6시간'], ['주 10시간 이상', '10시간 이상']], '주 6시간')}</div>
        <p class="small muted">지원서와 내 완주율은 팀장에게만 보여요.</p>
        <p class="error-text" id="ta-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">지원서 보내기</button></form>`));
  }
  function openMyCard() {
    const c = S.myCard || { roles: [], tools: '', want: [], time: '주 6시간', intro: '' };
    openModal(modalBox('팀원 카드', `<form data-form="my-card" class="grid" style="gap:16px">
      <div class="field"><span class="field-label">맡을 수 있는 역할</span><div class="opts">${D.roles.map((r) => `<label class="opt sm"><input type="checkbox" name="roles" value="${r}" ${c.roles.includes(r) ? 'checked' : ''}><span>${r}</span></label>`).join('')}</div></div>
      <div class="field"><span class="field-label">관심 분야</span><div class="opts">${D.contestCats.map((r) => `<label class="opt sm"><input type="checkbox" name="want" value="${r}" ${c.want.includes(r) ? 'checked' : ''}><span>${r}</span></label>`).join('')}</div></div>
      <div class="field"><label for="mc-tools">다룰 수 있는 도구</label><input class="input" id="mc-tools" name="tools" value="${esc(c.tools)}" placeholder="예) Figma, Python"></div>
      <div class="field"><span class="field-label">가능한 시간</span>${radioChips('time', [['주 3시간', '주 3시간'], ['주 6시간', '주 6시간'], ['주 10시간 이상', '주 10시간 이상']], c.time)}</div>
      <div class="field"><label for="mc-intro">한 줄 소개</label><input class="input" id="mc-intro" name="intro" maxlength="80" value="${esc(c.intro)}" placeholder="예) 첫 공모전 같이 나갈 팀 찾아요"></div>
      <p class="error-text" id="mc-err" role="alert"></p>
      <button class="btn btn-primary btn-lg btn-block" type="submit">카드 공개하기</button></form>`));
  }
  function openPropose(pid) {
    const p = D.people.find((x) => x.id === pid), mine = S.myTeams.filter((t) => !t.closed);
    openModal(modalBox(`${esc(p.nick)}님에게 팀 제안`, `<form data-form="propose" data-id="${pid}" class="grid" style="gap:14px">
      ${mine.length ? `<div class="field"><span class="field-label">어떤 팀으로 제안할까요?</span><div class="radio-list">${mine.map((t, i) => `<label><input type="radio" name="team" value="${t.id}" ${i === 0 ? 'checked' : ''}>${esc(t.title)}</label>`).join('')}</div></div>`
        : `<div class="info-box">${icon('alert', 18)}<span>아직 올린 모집글이 없어요. 메시지로 먼저 제안하고, 모집글은 나중에 올려도 돼요.</span></div>`}
      <div class="field"><label for="pp-msg">메시지</label><textarea class="textarea" id="pp-msg" name="msg" style="min-height:90px">안녕하세요! 팀원 카드 보고 연락드려요. ${p.roles[0]} 역할로 함께하면 좋을 것 같아요.</textarea></div>
      <button class="btn btn-primary btn-lg btn-block" type="submit">제안 보내기</button></form>`));
  }
  function openMenu() {
    const items = [['#clubs', 't-lav', 'calendar', '동아리·행사', '모집 · 행사 캘린더'], ['#contests', 't-yellow', 'trophy', '프로젝트·공모전', '공모전 · 팀원 모집'], ['#community', 't-mint', 'chats', '커뮤니티', '팁 · 질문 · 분실물'], ['#my', 't-sky', 'user', '마이페이지', '인증 · 활동 내역']];
    openModal(modalBox('전체 메뉴', `<nav class="menu-grid" aria-label="전체 메뉴">${items.map(([h, c, ic, t, s]) => `<a class="${c}" href="${h}" data-act="close-go"><span class="tile-ic" style="position:static">${icon(ic, 20)}</span><b>${t}</b><span>${s}</span></a>`).join('')}</nav>`));
  }
  function teamsMyBody() {
    const ap = Object.entries(S.teamApplied).map(([id, a]) => [findTeam(id), a]).filter(([t]) => t);
    const sc = S.scrapContests.map(findContest).filter(Boolean);
    const h = (t) => `<h3 class="block-title" style="font-size:15px;margin-top:6px">${t}</h3>`;
    const tRow = (t, right) => `<a class="list-row" href="#teams-${t.id}"><span class="lr-art" style="background:var(--peach)">${icon('users', 22)}</span><span class="lr-body"><b>${esc(t.title)}</b><span class="small muted">${t.kind} · 마감 ${fmtDate(t.deadline)}</span></span>${right}</a>`;
    const parts = [
      ap.length ? h('지원 현황') + ap.map(([t, a]) => tRow(t, `<span class="badge b-review">${esc(a.role)} · ${a.status}</span>`)).join('') : '',
      S.myTeams.length ? h('내 모집글') + S.myTeams.map((t) => tRow(t, `<span class="badge b-school">${openSlots(t)}자리 모집 중</span>`)).join('') : '',
      sc.length ? h('스크랩한 공모전') + sc.map((k) => `<a class="list-row" href="#contests-${k.id}"><span class="lr-art" style="background:${k.color}">${k.emoji}</span><span class="lr-body"><b>${esc(k.title)}</b><span class="small muted">${esc(k.host)}</span></span>${ddayPill(k.deadline)}</a>`).join('') : '',
      S.proposals.length ? h('보낸 팀 제안') + S.proposals.map((id) => { const p = D.people.find((x) => x.id === id); return p ? `<div class="list-row">${avatar(p.nick)}<span class="lr-body"><b>${esc(p.nick)}</b><span class="small muted">${p.roles.join(', ')}</span></span><span class="badge b-gray">응답 대기</span></div>` : ''; }).join('') : '',
    ].filter(Boolean);
    return parts.length ? parts.join('<div class="divider"></div>') : `<div class="empty">${icon('trophy', 36)}<b>아직 참여한 프로젝트가 없어요</b>마감이 가까운 공모전부터 둘러보세요.<div style="margin-top:12px"><a class="btn btn-primary" href="#contests">공모전 보기</a></div></div>`;
  }

  /* ── 무료 지도: Leaflet + OpenStreetMap 타일. 타일을 못 불러오면 데모 지도로 자동 전환 ── */
  const GEO = D.school.geo;
  const toLatLng = (r) => (r.lat ? [r.lat, r.lng] : [GEO.lat - 0.0016 - (r.y - 100) * 0.00003, GEO.lng + (r.x - 320) * 0.000045]);
  const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 기여자';
  let tilesOk = null; // null: 아직 모름, true: 정상, false: 차단·오프라인 → 데모 지도 사용
  let lmap = null, lmarkers = null, lastFitKey = '', mmap = null;
  const liveMapOk = () => !!window.L && tilesOk !== false;
  const campusIcon = () => L.divIcon({ className: 'lp-icon', html: `<span class="campus-pin">${icon('building', 13)}${esc(D.school.short)}</span>`, iconSize: [0, 0] });

  function makeMap(el, onFail, extra = {}) {
    el.innerHTML = '';
    el.classList.add('live');
    const map = L.map(el, Object.assign({ scrollWheelZoom: false, zoomControl: true, attributionControl: true }, extra));
    const layer = L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 19 }).addTo(map);
    let loaded = false;
    layer.on('tileload', () => { loaded = true; tilesOk = true; });
    setTimeout(() => { if (!loaded && tilesOk !== true) { tilesOk = false; onFail(); } }, 4500);
    L.marker([GEO.lat, GEO.lng], { icon: campusIcon(), interactive: false, keyboard: false }).addTo(map);
    return map;
  }

  function svgRoomMap(mapEl, list) {
    mapEl.classList.remove('live');
    mapEl.innerHTML = mapBg() + list.map((r) => `<button class="pin ${r.deal === '룸쉐어' ? 'share' : ''} ${activeRoom === r.id ? 'active' : ''}" style="left:${(r.x / 6).toFixed(1)}%;top:${(r.y / 4).toFixed(1)}%" data-act="pin" data-id="${r.id}" aria-label="${esc(r.title)}, 월 ${r.rent}만원">${r.rent}만</button>`).join('')
      + `<div class="map-legend"><span><i style="background:var(--navy-800)"></i>양도</span><span><i style="background:var(--blue-600)"></i>룸쉐어</span></div><span class="map-note">데모 지도</span><div class="map-zoom" aria-hidden="true"><span>+</span><span>−</span></div>`;
  }

  function renderRoomMap(mapEl, list) {
    if (!liveMapOk()) { if (lmap) { lmap.remove(); lmap = null; } return svgRoomMap(mapEl, list); }
    if (!lmap || lmap.getContainer() !== mapEl) {
      if (lmap) lmap.remove();
      lastFitKey = '';
      lmap = makeMap(mapEl, () => { if (lmap) { lmap.remove(); lmap = null; } if ($('#room-map')) updateRooms(); });
      lmarkers = L.layerGroup().addTo(lmap);
      mapEl.insertAdjacentHTML('beforeend', `<div class="map-legend"><span><i style="background:var(--navy-800)"></i>양도</span><span><i style="background:var(--blue-600)"></i>룸쉐어</span><span class="geo-note">${esc(GEO.label)}</span></div>`);
    }
    lmarkers.clearLayers();
    const pts = [[GEO.lat, GEO.lng]];
    list.forEach((r) => {
      const ll = toLatLng(r); pts.push(ll);
      lmarkers.addLayer(L.marker(ll, { keyboard: false, riseOnHover: true, zIndexOffset: activeRoom === r.id ? 1000 : 0,
        icon: L.divIcon({ className: 'lp-icon', iconSize: [0, 0], html: `<button class="pin ${r.deal === '룸쉐어' ? 'share' : ''} ${activeRoom === r.id ? 'active' : ''}" data-act="pin" data-id="${r.id}" aria-label="${esc(r.title)}, 월 ${r.rent}만원">${r.rent}만</button>` }) }));
    });
    const key = list.map((r) => r.id).join(',');
    if (key !== lastFitKey) { lastFitKey = key; lmap.fitBounds(pts, { padding: [40, 40], maxZoom: 16 }); }
  }

  function initMiniMap(id) {
    const el = $('#room-mini'), r = findRoom(id);
    if (mmap) { mmap.remove(); mmap = null; }
    if (!el || !r || !liveMapOk()) return;
    const fallback = el.innerHTML;
    mmap = makeMap(el, () => { if (mmap) { mmap.remove(); mmap = null; } el.classList.remove('live'); el.innerHTML = fallback; }, { dragging: !L.Browser.mobile, tap: false });
    const ll = toLatLng(r);
    L.marker(ll, { interactive: false, keyboard: false, icon: L.divIcon({ className: 'lp-icon', iconSize: [0, 0], html: `<span class="pin active">${r.rent}만</span>` }) }).addTo(mmap);
    mmap.fitBounds([ll, [GEO.lat, GEO.lng]], { padding: [44, 44], maxZoom: 16 });
  }

  /* ── 외부 앱 연결 (데이터는 가져오지 않고, 해당 앱·스토어로 보내기만 해요) ── */
  const platform = () => { const ua = navigator.userAgent || ''; if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios'; if (/Android/.test(ua)) return 'android'; return 'web'; };
  const findExt = (id) => D.externalApps.find((x) => x.id === id);
  function extCard(id) {
    const x = findExt(id);
    if (!x) return '';
    return `<section class="ext-card" aria-label="외부 앱 연결: ${esc(x.name)}">
      <span class="ext-ic" aria-hidden="true">${icon('building', 22)}</span>
      <div class="ext-body"><span class="ext-tag">외부 앱 연결</span><b>${esc(x.headline)}</b><p>${esc(x.desc)}</p></div>
      <button class="btn btn-outline btn-sm" data-act="ext-app" data-id="${x.id}">${esc(x.name)} 열기${icon('right', 15)}</button>
    </section>`;
  }
  function openExt(id) {
    const x = findExt(id), p = platform();
    const url = p === 'android' ? x.android : x.ios;
    const label = p === 'ios' ? 'App Store에서 열기' : p === 'android' ? 'Play 스토어에서 찾기' : 'App Store 페이지 보기';
    openModal(modalBox(`${esc(x.name)}(으)로 이동할게요`, `
      <p style="font-size:14.5px">${esc(x.name)}은(는) CampusMate와 <b>별개의 외부 서비스</b>예요. 매물·계약·결제는 ${esc(x.name)}과 집주인의 정책을 따라요.</p>
      <ul class="rules" style="margin-top:10px">
        <li>${icon('check')}앱이 설치돼 있으면 스토어에서 ‘열기’를 누르면 돼요</li>
        <li>${icon('check')}서비스 학교: ${esc(x.schools)}</li>
        <li>${icon('alert')}계약 전에 방을 직접 보고, 등기부등본을 확인하세요</li>
      </ul>
      <div class="modal-actions"><button class="btn btn-outline" data-act="close">취소</button><a class="btn btn-primary" href="${url}" target="_blank" rel="noopener noreferrer" data-act="close-go">${label}</a></div>
      <p class="small muted" style="margin-top:12px;text-align:center">CampusMate는 ${esc(x.name)}과 제휴 관계가 아니며, 링크만 연결해요.</p>`));
  }

  function notFound() {
    return `<div class="card empty" style="margin-top:20px">${icon('search', 40)}<b>페이지를 찾을 수 없어요</b>삭제되었거나 차단한 사용자의 글일 수 있어요.<div style="margin-top:12px"><a class="btn btn-primary" href="#home">홈으로</a></div></div>`;
  }

  /* ───────── Router ───────── */
  const main = $('#main');
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split(/[-\/]/).filter(Boolean);
    const [p = 'home', a, b] = parts;
    let html, nav = p, cta = false;
    switch (p) {
      case 'home': html = pageHome(); break;
      case 'roommate': html = a === 'survey' ? pageSurvey() : a ? (cta = true, pageMate(a)) : pageRoommate(); break;
      case 'rooms': html = a === 'new' ? pageRoomNew() : a ? (cta = true, pageRoom(a)) : pageRooms(); break;
      case 'market': html = a === 'new' ? pageItemNew() : a ? (cta = true, pageItem(a)) : pageMarket(); break;
      case 'community': html = pageCommunity(a); break;
      case 'post': html = pagePost(a); nav = 'community'; break;
      case 'write': html = pageWrite(a); nav = 'community'; break;
      case 'clubs': html = a ? (cta = true, pageClub(a)) : pageClubs(); break;
      case 'events': html = pageEvents(); nav = 'clubs'; break;
      case 'contests': html = a ? (cta = true, pageContest(a)) : pageContests(); nav = 'teams'; break;
      case 'teams': html = a === 'new' ? pageTeamNew() : a ? (cta = true, pageTeam(a)) : pageTeams(); break;
      case 'people': html = pagePeople(); nav = 'teams'; break;
      case 'my': html = pageMy(a); break;
      case 'verify': html = pageVerify(); nav = 'my'; break;
      default: html = notFound();
    }
    main.className = 'page' + (cta ? ' has-cta' : '') + (p === 'rooms' && !a ? ' wide' : '');
    main.innerHTML = html;
    renderChrome(nav);
    if (p === 'rooms' && !a) updateRooms();
    if (p === 'rooms' && a && a !== 'new') initMiniMap(a); else if (mmap) { mmap.remove(); mmap = null; }
    void b;
  }
  let lastHash = '';
  function onHash() {
    if (location.hash === "#main") { main.focus(); return; }
    const base = location.hash.split('-')[0];
    const sameBase = base === lastHash.split('-')[0] && /^#(my|community)$/.test(base);
    lastHash = location.hash;
    route();
    if (!sameBase) window.scrollTo({ top: 0, behavior: "instant" });
  }

  function renderChrome(nav) {
    $$('.desk-nav a').forEach((a) => { const on = a.dataset.nav === nav; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
    const tabs = [['home', 'home', '홈'], ['roommate', 'users', '룸메이트'], ['rooms', 'door', '방 찾기'], ['market', 'bag', '거래'], ['my', 'user', '마이페이지']];
    const tabNav = ['community', 'clubs', 'teams'].includes(nav) ? 'home' : nav;
    $('#tabbar').innerHTML = `<div class="tabbar-pill">${tabs.map(([k, ic, l]) => `<a href="#${k}" class="${tabNav === k ? 'active' : ''}" aria-label="${l}" ${tabNav === k ? 'aria-current="page"' : ''}>${icon(ic, 22)}<span class="tl" aria-hidden="true">${l}</span></a>`).join('')}</div>`;
    $('#top-actions').innerHTML = `
      <button class="icon-btn mobile-only" data-act="menu" aria-label="전체 메뉴">${icon('grid', 22)}</button>
      <button class="icon-btn" data-act="notif" aria-label="알림 3개">${icon('bell', 22)}<span class="dot"></span></button>
      ${S.verified ? `<a class="verify-pill on" href="#my">${icon('shield', 16)}<span class="vp-txt">인증 완료</span></a>` : `<a class="verify-pill off" href="#verify">${icon('shield', 16)}<span class="vp-txt">학교 인증</span></a>`}`;
  }

  /* ───────── Modal / toast / chat ───────── */
  const slot = $('#modal-slot');
  let lastFocus = null;
  function openModal(html, cls = '') {
    lastFocus = document.activeElement;
    slot.innerHTML = `<div class="modal-root ${cls}" data-root>${html}</div>`;
    document.body.style.overflow = 'hidden';
    const f = slot.querySelector('[autofocus], input:not([type=hidden]), textarea, button');
    setTimeout(() => f && f.focus(), 30);
  }
  function closeModal() { slot.innerHTML = ''; document.body.style.overflow = ''; chat = null; if (lastFocus && document.contains(lastFocus)) lastFocus.focus(); }
  const modalBox = (title, body, actions = '') => `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="modal-head"><h2 id="mtitle">${title}</h2><button class="icon-btn" data-act="close" aria-label="닫기">${icon('x')}</button></div>${body}${actions}</div>`;
  function toast(msg, ic = 'check') {
    const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = `${icon(ic, 18)}<span>${msg}</span>`;
    $('#toasts').appendChild(el); setTimeout(() => el.remove(), 2600);
  }
  function needVerify(what = '이 기능') {
    if (S.verified) return false;
    openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:var(--mint-100);color:var(--mint-800)">${icon('lock', 30)}</div>
      <h2 id="mtitle">학교 인증이 필요해요</h2><p class="muted" style="margin-top:8px;font-size:14.5px">${what}은(는) ${D.school.name} 이메일 인증을 마친 학생만 이용할 수 있어요. 1분이면 끝나요!</p>
      <div class="modal-actions"><button class="btn btn-outline" data-act="close">나중에</button><a class="btn btn-primary" href="#verify" data-act="close-go">인증하기</a></div></div>`);
    return true;
  }

  function openReport(label, fake) {
    const reasons = fake ? ['허위 매물 (존재하지 않거나 사진과 다름)', '선입금·가계약금 요구', '중개업자·광고 매물', '욕설·비하·불쾌한 표현', '기타'] : ['사기 의심', '욕설·비하·혐오 표현', '스팸·광고', '개인정보 노출', '음란·불쾌한 내용', '기타'];
    openModal(modalBox('신고하기', `<p class="small muted" style="margin-bottom:12px">신고 대상: <b>${esc(label)}</b><br>신고자 정보는 상대에게 공개되지 않아요.</p>
      <form data-form="report" data-label="${esc(label)}"><div class="radio-list">${reasons.map((r, i) => `<label><input type="radio" name="reason" value="${r}" ${i === 0 ? 'checked' : ''}>${r}</label>`).join('')}</div>
      <textarea class="textarea" name="detail" style="min-height:80px;margin-top:10px" placeholder="자세한 상황을 적어 주시면 더 빨리 처리돼요 (선택)" aria-label="상세 내용"></textarea>
      <div class="modal-actions"><button type="button" class="btn btn-outline" data-act="close">취소</button><button class="btn btn-coral" type="submit">신고 접수</button></div></form>`));
  }
  function openBlock(key) {
    const name = key.startsWith('anon') ? '이 익명 사용자' : `‘${key}’님`;
    openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:var(--coral-100);color:var(--coral-800)">${icon('ban', 30)}</div>
      <h2 id="mtitle">${esc(name)}을(를) 차단할까요?</h2><p class="muted" style="margin-top:8px;font-size:14.5px">차단하면 서로의 글·매물·댓글이 보이지 않고 채팅도 할 수 없어요. 마이페이지에서 언제든 해제할 수 있어요.</p>
      <div class="modal-actions"><button class="btn btn-outline" data-act="close">취소</button><button class="btn btn-coral" data-act="block-confirm" data-key="${esc(key)}">차단하기</button></div></div>`);
  }
  function openReview(id) {
    const d = D.deals.find((x) => x.id === id);
    const tags = ['시간 약속을 잘 지켜요', '친절해요', '상품 상태가 설명과 같아요', '응답이 빨라요', '좋은 가격에 거래했어요'];
    openModal(modalBox('거래 후기 남기기', `<p class="small muted" style="margin-bottom:12px"><b>${esc(d.with)}</b>님과의 거래 · ${esc(d.title)}</p>
      <form data-form="review" data-id="${id}"><fieldset style="border:0"><legend class="sr-only">별점</legend><div class="star-input">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="st${n}" name="stars" value="${n}" ${n === 5 ? 'checked' : ''}><label for="st${n}" aria-label="${n}점">★</label>`).join('')}</div></fieldset>
      <div class="opts" style="margin-top:14px">${tags.map((t, i) => `<label class="opt sm"><input type="checkbox" name="tags" value="${t}" ${i === 0 ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div>
      <textarea class="textarea" name="text" style="min-height:80px;margin-top:12px" placeholder="다른 학생들에게 도움이 되는 후기를 남겨 주세요 (선택)" aria-label="후기 내용"></textarea>
      <p class="small muted" style="margin-top:8px">후기는 상대방도 후기를 남긴 뒤 동시에 공개돼요 (상호 후기).</p>
      <div class="modal-actions"><button class="btn btn-primary btn-lg" type="submit">후기 보내기</button></div></form>`));
  }
  function openNotif() {
    const list = [['heart', '도서관지박령님이 회원님에게 관심을 보냈어요', '10분 전', '#roommate-m1'], ['door', '찜한 ‘정문 도보 5분 풀옵션 원룸’ 월세가 2만 원 내렸어요', '1시간 전', '#rooms-r1'], ['chat', '내 게시글에 새 댓글이 달렸어요', '어제', '#post-p1']];
    openModal(modalBox('알림', `<div>${list.map(([ic, t, w, h]) => `<a class="list-row" href="${h}" data-act="close-go"><span class="lr-art" style="width:42px;height:42px;background:var(--blue-50);color:var(--navy-800)">${icon(ic, 20)}</span><span class="lr-body"><span style="font-size:14px;font-weight:600">${t}</span><br><span class="small muted">${w}</span></span></a>`).join('')}</div>`));
  }

  /* chat */
  let chat = null;
  function openChat(key, opt) {
    if (S.blocked.includes(opt.name)) return toast('차단한 사용자와는 채팅할 수 없어요', 'ban');
    if (!S.chats[key]) S.chats[key] = [{ t: 'them', text: opt.greeting, at: nowTime() }];
    chat = { key, ...opt, typing: false };
    lastFocus = document.activeElement;
    slot.innerHTML = `<div class="modal-root chat-root" data-root><section class="chat" role="dialog" aria-modal="true" aria-label="${esc(opt.name)}님과의 채팅">
      <header class="chat-head"><button class="icon-btn" data-act="close" aria-label="채팅 닫기">${icon('left', 22)}</button>${avatar(opt.name, 'sm')}
        <div class="who"><b>${esc(opt.name)} <span class="badge b-school">${icon('shield', 13)}인증</span></b><span class="small muted">신뢰도 ${opt.trust} · 보통 10분 내 응답</span></div>
        <button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="채팅 · ${esc(opt.name)}">${icon('flag', 15)}신고</button></header>
      ${opt.ctx || ''}
      <div class="chat-body" id="chat-body" aria-live="polite"></div>
      ${opt.quick ? `<div class="chat-quick">${opt.quick.map((q) => `<button data-act="chat-quick" data-text="${esc(q)}">${esc(q)}</button>`).join('')}</div>` : ''}
      <form class="chat-form" data-form="chat"><input class="input" name="msg" placeholder="메시지 보내기" aria-label="메시지 입력" autocomplete="off"><button class="btn btn-primary" type="submit" aria-label="보내기">${icon('send', 18)}</button></form>
    </section></div>`;
    document.body.style.overflow = 'hidden';
    renderMsgs();
    setTimeout(() => $('.chat-form .input')?.focus(), 30);
  }
  function renderMsgs() {
    const box = $('#chat-body'); if (!box || !chat) return;
    const msgs = S.chats[chat.key];
    box.innerHTML = `<div class="msg sys">${icon('shield', 16)}<span>학교 인증 학생끼리의 대화예요. <b>직접 만나 확인하기 전에는 절대 송금하지 마세요.</b> 외부 메신저 유도·선입금 요구는 신고해 주세요.</span></div>`
      + msgs.map((m) => `<div class="msg ${m.t}">${esc(m.text)}</div><span class="msg-time ${m.t === 'them' ? 'l' : ''}">${m.at}</span>`).join('')
      + (chat.typing ? '<span class="typing">상대가 입력 중…</span>' : '');
    box.scrollTop = box.scrollHeight;
  }
  function sendChat(text) {
    if (!chat || !text.trim()) return;
    const c = chat;
    S.chats[c.key].push({ t: 'me', text: text.trim(), at: nowTime() }); save();
    c.typing = true; renderMsgs();
    if (/계좌|입금|송금|선입금/.test(text)) toast('송금은 직접 만나 확인한 뒤에 해 주세요', 'alert');
    setTimeout(() => {
      if (chat !== c) return;
      const replies = c.replies || ['네 좋아요!'];
      const idx = S.chats[c.key].filter((m) => m.t === 'them').length - 1;
      S.chats[c.key].push({ t: 'them', text: replies[idx % replies.length], at: nowTime() });
      c.typing = false; save(); renderMsgs();
    }, 1100);
  }
  const ctxBar = (art, title, sub, bg) => `<div class="chat-ctx"><span class="cx-art" style="background:${bg || '#EEF1F5'}">${art}</span><div style="min-width:0"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(title)}</b><span class="muted">${sub}</span></div></div>`;

  /* ───────── Events ───────── */
  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-root]');
    if (root && e.target === root) return closeModal();
    if (rfOpen && !e.target.closest('#rf, .fpill')) closeFilter();
    const el = e.target.closest('[data-act]');
    if (!el) {
      const card = e.target.closest('[data-href]');
      if (card && !e.target.closest('a,button,input,label,select')) location.hash = card.dataset.href;
      return;
    }
    const act = el.dataset.act, id = el.dataset.id;
    if (el.tagName === 'BUTTON' || act === 'close') e.preventDefault();
    switch (act) {
      case 'close': closeModal(); break;
      case 'close-go': slot.innerHTML = ''; document.body.style.overflow = ''; chat = null; break;
      case 'notif': openNotif(); break;
      case 'ext-app': openExt(id); break;
      case 'menu': openMenu(); break;
      case 'fav-contest': { const on = toggleIn(S.scrapContests, id); save(); route(); toast(on ? '스크랩했어요. 마감 3일 전에 알려드릴게요' : '스크랩을 해제했어요', 'heart'); break; }
      case 'k-cat': KF.cat = el.dataset.v; route(); break;
      case 'k-campus': KF.campus = !KF.campus; route(); break;
      case 't-role': TF.role = el.dataset.v; route(); break;
      case 't-kind': TF.kind = el.dataset.v; route(); break;
      case 'p-role': PF.role = el.dataset.v; route(); break;
      case 'new-team': if (needVerify('팀원 모집')) return; newTeamContest = el.dataset.contest || ''; if (location.hash === '#teams-new') route(); else location.hash = '#teams-new'; break;
      case 'team-apply': if (needVerify('팀 지원')) return; openTeamApply(id); break;
      case 'team-chat': {
        if (needVerify('팀장 문의')) return;
        const t = findTeam(id), k = t.contest && findContest(t.contest);
        openChat('team-' + id, { name: t.leader.nick, trust: t.leader.trust, greeting: '안녕하세요! 모집글 보고 오셨나요? 궁금한 점 편하게 물어보세요.',
          ctx: ctxBar(k ? k.emoji : '🛠️', t.title, `${openSlots(t)}자리 남음 · 마감 ${fmtDate(t.deadline)}`, k ? k.color : '#EEEDF4'),
          quick: ['어떤 역할을 맡게 되나요?', '회의는 꼭 오프라인인가요?', '경험이 적어도 괜찮을까요?', '지금 진행 상황이 궁금해요'],
          replies: ['첫 회의에서 역할표를 같이 정해요. 원하는 파트가 있으면 먼저 말해 주세요!', `정기 회의는 ${t.meet}이에요. 사정이 있으면 온라인 참여도 괜찮아요.`, '괜찮아요. 꾸준히 참여해 주시는 게 제일 중요해요.', '기획서 초안까지 나왔어요. 합류하시면 노션 페이지 공유드릴게요.'] });
        break;
      }
      case 'propose': if (needVerify('팀 제안')) return; openPropose(id); break;
      case 'my-card': if (needVerify('팀원 카드 공개')) return; openMyCard(); break;
      case 'my-card-off': S.myCard = null; save(); route(); toast('팀원 카드를 비공개로 바꿨어요', 'lock'); break;
      case 'club-follow': { const on = toggleIn(S.followClubs, id); save(); route(); toast(on ? '관심 동아리로 등록했어요. 모집·행사 소식을 알려드릴게요' : '관심 동아리에서 뺐어요', 'heart'); break; }
      case 'club-apply': if (needVerify('동아리 지원')) return; openApply(id); break;
      case 'club-chat': {
        if (needVerify('운영진 문의')) return;
        const c = findClub(id);
        openChat('club-' + id, { name: `${c.name} 운영진`, trust: 94, greeting: `안녕하세요, ${c.name}입니다! 궁금한 점 편하게 물어보세요 🙂`,
          ctx: ctxBar(c.emoji, c.name, esc(c.recruit.title), c.color),
          quick: ['첫 모임은 언제예요?', '복학생도 괜찮나요?', '회비는 어디에 쓰여요?', '뒤풀이 참석은 필수인가요?'],
          replies: [`다음 정기 모임은 ${c.day}이에요. 구경만 오셔도 괜찮아요!`, '물론이죠. 신입생·복학생 모두 환영해요.', '회비는 장소 대관과 행사 준비에 쓰고, 학기 말에 사용 내역을 공개해요.', '뒤풀이는 자율이고 술도 강요하지 않아요.'] });
        break;
      }
      case 'club-cat': CF.cat = el.dataset.cat; route(); break;
      case 'club-flt': CF[el.dataset.k] = !CF[el.dataset.k]; route(); break;
      case 'stype': S.stype = el.dataset.v; save(); route(); break;
      case 'ev-week': { evWeek = Math.max(0, Math.min(2, evWeek + +el.dataset.dir)); const days = weekDays(); evDay = (days.find((d) => d.s === TODAY) || days.find((d) => d.has) || days[0]).s; route(); break; }
      case 'ev-day': evDay = el.dataset.day; route(); break;
      case 'ev-filter': evFilter = el.dataset.k; route(); break;
      case 'event-join': { if (needVerify('행사 참여')) return; const on = toggleIn(S.going, id); save(); route(); toast(on ? '참여 예정에 추가했어요. 하루 전에 알려드릴게요' : '참여를 취소했어요', on ? 'calendar' : 'x'); break; }
      case 'interest': {
        if (needVerify('룸메이트 관심 보내기')) return;
        const c = D.mates.find((x) => x.id === id);
        const added = toggleIn(S.interests, id); save(); route();
        if (added && c.likedMe) {
          openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:var(--mint-100);color:var(--mint-800)">${icon('heart', 30)}</div>
            <h2 id="mtitle">서로 관심을 보냈어요! 🎉</h2><p class="muted" style="margin-top:8px;font-size:14.5px"><b>${esc(c.nick)}</b>님도 회원님에게 관심을 보냈어요. 이제 전체 프로필을 보고 채팅할 수 있어요.</p>
            <div class="modal-actions"><a class="btn btn-outline" href="#roommate-${c.id}" data-act="close-go">프로필 보기</a><button class="btn btn-mint" data-act="mate-chat" data-id="${c.id}">${icon('chat', 18)}채팅 시작</button></div></div>`);
        } else toast(added ? '관심을 보냈어요. 상대도 관심을 누르면 채팅이 열려요' : '관심을 취소했어요', added ? 'heart' : 'x');
        break;
      }
      case 'mate-chat': {
        const c = D.mates.find((x) => x.id === id); if (!c) return;
        const m = match(c);
        openChat('mate-' + id, { name: c.nick, trust: c.trust, greeting: `안녕하세요! 호환도 ${m.score}% 떠서 반가웠어요 😊 혹시 ${c.dorm} 신청하시는 거 맞으세요?`,
          ctx: ctxBar(ring(m.score, 40), `룸메이트 매칭 · 호환도 ${m.score}%`, esc(m.reasons[0] || ''), '#fff'),
          quick: ['저도 그 기숙사 신청해요!', '보통 몇 시에 주무세요?', '청소는 어떻게 나눌까요?', '학생회관에서 한번 만나요'],
          replies: ['네 맞아요! 저는 보통 자정쯤 자요. 알람은 진동으로 해요.', '청소는 주 1회 번갈아 하면 어떨까요? 화장실은 격주로요!', '좋아요! 이번 주 목요일 수업 끝나고 학생회관 1층 어떠세요?', '규칙은 만나서 같이 정리해 봐요 🙂'] });
        break;
      }
      case 'room-chat': {
        if (needVerify('매물 문의')) return;
        const r = findRoom(id);
        openChat('room-' + id, { name: r.author.nick, trust: r.author.trust, greeting: '안녕하세요! 매물 보고 연락 주셨나요? 궁금한 점 편하게 물어보세요.',
          ctx: ctxBar(roomArt(r.seed), r.title, `월 ${r.rent}만 · 보증금 ${r.deposit}만`),
          quick: ['방 직접 보러 가도 될까요?', '집주인 양도 동의 받으셨나요?', '관리비에 뭐가 포함돼요?', '등기부등본 확인 가능할까요?'],
          replies: ['네! 평일 저녁 6시 이후나 주말 언제든 방문 가능해요.', '네 집주인분께 이미 동의 받았어요. 계약은 집주인분과 직접 하시면 돼요.', '수도랑 인터넷 포함이에요. 전기·가스는 따로 나와요.', '물론이죠. 방문하실 때 같이 확인하셔도 돼요.'] });
        break;
      }
      case 'item-chat': {
        if (needVerify('채팅')) return;
        const i = findItem(id);
        openChat('item-' + id, { name: i.seller.nick, trust: i.seller.trust, greeting: `안녕하세요! ‘${i.title}’ 아직 ${i.price === 0 ? '나눔' : '판매'} 중이에요.`,
          ctx: ctxBar(i.emoji, i.title, won(i.price), CAT_BG[i.cat]),
          quick: D.safePlaces.map((p) => `${p.name}에서 만날까요?`).concat(['오늘 거래 가능하세요?']),
          replies: ['좋아요! 그럼 그 장소에서 뵐게요. 몇 시가 편하세요?', '오후 5시 어떠세요? 도착하면 채팅 남길게요.', '네 직접 보시고 결정하셔도 괜찮아요 😊', '감사합니다! 거래 끝나고 서로 후기 남겨요.'] });
        break;
      }
      case 'chat-quick': sendChat(el.dataset.text); break;
      case 'fav-room': case 'fav-item': {
        const arr = act === 'fav-room' ? S.favRooms : S.favItems;
        const on = toggleIn(arr, id); save();
        if (location.hash === '#rooms') updateRooms(); else route();
        toast(on ? '찜 목록에 담았어요' : '찜을 해제했어요', 'heart');
        break;
      }
      case 'pin': {
        activeRoom = id; updateRooms();
        const card = $(`.room-card[data-room="${id}"]`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
      case 'rf-pop': openFilter(el.dataset.g); break;
      case 'rf-close': closeFilter(); break;
      case 'rf-reset': { const was = rfOpen; Object.assign(RF, RF_DEFAULT()); RF.q = ''; rfOpen = null; const q = $('#room-q'); if (q) q.value = ''; const rf = $('#rf'); if (rf) rf.outerHTML = filtersPanel(); $$('.scrim').forEach((s) => s.remove()); document.body.style.overflow = ''; updateRooms(); if (was) openFilter(was); break; }
      case 'cat': marketCat = el.dataset.cat; route(); break;
      case 'gal': {
        $('#gal-main').innerHTML = roomArt(+el.dataset.seed) + `<span class="photo-count">${icon('camera', 13)}${el.dataset.i} / ${el.dataset.total}</span>`;
        $$('.gallery .thumbs button').forEach((b) => b.classList.toggle('active', b === el));
        break;
      }
      case 'report': openReport(el.dataset.label, el.dataset.fake); break;
      case 'block': if (needVerify('차단')) return; openBlock(el.dataset.key); break;
      case 'block-confirm': S.blocked.push(el.dataset.key); save(); closeModal(); toast('차단했어요. 해당 사용자의 콘텐츠가 숨겨져요', 'ban');
        if (/^#(roommate|rooms|market|post)-./.test(location.hash) && !location.hash.includes('-survey')) history.back(); else route(); break;
      case 'unblock': S.blocked = S.blocked.filter((b) => b !== el.dataset.key); save(); route(); toast('차단을 해제했어요'); break;
      case 'like-post': if (needVerify('공감')) return; toggleIn(S.likedPosts, id); save(); route(); break;
      case 'share': try { Promise.resolve(navigator.clipboard && navigator.clipboard.writeText(location.href)).then(() => toast('링크를 복사했어요'), () => toast('주소창의 링크를 복사해 주세요', 'alert')); } catch (err) { toast('주소창의 링크를 복사해 주세요', 'alert'); } break;
      case 'review': openReview(id); break;
      case 'id-verify': S.idVerified = true; save(); route(); toast('신원 인증을 완료했어요 (데모) · 신뢰도 +4', 'id'); break;
      case 'v-back': V.step = 1; route(); break;
      case 'addr-search': { const inp = $('#rn-addr'); inp.value = '충청북도 충주시 대소원면 대학로 (예시)'; toast('주소 검색 결과를 넣었어요 (데모)', 'pin'); break; }
      case 'reset': openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:var(--amber-100);color:var(--amber-800)">${icon('refresh', 30)}</div><h2 id="mtitle">데모 데이터를 초기화할까요?</h2><p class="muted" style="margin-top:8px;font-size:14.5px">인증 상태, 찜, 작성한 글이 모두 지워져요.</p><div class="modal-actions"><button class="btn btn-outline" data-act="close">취소</button><button class="btn btn-primary" data-act="reset-confirm">초기화</button></div></div>`); break;
      case 'reset-confirm': closeModal(); S = defaults(); save(); V.step = 1; location.hash = '#home'; route(); toast('초기화했어요', 'refresh'); break;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (rfOpen) closeFilter();
      else if (slot.innerHTML) closeModal();
    }
    if (e.key === 'Enter' && e.target.matches('[data-href]')) location.hash = e.target.dataset.href;
  });

  const onFilterInput = (e) => {
    if (e.target.closest('#rf')) { readFilters(); updateRooms(); }
    if (e.target.id === 'room-q') { RF.q = e.target.value.trim(); updateRooms(); }
    if (e.target.id === 'room-sort') { RF.sort = e.target.value; updateRooms(); }
  };
  document.addEventListener('input', onFilterInput);
  document.addEventListener('change', (e) => {
    onFilterInput(e);
    if (e.target.id === 'k-sort') { KF.sort = e.target.value; route(); }
    const inp = e.target;
    if (inp.type === 'file' && inp.dataset.preview) {
      const box = document.getElementById(inp.dataset.preview);
      box.innerHTML = [...inp.files].slice(0, 10).map((f) => f.type.startsWith('image/') ? `<img src="${URL.createObjectURL(f)}" alt="${esc(f.name)} 미리보기">` : `<div class="pv">${icon('file', 20)}${esc(f.name.slice(0, 14))}</div>`).join('');
    }
  });

  const FRAUD = /(선입금|가계약금|먼저\s*송금|입금\s*먼저|계좌|카톡\s*아이디|오픈채팅|텔레그램|open\.kakao)/i;
  document.addEventListener('submit', (e) => {
    const f = e.target; const kind = f.dataset.form; if (!kind) return;
    e.preventDefault();
    const fd = new FormData(f);
    switch (kind) {
      case 'survey': {
        const sv = { gender: fd.get('gender') };
        D.questions.forEach((q) => {
          if (q.type === 'multi') sv[q.k] = fd.getAll(q.k);
          else if (q.type === 'select') sv[q.k] = fd.get(q.k);
          else sv[q.k] = +fd.get(q.k);
          S.weights[q.k] = +fd.get('w_' + q.k);
        });
        S.survey = sv; save(); location.hash = '#roommate'; toast('생활 습관을 저장했어요. 호환도를 다시 계산했어요', 'sparkle');
        break;
      }
      case 'v-email': {
        const idv = String(fd.get('id') || '').trim().replace(/@.*/, '');
        if (!/^[A-Za-z0-9._-]{2,}$/.test(idv)) { $('#v-err').textContent = '영문·숫자로 된 학교 메일 아이디를 2자 이상 입력해 주세요.'; return; }
        V.email = `${idv}@${D.school.domain}`; V.code = String(100000 + Math.floor(Math.random() * 900000)); V.step = 2; route();
        toast('인증번호를 보냈어요 (데모)', 'mail'); break;
      }
      case 'v-code': {
        if (String(fd.get('code')).trim() !== V.code) { $('#v-err').textContent = '인증번호가 일치하지 않아요. 다시 확인해 주세요.'; return; }
        S.verified = true; S.email = V.email; V.step = 3; save(); route(); toast('학교 인증을 완료했어요!', 'shield'); break;
      }
      case 'report': {
        S.reports.unshift({ target: f.dataset.label, reason: fd.get('reason'), date: new Date().toISOString().slice(0, 10).replace(/-/g, '.') }); save();
        closeModal(); toast('신고가 접수됐어요. 24시간 안에 검토할게요', 'flag'); break;
      }
      case 'review': {
        S.reviewed.push(f.dataset.id); S.trustBonus += 2; save(); closeModal(); route();
        toast('후기를 보냈어요. 상대도 후기를 남겨 신뢰도가 +2 올랐어요', 'star'); break;
      }
      case 'comment': {
        if (needVerify('댓글 쓰기')) return;
        const text = String(fd.get('text') || '').trim(); if (!text) return;
        const pid = f.dataset.id;
        (S.comments[pid] = S.comments[pid] || []).push({ id: 'uc' + Date.now(), anon: !!fd.get('anon'), author: fd.get('anon') ? 'anon-me' : D.me.nick, text, time: '방금', likes: 0, mine: true });
        save(); route(); toast('댓글을 등록했어요'); break;
      }
      case 'post': {
        const title = String(fd.get('title') || '').trim(), body = String(fd.get('body') || '').trim();
        if (!title || !body) { $('#post-err').textContent = '제목과 내용을 모두 입력해 주세요.'; return; }
        const p = { id: 'up' + Date.now(), board: fd.get('board'), anon: !!fd.get('anon'), author: fd.get('anon') ? 'anon-me' : D.me.nick, title, body, time: '방금', likes: 0, views: 1, comments: [], mine: true };
        S.myPosts.unshift(p); save(); location.hash = '#post-' + p.id; toast('글을 등록했어요'); break;
      }
      case 'item': {
        const title = String(fd.get('title') || '').trim();
        if (!title) { $('#item-err').textContent = '제목을 입력해 주세요.'; return; }
        if (FRAUD.test(title + fd.get('desc'))) { $('#item-err').textContent = '외부 연락처·계좌·선입금 관련 문구는 등록할 수 없어요. 채팅으로 안전하게 대화해 주세요.'; return; }
        const cat = fd.get('cat'); const price = cat === '무료 나눔' ? 0 : Math.max(0, +fd.get('price') || 0);
        const it = { id: 'ui' + Date.now(), cat: price === 0 ? '무료 나눔' : cat, emoji: { 전공책: '📕', 생활용품: '🧴', 전자기기: '🔌', 가구: '🛋️', '무료 나눔': '🎁' }[price === 0 ? '무료 나눔' : cat], title, price, cond: fd.get('cond'), place: fd.get('place'), time: '방금', likes: 0, chats: 0,
          seller: { nick: D.me.nick, trust: myTrust(), reviews: D.myReviews.length, dept: S.survey.dept }, desc: String(fd.get('desc') || '').trim() || '설명이 없어요.' };
        S.myItems.unshift(it); save(); location.hash = '#market-' + it.id; toast('거래 글을 등록했어요'); break;
      }
      case 'room': {
        const err = $('#room-err');
        const title = String(fd.get('title') || '').trim(), addr = String(fd.get('addr') || '').trim();
        const deposit = +fd.get('deposit'), rent = +fd.get('rent'), desc = String(fd.get('desc') || '');
        if (!title || !addr || !fd.get('deposit') || !fd.get('rent')) { err.textContent = '제목, 주소, 보증금, 월세는 꼭 입력해 주세요.'; return; }
        if (!fd.get('agree')) { err.textContent = '임대인 동의 및 허위 매물 정책에 동의해 주세요.'; return; }
        if (FRAUD.test(title + desc)) { err.textContent = '허위 매물 필터: 선입금·계좌·외부 메신저 유도 문구가 포함되어 있어요. 해당 문구를 지워 주세요.'; return; }
        const hasProof = f.querySelector('[name=proof]').files.length > 0;
        const r = { id: 'ur' + Date.now(), seed: Math.floor(Math.random() * 8), deal: fd.get('deal'), type: fd.get('type'), title, area: addr.split(' ').slice(1, 2).join(' ') || '한빛동', size: '-', floor: '-',
          deposit, rent, maint: +fd.get('maint') || 0, maintIncl: '작성자 문의', avail: fd.get('avail') || '2027-01-01', months: +fd.get('months') || 12, until: '-', dist: 700, walk: 9,
          gender: fd.get('gender'), smoke: fd.get('smoke'), options: fd.getAll('options'), badges: hasProof ? ['school', 'proof'] : ['school'], status: 'review',
          x: 200 + Math.random() * 260, y: 240 + Math.random() * 80, photos: Math.max(1, f.querySelector('[name=photos]').files.length), posted: '방금', views: 0, likes: 0,
          author: { nick: D.me.nick, trust: myTrust(), deals: D.deals.length, dept: S.survey.dept }, desc: desc || '설명이 없어요.', share: null };
        S.myRooms.unshift(r); save();
        openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:var(--blue-50);color:var(--blue-600)">${icon('file', 30)}</div>
          <h2 id="mtitle">검토 요청을 보냈어요</h2><p class="muted" style="margin-top:8px;font-size:14.5px">${hasProof ? '거주 증빙을 확인하는 동안(보통 3시간 이내) ‘증빙 검토 중’으로 표시돼요.' : '거주 증빙이 없어 ‘학교 인증’ 배지만 표시돼요. 증빙을 추가하면 신뢰도가 올라가요.'}</p>
          ${rent > 0 && rent < 20 ? `<div class="info-box amber" style="margin-top:12px;text-align:left">${icon('alert', 18)}<span>주변 시세보다 월세가 많이 낮아 운영팀이 한 번 더 확인할 수 있어요.</span></div>` : ''}
          <div class="modal-actions"><a class="btn btn-primary" href="#rooms-${r.id}" data-act="close-go">내 매물 보기</a></div></div>`);
        break;
      }
      case 'team': {
        const title = String(fd.get('title') || '').trim();
        const positions = D.roles.map((r) => ({ role: r, need: +fd.get('pos-' + r) || 0, got: 0 })).filter((p) => p.need > 0);
        if (!title) { $('#tn-err').textContent = '제목을 입력해 주세요.'; return; }
        if (!positions.length) { $('#tn-err').textContent = '모집할 포지션을 하나 이상 정해 주세요.'; return; }
        if (FRAUD.test(title + fd.get('desc'))) { $('#tn-err').textContent = '외부 연락처·계좌 관련 문구는 올릴 수 없어요. 연락은 앱 채팅으로 해 주세요.'; return; }
        const t = { id: 'ut' + Date.now(), kind: fd.get('kind'), contest: fd.get('contest') || null, title,
          leader: { nick: D.me.nick, dept: `${S.survey.dept} ${D.questions.find((q) => q.k === 'grade').opts[S.survey.grade]}`, trust: myTrust(), done: 2, rate: 100 },
          positions, mode: fd.get('mode'), period: String(fd.get('period') || '').trim() || '협의', meet: String(fd.get('meet') || '').trim() || '협의',
          tools: String(fd.get('tools') || '').split(',').map((x) => x.trim()).filter(Boolean), deadline: fd.get('deadline') || '2026-11-24',
          tags: fd.getAll('tags'), created: '방금', views: 1, applicants: 0, desc: String(fd.get('desc') || '').trim() || '소개가 없어요.', mine: true };
        S.myTeams.unshift(t); save(); newTeamContest = ''; location.hash = '#teams-' + t.id; toast('모집글을 올렸어요', 'users'); break;
      }
      case 'team-apply': {
        if (!String(fd.get('intro') || '').trim()) { $('#ta-err').textContent = '한 줄 소개를 적어 주세요. 팀장이 가장 먼저 보는 내용이에요.'; return; }
        S.teamApplied[f.dataset.id] = { role: fd.get('role'), status: '검토 중' }; save(); closeModal(); route();
        toast('지원서를 보냈어요. 결과는 알림으로 알려드릴게요', 'send'); break;
      }
      case 'my-card': {
        const roles = fd.getAll('roles');
        if (!roles.length) { $('#mc-err').textContent = '맡을 수 있는 역할을 하나 이상 골라 주세요.'; return; }
        S.myCard = { roles, want: fd.getAll('want'), tools: String(fd.get('tools') || ''), time: fd.get('time'), intro: String(fd.get('intro') || '') };
        save(); closeModal(); route(); toast('팀원 카드를 공개했어요. 제안이 오면 알려드릴게요', 'user'); break;
      }
      case 'propose': {
        S.proposals.push(f.dataset.id); save(); closeModal(); route();
        toast('제안을 보냈어요. 상대가 수락하면 채팅이 열려요', 'send'); break;
      }
      case 'apply': {
        const c = findClub(f.dataset.id);
        if (!fd.getAll('days').length) { $('#ap-err').textContent = '활동 가능한 요일을 하나 이상 골라 주세요.'; return; }
        S.stype = fd.get('stype') || S.stype; S.applied[c.id] = '서류 검토 중'; save(); closeModal(); route();
        toast(`${c.name}에 지원했어요. 결과는 알림으로 알려드릴게요`, 'send'); break;
      }
      case 'club-q': {
        if (needVerify('동아리에 질문하기')) return;
        const q = String(fd.get('q') || '').trim(); if (!q) return;
        const cid = f.dataset.id;
        (S.clubQ[cid] = S.clubQ[cid] || []).push({ q }); save(); route(); toast('질문을 올렸어요. 운영진이 답하면 알려드릴게요', 'chat');
        setTimeout(() => { const arr = S.clubQ[cid] || []; const last = arr[arr.length - 1]; if (last && !last.a) { last.a = '좋은 질문 감사해요! 신입생·복학생 모두 환영이고, 첫 모임은 구경만 오셔도 괜찮아요.'; save(); if (location.hash === '#clubs-' + cid) route(); } }, 2500);
        break;
      }
      case 'chat': { const inp = f.querySelector('input'); sendChat(inp.value); inp.value = ''; inp.focus(); break; }
    }
  });

  window.addEventListener('hashchange', onHash);
  if (!location.hash) history.replaceState(null, '', '#home');
  lastHash = location.hash;
  route();
})();
