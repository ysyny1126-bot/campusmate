/* 실제 데이터: 국토교통부 전월세 실거래가 (단독/다가구 · 연립다세대 · 오피스텔), 공공데이터포털 Open API
 * 지역: 충청북도 충주시(법정동코드 43130), 계약 기간: 2025년 11월 ~ 2026년 10월, 수집일: 2026-11-10
 * 개별 거래는 담지 않고 요약 통계만 담았어요. 금액 단위: 만원, 면적: ㎡(전용·계약면적)
 * depMed/rentMed = 보증금/월세 중앙값, dep25·dep75·rent25·rent75 = 하위 25%·상위 25% 지점,
 * convMed = 환산 월세 중앙값 (월세 + 보증금 × 연 6% ÷ 12)
 * 갱신: scripts/README-rent.md 참고 */
window.CM_RENT = {"source":"국토교통부 전월세 실거래가 (단독/다가구·연립다세대·오피스텔), 공공데이터포털","region":"충청북도 충주시 (법정동코드 43130)","period":"202511~202610","fetched":"2026-11-10","counts":{"all":1742,"monthly":1521,"jeonse":221,"dae":153,"daeSmall":119},
"city":{"n":1521,"depMed":500,"dep25":300,"dep75":500,"rentMed":40,"rent25":33,"rent75":50,"convMed":42.5,"areaMed":35},
"citySmall":{"n":728,"depMed":300,"dep25":300,"dep75":500,"rentMed":35,"rent25":30,"rent75":40,"convMed":36.5,"areaMed":26},
"dae":{"n":153,"depMed":300,"dep25":200,"dep75":300,"rentMed":35,"rent25":32,"rent75":41,"convMed":36.5,"areaMed":20.7},
"daeSmall":{"n":119,"depMed":300,"dep25":200,"dep75":300,"rentMed":34,"rent25":31,"rent75":37.5,"convMed":35.5,"areaMed":19.9},
"daeBySize":{"20㎡ 이하":{"n":68,"depMed":300,"dep25":300,"dep75":300,"rentMed":33,"rent25":30,"rent75":35,"convMed":34.3,"areaMed":16.6},"20~33㎡":{"n":51,"depMed":300,"dep25":75,"dep75":300,"rentMed":36,"rent25":34.5,"rent75":40,"convMed":36.5,"areaMed":26},"33㎡ 초과":{"n":34,"depMed":400,"dep25":225,"dep75":500,"rentMed":50,"rent25":45,"rent75":55,"convMed":51.3,"areaMed":50}},
"daeByType":{"다가구":{"n":61,"depMed":200,"dep25":30,"dep75":300,"rentMed":38,"rent25":33,"rent75":45,"convMed":39.1,"areaMed":30},"단독":{"n":16,"depMed":500,"dep25":175,"dep75":500,"rentMed":43.5,"rent25":35,"rent75":51.8,"convMed":46.3,"areaMed":40.5},"다세대":{"n":75,"depMed":300,"dep25":300,"dep75":300,"rentMed":33,"rent25":30,"rent75":36,"convMed":34.5,"areaMed":16.9}},
"daeByRi":{"대소원면 본리":{"n":118,"depMed":300,"dep25":300,"dep75":300,"rentMed":35,"rent25":31,"rent75":40,"convMed":36.5,"areaMed":20.4},"대소원면 검단리":{"n":21,"depMed":20,"dep25":20,"dep75":30,"rentMed":36,"rent25":33,"rent75":41,"convMed":36.1,"areaMed":26.5},"대소원면 만정리":{"n":7,"depMed":30,"dep25":20,"dep75":530,"rentMed":42,"rent25":35.5,"rent75":55,"convMed":45,"areaMed":64.3},"대소원면 완오리":{"n":4,"depMed":400,"dep25":300,"dep75":1500,"rentMed":34.5,"rent25":26.3,"rent75":38.8,"convMed":36,"areaMed":20.5},"대소원면 대소리":{"n":3,"depMed":300,"dep25":300,"dep75":650,"rentMed":35,"rent25":35,"rent75":47.5,"convMed":36.5,"areaMed":65.9}},
"trend":[
{"ym":"202511","dae":{"n":20,"rentMed":35,"depMed":300},"city":{"n":108,"rentMed":40,"depMed":300}},
{"ym":"202512","dae":{"n":9,"rentMed":37,"depMed":200},"city":{"n":110,"rentMed":38,"depMed":500}},
{"ym":"202601","dae":{"n":9,"rentMed":31,"depMed":300},"city":{"n":161,"rentMed":43,"depMed":500}},
{"ym":"202602","dae":{"n":24,"rentMed":37,"depMed":30},"city":{"n":211,"rentMed":40,"depMed":500}},
{"ym":"202603","dae":{"n":9,"rentMed":35,"depMed":300},"city":{"n":115,"rentMed":40,"depMed":500}},
{"ym":"202604","dae":{"n":12,"rentMed":35,"depMed":300},"city":{"n":127,"rentMed":39,"depMed":500}},
{"ym":"202605","dae":{"n":10,"rentMed":34.5,"depMed":300},"city":{"n":120,"rentMed":40,"depMed":500}},
{"ym":"202606","dae":{"n":9,"rentMed":35,"depMed":300},"city":{"n":103,"rentMed":40,"depMed":500}},
{"ym":"202607","dae":{"n":12,"rentMed":33,"depMed":300},"city":{"n":141,"rentMed":41,"depMed":500}},
{"ym":"202608","dae":{"n":15,"rentMed":40,"depMed":300},"city":{"n":131,"rentMed":40,"depMed":300}},
{"ym":"202609","dae":{"n":10,"rentMed":34.5,"depMed":300},"city":{"n":102,"rentMed":40,"depMed":500}},
{"ym":"202610","dae":{"n":14,"rentMed":38,"depMed":300},"city":{"n":92,"rentMed":40,"depMed":500}}],
"topUmd":[["중앙탑면",277],["연수동",272],["호암동",172],["봉방동",161],["대소원면",153],["문화동",103],["칠금동",76],["주덕읍",68]]};
