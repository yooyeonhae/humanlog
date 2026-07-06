// 해시 기반 클라이언트 사이드 라우터.
// 서버 라우팅 없이 Vercel 정적 배포만으로 동작하도록,
// location.hash 를 감지해 화면을 전환한다.
//
// PRD 3단계 UI 명세의 경로 ↔ 실제 구현 경로(hash) 매핑은
// 개발 프롬프트 문서 2절 표를 따른다. 이번 구현 범위(첫 화면)에서는
// "/"(홈)만 완전히 구현하고, 나머지는 안내용 placeholder로 둔다.

HL.router = {
  routes: [
    { test: (h) => h === "#/" || h === "", key: "home" },
    { test: (h) => h === "#/log", key: "log" },
    { test: (h) => h === "#/backup", key: "backup" },
    { test: (h) => h === "#/connect", key: "connect" },
    { test: (h) => h === "#/settings", key: "settings" },
  ],

  resolve(hash) {
    const match = HL.router.routes.find((r) => r.test(hash));
    return match ? match.key : "home";
  },

  start(mainEl, navLinks) {
    const render = () => {
      const key = HL.router.resolve(window.location.hash);
      const view = HL.views[key];

      if (view && typeof view.render === "function") {
        view.render(mainEl);
      } else {
        HL.renderPlaceholder(mainEl, key);
      }

      navLinks.forEach((link) => {
        const isActive = link.dataset.navKey === key;
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      if (typeof mainEl.scrollTo === "function") {
        mainEl.scrollTo({ top: 0 });
      } else {
        mainEl.scrollTop = 0;
      }
    };

    window.addEventListener("hashchange", render);
    render();
  },
};
