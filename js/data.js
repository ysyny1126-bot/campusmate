/* 이음 데모 더미 데이터 — 학교명·인물은 모두 가상입니다. */
window.CM_DATA = (() => {
  /* 학과 목록: 2026학년도 정시 모집단위(충주캠퍼스, 진학어플라이 경쟁률 페이지)에서 가져옴 · 2026-11-17 확인 */
  const school = { name: '국립한국교통대학교', short: '한국교통대', domain: 'ut.ac.kr', // 학생 메일 도메인은 학교 확인 후 수정
    unofficial: '국립한국교통대학교의 공식 서비스가 아닌 학생 팀 프로젝트(데모)예요.',
    // 지도 기준 위치 (예시: 국립한국교통대학교 충주캠퍼스, 충북 충주시 대학로 50). 다른 학교로 바꾸려면 좌표만 수정하세요.
    geo: { lat: 36.9706833, lng: 127.8706892, label: '예시 위치 · 한국교통대 충주캠퍼스' } };

  const safePlaces = [
    { id: 'dorm', name: '생활관(기숙사) 앞', desc: '24시간 CCTV · 경비실 바로 옆', hours: '24시간' },
    { id: 'lib', name: '중앙도서관 1층 로비', desc: '유동 인구 많음 · 출입 게이트 앞', hours: '07:00–23:00' },
    { id: 'union', name: '학생회관 1층', desc: '편의점 앞 테이블 · 학생지원팀 옆', hours: '08:00–22:00' },
    { id: 'gate', name: '정문 버스정류장', desc: '밝은 조명 · 보안초소 근처', hours: '24시간' },
    /* 대학로(캠퍼스 밖) 장소: off = 신뢰도 기준을 넘어야 고를 수 있어요. sample = 실제 위치 확인 전 예시 */
    { id: 'street', name: '대학로 큰길 편의점 앞', desc: '밝은 조명 · 유동 인구 많음', hours: '07:00–22:00', off: true, sample: true },
    { id: 'office', name: '대소원면 행정복지센터 앞', desc: '공공기관 앞 · 큰길가', hours: '09:00–18:00', off: true, sample: true },
  ];

  /* ── 룸메이트 설문 문항 ── */
  const questions = [
    { k: 'sleep', label: '취침 시간', help: '평일 기준으로 보통 몇 시에 잠드나요?', type: 'ord', opts: ['22시 이전', '23시쯤', '자정쯤', '새벽 1시쯤', '새벽 2시 이후'] },
    { k: 'wake', label: '기상 시간', help: '수업이 없는 날 기준으로 골라 주세요.', type: 'ord', opts: ['6시 이전', '7시쯤', '8시쯤', '9시쯤', '10시 이후'] },
    { k: 'smoke', label: '흡연 여부', help: '실내 흡연은 기숙사 규정상 금지예요.', type: 'smoke', opts: ['비흡연', '전자담배', '연초 흡연'] },
    { k: 'drink', label: '음주 빈도', help: '방에서 마시는 것 포함', type: 'ord', opts: ['거의 안 마셔요', '월 1~2회', '주 1회', '주 2회 이상'] },
    { k: 'clean', label: '청결도', help: '방과 공용 공간을 얼마나 자주 정리하나요?', type: 'ord', opts: ['여유로운 편', '가끔 정리', '보통', '자주 정리', '매일 정리'] },
    { k: 'study', label: '방에서 공부하는 시간', help: '시험 기간이 아닌 평소 기준', type: 'ord', opts: ['거의 안 함', '하루 1~2시간', '하루 3~4시간', '하루 5시간 이상'] },
    { k: 'noise', label: '소음 민감도', help: '통화, 키보드, 알람 소리 등에 얼마나 민감한가요?', type: 'ord', opts: ['거의 신경 안 씀', '조금 신경 씀', '보통', '예민한 편', '매우 예민함'] },
    { k: 'temp', label: '냉난방 선호', help: '에어컨·난방 온도 취향', type: 'ord', opts: ['시원하게', '적당히', '따뜻하게'] },
    { k: 'guest', label: '방문객 허용', help: '친구가 방에 놀러 오는 것', type: 'ord', opts: ['방문 불가', '사전 협의 시 가능', '자유롭게 가능'] },
    { k: 'hobby', label: '취미', help: '여러 개 선택할 수 있어요.', type: 'multi', opts: ['운동', '게임', '독서', '음악', '영화·드라마', '요리', '카페 탐방', '여행', '사진', '악기'] },
    { k: 'dept', label: '학과', help: '', type: 'select', opts: ['기계공학과', '자동차공학과', '항공모빌리티학부', '전기공학과', '전자공학과', '컴퓨터공학과', '컴퓨터소프트웨어학과', '영어영문학과', '중국어학과', '한국어문학과', '음악학과', '스포츠의학과', '스포츠산업학과', '행정학과', '행정정보융합학과', '경영학과', '융합경영학과', '국제무역학과', '사회복지학과', '항공운항학과', '항공서비스학과', '유아교육학과', '건설환경도시교통공학부', '화공생물공학과', '반도체신소재공학과', '나노화학소재공학과', '산업경영공학과', '안전공학과', '건축공학과', '건축학과', '산업디자인학과', '커뮤니케이션디자인학과', '나노메디컬공학부', '자유전공학부'] },
    { k: 'grade', label: '학년', help: '', type: 'ord', opts: ['1학년', '2학년', '3학년', '4학년', '대학원'] },
  ];

  const mySurvey = { gender: '여', dorms: [], sleep: 2, wake: 2, smoke: 0, drink: 1, clean: 3, study: 2, noise: 3, temp: 1, guest: 1, hobby: ['운동', '카페 탐방', '영화·드라마'], dept: '경영학과', grade: 1 };
  const myWeights = { sleep: 2, wake: 1, smoke: 2, drink: 1, clean: 2, study: 1, noise: 1, temp: 1, guest: 1, hobby: 0, dept: 0, grade: 0 };

  const w = (o) => Object.assign({ sleep: 1, wake: 1, smoke: 1, drink: 1, clean: 1, study: 1, noise: 1, temp: 1, guest: 1, hobby: 0, dept: 0, grade: 0 }, o);

  /* 충주캠퍼스 생활관(기숙사)
   * 출처: 국립한국교통대학교 충주생활관 홈페이지 ‘충주생활관’ 안내(ut.ac.kr/dorm/sub01_03_01.do), 2026-11-19 확인.
   * 사용료는 학교 표기 ‘2026학년도 2학기 기준’ 한 학기 금액. 정원은 실수×2(2인1실) 기준 */
  const dorms = [
    { id: 'daewon', name: '대원생활관', gender: ['남', '여'], room: '2인1실', style: '오피스텔형', since: '2015년 개관 · 민간투자(BTL)', cap: { 남: 239, 여: 212 }, fee: 1339700, feeNote: '식비 포함 · 공과금 16만 원 별도', meal: true },
    { id: 'jungwon', name: '중원생활관', gender: ['여'], room: '2인1실', style: '오피스텔형', since: '2011년 개관', cap: { 여: 290 }, fee: 1416800, feeNote: '식비·공과금 포함', meal: true },
    { id: 'yeseong', name: '예성생활관', gender: ['남'], room: '2인1실', style: '아파트형', since: '2017년 내부 리모델링', cap: { 남: 264 }, fee: 1154100, feeNote: '식비·공과금 포함', meal: true, notice: '공용화장실 공사로 2026학년도 1학기 정원을 168명으로 줄여 운영했어요' },
    { id: 'gukwon', name: '국원생활관', gender: ['남'], room: '2인1실', style: '복도형', since: '2015년 리모델링', cap: { 남: 325 }, fee: 520800, feeNote: '공과금 포함 · 식당 미운영', meal: false },
  ];
  const dormInfo = {
    url: 'https://www.ut.ac.kr/dorm.do',
    meal: '식비가 포함된 생활관은 월~목 점심·저녁(주 8식)이 의무식이에요.',
    select: '직전 학기 성적 C0 이상 중 성적순 선발(신입생은 입학 성적순). 국가유공자·기초생활수급자 등은 우선 선발. 입사 기간은 1년 단위예요.',
    schedule: [
      { when: '2026.7.27 ~ 8.7', what: '2026학년도 2학기 재학생 모집(지난 일정)' },
      { when: '2026.11.16', what: '2027 충주생활관 선발·운영 FAQ 안내 공지' },
    ],
    roommate: '룸메이트를 서로 지정해 함께 신청할 수 있는지는 충주생활관 공지에서 확인되지 않았어요. 매 학기 모집 공고문을 확인하거나 생활관 행정실(043-841-5902~4)에 문의하세요.',
  };

  const mates = [
    { id: 'm1', nick: '도서관지박령', gender: '여', dept: '컴퓨터공학과', grade: 1, dorm: '중원생활관', term: '2027-1학기', trust: 91, likedMe: true,
      intro: '평일엔 도서관, 주말엔 카페 탐방해요. 방은 잠만 자는 곳이라 조용하게 지내고 싶어요.',
      answers: { sleep: 2, wake: 2, smoke: 0, drink: 1, clean: 3, study: 3, noise: 3, temp: 1, guest: 1, hobby: ['카페 탐방', '영화·드라마', '독서'], dept: '컴퓨터공학과', grade: 1 },
      weights: w({ sleep: 2, noise: 2, clean: 2 }), real: { name: '김서연', insta: '@seoyeon.lib', photoHue: 210 } },
    { id: 'm2', nick: '주말엔본가', gender: '여', dept: '경영학과', grade: 1, dorm: '대원생활관', term: '2027-1학기', trust: 84, likedMe: true,
      intro: '금요일 저녁에 본가 가서 주말엔 방을 거의 비워요. 같은 과면 더 좋아요!',
      answers: { sleep: 2, wake: 3, smoke: 0, drink: 2, clean: 3, study: 1, noise: 2, temp: 0, guest: 1, hobby: ['운동', '여행', '카페 탐방'], dept: '경영학과', grade: 1 },
      weights: w({ smoke: 2, clean: 2 }), real: { name: '이하은', insta: '@haeun_weekend', photoHue: 340 } },
    { id: 'm3', nick: '러닝하는경영인', gender: '여', dept: '경영학과', grade: 3, dorm: '중원생활관', term: '2027-1학기', trust: 95, likedMe: false,
      intro: '아침 러닝 크루 활동 중이에요. 기상이 조금 빠르지만 조용히 나갈게요.',
      answers: { sleep: 1, wake: 1, smoke: 0, drink: 1, clean: 3, study: 2, noise: 2, temp: 0, guest: 1, hobby: ['운동', '여행'], dept: '경영학과', grade: 3 },
      weights: w({ sleep: 2, smoke: 2 }), real: { name: '박지민', insta: '@jimin.run', photoHue: 150 } },
    { id: 'm4', nick: '깔끔한두부', gender: '여', dept: '나노화학소재공학과', grade: 0, dorm: '대원생활관', term: '2027-1학기', trust: 78, likedMe: false,
      intro: '새내기예요! 정리정돈 좋아하고 요리하는 것도 좋아해요.',
      answers: { sleep: 1, wake: 1, smoke: 0, drink: 0, clean: 4, study: 2, noise: 3, temp: 1, guest: 0, hobby: ['독서', '요리'], dept: '나노화학소재공학과', grade: 0 },
      weights: w({ clean: 2, guest: 2 }), real: { name: '최유나', insta: '@tofu_yuna', photoHue: 45 } },
    { id: 'm5', nick: '아침형고양이', gender: '여', dept: '사회복지학과', grade: 2, dorm: '중원생활관', term: '2027-1학기', trust: 88, likedMe: false,
      intro: '실습 때문에 일찍 자고 일찍 일어나요. 밤에 조용한 분이면 좋겠어요.',
      answers: { sleep: 0, wake: 0, smoke: 0, drink: 0, clean: 4, study: 2, noise: 4, temp: 2, guest: 0, hobby: ['운동', '요리'], dept: '사회복지학과', grade: 2 },
      weights: w({ sleep: 2, noise: 2 }), real: { name: '정다은', insta: '@morning_cat', photoHue: 20 } },
    { id: 'm6', nick: '새벽감성러', gender: '여', dept: '커뮤니케이션디자인학과', grade: 2, dorm: '대원생활관', term: '2027-1학기', trust: 63, likedMe: true,
      intro: '과제 때문에 늦게 자는 편이에요. 대신 조명은 스탠드만 쓸게요.',
      answers: { sleep: 4, wake: 4, smoke: 1, drink: 2, clean: 1, study: 1, noise: 1, temp: 1, guest: 2, hobby: ['음악', '사진', '영화·드라마'], dept: '커뮤니케이션디자인학과', grade: 2 },
      weights: w({ guest: 2 }), real: { name: '한소희', insta: '@dawn.design', photoHue: 270 } },
    { id: 'm7', nick: '축구하는공대생', gender: '남', dept: '기계공학과', grade: 1, dorm: '예성생활관', term: '2027-1학기', trust: 86, likedMe: true,
      intro: '주 3회 축구 동아리 해요. 운동 좋아하는 분이면 같이 헬스장도 다녀요.',
      answers: { sleep: 2, wake: 2, smoke: 0, drink: 2, clean: 2, study: 1, noise: 1, temp: 0, guest: 1, hobby: ['운동', '게임'], dept: '기계공학과', grade: 1 },
      weights: w({ smoke: 2 }), real: { name: '오준혁', insta: '@junhyuk_fc', photoHue: 200 } },
    { id: 'm8', nick: '조용한밤샘러', gender: '남', dept: '산업경영공학과', grade: 2, dorm: '국원생활관', term: '2027-1학기', trust: 80, likedMe: false,
      intro: '밤에 공부가 잘 돼서 늦게 자요. 이어폰 필수, 키보드는 무소음 씁니다.',
      answers: { sleep: 3, wake: 3, smoke: 0, drink: 0, clean: 3, study: 3, noise: 3, temp: 1, guest: 0, hobby: ['독서', '게임', '음악'], dept: '산업경영공학과', grade: 2 },
      weights: w({ noise: 2, clean: 2 }), real: { name: '윤태민', insta: '@quiet.math', photoHue: 230 } },
    { id: 'm9', nick: '요리하는자취생', gender: '남', dept: '항공서비스학과', grade: 0, dorm: '대원생활관', term: '2027-1학기', trust: 75, likedMe: false,
      intro: '공용 주방에서 요리 자주 해요. 나눠 먹는 거 좋아해요 🍳',
      answers: { sleep: 2, wake: 1, smoke: 0, drink: 1, clean: 3, study: 1, noise: 2, temp: 1, guest: 1, hobby: ['요리', '여행', '카페 탐방'], dept: '항공서비스학과', grade: 0 },
      weights: w({ clean: 2 }), real: { name: '신동우', insta: '@cook_dongwoo', photoHue: 30 } },
    { id: 'm10', nick: '새내기기숙사', gender: '남', dept: '전자공학과', grade: 0, dorm: '예성생활관', term: '2027-1학기', trust: 70, likedMe: true,
      intro: '처음 기숙사 살아봐요. 규칙 정해서 서로 편하게 지내고 싶습니다.',
      answers: { sleep: 3, wake: 2, smoke: 2, drink: 2, clean: 2, study: 2, noise: 2, temp: 0, guest: 2, hobby: ['게임', '영화·드라마'], dept: '전자공학과', grade: 0 },
      weights: w({}), real: { name: '강민재', insta: '@minjae_new', photoHue: 120 } },
  ];

  /* ── 방 매물 (가격 단위: 만원) ── */
  const author = (nick, trust, deals, dept) => ({ nick, trust, deals, dept });
  const rooms = [
    { id: 'r1', seed: 0, deal: '양도', type: '원룸', title: '정문 도보 5분 풀옵션 원룸 양도 (2월 입주)', area: '대소원면 본리', size: '6평', floor: '3층 / 5층',
      deposit: 300, rent: 36, maint: 5, maintIncl: '수도·인터넷', avail: '2027-02-20', months: 10, until: '2027.12', dist: 380, walk: 5,
      gender: '무관', smoke: '비흡연', options: ['에어컨', '세탁기', '냉장고', '침대', '책상', '인덕션', '와이파이', '엘리베이터'],
      badges: ['school', 'proof', 'id'], x: 352, y: 262, photos: 6, posted: '3시간 전', views: 214, likes: 18,
      author: author('경영21_양도해요', 88, 12, '경영학과 4학년'),
      desc: '졸업 후 취업으로 이사하게 되어 남은 계약 기간을 양도합니다. 남향이라 채광 좋고, 1층에 편의점이 있어요. 집주인분께 양도 동의 받아두었고, 방문 확인 언제든 가능합니다.',
      share: null },
    { id: 'r2', seed: 1, deal: '룸쉐어', type: '투룸', title: '투룸 룸쉐어 할 여학생 구해요 · 방 1개', area: '대소원면 본리', size: '12평 (개인 방 4평)', floor: '2층 / 4층',
      deposit: 100, rent: 25, maint: 4, maintIncl: '인터넷·공용 전기', avail: '2026-12-15', months: 12, until: '2027.12', dist: 650, walk: 9,
      gender: '여성', smoke: '비흡연', options: ['에어컨', '세탁기', '냉장고', '책상', '인덕션', '와이파이'],
      badges: ['school', 'proof'], x: 186, y: 296, photos: 5, posted: '어제', views: 341, likes: 27,
      author: author('복지3_룸메구함', 92, 8, '사회복지학과 3학년'),
      desc: '현재 혼자 투룸에 살고 있어요. 거실·주방 공용, 각자 방은 잠금 가능합니다. 생활비는 반반 정산하고, 청소는 주 1회 번갈아 해요.',
      share: { current: '사회복지학과 3학년 여학생 1명', rules: ['비흡연자만', '밤 12시 이후 조용히', '청소 주 1회 번갈아 하기', '방문객은 사전 협의', '반려동물 불가'] } },
    { id: 'r3', seed: 2, deal: '양도', type: '1.5룸', title: '교환학생 출국으로 1.5룸 단기 양도 (6개월)', area: '대소원면 검단리', size: '8평', floor: '4층 / 6층',
      deposit: 300, rent: 42, maint: 6, maintIncl: '수도·인터넷·TV', avail: '2027-01-05', months: 6, until: '2027.07', dist: 520, walk: 7,
      gender: '무관', smoke: '비흡연', options: ['에어컨', '세탁기', '냉장고', '침대', '책상', '인덕션', '와이파이', '엘리베이터', '주차'],
      badges: ['school', 'proof', 'id'], x: 410, y: 300, photos: 8, posted: '2일 전', views: 502, likes: 41,
      author: author('독일가는심리학도', 90, 5, '행정학과 3학년'),
      desc: '1월 초 출국이라 6개월만 살아 주실 분 찾아요. 가구·가전 그대로 두고 가요. 계약은 집주인과 직접 승계 계약으로 진행합니다.',
      share: null },
    { id: 'r4', seed: 3, deal: '룸쉐어', type: '쓰리룸', title: '쓰리룸 쉐어하우스 남학생 1명 모집', area: '대소원면 만정리', size: '20평 (개인 방 3.5평)', floor: '1층 / 3층',
      deposit: 50, rent: 22, maint: 5, maintIncl: '공과금 전체 N분의 1', avail: '2026-12-01', months: 12, until: '2027.11', dist: 900, walk: 12,
      gender: '남성', smoke: '비흡연', options: ['에어컨', '세탁기', '냉장고', '침대', '책상', '와이파이'],
      badges: ['school'], x: 128, y: 214, photos: 4, posted: '5일 전', views: 188, likes: 9,
      author: author('기계과셰어장', 79, 3, '기계공학과 4학년'),
      desc: '기계과 2명이 살고 있어요. 각자 방 쓰고 거실·화장실 공용입니다. 조용하고 깔끔한 분 환영해요.',
      share: { current: '기계공학과 4학년 남학생 2명', rules: ['비흡연자만', '설거지는 바로 하기', '평일 밤 11시 이후 조용히', '방문객 주 1회 이내'] } },
    { id: 'r5', seed: 4, deal: '양도', type: '원룸', title: '신축 원룸 양도 · 엘리베이터·주차 가능', area: '대소원면 본리', size: '7평', floor: '9층 / 15층',
      deposit: 500, rent: 40, maint: 7, maintIncl: '수도·인터넷·난방 기본', avail: '2027-02-01', months: 14, until: '2028.03', dist: 1100, walk: 14,
      gender: '무관', smoke: '비흡연', options: ['에어컨', '세탁기', '냉장고', '침대', '책상', '인덕션', '와이파이', '엘리베이터', '주차'],
      badges: ['school', 'proof', 'id'], x: 528, y: 108, photos: 9, posted: '6시간 전', views: 129, likes: 14,
      author: author('취준생원룸', 85, 7, '전자공학과 4학년'),
      desc: '작년에 지은 건물이라 깨끗하고 무인택배함이 있어요. 정문까지 걸어서 15분, 자전거로 5분이에요.',
      share: null },
    { id: 'r6', seed: 5, deal: '양도', type: '원룸', title: '후문 원룸 양도 · 반지하 아님 · 채광 좋아요', area: '대소원면 검단리', size: '5평', floor: '2층 / 4층',
      deposit: 200, rent: 33, maint: 4, maintIncl: '수도', avail: '2026-12-20', months: 8, until: '2027.08', dist: 600, walk: 8,
      gender: '무관', smoke: '무관', options: ['에어컨', '냉장고', '침대', '책상', '와이파이'],
      badges: ['school', 'proof'], x: 270, y: 128, photos: 5, posted: '1일 전', views: 276, likes: 22,
      author: author('후문러버', 81, 4, '한국어문학과 3학년'),
      desc: '후문에서 정말 가까워요. 세탁기는 건물 공용(무료)이에요. 집주인분이 건물에 같이 사셔서 관리가 잘 돼요.',
      share: null },
    { id: 'r7', seed: 6, deal: '룸쉐어', type: '투룸', title: '고양이 키우는 집 · 동물 좋아하는 룸메이트 구해요', area: '대소원면 본리', size: '11평 (개인 방 3.5평)', floor: '3층 / 4층',
      deposit: 150, rent: 27, maint: 5, maintIncl: '인터넷·공용 전기', avail: '2027-01-10', months: 12, until: '2027.12', dist: 820, walk: 11,
      gender: '무관', smoke: '비흡연', options: ['에어컨', '세탁기', '냉장고', '책상', '인덕션', '와이파이'],
      badges: ['school', 'id'], x: 470, y: 232, photos: 6, posted: '3일 전', views: 233, likes: 31,
      author: author('냥집사디자이너', 87, 6, '커뮤니케이션디자인학과 4학년'),
      desc: '얌전한 고양이 한 마리(중성화 완료)와 살고 있어요. 알레르기 없는 분만 연락 주세요!',
      share: { current: '커뮤니케이션디자인학과 4학년 1명 + 고양이 1마리', rules: ['비흡연자만', '고양이 알레르기 없는 분', '공용 공간 청소 주 1회', '방문객 사전 협의'] } },
    { id: 'r8', seed: 7, deal: '양도', type: '원룸', title: '겨울방학 단기 양도 (3개월) · 정문 앞', area: '대소원면 본리', size: '5.5평', floor: '5층 / 5층',
      deposit: 100, rent: 30, maint: 5, maintIncl: '수도·인터넷', avail: '2026-12-22', months: 3, until: '2027.03', dist: 260, walk: 4,
      gender: '여성', smoke: '비흡연', options: ['에어컨', '세탁기', '냉장고', '침대', '책상', '와이파이'],
      badges: ['school', 'proof', 'id'], x: 262, y: 252, photos: 4, posted: '30분 전', views: 64, likes: 6,
      author: author('방학엔본가', 93, 15, '경영학과 2학년'),
      desc: '방학 동안 본가에 내려가서 3개월만 단기로 양도해요. 계절학기·인턴 하시는 분께 추천!',
      share: null },
  ];

  /* ── 중고거래 ── */
  const seller = (nick, trust, reviews, dept) => ({ nick, trust, reviews, dept });
  const items = [
    { id: 'i1', cat: '전공책', emoji: '📘', title: '경영통계학 8판 · 필기 거의 없음', price: 12000, cond: '사용감 적음', place: 'lib', time: '12분 전', likes: 9, chats: 3,
      seller: seller('통계가싫어', 92, 23, '경영학과'), desc: '1학기에 한 번 보고 거의 새 책이에요. 형광펜 2~3페이지만 있어요. 중앙도서관 1층에서 바로 거래 가능해요.' },
    { id: 'i2', cat: '전자기기', emoji: '🧊', title: '기숙사용 미니 냉장고 90L', price: 45000, cond: '사용감 있음', place: 'dorm', time: '1시간 전', likes: 21, chats: 7,
      seller: seller('생활관퇴사', 86, 11, '나노화학소재공학과'), desc: '1년 사용했고 소음 거의 없어요. 생활관 앞에서 바로 들고 가실 수 있게 1층까지 내려드려요.' },
    { id: 'i3', cat: '전자기기', emoji: '💻', title: '아이패드 9세대 64GB + 호환 펜슬', price: 280000, cond: '사용감 적음', place: 'union', time: '3시간 전', likes: 34, chats: 12,
      seller: seller('필기는종이로', 89, 17, '한국어문학과'), desc: '배터리 효율 91%, 액정 기스 없어요. 케이스·필름 같이 드려요. 학생회관에서 작동 확인 후 거래해요.' },
    { id: 'i4', cat: '가구', emoji: '🪑', title: '접이식 책상 + 의자 세트', price: 30000, cond: '사용감 있음', place: 'dorm', time: '5시간 전', likes: 6, chats: 2,
      seller: seller('자취정리중', 64, 5, '산업경영공학과'), desc: '자취방 정리하면서 내놔요. 접으면 부피 작아서 혼자 옮기실 수 있어요.' },
    { id: 'i5', cat: '무료 나눔', emoji: '🎁', title: '전기포트 무료 나눔 (졸업 정리)', price: 0, cond: '사용감 있음', place: 'gate', time: '20분 전', likes: 15, chats: 9,
      seller: seller('졸업합니다', 95, 41, '경영학과'), desc: '졸업 정리 중이라 나눔해요. 잘 작동합니다. 정문에서 오늘 저녁 6시 이후 가능해요.' },
    { id: 'i6', cat: '전공책', emoji: '📗', title: '토익 RC·LC 기본서 세트 (풀이 X)', price: 15000, cond: '새 상품급', place: 'lib', time: '어제', likes: 12, chats: 4,
      seller: seller('토익900가자', 83, 8, '행정학과'), desc: '사두고 학원 다니느라 거의 안 봤어요. 문제 안 풀었어요.' },
    { id: 'i7', cat: '생활용품', emoji: '🧺', title: '행거 + 수납박스 3개', price: 10000, cond: '사용감 있음', place: 'dorm', time: '어제', likes: 4, chats: 1,
      seller: seller('미니멀라이프', 80, 6, '사회복지학과'), desc: '기숙사 퇴사하면서 정리해요. 한 번에 가져가시면 좋겠어요.' },
    { id: 'i8', cat: '전자기기', emoji: '🖥️', title: '24인치 FHD 모니터 · HDMI 케이블 포함', price: 60000, cond: '사용감 적음', place: 'union', time: '2일 전', likes: 18, chats: 5,
      seller: seller('듀얼모니터해제', 88, 14, '컴퓨터공학과'), desc: '불량화소 없어요. 박스 있습니다. 학생회관 1층에서 노트북 연결해서 확인 가능해요.' },
    { id: 'i9', cat: '가구', emoji: '📚', title: '원목 3단 책장', price: 20000, cond: '사용감 적음', place: 'gate', time: '3일 전', likes: 7, chats: 2,
      seller: seller('이사갑니다', 74, 3, '기계공학과'), desc: '원목이라 튼튼해요. 정문 앞까지 가져다드릴게요.' },
    { id: 'i10', cat: '무료 나눔', emoji: '🧴', title: '샴푸·세제 새 제품 나눔', price: 0, cond: '새 상품급', place: 'lib', time: '4시간 전', likes: 26, chats: 14,
      seller: seller('대용량의함정', 90, 19, '항공서비스학과'), desc: '대용량 세트 사서 남은 거 나눔해요. 미개봉이에요. 선착순!' },
    { id: 'i11', cat: '생활용품', emoji: '💡', title: '무드등 + 멀티탭 세트', price: 8000, cond: '사용감 적음', place: 'union', time: '4일 전', likes: 5, chats: 1,
      seller: seller('불끄는사람', 82, 9, '전자공학과'), desc: '기숙사에서 쓰기 좋아요. 멀티탭은 개별 스위치 있어요.' },
  ];

  const sellerReviews = [
    { from: '경영22_새내기', stars: 5, text: '약속 시간보다 일찍 나와 계셨어요. 책 상태도 설명 그대로였습니다!', tags: ['시간 약속을 잘 지켜요', '상품 상태가 설명과 같아요'], when: '2주 전' },
    { from: '익명의 구매자', stars: 5, text: '친절하게 작동 확인까지 도와주셨어요.', tags: ['친절해요'], when: '1개월 전' },
    { from: '컴공19', stars: 4, text: '응답이 빨라서 좋았어요.', tags: ['응답이 빨라요'], when: '2개월 전' },
  ];

  /* ── 후기 (예전 커뮤니티 자리) · 활동을 해 본 학생이 남기는 별점 후기 ── */
  const boards = { taxi: '택시팟', delivery: '배달팟', study: '스터디', team: '공모전·팀플', club: '동아리·행사', house: '주거·룸메', market: '중고거래' };
  const posts = [
    { id: 'p21', board: 'taxi', rating: 5, anon: true, author: 'anon-p21', title: '금요일 정문 → 충주공용버스터미널 택시팟 3번째 후기', time: '어제', likes: 28, views: 330, tags: ['시간 약속 잘 지켜요', '정산 깔끔'],
      body: '셋이 타니까 한 명당 커피 한 잔 값이었어요. 도착하고 미터기 금액 사진을 채팅방에 올려서 바로 나눴고, 출발 5분 전에 다들 정문에 와 있었어요.',
      comments: [{ id: 'c21', anon: true, author: 'anon-c21', text: '금요일 오후는 팟이 금방 차더라고요. 마감 전에 들어가세요!', time: '어제', likes: 6 }] },
    { id: 'p25', board: 'taxi', rating: 4, anon: false, author: '충주역통학러', title: '충주역 첫차 시간 맞춰 택시팟 탔어요', time: '2일 전', likes: 15, views: 204, tags: ['새벽 출발', '안전 장소 만남'],
      body: '아침 7시 기차라 혼자 타기 아까웠는데 같이 갈 사람을 금방 찾았어요. 한 분이 3분 늦어서 별 하나 뺐어요. 다음엔 출발 시간을 10분 여유 있게 잡을래요.', comments: [] },
    { id: 'p26', board: 'delivery', rating: 5, anon: true, author: 'anon-p26', title: '생활관 치킨 배달팟 · 배달비 4,000원 → 1,000원', time: '5시간 전', likes: 44, views: 512, tags: ['배달비 절약', '수령 깔끔'],
      body: '최소주문금액 맞추려고 반 마리 더 시킬 뻔했는데 넷이 모여서 해결! 생활관 1층 로비에서 받아서 바로 나눴어요. 정산은 각자 메뉴값 + 배달비 1/4.',
      comments: [{ id: 'c26', anon: true, author: 'anon-c26', text: '야식 배달팟 자주 열렸으면 좋겠어요', time: '3시간 전', likes: 9 }] },
    { id: 'p27', board: 'delivery', rating: 3, anon: true, author: 'anon-p27', title: '마감 직전에 한 명이 빠져서 최소금액이 모자랐어요', time: '3일 전', likes: 11, views: 190, tags: ['취소 아쉬움'],
      body: '결국 남은 사람끼리 사이드 메뉴 하나 더 시켰어요. 그래도 취소 횟수가 쌓이면 이용이 제한된다니 앞으로는 이런 일이 줄 것 같아요.', comments: [] },
    { id: 'p3', board: 'study', rating: 5, anon: false, author: '데이터분석하자', title: '여름방학 SQL·파이썬 스터디 6주 완주 후기', time: '1주 전', likes: 39, views: 640, tags: ['비전공자 환영', '출석률 좋음'],
      body: '매주 화·목 저녁 중앙도서관 그룹스터디룸에서 했어요. 첫날 각자 목표를 적고 매주 한 명씩 발표했더니 6주 동안 한 명도 안 빠졌어요.\n마지막 주엔 공공데이터로 미니 프로젝트까지 만들었어요. 겨울방학에도 또 열 생각이에요!',
      comments: [{ id: 'c6', anon: false, author: '경영21_양도해요', text: '겨울 스터디 열리면 꼭 알려 주세요!', time: '6일 전', likes: 2 }] },
    { id: 'p28', board: 'study', rating: 4, anon: true, author: 'anon-p28', title: '전공 기말 대비 스터디 · 족보 없이도 할 만했어요', time: '4일 전', likes: 22, views: 301, tags: ['시험 대비', '역할 분담'],
      body: '단원을 나눠서 각자 요약본을 만들고 서로 문제를 내 줬어요. 시간이 조금 부족해서 마지막 단원은 대충 넘어간 게 아쉬워요.', comments: [] },
    { id: 'p22', board: 'team', rating: 5, anon: false, author: '데이터분석하자', title: '공공데이터 공모전 팀 꾸려서 본선까지 간 이야기', time: '2일 전', likes: 56, views: 801, tags: ['역할 분담 확실', '팀룸 활용'],
      body: '팀원 모집 글에 역할을 자세히 적은 게 컸어요. 첫 회의에서 팀룸에 할 일 목록을 같이 만들고 매주 체크했더니 아무도 빠지지 않았어요.',
      comments: [{ id: 'c22', anon: true, author: 'anon-c22', text: '모집 글에 역할 적는 거 진짜 중요하더라고요', time: '2일 전', likes: 4 }] },
    { id: 'p23', board: 'club', rating: 5, anon: true, author: 'anon-p23', title: '복학생인데 동아리 들어가도 될까 고민했던 사람', time: '3일 전', likes: 73, views: 1102, tags: ['복학생 많음', '분위기 좋음'],
      body: '박람회 때 ‘함께 갈 사람 모집’으로 만난 분이랑 같이 부스를 돌았는데, 생각보다 복학생이 많아요. 걱정 말고 지원해 보세요.', comments: [] },
    { id: 'p29', board: 'club', rating: 4, anon: false, author: '국원생활관3년차', title: '가을 축제 부스 운영 후기 · 신입생도 금방 친해져요', time: '1주 전', likes: 31, views: 455, tags: ['신입생 추천', '행사 많음'],
      body: '동아리 들어간 지 한 달 만에 축제 부스를 같이 했는데 그때 확 친해졌어요. 준비 기간에 저녁 늦게까지 남아야 하는 날이 있어서 별 하나 뺐어요.', comments: [] },
    { id: 'p20', board: 'house', rating: 5, anon: true, author: 'anon-p20', title: '대소원면 원룸 양도받은 후기 · 계약 전에 이것만은 꼭', time: '3시간 전', likes: 41, views: 612, tags: ['집주인 동의 확인', '시세보다 저렴'],
      body: '이음에서 양도 글 보고 직접 방 보러 갔어요. 집주인 동의 배지가 있어서 안심했는데, 그래도 등기부등본은 따로 떼어 봤어요.\n보증금은 계약서 쓴 뒤에 집주인에게 직접 보냈고요. 실거래 시세보다 2만 원 싸게 들어갔어요!',
      comments: [{ id: 'c4', anon: false, author: '부동산학원생', text: '등기부등본 확인하신 거 잘하셨어요. 전입신고+확정일자도 꼭!', time: '2시간 전', likes: 12 }] },
    { id: 'p1', board: 'house', rating: 4, anon: true, author: 'anon-p1', title: '생활관 룸메 매칭으로 만난 룸메 한 학기 후기', time: '1일 전', likes: 87, views: 1204, tags: ['생활 패턴 비슷', '소음 조심'],
      body: '설문에서 취침 시간이랑 청소 주기를 ‘매우 중요’로 했더니 정말 비슷한 사람이 됐어요.\n다만 알람 소리는 서로 달라서 진동 알람으로 바꿨어요. 매칭 점수 87%였는데 체감도 그 정도!',
      comments: [{ id: 'c1', anon: true, author: 'anon-c1', text: '진동 알람 진짜 인정합니다… 룸메랑 싸울 일이 사라졌어요', time: '20시간 전', likes: 12 }] },
    { id: 'p30', board: 'market', rating: 5, anon: false, author: '학생회관지킴이', title: '전공책 중고거래 · 학생회관 앞에서 5분 만에 끝', time: '4시간 전', likes: 18, views: 260, tags: ['안전 장소 거래', '설명과 같음'],
      body: '사진이랑 설명이 정확해서 따로 확인할 게 없었어요. 학생회관 앞 안전 거래 장소에서 만나서 책 상태 보고 바로 거래했어요. 선입금 요구 없어서 좋았어요.', comments: [] },
  ];

  /* ── 마이페이지 ── */
  const me = { nick: '교통대새내기', dept: '경영학과', grade: '2학년', joined: '2025년 3월', baseTrust: 72 };
  const myListings = [
    { kind: 'item', id: 'i11', status: '판매 완료' },
  ];
  const deals = [
    { id: 'd1', role: '구매', title: '경영학원론 13판', price: 9000, with: '책정리중', place: '중앙도서관 1층 로비', date: '2026.11.07', reviewed: false },
    { id: 'd2', role: '판매', title: '무드등 + 멀티탭 세트', price: 8000, with: '불끄는사람', place: '학생회관 1층', date: '2026.11.02', reviewed: true },
    { id: 'd3', role: '나눔 받음', title: '수납박스 2개', price: 0, with: '미니멀라이프', place: '생활관(기숙사) 앞', date: '2026.10.21', reviewed: true },
  ];
  const myReviews = [
    { from: '불끄는사람', stars: 5, text: '설명대로 상태 좋았고 친절하셨어요!', tags: ['친절해요', '상품 상태가 설명과 같아요'], when: '2026.11.02' },
    { from: '미니멀라이프', stars: 5, text: '시간 맞춰 와주셔서 감사해요 :)', tags: ['시간 약속을 잘 지켜요'], when: '2026.10.21' },
  ];
  const pastReports = [
    { target: '중고거래 · “에어팟 맥스 미개봉 5만원”', reason: '사기 의심 (시세 대비 과도하게 낮은 가격)', date: '2026.10.14', status: '조치 완료 · 게시글 삭제' },
  ];

  /* ── 동아리 · 행사 (신입생·복학생 대상) ── */
  const clubCats = ['운동', '학술·IT', '문화예술', '봉사', '취미·친목'];
  const rc = (status, until, seats, title, question, steps) => ({ status, until, seats, title, question, steps });
  const clubs = [
    { id: 'c1', name: '런앤런', cat: '운동', emoji: '🏃', color: '#FFD9A8', members: 64, official: true, tags: ['운동'], welcome: ['신입생', '복학생'],
      intro: '주 2회 캠퍼스 야간 러닝, 처음 뛰는 사람도 5km 완주까지 함께해요.', day: '화·목 21:00', fee: '학기 2만원', room: '학생회관 B103',
      desc: '페이스별로 3개 조(입문·중급·마라톤)로 나눠 뛰어요. 입문 조는 걷뛰부터 시작하니 운동을 안 해봤어도 괜찮아요.\n학기마다 한 번 하프 마라톤에 단체로 나가고, 러닝 후엔 학생회관 앞에서 스트레칭하고 해산해요. 뒤풀이는 자율이에요.',
      activities: ['정기 러닝', '하프 마라톤 단체 참가', '러닝화 공동구매', '신입 입문 4주 코스'],
      recruit: rc('open', '2026-11-30', 15, '겨울 · 2027-1학기 신입 부원 사전 모집', '러닝 경험이 있다면 알려 주세요 (없어도 괜찮아요)', ['지원서 제출', '체험 러닝 1회 참여', '최종 안내 채팅']),
      qna: [{ q: '운동을 전혀 안 해봤는데 따라갈 수 있을까요?', a: '입문 조는 1km 걷뛰부터 시작해요. 4주 뒤면 대부분 5km를 뛰어요!' }, { q: '복학생인데 나이 많아도 괜찮나요?', a: '현재 부원 중 복학생이 12명이에요. 전혀 문제없어요 :)' }] },
    { id: 'c2', name: '코드온', cat: '학술·IT', emoji: '💻', color: '#C9DAFF', members: 48, official: true, tags: ['게임'], welcome: ['신입생', '복학생'],
      intro: '비전공자도 환영하는 개발 동아리. 한 학기에 서비스 하나를 같이 만들어요.', day: '수 19:00', fee: '없음', room: '공학관 402호',
      desc: '웹·앱 개발 스터디와 팀 프로젝트를 해요. 1학기엔 기초 스터디, 2학기엔 4~5명이 팀을 꾸려 실제 서비스를 출시해요.\n복학생분들을 위한 최신 개발 트렌드 따라잡기 세션도 따로 열어요.',
      activities: ['파이썬·웹 기초 스터디', '팀 프로젝트', '교내 해커톤', '현직자 멘토링'],
      recruit: rc('open', '2026-11-20', 20, '2027-1학기 신입 부원 모집', '만들어 보고 싶은 서비스가 있다면 적어 주세요', ['지원서 제출', '간단한 온라인 인터뷰 (10분)', '합격 안내']),
      qna: [{ q: '코딩을 한 번도 안 해봤어요.', a: '부원 절반이 비전공자예요. 기초 스터디부터 시작하니 걱정 마세요.' }] },
    { id: 'c3', name: '빛담', cat: '문화예술', emoji: '📷', color: '#F7C6E9', members: 37, official: true, tags: ['사진', '여행'], welcome: ['신입생'],
      intro: '필름·디지털 상관없이 사진 찍으러 다니는 동아리. 학기 말엔 전시회를 열어요.', day: '격주 토 13:00', fee: '학기 3만원 (암실 이용 포함)', room: '예술관 지하 암실',
      desc: '격주 토요일마다 출사를 나가고, 한 달에 한 번 사진 합평회를 해요. 학교 암실에서 필름 현상하는 법도 알려 드려요.\n카메라가 없어도 동아리 공용 카메라를 빌려 쓸 수 있어요.',
      activities: ['정기 출사', '필름 현상 워크숍', '학기 말 사진전', '공용 카메라 대여'],
      recruit: rc('always', '', 0, '상시 모집', '좋아하는 사진이나 찍고 싶은 장면이 있나요?', ['지원서 제출', '정기 출사 1회 참여']),
      qna: [{ q: '휴대폰 카메라로만 찍어도 되나요?', a: '그럼요! 폰카 부원도 많아요.' }] },
    { id: 'c4', name: '소리울', cat: '문화예술', emoji: '🎸', color: '#D8CCFF', members: 29, official: true, tags: ['음악', '악기'], welcome: ['신입생', '복학생'],
      intro: '20년 된 중앙 밴드 동아리. 보컬·기타·베이스·드럼·키보드 세션을 모집해요.', day: '월·금 18:30', fee: '학기 5만원 (합주실 대관 포함)', room: '학생회관 B201 합주실',
      desc: '학기마다 정기 공연 한 번, 축제 무대 한 번에 서요. 세션별 선배가 1:1로 연습을 봐줘요.\n악기를 처음 잡아도 괜찮지만 주 2회 연습에는 꼭 나와 주세요.',
      activities: ['정기 공연', '축제 무대', '세션별 1:1 레슨', '버스킹'],
      recruit: rc('open', '2026-11-25', 8, '세션별 신입 단원 모집 (오디션 없음)', '희망 세션과 다뤄 본 악기를 알려 주세요', ['지원서 제출', '합주실 견학', '세션 배정']),
      qna: [{ q: '오디션이 정말 없나요?', a: '네, 이번 모집은 오디션 없이 견학 후 세션만 정해요.' }] },
    { id: 'c5', name: '책방지기', cat: '취미·친목', emoji: '📚', color: '#C4EFD9', members: 22, official: false, tags: ['독서', '카페 탐방'], welcome: ['신입생', '복학생'],
      intro: '한 달에 한 권, 학교 앞 카페에서 느슨하게 이야기 나누는 독서 모임.', day: '매월 둘째 주 목 19:30', fee: '없음 (음료 각자)', room: '정문 앞 카페',
      desc: '책은 투표로 정하고, 다 못 읽어도 와도 돼요. 조용히 이야기 나누는 걸 좋아하는 분들이 많아요.',
      activities: ['월간 독서 모임', '작가 북토크 단체 관람', '책 교환의 날'],
      recruit: rc('always', '', 0, '상시 모집', '최근 재밌게 읽은 책이 있나요?', ['지원서 제출', '다음 모임 참여']),
      qna: [] },
    { id: 'c6', name: '씨네마루', cat: '문화예술', emoji: '🎬', color: '#FFE7A3', members: 41, official: true, tags: ['영화·드라마'], welcome: ['신입생'],
      intro: '매주 영화 한 편 보고 수다 떠는 영화 감상 동아리. 단편영화도 직접 찍어요.', day: '목 18:00', fee: '학기 1만원', room: '인문관 B104 시청각실',
      desc: '매주 목요일 시청각실에서 영화를 함께 보고 이야기를 나눠요. 겨울방학엔 팀을 꾸려 5분짜리 단편영화를 찍어요.',
      activities: ['주간 상영회', '단편영화 제작', '영화제 단체 관람'],
      recruit: rc('closed', '', 0, '2026-2학기 모집 마감', '좋아하는 영화를 알려 주세요', ['다음 모집: 2027년 3월']),
      qna: [{ q: '다음 모집은 언제인가요?', a: '2027년 3월 동아리 박람회 때 모집해요. 관심 동아리로 등록하면 알림을 드려요.' }] },
    { id: 'c7', name: '온기', cat: '봉사', emoji: '🤝', color: '#FFD0C4', members: 53, official: true, tags: ['요리'], welcome: ['신입생', '복학생'],
      intro: '지역 어르신 도시락 나눔과 연탄 봉사를 하는 봉사 동아리. 봉사 시간이 인정돼요.', day: '토 10:00 (월 2회)', fee: '없음', room: '학생회관 B110',
      desc: '대소원면 행정복지센터와 함께 한 달에 두 번 도시락을 만들어 배달하고, 겨울엔 연탄 나눔을 해요. 1365 봉사 시간이 인정돼요.',
      activities: ['도시락 나눔', '연탄 봉사', '교내 헌혈 캠페인'],
      recruit: rc('open', '2026-12-05', 25, '겨울 연탄 봉사 단원 모집', '봉사 경험이 있다면 알려 주세요 (없어도 괜찮아요)', ['지원서 제출', '오리엔테이션 참석']),
      qna: [{ q: '한 번만 참여해도 되나요?', a: '단기 봉사자도 환영해요! 연탄 나눔 날만 오셔도 돼요.' }] },
    { id: 'c8', name: '슬램', cat: '운동', emoji: '🏀', color: '#FFC9A3', members: 34, official: true, tags: ['운동'], welcome: ['신입생'],
      intro: '중앙 농구 동아리. 실력 상관없이 주 2회 체육관에서 픽업 게임을 해요.', day: '월·수 20:00', fee: '학기 3만원', room: '체육관 2층',
      desc: '교내 리그와 타 대학 교류전에 나가요. 초보자는 기본기 훈련부터 같이 해요.',
      activities: ['픽업 게임', '교내 리그', '타 대학 교류전'],
      recruit: rc('open', '2026-11-28', 10, '신입 부원 모집', '농구 경험과 희망 포지션을 알려 주세요', ['지원서 제출', '체육관 체험']),
      qna: [] },
    { id: 'c9', name: '한입', cat: '취미·친목', emoji: '🍜', color: '#FFE2B8', members: 58, official: false, tags: ['카페 탐방', '요리', '여행'], welcome: ['신입생', '복학생'],
      intro: '학교 근처 맛집·카페를 같이 탐방하고 지도로 남기는 친목 동아리.', day: '자율 (번개 모임)', fee: '없음 (각자 계산)', room: '온라인',
      desc: '매주 번개로 3~5명씩 맛집을 다녀오고, 후기를 모아 교통대 맛집 지도를 만들어요. 혼밥이 어색한 신입생·복학생에게 특히 인기예요.',
      activities: ['맛집 번개', '교통대 맛집 지도 제작', '학기 말 포틀럭'],
      recruit: rc('always', '', 0, '상시 모집', '좋아하는 음식이나 가보고 싶은 가게가 있나요?', ['지원서 제출', '단톡 대신 앱 채팅방 초대']),
      qna: [{ q: '술 모임도 있나요?', a: '술은 자율이고 강요하지 않아요. 카페·디저트 모임이 더 많아요.' }] },
    { id: 'c10', name: '리턴즈', cat: '취미·친목', emoji: '🔄', color: '#BFE3FF', members: 46, official: true, tags: ['카페 탐방', '독서'], welcome: ['복학생'],
      intro: '군 전역·휴학 후 돌아온 복학생끼리 수강신청·학사정보를 나누는 모임.', day: '격주 화 18:30', fee: '없음', room: '중앙도서관 그룹스터디룸 3',
      desc: '바뀐 졸업요건, 수강신청 꿀팁, 장학금 정보를 정리해서 공유해요. 시험 기간엔 같이 공부하는 모각공도 열어요.\n복학 첫 학기라 아는 사람이 없어 막막한 분들께 추천해요.',
      activities: ['복학 학사정보 브리핑', '수강신청 함께하기', '모각공(모여서 각자 공부)', '취업 스터디 연결'],
      recruit: rc('always', '', 0, '복학생 상시 모집', '복학 시기와 학과를 알려 주세요', ['지원서 제출', '다음 정기 모임 참여']),
      qna: [{ q: '휴학만 했어도 들어갈 수 있나요?', a: '네! 군 휴학·일반 휴학 상관없이 1년 이상 쉬었다 오신 분이면 누구나요.' }] },
  ];

  const events = [
    { id: 'e0', date: '2026-11-05', time: '12:00–17:00', title: '가을 플리마켓 · 자취템 나눔 장터', type: '장터', place: '학생회관 앞 광장', host: '총학생회', club: null, for: ['신입생', '복학생'], going: 340 },
    { id: 'e1', date: '2026-11-10', time: '17:00–20:00', title: '겨울 동아리 박람회', type: '박람회', place: '학생회관 앞 광장', host: '총동아리연합회', club: null, for: ['신입생', '복학생'], going: 212 },
    { id: 'e2', date: '2026-11-11', time: '18:30–20:00', title: '복학생 학교 적응 세미나 · 바뀐 졸업요건 한눈에', type: '설명회', place: '중앙도서관 세미나실', host: '리턴즈 × 학생지원팀', club: 'c10', for: ['복학생'], going: 87 },
    { id: 'e3', date: '2026-11-12', time: '19:00–21:00', title: '소리울 겨울 정기 공연', type: '공연', place: '대강당', host: '소리울', club: 'c4', for: ['신입생', '복학생'], going: 156 },
    { id: 'e4', date: '2026-11-12', time: '21:00–22:00', title: '런앤런 입문 러닝 체험 (3km)', type: '체험', place: '정문 집결', host: '런앤런', club: 'c1', for: ['신입생', '복학생'], going: 34 },
    { id: 'e5', date: '2026-11-14', time: '15:00–17:00', title: '슬램 vs 공대 농구 정기전', type: '경기', place: '체육관 1층', host: '슬램', club: 'c8', for: ['신입생'], going: 98 },
    { id: 'e6', date: '2026-11-14', time: '13:00–17:00', title: '빛담 가을 출사 · 필름카메라 체험', type: '체험', place: '정문 버스정류장 집결', host: '빛담', club: 'c3', for: ['신입생'], going: 22 },
    { id: 'e7', date: '2026-11-17', time: '14:00–16:00', title: '2027 예비 신입생 캠퍼스 투어', type: '투어', place: '본관 앞', host: '총학생회', club: null, for: ['신입생'], going: 143 },
    { id: 'e8', date: '2026-11-18', time: '19:00–20:30', title: '코드온 겨울 해커톤 설명회', type: '설명회', place: '공학관 402호', host: '코드온', club: 'c2', for: ['신입생', '복학생'], going: 61 },
    { id: 'e9', date: '2026-11-21', time: '10:00–13:00', title: '온기 연탄 나눔 봉사', type: '봉사', place: '대소원면 행정복지센터', host: '온기', club: 'c7', for: ['신입생', '복학생'], going: 47 },
    { id: 'e10', date: '2026-11-24', time: '19:00–21:00', title: '기말 대비 모각공의 밤', type: '체험', place: '중앙도서관 그룹스터디룸', host: '리턴즈', club: 'c10', for: ['복학생'], going: 39 },
  ];

  /* ── 프로젝트 · 공모전: 실제로 열린 대학생 참가 가능 공모전 (2026-11-17 공식 공고·공모전 사이트에서 확인) ──
   * 요약과 원문 링크만 담아요. 지원 전에는 반드시 주최 측 공식 공고를 다시 확인하세요.
   * 마감이 지나면 목록의 '최근 마감'으로 내려가요. 발표 전에 새 공모전으로 갱신이 필요해요. */
  const contestCats = ['기획·아이디어', '디자인', 'IT·SW', '영상', '마케팅', '창업', '학술·논문'];
  const contests = [
    { id: 'kr1', title: '공학의 가치 숏폼 콘테스트', host: '한국공학한림원', org: '후원 해동과학문화재단', cat: '영상', emoji: '🎬', color: '#FFD9A8',
      start: null, deadline: '2026-11-20', prize: '총 1,600만원', top: '대상 1,000만원', team: '공식 공고 확인', target: '만 19세 이상 국내 대학(원) 재학생·휴학생', scraps: 0, views: 0, campus: false,
      benefits: ['수상작 상금 (제세공과금 제외 후 12월 지급)', '12월 9일 본선 진출작 발표'],
      desc: '공학이 일상과 사회에 가져온 변화를 60초 이내 세로형 숏폼으로 표현해요.\n유튜브 쇼츠에 필수 해시태그(#공학의가치숏폼2026)를 달아 공개 업로드하고, 온라인 접수폼도 함께 내야 해요. 두 절차 모두 11월 20일(금) 18시까지예요.',
      url: 'https://linkareer.com/activity/359744', real: true },
    { id: 'kr2', title: '2026 사회보장 데이터를 활용한 AI 혁신 아이디어 경진대회', host: '한국사회보장정보원 · 대구가톨릭대학교', org: '후원 보건복지부', cat: 'IT·SW', emoji: '🤖', color: '#DCE6FF',
      start: null, deadline: '2026-11-20', prize: '총 2,300만원', top: '대상 500만원 (보건복지부 장관상)', team: '개인 또는 팀 (1건)', target: '대한민국 국민 누구나', scraps: 0, views: 0, campus: false,
      benefits: ['서류 심사로 16팀 선정 후 발표 심사', '12월 10일 시상식 예정'],
      desc: '사회보장 정보와 공공·민간 빅데이터를 AI와 결합해 복지 분야 문제를 해결하는 아이디어를 내요.\n분야: 서비스 혁신 · 복지행정·민원 개선 · 연구 아이디어 · 기타 사회보장 혁신 아이디어.',
      url: 'https://www.ssis.or.kr/lay1/bbs/S1T1910C1976/B/101/view.do?article_seq=130235', real: true },
    { id: 'kr3', title: '2026 국세청 근로·자녀장려금 숏폼 영상 공모전', host: '국세청', org: '운영 스펙토리', cat: '영상', emoji: '📱', color: '#D6F5EA',
      start: '2026-10-21', deadline: '2026-11-23', prize: '총 800만원', top: '대상 300만원', team: '개인 또는 4인 이하 팀', target: '대한민국 국민 누구나', scraps: 0, views: 0, campus: false,
      benefits: ['대상 1편 300만원 · 최우수 1편 200만원 · 우수 3편 각 100만원', '결과 발표 2026년 12월 예정'],
      desc: '근로·자녀장려금을 주제로 한 숏폼 영상이에요. 11월 23일(월) 18시 마감.\n주제는 세 가지 중 하나: 2027년부터 바뀌는 근로장려금 제도 · 장려금으로 달라진 생활 경험 · 자유 주제(챌린지·패러디·징글 등).',
      url: 'https://ntseitc.spectory.net/shorts/contest?bno=61388', real: true },
    { id: 'kr4', title: '2026 대학생 정책 아이디어 공모전', host: '(사)한국정책분석평가학회', org: '한국정책분석평가학회', cat: '기획·아이디어', emoji: '💡', color: '#FFE08A',
      start: '2026-10-21', deadline: '2026-11-26', prize: '시상규모 100만원', top: '상장 수여', team: '공식 공고 확인', target: '전국 대학교 대학생', scraps: 0, views: 0, campus: false,
      benefits: ['수상작 12월 동계학술대회 시상 예정', '상장 수여'],
      desc: '내가 발견한 공공정책 문제와 구체적인 해결책을 1분 이내 숏폼 영상으로 담아요. 제작 과정에서 AI 도구를 써도 돼요.\n제출은 이메일로 해요. 11월 26일(목) 23:59 마감.',
      url: 'https://linkareer.com/activity/358719', real: true },
    { id: 'kr5', title: '2026 내가 소개하는 서울 숏폼 공모전', host: '서울특별시', org: '서울특별시 홍보담당관', cat: '마케팅', emoji: '🏙️', color: '#FBE1F6',
      start: '2026-11-09', deadline: '2026-11-27', prize: '총 1,000만원 (11팀)', top: '공식 공고 확인', team: '개인 또는 팀', target: '국내 거주 내·외국인 누구나', scraps: 0, views: 0, campus: false,
      benefits: ['수상 11팀(명)'],
      desc: '외국인 친구나 다른 지역 친구에게 소개하고 싶은 서울 정책(한강버스, 지하철, 동행 안심벨 등)을 숏폼으로 소개해요. 11월 27일(금) 17시 마감.',
      url: 'https://mediahub.seoul.go.kr/gongmo/2000791', real: true },
    { id: 'kr6', title: '서울특별시 행정서식, 뚝딱뚝딱! 개선 아이디어 공모전', host: '서울특별시', org: '서울특별시', cat: '기획·아이디어', emoji: '📝', color: '#E4DEFF',
      start: '2026-10-13', deadline: '2026-11-20', prize: '우수상 10명 각 50만원', top: '우수상 50만원', team: '개인만 (팀 응모 불가)', target: '행정서식을 써 본 국민 누구나', scraps: 0, views: 0, campus: false,
      benefits: ['결과 발표 2027년 1월 예정', '1인 최대 1개 상'],
      desc: '행정서식을 더 쉽게 바꾸는 아이디어를 내요. 분야: 서식 간소화 · 쉬운 우리말 서식 · 온라인·전자화 등 활용 방식 개선 · 기타.\n이메일 제출, 11월 20일(금) 23:59 마감.',
      url: 'https://mediahub.seoul.go.kr/gongmo/2000785', real: true },
    /* 최근 마감 (참고용) */
    { id: 'kc1', title: '2026 AI활용 전국 대학생 창업 해커톤 대회', host: '교육부 · 한국교육학술정보원(KERIS)', org: '교육부 · KERIS', cat: '창업', emoji: '🚀', color: '#FFEBCF',
      start: '2026-10-27', deadline: '2026-11-11', prize: '총 1,500만원', top: '대상 500만원', team: '팀 2~4인', target: '전국 대학교 재학생', scraps: 0, views: 0, campus: false,
      benefits: ['최우수 300만원 · 우수 2팀 각 200만원 · 특별상 3팀 각 100만원'],
      desc: 'AI(에듀테크)를 활용해 지역 문제를 푸는 창업 아이디어와 시제품을 만들어요. 분야: 교육 · 관광·교통 · 돌봄 · 동네 상권 · 재난·안전·환경.',
      url: 'https://www.contestkorea.com/sub/view.php?int_gbn=1&Txt_bcode=031410001&str_no=202610290007', real: true },
    { id: 'kc2', title: '현대자동차그룹 차량용 앱 개발 공모전', host: '현대자동차그룹', org: '현대자동차그룹', cat: 'IT·SW', emoji: '🚗', color: '#DCE6FF',
      start: '2026-10-21', deadline: '2026-11-15', prize: '총상금 5,100만원', top: '대학생 부문 대상 1,000만원', team: '개인 또는 최대 5명 팀', target: '공식 공고 확인', scraps: 0, views: 0, campus: false,
      benefits: ['1차 서류 결과 11월 23일 · 최종 PT 12월 3~4일 예정'],
      desc: '차량용 앱 아이디어·개발 공모전이에요. 접수는 11월 15일에 끝났어요.',
      url: 'https://linkareer.com/activity/358198', real: true },
    { id: 'kc3', title: '2026년 청년정책 공모전', host: '국무조정실 청년정책조정실', org: '국무조정실', cat: '기획·아이디어', emoji: '🏛️', color: '#D6F5EA',
      start: '2026-10-07', deadline: '2026-10-30', prize: '대상 100만원 외', top: '대상 100만원 + 국무조정실장상', team: '개인 또는 최대 3인 팀', target: '19~34세 청년 누구나', scraps: 0, views: 0, campus: false,
      benefits: ['최우수 50만원 · 우수 3팀 각 30만원 · 장려 5팀 각 10만원'],
      desc: '일자리 · 주거 · 교육 · 생활·복지·문화 · 참여·권리 중 한 분야의 청년 정책을 제안해요.',
      url: 'https://thinkyou.co.kr/contest/67488/', real: true },
  ];

  const P = (role, need, got) => ({ role, need, got });
  const leader = (nick, dept, trust, done, rate) => ({ nick, dept, trust, done, rate });
  const teams = [
    { id: 't1', kind: '공모전', contest: 'kr2', title: '사회보장 데이터 AI 경진대회 · 디자이너·프론트 개발자 구해요', leader: leader('데이터분석하자', '컴퓨터공학과 3학년', 90, 5, 100),
      positions: [P('기획', 1, 1), P('디자인', 1, 0), P('프론트엔드', 2, 1), P('백엔드', 1, 1)], mode: '혼합 · 주 1회 오프라인', period: '11월 ~ 1월 (10주)', meet: '매주 수 19:00 · 중앙도서관', tools: ['Figma', 'React', 'Spring'], deadline: '2026-11-20',
      tags: ['비전공자 가능', '포트폴리오용'], created: '2시간 전', views: 214, applicants: 6,
      desc: '복지 서비스 신청 과정을 AI가 쉽게 안내하는 아이디어를 준비해요. 화면 시안까지 만들어 서류를 내려고 해요. 기획·백엔드는 정해졌고 디자인 1명, 프론트 1명이 더 필요해요.\n역할은 첫 회의에서 문서로 정리하고, 매주 진행 상황을 공유해요.' },
    { id: 't2', kind: '공모전', contest: 'kr4', title: '대학생 정책 아이디어 공모전 · 리서처·기획자 1명', leader: leader('픽셀장인', '커뮤니케이션디자인학과 4학년', 93, 7, 100),
      positions: [P('기획', 1, 0), P('디자인', 2, 2)], mode: '오프라인 · 디자인관', period: '11월 ~ 12월 초 (4주)', meet: '주 2회 화·금 18:00', tools: ['Figma', 'Notion'], deadline: '2026-11-22',
      tags: ['수상 경험 있는 팀'], created: '어제', views: 166, applicants: 3,
      desc: '영상은 디자인과 둘이 맡을게요. 정책 문제를 찾고 해결책을 정리해 줄 리서처·기획자를 찾아요. 전공은 상관없어요.' },
    { id: 't3', kind: '캡스톤', contest: null, title: '캡스톤 · 학교 공지 알림 앱 프론트엔드(React) 1명', leader: leader('캡스톤팀장', '컴퓨터공학과 4학년', 88, 4, 92),
      positions: [P('기획', 1, 1), P('디자인', 1, 1), P('프론트엔드', 1, 0), P('백엔드', 1, 1)], mode: '오프라인 · 공학관', period: '12월 시연까지 (5주)', meet: '매주 월 16:00', tools: ['React', 'TypeScript', 'Firebase'], deadline: '2026-11-28',
      tags: ['학점 연계'], created: '2일 전', views: 295, applicants: 4,
      desc: '학과·학교 공지를 모아 키워드 알림을 보내주는 앱이에요. 디자인 시안은 완성돼 있고, 화면 구현을 맡아 주실 분을 찾아요.' },
    { id: 't4', kind: '공모전', contest: 'kr1', title: '공학의 가치 숏폼 · 촬영·편집 같이 하실 분 (2명)', leader: leader('브이로그하는새내기', '한국어문학과 1학년', 79, 1, 100),
      positions: [P('기획', 1, 1), P('영상', 2, 0)], mode: '오프라인 · 주말 촬영', period: '11월 3주 (짧게!)', meet: '토요일 오후', tools: ['Premiere Pro', 'CapCut'], deadline: '2026-11-18',
      tags: ['신입생 환영', '초보 환영'], created: '3시간 전', views: 98, applicants: 1,
      desc: '신호등·엘리베이터처럼 매일 쓰는 공학을 60초 세로 영상으로 담으려고 해요. 콘티는 제가 짜 놨어요. 같이 촬영하고 편집해 주실 분!' },
    { id: 't5', kind: '사이드 프로젝트', contest: null, title: '중고 전공책 구독 서비스 · 창업 준비 팀원 모집', leader: leader('스타트업꿈나무', '경영학과 3학년', 85, 3, 100),
      positions: [P('기획', 1, 1), P('마케팅', 1, 0), P('프론트엔드', 1, 0), P('디자인', 1, 0)], mode: '혼합', period: '12월 대회까지 (5주)', meet: '주 1회 목 저녁', tools: ['Notion', 'Figma'], deadline: '2026-11-30',
      tags: ['창업 관심', '비전공자 가능'], created: '5시간 전', views: 187, applicants: 2,
      desc: '학기마다 버려지는 전공책을 구독형으로 돌려 쓰는 서비스예요. 시장조사는 끝났고, 피칭 자료와 랜딩 페이지를 같이 만들 분을 찾아요.' },
    { id: 't6', kind: '사이드 프로젝트', contest: null, title: '학식 메뉴 알림 봇 같이 만들 사람 (가볍게)', leader: leader('학식평론가', '컴퓨터공학과 2학년', 82, 2, 100),
      positions: [P('백엔드', 1, 0), P('디자인', 1, 0)], mode: '온라인', period: '겨울방학 (4주)', meet: '온라인 주 1회', tools: ['Python', 'Discord'], deadline: '2026-12-15',
      tags: ['부담 없이', '신입생 환영'], created: '1일 전', views: 132, applicants: 5,
      desc: '매일 아침 학생회관 학식 메뉴를 알려주는 봇이에요. 부담 없이 방학 동안 완성해 보실 분 환영해요.' },
    { id: 't7', kind: '공모전', contest: 'kr4', title: '대학생 정책 아이디어 공모전 · 주거 분야 1명만 더!', leader: leader('정책덕후', '행정학과 3학년', 91, 6, 100),
      positions: [P('기획', 3, 2)], mode: '오프라인 · 학생회관', period: '11월 말까지 (3주)', meet: '주 2회 저녁', tools: ['Google Docs', 'PowerPoint'], deadline: '2026-11-24',
      tags: ['자취생 환영'], created: '6시간 전', views: 77, applicants: 2,
      desc: '청년 1인 가구 주거 정책을 1분 영상으로 준비하고 있어요. 자취 경험이 있는 분이면 더 좋아요.' },
    { id: 't8', kind: '공모전', contest: 'kr3', title: '국세청 장려금 숏폼 공모전 팀원 모집', leader: leader('지구지킴이', '화학과 3학년', 87, 3, 100),
      positions: [P('리서치', 2, 2)], mode: '온라인', period: '~11월 15일', meet: '온라인', tools: ['Google Docs'], deadline: '2026-11-08',
      tags: [], created: '1주 전', views: 140, applicants: 4, closed: true,
      desc: '모집이 마감됐어요. 관심 가져 주셔서 감사합니다!' },
  ];
  const roles = ['기획', '디자인', '프론트엔드', '백엔드', '영상', '마케팅', '리서치'];

  const people = [
    { id: 'u1', nick: 'UI가좋아', dept: '커뮤니케이션디자인학과 2학년', roles: ['디자인'], tools: ['Figma', 'Illustrator'], want: ['디자인', 'IT·SW'], time: '주 8시간', done: 3, rate: 100, intro: '앱 UI와 브랜딩 위주로 작업해요. 개발자와 협업해 보고 싶어요.' },
    { id: 'u2', nick: '백엔드입문', dept: '컴퓨터공학과 2학년', roles: ['백엔드'], tools: ['Java', 'Spring'], want: ['IT·SW', '창업'], time: '주 10시간', done: 1, rate: 100, intro: 'Spring으로 API 만들어 봤어요. 첫 공모전 같이 나갈 팀 찾아요.' },
    { id: 'u3', nick: '복학한기획러', dept: '경영학과 3학년 (복학)', roles: ['기획', '마케팅'], tools: ['Notion', 'PowerPoint'], want: ['기획·아이디어', '마케팅', '창업'], time: '주 6시간', done: 4, rate: 75, intro: '군대 가기 전 공모전 두 번 입상했어요. 감 다시 찾고 싶어요!' },
    { id: 'u4', nick: '편집은내가', dept: '커뮤니케이션디자인학과 1학년', roles: ['영상'], tools: ['Premiere Pro', 'After Effects'], want: ['영상'], time: '주 5시간', done: 0, rate: null, intro: '유튜브 편집 1년 했어요. 공모전은 처음이에요.' },
    { id: 'u5', nick: '리액트연습중', dept: '전자공학과 3학년', roles: ['프론트엔드'], tools: ['React', 'TypeScript'], want: ['IT·SW'], time: '주 12시간', done: 2, rate: 100, intro: '프론트엔드로 진로 정했어요. 실서비스 경험 쌓고 싶어요.' },
    { id: 'u6', nick: '데이터보는행정학도', dept: '행정학과 3학년', roles: ['리서치', '기획'], tools: ['SPSS', 'Notion'], want: ['디자인', '학술·논문'], time: '주 6시간', done: 2, rate: 100, intro: '사용자 인터뷰·설문 설계 잘해요. UX 리서치 하고 싶어요.' },
  ];

  /* ── 외부 앱 연결 (데이터 연동 없음, 스토어 링크만) ── */
  const externalApps = [
    { id: 'blooming', name: '블루밍', headline: '집주인이 올린 원룸은 블루밍에서', desc: '학교 주변 원룸 비교 · 직접 찍은 사진과 VR 사진 · 집주인과 채팅',
      schools: '한국교통대(충주·증평), 건국대(글로컬), 세명대·대원대, 한서대 등',
      ios: 'https://apps.apple.com/kr/app/id895407776',
      android: 'https://play.google.com/store/search?q=%EB%B8%94%EB%A3%A8%EB%B0%8D%20%EC%9E%90%EC%B7%A8%EB%B0%A9&c=apps' },
  ];

  /* ── 생활 매칭 (택시 동행 · 배달 공동 주문) — 모두 예시 데이터 ──
   * 시간은 '페이지를 연 시각 기준 몇 분 뒤'로 적어 두어 데모에서 항상 남은 시간이 살아 있게 했어요.
   * 금액은 모집자가 입력한 예상값이라는 가정의 예시예요 (실제 요금 아님). */
  const lifeSpots = [
    { name: '정문 버스정류장', zone: '교내' }, { name: '생활관(기숙사) 앞', zone: '교내' }, { name: '학생회관 1층', zone: '교내' },
    { name: '충주공용버스터미널', zone: '교통 거점' }, { name: '충주역', zone: '교통 거점' }, { name: '충주 시내', zone: '시내' },
  ];
  const LP = (nick, trust, dept, items) => ({ nick, trust, dept, items: items || [] });
  const taxis = [
    { id: 'tx1', from: '정문 버스정류장', to: '충주공용버스터미널', departIn: 55, closeIn: 35, cap: 4, fare: 15000, leader: LP('주말엔본가', 84, '경영학과'), members: [LP('기차타는공대생', 80, '전기공학과')], note: '금요일 귀가해요. 캐리어 1개 있어요. 정류장 벤치 앞에서 모여요.' },
    { id: 'tx2', from: '충주공용버스터미널', to: '정문 버스정류장', departIn: 100, closeIn: 75, cap: 3, fare: 15000, leader: LP('러닝하는경영인', 95, '경영학과'), members: [LP('새벽감성러', 63, '커뮤니케이션디자인학과'), LP('아침형고양이', 88, '사회복지학과')], note: '터미널 1번 승강장 앞에서 만나요.' },
    { id: 'tx3', from: '생활관(기숙사) 앞', to: '충주역', departIn: 190, closeIn: 160, cap: 4, fare: 17000, leader: LP('도서관지박령', 91, '컴퓨터공학과'), members: [], note: '기차 시간 맞춰서 여유 있게 출발해요.' },
    { id: 'tx4', from: '정문 버스정류장', to: '충주 시내', departIn: -20, closeIn: -35, cap: 4, fare: 13000, leader: LP('깔끔한두부', 78, '건축학과'), members: [], note: '저녁 약속 있어서 시내 가요.' },
  ];
  const deliveryCats = ['치킨', '피자', '분식', '한식', '중식', '기타'];
  const deliveries = [
    { id: 'dl1', shop: '정문 치킨', cat: '치킨', pickup: '생활관(기숙사) 앞', closeIn: 25, minOrder: 20000, fee: 3000, cap: 4,
      leader: LP('아침형고양이', 88, '사회복지학과', [{ n: '후라이드 반 마리', p: 9000, q: 1 }]), members: [LP('조용한밤샘러', 80, '기계공학과', [{ n: '양념 반 마리', p: 9500, q: 1 }])], note: '생활관 1층 로비에서 나눠요. 콜라는 같이 나눠 마셔요.' },
    { id: 'dl2', shop: '대학로 피자', cat: '피자', pickup: '학생회관 1층', closeIn: 12, minOrder: 18000, fee: 2000, cap: 3,
      leader: LP('깔끔한두부', 78, '건축학과', [{ n: '콤비네이션 M (반판)', p: 12900, q: 1 }]), members: [LP('주말엔본가', 84, '경영학과', [{ n: '치즈 오븐 스파게티', p: 9900, q: 1 }])], note: '최소 금액은 넘었어요. 한 분만 더 오시면 배달비가 줄어요!' },
    { id: 'dl3', shop: '본리 분식', cat: '분식', pickup: '정문 버스정류장', closeIn: 48, minOrder: 15000, fee: 3500, cap: 5,
      leader: LP('도서관지박령', 91, '컴퓨터공학과', [{ n: '떡볶이 1인분', p: 4500, q: 1 }, { n: '김밥', p: 3000, q: 1 }]), members: [], note: '시험 기간 야식! 정류장 옆 벤치에서 받아요.' },
  ];

  /* ── 행사 메이트 (함께 갈 사람) · 행사 후기 — 예시 ── */
  const MP = (nick, trust, dept) => ({ nick, trust, dept });
  const eventMates = [
    { id: 'em1', event: 'e3', cap: 3, leader: MP('주말엔본가', 84, '경영학과'), members: [MP('아침형고양이', 88, '사회복지학과')], meet: '학생회관 1층', when: '공연 30분 전', note: '공연 혼자 보기 아쉬워서요! 끝나고 학식 같이 먹어요.' },
    { id: 'em2', event: 'e1', cap: 4, leader: MP('도서관지박령', 91, '컴퓨터공학과'), members: [MP('깔끔한두부', 78, '건축학과'), MP('새벽감성러', 63, '커뮤니케이션디자인학과')], meet: '학생회관 1층', when: '17:00', note: '신입생끼리 박람회 같이 돌아요. 부스 다 돌면 해산!' },
    { id: 'em3', event: 'e2', cap: 3, leader: MP('러닝하는경영인', 95, '경영학과'), members: [], meet: '중앙도서관 1층 로비', when: '세미나 10분 전', note: '복학생이에요. 같이 듣고 졸업요건 정리해요.' },
    { id: 'em4', event: 'e9', cap: 4, leader: MP('조용한밤샘러', 80, '기계공학과'), members: [MP('요리하는자취생', 75, '식품공학과')], meet: '정문 버스정류장', when: '09:40', note: '봉사 처음이라 같이 가실 분! 장갑은 주최 측에서 줘요.' },
  ];
  const eventReviews = {
    e0: [{ from: '자취3년차', stars: 5, text: '전기포트랑 수납함을 거의 공짜로 구했어요. 다음엔 오전에 일찍 가세요!', tags: ['신입생에게 추천', '알찼어요'] },
      { from: '익명', stars: 4, text: '사람이 많아서 줄이 길었지만 분위기는 좋았어요.', tags: ['사람 많아요'] }],
  };

  /* ── 운영자 데모 화면용 예시 ── */
  const staff = [{ name: '주거 담당', area: '방·룸메' }, { name: '생활 담당', area: '택시·배달·중고' }, { name: '활동 담당', area: '공모전·동아리·행사' }, { name: '후기 담당', area: '후기·댓글·채팅' }];
  const adminReports = [
    { id: 'ar1', target: '택시 동행 · 정문 → 충주역', reason: '모집자가 출발 전 선입금을 요구했어요', date: '2026.11.10', who: '익명 학생' },
    { id: 'ar2', target: '공동 주문 · 정문 치킨', reason: '음식을 받고 정산 금액을 보내지 않았어요 (미입금)', date: '2026.11.09', who: '익명 학생' },
    { id: 'ar3', target: '후기 · “족보 팝니다 오픈채팅 문의”', reason: '스팸·광고 · 외부 메신저 유도', date: '2026.11.09', who: '익명 학생' },
  ];
  const adminUsers = [
    { nick: '번개취소러', cancels: 4, reports: 1, trust: 58, note: '확정 후 취소 4회 (택시 3 · 배달 1)' },
    { nick: '선입금주세요', cancels: 0, reports: 3, trust: 41, note: '신고 3회 · 선입금 요구 의심' },
    { nick: '새벽감성러', cancels: 1, reports: 0, trust: 63, note: '신뢰도 70점 미만 · 교내 만남만 가능' },
  ];

  const adminVerify = [
    { key: 'av1', who: '새내기기숙사', method: 'pre', file: '합격증_캡처.jpg' },
    { key: 'av2', who: '복학한기획러', method: 'card', file: '모바일학생증.png' },
  ];
  return { dorms, dormInfo, staff, adminReports, adminUsers, adminVerify, eventMates, eventReviews, lifeSpots, taxis, deliveryCats, deliveries, externalApps, contests, contestCats, teams, roles, people, clubs, clubCats, events, school, safePlaces, questions, mySurvey, myWeights, mates, rooms, items, sellerReviews, boards, posts, me, myListings, deals, myReviews, pastReports };
})();
