import SwiftUI
import WebKit

/// CampusMate 웹 프로토타입(index.html · css · js)을 앱 번들에 담아 WKWebView로 띄우는 iOS 래퍼 앱.
/// 웹 파일은 빌드할 때마다 저장소 루트에서 앱 번들의 Web 폴더로 복사돼요 (Build Phases › Copy Web Files).
@main
struct CampusMateApp: App {
    var body: some Scene {
        WindowGroup {
            CampusWebView()
                .ignoresSafeArea()
                .background(Color(red: 245 / 255, green: 244 / 255, blue: 250 / 255))
        }
    }
}

struct CampusWebView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .default()          // 인증·찜 등 데모 상태(localStorage) 유지
        config.allowsInlineMediaPlayback = true

        let web = WKWebView(frame: .zero, configuration: config)
        let bg = UIColor(red: 245 / 255, green: 244 / 255, blue: 250 / 255, alpha: 1)
        web.isOpaque = false
        web.backgroundColor = bg
        web.scrollView.backgroundColor = bg
        // 노치·홈 인디케이터 여백은 웹의 env(safe-area-inset-*)가 처리하도록 그대로 넘겨요.
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.allowsBackForwardNavigationGestures = true
        web.navigationDelegate = context.coordinator
        #if DEBUG
        if #available(iOS 16.4, *) { web.isInspectable = true }  // Safari 웹 속성으로 디버깅
        #endif

        if let index = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") {
            web.loadFileURL(index, allowingReadAccessTo: index.deletingLastPathComponent())
        } else {
            web.loadHTMLString("<p style='font:17px -apple-system;padding:40px'>웹 파일을 찾을 수 없어요. 빌드 단계 ‘Copy Web Files’를 확인하세요.</p>", baseURL: nil)
        }
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate {
        /// 앱 안의 페이지(file://)와 폰트 CDN은 웹뷰에서, 그 밖의 외부 링크는 Safari로 열어요.
        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = action.request.url, action.navigationType == .linkActivated,
                  let scheme = url.scheme, scheme.hasPrefix("http") else {
                decisionHandler(.allow); return
            }
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
        }
    }
}
