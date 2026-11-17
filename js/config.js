/* 이음 설정 파일
 * kakaoJsKey: 카카오 개발자 사이트(developers.kakao.com) › 내 애플리케이션 › 앱 키 › "JavaScript 키".
 *   비워 두면 카카오 로그인은 '데모'로 동작해요 (버튼을 누르면 예시 계정으로 로그인).
 *   JavaScript 키는 웹에 공개되는 키라 저장소에 넣어도 되지만, 카카오 개발자 사이트에서
 *   '사이트 도메인'(https://ysyny1126-bot.github.io)과 Redirect URI를 꼭 등록해야 해요.
 *   카카오가 돌려준 인가 코드로 사용자 정보를 받으려면 서버(또는 서버리스 함수)가 한 단계 더 필요해요. */
window.CM_CONFIG = {
  kakaoJsKey: '',
  kakaoSdk: 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js',
};
