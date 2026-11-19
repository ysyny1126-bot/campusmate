/* 이음 — 데모 SPA (로그인 없이 둘러보기, 인증·채팅·지도는 가짜 데이터) */
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
    myRooms: [], myItems: [], myPosts: [], comments: {}, likedPosts: [], reviewed: [], trustBonus: 0, chats: {}, followClubs: [], applied: {}, going: [], clubQ: {}, stype: '신입생', scrapContests: [], teamApplied: {}, myTeams: [], myCard: null, proposals: [], matches: {}, gm: {}, myGath: [], settle: {}, cancels: 0, teamTasks: {}, teamPosts: {}, teamDone: {}, contestReports: [], clubPosts: {}, emj: {}, myMates: [], evReviews: {},
    profile: { interests: ['IT·SW', '운동'], skills: ['엑셀', 'PPT'], time: '평일 저녁', area: '교내' },
    notifs: [{ text: '도서관지박령님이 회원님에게 연락을 요청했어요', ic: 'heart', href: '#roommate-m1', at: Date.now() - 600000 },
      { text: '찜한 ‘정문 도보 5분 풀옵션 원룸’ 월세가 2만 원 내렸어요', ic: 'door', href: '#rooms-r1', at: Date.now() - 3600000 },
      { text: '내 게시글에 새 댓글이 달렸어요', ic: 'chat', href: '#post-p1', at: Date.now() - 86400000 }],
    reportActs: {}, hiddenG: [], restricted: {}, approvedContests: [], login: null, verifyReq: null, verifyMethod: '', verifyActs: {}, member: null,
  });
  let S = load();
  /* 회원정보(닉네임·학과)를 화면 곳곳의 '나'에 반영해요 */
  function applyMember() { if (!S.member) return; D.me.nick = S.member.nick; D.me.dept = S.member.dept; S.survey.dept = S.member.dept; }
  applyMember();
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

  /* ───────── 매칭 흐름: 요청 → 수락 → 채팅 → 만남 체크인 → 상호 후기 → 신뢰도 ───────── */
  /* 임시 기준(팀 논의 중, 바꿀 수 있어요): 나와 상대 중 한 명이라도 이 점수보다 낮으면 교내 장소에서만 만나요 */
  const TRUST_OFF = 70;
  const KIND = { 룸메: { act: 'mate-chat', cls: 'k-mate' }, 방: { act: 'room-chat', cls: 'k-room' }, 중고: { act: 'item-chat', cls: 'k-item' } };
  const STEP_CUR = { req: 1, acc: 2, plan: 2, met: 3, done: 4 };
  const STEP_LABEL = ['요청', '수락', '만남 체크인', '후기'];
  const STAGE_TXT = { req: '상대 수락 대기', acc: '채팅 중 · 만남 장소를 정해요', plan: '체크인 완료 · 만남 예정', met: '만남 완료 · 후기를 남겨요', done: '후기 완료' };
  function ensureMatch(key, o) {
    if (!S.matches[key]) S.matches[key] = { key, stage: 'acc', created: Date.now(), ...o };
    else if (o.stage === 'acc' && S.matches[key].stage === 'req') S.matches[key].stage = 'acc';
    save(); return S.matches[key];
  }
  const matchList = (all) => Object.values(S.matches).filter((m) => all || m.stage !== 'done').sort((a, b) => (STEP_CUR[b.stage] - STEP_CUR[a.stage]) || b.created - a.created);
  const lowTrust = (m) => Math.min(myTrust(), m.trust) < TRUST_OFF;
  const stepBar = (m) => `<span class="prog-steps">${STEP_LABEL.map((t, i) => `<i class="${i < STEP_CUR[m.stage] ? 'd' : i === STEP_CUR[m.stage] ? 'n' : ''}">${t}</i>`).join('')}</span>`;
  const meetLine = (m) => (m.meet ? `${icon('pin', 13, 'style="display:inline;vertical-align:-2px"')} ${esc(place(m.meet.place).name)} · ${fmtDate(m.meet.date)} ${m.meet.time}` : '');
  function syncMatches() {
    S.interests.forEach((id) => { const c = D.mates.find((x) => x.id === id); if (c && !S.matches['mate-' + id]) S.matches['mate-' + id] = { key: 'mate-' + id, id, kind: '룸메', with: c.nick, trust: c.trust, title: `${c.dorm} 룸메이트`, href: `#roommate-${id}`, stage: c.likedMe ? 'acc' : 'req', created: Date.now() }; });
  }

  /* ───────── Data accessors ───────── */
  const allRooms = () => [...S.myRooms, ...D.rooms].filter((r) => !S.blocked.includes(r.author.nick));
  const allItems = () => [...S.myItems, ...D.items].filter((i) => !S.blocked.includes(i.seller.nick));
  const allPosts = () => [...S.myPosts, ...D.posts].filter((p) => !S.blocked.includes(p.author));
  const findRoom = (id) => [...S.myRooms, ...D.rooms].find((r) => r.id === id);
  const findItem = (id) => [...S.myItems, ...D.items].find((i) => i.id === id);
  const boardName = (k) => D.boards[k] || '기타';
  const stars = (n) => { n = Math.max(0, Math.min(5, +n || 0)); return `<span class="stars" role="img" aria-label="별점 ${n}점">${'★'.repeat(n)}<span class="stars-off">${'★'.repeat(5 - n)}</span></span>`; };
  const findPost = (id) => [...S.myPosts, ...D.posts].find((p) => p.id === id);
  const place = (id) => D.safePlaces.find((p) => p.id === id) || D.safePlaces[0];
  const myTrust = () => Math.min(99, D.me.baseTrust + (S.verified ? 6 : 0) + (S.idVerified ? 4 : 0) + (S.myRooms.length ? 3 : 0) + S.trustBonus);

  /* ───────── Small components ───────── */
  const avatar = (name, cls = '') => { const h = hash(name) % 360; return `<span class="avatar ${cls}" style="background:hsl(${h} 42% 40%)" aria-hidden="true">${esc(String(name).replace(/[^가-힣A-Za-z0-9]/g, '').charAt(0) || '익')}</span>`; };
  const ring = (v, size = 64, unit = "%", label = "호환도") => `<div class="ring ${v >= 85 ? '' : v >= 70 ? 'mid' : 'low'}" style="--v:${v};--s:${size}px" role="img" aria-label="${label} ${v}${unit === "%" ? "퍼센트" : "점"}"><span>${v}<small>${unit}</small></span></div>`;
  const BADGE = { school: ['b-school', 'shield', '학교 인증'], proof: ['b-proof', 'file', '거주 증빙'], id: ['b-id', 'id', '신원 인증'], review: ['b-review', 'clock', '증빙 검토 중'], consent: ['b-proof', 'check', '집주인 동의'] };
  /* 캐릭터 잇고 이미지 · 예시 표시 · 실거래 시세 비교 */
  const charImg = (n, cls = '', alt = '') => `<img class="char ${cls}" src="assets/char/${n}.jpg" alt="${esc(alt)}" ${alt ? '' : 'aria-hidden="true"'} loading="lazy">`;
  const isSample = (x) => !String(x.id).startsWith('u');
  const sampleTag = (x) => (isSample(x) ? '<span class="sample-tag" title="실제 매물이 아닌 예시 데이터">예시</span>' : '');
  const sizeM2 = (r) => { const m = String(r.size || '').match(/([\d.]+)\s*평/); return m ? +m[1] * 3.3 : null; };
  function rentVs(r) {
    const R = window.CM_RENT; if (!R || r.deal === '룸쉐어' || !r.rent) return null;
    const a = sizeM2(r), key = a == null ? null : a <= 20 ? '20㎡ 이하' : a <= 33 ? '20~33㎡' : '33㎡ 초과';
    const base = (key && R.daeBySize[key]) || R.daeSmall;
    const conv = r.rent + r.deposit * 0.005;
    return { pct: Math.round(((conv - base.convMed) / base.convMed) * 100), conv: Math.round(conv * 10) / 10, base, key: key || '33㎡ 이하' };
  }
  const rentTag = (r) => { const v = rentVs(r); if (!v) return ''; const t = Math.abs(v.pct) < 5 ? '시세 수준' : v.pct < 0 ? `시세보다 ${-v.pct}% 저렴` : `시세보다 ${v.pct}% 비쌈`; return `<span class="rent-tag ${v.pct <= -5 ? 'low' : v.pct >= 5 ? 'high' : ''}">${t}</span>`; };
  const housingTabs = (active) => `<nav class="seg nav housing-tabs" aria-label="방·룸메 메뉴">${[['rooms', '들어갈 방', 'door'], ['roommate', '같이 살 사람', 'users'], ['rooms-new', '내 방 넘기기', 'plus']].map(([k, l, ic]) => `<a href="#${k}" class="${active === k ? 'active' : ''}" ${active === k ? 'aria-current="page"' : ''}>${icon(ic, 16)}${l}</a>`).join('')}</nav>`;
  const housingHead = (active, sub) => `<div class="housing-head"><div><h1>주거 · 방·룸메</h1><p>${sub}</p></div>${housingTabs(active)}</div>`;
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
        <div class="meta">${esc(c.dept)} · ${gradeLabel(c.grade)}${mutual ? ' · <b style="color:var(--mint-800)">연결됨</b>' : ''}</div></div>
        ${ring(m.score, 56)}</div>
      <ul class="reasons">${m.reasons.slice(0, compact ? 2 : 3).map((r) => `<li>${icon('check', 16)}${esc(r)}</li>`).join('')}</ul>
      <div class="card-actions">${mutual
        ? `<button class="btn btn-mint" data-act="mate-chat" data-id="${c.id}">${icon('chat', 18)}채팅하기</button>`
        : sent ? `<button class="btn btn-done" data-act="interest" data-id="${c.id}" aria-pressed="true">${icon('check', 18)}요청 보냄</button>`
          : `<button class="btn btn-primary" data-act="interest" data-id="${c.id}" aria-pressed="false">${icon('heart', 18)}연락 요청</button>`}</div>
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
        <span class="room-kicker">${sampleTag(r)}${esc(r.deal)} · ${esc(r.type)}</span>
        <div class="price">월세 ${r.deposit}/${r.rent} ${rentTag(r)}</div>
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
      <div class="rv-head">${showBoard ? `<span class="board-tag">${boardName(p.board)}</span>` : ''}${p.rating ? stars(p.rating) : ''}</div>
      <h3>${esc(p.title)}</h3>
      ${p.tags && p.tags.length ? `<div class="rv-tags">${p.tags.map((t) => `<span>#${esc(t)}</span>`).join('')}</div>` : ''}
      <div class="post-meta"><span>${p.anon ? '익명' : esc(p.author)} · ${p.time}</span>
        <span class="${p.likes > 50 ? 'hot' : ''}">${icon('heart')}${p.likes + (liked ? 1 : 0)}</span><span>${icon('chat')}${cc}</span></div></a>`;
  }

  /* ───────── 시기 맞춤 홈 ───────── */
  const nextTermStart = () => { const y = +TODAY.slice(0, 4); return [`${y}-03-02`, `${y}-09-01`, `${y + 1}-03-02`].find((d) => dday(d) >= 0); };
  const SEASONS = {
    move: { name: '개강 전', cls: 's-move', img: 'cheer', alt: '응원하는 잇고', tag: (pv) => `${pv ? '개강 2주 전 미리보기' : `개강 D-${dday(nextTermStart())}`} · 방 구하는 시즌`, title: '같이 살 사람,<br>지금 제일 많아요',
      sub: () => `룸메 후보 ${ranked().length}명 · 넘기는 방 ${allRooms().length}개`, go: ['#rooms', '방·룸메 보러 가기'] },
    term: { name: '학기 중', cls: 's-term', img: 'team', alt: '응원 도구를 든 잇고', tag: (pv) => `${pv ? '미리보기 · ' : ''}학기 중 · 팀플 시즌`, title: '팀플 팀원,<br>여기서 구해요',
      sub: () => `접수 중 공모전 ${D.contests.filter((k) => cday(k.deadline) >= 0).length}개 · 팀원 모집 ${allTeams().filter((t) => !t.closed).length}건`, go: ['#contests', '팀플·공모전 보기'] },
    exam: { name: '시험 기간', cls: 's-exam', img: 'think', alt: '고민하는 잇고', tag: (pv) => `${pv ? '미리보기 · ' : ''}시험 기간`, title: '전공책은 싸게 사고,<br>끝나면 팔아요',
      sub: () => `중고 ${allItems().length}개 거래 중 · 교내 직거래`, go: ['#market', '중고거래 보기'] },
  };
  /* 학사일정(대략): 방학·개강 직전 = 방 구하는 시즌, 중간·기말 = 시험 기간, 나머지 = 학기 중 */
  function seasonOf(d) {
    const [, m, dd] = d.split('-').map(Number), md = m * 100 + dd;
    if (md >= 1215 || md <= 310 || (md >= 615 && md <= 905)) return 'move';
    if ((md >= 415 && md <= 428) || (md >= 1020 && md <= 1027) || (md >= 601 && md < 615) || (md >= 1201 && md < 1215)) return 'exam';
    return 'term';
  }
  let seasonPick = null;
  /* 진행 중인 매칭: 요청 → 수락 → 만남 체크인 → 후기 */
  function progressStrip() {
    const list = matchList();
    if (!list.length) return '';
    const rows = list.slice(0, 2).map((m) => `<a class="prog-row" href="#my-matches"><span class="prog-kind ${KIND[m.kind].cls}">${m.kind}</span><b>${esc(m.with)}</b>
        <span class="small muted prog-st">${STAGE_TXT[m.stage]}</span>${stepBar(m)}</a>`);
    return `<section class="prog-strip" aria-label="진행 중인 매칭"><div class="prog-head"><b>진행 중인 매칭 ${list.length}건</b><a href="#my-matches">모두 보기</a></div>${rows.join('')}</section>`;
  }

  /* ───────── Pages ───────── */
  function pageHome() {
    const all = ranked();
    const top = all.slice(0, 3);
    const best = top[0];
    const rooms = allRooms().slice(0, 6);
    const items = [...allItems()].sort((a, b) => b.likes - a.likes).slice(0, 6);
    const posts = [...allPosts()].sort((a, b) => b.likes - a.likes).slice(0, 3);
    const sk = seasonPick || seasonOf(TODAY), se = SEASONS[sk];
    const R = window.CM_RENT;
    return `
    ${S.demoNoticeClosed ? '' : `<div class="demo-banner" role="note">${icon('alert', 18)}<span><b>발표용 데모예요.</b> 실제 학생증·개인정보는 올리지 말고, 예시 이미지로 시험해 주세요. 입력한 내용은 이 기기에만 저장돼요. <a href="#privacy">자세히</a></span><button class="icon-btn" data-act="demo-close" aria-label="데모 안내 닫기">${icon('x', 18)}</button></div>`}
    <section class="greet">
      ${charImg('icon', 'greet-char')}
      <div class="greet-txt"><b>안녕하세요, ${D.me.nick}님</b><span>${esc(S.stype)} · ${D.school.name}</span></div>
      <a class="icon-btn round" href="#search" aria-label="통합 검색">${icon('search', 20)}</a>
    </section>

    <div class="home-top">
      <div class="ht-left">
        <a class="season-card ${se.cls}" href="${se.go[0]}">
          <div class="sc-text">
            <span class="sc-tag">${se.tag(sk !== seasonOf(TODAY))}</span>
            <h1>${se.title}</h1>
            <p>${se.sub()}</p>
            <span class="sc-go">${se.go[1]}${icon('right', 16)}</span>
          </div>
          ${charImg(se.img, 'sc-char', se.alt)}
        </a>
        <div class="season-pick" role="group" aria-label="시기별 홈 미리보기 (발표용)"><span>시기 미리보기</span>${Object.keys(SEASONS).map((k) => `<button class="${k === sk ? 'on' : ''}" data-act="season" data-v="${k}" aria-pressed="${k === sk}">${SEASONS[k].name}</button>`).join('')}</div>
        ${progressStrip()}
        ${R ? `<a class="real-rent" href="#rooms"><span class="rr-txt"><small>실제 데이터 · 국토교통부 실거래 ${R.counts.daeSmall}건</small>대소원면 원룸(33㎡ 이하) 월세 중앙값</span><b>${R.daeSmall.rentMed}만 원</b><span class="rr-sub">보증금 ${R.daeSmall.depMed}만</span></a>` : ''}
        ${S.verified ? '' : `<a class="notice" href="#verify">${icon('shield', 20)}<span><b>학교 인증</b>을 마치면 채팅·글쓰기를 할 수 있어요</span>${icon('right', 18)}</a>`}
      </div>
      <section class="section" aria-labelledby="h-go">
        <div class="section-head"><h2 id="h-go">무엇을 찾고 있나요?</h2></div>
        <div class="bento">
          <a class="tile t-peach tall" href="#rooms"><span class="tile-tag">룸메 · 양도 · 룸쉐어</span><b>방·룸메</b><span class="tile-sub">룸메 후보 ${all.length}명 · 방 ${allRooms().length}개</span>
            ${charImg('match', 'tile-char')}
            ${best ? `<span class="tile-foot">${avatar(best.c.nick, 'sm')}<span><small>나와 가장 잘 맞는 후보</small><br>${best.m.score}% · ${esc(best.c.nick)}</span></span>` : ''}</a>
          <a class="tile t-pink" href="#taxi"><span class="tile-tag">택시 · 배달 · 중고</span><b>생활 매칭</b><span class="tile-sub">지금 모집 ${allG().filter((g) => gStatus(g) === 'recruit').length}건</span><span class="tile-ic">${icon('car', 22)}</span></a>
          <a class="tile t-lav" href="#clubs"><span class="tile-tag">신입생 · 복학생</span><b>동아리·행사</b><span class="tile-sub">모집 중 ${D.clubs.filter((c) => c.recruit.status !== 'closed').length}곳</span><span class="tile-ic">${icon('calendar', 22)}</span></a>
          <a class="tile t-mint wide" href="#reviews"><span class="tile-ic">${icon('star', 20)}</span><span style="flex:1;min-width:0"><b>후기</b><span class="tile-sub ellip">택시팟 · 스터디 · 동아리 후기 ${allPosts().length}개</span></span>${icon('right', 20)}</a>
          <a class="tile t-yellow wide" href="#contests"><span class="tile-ic">${icon('trophy', 20)}</span><span style="flex:1;min-width:0"><b>팀플 · 공모전</b><span class="tile-sub ellip">접수 중 공모전 ${D.contests.filter((k) => cday(k.deadline) >= 0).length}개 · 팀원 모집 ${allTeams().filter((t) => !t.closed).length}건</span></span>${icon('right', 20)}</a>
        </div>
      </section>
    </div>

    ${recoSection()}
    ${(() => { const lv = (t) => allG(t).filter((g) => gStatus(g) === 'recruit').sort((x, y) => x.closeAt - y.closeAt).slice(0, 2); const cards = [...lv('taxi').map(taxiCard), ...lv('delivery').map(deliveryCard)];
      return cards.length ? `<section class="section" aria-labelledby="h-life"><div class="section-head"><h2 id="h-life">지금 모집 중 · 택시·배달</h2><a class="more" href="#taxi">전체 보기${icon('right', 16)}</a></div><div class="hscroll life-h">${cards.join('')}</div></section>` : ''; })()}
    <section class="section" aria-labelledby="h-ev">
      <div class="section-head"><h2 id="h-ev">이번 주 캠퍼스 행사</h2><a class="more" href="#events">행사 캘린더${icon('right', 16)}</a></div>
      ${homeEvents()}
    </section>

    <section class="section" aria-labelledby="h-room">
      <div class="section-head"><h2 id="h-room">새로 올라온 방 <span class="small muted">(예시 매물)</span></h2><a class="more" href="#rooms">전체 보기${icon('right', 16)}</a></div>
      <div class="hscroll">${rooms.map((r) => roomCard(r)).join('')}</div>
    </section>

    <section class="section" aria-labelledby="h-market">
      <div class="section-head"><h2 id="h-market">인기 중고거래</h2><a class="more" href="#market">전체 보기${icon('right', 16)}</a></div>
      <div class="hscroll small">${items.map(itemCard).join('')}</div>
    </section>

    <section class="section" aria-labelledby="h-post">
      <div class="section-head"><h2 id="h-post">많이 본 후기</h2><a class="more" href="#reviews">전체 보기${icon('right', 16)}</a></div>
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
    return `<footer class="footer"><b>이음 · 발표용 데모</b><span>${D.school.unofficial}</span>
      <span>실제로 동작: 카카오 로그인(닉네임만), 실거래 시세(국토교통부), 공모전 정보(공식 공고 링크), 지도. 그 밖의 사람·매물·채팅·인증 결과는 <b>예시</b>예요.</span>
      <span>입력한 내용은 <b>이 기기 브라우저에만</b> 저장되고 서버로 보내지 않아요.</span>
      <span class="footer-links"><a href="#privacy">개인정보처리방침</a> · <button class="link-btn" data-act="onboard">처음 소개 다시 보기</button></span></footer>`;
  }

  /* ── 룸메이트 ── */
  function pageRoommate() {
    const list = ranked();
    const mutualCount = list.filter((x) => isMutual(x.c)).length;
    const s = S.survey;
    const q = (k) => D.questions.find((x) => x.k === k);
    return `
    ${housingHead('roommate', '생활 습관 설문으로 <b>호환도를 자동 계산</b>하고, 후보 중 마음에 드는 사람에게 연락을 요청해요.')}
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px"><a class="btn btn-outline btn-sm" href="#roommate-survey">${icon('edit', 16)}설문 수정</a></div>
    <div class="card pad" style="display:grid;gap:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><b>내 생활 습관 요약</b><span class="small muted">${s.gender === '여' ? '여학생' : '남학생'} 기숙사 · 같은 성별끼리만 매칭돼요</span></div>
      <div class="chip-row">
        <span class="chip">${icon('moon', 14)}${q('sleep').opts[s.sleep]} 취침</span><span class="chip">${q('wake').opts[s.wake]} 기상</span>
        <span class="chip">${q('smoke').opts[s.smoke]}</span><span class="chip">청결 ${q('clean').opts[s.clean]}</span><span class="chip">소음 ${q('noise').opts[s.noise]}</span>
        <span class="chip">방문객 ${q('guest').opts[s.guest]}</span>
      </div>
      <div class="small muted">매우 중요: ${D.questions.filter((x) => S.weights[x.k] === 2).map((x) => x.label).join(', ') || '없음'}</div>
    </div>
    <div class="info-box" style="margin-top:12px">${icon('lock', 18)}<span>처음엔 닉네임·학과·생활 습관만 보여요. 상대가 <b>연락 요청을 수락</b>하면 실명·사진이 공개되고 채팅이 열려요.${mutualCount ? ` 현재 <b>${mutualCount}명</b>과 연결됐어요.` : ''}</span></div>
    <div class="info-box mint" style="margin-top:8px">${charImg('match', 'ib-char')}<span><b>생활관 룸메이트는 서로 지정해서 함께 신청할 수 있어요.</b> 연결되면 채팅에서 신청 기간과 호실 유형을 맞춰 보세요.</span></div>
    <div class="section-head" style="margin-top:24px"><h2>자동 계산한 후보 ${list.length}명</h2><span class="small muted">호환도 높은 순 · 예시 프로필</span></div>
    ${list.length ? `<div class="mate-grid">${list.map((x) => mateCard(x)).join('')}</div>`
      : `<div class="card empty">${icon('users', 40)}<b>아직 맞는 후보가 없어요</b>차단을 해제하거나 설문을 수정해 보세요.</div>`}
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
  ICONS.car = '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>';
  ICONS.utensils = '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>';
  ICONS.arrow = '<path d="M5 12h14M12 5l7 7-7 7"/>';
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
      ${housingHead('rooms', '양도·룸쉐어 방을 지도로 찾고, <b>실거래 시세</b>와 비교해요. 지금 보이는 매물은 <b>예시</b>예요.')}
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
          <h1 class="detail-title">${sampleTag(r)}${esc(r.title)}</h1>
          <div class="meta">${icon('pin')}${esc(r.area)} · ${esc(r.type)} ${esc(r.size)} · ${esc(r.floor)} · ${r.posted} · 조회 ${r.views}</div>
        </section>
        ${safetyBanner(false)}
        <section class="card pad"><h2 class="block-title">비용</h2>
          <div class="kv three"><div><small>보증금</small><b>${r.deposit}만</b></div><div><small>월세</small><b>${r.rent}만</b></div><div><small>관리비</small><b>${r.maint}만</b></div></div>
          <p class="small muted" style="margin-top:10px">관리비 포함: ${esc(r.maintIncl)}${r.deal === '룸쉐어' ? ' · 표시 금액은 1인 부담 기준' : ''}</p></section>
        ${rentCompare(r)}
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

  /* ── 내 매칭 ── */
  const REVIEW_TAGS = {
    룸메: ['생활 습관이 설명과 같아요', '약속을 잘 지켜요', '대화가 편해요', '배려심이 있어요'],
    방: ['방 상태가 설명과 같아요', '약속을 잘 지켜요', '계약 설명이 정확해요', '친절해요'],
    중고: ['상품 상태가 설명과 같아요', '약속을 잘 지켜요', '응답이 빨라요', '친절해요'],
  };
  const REVIEW_BACK = { 룸메: '만나서 이야기해 보니 생활 패턴이 정말 잘 맞았어요. 시간 약속도 잘 지켜요!', 방: '방 보러 오셔서 꼼꼼하게 확인하셨고, 약속 시간도 정확했어요.', 중고: '약속 장소에 먼저 와 계셨어요. 거래 깔끔했어요!' };
  function matchActions(m) {
    const chatBtn = `<button class="btn btn-sm btn-outline" data-act="${KIND[m.kind].act}" data-id="${m.id}">${icon('chat', 15)}채팅</button>`;
    switch (m.stage) {
      case 'req': return `<span class="small muted">상대가 수락하면 채팅이 열려요</span><button class="btn btn-sm btn-ghost" data-act="m-accept" data-key="${m.key}">상대 수락 (데모)</button>`;
      case 'acc': return `${chatBtn}<button class="btn btn-sm btn-primary" data-act="checkin" data-key="${m.key}">${icon('pin', 15)}만남 체크인</button>`;
      case 'plan': return `${chatBtn}<button class="btn btn-sm btn-ghost" data-act="checkin" data-key="${m.key}">일정 바꾸기</button><button class="btn btn-sm btn-mint" data-act="m-met" data-key="${m.key}">${icon('check', 15)}잘 만났어요</button>`;
      case 'met': return `<button class="btn btn-sm btn-primary" data-act="m-review" data-key="${m.key}">${icon('star', 15)}후기 남기기</button>`;
      default: return `<span class="badge b-school">${icon('check', 13)}후기 완료 · 신뢰도 +2</span>${m.review ? rvBtn(MATCH_BOARD[m.kind] || 'house', `${m.title} ${m.kind} 후기`, m.review.stars, m.review.tags) : ''}`;
    }
  }
  function matchesMyBody() {
    const mine = allG().filter((g) => g.mine || (myM(g) && myM(g).status !== 'left'));
    const rows = mine.map((g) => `<a class="list-row" href="#${g.type}-${g.id}"><span class="lr-art" style="background:${g.type === 'taxi' ? '#FFF1C2' : '#FFE9C9'}">${icon(g.type === 'taxi' ? 'car' : 'utensils', 22)}</span><span class="lr-body"><b>${esc(gTitle(g))}</b><span class="small muted">${g.mine ? '내 모집글' : MY_ST[myM(g).status]} · ${gCount(g)}/${g.cap}명${g.type === 'taxi' ? ` · 출발 ${clock(g.departAt)}` : ` · 마감 ${clock(g.closeAt)}`}</span></span>${stChip(g)}</a>`).join('');
    return (rows ? `<h3 class="block-title" style="font-size:15px">생활 매칭 · 택시·배달</h3>${rows}<div class="divider"></div><h3 class="block-title" style="font-size:15px">룸메 · 방 · 중고</h3>` : '') + matchesMyBody0();
  }
  function matchesMyBody0() {
    const list = matchList(true);
    const flow = `<ol class="flow-line" aria-label="매칭 진행 순서">${['요청', '수락', '채팅', '만남 체크인', '상호 후기', '신뢰도'].map((t) => `<li>${t}</li>`).join('')}</ol>`;
    if (!list.length) return flow + `<div class="empty">${charImg('think', 'empty-char')}<b>아직 진행 중인 매칭이 없어요</b>룸메 후보에게 연락을 요청하거나, 방·중고 글에서 문의를 시작해 보세요.<div style="display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap"><a class="btn btn-sm btn-primary" href="#roommate">룸메 후보 보기</a><a class="btn btn-sm btn-outline" href="#market">중고거래 보기</a></div></div>`;
    return flow + list.map((m) => `<article class="match-row ${m.stage === 'done' ? 'is-done' : ''}">
      <div class="mr-top"><span class="prog-kind ${KIND[m.kind].cls}">${m.kind}</span><a href="${m.href}"><b>${esc(m.with)}</b></a><span class="small muted mr-title">${esc(m.title)}</span>
        <span class="mr-trust ${m.trust < TRUST_OFF ? 'low' : ''}">신뢰도 ${m.trust}</span></div>
      ${stepBar(m)}
      <div class="small muted">${STAGE_TXT[m.stage]}${m.meet ? ` · ${meetLine(m)}` : ''}</div>
      ${m.stage === 'plan' ? `<div class="mr-safe">${icon('shield', 15)}<span>만남 시간 30분 뒤까지 ‘잘 만났어요’를 누르지 않으면 알림을 보내고, 응답이 없으면 운영팀이 확인해요.</span><button class="link-btn" data-act="report" data-label="만남 · ${esc(m.with)}">문제가 생겼어요</button></div>` : ''}
      <div class="mr-actions">${matchActions(m)}</div></article>`).join('');
  }
  function openCheckin(key) {
    if (needVerify('만남 체크인')) return;
    const m = S.matches[key]; if (!m) return;
    const low = lowTrust(m), who = myTrust() < TRUST_OFF ? '내' : '상대';
    const cur = (m.meet && m.meet.place) || 'union';
    const opts = D.safePlaces.map((p) => { const dis = p.off && low; return `<label class="place-opt ${dis ? 'dis' : ''}"><input type="radio" name="place" value="${p.id}" ${dis ? 'disabled' : ''} ${p.id === cur && !dis ? 'checked' : ''}><span class="po-body"><b>${esc(p.name)}</b><small>${esc(p.desc)} · ${p.hours}${p.sample ? ' · 위치 확인 전 예시' : ''}</small></span><em class="${p.off ? 'off' : ''}">${dis ? icon('lock', 13) : ''}${p.off ? '대학로' : '교내'}</em></label>`; }).join('');
    openModal(modalBox('만남 체크인', `
      <p class="small muted" style="margin-bottom:10px"><b>${esc(m.with)}</b>님과 만나기 전에 장소와 시간을 기록해요. 기록은 운영팀만 볼 수 있고, 신고하면 <b>담당자 전원</b>에게 함께 전달돼요.</p>
      ${low ? `<div class="info-box amber" style="margin-bottom:10px">${icon('lock', 18)}<span>${who} 신뢰도가 ${TRUST_OFF}점보다 낮아 <b>교내 장소에서만</b> 만날 수 있어요. 만남 후 후기가 쌓이면 대학로 장소도 열려요.</span></div>` : ''}
      <form data-form="checkin" data-key="${key}" class="grid" style="gap:12px" novalidate>
        <fieldset class="place-list"><legend class="field-label">어디서 만날까요? · 사람이 많고 밝은 곳만 고를 수 있어요</legend>${opts}</fieldset>
        <div class="form-grid two"><div class="field"><label for="ci-date">날짜</label><input class="input" type="date" id="ci-date" name="date" min="${TODAY}" value="${(m.meet && m.meet.date) || TODAY}"></div>
          <div class="field"><label for="ci-time">시간</label><input class="input" type="time" id="ci-time" name="time" min="07:00" max="22:00" step="600" value="${(m.meet && m.meet.time) || '17:00'}"></div></div>
        <span class="hint">안전을 위해 오전 7시 ~ 오후 10시 사이만 고를 수 있어요.</span>
        <p class="error-text" id="ci-err" role="alert"></p>
        <div class="modal-actions"><button type="button" class="btn btn-outline" data-act="close">취소</button><button class="btn btn-primary" type="submit">${icon('pin', 16)}체크인 기록하기</button></div>
      </form>`));
  }
  function openMatchReview(key) {
    const m = S.matches[key]; if (!m) return;
    openModal(modalBox('만남 후기 남기기', `<p class="small muted" style="margin-bottom:12px"><b>${esc(m.with)}</b>님 · ${esc(m.title)}${m.meet ? `<br>${meetLine(m)}` : ''}</p>
      <form data-form="m-review" data-key="${key}"><fieldset style="border:0"><legend class="sr-only">별점</legend><div class="star-input">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="ms${n}" name="stars" value="${n}" ${n === 5 ? 'checked' : ''}><label for="ms${n}" aria-label="${n}점">★</label>`).join('')}</div></fieldset>
      <div class="opts" style="margin-top:14px">${REVIEW_TAGS[m.kind].map((t, i) => `<label class="opt sm"><input type="checkbox" name="tags" value="${t}" ${i === 1 ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div>
      <textarea class="textarea" name="text" style="min-height:80px;margin-top:12px" placeholder="다른 학생들에게 도움이 되는 후기를 남겨 주세요 (선택)" aria-label="후기 내용"></textarea>
      <p class="small muted" style="margin-top:8px">상대도 후기를 남기면 <b>두 후기가 동시에 공개</b>돼요. 먼저 쓴 후기를 보고 보복 후기를 쓸 수 없어요.</p>
      <div class="modal-actions"><button class="btn btn-primary btn-lg" type="submit">후기 보내기</button></div></form>`));
  }

  /* 내가 올린 모집글에 들어오는 데모 신청자 (승인·거절을 시연하기 위한 예시) */
  const demoApplicants = (type) => D.mates.filter((c) => !S.blocked.includes(c.nick)).slice(3, 5).map((c, i) => ({ nick: c.nick, trust: c.trust, dept: c.dept, items: type === 'delivery' ? [{ n: i ? '사이드 메뉴' : '1인 세트', p: i ? 4500 : 9000, q: 1 }] : [] }));
  /* ═════════ Store: 모임(Gatherings) — 택시 동행 · 배달 공동 주문 ═════════
   * 나중에 서버 DB로 옮길 때 그대로 테이블이 되도록 모양을 맞췄어요.
   *  - Gatherings      : 모집글 (type: taxi | delivery, cap 정원, closeAt 마감, departAt 출발)
   *  - GatheringMembers: S.gm[gid] = { status: applied | approved | final | done | left | rejected, items }
   *  - OrderItems      : 참여자별 메뉴 (items: [{ n 메뉴, p 가격, q 수량 }])
   *  - SharedExpense   : S.settle[gid] = { total, shares: [{ nick, amount }] } — 금액 표시만, 결제·보관 없음
   * 지켜야 할 규칙(서버에서도 같아요): 같은 글 중복 신청 금지, 정원 초과 금지, 마감 시간 지나면 자동 종료 */
  const T0 = Date.now();
  const SAMPLE_G = [...D.taxis.map((x) => ({ ...x, type: 'taxi' })), ...D.deliveries.map((x) => ({ ...x, type: 'delivery' }))]
    .map((g) => ({ ...g, closeAt: T0 + g.closeIn * 60000, departAt: g.departIn != null ? T0 + g.departIn * 60000 : null }));
  const G_STATUS = { recruit: ['모집 중', 'st-recruit'], full: ['모집 완료', 'st-full'], progress: ['진행 중', 'st-progress'], done: ['완료', 'st-done'], cancel: ['취소', 'st-cancel'], expired: ['만료', 'st-expired'] };
  const CANCEL_LIMIT = 3;   // 운영 정책 초안: 확정 후 취소가 이 횟수 이상이면 7일간 참여 제한
  const allG = (type) => [...S.myGath, ...SAMPLE_G].filter((g) => !type || g.type === type).filter((g) => !S.hiddenG.includes(g.id)).filter((g) => !S.blocked.includes(g.leader.nick));
  const findG = (id) => [...S.myGath, ...SAMPLE_G].find((g) => g.id === id);
  const myM = (g) => (g.mine ? null : S.gm[g.id] || null);
  const isIn = (g) => g.mine || (myM(g) && ['approved', 'final', 'done'].includes(myM(g).status));
  const gPeople = (g) => [g.leader, ...g.members, ...(!g.mine && isIn(g) ? [P_ME(g)] : [])];
  const P_ME = (g) => ({ nick: D.me.nick, trust: myTrust(), dept: S.survey.dept, items: (S.gm[g.id] && S.gm[g.id].items) || [], me: true });
  const gCount = (g) => gPeople(g).length;
  function gStatus(g) {
    if (g.canceled) return 'cancel';
    if (g.done || (myM(g) && myM(g).status === 'done')) return 'done';
    const n = gCount(g);
    if (Date.now() >= g.closeAt) return n >= 2 ? 'progress' : 'expired';
    return n >= g.cap ? 'full' : 'recruit';
  }
  const stChip = (g) => { const [t, c] = G_STATUS[gStatus(g)]; return `<span class="st-chip ${c}">${t}</span>`; };
  const wonN = (n) => `${Math.round(n).toLocaleString('ko-KR')}원`;
  const ceil10 = (n) => Math.ceil(n / 10) * 10;
  const clock = (ts) => { const d = new Date(ts); return `${d.getHours() < 12 ? '오전' : '오후'} ${((d.getHours() + 11) % 12) + 1}:${String(d.getMinutes()).padStart(2, '0')}`; };
  function until(ts) {
    const s = Math.round((ts - Date.now()) / 1000);
    if (s <= 0) return '마감';
    const m = Math.floor(s / 60);
    return m >= 60 ? `${Math.floor(m / 60)}시간 ${m % 60}분` : m >= 10 ? `${m}분` : `${m}분 ${String(s % 60).padStart(2, '0')}초`;
  }
  const untilEl = (ts) => `<b data-until="${ts}">${until(ts)}</b>`;
  const itemsSum = (items) => (items || []).reduce((a, x) => a + x.p * (x.q || 1), 0);
  const orderTotal = (g) => gPeople(g).reduce((a, p) => a + itemsSum(p.items), 0);
  const taxiTitle = (g) => `${g.from} → ${g.to}`;
  const gTitle = (g) => (g.type === 'taxi' ? taxiTitle(g) : `${g.shop} 공동 주문`);
  const lateNight = (ts) => { const h = new Date(ts).getHours(); return h >= 23 || h < 6; };

  /* ── 카드 ── */
  function taxiCard(g) {
    const n = gCount(g), st = gStatus(g);
    return `<article class="life-card clickable ${['recruit', 'full'].includes(st) ? '' : 'is-off'}" data-href="#taxi-${g.id}">
      <div class="lc-top">${stChip(g)}${sampleTag(g)}${st === 'recruit' ? `<span class="lc-time">${icon('clock', 14)}마감까지 ${untilEl(g.closeAt)}</span>` : ''}</div>
      <div class="lc-route"><b>${esc(g.from)}</b>${icon('arrow', 16)}<b>${esc(g.to)}</b></div>
      <div class="lc-meta">출발 ${clock(g.departAt)} · <span class="seats" aria-label="현재 ${n}명, 최대 ${g.cap}명">${Array.from({ length: g.cap }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span> 현재 ${n}명 / 최대 ${g.cap}명</div>
      <div class="lc-foot"><span class="lc-price"><small>${st === 'recruit' && !isIn(g) ? '내가 타면 1인 (예상)' : '1인 부담 (예상)'}</small>${wonN(ceil10(g.fare / Math.max(n + (st === 'recruit' && !isIn(g) ? 1 : 0), 1)))}</span>
        ${st === 'recruit' && !g.mine && !myM(g) ? `<button class="btn btn-primary btn-sm" data-act="g-apply" data-id="${g.id}">참여하기</button>` : myM(g) || g.mine ? `<span class="badge b-school">${g.mine ? '내 모집글' : MY_ST[myM(g).status]}</span>` : ''}</div>
    </article>`;
  }
  function deliveryCard(g) {
    const n = gCount(g), st = gStatus(g), tot = orderTotal(g), pct = Math.min(100, Math.round((tot / g.minOrder) * 100));
    return `<article class="life-card clickable ${['recruit', 'full'].includes(st) ? '' : 'is-off'}" data-href="#delivery-${g.id}">
      <div class="lc-top">${stChip(g)}${sampleTag(g)}<span class="chip sm-chip">${esc(g.cat)}</span>${st === 'recruit' ? `<span class="lc-time">${icon('clock', 14)}주문 마감 ${untilEl(g.closeAt)}</span>` : ''}</div>
      <div class="lc-route"><b>${esc(g.shop)}</b><span class="small muted">${icon('pin', 13, 'style="display:inline;vertical-align:-2px"')} ${esc(g.pickup)}에서 받아요</span></div>
      <div class="min-bar" aria-label="최소 주문 금액 ${pct}퍼센트 달성"><i style="width:${pct}%" class="${pct >= 100 ? 'ok' : ''}"></i></div>
      <div class="lc-meta"><b>${wonN(tot)}</b> / 최소 ${wonN(g.minOrder)} ${pct >= 100 ? '<span class="ok-txt">달성</span>' : ''} · 배달비 ${wonN(g.fee)} · 현재 ${n}명 참여 (최대 ${g.cap}명)</div>
      <div class="lc-foot"><span class="lc-price"><small>${isIn(g) ? '내 배달비' : '참여하면 1인 배달비'}</small>${wonN(ceil10(g.fee / (n + (isIn(g) ? 0 : 1))))}</span>
        ${st === 'recruit' && !g.mine && !myM(g) ? `<button class="btn btn-primary btn-sm" data-act="g-apply" data-id="${g.id}">공동 주문 참여하기</button>` : myM(g) || g.mine ? `<span class="badge b-school">${g.mine ? '내 모집글' : MY_ST[myM(g).status]}</span>` : ''}</div>
    </article>`;
  }
  const MY_ST = { applied: '승인 대기', approved: '참여 확정', final: '탑승 확정', done: '완료', left: '취소함', rejected: '정원 마감' };

  /* ── 생활 매칭 목록 ── */
  const lifeTabs = (active) => `<nav class="seg nav housing-tabs life-tabs" aria-label="생활 매칭 메뉴">${[['taxi', '택시 같이 타기', 'car'], ['delivery', '배달 같이 시키기', 'utensils'], ['market', '중고거래', 'bag']].map(([k, l, ic]) => `<a href="#${k}" class="${active === k ? 'active' : ''}" ${active === k ? 'aria-current="page"' : ''}>${icon(ic, 16)}${l}</a>`).join('')}</nav>`;
  const lifeHead = (active, sub) => `<div class="housing-head"><div><h1>생활 매칭</h1><p>${sub}</p></div>${lifeTabs(active)}</div>`;
  let taxiF = '전체', dlvF = '전체';
  function listSplit(list) {
    const live = list.filter((g) => ['recruit', 'full'].includes(gStatus(g))).sort((a, b) => a.closeAt - b.closeAt);
    const past = list.filter((g) => !live.includes(g));
    return { live, past };
  }
  function pageTaxi() {
    const zone = (name) => (D.lifeSpots.find((x) => x.name === name) || {}).zone;
    const list = allG('taxi').filter((g) => taxiF === '전체' || (taxiF === '학교에서 출발' ? zone(g.from) === '교내' : zone(g.to) === '교내'));
    const { live, past } = listSplit(list);
    return `${lifeHead('taxi', '같은 방향 가는 학생과 택시비를 나눠요. <b>택시 호출과 결제는 이음이 하지 않아요</b> — 만나서 직접 잡고, 미터기 금액으로 정산해요.')}
      <div class="life-bar"><div class="tabs" role="group" aria-label="출발·도착 필터">${['전체', '학교에서 출발', '학교로 도착'].map((x) => `<button class="tab ${taxiF === x ? 'active' : ''}" data-act="taxi-f" data-v="${x}" aria-pressed="${taxiF === x}">${x}</button>`).join('')}</div>
        <a class="btn btn-primary btn-sm" href="#taxi-new">${icon('plus', 16)}동행 모집</a></div>
      <div class="life-grid">${live.length ? live.map(taxiCard).join('') : `<div class="card empty">${charImg('think', 'empty-char')}<b>지금 모집 중인 택시가 없어요</b>직접 모집글을 올려 보세요.</div>`}</div>
      ${past.length ? `<h2 class="past-h">지난 모집</h2><div class="life-grid">${past.map(taxiCard).join('')}</div>` : ''}
      ${footer()}`;
  }
  function pageDelivery() {
    const list = allG('delivery').filter((g) => dlvF === '전체' || g.cat === dlvF);
    const { live, past } = listSplit(list);
    return `${lifeHead('delivery', '최소 주문 금액을 채우고 배달비를 나눠요. <b>주문·결제는 모집자가 배달앱에서 직접</b> 하고, 이음은 각자 낼 금액만 정리해 줘요.')}
      <div class="life-bar"><div class="tabs" role="group" aria-label="음식 종류">${['전체', ...D.deliveryCats].map((x) => `<button class="tab ${dlvF === x ? 'active' : ''}" data-act="dlv-f" data-v="${x}" aria-pressed="${dlvF === x}">${x}</button>`).join('')}</div>
        <a class="btn btn-primary btn-sm" href="#delivery-new">${icon('plus', 16)}공동 주문 모집</a></div>
      <div class="life-grid">${live.length ? live.map(deliveryCard).join('') : `<div class="card empty">${charImg('eat', 'empty-char')}<b>지금 모집 중인 공동 주문이 없어요</b>먹고 싶은 메뉴로 직접 모집해 보세요.</div>`}</div>
      ${past.length ? `<h2 class="past-h">지난 모집</h2><div class="life-grid">${past.map(deliveryCard).join('')}</div>` : ''}
      ${footer()}`;
  }

  /* ── 상세 ── */
  function peopleBlock(g) {
    const show = isIn(g);
    const ppl = gPeople(g);
    return `<section class="card pad"><h2 class="block-title">${icon('users', 18)}참여자 ${ppl.length}명 / 최대 ${g.cap}명</h2>
      <div class="ppl">${ppl.map((p, i) => `<div class="ppl-row">${avatar(show || i === 0 ? p.nick : '익명')}<span><b>${show || i === 0 ? esc(p.nick) : '참여자'}${i === 0 ? ' <span class="badge b-proof">모집자</span>' : ''}${p.me ? ' <span class="badge b-school">나</span>' : ''}</b><small class="muted">${show || i === 0 ? esc(p.dept) + ' · ' : ''}학교 인증 · 신뢰도 ${p.trust}</small></span>
        ${g.type === 'delivery' && show ? `<span class="ppl-sum">${p.items.length ? wonN(itemsSum(p.items)) : '<span class="muted small">메뉴 아직</span>'}</span>` : ''}</div>`).join('')}
        ${Array.from({ length: Math.max(0, g.cap - ppl.length) }, () => '<div class="ppl-row empty-slot"><span class="slot-dot"></span><span class="muted small">빈자리</span></div>').join('')}</div>
      ${show ? '' : '<p class="small muted" style="margin-top:8px">참여가 확정되면 다른 참여자의 닉네임·학과가 보여요.</p>'}
      ${g.mine && g.pending && g.pending.length ? `<div class="pending"><b class="small">참여 신청 ${g.pending.length}건 <span class="muted">(데모 신청자)</span></b>${g.pending.map((p) => `<div class="ppl-row">${avatar(p.nick)}<span><b>${esc(p.nick)}</b><small class="muted">${esc(p.dept)} · 신뢰도 ${p.trust}</small></span><span class="pd-btns"><button class="btn btn-sm btn-ghost" data-act="g-reject" data-id="${g.id}" data-nick="${esc(p.nick)}">거절</button><button class="btn btn-sm btn-primary" data-act="g-approve" data-id="${g.id}" data-nick="${esc(p.nick)}">승인</button></span></div>`).join('')}</div>` : ''}
    </section>`;
  }
  function gActions(g) {
    const st = gStatus(g), m = myM(g), chatBtn = `<button class="btn btn-outline" data-act="g-chat" data-id="${g.id}">${icon('chats', 18)}참여자 채팅방</button>`;
    if (st === 'cancel') return '<span class="muted">모집자가 모집을 취소했어요.</span>';
    if (g.mine) {
      if (st === 'done') return `<span class="badge b-school">${icon('check', 13)}완료된 모집이에요</span>`;
      const doneBtn = g.type === 'taxi'
        ? (gCount(g) >= 2 ? `<button class="btn btn-mint" data-act="g-settle" data-id="${g.id}">${icon('check', 18)}이용 완료 · 정산</button>` : '')
        : !g.closed ? `<button class="btn btn-primary" data-act="g-close" data-id="${g.id}">주문 마감하기</button>` : !g.ordered ? `<button class="btn btn-primary" data-act="g-ordered" data-id="${g.id}">배달앱에서 주문했어요</button>` : `<button class="btn btn-mint" data-act="g-recv" data-id="${g.id}">${icon('check', 18)}음식 나눠 주기 완료</button>`;
      return `${gCount(g) >= 2 ? chatBtn : ''}${doneBtn}<button class="btn btn-ghost-danger btn-sm" data-act="g-delist" data-id="${g.id}">모집 취소</button>`;
    }
    if (!m) return st === 'recruit' ? `<button class="btn btn-primary btn-lg" data-act="g-apply" data-id="${g.id}">${g.type === 'taxi' ? '동행 참여 신청' : '공동 주문 참여 신청'}</button>` : `<span class="muted">${G_STATUS[st][0]}된 모집글이에요.</span>`;
    switch (m.status) {
      case 'applied': return `<span class="muted">${icon('clock', 15, 'style="display:inline;vertical-align:-2px"')} 모집자 승인을 기다리는 중</span><button class="btn btn-ghost btn-sm" data-act="g-leave" data-id="${g.id}">신청 취소</button>`;
      case 'approved':
        if (g.type === 'taxi') return `${chatBtn}<button class="btn btn-primary" data-act="g-final" data-id="${g.id}">출발 전 최종 확인</button><button class="btn btn-ghost btn-sm" data-act="g-leave" data-id="${g.id}">참여 취소</button>`;
        return st === 'recruit' || st === 'full'
          ? `${chatBtn}<button class="btn btn-primary" data-act="g-menu" data-id="${g.id}">${icon('utensils', 18)}${m.items && m.items.length ? '내 메뉴 수정' : '내 메뉴 담기'}</button><button class="btn btn-ghost btn-sm" data-act="g-leave" data-id="${g.id}">참여 취소</button>`
          : `${chatBtn}<button class="btn btn-mint" data-act="g-recv" data-id="${g.id}">${icon('check', 18)}음식 받았어요</button>`;
      case 'final': return `${chatBtn}<button class="btn btn-mint" data-act="g-settle" data-id="${g.id}">${icon('check', 18)}이용 완료 · 정산</button>`;
      case 'done': return `<span class="badge b-school">${icon('check', 13)}완료 · 후기를 남겼어요</span>${rvBtn(g.type, `${gTitle(g)} ${g.type === 'taxi' ? '택시팟' : '배달팟'} 후기`, (S.settle[g.id] || {}).stars)}`;
      case 'rejected': return '<span class="muted">정원이 차서 참여하지 못했어요.</span>';
      default: return '<span class="muted">참여를 취소했어요.</span>';
    }
  }
  function settleBlock(g) {
    const rec = S.settle[g.id]; if (!rec) return '';
    return `<section class="card pad"><h2 class="block-title">${icon('file', 18)}정산 기록</h2>
      <div class="split-table">${rec.shares.map((x) => `<div><span>${esc(x.nick)}${x.nick === D.me.nick ? ' (나)' : ''}</span><b>${wonN(x.amount)}</b></div>`).join('')}<div class="tot"><span>합계</span><b>${wonN(rec.total)}</b></div></div>
      <p class="small muted" style="margin-top:8px">이음은 금액만 기록해요. 송금은 참여자끼리 직접 하고, 이음은 돈을 보관하지 않아요.</p></section>`;
  }
  function pageTaxiOne(id) {
    const g = findG(id); if (!g || g.type !== 'taxi') return notFound();
    const n = gCount(g), st = gStatus(g);
    return `<a class="back-link" href="#taxi">${icon('left', 18)}택시 목록</a>
    <div class="detail-grid"><div class="grid" style="gap:16px">
      <section class="card pad g-hero"><div class="lc-top">${stChip(g)}${sampleTag(g)}${st === 'recruit' ? `<span class="lc-time">${icon('clock', 14)}모집 마감까지 ${untilEl(g.closeAt)}</span>` : ''}</div>
        <h1 class="g-route"><span>${esc(g.from)}</span>${icon('arrow', 22)}<span>${esc(g.to)}</span></h1>
        <div class="meta">${icon('clock')}<span>출발 ${clock(g.departAt)} · 모집 마감 ${clock(g.closeAt)} · 모집자 ${esc(g.leader.nick)} (신뢰도 ${g.leader.trust})</span></div></section>
      ${peopleBlock(g)}
      <section class="card pad"><h2 class="block-title">${icon('sparkle', 18)}예상 비용</h2>
        <div class="kv three"><div><small>예상 택시비 (모집자 입력)</small><b>${wonN(g.fare)}</b></div><div><small>지금 ${n}명이면 1인</small><b>${wonN(ceil10(g.fare / n))}</b></div><div><small>${g.cap}명 다 차면 1인</small><b>${wonN(ceil10(g.fare / g.cap))}</b></div></div>
        <p class="small muted" style="margin-top:10px">실제 금액은 <b>택시 미터기 요금</b>으로 정해요. 내리는 곳이 다르면 이용 완료 후 정산 화면에서 사람마다 금액을 조정할 수 있어요. 10원 단위로 올려서 계산했어요.</p></section>
      ${settleBlock(g)}
      <section class="card pad"><h2 class="block-title">${icon('shield', 18)}안전하게 타요</h2>
        <ul class="rules"><li>${icon('pin')}모이는 곳: <b>${esc(g.from)}</b> — 밝고 사람이 많은 곳에서 모여요</li><li>${icon('check')}참여자는 모두 학교 인증 학생이에요</li>
          <li>${icon('alert')}이음은 택시를 호출하지 않아요. 모인 뒤 카카오T 등으로 <b>직접 호출</b>하세요</li><li>${icon('flag')}불편한 일이 생기면 바로 신고하세요. 담당자 전원에게 전달돼요</li></ul>
        ${lateNight(g.departAt) ? `<div class="info-box amber" style="margin-top:10px">${icon('moon', 18)}<span>늦은 시간 출발이에요. 친구에게 동행 정보를 알려 두세요.</span></div>` : ''}</section>
      ${g.note ? `<section class="card pad"><h2 class="block-title">모집자 메모</h2><p class="prose">${esc(g.note)}</p></section>` : ''}
      <div class="report-row"><button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="택시 동행 · ${esc(taxiTitle(g))}" data-fake="1">${icon('flag', 15)}허위 모집글 신고</button>${g.mine ? '' : `<button class="btn btn-sm btn-ghost" data-act="block" data-key="${esc(g.leader.nick)}">${icon('ban', 15)}모집자 차단</button>`}</div>
    </div>
    <aside class="detail-aside"><section class="card pad g-actions">${gActions(g)}</section></aside></div>`;
  }
  function pageDeliveryOne(id) {
    const g = findG(id); if (!g || g.type !== 'delivery') return notFound();
    const n = gCount(g), st = gStatus(g), tot = orderTotal(g), pct = Math.min(100, Math.round((tot / g.minOrder) * 100));
    const me = isIn(g) ? gPeople(g).find((p) => p.me || (g.mine && p === g.leader)) : null;
    const feeShare = ceil10(g.fee / n);
    return `<a class="back-link" href="#delivery">${icon('left', 18)}공동 주문 목록</a>
    <div class="detail-grid"><div class="grid" style="gap:16px">
      <section class="card pad g-hero"><div class="lc-top">${stChip(g)}${sampleTag(g)}<span class="chip sm-chip">${esc(g.cat)}</span>${st === 'recruit' ? `<span class="lc-time">${icon('clock', 14)}주문 마감까지 ${untilEl(g.closeAt)}</span>` : ''}</div>
        <h1 class="g-route"><span>${esc(g.shop)}</span></h1>
        <div class="meta">${icon('pin')}<span>${esc(g.pickup)}에서 받아요 · 마감 ${clock(g.closeAt)} · 모집자 ${esc(g.leader.nick)} (신뢰도 ${g.leader.trust})</span></div>
        <div class="min-bar big" aria-label="최소 주문 금액 ${pct}퍼센트 달성"><i style="width:${pct}%" class="${pct >= 100 ? 'ok' : ''}"></i></div>
        <div class="small"><b>${wonN(tot)}</b> / 최소 주문 ${wonN(g.minOrder)} · ${pct >= 100 ? '<span class="ok-txt">최소 금액 달성</span>' : `${wonN(g.minOrder - tot)} 더 필요해요`}</div></section>
      ${peopleBlock(g)}
      <section class="card pad"><h2 class="block-title">${icon('sparkle', 18)}비용 나누기</h2>
        <p class="small muted" style="margin-bottom:10px"><b>음식값은 각자 담은 만큼</b>, 배달비 ${wonN(g.fee)}는 참여자 ${n}명이 똑같이 나눠요 (1인 ${wonN(feeShare)}, 10원 단위 올림).</p>
        ${me ? `<div class="split-table"><div><span>내 음식값</span><b>${wonN(itemsSum(me.items))}</b></div><div><span>배달비 나눔</span><b>${wonN(feeShare)}</b></div><div class="tot"><span>내가 낼 금액 (예상)</span><b>${wonN(itemsSum(me.items) + feeShare)}</b></div></div>
          ${me.items.length ? `<ul class="my-items">${me.items.map((x) => `<li>${esc(x.n)} × ${x.q}<span>${wonN(x.p * x.q)}</span></li>`).join('')}</ul>` : ''}`
        : `<div class="kv three"><div><small>배달비</small><b>${wonN(g.fee)}</b></div><div><small>지금 1인 배달비</small><b>${wonN(feeShare)}</b></div><div><small>내가 오면 1인</small><b>${wonN(ceil10(g.fee / (n + 1)))}</b></div></div>`}
        ${isIn(g) ? `<details style="margin-top:10px"><summary class="small" style="cursor:pointer;font-weight:700">참여자별 주문 내역</summary><div class="split-table" style="margin-top:8px">${gPeople(g).map((p) => `<div><span>${esc(p.nick)}</span><b>${wonN(itemsSum(p.items) + feeShare)}</b></div>`).join('')}<div class="tot"><span>총 결제 (음식 + 배달비)</span><b>${wonN(tot + g.fee)}</b></div></div><p class="small muted">10원 단위 올림 때문에 합계가 몇십 원 다를 수 있어요. 남는 금액은 모집자가 돌려줘요.</p></details>` : ''}</section>
      ${settleBlock(g)}
      <section class="card pad"><h2 class="block-title">${icon('shield', 18)}이렇게 운영해요</h2>
        <ul class="rules"><li>${icon('check')}모집자가 배달앱에서 직접 주문·결제하고, 참여자는 모집자에게 각자 송금해요. <b>이음은 돈을 보관하지 않아요</b></li>
          <li>${icon('lock')}계좌 안내는 참여가 확정된 사람만 있는 채팅방에서만 해 주세요</li>
          <li>${icon('alert')}주문 마감 뒤에는 취소할 수 없어요. 미입금·음식 미전달은 신고해 주세요</li><li>${icon('pin')}받는 곳: <b>${esc(g.pickup)}</b></li></ul></section>
      ${g.note ? `<section class="card pad"><h2 class="block-title">모집자 메모</h2><p class="prose">${esc(g.note)}</p></section>` : ''}
      <div class="report-row"><button class="btn btn-sm btn-ghost-danger" data-act="report" data-label="공동 주문 · ${esc(g.shop)}" data-fake="1">${icon('flag', 15)}허위 모집글·미입금 신고</button>${g.mine ? '' : `<button class="btn btn-sm btn-ghost" data-act="block" data-key="${esc(g.leader.nick)}">${icon('ban', 15)}모집자 차단</button>`}</div>
    </div>
    <aside class="detail-aside"><section class="card pad g-actions">${gActions(g)}</section></aside></div>`;
  }

  /* ── 모집글 올리기 ── */
  const spotOpts = (cur) => D.lifeSpots.map((x) => `<option ${x.name === cur ? 'selected' : ''}>${x.name}</option>`).join('') + '<option value="__custom">직접 입력</option>';
  function pageTaxiNew() {
    if (!S.verified) return lifeHead('taxi', '같은 방향 가는 학생과 택시비를 나눠요.') + gatePanel('택시 동행 모집');
    return `<div class="survey-wrap">${lifeHead('taxi', '모집글을 올리면 같은 방향 학생이 참여를 신청해요. 승인은 내가 해요.')}
      <form data-form="taxi" class="card form-section grid" style="gap:14px" novalidate>
        <div class="form-grid two"><div class="field"><label for="tx-from">출발</label><select class="select" id="tx-from" name="from">${spotOpts('정문 버스정류장')}</select><input class="input custom-spot" name="fromC" placeholder="출발 장소 직접 입력" hidden></div>
          <div class="field"><label for="tx-to">도착</label><select class="select" id="tx-to" name="to">${spotOpts('충주공용버스터미널')}</select><input class="input custom-spot" name="toC" placeholder="도착 장소 직접 입력" hidden></div></div>
        <span class="hint">지도 검색(카카오 장소 검색)은 아직 연결 전이라, 자주 가는 장소 목록과 직접 입력으로 받아요.</span>
        <div class="form-grid three"><div class="field"><label for="tx-time">출발 시간</label><input class="input" type="time" id="tx-time" name="time" value="${(() => { const d = new Date(Date.now() + 3600000); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes() - (d.getMinutes() % 10)).padStart(2, '0')}`; })()}"></div>
          <div class="field"><label for="tx-close">모집 마감</label><select class="select" id="tx-close" name="close"><option value="10">출발 10분 전</option><option value="20" selected>출발 20분 전</option><option value="30">출발 30분 전</option></select></div>
          <div class="field"><label for="tx-cap">최대 인원 (나 포함)</label><select class="select" id="tx-cap" name="cap"><option>2</option><option>3</option><option selected>4</option></select></div></div>
        <div class="field"><label for="tx-fare">예상 택시비</label><div class="input-group"><input class="input" id="tx-fare" name="fare" type="number" min="1000" step="500" inputmode="numeric" placeholder="15000"><span class="suffix">원</span></div><span class="hint">대략 적어 주세요. 실제 금액은 미터기 요금으로 정산해요.</span></div>
        <div class="field"><label for="tx-note">참고 사항</label><textarea class="textarea" id="tx-note" name="note" placeholder="예) 캐리어 1개 있어요 · 정류장 벤치 앞에서 모여요"></textarea><span class="hint">계좌번호·외부 메신저 아이디는 올릴 수 없어요.</span></div>
        <p class="error-text" id="tx-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">택시 동행 모집하기</button>
      </form></div>`;
  }
  function pageDeliveryNew() {
    if (!S.verified) return lifeHead('delivery', '배달비를 나눠요.') + gatePanel('공동 주문 모집');
    return `<div class="survey-wrap">${lifeHead('delivery', '음식점과 조건을 올리면 같이 시킬 학생이 참여를 신청해요.')}
      <form data-form="delivery" class="card form-section grid" style="gap:14px" novalidate>
        <div class="form-grid two"><div class="field"><label for="dl-shop">음식점 이름</label><input class="input" id="dl-shop" name="shop" maxlength="30" placeholder="예) 정문 치킨"></div>
          <div class="field"><label for="dl-cat">음식 종류</label><select class="select" id="dl-cat" name="cat">${D.deliveryCats.map((c) => `<option>${c}</option>`).join('')}</select></div></div>
        <div class="form-grid two"><div class="field"><label for="dl-pick">받는 곳</label><select class="select" id="dl-pick" name="pickup">${D.safePlaces.filter((p) => !p.off).map((p) => `<option>${p.name}</option>`).join('')}</select></div>
          <div class="field"><label for="dl-close">주문 마감</label><select class="select" id="dl-close" name="close"><option value="15">15분 뒤</option><option value="30" selected>30분 뒤</option><option value="45">45분 뒤</option><option value="60">1시간 뒤</option></select></div></div>
        <div class="form-grid three"><div class="field"><label for="dl-min">최소 주문 금액</label><div class="input-group"><input class="input" id="dl-min" name="min" type="number" min="0" step="500" inputmode="numeric" placeholder="20000"><span class="suffix">원</span></div></div>
          <div class="field"><label for="dl-fee">배달비</label><div class="input-group"><input class="input" id="dl-fee" name="fee" type="number" min="0" step="100" inputmode="numeric" placeholder="3000"><span class="suffix">원</span></div></div>
          <div class="field"><label for="dl-cap">최대 인원 (나 포함)</label><select class="select" id="dl-cap" name="cap">${[2, 3, 4, 5, 6].map((x) => `<option ${x === 4 ? 'selected' : ''}>${x}</option>`).join('')}</select></div></div>
        <div class="form-grid two"><div class="field"><label for="dl-item">내 메뉴</label><input class="input" id="dl-item" name="item" maxlength="30" placeholder="예) 후라이드 반 마리"></div>
          <div class="field"><label for="dl-price">내 메뉴 가격</label><div class="input-group"><input class="input" id="dl-price" name="price" type="number" min="0" step="100" inputmode="numeric" placeholder="9000"><span class="suffix">원</span></div></div></div>
        <div class="field"><label for="dl-note">참고 사항</label><textarea class="textarea" id="dl-note" name="note" placeholder="예) 생활관 1층 로비에서 나눠요"></textarea><span class="hint">음식점·메뉴는 직접 입력해요. 배달앱 자동 주문은 연결돼 있지 않아요.</span></div>
        <p class="error-text" id="dl-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">공동 주문 모집하기</button>
      </form></div>`;
  }

  /* ── 모달: 메뉴 담기 · 정산 · 그룹 채팅 ── */
  function openOrderMenu(g) {
    const items = (S.gm[g.id] && S.gm[g.id].items) || [];
    const row = (x, i) => `<div class="menu-row"><input class="input" name="n${i}" placeholder="메뉴 이름" value="${esc(x ? x.n : '')}" aria-label="메뉴 ${i + 1} 이름"><input class="input" name="p${i}" type="number" min="0" step="100" placeholder="가격" value="${x ? x.p : ''}" aria-label="메뉴 ${i + 1} 가격"><input class="input" name="q${i}" type="number" min="1" max="9" value="${x ? x.q : 1}" aria-label="메뉴 ${i + 1} 수량"></div>`;
    openModal(modalBox(`${esc(g.shop)} · 내 메뉴 담기`, `<form data-form="g-menu" data-id="${g.id}" class="grid" style="gap:10px">
      <div class="menu-head small muted"><span>메뉴</span><span>가격(원)</span><span>수량</span></div>
      ${[0, 1, 2].map((i) => row(items[i], i)).join('')}
      <p class="small muted">주문 마감(${clock(g.closeAt)}) 전까지 바꿀 수 있어요.</p>
      <p class="error-text" id="gm-err" role="alert"></p>
      <div class="modal-actions"><button type="button" class="btn btn-outline" data-act="close">취소</button><button class="btn btn-primary" type="submit">담기</button></div></form>`));
  }
  function openSettle(g) {
    const ppl = gPeople(g), each = ceil10(g.fare / ppl.length);
    openModal(modalBox('이용 완료 · 정산', `<form data-form="g-settle" data-id="${g.id}" class="grid" style="gap:12px">
      <div class="field"><label for="st-total">실제 미터기 요금</label><div class="input-group"><input class="input" id="st-total" name="total" type="number" min="0" step="100" value="${g.fare}" data-split="${ppl.length}"><span class="suffix">원</span></div></div>
      <div class="field"><span class="field-label">한 사람씩 낼 금액 · 내리는 곳이 다르면 바꿔 주세요</span>
        ${ppl.map((p, i) => `<div class="share-row"><span>${esc(p.nick)}${p.me || (g.mine && i === 0) ? ' (나)' : ''}</span><div class="input-group"><input class="input" name="s${i}" type="number" min="0" step="10" value="${each}" aria-label="${esc(p.nick)} 금액"><span class="suffix">원</span></div></div>`).join('')}
        <button type="button" class="link-btn small" data-act="split-even">똑같이 나누기</button></div>
      <fieldset style="border:0"><legend class="field-label">동행 후기</legend><div class="star-input">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="gs${n}" name="stars" value="${n}" ${n === 5 ? 'checked' : ''}><label for="gs${n}" aria-label="${n}점">★</label>`).join('')}</div></fieldset>
      <p class="small muted">금액 합계가 실제 요금과 같아야 저장돼요. 송금은 참여자끼리 직접 해요.</p>
      <p class="error-text" id="st-err" role="alert"></p>
      <div class="modal-actions"><button class="btn btn-primary btn-lg" type="submit">정산 기록하고 완료</button></div></form>`));
  }
  function openRecv(g) {
    const ppl = gPeople(g), fs = ceil10(g.fee / ppl.length);
    openModal(modalBox('음식 받기 완료', `<form data-form="g-recv" data-id="${g.id}" class="grid" style="gap:12px">
      <div class="split-table">${ppl.map((p) => `<div><span>${esc(p.nick)}</span><b>${wonN(itemsSum(p.items) + fs)}</b></div>`).join('')}<div class="tot"><span>총액 (음식 ${wonN(orderTotal(g))} + 배달비 ${wonN(g.fee)})</span><b>${wonN(orderTotal(g) + g.fee)}</b></div></div>
      <fieldset style="border:0"><legend class="field-label">공동 주문 후기</legend><div class="star-input">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="gr${n}" name="stars" value="${n}" ${n === 5 ? 'checked' : ''}><label for="gr${n}" aria-label="${n}점">★</label>`).join('')}</div></fieldset>
      <p class="small muted">이 금액표가 정산 기록으로 남아요. 송금은 참여자끼리 직접 해요.</p>
      <div class="modal-actions"><button class="btn btn-primary btn-lg" type="submit">받았어요 · 완료</button></div></form>`));
  }
  function openGChat(g) {
    const ppl = gPeople(g).filter((p) => !p.me && !(g.mine && p === g.leader));
    const names = ppl.map((p) => p.nick);
    const speak = (i, t) => `${names[i % Math.max(names.length, 1)] || '참여자'}: ${t}`;
    const key = 'g-' + g.id;
    if (!S.chats[key]) S.chats[key] = [{ t: 'sys', text: `참여가 확정된 ${gCount(g)}명만 있는 비공개 채팅방이에요.${g.type === 'delivery' ? ' 계좌 안내는 이 방에서만 해 주세요. 이음은 돈을 보관하지 않아요.' : ' 택시는 모인 뒤 직접 호출해요.'}`, at: nowTime() }];
    openChat(key, { name: g.type === 'taxi' ? `택시 · ${taxiTitle(g)}` : `공동 주문 · ${g.shop}`, trust: g.leader.trust,
      greeting: speak(0, g.type === 'taxi' ? `안녕하세요! ${clock(g.departAt)}에 ${g.from}에서 봬요.` : `안녕하세요! ${clock(g.closeAt)}에 주문 마감할게요. 메뉴 담아 주세요.`),
      ctx: ctxBar(icon(g.type === 'taxi' ? 'car' : 'utensils', 22), gTitle(g), `${gCount(g)}명 참여 · ${G_STATUS[gStatus(g)][0]}`),
      quick: g.type === 'taxi' ? ['도착했어요!', '5분 정도 늦을 것 같아요', '택시 호출할게요', '정산은 미터기 기준으로 해요'] : ['메뉴 담았어요', '도착하면 알려 주세요', '송금은 받은 뒤에 할게요', '감사합니다!'],
      replies: g.type === 'taxi' ? [speak(0, '네 좋아요!'), speak(1, '저도 거의 도착했어요.'), speak(0, '정산은 내릴 때 미터기 보고 나눠요.')] : [speak(0, '확인했어요!'), speak(1, '저도 담았어요.'), speak(0, '도착하면 채팅 남길게요.')] });
  }

  /* 실거래 시세 비교: 환산 월세 = 월세 + 보증금 × 연 6% ÷ 12 */
  function rentCompare(r) {
    const v = rentVs(r), R = window.CM_RENT; if (!v) return '';
    const b = v.base, max = Math.max(v.conv, b.convMed, b.rent75 + b.depMed * 0.005) * 1.15;
    const bar = (label, val, cls) => `<div class="rc-row"><span>${label}</span><div class="rc-bar"><i class="${cls}" style="width:${Math.round((val / max) * 100)}%"></i></div><b>${val}만</b></div>`;
    const warn = v.pct <= -30 ? `<div class="info-box amber" style="margin-top:10px">${icon('alert', 18)}<span>시세보다 많이 싸요. 허위 매물일 수 있으니 <b>방을 직접 보고 등기부등본을 확인</b>하기 전에는 돈을 보내지 마세요.</span></div>` : '';
    return `<section class="card pad rent-compare"><h2 class="block-title">${icon('sparkle', 18)}실거래 시세와 비교 ${rentTag(r)}</h2>
      ${bar('이 방', v.conv, 'me')}${bar(`대소원면 ${v.key} 중앙값`, b.convMed, 'base')}
      <p class="small muted" style="margin-top:8px">보증금을 월세로 바꿔 더한 <b>환산 월세</b>로 비교했어요 (보증금 × 연 6% ÷ 12). 같은 크기 실거래 ${b.n}건 · 월세 ${b.rent25}~${b.rent75}만이 가운데 절반이에요.</p>
      <p class="small muted">출처: ${esc(R.source)} · ${R.period.slice(0, 4)}.${R.period.slice(4, 6)}~${R.period.slice(7, 11)}.${R.period.slice(11)}</p>${warn}</section>`;
  }

  /* ── 팀 전용 공간: 합류한 팀원과 팀장만 들어올 수 있어요 ── */
  function teamMembers(t) {
    const base = [{ nick: t.leader.nick, role: '팀장', dept: t.leader.dept, me: !!t.mine }];
    /* 예시 팀: 이미 찬 자리(팀장 제외 최대 2명)를 역할이 맞는 예시 학생으로 채워 보여 줘요 */
    const used = new Set();
    const others = t.mine ? (t.members || []) : t.positions.filter((p) => p.got > 0).slice(1, 3).map((p) => {
      const pp = D.people.find((x) => !used.has(x.id) && x.roles.includes(p.role)) || D.people.find((x) => !used.has(x.id)); used.add(pp.id);
      return { nick: pp.nick, role: p.role, dept: pp.dept }; });
    return [...base, ...others, ...(joinedRole(t) ? [{ nick: D.me.nick, role: joinedRole(t), dept: S.survey.dept, me: true }] : [])];
  }
  const teamTasks = (t) => S.teamTasks[t.id] || [
    { id: 'k1', text: '역할·마감일 정리 문서 만들기', who: t.leader.nick, due: '', done: true },
    { id: 'k2', text: '공모전 요강 다시 읽고 필수 제출물 체크', who: '모두', due: t.contest && findContest(t.contest) ? findContest(t.contest).deadline : '', done: false },
    { id: 'k3', text: '1차 기획안 초안 공유', who: t.leader.nick, due: '', done: false },
  ];
  const teamPosts = (t) => S.teamPosts[t.id] || [{ who: t.leader.nick, text: `합류 환영해요! 정기 회의는 ${t.meet}이에요. 첫 회의 전까지 자기소개와 가능한 시간을 남겨 주세요.`, when: '공지', pin: true }];
  const taskStat = (t) => { const ts = teamTasks(t); return { all: ts.length, done: ts.filter((x) => x.done).length }; };
  function pageTeamRoom(id) {
    const t = findTeam(id); if (!t) return notFound();
    if (!inTeam(t)) return `<a class="back-link" href="#teams-${id}">${icon('left', 18)}모집글</a><div class="card empty" style="margin-top:16px">${icon('lock', 36)}<b>팀원만 들어올 수 있어요</b>팀장이 지원을 승인하면 팀 공간이 열려요.</div>`;
    const k = t.contest && findContest(t.contest), mem = teamMembers(t), ts = teamTasks(t), st = taskStat(t), posts = teamPosts(t), done = S.teamDone[t.id];
    return `<a class="back-link" href="#teams-${id}">${icon('left', 18)}모집글 보기</a>
    <section class="troom-head card pad"><div class="lc-top"><span class="st-chip ${done ? 'st-done' : 'st-progress'}">${done ? '완주' : '진행 중'}</span><span class="badge b-gray">${icon('lock', 12)}팀원 전용</span>${k ? ddayPill(k.deadline) : ''}</div>
      <h1 class="detail-title">${esc(t.title)}</h1>
      ${k ? `<a class="contest-link" href="#contests-${k.id}"><span class="cl-emoji" style="background:${k.color}" aria-hidden="true">${k.emoji}</span><span class="cl-txt"><small>참가 공모전 · 마감 ${fmtDate(k.deadline)}</small><b>${esc(k.title)}</b></span>${icon('right', 18)}</a>` : ''}
      <div class="troom-meta">${icon('calendar', 16)}<span>정기 회의 ${esc(t.meet)} · ${esc(t.mode)}</span></div>
      <div class="troom-actions"><button class="btn btn-primary" data-act="troom-chat" data-id="${t.id}">${icon('chats', 18)}팀 채팅방</button>${done ? rvBtn('team', `${t.title} 완주 후기`, 5, ['끝까지 완주'], 'btn-outline') : `<button class="btn btn-outline" data-act="team-finish" data-id="${t.id}">${icon('trophy', 18)}프로젝트 마무리 · 팀원 평가</button>`}</div></section>
    <div class="troom-grid">
      <section class="card pad"><div class="troom-sh"><h2 class="block-title" style="margin:0">${icon('check', 18)}할 일 ${st.done}/${st.all}</h2><span class="small muted">${st.all ? Math.round((st.done / st.all) * 100) : 0}% 완료</span></div>
        <div class="min-bar" style="margin:10px 0"><i class="ok" style="width:${st.all ? (st.done / st.all) * 100 : 0}%"></i></div>
        <ul class="task-list">${ts.map((x) => `<li class="${x.done ? 'done' : ''}"><button class="task-check" data-act="task-toggle" data-id="${t.id}" data-task="${x.id}" aria-pressed="${x.done}" aria-label="${esc(x.text)} ${x.done ? '완료 취소' : '완료'}">${x.done ? icon('check', 14) : ''}</button><span class="tk-body"><b>${esc(x.text)}</b><small class="muted">${esc(x.who)}${x.due ? ` · ~${fmtDate(x.due)}` : ''}</small></span></li>`).join('')}</ul>
        <form data-form="task" data-id="${t.id}" class="task-form"><input class="input" name="text" maxlength="60" placeholder="할 일 추가" aria-label="할 일"><select class="select" name="who" aria-label="담당">${['모두', ...mem.map((m) => m.nick)].map((n) => `<option>${esc(n)}</option>`).join('')}</select><input class="input" type="date" name="due" min="${TODAY}" aria-label="마감일"><button class="btn btn-primary" type="submit">추가</button></form></section>
      <section class="card pad"><h2 class="block-title">${icon('users', 18)}팀원 ${mem.length}명</h2>
        ${mem.map((m) => `<div class="ppl-row">${avatar(m.nick)}<span><b>${esc(m.nick)}${m.me ? ' <span class="badge b-school">나</span>' : ''}</b><small class="muted">${esc(m.role)} · ${esc(m.dept)}</small></span></div>`).join('')}
        <p class="small muted" style="margin-top:8px">팀 공간의 글·할 일·채팅은 팀원에게만 보여요.</p></section>
      <section class="card pad troom-board"><h2 class="block-title">${icon('edit', 18)}팀 게시판</h2>
        <form data-form="tpost" data-id="${t.id}" class="comment-form"><input class="input" name="text" maxlength="200" placeholder="회의록, 자료 링크, 공지를 남겨요" aria-label="팀 게시판 글"><button class="btn btn-primary" type="submit">올리기</button></form>
        <div class="tposts">${posts.map((x) => `<div class="tpost ${x.pin ? 'pin' : ''}">${avatar(x.who, 'sm')}<div><b class="small">${esc(x.who)}</b> <span class="small muted">${x.when}</span><p>${esc(x.text)}</p></div></div>`).join('')}</div></section>
    </div>`;
  }
  function openTeamChat(t) {
    const mem = teamMembers(t).filter((m) => !m.me), key = 'troom-' + t.id;
    if (!S.chats[key]) S.chats[key] = [{ t: 'sys', text: `팀원 ${teamMembers(t).length}명만 있는 비공개 채팅방이에요.`, at: nowTime() }];
    const sp = (i, x) => `${(mem[i % Math.max(mem.length, 1)] || { nick: '팀원' }).nick}: ${x}`;
    openChat(key, { name: `팀 · ${t.title}`, trust: t.leader.trust || 90, greeting: sp(0, '다들 반가워요! 이번 주 회의 전에 할 일 목록 한 번씩 확인해 주세요.'),
      ctx: ctxBar(icon('users', 22), t.title, `팀원 ${teamMembers(t).length}명 · 할 일 ${taskStat(t).done}/${taskStat(t).all}`),
      quick: ['회의 시간 괜찮아요', '자료 게시판에 올렸어요', '이번 주는 조금 늦어요', '역할 다시 정해 봐요'],
      replies: [sp(0, '좋아요! 회의록은 게시판에 남길게요.'), sp(1, '확인했어요 👍'), sp(0, '마감 일주일 전에는 최종본 맞춰 봐요.')] });
  }
  function openTeamFinish(t) {
    const mem = teamMembers(t).filter((m) => !m.me);
    openModal(modalBox('프로젝트 마무리 · 팀원 평가', `<form data-form="team-finish" data-id="${t.id}" class="grid" style="gap:12px">
      <p class="small muted">끝까지 함께한 팀원을 평가해요. 평가는 익명으로 모여 각자의 <b>완주율과 신뢰도</b>에 반영돼요.</p>
      ${mem.map((m, i) => `<div class="rate-row"><span><b>${esc(m.nick)}</b><small class="muted"> · ${esc(m.role)}</small></span><select class="select" name="r-${i}" aria-label="${esc(m.nick)} 평가">${[['5', '최고였어요'], ['4', '좋았어요'], ['3', '보통이에요'], ['2', '아쉬웠어요'], ['1', '참여가 거의 없었어요']].map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>`).join('')}
      <div class="modal-actions"><button type="button" class="btn btn-outline" data-act="close">취소</button><button class="btn btn-primary" type="submit">평가 보내고 완주하기</button></div></form>`));
  }

  /* ── 공모전 제보: 운영자 확인 전에는 목록에 올라가지 않아요 ── */
  function pageContestNew() {
    if (!S.verified) return `<a class="back-link" href="#contests">${icon('left', 18)}공모전</a>` + gatePanel('공모전 제보');
    return `<div class="survey-wrap"><a class="back-link" href="#contests">${icon('left', 18)}공모전</a>
      <div class="page-head"><div><h1>공모전 제보하기</h1><p>공식 공지 주소와 함께 보내 주세요. <b>운영자가 확인한 뒤</b> 목록에 올라가요.</p></div></div>
      <form data-form="contest-report" class="card form-section grid" style="gap:14px" novalidate>
        <div class="field"><label for="cr-title">공모전 이름</label><input class="input" id="cr-title" name="title" maxlength="60" placeholder="예) 2027 대학생 공공데이터 활용 아이디어 공모전"></div>
        <div class="form-grid two"><div class="field"><label for="cr-host">주최 기관</label><input class="input" id="cr-host" name="host" maxlength="40" placeholder="예) ○○시청"></div>
          <div class="field"><label for="cr-cat">분야</label><select class="select" id="cr-cat" name="cat">${D.contestCats.map((c) => `<option>${c}</option>`).join('')}</select></div></div>
        <div class="form-grid two"><div class="field"><label for="cr-dl">접수 마감일</label><input class="input" type="date" id="cr-dl" name="deadline" min="${TODAY}"></div>
          <div class="field"><label for="cr-url">공식 공지 주소</label><input class="input" id="cr-url" name="url" inputmode="url" placeholder="https://"></div></div>
        <div class="field"><label for="cr-memo">한 줄 소개 (선택)</label><input class="input" id="cr-memo" name="memo" maxlength="80" placeholder="예) 팀 3~5명, 기획서만 내도 돼요"></div>
        <label class="check"><input type="checkbox" name="src"><span>공식 공지(주최 측 홈페이지·공고문)에서 직접 확인한 내용이에요. 다른 사이트의 글이나 이미지를 그대로 옮기지 않았어요.</span></label>
        <p class="error-text" id="cr-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">${icon('send', 18)}제보 보내기</button>
      </form></div>`;
  }

  /* ── 동아리 공간: 가입이 승인된 부원만 ── */
  const isMember = (c) => !!c && S.applied[c.id] === '가입 승인';
  const clubPosts = (c) => S.clubPosts[c.id] || [
    { who: `${c.name} 운영진`, text: `가입을 환영해요! 첫 정기 모임은 ${c.day}, ${c.room}에서 해요. ${c.welcome.join('·')} 모두 부담 없이 오세요.`, when: '공지', pin: true },
    { who: `${c.name} 운영진`, text: `회비(${c.fee})는 첫 모임에서 직접 안내해요. 모임 전에 송금을 요구하는 연락은 신고해 주세요.`, when: '공지', pin: true },
  ];
  function pageClubRoom(id) {
    const c = findClub(id); if (!c) return notFound();
    if (!isMember(c)) return `<a class="back-link" href="#clubs-${id}">${icon('left', 18)}동아리 소개</a><div class="card empty" style="margin-top:16px">${icon('lock', 36)}<b>부원만 들어올 수 있어요</b>운영진이 가입을 승인하면 동아리 공간이 열려요.</div>`;
    const evs = D.events.filter((e) => e.club === c.id && e.date >= TODAY), posts = clubPosts(c);
    return `<a class="back-link" href="#clubs-${id}">${icon('left', 18)}동아리 소개</a>
    <section class="club-hero sm" style="background:${c.color}">${clubArt(c, 'lg')}<div><span class="hc-kicker">${icon('lock', 12)} 부원 전용</span><h1>${esc(c.name)}</h1><p>부원 ${c.members + 1}명 · ${esc(c.day)} · ${esc(c.room)}</p></div></section>
    <div class="troom-actions" style="margin:12px 0 4px"><button class="btn btn-primary" data-act="croom-chat" data-id="${c.id}">${icon('chats', 18)}동아리 채팅방</button><button class="btn btn-ghost btn-sm" data-act="club-leave" data-id="${c.id}">동아리 나가기</button></div>
    <div class="troom-grid">
      <section class="card pad"><h2 class="block-title">${icon('calendar', 18)}활동 일정</h2>
        <div class="list-row"><span class="lr-art" style="background:${c.color}">${icon('clock', 20)}</span><span class="lr-body"><b>정기 모임</b><span class="small muted">${esc(c.day)} · ${esc(c.room)}</span></span><span class="badge b-proof">매주</span></div>
        ${evs.map((e) => { const d = dayInfo(e.date), on = S.going.includes(e.id); return `<div class="list-row"><span class="lr-art" style="background:var(--lav);font-size:14px;font-weight:800">${d.m}/${d.d}</span><span class="lr-body"><a href="#event-${e.id}"><b>${esc(e.title)}</b></a><span class="small muted">${e.time} · ${esc(e.place)}</span></span><button class="btn btn-sm ${on ? 'btn-done' : 'btn-outline'}" data-act="event-join" data-id="${e.id}" aria-pressed="${on}">${on ? '참석' : '참석하기'}</button></div>`; }).join('') || '<p class="small muted" style="margin-top:6px">예정된 동아리 행사가 없어요.</p>'}</section>
      <section class="card pad"><h2 class="block-title">${icon('users', 18)}부원</h2>
        <p style="font-size:14px">부원 <b>${c.members + 1}명</b> · ${c.welcome.join('·')} 함께해요</p>
        <p class="small muted" style="margin-top:6px">개인정보 보호를 위해 전체 부원 명단은 운영진만 볼 수 있어요. 채팅방에서는 닉네임으로 대화해요.</p>
        <div class="info-box amber" style="margin-top:10px">${icon('alert', 18)}<span>뒤풀이·음주 참석은 강요할 수 없어요. 불편한 일은 바로 신고해 주세요.</span></div></section>
      <section class="card pad troom-board"><h2 class="block-title">${icon('edit', 18)}공지 · 게시판</h2>
        <form data-form="cpost" data-id="${c.id}" class="comment-form"><input class="input" name="text" maxlength="200" placeholder="자기소개, 질문, 활동 사진 이야기를 남겨요" aria-label="동아리 게시판 글"><button class="btn btn-primary" type="submit">올리기</button></form>
        <div class="tposts">${posts.map((x) => `<div class="tpost ${x.pin ? 'pin' : ''}">${avatar(x.who, 'sm')}<div><b class="small">${esc(x.who)}</b> <span class="small muted">${x.when}</span><p>${esc(x.text)}</p></div></div>`).join('')}</div></section>
    </div>`;
  }
  function openClubChat(c) {
    const key = 'croom-' + c.id;
    if (!S.chats[key]) S.chats[key] = [{ t: 'sys', text: `${c.name} 부원만 있는 채팅방이에요. 닉네임으로 대화해요.`, at: nowTime() }];
    openChat(key, { name: `${c.name} 부원 채팅`, trust: 90, greeting: `운영진: 새로 오신 분 환영해요! 첫 모임은 ${c.day}이에요 😊`,
      ctx: ctxBar(c.emoji, c.name, `부원 ${c.members + 1}명 · ${esc(c.day)}`, c.color),
      quick: ['안녕하세요! 새로 들어왔어요', '첫 모임 때 준비물 있나요?', '이번 주 모임 참석할게요'],
      replies: ['운영진: 반가워요! 첫 모임엔 편한 복장이면 충분해요.', '선배 부원: 환영해요 👋 모르는 건 편하게 물어보세요!', '운영진: 출석은 채팅으로 남겨 주시면 돼요.'] });
  }

  /* ── 행사 상세 · 함께 갈 사람(행사 메이트) · 행사 후기 ── */
  const findEvent = (id) => D.events.find((e) => e.id === id);
  const evReviews = (id) => [...(D.eventReviews[id] || []), ...(S.evReviews[id] || [])];
  const allMates = (eid) => [...S.myMates, ...D.eventMates].filter((m) => (!eid || m.event === eid) && !S.blocked.includes(m.leader.nick) && findEvent(m.event));
  const findMate = (id) => [...S.myMates, ...D.eventMates].find((m) => m.id === id);
  const emM = (m) => (m.mine ? null : S.emj[m.id] || null);
  const emIn = (m) => m.mine || (emM(m) && emM(m).status === 'approved');
  const emPeople = (m) => [m.leader, ...m.members, ...(!m.mine && emIn(m) ? [{ nick: D.me.nick, trust: myTrust(), dept: S.survey.dept, me: true }] : [])];
  function emStatus(m) { if (m.canceled) return 'cancel'; if (findEvent(m.event).date < TODAY) return 'done'; return emPeople(m).length >= m.cap ? 'full' : 'recruit'; }
  const emChip = (m) => { const [t, c] = G_STATUS[emStatus(m)]; return `<span class="st-chip ${c}">${t}</span>`; };
  const EM_ST = { applied: '수락 대기', approved: '함께 가요', rejected: '정원 마감', left: '취소함' };
  function emActions(m) {
    const st = emStatus(m), j = emM(m), chat = `<button class="btn btn-sm btn-outline" data-act="em-chat" data-id="${m.id}">${icon('chats', 15)}채팅방</button>`;
    if (st === 'cancel') return '<span class="small muted">모집이 취소됐어요</span>';
    if (m.mine) return `${emPeople(m).length >= 2 ? chat : ''}${st === 'done' ? '' : `<button class="btn btn-sm btn-ghost-danger" data-act="em-cancel" data-id="${m.id}">모집 취소</button>`}`;
    if (!j || j.status === 'left') return st === 'recruit' ? `<button class="btn btn-sm btn-primary" data-act="em-apply" data-id="${m.id}">같이 가기 신청</button>` : `<span class="small muted">${G_STATUS[st][0]}</span>`;
    if (j.status === 'applied') return `<span class="small muted">${icon('clock', 13, 'style="display:inline;vertical-align:-2px"')} 수락 대기</span><button class="btn btn-sm btn-ghost" data-act="em-leave" data-id="${m.id}">취소</button>`;
    if (j.status === 'approved') return `${chat}${st === 'done' ? '' : `<button class="btn btn-sm btn-ghost" data-act="em-leave" data-id="${m.id}">취소</button>`}`;
    return '<span class="small muted">정원이 먼저 찼어요</span>';
  }
  function emCard(m) {
    const n = emPeople(m).length;
    return `<article class="em-card"><div class="lc-top">${emChip(m)}${sampleTag(m)}<span class="small muted" style="margin-left:auto">${n}/${m.cap}명</span><span class="seats">${Array.from({ length: m.cap }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span></div>
      <div class="em-who">${avatar(m.leader.nick, 'sm')}<span><b>${esc(m.leader.nick)}</b>${m.mine ? ' <span class="badge b-school">나</span>' : ''}<small class="muted"> · ${esc(m.leader.dept)} · 신뢰도 ${m.leader.trust}</small></span></div>
      <p class="em-note">${esc(m.note)}</p>
      <div class="small muted">${icon('pin', 13, 'style="display:inline;vertical-align:-2px"')} ${esc(m.meet)}에서 만나요 · ${esc(m.when)}</div>
      ${m.mine && m.pending && m.pending.length ? `<div class="pending">${m.pending.map((p) => `<div class="ppl-row">${avatar(p.nick, 'sm')}<span><b>${esc(p.nick)}</b><small class="muted">${esc(p.dept)} · 신뢰도 ${p.trust} (데모 신청자)</small></span><span class="pd-btns"><button class="btn btn-sm btn-ghost" data-act="em-reject" data-id="${m.id}" data-nick="${esc(p.nick)}">거절</button><button class="btn btn-sm btn-primary" data-act="em-approve" data-id="${m.id}" data-nick="${esc(p.nick)}">수락</button></span></div>`).join('')}</div>` : ''}
      <div class="em-act">${emActions(m)}</div></article>`;
  }
  function pageEvent(id) {
    const e = findEvent(id); if (!e) return notFound();
    const di = dayInfo(e.date), going = S.going.includes(e.id), past = e.date < TODAY, mates = allMates(e.id), revs = evReviews(e.id);
    const avg = revs.length ? (revs.reduce((a, r) => a + r.stars, 0) / revs.length).toFixed(1) : null;
    const canReview = going && e.date <= TODAY && !revs.some((r) => r.mine);
    return `<a class="back-link" href="#events">${icon('left', 18)}행사 캘린더</a>
    <div class="detail-grid"><div class="grid" style="gap:16px">
      <section class="card pad ev-hero"><div class="ev-date big" aria-label="${di.m}월 ${di.d}일 ${di.w}요일"><small>${di.m}월</small><b>${di.d}</b><small>${di.w}</small></div>
        <div><span class="ev-type">${e.type}${past ? ' · 끝난 행사' : ''}</span><h1 class="detail-title">${esc(e.title)}</h1>
          <div class="meta">${icon('clock')}<span>${e.time} · ${esc(e.place)}</span></div>
          <div class="meta">${icon('users')}<span>${e.club ? `<a class="ev-host" href="#clubs-${e.club}">${esc(e.host)}</a>` : esc(e.host)} · ${e.going + (going ? 1 : 0)}명 ${past ? '참여함' : '참여 예정'}</span></div>
          <div class="chip-row" style="margin-top:8px">${e.for.map((f) => `<span class="chip">${f} 추천</span>`).join('')}</div></div></section>
      <section aria-labelledby="h-mates"><div class="section-head"><h2 id="h-mates">함께 갈 사람 ${mates.length}</h2>${past ? '' : `<button class="more" data-act="em-new" data-id="${e.id}">같이 갈 사람 모집${icon('right', 16)}</button>`}</div>
        <p class="small muted" style="margin:-4px 0 10px">혼자 가기 어색할 때 같이 갈 학생을 찾아요. 처음 만나는 사람과는 <b>교내 안전 장소</b>에서 만나요.</p>
        ${mates.length ? `<div class="grid" style="gap:10px">${mates.map(emCard).join('')}</div>` : `<div class="empty">${charImg('think', 'empty-char')}<b>아직 함께 갈 사람 모집이 없어요</b>${past ? '' : '먼저 모집해 보세요.'}</div>`}</section>
      <section class="card pad" aria-labelledby="h-rev"><h2 class="block-title" id="h-rev">${icon('star', 18)}행사 후기 ${revs.length}${avg ? ` · <span class="stars" aria-label="평균 ${avg}점">★</span> ${avg}` : ''}</h2>
        ${revs.map((r) => `<div class="review"><div style="display:flex;justify-content:space-between"><b class="small">${esc(r.from)}</b><span class="stars" aria-label="별점 ${r.stars}점">${'★'.repeat(r.stars)}</span></div><p style="font-size:14px;margin:4px 0">${esc(r.text)}</p>${r.tags.length ? `<div class="chip-row">${r.tags.map((x) => `<span class="chip" style="height:24px">${esc(x)}</span>`).join('')}</div>` : ''}</div>`).join('') || '<p class="small muted">아직 후기가 없어요.</p>'}
        ${canReview ? `<form data-form="ev-review" data-id="${e.id}" class="grid" style="gap:10px;margin-top:12px"><b class="small">다녀온 행사 후기 남기기</b>
          <div class="star-input">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="er${n}" name="stars" value="${n}" ${n === 5 ? 'checked' : ''}><label for="er${n}" aria-label="${n}점">★</label>`).join('')}</div>
          <div class="opts">${['신입생에게 추천', '복학생에게 추천', '알찼어요', '사람 많아요', '다시 갈래요'].map((t) => `<label class="opt sm"><input type="checkbox" name="tags" value="${t}"><span>${t}</span></label>`).join('')}</div>
          <textarea class="textarea" name="text" style="min-height:70px" placeholder="다음에 갈 학생에게 도움이 되는 이야기를 남겨 주세요" aria-label="후기 내용"></textarea>
          <button class="btn btn-primary" type="submit">후기 남기기</button></form>`
        : `<p class="small muted" style="margin-top:10px">${revs.some((r) => r.mine) ? `후기를 남겼어요. 고마워요! ${rvBtn('club', `${e.title} 다녀온 후기`, (revs.find((r) => r.mine) || {}).stars, (revs.find((r) => r.mine) || {}).tags || [])}` : '참여 예정에 넣은 행사가 시작되면 후기를 쓸 수 있어요.'}</p>`}</section>
    </div>
    <aside class="detail-aside"><section class="card pad g-actions">${past ? `<span class="muted">끝난 행사예요 · 후기 ${revs.length}개</span>` : `<button class="btn btn-lg ${going ? 'btn-done' : 'btn-primary'}" data-act="event-join" data-id="${e.id}" aria-pressed="${going}">${going ? `${icon('check', 18)}참여 예정` : `${icon('calendar', 18)}참여하기`}</button>`}
      ${past ? '' : `<button class="btn btn-outline" data-act="em-new" data-id="${e.id}">${icon('users', 18)}같이 갈 사람 모집</button>`}</section></aside></div>`;
  }
  function openEmNew(e) {
    openModal(modalBox('같이 갈 사람 모집', `<p class="small muted" style="margin-bottom:12px">${esc(e.title)} · ${dayInfo(e.date).m}월 ${dayInfo(e.date).d}일 ${e.time}</p>
      <form data-form="em-new" data-id="${e.id}" class="grid" style="gap:12px">
        <div class="form-grid two"><div class="field"><label for="emn-cap">최대 인원 (나 포함)</label><select class="select" id="emn-cap" name="cap">${[2, 3, 4, 5].map((x) => `<option ${x === 3 ? 'selected' : ''}>${x}</option>`).join('')}</select></div>
          <div class="field"><label for="emn-when">만나는 시간</label><input class="input" id="emn-when" name="when" maxlength="20" value="행사 30분 전"></div></div>
        <div class="field"><label for="emn-meet">만나는 곳 · 교내 안전 장소</label><select class="select" id="emn-meet" name="meet">${D.safePlaces.filter((p) => !p.off).map((p) => `<option>${p.name}</option>`).join('')}</select></div>
        <div class="field"><label for="emn-note">한 줄 소개</label><input class="input" id="emn-note" name="note" maxlength="80" placeholder="예) 혼자 가기 어색해서요! 끝나고 학식 먹어요"></div>
        <p class="error-text" id="emn-err" role="alert"></p>
        <div class="modal-actions"><button type="button" class="btn btn-outline" data-act="close">취소</button><button class="btn btn-primary" type="submit">모집하기</button></div></form>`));
  }
  function openEmChat(m) {
    const e = findEvent(m.event), key = 'em-' + m.id, others = emPeople(m).filter((p) => !p.me && !(m.mine && p === m.leader));
    if (!S.chats[key]) S.chats[key] = [{ t: 'sys', text: `함께 가기로 한 ${emPeople(m).length}명만 있는 채팅방이에요. 만나는 곳: ${m.meet} · ${m.when}`, at: nowTime() }];
    const sp = (i, t) => `${(others[i % Math.max(others.length, 1)] || { nick: '참여자' }).nick}: ${t}`;
    openChat(key, { name: `함께 가기 · ${e.title}`, trust: m.leader.trust, greeting: sp(0, `반가워요! ${m.when}에 ${m.meet}에서 봬요.`),
      ctx: ctxBar(icon('calendar', 22), e.title, `${emPeople(m).length}명 · ${m.meet}`),
      quick: ['도착했어요!', '조금 늦을 것 같아요', '끝나고 밥 먹어요'], replies: [sp(0, '좋아요!'), sp(1, '저도 가는 중이에요.'), sp(0, '입구 앞에서 기다릴게요.')] });
  }

  /* ── 통합 검색: 방·택시·배달·공모전·팀·동아리·행사·후기·중고를 한 번에 ── */
  let searchQ = '';
  const hl = (t, q) => { const s0 = esc(t); if (!q) return s0; const i = s0.toLowerCase().indexOf(esc(q).toLowerCase()); return i < 0 ? s0 : `${s0.slice(0, i)}<mark>${s0.slice(i, i + esc(q).length)}</mark>${s0.slice(i + esc(q).length)}`; };
  function searchResults(q) {
    q = String(q || '').trim();
    if (!q) return `<p class="small muted" style="margin-top:12px">찾고 싶은 것을 입력하거나 추천 검색어를 눌러 보세요.</p>`;
    const has = (...xs) => xs.some((x) => String(x || '').toLowerCase().includes(q.toLowerCase()));
    const groups = [
      ['주거 · 방', 'door', allRooms().filter((r) => has(r.title, r.area, r.type, r.deal)).map((r) => [r.title, `${r.area} · 월세 ${r.deposit}/${r.rent}`, `#rooms-${r.id}`])],
      ['택시 같이 타기', 'car', allG('taxi').filter((g) => has(g.from, g.to, g.note)).map((g) => [taxiTitle(g), `${G_STATUS[gStatus(g)][0]} · 출발 ${clock(g.departAt)}`, `#taxi-${g.id}`])],
      ['배달 같이 시키기', 'utensils', allG('delivery').filter((g) => has(g.shop, g.cat, g.pickup)).map((g) => [g.shop, `${g.cat} · ${G_STATUS[gStatus(g)][0]} · ${g.pickup}`, `#delivery-${g.id}`])],
      ['공모전', 'trophy', D.contests.filter((k) => has(k.title, k.host, k.cat)).map((k) => [k.title, `${k.cat} · ${k.host} · 마감 ${fmtDate(k.deadline)}`, `#contests-${k.id}`])],
      ['팀원 모집', 'users', allTeams().filter((t) => has(t.title, t.kind, ...t.positions.map((p) => p.role))).map((t) => [t.title, `${t.kind} · ${openSlots(t)}자리 남음`, `#teams-${t.id}`])],
      ['동아리', 'users', D.clubs.filter((c) => has(c.name, c.cat, c.intro)).map((c) => [c.name, `${c.cat} · ${c.intro}`, `#clubs-${c.id}`])],
      ['행사', 'calendar', D.events.filter((e) => has(e.title, e.place, e.type, e.host)).map((e) => [e.title, `${dayInfo(e.date).m}/${dayInfo(e.date).d} · ${e.place}`, `#event-${e.id}`])],
      ['후기', 'star', allPosts().filter((x) => has(x.title, x.body)).map((x) => [x.title, boardName(x.board), `#post-${x.id}`])],
      ['중고거래', 'bag', allItems().filter((i) => has(i.title, i.cat)).map((i) => [i.title, `${i.cat} · ${won(i.price)}`, `#market-${i.id}`])],
    ].filter((g) => g[2].length);
    const total = groups.reduce((a, g) => a + g[2].length, 0);
    if (!total) return `<div class="empty">${charImg('think', 'empty-char')}<b>‘${esc(q)}’에 맞는 결과가 없어요</b>다른 단어로 찾아보세요.</div>`;
    return `<p class="small muted" style="margin:12px 0">‘${esc(q)}’ 검색 결과 ${total}건</p>` + groups.map(([name, ic, rows]) => `<section class="card pad search-group"><h2 class="block-title">${icon(ic, 18)}${name} <span class="muted small">${rows.length}</span></h2>
      ${rows.slice(0, 5).map(([t, sub, h]) => `<a class="list-row" href="${h}"><span class="lr-body"><b>${hl(t, q)}</b><span class="small muted">${hl(sub, q)}</span></span>${icon('right', 16)}</a>`).join('')}${rows.length > 5 ? `<p class="small muted">외 ${rows.length - 5}건</p>` : ''}</section>`).join('');
  }
  function pageSearch() {
    return `<div class="page-head"><div><h1>통합 검색</h1><p>방, 택시, 배달, 공모전, 동아리, 행사, 후기를 한 번에 찾아요</p></div></div>
      <label class="search-box big">${icon('search', 20)}<input id="g-search" type="search" value="${esc(searchQ)}" placeholder="예) 터미널, 치킨, 디자인, 러닝, 원룸" aria-label="통합 검색" autocomplete="off"></label>
      <div class="chip-row" style="margin-top:10px">${['터미널', '치킨', '디자인', '러닝', '본리', '복학생'].map((x) => `<button class="chip" data-act="sq" data-v="${x}">${x}</button>`).join('')}</div>
      <div id="search-results">${searchResults(searchQ)}</div>${footer()}`;
  }

  /* ── 통합 프로필 + 나에게 맞는 추천 (조건 기반: 관심 분야 · 학생 유형 · 마감 임박) ── */
  const INTEREST_OPTS = [...new Set([...D.contestCats, ...D.clubCats])];
  function recos() {
    const P0 = S.profile, out = [];
    const k = D.contests.filter((x) => P0.interests.includes(x.cat) && cday(x.deadline) >= 0).sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
    if (k) out.push({ kind: '공모전', title: k.title, why: `관심 분야 ‘${k.cat}’ · 마감 D-${cday(k.deadline)}`, href: `#contests-${k.id}`, ic: 'trophy' });
    const t = allTeams().find((x) => !x.closed && openSlots(x) > 0 && !inTeam(x) && x.contest && findContest(x.contest) && P0.interests.includes(findContest(x.contest).cat));
    if (t) out.push({ kind: '팀원 모집', title: t.title, why: `관심 분야 공모전 · ${openSlots(t)}자리 남음`, href: `#teams-${t.id}`, ic: 'users' });
    const c = D.clubs.find((x) => P0.interests.includes(x.cat) && x.recruit.status !== 'closed' && !isMember(x));
    if (c) out.push({ kind: '동아리', title: c.name, why: `관심 분야 ‘${c.cat}’ · ${esc(c.day)}${c.welcome.includes(S.stype) ? ` · ${S.stype} 환영` : ''}`, href: `#clubs-${c.id}`, ic: 'users' });
    const e = D.events.filter((x) => x.date >= TODAY && x.for.includes(S.stype)).sort((a, b) => a.date.localeCompare(b.date))[0];
    if (e) out.push({ kind: '행사', title: e.title, why: `${S.stype} 추천 · ${dayInfo(e.date).m}/${dayInfo(e.date).d} ${e.time.split('–')[0]}`, href: `#event-${e.id}`, ic: 'calendar' });
    const g = allG().filter((x) => gStatus(x) === 'recruit' && !x.mine && !myM(x)).sort((a, b) => a.closeAt - b.closeAt)[0];
    if (g) out.push({ kind: g.type === 'taxi' ? '택시' : '배달', title: gTitle(g), why: `곧 마감 · ${until(g.closeAt)} 남음`, href: `#${g.type}-${g.id}`, ic: g.type === 'taxi' ? 'car' : 'utensils' });
    return out;
  }
  function recoSection() {
    const list = recos(); if (!list.length) return '';
    return `<section class="section" aria-labelledby="h-reco"><div class="section-head"><h2 id="h-reco">나에게 맞는 추천</h2><button class="more" data-act="profile-edit">관심 분야 바꾸기${icon('right', 16)}</button></div>
      <div class="hscroll reco-h">${list.map((r) => `<a class="reco-card" href="${r.href}"><span class="reco-kind">${icon(r.ic, 14)}${r.kind}</span><b>${esc(r.title)}</b><span class="small muted">${r.why}</span></a>`).join('')}</div></section>`;
  }
  function openProfileEdit() {
    const P0 = S.profile;
    openModal(modalBox('프로필 수정', `<form data-form="profile" class="grid" style="gap:14px">
      <div class="field"><span class="field-label">관심 분야 (추천에 쓰여요)</span><div class="opts">${INTEREST_OPTS.map((x) => `<label class="opt sm"><input type="checkbox" name="interests" value="${x}" ${P0.interests.includes(x) ? 'checked' : ''}><span>${x}</span></label>`).join('')}</div></div>
      <div class="field"><label for="pf-skills">보유 역량 (쉼표로 구분)</label><input class="input" id="pf-skills" name="skills" value="${esc(P0.skills.join(', '))}" placeholder="예) Figma, 엑셀, 영상 편집"></div>
      <div class="form-grid two"><div class="field"><label for="pf-time">활동 가능 시간</label><select class="select" id="pf-time" name="time">${['평일 낮', '평일 저녁', '주말', '언제든'].map((x) => `<option ${x === P0.time ? 'selected' : ''}>${x}</option>`).join('')}</select></div>
        <div class="field"><label for="pf-area">활동 지역</label><select class="select" id="pf-area" name="area">${['교내', '대소원면', '충주 시내'].map((x) => `<option ${x === P0.area ? 'selected' : ''}>${x}</option>`).join('')}</select></div></div>
      <p class="small muted">학교·학과·학년·학생 유형(${esc(S.stype)})은 인증 정보와 첫 실행 소개에서 가져와요.</p>
      <p class="error-text" id="pf-err" role="alert"></p>
      <div class="modal-actions"><button type="button" class="btn btn-outline" data-act="close">취소</button><button class="btn btn-primary" type="submit">저장</button></div></form>`));
  }

  /* ── 운영자 데모 화면: 실제 서비스에서는 운영자 계정으로만 열려요 ── */
  function pageAdmin(tab = 'verify') {
    const reps = [...S.reports.map((r) => ({ ...r, key: r.id || r.target + r.date, who: '나 (이 기기)' })), ...D.adminReports.map((r) => ({ ...r, key: r.id }))];
    const pend = reps.filter((r) => !S.reportActs[r.key]).length;
    const gs = [...S.myGath, ...SAMPLE_G];
    const expired = gs.filter((g) => gStatus(g) === 'expired').length, live = gs.filter((g) => ['recruit', 'full'].includes(gStatus(g))).length;
    const crPend = S.contestReports.filter((r) => r.status === '운영자 검토 중').length;
    const vreqs = [...(S.verifyReq ? [{ key: 'me', who: S.login ? S.login.nick : '이 기기 사용자', method: S.verifyReq.method, file: S.verifyReq.file, status: S.verifyReq.status }] : []),
      ...D.adminVerify.map((v) => ({ ...v, status: S.verifyActs[v.key] || '검토 중' }))];
    const vPend = vreqs.filter((v) => v.status === '검토 중').length;
    const tabs = [['verify', `학생 인증 ${vPend}`], ['reports', `신고 처리 ${pend}`], ['posts', '모집글 관리'], ['contests', `공모전 제보 ${crPend}`], ['users', '사용자 관리']];
    let body = '';
    if (tab === 'verify') {
      body = `<p class="small muted" style="margin-bottom:8px">학교 이름 · 이름 · 학번이 보이는지 확인하고 승인해요. 승인·반려 후 서류는 바로 지워요(데모에서는 파일을 저장하지 않아요).</p>` + vreqs.map((v) => `<div class="adm-item"><div><b>${esc(v.who)}</b><p class="small muted">${esc(methodName(v.method))} · ${esc(v.file)}</p></div>
        ${v.status === '검토 중' ? `<div class="pd-btns"><button class="btn btn-sm btn-ghost" data-act="adm-verify" data-key="${v.key}" data-v="no">반려</button><button class="btn btn-sm btn-primary" data-act="adm-verify" data-key="${v.key}" data-v="ok">승인</button></div>` : `<span class="badge ${v.status === '승인' ? 'b-school' : 'b-gray'}">${v.status}</span>`}</div>`).join('');
    } else if (tab === 'posts') {
      body = `<p class="small muted" style="margin-bottom:8px">마감 시간이 지나면 자동으로 ‘만료’ 또는 ‘진행 중’으로 바뀌어요. 지금 자동 종료된 글 ${expired}건.</p>` + gs.map((g) => `<div class="list-row"><span class="lr-art" style="background:${g.type === 'taxi' ? '#FFF1C2' : '#FFE9C9'}">${icon(g.type === 'taxi' ? 'car' : 'utensils', 20)}</span><span class="lr-body"><b>${esc(gTitle(g))}</b><span class="small muted">${esc(g.leader.nick)} · ${gCount(g)}/${g.cap}명 ${S.hiddenG.includes(g.id) ? '· <b style="color:var(--coral-800)">숨김</b>' : ''}</span></span>${stChip(g)}<button class="btn btn-sm ${S.hiddenG.includes(g.id) ? 'btn-outline' : 'btn-ghost-danger'}" data-act="adm-hide" data-id="${g.id}">${S.hiddenG.includes(g.id) ? '숨김 해제' : '숨기기'}</button></div>`).join('');
    } else if (tab === 'contests') {
      body = S.contestReports.length ? S.contestReports.map((r) => `<div class="adm-item"><div><b>${esc(r.title)}</b><p class="small muted">${esc(r.host)} · ${esc(r.cat)} · 마감 ${fmtDate(r.deadline)}</p><p class="small">공식 공지: <span class="url">${esc(r.url)}</span></p>${r.memo ? `<p class="small">“${esc(r.memo)}”</p>` : ''}</div>
        ${r.status === '운영자 검토 중' ? `<div class="pd-btns"><button class="btn btn-sm btn-ghost" data-act="adm-contest" data-id="${r.id}" data-v="no">반려</button><button class="btn btn-sm btn-primary" data-act="adm-contest" data-id="${r.id}" data-v="ok">확인 · 공개</button></div>` : `<span class="badge ${r.status === '공개됨' ? 'b-school' : 'b-gray'}">${r.status}</span>`}</div>`).join('')
        : `<div class="empty">${icon('send', 32)}<b>들어온 제보가 없어요</b>공모전 목록 아래 ‘공모전 제보하기’로 먼저 보내 보세요.</div>`;
      body = `<p class="small muted" style="margin-bottom:8px">공식 공지 주소를 열어 주최·기간이 맞는지 확인한 뒤 공개해요. 다른 사이트 글을 그대로 옮긴 제보는 반려해요.</p>` + body;
    } else if (tab === 'users') {
      const users = [...D.adminUsers, { nick: D.me.nick, cancels: S.cancels, reports: 0, trust: myTrust(), note: `확정 후 취소 ${S.cancels}회 (이 기기 사용자)` }];
      body = `<p class="small muted" style="margin-bottom:8px">운영 정책 초안: 확정 후 취소 ${CANCEL_LIMIT}회 이상이거나 신고가 확인되면 7일간 생활 매칭 참여를 제한해요.</p>` + users.map((u) => `<div class="list-row">${avatar(u.nick)}<span class="lr-body"><b>${esc(u.nick)}</b><span class="small muted">${esc(u.note)} · 신뢰도 ${u.trust}</span></span>${u.cancels >= CANCEL_LIMIT || u.reports >= 3 ? '<span class="badge b-coral">주의</span>' : ''}<button class="btn btn-sm ${S.restricted[u.nick] ? 'btn-outline' : 'btn-ghost-danger'}" data-act="adm-restrict" data-nick="${esc(u.nick)}">${S.restricted[u.nick] ? '제한 해제' : '7일 제한'}</button></div>`).join('');
    } else {
      body = reps.length ? reps.map((r) => { const done = S.reportActs[r.key]; return `<div class="adm-item"><div><b>${esc(r.target)}</b><p class="small muted">${esc(r.reason)} · ${r.date} · 신고자 ${esc(r.who)}</p>
        <p class="small">전달됨: ${D.staff.map((x) => `<span class="chip sm-chip">${x.name}</span>`).join(' ')}</p></div>
        ${done ? `<span class="badge b-school">${esc(done)}</span>` : `<div class="pd-btns wrap">${['글 숨김', '경고', '7일 이용 제한', '반려'].map((v) => `<button class="btn btn-sm ${v === '반려' ? 'btn-ghost' : 'btn-outline'}" data-act="adm-report" data-key="${esc(r.key)}" data-v="${v}">${v}</button>`).join('')}</div>`}</div>`; }).join('')
        : '<p class="small muted">신고가 없어요.</p>';
    }
    return `<div class="page-head"><div><h1>운영자 화면 <span class="badge b-review">데모</span></h1><p>실제 서비스에서는 <b>운영자 계정으로만</b> 열려요. 발표용으로 누구나 볼 수 있게 열어 뒀어요.</p></div></div>
      <div class="adm-stats"><div><small>학생 인증 대기</small><b>${vPend}</b></div><div><small>처리 대기 신고</small><b>${pend}</b></div><div><small>공모전 제보 대기</small><b>${crPend}</b></div><div><small>모집 중 글</small><b>${live}</b></div><div><small>자동 만료</small><b>${expired}</b></div></div>
      <div class="info-box" style="margin:12px 0">${icon('users', 18)}<span>신고가 들어오면 <b>담당자 전원</b>(${D.staff.map((x) => `${x.name}: ${x.area}`).join(' · ')})에게 동시에 알림이 가요.</span></div>
      <section class="card pad"><div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button class="tab ${tab === k ? 'active' : ''}" role="tab" aria-selected="${tab === k}" data-act="adm-tab" data-v="${k}">${l}</button>`).join('')}</div>${body}</section>`;
  }

  /* ── 개인정보처리방침 (데모 단계 초안) ── */
  function pagePrivacy() {
    const sec = (n, t, body) => `<section class="pv-sec"><h2><span class="num">${n}</span>${t}</h2>${body}</section>`;
    const li = (arr) => `<ul class="pv-list">${arr.map((x) => `<li>${x}</li>`).join('')}</ul>`;
    return `<div class="survey-wrap privacy"><a class="back-link" href="#my">${icon('left', 18)}MY</a>
      <div class="page-head"><div><h1>개인정보처리방침</h1><p>이음(국립한국교통대학교 학생 팀 프로젝트) · 시행일 2026년 11월 17일 · <b>발표용 데모 단계 초안</b></p></div></div>
      <div class="info-box amber" style="margin-bottom:14px">${icon('alert', 18)}<span><b>지금은 발표용 데모예요.</b> 서버가 없어서 입력한 정보는 <b>여러분 기기의 브라우저에만</b> 저장되고, 이음 팀을 포함해 누구에게도 전송되지 않아요. 실제 학생증이나 민감한 정보는 올리지 말아 주세요. 정식 운영 전에는 이 방침을 다시 검토해서 고쳐 공지할게요.</span></div>
      <div class="card pad grid" style="gap:18px">
        ${sec(1, '받는 정보와 이유', `<div class="pv-table"><div class="pv-row head"><span>항목</span><span>언제</span><span>왜</span><span>어디에</span></div>
          <div class="pv-row"><span>카카오 닉네임, 카카오 회원번호</span><span>카카오 로그인할 때 (동의 후)</span><span>로그인 상태 유지, 화면에 이름 표시</span><span>이 기기 브라우저</span></div>
          <div class="pv-row"><span>닉네임, 학과, 학번, 휴대폰 번호</span><span>회원정보 입력할 때 (동의 후)</span><span>학생 확인(학번↔인증 서류 대조), 프로필 표시, 사고·분쟁 시 연락</span><span>이 기기 브라우저</span></div>
          <div class="pv-row"><span>학생 인증 서류 (학생증·재학증명서·합격증)</span><span>학생 인증할 때</span><span>교통대 학생 확인</span><span><b>저장 안 함</b> (데모: 파일 이름만 기기에 기록)</span></div>
          <div class="pv-row"><span>생활 습관 설문, 관심 분야, 활동 시간</span><span>직접 입력할 때</span><span>룸메·팀·동아리 추천</span><span>이 기기 브라우저</span></div>
          <div class="pv-row"><span>글, 채팅, 신청·매칭·정산 기록, 만남 체크인 장소·시간</span><span>기능을 쓸 때</span><span>서비스 기능 제공, 안전 확인</span><span>이 기기 브라우저</span></div></div>
          <p class="small muted"><b>다른 학생에게 보이는 것:</b> 닉네임, 학과, 입학년도(예: 26학번), 인증 배지뿐이에요. <b>휴대폰 번호와 전체 학번은 절대 공개하지 않아요.</b> 이메일, 위치(GPS), 실명은 받지 않아요.</p>`)}
        ${sec(2, '보관 기간과 지우는 방법', li(['데모 단계: 브라우저에 남아 있는 동안 보관돼요. <b>MY › 이 기기의 내 데이터 모두 지우기</b>를 누르면 바로 모두 지워져요.', '로그아웃하면 로그인 정보와 인증 상태가 지워져요. 회원정보는 MY › 회원정보 수정에서 고치거나, 모두 지우기로 지울 수 있어요.', '정식 운영 시(예정): 학생 인증 서류는 <b>확인 즉시 파기</b>, 만남 체크인 기록은 30일 뒤 자동 삭제, 탈퇴하면 지체 없이 삭제해요.']))}
        ${sec(3, '다른 곳에 주는지', li(['이음은 개인정보를 다른 사람이나 회사에 팔거나 제공하지 않아요.', '<b>카카오</b>: 카카오 로그인을 할 때 카카오가 로그인 정보를 처리해요. 이음은 그중 닉네임만 받아요.', '<b>GitHub Pages</b>: 웹사이트 파일을 전달하는 곳이에요. 일반적인 접속 기록(IP 등)이 남을 수 있어요.', '공공데이터(국토교통부 실거래가)와 공모전 정보는 공개된 정보를 요약한 것이라 개인정보와 관계없어요.']))}
        ${sec(4, '여러분의 권리', li(['언제든 내 정보를 보고, 고치고, 지울 수 있어요 (MY 화면).', '카카오 계정 설정 › 연결된 서비스 관리에서 이음 연결을 끊을 수 있어요.', '동의를 거부하면 로그인이 필요한 기능(글쓰기·채팅·신청)은 쓸 수 없지만, 둘러보기는 할 수 있어요.']))}
        ${sec(5, '안전하게 지키는 방법', li(['꼭 필요한 정보만 받아요 (카카오에서는 닉네임만, 회원정보는 4가지만).', '휴대폰 번호는 화면에 가려서(010-****-5678) 보여 주고, 다른 사용자에게는 보내지 않아요.', '계좌번호·외부 메신저 아이디 같은 문구는 글과 모집글에 올릴 수 없게 막아요.', '정식 운영 시(예정): 접근 권한을 사람별로 나누고, 운영자 접속 기록을 남기고, 서류는 비공개 저장소에 잠깐만 보관해요.']))}
        ${sec(6, '책임자와 문의', li(['개인정보 보호 책임: 이음 팀 (국립한국교통대학교 학생 팀 프로젝트)', '문의: 앱 안의 신고·문의 기능 또는 <a href="https://github.com/ysyny1126-bot/campusmate/issues" target="_blank" rel="noopener noreferrer">GitHub 저장소 문의(Issues)</a>', '개인정보 침해 신고: 개인정보침해신고센터(국번 없이 118) · 개인정보분쟁조정위원회(1833-6972)']))}
        ${sec(7, '바뀔 때', `<p class="small">이 방침이 바뀌면 시행 7일 전에 앱 첫 화면에서 알려 드려요. 이 문서는 개인정보 보호법을 참고한 <b>데모 단계 초안</b>이고, 정식 운영 전에 전문가 검토를 받을 예정이에요.</p>`)}
      </div>${footer()}</div>`;
  }

  function gatePanel(what) {
    return `<div class="card pad" style="text-align:center;max-width:520px;margin:20px auto;padding:32px 22px">
      <div class="verify-hero"><div class="vi">${icon('lock', 30)}</div><h1>학교 인증이 필요해요</h1><p>${what}은(는) ${D.school.name} 학생 인증을 마친 학생만 할 수 있어요. 둘러보기는 인증 없이도 가능해요.</p></div>
      <a class="btn btn-primary btn-lg btn-block" href="#verify">${icon('shield', 18)}학생 인증하기</a></div>`;
  }

  function pageRoomNew() {
    if (!S.verified) return housingHead('rooms-new', '방을 넘기거나 함께 살 사람을 구해요.') + gatePanel('방 올리기');
    return `<div class="survey-wrap">
      ${housingHead('rooms-new', '방을 넘기거나(양도) 남는 방에 함께 살 사람(룸쉐어)을 구해요.')}
      <ol class="verify-steps" aria-label="올리기 전 확인 3단계"><li class="done">${icon('shield', 16)}학교 인증<small>완료</small></li><li>${icon('file', 16)}계약서 사진<small>필수</small></li><li>${icon('check', 16)}집주인 동의<small>필수</small></li></ol>
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
        <section class="card form-section"><h2><span class="num">6</span>계약서 확인 · 집주인 동의 <span class="req">필수</span></h2>
          <div class="info-box">${icon('file', 18)}<span><b>임대차계약서에서 주소·계약 기간·임대인 이름이 보이는 부분</b>만 찍어 올려 주세요. 주민등록번호·계좌번호는 가리고 올려 주세요. 운영팀이 확인한 뒤 바로 파기해요.</span></div>
          <label class="upload"><span class="ui">${icon('file', 22)}</span><span><b>계약서 사진 올리기 (필수)</b><br><span class="small muted">JPG, PNG, PDF · 1개</span></span><input type="file" name="proof" accept="image/*,.pdf" data-preview="pv-proof"></label>
          <div class="previews" id="pv-proof"></div>
          <div class="field"><span class="field-label">집주인(임대인) 동의</span>${radioChips('consent', [['받음', '동의를 받았어요'], ['예정', '계약 넘기기 전에 받을게요']], '')}
            <span class="hint">집주인 동의 없이 양도·전대하면 계약 위반이 될 수 있어요. ‘받았어요’를 고르면 <b>집주인 동의</b> 배지가 붙어요.</span></div>
          <label class="check"><input type="checkbox" name="agree" required><span>입력한 내용이 사실이며, 허위 매물을 올리면 이용이 제한될 수 있음에 동의해요.</span></label>
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

  /* ── 후기: 택시팟·배달팟·스터디·공모전·동아리·주거·중고 활동을 해 본 학생의 별점 후기 ── */
  /* 활동을 마친 곳에서 ‘후기 게시판에 올리기’로 이어 줘요. 종류·제목·별점·키워드를 미리 채워 둬요 */
  let rvDraft = null;
  const MATCH_BOARD = { 룸메: 'house', 방: 'house', 중고: 'market' };
  const rvBtn = (board, title, rating, tags = [], cls = 'btn-sm btn-outline') => `<button class="btn ${cls}" data-act="rv-write" data-board="${board}" data-title="${esc(title)}" data-rating="${+rating || 5}" data-tags="${esc(tags.join('|'))}">${icon('edit', 15)}후기 게시판에 올리기</button>`;
  function offerReview(board, title, rating, tags, done) {
    openModal(modalBox('후기 게시판에도 올릴까요?', `<p class="small muted" style="margin-bottom:12px">${done}<br>방금 남긴 별점으로 <b>${boardName(board)} 후기</b>를 쓰면 다음에 참여할 학생에게 큰 도움이 돼요.</p>
      <div class="rv-preview"><div class="rv-head"><span class="board-tag">${boardName(board)}</span>${stars(rating)}</div><b>${esc(title)}</b>${tags.length ? `<div class="rv-tags">${tags.slice(0, 3).map((t) => `<span>#${esc(t)}</span>`).join('')}</div>` : ''}</div>`,
      `<div class="modal-actions"><button class="btn btn-outline" data-act="close">나중에</button>${rvBtn(board, title, rating, tags, 'btn-primary')}</div>`));
  }
  const avgOf = (list) => { const r = list.filter((p) => p.rating); return r.length ? (r.reduce((t, p) => t + p.rating, 0) / r.length).toFixed(1) : null; };
  function pageReviews(board) {
    const b = D.boards[board] ? board : 'all';
    const list = allPosts().filter((p) => b === 'all' || p.board === b);
    const avg = avgOf(list);
    const go = b === 'all' ? 'taxi' : b;
    return `<div class="page-head"><div><h1>후기</h1><p>택시팟, 스터디, 동아리처럼 직접 해 본 학생들의 솔직한 후기</p></div>
      <a class="btn btn-primary" href="#write-${go}">${icon('edit', 18)}후기 쓰기</a></div>
    <div class="tabs" role="tablist" aria-label="후기 종류">${[['all', '전체'], ...Object.entries(D.boards)].map(([k, t]) => `<a class="tab ${b === k ? 'active' : ''}" role="tab" aria-selected="${b === k}" href="#reviews-${k}">${t}</a>`).join('')}</div>
    <div class="community-layout">
      <div class="grid" style="gap:12px">
        ${list.length ? `<p class="small muted rv-sum">${b === 'all' ? '전체' : boardName(b)} 후기 ${list.length}개${avg ? ` · 평균 ${stars(Math.round(avg))} <b>${avg}</b>` : ''}</p>` : ''}
        <div class="card post-list">${list.length ? list.map((p) => postRow(p, b === 'all')).join('') : `<div class="empty">${icon('star', 40)}<b>아직 후기가 없어요</b>첫 후기를 남겨 보세요.</div>`}</div>
      </div>
      <aside class="grid" style="gap:16px">
        <section class="card pad"><h2 class="block-title">${icon('star', 18)}종류별 평균 별점</h2>
          <ul class="rv-board-list">${Object.entries(D.boards).map(([k, t]) => { const l = allPosts().filter((p) => p.board === k); const a = avgOf(l); return `<li><a href="#reviews-${k}"><span>${t}</span><span class="small muted">${l.length}개</span><b>${a ? `★ ${a}` : '-'}</b></a></li>`; }).join('')}</ul></section>
        <section class="card pad"><h2 class="block-title">${icon('shield', 18)}후기 작성 규칙</h2>
          <ul class="rules small"><li>${icon('check')}직접 참여한 활동만 후기로 남겨요</li><li>${icon('check')}상대의 실명·연락처·학번은 적지 않아요</li><li>${icon('check')}욕설·비하 없이 사실만 솔직하게</li><li>${icon('check')}신고 3회 누적 시 후기가 자동으로 가려져요</li></ul></section>
      </aside>
    </div>
    <a class="btn btn-primary fab" href="#write-${go}">${icon('edit', 20)}후기 쓰기</a>
    ${footer()}`;
  }

  function pagePost(id) {
    const p = findPost(id);
    if (!p || S.blocked.includes(p.author)) return notFound();
    const liked = S.likedPosts.includes(p.id);
    const comments = [...p.comments, ...(S.comments[p.id] || [])].filter((c) => !S.blocked.includes(c.author));
    const anonIdx = {}; let n = 0;
    const cname = (c) => { if (!c.anon) return c.author; if (c.author === p.author) return '익명(글쓴이)'; if (!anonIdx[c.author]) anonIdx[c.author] = ++n; return `익명${anonIdx[c.author]}`; };
    return `<div style="max-width:760px;margin:0 auto"><a class="back-link" href="#reviews-${D.boards[p.board] ? p.board : 'all'}">${icon('left', 18)}${boardName(p.board)} 후기</a>
      <article class="card post-detail">
        <div class="rv-head"><span class="board-tag">${boardName(p.board)}</span>${p.rating ? stars(p.rating) : ''}</div>
        <h1>${esc(p.title)}</h1>
        ${p.tags && p.tags.length ? `<div class="rv-tags">${p.tags.map((t) => `<span>#${esc(t)}</span>`).join('')}</div>` : ''}
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
    if (!S.verified) return `<a class="back-link" href="#reviews">${icon('left', 18)}후기</a>` + gatePanel('후기 쓰기');
    const b = D.boards[board] ? board : 'taxi';
    const dr = rvDraft && rvDraft.board === b ? rvDraft : null;
    return `<div class="survey-wrap"><a class="back-link" href="#reviews-${b}">${icon('left', 18)}후기</a>
      <div class="page-head"><h1>후기 쓰기</h1></div>
      ${dr ? `<div class="info-box mint" style="margin-bottom:12px">${icon('check', 18)}<span>방금 마친 활동의 별점과 키워드를 미리 채워 뒀어요. 내용만 적으면 돼요.</span></div>` : ''}
      <form data-form="post" class="card form-section" novalidate>
        <div class="field"><label for="w-board">어떤 활동의 후기인가요?</label><select class="select" id="w-board" name="board">${Object.entries(D.boards).map(([k, t]) => `<option value="${k}" ${k === b ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="field"><label for="w-title">제목</label><input class="input" id="w-title" name="title" maxlength="60" placeholder="예) 금요일 터미널 택시팟 후기" value="${dr ? esc(dr.title) : ''}" required></div>
        <fieldset class="field" style="border:0"><legend class="field-label">별점</legend><div class="star-input" style="justify-content:flex-end">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="ws${n}" name="rating" value="${n}" ${n === (dr ? dr.rating : 5) ? 'checked' : ''}><label for="ws${n}" aria-label="${n}점">★</label>`).join('')}</div></fieldset>
        <div class="field"><label for="w-tags">한 줄 키워드 <span class="small muted">(선택 · 쉼표로 구분, 3개까지)</span></label><input class="input" id="w-tags" name="tags" maxlength="40" placeholder="예) 시간 약속 잘 지켜요, 정산 깔끔" value="${dr ? esc(dr.tags.slice(0, 3).join(', ')) : ''}"></div>
        <div class="field"><label for="w-body">내용</label><textarea class="textarea" id="w-body" name="body" style="min-height:200px" placeholder="좋았던 점, 아쉬웠던 점, 다음에 참여할 사람에게 줄 팁을 적어 주세요." required></textarea></div>
        <label class="switch"><span><b style="font-size:14.5px">익명으로 쓰기</b><br><span class="small muted">닉네임 대신 ‘익명’으로 표시돼요. 신고 처리 시에만 운영팀이 확인할 수 있어요.</span></span><input type="checkbox" name="anon" checked aria-label="익명으로 쓰기"></label>
        <div class="info-box amber">${icon('alert', 18)}<span>욕설·비하, 상대의 개인정보 노출, 광고성 후기는 신고 없이도 삭제될 수 있어요.</span></div>
        <p class="error-text" id="post-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">등록하기</button>
      </form></div>`;
  }

  /* ── 마이페이지 ── */
  function pageMy(tab = 'matches') {
    const t = myTrust();
    const s = S.survey, q = (k) => D.questions.find((x) => x.k === k);
    const BT = [
      ['shield', '학교 인증', S.verified], ['id', '신원 인증', S.idVerified], ['file', '거주 증빙', S.myRooms.length > 0],
      ['star', '후기 10+', false], ['sparkle', '매칭 설문', true], ['heart', '나눔 천사', D.deals.some((d) => d.price === 0)],
    ];
    const tabs = [['matches', '내 매칭'], ['clubs', '동아리·행사'], ['teams', '팀·공모전'], ['listings', '내 매물'], ['favs', '찜한 목록'], ['deals', '거래 내역'], ['reviews', '받은 후기'], ['reports', '신고·차단']];
    let body = '';
    if (tab === 'matches') {
      body = matchesMyBody();
    } else if (tab === 'teams') {
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
      const extra = [...matchList(true).filter((m) => m.stage === 'done').map((m) => ({ from: m.with, stars: 5, text: REVIEW_BACK[m.kind], tags: [REVIEW_TAGS[m.kind][1]], when: '방금 · 상호 공개' })),
        ...S.reviewed.map(() => ({ from: '책정리중', stars: 5, text: '책 상태 설명 그대로였고 시간 약속도 잘 지켜주셨어요!', tags: ['시간 약속을 잘 지켜요'], when: '방금' }))];
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
          <div class="profile-top">${avatar(D.me.nick, 'lg')}<div><b style="font-size:18px">${esc(D.me.nick)}</b><div class="meta">${D.school.name} · ${esc(s.dept)} · ${S.member ? sidYear(S.member) : q('grade').opts[s.grade]}</div><div class="meta">${S.member ? `가입 ${new Date(S.member.at).getFullYear()}년 ${new Date(S.member.at).getMonth() + 1}월` : `가입 ${D.me.joined} (예시)`}</div></div></div>
          <div class="status-box ${S.verified ? 'on' : 'off'}">${icon(S.verified ? 'shield' : 'alert', 24)}<div><b>${S.verified ? (S.verifyMethod === 'pre' ? '예비 신입생 인증 완료' : '학생 인증 완료') : '학생 인증 전'}</b><span>${S.verified ? esc(methodName(S.verifyMethod) || '학교 인증') + '으로 확인' : S.verifyReq && S.verifyReq.status === '검토 중' ? '운영자가 확인하고 있어요' : '둘러보기만 가능해요'}</span></div>${S.verified ? '' : `<a class="btn btn-sm btn-primary" href="#verify">인증하기</a>`}</div>
          <div class="login-row">${S.login ? `<span class="kk-dot">${KAKAO_SYMBOL}</span><span><b>카카오 계정으로 로그인</b>${S.login.demo ? ' <span class="badge b-gray">데모</span>' : ''}</span><button class="btn btn-sm btn-ghost" data-act="logout">로그아웃</button>` : `<span class="muted small" style="flex:1">로그인하지 않았어요</span>${kakaoBtn('카카오 로그인', 'btn-sm')}`}</div>
          ${S.member ? `<div class="member-box"><div class="pm-row"><small>휴대폰</small><span class="small"><b>${esc(maskPhone(S.member.phone))}</b> <span class="muted">· 나만 보여요</span></span></div><div class="pm-row"><small>학번</small><span class="small"><b>${S.member.pre ? '예비 신입생 (학번 없음)' : esc(S.member.sid.slice(0, 4)) + '******'}</b> <span class="muted">· 다른 학생에게는 ${sidYear(S.member)}만</span></span></div><a class="btn btn-outline btn-sm" href="#signup">${icon('edit', 15)}회원정보 수정</a></div>` : S.login ? `<a class="btn btn-primary btn-block" style="margin-top:10px" href="#signup">${icon('user', 18)}회원정보 입력하기</a>` : ''}
          ${S.verified && !S.idVerified ? `<button class="btn btn-outline btn-block" style="margin-top:10px" data-act="id-verify">${icon('id', 18)}신원 인증 추가하기 (휴대폰)</button>` : ''}
          <div class="profile-more"><div class="pm-row"><small>관심 분야</small><span>${S.profile.interests.map((x) => `<span class="chip sm-chip">${esc(x)}</span>`).join('') || '<span class="muted small">없음</span>'}</span></div>
            <div class="pm-row"><small>보유 역량</small><span>${S.profile.skills.map((x) => `<span class="chip sm-chip">${esc(x)}</span>`).join('') || '<span class="muted small">없음</span>'}</span></div>
            <div class="pm-row"><small>활동 시간 · 지역</small><span class="small"><b>${esc(S.profile.time)}</b> · ${esc(S.profile.area)}</span></div>
            <button class="btn btn-outline btn-sm" data-act="profile-edit">${icon('edit', 15)}프로필 수정 · 추천에 반영돼요</button></div>
        </section>
        <section class="card pad">
          <h2 class="block-title">신뢰도 점수</h2>
          <div class="gauge">${ring(t, 84, "점", "신뢰도")}<div><div class="big">${t}<small> / 100</small></div><div class="small muted">상위 ${Math.max(3, 100 - t - 6)}% · 거래 ${D.deals.length}회 · 후기 ${D.myReviews.length + S.reviewed.length + matchList(true).filter((m) => m.stage === 'done').length}개</div></div></div>
          <div class="trust-level ${t >= TRUST_OFF ? 'ok' : 'low'}">${icon(t >= TRUST_OFF ? 'check' : 'lock', 18)}<span>${t >= TRUST_OFF ? '<b>교내 + 대학로</b>에서 만날 수 있어요' : '<b>교내 장소</b>에서만 만날 수 있어요'}<small>기준 ${TRUST_OFF}점 (임시 기준 · 팀에서 정하는 중)</small></span></div>
          <details style="margin-top:12px"><summary class="small" style="cursor:pointer;font-weight:700;color:var(--blue-600)">신뢰도는 어떻게 계산되나요?</summary>
            <p class="small muted" style="margin-top:8px">학교 인증(+6), 신원 인증(+4), 거주 증빙(+3), 만남·거래 후 상호 후기(+2씩)를 합산해요. 신고가 확인되면 점수가 깎여요.</p></details>
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
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-sm btn-ghost" data-act="reset">${icon('refresh', 15)}이 기기의 내 데이터 모두 지우기</button><a class="btn btn-sm btn-ghost" href="#privacy">${icon('lock', 15)}개인정보처리방침</a><a class="btn btn-sm btn-ghost" href="#admin">${icon('shield', 15)}운영자 데모 화면</a></div>
      </section>
    </div>`;
  }

  /* ── 학교 인증 ── */
  const V = { step: 1, email: '', code: '' };
  const VERIFY_METHODS = [
    ['card', '학생증 사진', '실물 학생증 또는 모바일 학생증 화면', 'id', true],
    ['cert', '재학증명서', '학교 포털·정부24에서 발급한 PDF·사진', 'file', true],
    ['pre', '예비 신입생', '합격증 또는 등록금 납부 확인서 (입학 전 임시 인증)', 'sparkle', true],
    ['mail', '학교 메일', '학생 메일 발급 여부를 확인한 뒤 열 예정이에요', 'mail', false],
  ];
  const methodName = (k) => (VERIFY_METHODS.find((m) => m[0] === k) || [k, k])[1];
  function pageVerify() {
    const wrap = (inner) => `<div class="verify-wrap"><a class="back-link" href="#home">${icon('left', 18)}홈</a><div class="card pad" style="padding:28px 22px">${inner}</div>
      <p class="small muted" style="text-align:center;margin-top:14px">올린 서류는 운영자 확인에만 쓰이고, 확인이 끝나면 바로 지워요. 다른 사용자에게는 ‘학생 인증’ 배지만 보여요.</p></div>`;
    const steps = (n) => `<div class="steps" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${n >= i ? 'on' : ''}"></i>`).join('')}</div>`;
    if (!S.login) return wrap(`${steps(1)}<div class="verify-hero"><div class="vi" style="background:#FFF7C2;color:#3C1E1E">${icon('user', 30)}</div><h1>먼저 로그인해요</h1><p>카카오 계정으로 간편하게 시작하고,<br>다음 단계에서 교통대 학생인지 확인해요.</p></div>
      <div class="grid" style="gap:10px">${kakaoBtn('카카오로 시작하기', 'btn-lg btn-block')}<a class="btn btn-ghost" href="#home">로그인 없이 둘러보기</a></div>`);
    if (!S.member) return pageSignup();
    if (S.verified) return wrap(`${steps(3)}<div class="verify-hero"><div class="vi" style="background:var(--navy-800);color:var(--mint-400)">${icon('shield', 32)}</div><h1>${S.verifyMethod === 'pre' ? '예비 신입생 인증 완료!' : '학생 인증 완료!'}</h1><p><b>${esc(S.login.nick)}</b> · ${esc(methodName(S.verifyMethod) || '학생 인증')}으로 확인했어요.<br>이제 글쓰기 · 채팅 · 신청 · 모집을 할 수 있어요.</p></div>
      <div class="grid" style="gap:10px">
        <div class="info-box mint">${icon('check', 18)}<span><b>학생 인증</b> 배지가 프로필에 표시되고 신뢰도가 +6 올랐어요.</span></div>
        ${S.verifyMethod === 'pre' ? `<div class="info-box amber">${icon('alert', 18)}<span>예비 신입생 인증은 임시 인증이에요. 입학 후 학생증이 나오면 한 번 더 인증해 주세요.</span></div>` : ''}
        ${S.idVerified ? `<div class="info-box mint">${icon('check', 18)}<span><b>신원 인증</b>도 완료했어요.</span></div>` : `<button class="btn btn-outline btn-lg btn-block" data-act="id-verify">${icon('id', 18)}신원 인증도 하기 (휴대폰 본인확인 · 데모)</button>`}
        <a class="btn btn-primary btn-lg btn-block" href="#home">${icon('home', 18)}시작하기</a></div>`);
    if (S.verifyReq && S.verifyReq.status === '검토 중') return wrap(`${steps(2)}<div class="verify-hero"><div class="vi">${icon('clock', 30)}</div><h1>운영자가 확인하고 있어요</h1><p><b>${esc(methodName(S.verifyReq.method))}</b>을(를) 받았어요.<br>보통 하루 안에 확인해요. 끝나면 알림으로 알려 드릴게요.</p></div>
      <div class="info-box">${icon('sparkle', 18)}<span>데모에서는 몇 초 뒤 자동으로 승인돼요. 운영자 화면 › 학생 인증에서도 볼 수 있어요.</span></div>`);
    const rej = S.verifyReq && S.verifyReq.status === '반려';
    return wrap(`${steps(2)}<div class="verify-hero"><div class="vi">${icon('id', 30)}</div><h1>학생 인증</h1><p>${D.school.name} 학생인지 확인해요.<br>방법을 하나 고르고 사진이나 파일을 올려 주세요.</p></div>
      ${rej ? `<div class="info-box amber" style="margin-bottom:10px">${icon('alert', 18)}<span>지난 서류가 반려됐어요: ${esc(S.verifyReq.reason || '정보가 잘 보이지 않아요')}. 다시 올려 주세요.</span></div>` : ''}
      <form data-form="v-doc" class="grid" style="gap:12px" novalidate>
        <fieldset class="vm-list"><legend class="field-label">인증 방법</legend>${VERIFY_METHODS.map(([k, t, sub, ic, on], i) => `<label class="vm ${on ? '' : 'dis'}"><input type="radio" name="method" value="${k}" ${i === 0 ? 'checked' : ''} ${on ? '' : 'disabled'}><span class="vm-ic">${icon(ic, 20)}</span><span class="vm-body"><b>${t}${i === 0 ? ' <span class="badge b-school">추천</span>' : ''}${on ? '' : ' <span class="badge b-gray">준비 중</span>'}</b><small>${sub}</small></span></label>`).join('')}</fieldset>
        <div class="info-box amber">${icon('alert', 18)}<span><b>데모 안내:</b> 지금은 서류를 서버로 보내지도, 저장하지도 않아요. 그래도 <b>실제 학생증 대신 아무 예시 이미지</b>로 시험해 주세요.</span></div>
        <label class="upload"><span class="ui">${icon('camera', 22)}</span><span><b>사진 또는 파일 올리기</b><br><span class="small muted">JPG, PNG, PDF · 1개</span></span><input type="file" name="doc" accept="image/*,.pdf" data-preview="pv-doc"></label>
        <div class="previews" id="pv-doc"></div>
        <ul class="rules small"><li>${icon('check')}<b>학교 이름 · 이름 · 학번(또는 수험번호)</b>만 보이면 돼요</li><li>${icon('lock')}주민등록번호 뒷자리, 주소, 계좌번호는 가리고 올려 주세요</li><li>${icon('check')}확인이 끝나면 서류는 바로 지워요</li></ul>
        <label class="check"><input type="checkbox" name="agree"><span>학생 확인을 위해 서류를 운영자가 확인하고, 확인 후 즉시 파기하는 데 동의해요.</span></label>
        <p class="error-text" id="vd-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">${icon('send', 18)}인증 요청하기</button>
      </form>`);
  }

  /* ── 회원정보 입력 (카카오 로그인 다음 단계) ──
   * 받는 것: 닉네임(공개) · 학과(공개) · 학번(입학년도만 공개) · 휴대폰 번호(비공개)
   * 데모라서 이 기기 브라우저에만 저장되고, 문자 본인확인은 정식 운영 때 붙여요. */
  const DEPT_SUGGEST = D.questions.find((x) => x.k === 'dept').opts; // 실제 충주캠퍼스 모집단위
  const maskPhone = (p) => String(p || '').replace(/^(\d{3})-?(\d{3,4})-?(\d{4})$/, '$1-****-$3');
  const sidYear = (m) => (m && m.sid ? `${String(m.sid).slice(2, 4)}학번` : '예비 신입생');
  const takenNicks = () => new Set([...D.mates.map((x) => x.nick), ...D.posts.map((x) => x.author && x.author.nick).filter(Boolean)]);
  function pageSignup() {
    if (!S.login) return pageVerify();
    const m = S.member || {}, edit = !!S.member;
    const nick0 = m.nick || (S.login.nick && S.login.nick !== '카카오 사용자' ? S.login.nick : '');
    return `<div class="verify-wrap"><a class="back-link" href="${edit ? '#my' : '#home'}">${icon('left', 18)}${edit ? 'MY' : '홈'}</a><div class="card pad" style="padding:28px 22px">
      ${edit ? '' : `<div class="steps" aria-hidden="true"><i class="on"></i><i class="on"></i><i></i></div>`}
      <div class="verify-hero"><div class="vi">${icon('user', 30)}</div><h1>${edit ? '회원정보 수정' : '회원정보 입력'}</h1><p>${edit ? '바꾼 내용은 바로 프로필에 반영돼요.' : '이음에서 쓸 기본 정보를 알려 주세요.<br>다음 단계에서 학생 인증을 해요.'}</p></div>
      <form data-form="signup" class="grid" style="gap:14px" novalidate>
        <div class="field"><label for="su-nick">닉네임 <span class="req">필수</span></label><input class="input" id="su-nick" name="nick" maxlength="12" value="${esc(nick0)}" placeholder="예) 충주새내기" autocomplete="nickname" required>
          <span class="hint">2~12자 · 한글, 영문, 숫자 · 다른 학생에게 보여요</span></div>
        <div class="field"><label for="su-dept">학과 <span class="req">필수</span></label><input class="input" id="su-dept" name="dept" list="su-dept-list" value="${esc(m.dept || '')}" placeholder="학과를 고르거나 직접 입력" required>
          <datalist id="su-dept-list">${DEPT_SUGGEST.map((x) => `<option value="${x}">`).join('')}</datalist><span class="hint">목록에 없으면 직접 입력해 주세요 · 다른 학생에게 보여요</span></div>
        <div class="field"><label for="su-sid">학번 <span class="req">필수</span></label><input class="input" id="su-sid" name="sid" inputmode="numeric" maxlength="10" value="${esc(m.sid || '')}" placeholder="예) 2026123456" ${m.pre ? 'disabled' : ''}>
          <label class="check small" style="margin-top:6px"><input type="checkbox" name="pre" data-su="pre" ${m.pre ? 'checked' : ''}><span>아직 학번이 없어요 (예비 신입생)</span></label>
          <span class="hint">학생 인증 서류와 맞는지 확인하는 데만 써요 · 다른 학생에게는 <b>‘26학번’처럼 입학년도만</b> 보여요</span></div>
        <div class="field"><label for="su-phone">휴대폰 번호 <span class="req">필수</span></label><input class="input" id="su-phone" name="phone" type="tel" inputmode="numeric" maxlength="13" value="${esc(m.phone || '')}" placeholder="010-0000-0000" autocomplete="tel">
          <span class="hint">${icon('lock', 13)} <b>다른 학생에게 절대 보이지 않아요.</b> 본인 확인과 사고·분쟁 때 연락에만 써요 · 정식 운영 때는 문자 인증을 붙여요</span></div>
        ${edit ? '' : `<div class="agree-box">
          <label class="check"><input type="checkbox" data-su="all"><span><b>모두 동의해요</b></span></label>
          <label class="check small"><input type="checkbox" name="a1"><span>[필수] 만 14세 이상이에요</span></label>
          <label class="check small"><input type="checkbox" name="a2"><span>[필수] 이음 이용 규칙(안전 장소에서 만나기, 선입금 요구 금지 등)을 지킬게요</span></label>
          <label class="check small"><input type="checkbox" name="a3"><span>[필수] 개인정보 수집·이용에 동의해요 <a href="#privacy">자세히</a></span></label>
          <div class="pv-mini small"><span><b>받는 것</b> 닉네임, 학과, 학번, 휴대폰 번호</span><span><b>이유</b> 학생 확인, 프로필 표시, 안전 연락</span><span><b>보관</b> 탈퇴하면 바로 삭제 (지금은 이 기기에만 저장)</span></div></div>`}
        <div class="info-box amber">${icon('alert', 18)}<span><b>데모 안내:</b> 지금은 서버로 보내지 않고 이 기기에만 저장해요. 발표·시험용이라면 <b>예시 번호</b>(010-0000-0000)를 써도 돼요.</span></div>
        <p class="error-text" id="su-err" role="alert"></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">${edit ? `${icon('check', 18)}저장하기` : `다음: 학생 인증${icon('right', 18)}`}</button>
      </form></div></div>`;
  }

  /* ── 동아리 · 행사 ── */
  const TODAY = '2026-11-10';
  const WD = ['일', '월', '화', '수', '목', '금', '토'];
  const dday = (s) => Math.round((new Date(s + 'T00:00:00') - new Date(TODAY + 'T00:00:00')) / 86400000);
  /* 실제 공모전은 오늘 실제 날짜로 D-day를 세요 (행사·캘린더는 데모 날짜 TODAY 기준) */
  const cday = (s) => { const n = new Date(); return Math.round((new Date(s + 'T00:00:00') - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 86400000); };
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
      <div class="ev-body"><span class="ev-type">${e.type}${e.for.length === 1 ? ` · ${e.for[0]} 추천` : ''}</span><h3><a href="#event-${e.id}">${esc(e.title)}</a></h3>
        <div class="meta">${e.time} · ${esc(e.place)}</div>
        ${compact ? '' : `<div class="meta">${e.club ? `<a class="ev-host" href="#clubs-${e.club}">${esc(e.host)}</a>` : esc(e.host)}</div>`}</div>
      <div class="ev-act">${e.date < TODAY ? `<a class="btn btn-sm btn-outline" href="#event-${e.id}">${icon('star', 15)}후기 ${evReviews(e.id).length}</a>` : `<button class="btn btn-sm ${going ? 'btn-done' : 'btn-outline'}" data-act="event-join" data-id="${e.id}" aria-pressed="${going}">${going ? `${icon('check', 15)}참여 예정` : '참여하기'}</button>`}<span class="small muted">${e.going + (going ? 1 : 0)}명 ${e.date < TODAY ? '참여함' : '참여'}</span>
        ${e.date >= TODAY && allMates(e.id).length ? `<a class="ev-mates" href="#event-${e.id}">${icon('users', 13)}함께 갈 사람 ${allMates(e.id).length}</a>` : ''}</div>
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
    const applyBtn = (cls) => (isMember(c) ? `<a class="btn btn-mint ${cls}" href="#clubroom-${c.id}">${icon('users', 18)}동아리 공간 들어가기</a>`
      : r.status === 'closed' ? `<button class="btn ${cls}" disabled>모집 마감</button>`
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
    ${D.events.some((e) => e.date < TODAY) ? `<section class="section" aria-labelledby="h-past"><div class="section-head"><h2 id="h-past">지난 행사 · 후기</h2></div><div class="grid" style="gap:10px">${D.events.filter((e) => e.date < TODAY).map((e) => eventCard(e)).join('')}</div></section>` : ''}
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
    if (!ap.length && !fol.length && !ev.length && !allMates().some((m) => m.mine || emM(m))) return `<div class="empty">${icon('users', 36)}<b>아직 관심 동아리가 없어요</b>신입생·복학생 추천 동아리부터 둘러보세요.<div style="margin-top:12px"><a class="btn btn-primary" href="#clubs">동아리 둘러보기</a></div></div>`;
    const h = (t) => `<h3 class="block-title" style="font-size:15px;margin-top:6px">${t}</h3>`;
    return [
      ap.filter(([id]) => isMember(findClub(id))).length ? h('내 동아리') + ap.filter(([id]) => isMember(findClub(id))).map(([id]) => { const c = findClub(id); return `<a class="list-row" href="#clubroom-${c.id}"><span class="lr-art" style="background:${c.color}">${c.emoji}</span><span class="lr-body"><b>${esc(c.name)}</b><span class="small muted">부원 · ${esc(c.day)}</span></span><span class="badge b-school">동아리 공간</span></a>`; }).join('') : '',
      ap.filter(([id]) => !isMember(findClub(id))).length ? h('지원한 동아리') + ap.filter(([id]) => !isMember(findClub(id))).map(([id, st]) => row(findClub(id), `<span class="badge b-review">${st}</span>`)).join('') : '',
      allMates().filter((m) => m.mine || (emM(m) && emM(m).status !== 'left')).length ? h('함께 가는 행사') + allMates().filter((m) => m.mine || (emM(m) && emM(m).status !== 'left')).map((m) => { const e = findEvent(m.event), d = dayInfo(e.date); return `<a class="list-row" href="#event-${e.id}"><span class="lr-art" style="background:var(--lav);font-size:14px;font-weight:800">${d.m}/${d.d}</span><span class="lr-body"><b>${esc(e.title)}</b><span class="small muted">${m.mine ? '내가 모집' : EM_ST[emM(m).status]} · ${emPeople(m).length}/${m.cap}명 · ${esc(m.meet)}</span></span>${emChip(m)}</a>`; }).join('') : '',
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
  const joinedRole = (t) => { const a = S.teamApplied[t.id]; return a && a.status === '합류' ? a.role : null; };
  const posView = (t) => t.positions.map((p) => ({ ...p, got: p.got + (joinedRole(t) === p.role ? 1 : 0) }));
  const openSlots = (t) => posView(t).reduce((s, p) => s + Math.max(0, p.need - p.got), 0);
  const inTeam = (t) => !!t && (t.mine || !!joinedRole(t));
  const KF = { cat: '전체', sort: 'deadline', campus: false }, TF = { role: '전체', kind: '전체' }, PF = { role: '전체' };
  let newTeamContest = '';
  const ddayPill = (date, closed) => { const n = cday(date); if (closed || n < 0) return '<span class="dpill closed">마감</span>'; return `<span class="dpill ${n <= 7 ? 'hot' : ''}">${n === 0 ? 'D-Day' : `D-${n}`}</span>`; };
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
      <div class="pos-row">${posView(t).map(posPill).join('')}</div>
      <div class="meta">${esc(t.mode)} · ${esc(t.period)}</div>
      <div class="tc-foot">${avatar(t.leader.nick, 'sm')}<span class="small" style="flex:1;min-width:0"><b>${esc(t.leader.nick)}</b> · 완주율 ${t.leader.rate}%</span>${t.mine ? '<span class="badge b-school">내 팀</span>' : ap ? `<span class="badge ${ap.status === '합류' ? 'b-school' : 'b-review'}">${esc(ap.role)} · ${ap.status}</span>` : `<span class="small muted">지원 ${t.applicants}명</span>`}</div>
    </article>`;
  }

  function pageContests() {
    const sorters = { deadline: (a, b) => a.deadline.localeCompare(b.deadline), popular: (a, b) => b.scraps - a.scraps, teams: (a, b) => teamsFor(b.id).length - teamsFor(a.id).length };
    const list = D.contests.filter((k) => (KF.cat === '전체' || k.cat === KF.cat) && (!KF.campus || k.campus) && cday(k.deadline) >= 0).sort(sorters[KF.sort]);
    return headTeams('contests', '공모전·대외활동을 찾고, 같은 학교 학생과 바로 팀을 꾸려요') + `
    <div class="tabs" aria-label="분야">${chipBtns('k-cat', ['전체', ...D.contestCats], KF.cat)}</div>
    <div class="list-head" style="margin-bottom:12px"><span class="count">접수 중 <b>${list.length}</b>개</span>
      <div style="display:flex;gap:6px;align-items:center"><button class="tab ${KF.campus ? 'active' : ''}" data-act="k-campus" aria-pressed="${KF.campus}">교내만</button>
      <select class="sort-select" id="k-sort" aria-label="정렬">${[['deadline', '마감 임박순'], ['popular', '스크랩 많은 순'], ['teams', '팀원 모집 많은 순']].map(([v, l]) => `<option value="${v}" ${KF.sort === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div></div>
    ${list.length ? `<div class="contest-grid">${list.map(contestCard).join('')}</div>` : `<div class="empty">${icon('trophy', 36)}<b>지금 접수 중인 공모전이 없어요</b>분야를 바꾸거나 아래 ‘최근 마감’을 참고하세요.</div>`}
    ${(() => { const past = D.contests.filter((k) => cday(k.deadline) < 0 && cday(k.deadline) >= -45 && (KF.cat === '전체' || k.cat === KF.cat)).sort((a, b) => b.deadline.localeCompare(a.deadline)); return past.length ? `<div class="section-head" style="margin-top:24px"><h2>최근 마감 ${past.length}</h2><span class="small muted">다음 회차 준비용</span></div><div class="contest-grid past">${past.map(contestCard).join('')}</div>` : ''; })()}
    <div class="report-cta"><span>${charImg('think', 'rc-char')}<span><b>찾는 공모전이 없나요?</b><br><span class="small muted">공식 공지 링크와 함께 제보하면 운영자가 확인한 뒤 올려요.</span></span></span><a class="btn btn-outline btn-sm" href="#contests-new">${icon('send', 16)}공모전 제보하기</a></div>
    <div class="info-box" style="margin-top:12px">${icon('alert', 18)}<span>지금 보이는 공모전은 <b>실제 공모전</b>이에요. 2026년 11월 17일에 주최 측 공고와 공모전 사이트를 확인해 요약과 원문 링크만 정리했어요(자동 수집 아님). 지원 전에 공식 공고를 꼭 확인하세요.</span></div>
    ${footer()}`;
  }

  function pageContest(id) {
    const k = findContest(id);
    if (!k) return notFound();
    const sc = S.scrapContests.includes(k.id), ts = allTeams().filter((t) => t.contest === k.id), n = cday(k.deadline);
    return `<a class="back-link" href="#contests">${icon('left', 18)}공모전 목록</a>
    <div class="detail-grid">
      <div class="grid" style="gap:16px">
        <section class="contest-hero" style="background:${k.color}"><span class="ch-emoji" aria-hidden="true">${k.emoji}</span>
          <div><span class="hc-kicker">${k.cat}${k.campus ? ' · 교내' : ''}</span><h1>${esc(k.title)}</h1><p>주최 ${esc(k.host)} · 주관 ${esc(k.org)}</p></div></section>
        <div class="kv"><div><small>접수 기간</small><b>${k.start ? fmtDate(k.start) + ' ~ ' : '~ '}${fmtDate(k.deadline)}</b></div><div><small>참가 대상</small><b>${esc(k.target)}</b></div><div><small>참가 형태</small><b>${esc(k.team)}</b></div><div><small>시상</small><b>${esc(k.prize)}</b></div></div>
        <section class="card pad"><h2 class="block-title">공모 내용</h2><p class="prose">${esc(k.desc)}</p>
          <h3 class="block-title" style="font-size:15px;margin-top:16px">혜택</h3><ul class="rules">${[k.top, ...k.benefits].map((b) => `<li>${icon('trophy', 16)}${esc(b)}</li>`).join('')}</ul></section>
        <section aria-labelledby="h-kt"><div class="section-head"><h2 id="h-kt">이 공모전 팀원 모집 ${ts.length}</h2><button class="more" data-act="new-team" data-contest="${k.id}">모집글 쓰기${icon('right', 16)}</button></div>
          ${ts.length ? `<div class="grid" style="gap:10px">${ts.map(teamCard).join('')}</div>` : `<div class="empty">${icon('users', 36)}<b>아직 팀원 모집 글이 없어요</b>먼저 팀을 만들어 보세요.</div>`}</section>
      </div>
      <aside class="detail-aside grid" style="gap:16px">
        <section class="card pad"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px">${ddayPill(k.deadline)}<span class="small muted">${k.real ? '실제 공모전' : `스크랩 ${k.scraps + (sc ? 1 : 0)} · 조회 ${k.views.toLocaleString()}`}</span></div>
          <p style="font-size:14.5px;margin-top:12px">${n < 0 ? '접수가 마감됐어요.' : n === 0 ? '오늘 접수가 마감돼요.' : `접수 마감까지 <b>${n}일</b> 남았어요.`}</p>
          <div style="display:grid;gap:8px;margin-top:14px">
            <button class="btn btn-primary btn-lg btn-block" data-act="new-team" data-contest="${k.id}">${icon('users', 18)}이 공모전으로 팀 만들기</button>
            <a class="btn btn-outline btn-block" href="#people">${icon('search', 18)}팀을 찾는 학생 보기</a>
            <button class="btn btn-ghost btn-block fav-btn ${sc ? 'on' : ''}" data-act="fav-contest" data-id="${k.id}" aria-pressed="${sc}">${icon('heart', 18)}${sc ? '스크랩함 · 마감 3일 전에 알려드려요' : '스크랩하고 마감 알림 받기'}</button></div>
          ${k.url ? `<a class="btn btn-outline btn-block" style="margin-top:8px" href="${esc(k.url)}" target="_blank" rel="noopener noreferrer">${icon('right', 18)}공식 공고 보기</a><p class="small muted" style="margin-top:10px">2026년 11월 17일에 공식 공고를 보고 정리했어요. 지원 전에 공고 원문을 꼭 확인하세요.</p>` : '<p class="small muted" style="margin-top:12px">공식 공지 링크는 운영자 확인 후 연결돼요.</p>'}</section>
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
    const applyBtn = (cls) => ((t.closed || open === 0) && !inTeam(t) ? `<button class="btn ${cls}" disabled>모집 마감</button>`
      : t.mine || (ap && ap.status === '합류') ? `<a class="btn btn-mint ${cls}" href="#teamroom-${t.id}">${icon('users', 18)}팀 공간 들어가기</a>`
        : ap && ap.status === '거절' ? `<button class="btn ${cls}" disabled>이번엔 함께하지 못해요</button>`
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
          <div class="pos-table">${posView(t).map((p) => { const o = p.need - p.got; return `<div class="pos-line"><b>${esc(p.role)}</b><span class="bar"><i style="width:${Math.round((p.got / p.need) * 100)}%"></i></span><span class="small">${p.got}/${p.need}명</span>${o > 0 ? `<span class="rpill open">${o}명 모집</span>` : '<span class="rpill closed">완료</span>'}</div>`; }).join('')}</div></section>
        <div class="kv"><div><small>진행 방식</small><b>${esc(t.mode)}</b></div><div><small>기간</small><b>${esc(t.period)}</b></div><div><small>정기 회의</small><b>${esc(t.meet)}</b></div><div><small>모집 마감</small><b>${fmtDate(t.deadline)}</b></div></div>
        <section class="card pad"><h2 class="block-title">프로젝트 소개</h2><p class="prose">${esc(t.desc)}</p>
          ${t.tools.length ? `<h3 class="block-title" style="font-size:15px;margin-top:16px">사용 도구</h3><div class="chip-row">${t.tools.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>` : ''}</section>
        ${t.mine ? `<section class="card pad"><h2 class="block-title">${icon('users', 18)}지원자 ${(t.pending || []).length}명 <span class="small muted">(데모 지원자)</span></h2>
          ${(t.pending || []).length ? t.pending.map((a) => { const full = !posView(t).some((p) => p.role === a.role && p.need > p.got); return `<div class="applicant">${avatar(a.nick)}<div class="ap-body"><b>${esc(a.nick)}</b> <span class="badge b-proof">${esc(a.role)}</span><p class="small muted">${esc(a.dept)} · 완주율 ${a.rate}% · ${esc(a.time)}</p><p class="small">“${esc(a.intro)}”</p></div>
            <div class="pd-btns"><button class="btn btn-sm btn-ghost" data-act="t-reject" data-id="${t.id}" data-nick="${esc(a.nick)}">거절</button><button class="btn btn-sm btn-primary" data-act="t-approve" data-id="${t.id}" data-nick="${esc(a.nick)}" ${full ? 'disabled title="이 포지션은 다 찼어요"' : ''}>${full ? '자리 없음' : '승인'}</button></div></div>`; }).join('') : '<p class="small muted">새 지원자가 없어요.</p>'}
          ${(t.members || []).length ? `<p class="small" style="margin-top:10px">합류한 팀원: ${t.members.map((m) => `<b>${esc(m.nick)}</b>(${esc(m.role)})`).join(', ')}</p>` : ''}</section>` : ''}
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
    <div class="mobile-cta"><div class="mc-price"><b>${open > 0 && !t.closed ? `${open}자리 남음` : '모집 마감'}</b><span>${t.closed ? '' : `마감 D-${Math.max(0, cday(t.deadline))} · `}지원 ${t.applicants}명</span></div>${applyBtn('')}</div>`;
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
          <div class="field"><label for="tn-contest">참가 공모전 (선택)</label><select class="select" id="tn-contest" name="contest"><option value="">선택 안 함</option>${D.contests.filter((k) => cday(k.deadline) >= 0).map((k) => `<option value="${k.id}" ${newTeamContest === k.id ? 'selected' : ''}>${esc(k.title)} · D-${cday(k.deadline)}</option>`).join('')}</select></div>
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
    const items = [['#clubs', 't-lav', 'calendar', '동아리·행사', '모집 · 행사 캘린더'], ['#contests', 't-yellow', 'trophy', '프로젝트·공모전', '공모전 · 팀원 모집'], ['#taxi', 't-pink', 'car', '생활 매칭', '택시 · 배달 · 중고'], ['#rooms', 't-peach', 'door', '주거', '방 · 룸메'], ['#reviews', 't-mint', 'star', '후기', '택시팟 · 스터디 · 동아리 후기'], ['#search', 't-sky', 'search', '통합 검색', '한 번에 찾기'], ['#my', 't-sky', 'user', '마이페이지', '인증 · 활동 내역'], ['#admin', 't-lav', 'shield', '운영자 화면', '데모']];
    openModal(modalBox('전체 메뉴', `<nav class="menu-grid" aria-label="전체 메뉴">${items.map(([h, c, ic, t, s]) => `<a class="${c}" href="${h}" data-act="close-go"><span class="tile-ic" style="position:static">${icon(ic, 20)}</span><b>${t}</b><span>${s}</span></a>`).join('')}</nav>`));
  }
  function teamsMyBody() {
    const ap = Object.entries(S.teamApplied).map(([id, a]) => [findTeam(id), a]).filter(([t]) => t);
    const sc = S.scrapContests.map(findContest).filter(Boolean);
    const h = (t) => `<h3 class="block-title" style="font-size:15px;margin-top:6px">${t}</h3>`;
    const tRow = (t, right) => `<a class="list-row" href="#teams-${t.id}"><span class="lr-art" style="background:var(--peach)">${icon('users', 22)}</span><span class="lr-body"><b>${esc(t.title)}</b><span class="small muted">${t.kind} · 마감 ${fmtDate(t.deadline)}</span></span>${right}</a>`;
    const parts = [
      ap.length ? h('지원 현황') + ap.map(([t, a]) => tRow(t, `<span class="badge b-review">${esc(a.role)} · ${a.status}</span>`)).join('') : '',
      allTeams().filter(inTeam).length ? h('내 팀 공간') + allTeams().filter(inTeam).map((t) => `<a class="list-row" href="#teamroom-${t.id}"><span class="lr-art" style="background:var(--mint-100)">${icon('users', 22)}</span><span class="lr-body"><b>${esc(t.title)}</b><span class="small muted">${t.mine ? '팀장' : joinedRole(t)} · 할 일 ${taskStat(t).done}/${taskStat(t).all}</span></span><span class="badge ${S.teamDone[t.id] ? 'b-gray' : 'b-school'}">${S.teamDone[t.id] ? '완주' : '진행 중'}</span></a>`).join('') : '',
      S.myTeams.length ? h('내 모집글') + S.myTeams.map((t) => tRow(t, `<span class="badge b-school">${openSlots(t)}자리 모집 중</span>`)).join('') : '',
      S.contestReports.length ? h('제보한 공모전') + S.contestReports.map((r) => `<div class="list-row"><span class="lr-art" style="background:var(--amber-100)">${icon('send', 20)}</span><span class="lr-body"><b>${esc(r.title)}</b><span class="small muted">${esc(r.host)} · 마감 ${fmtDate(r.deadline)}</span></span><span class="badge b-review">${r.status}</span></div>`).join('') : '',
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
      <p style="font-size:14.5px">${esc(x.name)}은(는) 이음과 <b>별개의 외부 서비스</b>예요. 매물·계약·결제는 ${esc(x.name)}과 집주인의 정책을 따라요.</p>
      <ul class="rules" style="margin-top:10px">
        <li>${icon('check')}앱이 설치돼 있으면 스토어에서 ‘열기’를 누르면 돼요</li>
        <li>${icon('check')}서비스 학교: ${esc(x.schools)}</li>
        <li>${icon('alert')}계약 전에 방을 직접 보고, 등기부등본을 확인하세요</li>
      </ul>
      <div class="modal-actions"><button class="btn btn-outline" data-act="close">취소</button><a class="btn btn-primary" href="${url}" target="_blank" rel="noopener noreferrer" data-act="close-go">${label}</a></div>
      <p class="small muted" style="margin-top:12px;text-align:center">이음은 ${esc(x.name)}과 제휴 관계가 아니며, 링크만 연결해요.</p>`));
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
      case 'roommate': html = a === 'survey' ? pageSurvey() : a ? (cta = true, pageMate(a)) : pageRoommate(); nav = 'rooms'; break;
      case 'rooms': html = a === 'new' ? pageRoomNew() : a ? (cta = true, pageRoom(a)) : pageRooms(); break;
      case 'market': html = a === 'new' ? pageItemNew() : a ? (cta = true, pageItem(a)) : pageMarket(); nav = 'life'; break;
      case 'taxi': html = a === 'new' ? pageTaxiNew() : a ? pageTaxiOne(a) : pageTaxi(); nav = 'life'; break;
      case 'delivery': html = a === 'new' ? pageDeliveryNew() : a ? pageDeliveryOne(a) : pageDelivery(); nav = 'life'; break;
      case 'community': case 'reviews': html = pageReviews(a); nav = 'reviews'; break;
      case 'post': html = pagePost(a); nav = 'reviews'; break;
      case 'write': html = pageWrite(a); nav = 'reviews'; break;
      case 'clubs': html = a ? (cta = true, pageClub(a)) : pageClubs(); break;
      case 'events': html = pageEvents(); nav = 'clubs'; break;
      case 'search': html = pageSearch(); nav = 'home'; break;
      case 'admin': html = pageAdmin(a); nav = 'my'; break;
      case 'event': html = pageEvent(a); nav = 'clubs'; break;
      case 'clubroom': html = pageClubRoom(a); nav = 'clubs'; break;
      case 'contests': html = a === 'new' ? pageContestNew() : a ? (cta = true, pageContest(a)) : pageContests(); nav = 'teams'; break;
      case 'teamroom': html = pageTeamRoom(a); nav = 'teams'; break;
      case 'teams': html = a === 'new' ? pageTeamNew() : a ? (cta = true, pageTeam(a)) : pageTeams(); break;
      case 'people': html = pagePeople(); nav = 'teams'; break;
      case 'my': html = pageMy(a); break;
      case 'verify': html = pageVerify(); nav = 'my'; break;
      case 'privacy': html = pagePrivacy(); nav = 'my'; break;
      case 'signup': html = pageSignup(); nav = 'my'; break;
      default: html = notFound();
    }
    if (!a && ['contests', 'teams', 'people', 'clubs', 'events'].includes(p)) html = actSwitch(['clubs', 'events'].includes(p) ? p : 'contests') + html;
    if (!a && p === 'market') html = `<div class="hub-switch">${lifeTabs('market')}</div>` + html;
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
    const sameBase = base === lastHash.split('-')[0] && /^#(my|reviews|community)$/.test(base);
    lastHash = location.hash;
    route();
    if (!sameBase) {
      /* 홈의 ‘진행 중인 매칭’에서 왔을 때, 폰 화면에서는 프로필 카드를 건너뛰고 매칭 목록으로 바로 내려가요 */
      const tb = location.hash === '#my-matches' && innerWidth < 1024 && document.querySelector('.my-grid .tabs');
      window.scrollTo({ top: tb ? tb.getBoundingClientRect().top + scrollY - 84 : 0, behavior: "instant" });
    }
  }

  const actSwitch = (active) => `<nav class="seg nav housing-tabs hub-switch" aria-label="활동 메뉴">${[['contests', '공모전·팀', 'trophy'], ['clubs', '동아리', 'users'], ['events', '행사', 'calendar']].map(([k, l, ic]) => `<a href="#${k}" class="${active === k ? 'active' : ''}" ${active === k ? 'aria-current="page"' : ''}>${icon(ic, 16)}${l}</a>`).join('')}</nav>`;
  function renderChrome(nav) {
    lastNav = nav;
    $$('.desk-nav a').forEach((a) => { const on = a.dataset.nav === nav; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
    const tabs = [['home', 'home', '홈', 'home'], ['rooms', 'door', '주거', 'rooms'], ['contests', 'trophy', '활동', 'act'], ['taxi', 'car', '생활', 'life'], ['my', 'user', 'MY', 'my']];
    const tabNav = nav === 'reviews' ? 'home' : ['teams', 'clubs'].includes(nav) ? 'act' : nav;
    $('#tabbar').innerHTML = `<div class="tabbar-pill">${tabs.map(([k, ic, l, n]) => `<a href="#${k}" class="${tabNav === n ? 'active' : ''}" aria-label="${l}" ${tabNav === n ? 'aria-current="page"' : ''}>${icon(ic, 22)}<span class="tl" aria-hidden="true">${l}</span></a>`).join('')}</div>`;
    $('#top-actions').innerHTML = `
      <button class="icon-btn mobile-only" data-act="menu" aria-label="전체 메뉴">${icon('grid', 22)}</button>
      <a class="icon-btn" href="#search" aria-label="통합 검색">${icon('search', 22)}</a>
      ${(() => { const n = S.notifs.filter((x) => !x.read).length; return `<button class="icon-btn" data-act="notif" aria-label="알림${n ? ` · 읽지 않은 알림 ${n}개` : ''}">${icon('bell', 22)}${n ? `<span class="nbadge">${n > 9 ? '9+' : n}</span>` : ''}</button>`; })()}
      ${!S.login ? `<button class="verify-pill off" data-act="kakao-login">${icon('user', 16)}<span class="vp-txt">로그인</span></button>` : S.verified ? `<a class="verify-pill on" href="#my">${icon('shield', 16)}<span class="vp-txt">인증 완료</span></a>` : `<a class="verify-pill off" href="#verify">${icon('shield', 16)}<span class="vp-txt">${S.verifyReq && S.verifyReq.status === '검토 중' ? '인증 검토 중' : '학생 인증'}</span></a>`}`;
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
  /* 첫 실행 소개 3장: 인사 → 학생 유형 → 무엇부터 */
  let obStep = 0;
  function openOnboard() { obStep = 0; renderOnboard(); }
  function renderOnboard() {
    const steps = [
      `${charImg('hero', 'ob-char', '손 흔드는 잇고')}<h2 id="mtitle">안녕! 나는 잇고야</h2><p>이음은 ${esc(D.school.name)} 학생끼리<br>룸메·방·중고·팀플을 <b>안전하게 이어 주는</b> 곳이야.</p>`,
      `${charImg('think', 'ob-char', '궁금해하는 잇고')}<h2 id="mtitle">너는 어떤 학생이야?</h2><p>맞는 정보를 먼저 보여 줄게.</p><div class="ob-opts" role="group" aria-label="학생 유형">${['신입생', '복학생', '재학생'].map((t) => `<button class="ob-opt ${S.stype === t ? 'on' : ''}" data-act="ob-type" data-v="${t}" aria-pressed="${S.stype === t}">${t}</button>`).join('')}</div>`,
      `${charImg('match', 'ob-char', '하트를 든 잇고')}<h2 id="mtitle">무엇부터 찾아볼까?</h2><div class="ob-go">${[['#rooms', '방·룸메', '같이 살 사람 · 들어갈 방'], ['#market', '중고거래', '전공책 · 자취템'], ['#contests', '팀플·공모전', '팀원 구하기'], ['#clubs', '동아리·행사', `${S.stype} 환영 동아리`]].map(([h, t, sub]) => `<button data-act="ob-go" data-v="${h}"><b>${t}</b><span>${sub}</span></button>`).join('')}</div>`,
    ];
    const inner = `<div class="ob-dots" aria-label="${obStep + 1} / 3단계">${steps.map((_, i) => `<i class="${i === obStep ? 'on' : ''}"></i>`).join('')}</div>
      <div class="ob-body">${steps[obStep]}</div>
      <div class="ob-actions">${obStep < 2 ? `<button class="btn btn-ghost" data-act="ob-go" data-v="#home">건너뛰기</button><button class="btn btn-primary" data-act="ob-next" autofocus>다음${icon('right', 16)}</button>` : `${S.login ? '' : kakaoBtn('카카오로 시작하기', 'grow')}<button class="btn btn-ghost" data-act="ob-go" data-v="#home">${S.login ? '홈에서 시작하기' : '둘러보기'}</button>`}</div>`;
    const cur = slot.querySelector('.modal.onboard');
    if (cur) { cur.innerHTML = inner; const f = cur.querySelector('[autofocus], .ob-opt.on, .ob-go button'); if (f) f.focus(); return; }
    openModal(`<div class="modal onboard" role="dialog" aria-modal="true" aria-labelledby="mtitle">${inner}</div>`, 'ob-root');
  }

  function toast(msg, ic = 'check') {
    const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = `${icon(ic, 18)}<span>${msg}</span>`;
    $('#toasts').appendChild(el); setTimeout(() => el.remove(), 2600);
  }
  /* ── 카카오 로그인: config.js에 JavaScript 키가 있으면 실제 카카오로, 없으면 데모로 동작해요 ── */
  const KAKAO_SYMBOL = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#000" d="M12 3.5c-5.2 0-9.4 3.3-9.4 7.4 0 2.6 1.7 4.9 4.3 6.2l-1 3.7c-.1.3.3.6.6.4l4.4-2.9c.4 0 .7.1 1.1.1 5.2 0 9.4-3.3 9.4-7.5S17.2 3.5 12 3.5z"/></svg>';
  const kakaoBtn = (label = '카카오 로그인', cls = '') => `<button class="btn kakao-btn ${cls}" data-act="kakao-login">${KAKAO_SYMBOL}<span>${label}</span></button>`;
  const KAKAO_KEY = (window.CM_CONFIG && window.CM_CONFIG.kakaoJsKey) || '';
  function loadKakao() {
    return new Promise((ok, no) => {
      if (window.Kakao) return ok(window.Kakao);
      const sc = document.createElement('script'); sc.src = window.CM_CONFIG.kakaoSdk; sc.onload = () => ok(window.Kakao); sc.onerror = no; document.head.appendChild(sc);
    });
  }
  function kakaoLogin() {
    const webPage = /^https?:$/.test(location.protocol);
    if (KAKAO_KEY && webPage) {
      loadKakao().then((K) => { if (!K.isInitialized()) K.init(KAKAO_KEY); K.Auth.authorize({ redirectUri: location.origin + location.pathname }); })
        .catch(() => toast('카카오 SDK를 불러오지 못했어요. 인터넷 연결을 확인해 주세요', 'alert'));
      return;
    }
    openModal(modalBox('카카오 로그인', `<div class="kakao-demo">${KAKAO_SYMBOL.replace('width="18" height="18"', 'width="40" height="40"')}
      <p style="font-size:14.5px">${KAKAO_KEY ? '<b>아이폰 앱에서는 아직 데모예요.</b> 앱용 카카오 SDK를 연결하기 전이라 예시 계정으로 로그인해요. 웹사이트에서는 실제 카카오 로그인이 돼요.' : '<b>지금은 데모예요.</b> 카카오 개발자 사이트에 앱을 등록하고 키를 넣으면 실제 카카오 로그인 화면으로 넘어가요.'}</p>
      <ul class="rules small" style="text-align:left"><li>${icon('check')}받는 정보: 카카오 닉네임 (선택: 프로필 사진)</li><li>${icon('check')}카카오 계정은 <b>로그인</b>에만 쓰여요. 교통대 학생인지는 다음 단계 <b>학생 인증</b>에서 확인해요</li><li>${icon('lock')}받은 닉네임은 이 기기 브라우저에만 저장돼요 · <a href="#privacy" data-act="close-go">개인정보처리방침</a></li></ul></div>
      <div class="modal-actions"><button class="btn btn-outline" data-act="close">취소</button>${kakaoBtn('예시 계정으로 계속 (데모)', 'grow').replace('data-act="kakao-login"', 'data-act="kakao-demo"')}</div>`));
  }
  function afterLogin() {
    renderChrome(lastNav);
    if (S.member && S.member.kakaoId && S.login.kakaoId && S.member.kakaoId !== S.login.kakaoId) S.member = null; // 다른 카카오 계정이면 새로 입력
    if (!S.member) { save(); if (location.hash === '#signup') route(); else location.hash = '#signup'; toast(`로그인했어요. 회원정보를 입력해 주세요`, 'check'); return; }
    if (!S.verified) { if (location.hash === '#verify') route(); else location.hash = '#verify'; toast(`${S.login.nick}님, 로그인했어요. 이제 학생 인증만 하면 돼요`, 'check'); }
    else { route(); toast('로그인했어요', 'check'); }
  }
  /* 카카오에서 돌아왔을 때 (?code=…): 사용자 정보는 서버가 토큰으로 바꿔야 받을 수 있어요 */
  (function kakaoReturn() {
    const q = new URLSearchParams(location.search), code = q.get('code');
    if (!code && !q.get('error')) return;
    history.replaceState(null, '', location.pathname + (location.hash || '#home'));
    if (q.get('error')) { setTimeout(() => toast('카카오 로그인을 취소했어요', 'x'), 300); return; }
    S.login = { provider: 'kakao', nick: '카카오 사용자', at: Date.now(), codeOnly: true }; save();
    /* 서버 없이 시도: JavaScript 키로 토큰을 받고 닉네임을 조회해요. 카카오가 막으면 '인증만 된 상태'로 남아요 */
    const redirectUri = location.origin + location.pathname;
    fetch('https://kauth.kakao.com/oauth/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: new URLSearchParams({ grant_type: 'authorization_code', client_id: KAKAO_KEY, redirect_uri: redirectUri, code }) })
      .then((r) => r.json())
      .then((t) => { if (!t.access_token) throw new Error(t.error_description || t.error || 'no token');
        return fetch('https://kapi.kakao.com/v2/user/me', { headers: { Authorization: 'Bearer ' + t.access_token } }).then((r) => r.json()); })
      .then((me) => {
        const nick = (me.kakao_account && me.kakao_account.profile && me.kakao_account.profile.nickname) || (me.properties && me.properties.nickname);
        if (!nick) throw new Error('no nickname');
        S.login = { provider: 'kakao', nick, kakaoId: me.id, at: Date.now() }; save(); afterLogin();
      })
      .catch((e) => { console.warn('카카오 토큰·사용자 정보 받기 실패:', e.message); toast('카카오 인증은 마쳤어요. 닉네임을 받아오려면 서버 연결이 필요해요', 'check'); });
  })();

  function openLoginNeeded(what) {
    openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:#FFF7C2;color:#3C1E1E">${icon('user', 30)}</div>
      <h2 id="mtitle">로그인이 필요해요</h2><p class="muted" style="margin-top:8px;font-size:14.5px">${what}은(는) 로그인하고 <b>학생 인증</b>을 마친 교통대 학생만 할 수 있어요. 둘러보기는 로그인 없이도 돼요.</p>
      <div class="modal-actions"><button class="btn btn-outline" data-act="close">나중에</button>${kakaoBtn('카카오로 시작하기', 'grow')}</div></div>`);
  }
  function needVerify(what = '이 기능') {
    if (S.verified) return false;
    if (!S.login) { openLoginNeeded(what); return true; }
    if (!S.member) { location.hash = '#signup'; toast('먼저 회원정보를 입력해 주세요', 'user'); return true; }
    openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:var(--mint-100);color:var(--mint-800)">${icon('lock', 30)}</div>
      <h2 id="mtitle">학생 인증이 필요해요</h2><p class="muted" style="margin-top:8px;font-size:14.5px">${what}은(는) 학생증으로 ${D.school.name} 학생 인증을 마친 뒤에 할 수 있어요.${S.verifyReq && S.verifyReq.status === '검토 중' ? ' 지금 운영자가 확인하고 있어요.' : ''}</p>
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
  /* ── 알림 센터: 승인·수락·처리 결과처럼 실제로 일어난 일을 쌓아요 ── */
  const relTime = (at) => { const m = Math.round((Date.now() - at) / 60000); return m < 1 ? '방금' : m < 60 ? `${m}분 전` : m < 1440 ? `${Math.floor(m / 60)}시간 전` : `${Math.floor(m / 1440)}일 전`; };
  let lastNav = 'home';
  function notify(text, ic = 'bell', href = '#my') {
    S.notifs.unshift({ text, ic, href, at: Date.now() }); S.notifs = S.notifs.slice(0, 30); save(); renderChrome(lastNav);
  }
  function openNotif() {
    const list = S.notifs;
    list.forEach((n) => { n.read = true; }); save(); renderChrome(lastNav);
    openModal(modalBox('알림', list.length ? `<div>${list.map((n) => `<a class="list-row" href="${n.href}" data-act="close-go"><span class="lr-art" style="width:42px;height:42px;background:var(--blue-50);color:var(--navy-800)">${icon(n.ic, 20)}</span><span class="lr-body"><span style="font-size:14px;font-weight:600">${esc(n.text)}</span><br><span class="small muted">${relTime(n.at)}</span></span></a>`).join('')}</div>`
      : `<div class="empty">${icon('bell', 36)}<b>새 알림이 없어요</b></div>`));
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
      ${S.matches[key] && ['acc', 'plan'].includes(S.matches[key].stage) ? `<div class="chat-meet">${icon('pin', 16)}<span>${S.matches[key].stage === 'plan' ? `체크인 완료 · ${meetLine(S.matches[key])}` : '만나기 전에 장소·시간을 기록해요'}</span><button class="btn btn-sm ${S.matches[key].stage === 'plan' ? 'btn-outline' : 'btn-primary'}" data-act="checkin" data-key="${key}">${S.matches[key].stage === 'plan' ? '바꾸기' : '만남 체크인'}</button></div>` : ''}
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
    box.innerHTML = `<div class="msg sys">${icon('shield', 16)}<span><b>데모 채팅:</b> 상대는 예시 사용자이고 메시지는 실제로 전송되지 않아요. 실제 서비스에서는 학교 인증 학생끼리 대화해요. <b>직접 만나 확인하기 전에는 절대 송금하지 마세요.</b> 외부 메신저 유도·선입금 요구는 신고해 주세요.</span></div>`
      + msgs.map((m) => (m.t === 'sys' ? `<div class="msg sys checkin">${icon('pin', 16)}<span>${esc(m.text)}</span></div>` : `<div class="msg ${m.t}">${esc(m.text)}</div><span class="msg-time ${m.t === 'them' ? 'l' : ''}">${m.at}</span>`)).join('')
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
      case 'rv-write': {
        rvDraft = { board: el.dataset.board, title: el.dataset.title || '', rating: +el.dataset.rating || 5, tags: (el.dataset.tags || '').split('|').filter(Boolean) };
        closeModal(); const h = '#write-' + rvDraft.board; if (location.hash === h) route(); else location.hash = h; break;
      }
      case 'ob-next': obStep = Math.min(2, obStep + 1); renderOnboard(); break;
      case 'ob-type': S.stype = el.dataset.v; save(); renderOnboard(); break;
      case 'ob-go': S.onboarded = true; save(); closeModal(); if (location.hash === el.dataset.v) route(); else location.hash = el.dataset.v; break;
      case 'onboard': openOnboard(); break;
      case 'season': seasonPick = el.dataset.v; route(); break;
      case 'checkin': openCheckin(el.dataset.key); break;
      case 'demo-close': S.demoNoticeClosed = true; save(); route(); break;
      case 'kakao-login': S.onboarded = true; save(); closeModal(); kakaoLogin(); break;
      case 'kakao-demo': S.login = { provider: 'kakao', nick: D.me.nick, at: Date.now(), demo: true }; save(); closeModal(); afterLogin(); break;
      case 'logout': S.login = null; S.verified = false; S.verifyReq = null; S.verifyMethod = ''; save(); route(); renderChrome(lastNav); toast('로그아웃했어요', 'x'); break;
      case 'adm-verify': {
        const key = el.dataset.key, ok = el.dataset.v === 'ok';
        if (key === 'me' && S.verifyReq) { if (ok) { S.verified = true; S.verifyMethod = S.verifyReq.method; S.verifyReq.status = '승인'; notify('학생 인증이 승인됐어요 · 이제 모든 기능을 쓸 수 있어요', 'shield', '#verify'); } else { S.verifyReq.status = '반려'; S.verifyReq.reason = '학교 이름이나 이름이 잘 보이지 않아요'; notify('학생 인증 서류가 반려됐어요 · 다시 올려 주세요', 'alert', '#verify'); } }
        else S.verifyActs[key] = ok ? '승인' : '반려';
        save(); route(); renderChrome(lastNav); toast(ok ? '승인했어요' : '반려했어요', ok ? 'check' : 'x'); break;
      }
      case 'sq': { searchQ = el.dataset.v; const i = $('#g-search'); if (i) i.value = searchQ; $('#search-results').innerHTML = searchResults(searchQ); break; }
      case 'profile-edit': openProfileEdit(); break;
      case 'adm-tab': location.hash = '#admin-' + el.dataset.v; break;
      case 'adm-report': {
        const key = el.dataset.key, res = el.dataset.v; S.reportActs[key] = res; save();
        const mine = S.reports.find((r) => (r.id || r.target + r.date) === key);
        if (mine) notify(`신고하신 ‘${mine.target}’를 처리했어요: ${res}`, 'flag', '#my-reports');
        route(); toast(`처리했어요: ${res}`, 'check'); break;
      }
      case 'adm-hide': { const on = toggleIn(S.hiddenG, id); save(); route(); toast(on ? '모집글을 숨겼어요. 참여자에게 안내가 가요' : '숨김을 풀었어요', on ? 'ban' : 'check'); break; }
      case 'adm-restrict': { const nk = el.dataset.nick; S.restricted[nk] = !S.restricted[nk]; save(); route(); toast(S.restricted[nk] ? `${nk}님의 참여를 7일간 제한했어요` : `${nk}님의 제한을 풀었어요`, S.restricted[nk] ? 'ban' : 'check'); break; }
      case 'adm-contest': {
        const r = S.contestReports.find((x) => x.id === id); if (!r) return;
        if (el.dataset.v === 'ok') {
          const k = { id: 'kr' + Date.now(), title: r.title, host: r.host, org: r.host, cat: r.cat, emoji: '📣', color: '#E4DEFF', start: TODAY, deadline: r.deadline, prize: '공식 공지 참고', top: '공식 공지 참고', team: '공식 공지 참고', target: '대학생',
            scraps: 0, views: 1, campus: false, benefits: ['자세한 내용은 공식 공지에서 확인하세요'], desc: `${r.memo || '학생이 제보한 공모전이에요.'}\n공식 공지: ${r.url}`, reported: true };
          S.approvedContests.unshift(k); D.contests.unshift(k); r.status = '공개됨'; r.kid = k.id;
          notify(`제보하신 ‘${r.title}’가 공모전 목록에 올라갔어요`, 'trophy', `#contests-${k.id}`);
        } else { r.status = '반려 · 공식 공지 확인 불가'; notify(`제보하신 ‘${r.title}’는 공식 공지를 확인하지 못해 반려됐어요`, 'x', '#my-teams'); }
        save(); route(); toast(el.dataset.v === 'ok' ? '공모전을 공개했어요' : '제보를 반려했어요', 'check'); break;
      }
      case 'croom-chat': openClubChat(findClub(id)); break;
      case 'club-leave': { const c = findClub(id); delete S.applied[c.id]; save(); location.hash = '#clubs-' + c.id; toast(`${c.name}에서 나왔어요`, 'x'); break; }
      case 'em-new': if (needVerify('함께 갈 사람 모집')) return; openEmNew(findEvent(id)); break;
      case 'em-apply': {
        if (needVerify('함께 가기 신청')) return;
        const m = findMate(id); if (!m || emStatus(m) !== 'recruit') return toast('지금은 신청할 수 없어요', 'x');
        if (emM(m) && emM(m).status !== 'left') return toast('이미 신청했어요', 'check');
        S.emj[m.id] = { status: 'applied' }; save(); route(); toast('함께 가기를 신청했어요. 모집자가 수락하면 알려 드릴게요', 'send');
        setTimeout(() => { const j = S.emj[m.id]; if (!j || j.status !== 'applied') return; j.status = emPeople(m).length < m.cap ? 'approved' : 'rejected'; save(); if (j.status === 'approved') notify(`${m.leader.nick}님과 ‘${findEvent(m.event).title}’에 함께 가요`, 'calendar', `#event-${m.event}`);
          toast(j.status === 'approved' ? `${m.leader.nick}님이 수락했어요 · ${m.meet}에서 만나요` : '아쉽게도 자리가 먼저 찼어요', j.status === 'approved' ? 'users' : 'x'); if (!slot.innerHTML) route(); }, 1800);
        break;
      }
      case 'em-leave': { S.emj[id].status = 'left'; save(); route(); toast('함께 가기를 취소했어요', 'x'); break; }
      case 'em-chat': openEmChat(findMate(id)); break;
      case 'em-approve': case 'em-reject': {
        const m = findMate(id), i = m.pending.findIndex((x) => x.nick === el.dataset.nick); if (i < 0) return;
        if (act === 'em-approve' && emPeople(m).length >= m.cap) return toast('정원이 다 찼어요', 'x');
        const [pp] = m.pending.splice(i, 1); if (act === 'em-approve') m.members.push(pp); save(); route();
        toast(act === 'em-approve' ? `${pp.nick}님과 함께 가요` : `${pp.nick}님의 신청을 거절했어요`, act === 'em-approve' ? 'users' : 'x'); break;
      }
      case 'em-cancel': { const m = findMate(id); m.canceled = true; m.pending = []; save(); route(); toast('모집을 취소했어요', 'x'); break; }
      case 't-approve': case 't-reject': {
        const t = findTeam(id), i = (t.pending || []).findIndex((x) => x.nick === el.dataset.nick); if (i < 0) return;
        const a = t.pending[i], pos = t.positions.find((p) => p.role === a.role);
        if (act === 't-approve' && !(pos && pos.need > pos.got)) return toast('이 포지션은 이미 다 찼어요', 'x');
        t.pending.splice(i, 1);
        if (act === 't-approve') { pos.got += 1; t.members = t.members || []; t.members.push({ nick: a.nick, role: a.role, dept: a.dept }); }
        save(); route(); toast(act === 't-approve' ? `${a.nick}님이 ${a.role}(으)로 합류했어요 · 팀 공간에 초대됐어요` : `${a.nick}님의 지원을 거절했어요`, act === 't-approve' ? 'users' : 'x'); break;
      }
      case 'task-toggle': { const tk = (S.teamTasks[id] || []).find((x) => x.id === el.dataset.task); if (!tk) return; tk.done = !tk.done; save(); route(); break; }
      case 'troom-chat': openTeamChat(findTeam(id)); break;
      case 'team-finish': openTeamFinish(findTeam(id)); break;
      case 'taxi-f': taxiF = el.dataset.v; route(); break;
      case 'dlv-f': dlvF = el.dataset.v; route(); break;
      case 'g-apply': {
        if (needVerify('생활 매칭 참여')) return;
        const g = findG(id); if (!g) return;
        if (S.restricted[D.me.nick]) return toast('운영자가 7일간 생활 매칭 참여를 제한했어요', 'ban');
        if (S.cancels >= CANCEL_LIMIT) return toast(`확정 후 취소가 ${CANCEL_LIMIT}회 이상이라 7일간 참여할 수 없어요 (운영 정책 초안)`, 'ban');
        if (gStatus(g) !== 'recruit') return toast('지금은 참여할 수 없는 모집글이에요', 'x');
        if (myM(g) && myM(g).status !== 'left') return toast('이미 신청한 모집글이에요', 'check');
        if (gCount(g) >= g.cap) return toast('정원이 다 찼어요', 'x');
        S.gm[g.id] = { status: 'applied', items: [], at: Date.now() }; save(); route();
        toast('참여를 신청했어요. 모집자가 승인하면 알려 드릴게요', 'send');
        setTimeout(() => { const m = S.gm[g.id]; if (!m || m.status !== 'applied') return;
          if (gCount(g) < g.cap && Date.now() < g.closeAt) { m.status = 'approved'; notify(`${g.leader.nick}님이 ‘${gTitle(g)}’ 참여를 승인했어요`, g.type === 'taxi' ? 'car' : 'utensils', `#${g.type}-${g.id}`); toast(`${g.leader.nick}님이 참여를 승인했어요${g.type === 'delivery' ? ' · 메뉴를 담아 주세요' : ''}`, 'check'); }
          else { m.status = 'rejected'; toast('아쉽게도 정원이 먼저 찼어요', 'x'); }
          save(); if (!slot.innerHTML) route(); }, 1800);
        break;
      }
      case 'g-leave': {
        const g = findG(id), m = S.gm[id]; if (!g || !m) return;
        const confirmed = ['approved', 'final'].includes(m.status);
        m.status = 'left'; if (confirmed) { S.cancels += 1; if (g.type === 'taxi' && Date.now() > g.closeAt) S.trustBonus -= 1; }
        save(); route(); toast(confirmed ? `참여를 취소했어요 · 확정 후 취소 ${S.cancels}회 (${CANCEL_LIMIT}회부터 7일 제한)` : '신청을 취소했어요', 'x'); break;
      }
      case 'g-final': { S.gm[id].status = 'final'; save(); route(); const g = findG(id); toast(`최종 확인 완료 · ${clock(g.departAt)}에 ${g.from}에서 만나요`, 'check'); break; }
      case 'g-chat': openGChat(findG(id)); break;
      case 'g-menu': openOrderMenu(findG(id)); break;
      case 'g-settle': openSettle(findG(id)); break;
      case 'g-recv': openRecv(findG(id)); break;
      case 'split-even': { const f = el.closest('form'), t = +f.total.value || 0, n = +f.total.dataset.split, e = Math.floor(t / n / 10) * 10; for (let i = 0; i < n; i++) f['s' + i].value = i === n - 1 ? t - e * (n - 1) : e; break; }
      case 'g-approve': case 'g-reject': {
        const g = findG(id), i = g.pending.findIndex((x) => x.nick === el.dataset.nick); if (i < 0) return;
        if (act === 'g-approve' && gCount(g) >= g.cap) return toast('정원이 다 차서 더 승인할 수 없어요', 'x');
        const [pp] = g.pending.splice(i, 1); if (act === 'g-approve') g.members.push(pp);
        save(); route(); toast(act === 'g-approve' ? `${pp.nick}님을 승인했어요` : `${pp.nick}님의 신청을 거절했어요`, act === 'g-approve' ? 'check' : 'x'); break;
      }
      case 'g-close': { const g = findG(id); g.closeAt = Date.now(); g.closed = true; g.pending = []; save(); route(); toast(gCount(g) >= 2 ? '주문을 마감했어요. 배달앱에서 주문해 주세요' : '참여자가 없어 모집이 종료됐어요', 'clock'); break; }
      case 'g-ordered': { const g = findG(id); g.ordered = true; save(); route(); toast('참여자들에게 주문 완료를 알렸어요', 'send'); break; }
      case 'g-delist': { const g = findG(id); g.canceled = true; g.pending = []; save(); route(); toast('모집을 취소했어요. 참여자에게 알림이 가요', 'x'); break; }
      case 'm-accept': { const m = S.matches[el.dataset.key]; m.stage = 'acc'; notify(`${m.with}님이 연락 요청을 수락했어요`, 'heart', '#my-matches'); if (m.kind === '룸메' && !S.interests.includes(m.id)) S.interests.push(m.id); save(); route(); toast(`${m.with}님이 연락 요청을 수락했어요. 이제 채팅할 수 있어요`, 'heart'); break; }
      case 'm-met': { const m = S.matches[el.dataset.key]; m.stage = 'met'; m.metAt = nowTime(); save(); route(); openMatchReview(m.key); break; }
      case 'm-review': openMatchReview(el.dataset.key); break;
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
      case 'event-join': { if (needVerify('행사 참여')) return; if (findEvent(id).date < TODAY) return toast('이미 끝난 행사예요', 'x'); const on = toggleIn(S.going, id); save(); route(); toast(on ? '참여 예정에 추가했어요. 하루 전에 알려드릴게요' : '참여를 취소했어요', on ? 'calendar' : 'x'); break; }
      case 'interest': {
        if (needVerify('룸메이트 연락 요청')) return;
        const c = D.mates.find((x) => x.id === id);
        const added = toggleIn(S.interests, id);
        if (added) ensureMatch('mate-' + id, { id, kind: '룸메', with: c.nick, trust: c.trust, title: `${c.dorm} 룸메이트`, href: `#roommate-${id}`, stage: c.likedMe ? 'acc' : 'req' });
        else if (S.matches['mate-' + id] && ['req', 'acc'].includes(S.matches['mate-' + id].stage)) delete S.matches['mate-' + id];
        save(); route();
        if (added && c.likedMe) {
          openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:var(--mint-100);color:var(--mint-800)">${icon('heart', 30)}</div>
            <h2 id="mtitle">연결됐어요! 🎉</h2><p class="muted" style="margin-top:8px;font-size:14.5px"><b>${esc(c.nick)}</b>님도 회원님에게 연락을 요청했어요. 이제 전체 프로필을 보고 채팅할 수 있어요.</p>
            <div class="modal-actions"><a class="btn btn-outline" href="#roommate-${c.id}" data-act="close-go">프로필 보기</a><button class="btn btn-mint" data-act="mate-chat" data-id="${c.id}">${icon('chat', 18)}채팅 시작</button></div></div>`);
        } else toast(added ? '연락 요청을 보냈어요. 상대가 수락하면 채팅이 열려요' : '연락 요청을 취소했어요', added ? 'heart' : 'x');
        break;
      }
      case 'mate-chat': {
        const c = D.mates.find((x) => x.id === id); if (!c) return;
        const mm = S.matches['mate-' + id];
        if (mm && mm.stage === 'req') return toast('상대가 연락 요청을 수락하면 채팅할 수 있어요', 'clock');
        ensureMatch('mate-' + id, { id, kind: '룸메', with: c.nick, trust: c.trust, title: `${c.dorm} 룸메이트`, href: `#roommate-${id}` });
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
        ensureMatch('room-' + id, { id, kind: '방', with: r.author.nick, trust: r.author.trust, title: r.title, href: `#rooms-${id}` });
        openChat('room-' + id, { name: r.author.nick, trust: r.author.trust, greeting: '안녕하세요! 매물 보고 연락 주셨나요? 궁금한 점 편하게 물어보세요.',
          ctx: ctxBar(roomArt(r.seed), r.title, `월 ${r.rent}만 · 보증금 ${r.deposit}만`),
          quick: ['방 직접 보러 가도 될까요?', '집주인 양도 동의 받으셨나요?', '관리비에 뭐가 포함돼요?', '등기부등본 확인 가능할까요?'],
          replies: ['네! 평일 저녁 6시 이후나 주말 언제든 방문 가능해요.', '네 집주인분께 이미 동의 받았어요. 계약은 집주인분과 직접 하시면 돼요.', '수도랑 인터넷 포함이에요. 전기·가스는 따로 나와요.', '물론이죠. 방문하실 때 같이 확인하셔도 돼요.'] });
        break;
      }
      case 'item-chat': {
        if (needVerify('채팅')) return;
        const i = findItem(id);
        ensureMatch('item-' + id, { id, kind: '중고', with: i.seller.nick, trust: i.seller.trust, title: i.title, href: `#market-${id}` });
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
      case 'reset': openModal(`<div class="modal modal-center" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mi" style="background:var(--amber-100);color:var(--amber-800)">${icon('refresh', 30)}</div><h2 id="mtitle">이 기기의 내 데이터를 모두 지울까요?</h2><p class="muted" style="margin-top:8px;font-size:14.5px">로그인 정보(카카오 닉네임), 회원정보(닉네임·학과·학번·휴대폰), 인증 상태, 찜, 작성한 글, 채팅, 매칭 기록이 이 브라우저에서 모두 지워져요. 되돌릴 수 없어요.</p><div class="modal-actions"><button class="btn btn-outline" data-act="close">취소</button><button class="btn btn-primary" data-act="reset-confirm">초기화</button></div></div>`); break;
      case 'reset-confirm': closeModal(); S = defaults(); save(); V.step = 1; location.hash = '#home'; route(); toast('이 기기의 내 데이터를 모두 지웠어요', 'refresh'); break;
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
  document.addEventListener('input', (e) => { if (e.target.id === 'g-search') { searchQ = e.target.value; const box = $('#search-results'); if (box) box.innerHTML = searchResults(searchQ); } });
  document.addEventListener('change', (e) => {
    onFilterInput(e);
    if (e.target.dataset.su === 'pre') { const sid = $('#su-sid'); sid.disabled = e.target.checked; if (e.target.checked) sid.value = ''; }
    if (e.target.dataset.su === 'all') e.target.closest('.agree-box').querySelectorAll('input[name^=a]').forEach((c) => { c.checked = e.target.checked; });
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
      case 'signup': {
        const err = $('#su-err'), edit = !!S.member;
        const nick = String(fd.get('nick') || '').trim(), dept = String(fd.get('dept') || '').trim();
        const pre = !!fd.get('pre'), sid = String(fd.get('sid') || '').replace(/\D/g, ''), phone = String(fd.get('phone') || '').replace(/\D/g, '');
        const yr = +sid.slice(0, 4), thisYear = new Date().getFullYear();
        if (!/^[가-힣a-zA-Z0-9]{2,12}$/.test(nick)) { err.textContent = '닉네임은 2~12자의 한글, 영문, 숫자로 써 주세요 (띄어쓰기·특수문자 없이).'; return; }
        if (nick !== (S.member && S.member.nick) && takenNicks().has(nick)) { err.textContent = '이미 쓰고 있는 닉네임이에요. 다른 닉네임을 골라 주세요.'; return; }
        if (FRAUD.test(nick)) { err.textContent = '닉네임에 연락처·계좌 관련 문구는 쓸 수 없어요.'; return; }
        if (dept.length < 2) { err.textContent = '학과를 입력해 주세요.'; return; }
        if (!pre && !(sid.length >= 8 && sid.length <= 10 && yr >= thisYear - 12 && yr <= thisYear + 1)) { err.textContent = '학번을 확인해 주세요. 입학년도로 시작하는 8~10자리 숫자예요 (예: 2026123456).'; return; }
        if (!/^01[016789]\d{7,8}$/.test(phone)) { err.textContent = '휴대폰 번호를 확인해 주세요 (예: 010-1234-5678).'; return; }
        if (!edit && !(fd.get('a1') && fd.get('a2') && fd.get('a3'))) { err.textContent = '필수 항목 3개에 모두 동의해 주세요.'; return; }
        const ph = phone.replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
        S.member = { nick, dept, sid: pre ? '' : sid, pre, phone: ph, kakaoId: S.login && S.login.kakaoId, at: (S.member && S.member.at) || Date.now() };
        applyMember(); save(); renderChrome(lastNav);
        if (edit) { location.hash = '#my'; toast('회원정보를 저장했어요', 'check'); }
        else { location.hash = '#verify'; toast(`${nick}님, 반가워요! 마지막으로 학생 인증만 하면 돼요`, 'check'); }
        break;
      }
      case 'v-doc': {
        const err = $('#vd-err'), file = f.querySelector('[name=doc]').files[0];
        if (!file) { err.textContent = '학생증 사진이나 서류 파일을 올려 주세요.'; return; }
        if (!fd.get('agree')) { err.textContent = '서류 확인·파기 안내에 동의해 주세요.'; return; }
        S.verifyReq = { method: fd.get('method'), file: file.name, at: Date.now(), status: '검토 중' }; save(); route(); renderChrome(lastNav);
        toast('인증 요청을 보냈어요. 운영자가 확인하면 알려 드릴게요', 'send');
        setTimeout(() => { if (!S.verifyReq || S.verifyReq.status !== '검토 중') return;
          S.verified = true; S.verifyMethod = S.verifyReq.method; S.verifyReq.status = '승인'; save();
          notify(`${methodName(S.verifyMethod)} 확인 완료 · 학생 인증이 승인됐어요`, 'shield', '#verify'); toast('학생 인증이 승인됐어요!', 'shield');
          if (!slot.innerHTML) route(); }, 3000);
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
        S.reports.unshift({ id: 'ur' + Date.now(), target: f.dataset.label, reason: fd.get('reason'), date: new Date().toISOString().slice(0, 10).replace(/-/g, '.') }); save();
        closeModal(); toast(`신고가 접수됐어요. 담당자 ${D.staff.length}명 모두에게 전달했어요`, 'flag'); break;
      }
      case 'cpost': {
        const text = String(fd.get('text') || '').trim(); if (!text) return;
        if (FRAUD.test(text)) { toast('계좌·외부 연락처 관련 문구는 올릴 수 없어요', 'alert'); return; }
        (S.clubPosts[f.dataset.id] = clubPosts(findClub(f.dataset.id))).unshift({ who: D.me.nick, text, when: '방금' }); save(); route(); toast('동아리 게시판에 올렸어요', 'edit'); break;
      }
      case 'em-new': {
        const e = findEvent(f.dataset.id), note = String(fd.get('note') || '').trim();
        if (!note) { $('#emn-err').textContent = '한 줄 소개를 적어 주세요.'; return; }
        if (FRAUD.test(note)) { $('#emn-err').textContent = '계좌·외부 연락처 관련 문구는 올릴 수 없어요.'; return; }
        const pick = D.mates.filter((x) => !S.blocked.includes(x.nick))[4];
        S.myMates.unshift({ id: 'uem' + Date.now(), event: e.id, mine: true, cap: +fd.get('cap'), leader: { nick: D.me.nick, trust: myTrust(), dept: S.survey.dept }, members: [],
          pending: pick ? [{ nick: pick.nick, trust: pick.trust, dept: pick.dept }] : [], meet: fd.get('meet'), when: String(fd.get('when') || '').trim() || '행사 30분 전', note });
        save(); closeModal(); route(); toast('함께 갈 사람을 모집했어요. 데모 신청자 1명이 왔어요', 'users'); break;
      }
      case 'ev-review': {
        const id2 = f.dataset.id, text = String(fd.get('text') || '').trim();
        if (FRAUD.test(text)) { toast('계좌·외부 연락처 관련 문구는 올릴 수 없어요', 'alert'); return; }
        (S.evReviews[id2] = S.evReviews[id2] || []).push({ from: D.me.nick, stars: +fd.get('stars'), text: text || '좋았어요!', tags: fd.getAll('tags'), mine: true });
        save(); route(); { const ev = D.events.find((x) => x.id === id2); offerReview('club', `${ev ? ev.title : '행사'} 다녀온 후기`, +fd.get('stars'), fd.getAll('tags'), '행사 후기를 남겼어요'); } break;
      }
      case 'profile': {
        const interests = fd.getAll('interests');
        if (!interests.length) { $('#pf-err').textContent = '관심 분야를 하나 이상 골라 주세요.'; return; }
        S.profile = { interests, skills: String(fd.get('skills') || '').split(',').map((x) => x.trim()).filter(Boolean).slice(0, 8), time: fd.get('time'), area: fd.get('area') };
        save(); closeModal(); route(); toast('프로필을 저장했어요. 홈 추천이 바뀌었어요', 'sparkle'); break;
      }
      case 'task': {
        const text = String(fd.get('text') || '').trim(); if (!text) return;
        (S.teamTasks[f.dataset.id] = teamTasks(findTeam(f.dataset.id))).push({ id: 'k' + Date.now(), text, who: fd.get('who'), due: fd.get('due') || '', done: false });
        save(); route(); toast('할 일을 추가했어요', 'check'); break;
      }
      case 'tpost': {
        const text = String(fd.get('text') || '').trim(); if (!text) return;
        if (FRAUD.test(text)) { toast('계좌·외부 연락처 관련 문구는 올릴 수 없어요', 'alert'); return; }
        (S.teamPosts[f.dataset.id] = teamPosts(findTeam(f.dataset.id))).unshift({ who: D.me.nick, text, when: '방금' });
        save(); route(); toast('팀 게시판에 올렸어요', 'edit'); break;
      }
      case 'team-finish': {
        S.teamDone[f.dataset.id] = { at: Date.now(), stars: Object.fromEntries([...fd.entries()].filter(([k]) => k.startsWith('r-'))) };
        S.trustBonus += 2; save(); closeModal(); route(); { const t = findTeam(f.dataset.id); offerReview('team', `${t ? t.title : '팀 프로젝트'} 완주 후기`, 5, ['끝까지 완주'], '팀원 평가를 보냈어요 · 완주 기록, 신뢰도 +2'); } break;
      }
      case 'contest-report': {
        const err = $('#cr-err'), title = String(fd.get('title') || '').trim(), host = String(fd.get('host') || '').trim(), url = String(fd.get('url') || '').trim();
        if (!title || !host) { err.textContent = '공모전 이름과 주최 기관을 적어 주세요.'; return; }
        if (!fd.get('deadline') || cday(fd.get('deadline')) < 0) { err.textContent = '접수 마감일을 오늘 이후로 골라 주세요.'; return; }
        if (!/^https:\/\/[^\s]+\.[^\s]+$/.test(url)) { err.textContent = '공식 공지 주소를 https://로 시작하게 적어 주세요.'; return; }
        if (!fd.get('src')) { err.textContent = '공식 공지에서 확인했는지 체크해 주세요.'; return; }
        S.contestReports.unshift({ id: 'cr' + Date.now(), title, host, cat: fd.get('cat'), deadline: fd.get('deadline'), url, memo: String(fd.get('memo') || ''), status: '운영자 검토 중' });
        save(); location.hash = '#my-teams'; toast('제보를 보냈어요. 운영자가 공식 공지를 확인한 뒤 올려요', 'send'); break;
      }
      case 'taxi': {
        const err = $('#tx-err');
        const from = fd.get('from') === '__custom' ? String(fd.get('fromC') || '').trim() : fd.get('from');
        const to = fd.get('to') === '__custom' ? String(fd.get('toC') || '').trim() : fd.get('to');
        if (!from || !to) { err.textContent = '출발과 도착 장소를 입력해 주세요.'; return; }
        if (from === to) { err.textContent = '출발과 도착이 같아요.'; return; }
        const [hh, mm] = String(fd.get('time') || '').split(':').map(Number);
        if (Number.isNaN(hh) || Number.isNaN(mm)) { err.textContent = '출발 시간을 골라 주세요.'; return; }
        const d = new Date(); d.setHours(hh, mm, 0, 0); if (d.getTime() < Date.now()) d.setDate(d.getDate() + 1);
        const departAt = d.getTime(), closeAt = departAt - +fd.get('close') * 60000;
        if (closeAt - Date.now() < 5 * 60000) { err.textContent = '모집 마감까지 5분 이상 남도록 출발 시간을 늦춰 주세요.'; return; }
        const fare = +fd.get('fare'); if (!fare || fare < 1000) { err.textContent = '예상 택시비를 1,000원 이상으로 적어 주세요.'; return; }
        const note = String(fd.get('note') || '').trim();
        if (FRAUD.test(note)) { err.textContent = '계좌번호·외부 메신저·선입금 관련 문구는 올릴 수 없어요.'; return; }
        const g = { id: 'ug' + Date.now(), type: 'taxi', mine: true, from, to, departAt, closeAt, cap: +fd.get('cap'), fare, note,
          leader: { nick: D.me.nick, trust: myTrust(), dept: S.survey.dept, items: [] }, members: [], pending: demoApplicants('taxi') };
        S.myGath.unshift(g); save(); location.hash = '#taxi-' + g.id; toast('택시 동행을 모집했어요. 데모 신청자 2명이 왔어요', 'car'); break;
      }
      case 'delivery': {
        const err = $('#dl-err');
        const shop = String(fd.get('shop') || '').trim(), item = String(fd.get('item') || '').trim(), price = +fd.get('price');
        if (!shop) { err.textContent = '음식점 이름을 적어 주세요.'; return; }
        if (fd.get('min') === '' || fd.get('fee') === '') { err.textContent = '최소 주문 금액과 배달비를 적어 주세요 (없으면 0).'; return; }
        if (!item || !(price > 0)) { err.textContent = '내 메뉴와 가격을 적어 주세요.'; return; }
        const note = String(fd.get('note') || '').trim();
        if (FRAUD.test(shop + note + item)) { err.textContent = '계좌번호·외부 메신저·선입금 관련 문구는 올릴 수 없어요.'; return; }
        const g = { id: 'ug' + Date.now(), type: 'delivery', mine: true, shop, cat: fd.get('cat'), pickup: fd.get('pickup'), closeAt: Date.now() + +fd.get('close') * 60000, departAt: null,
          minOrder: +fd.get('min'), fee: +fd.get('fee'), cap: +fd.get('cap'), note,
          leader: { nick: D.me.nick, trust: myTrust(), dept: S.survey.dept, items: [{ n: item, p: price, q: 1 }] }, members: [], pending: demoApplicants('delivery') };
        S.myGath.unshift(g); save(); location.hash = '#delivery-' + g.id; toast('공동 주문을 모집했어요. 데모 신청자 2명이 왔어요', 'utensils'); break;
      }
      case 'g-menu': {
        const g = findG(f.dataset.id), err = $('#gm-err');
        if (Date.now() >= g.closeAt) { err.textContent = '주문이 마감돼서 바꿀 수 없어요.'; return; }
        const items = [0, 1, 2].map((i) => ({ n: String(fd.get('n' + i) || '').trim(), p: +fd.get('p' + i), q: Math.max(1, +fd.get('q' + i) || 1) })).filter((x) => x.n && x.p > 0);
        if (!items.length) { err.textContent = '메뉴 이름과 가격을 하나 이상 적어 주세요.'; return; }
        S.gm[g.id].items = items; save(); closeModal(); route(); toast(`내 메뉴 ${wonN(itemsSum(items))}을 담았어요`, 'utensils'); break;
      }
      case 'g-settle': {
        const g = findG(f.dataset.id), err = $('#st-err'), ppl = gPeople(g);
        const total = +fd.get('total'), shares = ppl.map((pp, i) => ({ nick: pp.nick, amount: +fd.get('s' + i) || 0 }));
        if (!(total > 0)) { err.textContent = '실제 미터기 요금을 적어 주세요.'; return; }
        const sum = shares.reduce((a, x) => a + x.amount, 0);
        if (sum !== total) { err.textContent = `나눈 금액 합계(${wonN(sum)})가 실제 요금(${wonN(total)})과 달라요. ‘똑같이 나누기’를 눌러 보세요.`; return; }
        S.settle[g.id] = { kind: 'taxi', total, shares, stars: +fd.get('stars'), at: Date.now() };
        if (g.mine) g.done = true; else S.gm[g.id].status = 'done';
        S.trustBonus += 1; save(); closeModal(); route(); offerReview('taxi', `${gTitle(g)} 택시팟 후기`, +fd.get('stars'), ['정산 깔끔'], '정산을 기록했어요 · 신뢰도 +1'); break;
      }
      case 'g-recv': {
        const g = findG(f.dataset.id), ppl = gPeople(g), fs = ceil10(g.fee / ppl.length);
        S.settle[g.id] = { kind: 'delivery', total: orderTotal(g) + g.fee, shares: ppl.map((pp) => ({ nick: pp.nick, amount: itemsSum(pp.items) + fs })), stars: +fd.get('stars'), at: Date.now() };
        if (g.mine) g.done = true; else S.gm[g.id].status = 'done';
        S.trustBonus += 1; save(); closeModal(); route(); offerReview('delivery', `${gTitle(g)} 배달팟 후기`, +fd.get('stars'), ['배달비 절약'], '공동 주문을 완료했어요 · 신뢰도 +1'); break;
      }
      case 'checkin': {
        const m = S.matches[f.dataset.key], err = $('#ci-err');
        const pl = fd.get('place'), date = fd.get('date'), time = String(fd.get('time') || '');
        if (!pl) { err.textContent = '만날 장소를 골라 주세요.'; return; }
        const p = place(pl);
        if (p.off && lowTrust(m)) { err.textContent = `신뢰도 ${TRUST_OFF}점 미만이면 교내 장소만 고를 수 있어요.`; return; }
        if (!date || dday(date) < 0) { err.textContent = '오늘 이후 날짜를 골라 주세요.'; return; }
        if (!/^\d\d:\d\d$/.test(time) || time < '07:00' || time > '22:00') { err.textContent = '오전 7시 ~ 오후 10시 사이로 골라 주세요.'; return; }
        const again = !!m.meet;
        m.meet = { place: pl, date, time }; m.stage = 'plan'; m.checkedAt = nowTime();
        (S.chats[m.key] = S.chats[m.key] || []).push({ t: 'sys', text: `만남 체크인${again ? ' (변경)' : ''}: ${p.name} · ${fmtDate(date)} ${time} · 운영팀에 기록됐어요`, at: nowTime() });
        save(); closeModal(); route();
        toast(`체크인을 기록했어요 · ${p.name} ${time}`, 'pin');
        break;
      }
      case 'm-review': {
        const m = S.matches[f.dataset.key];
        m.stage = 'done'; m.review = { stars: +fd.get('stars'), tags: fd.getAll('tags'), text: String(fd.get('text') || '') };
        S.trustBonus += 2; save(); closeModal(); route();
        offerReview(MATCH_BOARD[m.kind] || 'house', `${m.title} ${m.kind} 후기`, m.review.stars, m.review.tags, `${esc(m.with)}님도 후기를 남겨 서로 공개됐어요 · 신뢰도 +2`); break;
      }
      case 'review': {
        S.reviewed.push(f.dataset.id); S.trustBonus += 2; save(); closeModal(); route();
        { const d = D.deals.find((x) => x.id === f.dataset.id); offerReview('market', `${d ? d.title : '중고'} 거래 후기`, +fd.get('stars'), fd.getAll('tags'), '거래 후기를 보냈어요 · 신뢰도 +2'); } break;
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
        if (FRAUD.test(title + body)) { $('#post-err').textContent = '외부 연락처·계좌·오픈채팅 관련 문구는 후기에 쓸 수 없어요.'; return; }
        const tags = String(fd.get('tags') || '').split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean).slice(0, 3);
        const p = { id: 'up' + Date.now(), board: fd.get('board'), rating: Math.max(1, Math.min(5, +fd.get('rating') || 5)), tags, anon: !!fd.get('anon'), author: fd.get('anon') ? 'anon-me' : D.me.nick, title, body, time: '방금', likes: 0, views: 1, comments: [], mine: true };
        rvDraft = null; S.myPosts.unshift(p); save(); location.hash = '#post-' + p.id; toast('후기를 등록했어요', 'star'); break;
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
        if (!f.querySelector('[name=proof]').files.length) { err.textContent = '계약서 사진을 올려 주세요. 주소·계약 기간·임대인 이름이 보이면 돼요.'; return; }
        if (!fd.get('consent')) { err.textContent = '집주인 동의 여부를 골라 주세요.'; return; }
        if (!fd.get('agree')) { err.textContent = '허위 매물 정책에 동의해 주세요.'; return; }
        if (FRAUD.test(title + desc)) { err.textContent = '허위 매물 필터: 선입금·계좌·외부 메신저 유도 문구가 포함되어 있어요. 해당 문구를 지워 주세요.'; return; }
        const hasProof = f.querySelector('[name=proof]').files.length > 0;
        const r = { id: 'ur' + Date.now(), seed: Math.floor(Math.random() * 8), deal: fd.get('deal'), type: fd.get('type'), title, area: addr.split(' ').slice(1, 3).join(' ') || '대소원면', size: '-', floor: '-',
          deposit, rent, maint: +fd.get('maint') || 0, maintIncl: '작성자 문의', avail: fd.get('avail') || '2027-01-01', months: +fd.get('months') || 12, until: '-', dist: 700, walk: 9,
          gender: fd.get('gender'), smoke: fd.get('smoke'), options: fd.getAll('options'), badges: ['school', 'proof', ...(fd.get('consent') === '받음' ? ['consent'] : [])], consent: fd.get('consent'), status: 'review',
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
          tags: fd.getAll('tags'), created: '방금', views: 1, applicants: 0, desc: String(fd.get('desc') || '').trim() || '소개가 없어요.', mine: true, members: [],
          pending: D.people.slice(0, 3).map((pp, i) => ({ nick: pp.nick, dept: pp.dept, rate: pp.rate || 90, role: positions[i % positions.length].role, time: ['주 6시간', '주 10시간 이상', '주 3시간'][i], intro: pp.intro || '열심히 참여할게요!' })) };
        S.myTeams.unshift(t); save(); newTeamContest = ''; location.hash = '#teams-' + t.id; toast('모집글을 올렸어요. 데모 지원자 3명이 왔어요', 'users'); break;
      }
      case 'team-apply': {
        if (!String(fd.get('intro') || '').trim()) { $('#ta-err').textContent = '한 줄 소개를 적어 주세요. 팀장이 가장 먼저 보는 내용이에요.'; return; }
        const tid = f.dataset.id, role = fd.get('role');
        S.teamApplied[tid] = { role, status: '검토 중', intro: String(fd.get('intro')), time: fd.get('time') }; save(); closeModal(); route();
        toast('지원서를 보냈어요. 팀장이 검토하면 알려 드릴게요 (데모: 잠시 뒤 결과)', 'send');
        setTimeout(() => { const a = S.teamApplied[tid], t = findTeam(tid); if (!a || a.status !== '검토 중' || !t) return;
          const left = t.positions.find((p) => p.role === role); a.status = left && left.need > left.got ? '합류' : '거절'; save();
          notify(a.status === '합류' ? `‘${t.title}’ 팀에 ${role}(으)로 합류했어요 · 팀 공간이 열렸어요` : `‘${t.title}’ 팀 지원 결과: 자리가 먼저 찼어요`, 'users', a.status === '합류' ? `#teamroom-${t.id}` : `#teams-${t.id}`);
          toast(a.status === '합류' ? `${t.leader.nick}님이 승인했어요! 팀 공간이 열렸어요` : '아쉽게도 자리가 먼저 찼어요', a.status === '합류' ? 'users' : 'x');
          if (!slot.innerHTML) route(); }, 2200);
        break;
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
        toast(`${c.name}에 지원했어요. 운영진이 확인하면 알려 드릴게요 (데모: 잠시 뒤 결과)`, 'send');
        setTimeout(() => { if (S.applied[c.id] !== '서류 검토 중') return; S.applied[c.id] = '가입 승인'; save(); notify(`${c.name} 가입이 승인됐어요 · 동아리 공간이 열렸어요`, 'users', `#clubroom-${c.id}`);
          toast(`${c.name} 운영진이 가입을 승인했어요! 동아리 공간이 열렸어요`, 'users'); if (!slot.innerHTML) route(); }, 2400);
        break;
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

  document.addEventListener('change', (e) => {
    if (e.target.matches('select[name=from], select[name=to]')) { const c = e.target.parentElement.querySelector('.custom-spot'); if (c) { c.hidden = e.target.value !== '__custom'; if (!c.hidden) c.focus(); } }
  });
  /* 마감까지 남은 시간: 1초마다 숫자만 바꾸고, 마감되는 순간 화면을 다시 그려 상태(모집 중 → 마감)를 바꿔요 */
  setInterval(() => {
    let flipped = false;
    document.querySelectorAll('[data-until]').forEach((el) => { const t = until(+el.dataset.until); if (t === '마감' && el.textContent !== '마감') flipped = true; el.textContent = t; });
    if (flipped && !slot.innerHTML) route();
  }, 1000);
  window.addEventListener('hashchange', onHash);
  if (!location.hash) history.replaceState(null, '', '#home');
  lastHash = location.hash;
  S.approvedContests.forEach((k) => { if (!D.contests.some((x) => x.id === k.id)) D.contests.unshift(k); });
  syncMatches();
  route();
  if (!S.onboarded) openOnboard();
})();
