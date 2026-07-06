// 다크모드: 사용자가 명시적으로 고른 적 있으면 그 값을,
// 없으면 시스템 설정(prefers-color-scheme)을 그대로 따른다.
(function initTheme() {
  const saved = localStorage.getItem("humanlog_theme");
  if (saved === "dark" || saved === "light") {
    document.documentElement.setAttribute("data-theme", saved);
  }
})();

const NAV_ITEMS = [
  { key: "home", label: "홈", hash: "#/", icon: "home" },
  { key: "log", label: "기록", hash: "#/log", icon: "notebook" },
  { key: "connect", label: "연결", hash: "#/connect", icon: "users" },
  { key: "settings", label: "설정", hash: "#/settings", icon: "settings" },
];

// 최소한의 인라인 아이콘 (Tabler 아이콘 폰트 없이도 동작하도록 SVG로 직접 구성)
const ICONS = {
  bell:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/></svg>',
  notebook:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18"/><path d="M13 8h3"/><path d="M13 12h3"/></svg>',
  users:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3-5 7-5s7 1.7 7 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 20c.2-2.4 1.6-4 4-4.5"/></svg>',
  settings:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.6-1.2-1.5-2.6-1.9.6a7.8 7.8 0 0 0-2.6-1.5L14.5 3h-3l-.5 2.8a7.8 7.8 0 0 0-2.6 1.5l-1.9-.6-1.5 2.6L6 10.5a7.6 7.6 0 0 0 0 3l-1.6 1.2 1.5 2.6 1.9-.6a7.8 7.8 0 0 0 2.6 1.5L11 21h3l.5-2.8a7.8 7.8 0 0 0 2.6-1.5l1.9.6 1.5-2.6-1.6-1.2Z"/></svg>',
};

function buildShell() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="app-shell">
      <header class="app-header">
        <div class="app-header__brand">
          <h1>인간로그</h1>
          <p>분석보다 이해</p>
        </div>
        <div class="app-header__actions">
          <a class="icon-button" href="#/settings/notifications" aria-label="알림">${ICONS.bell}</a>
          <a class="icon-button" href="#/settings" aria-label="프로필">${ICONS.user}</a>
        </div>
      </header>

      <main class="app-main" id="app-main"></main>

      <nav class="bottom-nav" aria-label="주요 메뉴">
        <ul>
          ${NAV_ITEMS.map(
            (item) => `
            <li>
              <a class="nav-link" href="${item.hash}" data-nav-key="${item.key}">
                <span class="nav-link__icon" aria-hidden="true">${ICONS[item.icon]}</span>
                <span class="nav-link__label">${item.label}</span>
              </a>
            </li>
          `
          ).join("")}
        </ul>
      </nav>
    </div>
  `;

  return {
    main: document.getElementById("app-main"),
    navLinks: Array.from(app.querySelectorAll(".nav-link")),
  };
}

// 아직 구현되지 않은 화면(2단계 범위 이후)을 위한 안내용 자리표시자.
// 개발 프롬프트 문서의 화면 목록을 그대로 따르되, 이번 구현 범위는 홈 화면까지다.
HL.renderPlaceholder = function (container, key) {
  const titles = {
    log: "기록 아카이브",
    backup: "데이터 백업",
    connect: "친구 연결",
    settings: "설정",
  };

  container.innerHTML = `
    <div class="placeholder-view">
      <h2>${titles[key] || "준비 중"}</h2>
      <p>이 화면은 다음 개발 단계에서 이어집니다.<br />지금은 홈에서 오늘의 질문을 만나보세요.</p>
    </div>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  const { main, navLinks } = buildShell();
  HL.router.start(main, navLinks);
});
