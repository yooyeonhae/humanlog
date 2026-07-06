# 인간로그 (Vanilla HTML/CSS/JS 버전)

PRD → UI 명세 → 개발 프롬프트 단계를 거쳐 정리된 스펙을 바탕으로 구현한
**홈 화면(오늘의 질문)** 실제 동작 코드입니다. 프레임워크 없이 순수
HTML5 · CSS3 · Vanilla JavaScript로 작성했고, Vercel 무료 플랜에 그대로
배포할 수 있습니다.

## 지금 구현된 범위

- 홈 화면(`#/`): 랜덤 질문 노출 → 4지선다 선택 → AI 관찰 문장(mock, 로딩
  스켈레톤 포함) → "다음 질문"
- 오늘 이미 답변했다면 재방문 시 같은 질문·답변·관찰을 그대로 복원(하루 1
  회 원칙, `localStorage` 기반)
- 상단 헤더(로고/문구/알림·프로필 아이콘), 하단 네비게이션(홈/기록/연결/
  설정) — 해시 라우팅으로 화면 전환
- 홈 이외의 화면(기록/백업/연결/설정)은 다음 개발 단계 안내용 placeholder
- 다크모드: 시스템 설정(`prefers-color-scheme`) 자동 반영
- 접근성: 키보드 포커스 표시, `aria-pressed`/`aria-current`, `prefers-
  reduced-motion` 대응

## 실행 방법

정적 파일이라 별도 빌드 없이 바로 실행할 수 있습니다.

```bash
# 방법 1: 파이썬 내장 서버
python3 -m http.server 3000

# 방법 2: Node 있다면
npx serve .
```

브라우저에서 `http://localhost:3000` 접속.

> `file://`로 직접 열어도 대부분 동작하지만, 일부 브라우저는 로컬 파일
> 간 스크립트 로드를 제한할 수 있어 위 방법 중 하나로 로컬 서버를 띄우는
> 것을 권장합니다.

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 올리기
2. [vercel.com](https://vercel.com)에서 저장소 Import (Framework Preset:
   **Other**, Build Command 없음, Output Directory `.`)
3. 배포 완료 후 발급되는 URL로 바로 접속 가능

## 폴더 구조

```
human-log-vanilla/
├── index.html            # SPA 진입점
├── vercel.json            # 정적 배포 설정
├── css/
│   ├── reset.css
│   ├── tokens.css          # 디자인 토큰(색상/폰트/라운드 변수)
│   └── styles.css
└── js/
    ├── data/
    │   ├── questions.js     # 질문·선택지 mock 데이터
    │   └── insights.js      # AI 관찰 mock 문장 pool
    ├── storage.js            # localStorage 읽기/쓰기 유틸
    ├── router.js             # 해시 기반 라우터
    ├── app.js                # 헤더/하단 네비게이션 뼈대 + 라우터 시작
    └── views/
        └── home.js           # 홈 화면 (오늘의 질문 핵심 로직)
```

## 다음 단계

`인간로그_개발프롬프트.md` 문서의 7절(화면별 구현 스펙)을 따라
`views/log.js`, `views/backup.js`, `views/connect.js`, `views/settings.js`
등을 이어서 구현하면 됩니다. 파일 구조와 라우팅 규칙은 이미 그 문서와
일치하도록 맞춰뒀습니다.
