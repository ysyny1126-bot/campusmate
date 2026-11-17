/* 이음 설정 파일
 * kakaoJsKey: 카카오 개발자 사이트(developers.kakao.com) › 내 애플리케이션 › 앱 키 › "JavaScript 키".
 *   비워 두면 카카오 로그인은 '데모'로 동작해요 (버튼을 누르면 예시 계정으로 로그인).
 *   JavaScript 키는 웹에 공개되는 키라 저장소에 넣어도 되지만, 카카오 개발자 사이트에서
 *   '사이트 도메인'(https://ysyny1126-bot.github.io)과 Redirect URI를 꼭 등록해야 해요.
 *   로그인 후 돌아온 인가 코드는 JavaScript 키로 토큰을 받아 닉네임만 조회해요(2026-11-17 동작 확인).
 *   아이폰 앱(file://)에서는 카카오 iOS SDK 연동 전이라 데모 로그인으로 동작해요. */
window.CM_CONFIG = {
  kakaoJsKey: '7eab1c85fe8913b2b022e31e32dcdb9e', // 이음 앱(ID 1654765) · 등록된 도메인에서만 동작하는 공개 키
  kakaoSdk: 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js',
};
