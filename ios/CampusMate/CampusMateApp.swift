import SwiftUI
import WebKit

/// 이음(옛 이름 CampusMate) 웹 프로토타입(index.html · css · js · assets)을 앱 번들에 담아 WKWebView로 띄우는 iOS 앱.
/// 웹 파일은 빌드할 때마다 저장소 루트에서 앱 번들의 Web 폴더로 복사돼요 (Build Phases › Copy Web Files).
@main
struct CampusMateApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
        }
    }
}

/// 앱 배경색 (웹의 --bg 와 같은 색)
private let appBG = Color(red: 245 / 255, green: 244 / 255, blue: 250 / 255)

struct RootView: View {
    @State private var loaded = false

    var body: some View {
        ZStack {
            CampusWebView(onLoaded: { withAnimation(.easeOut(duration: 0.35)) { loaded = true } })
                .ignoresSafeArea()
            if !loaded {
                SplashView().transition(.opacity)
            }
        }
        .background(appBG)
        .task {
            // 웹 화면이 늦게 뜨더라도 시작 화면에 갇히지 않게 최대 3초 뒤에는 닫아요.
            try? await Task.sleep(nanoseconds: 3_000_000_000)
            if !loaded { withAnimation(.easeOut(duration: 0.35)) { loaded = true } }
        }
    }
}

/// 시작 화면: 웹 화면을 불러오는 동안 잇고가 인사해요.
struct SplashView: View {
    @State private var bounce = false

    var body: some View {
        ZStack {
            appBG.ignoresSafeArea()
            VStack(spacing: 14) {
                Image("Splash")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 168, height: 168)
                    .clipShape(RoundedRectangle(cornerRadius: 40, style: .continuous))
                    .offset(y: bounce ? -6 : 0)
                    .animation(.easeInOut(duration: 0.8).repeatForever(autoreverses: true), value: bounce)
                Text("이음")
                    .font(.system(size: 34, weight: .heavy))
                    .foregroundStyle(Color(red: 18 / 255, green: 23 / 255, blue: 46 / 255))
                Text("교통대 학생끼리, 함께 잇고 함께 GO")
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(.secondary)
            }
            .accessibilityElement(children: .combine)
            .accessibilityLabel("이음, 교통대 학생 매칭 앱을 불러오는 중")
        }
        .onAppear { bounce = true }
    }
}

/// 실제 사이트 주소와, 앱 안에서 열어도 되는 주소(이음 사이트 + 카카오 로그인 화면)
private let liveURL = URL(string: "https://ysyny1126-bot.github.io/campusmate/")!
private let inAppHosts: Set<String> = ["ysyny1126-bot.github.io", "kauth.kakao.com", "accounts.kakao.com", "logins.daum.net"]

struct CampusWebView: UIViewRepresentable {
    var onLoaded: () -> Void

    func makeCoordinator() -> Coordinator { Coordinator(onLoaded: onLoaded) }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .default()          // 인증·찜 등 데모 상태(localStorage) 유지
        config.allowsInlineMediaPlayback = true
        // OpenStreetMap 타일 이용 규칙: 요청하는 앱을 알 수 있는 User-Agent를 보내야 해요.
        config.applicationNameForUserAgent = "IeumDemo/1.0 (iOS; github.com/ysyny1126-bot/campusmate)"

        // 앱답게: 두 손가락 확대를 막고, 링크·이미지를 길게 눌렀을 때 뜨는 미리보기 메뉴를 꺼요.
        // 웹 쪽 CSS에서 앱 전용 스타일을 쓸 수 있게 <html>에 in-app 클래스를 붙여요.
        let js = """
        (function () {
          var m = document.querySelector('meta[name=viewport]');
          if (m) m.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover');
          document.documentElement.classList.add('in-app');
          var st = document.createElement('style');
          st.textContent = 'a, img, button { -webkit-touch-callout: none; } body { -webkit-tap-highlight-color: transparent; }';
          document.head.appendChild(st);
        })();
        """
        config.userContentController.addUserScript(WKUserScript(source: js, injectionTime: .atDocumentEnd, forMainFrameOnly: true))

        let web = WKWebView(frame: .zero, configuration: config)
        let bg = UIColor(red: 245 / 255, green: 244 / 255, blue: 250 / 255, alpha: 1)
        web.isOpaque = false
        web.backgroundColor = bg
        web.scrollView.backgroundColor = bg
        // 노치·홈 인디케이터 여백은 웹의 env(safe-area-inset-*)가 처리하도록 그대로 넘겨요.
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.allowsBackForwardNavigationGestures = true   // 왼쪽 가장자리에서 밀면 뒤로 가기
        web.navigationDelegate = context.coordinator
        web.uiDelegate = context.coordinator
        #if DEBUG
        if #available(iOS 16.4, *) { web.isInspectable = true }  // Safari 웹 속성으로 디버깅
        #endif

        // 인터넷이 되면 실제 사이트를 열어요 → 웹과 같은 '진짜 카카오 로그인'이 돼요.
        // 인터넷이 안 되면(또는 사이트가 안 열리면) 앱에 담긴 웹 파일로 바꿔 열어요 (카카오 로그인은 데모).
        context.coordinator.web = web
        web.load(URLRequest(url: liveURL, cachePolicy: .reloadRevalidatingCacheData, timeoutInterval: 8))
        return web
    }

    static func loadBundled(_ web: WKWebView) {
        if let index = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") {
            web.loadFileURL(index, allowingReadAccessTo: index.deletingLastPathComponent())
        } else {
            web.loadHTMLString("<p style='font:17px -apple-system;padding:40px'>웹 파일을 찾을 수 없어요. 빌드 단계 ‘Copy Web Files’를 확인하세요.</p>", baseURL: nil)
        }
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate {
        private let onLoaded: () -> Void
        private var didReport = false
        private var fellBack = false
        weak var web: WKWebView?
        init(onLoaded: @escaping () -> Void) { self.onLoaded = onLoaded }

        /// 첫 화면이 다 그려지면 시작 화면을 닫아요.
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            guard !didReport else { return }
            didReport = true
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) { self.onLoaded() }
        }

        /// 실제 사이트를 못 열면(오프라인 등) 앱에 담긴 파일로 바꿔요.
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            guard !fellBack, webView.url == nil || webView.url?.host == liveURL.host else { return }
            fellBack = true
            CampusWebView.loadBundled(webView)
        }

        /// 앱 안의 페이지(file://, 이음 사이트, 카카오 로그인 화면)는 웹뷰에서 열고, 그 밖에 사용자가 누른 외부 링크(App Store 등)는 시스템에 넘겨요.
        /// App Store 링크는 App Store 앱으로, 그 밖의 웹 주소는 Safari로 열려요.
        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = action.request.url, let scheme = url.scheme?.lowercased() else {
                decisionHandler(.allow); return
            }
            let userTapped = action.navigationType == .linkActivated || action.targetFrame == nil
            let inApp = ["file", "about", "data", "blob"].contains(scheme) || (scheme.hasPrefix("http") && inAppHosts.contains(url.host ?? ""))
            let isExternal = !inApp
            if isExternal && (userTapped || !scheme.hasPrefix("http")) {
                UIApplication.shared.open(url)
                decisionHandler(.cancel)
                return
            }
            decisionHandler(.allow)
        }

        /// target="_blank" 링크: 새 창 대신 시스템으로 열어요.
        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                     for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if let url = action.request.url { UIApplication.shared.open(url) }
            return nil
        }
    }
}
