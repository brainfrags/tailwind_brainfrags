# BrainFrags Official Website — 설계 문서

> WordPress(카페24) → React + Vite + Tailwind v4 → GitHub Pages 전면 재구축
> 작성일: 2026-08-04

---

## 1. 목표

| 항목 | 내용 |
|---|---|
| 성격 | **스튜디오 정체성 중심** 기업 사이트 (툴 + 게임/앱을 아우르는 우산 브랜드) |
| 톤 | 다크 베이스 + 서브컬처 색감 (네온/글리치) |
| 언어 | 영어 · 한국어 · 일본어 (기본값: 브라우저 언어 감지, EN 폴백) |
| 호스팅 | GitHub Pages + 커스텀 도메인 `brainfrags.com` (구 `glitch9.dev`는 리다이렉트) |
| 제외 | 결제/커머스 (실물 굿즈는 2년 후 예정 — 지금은 티저 수준만) |

### 사이트가 답해야 할 3가지
1. BrainFrags는 **무엇을 만드는 곳인가** (Unity 개발자 툴 + 게임/앱)
2. **지금 살 수 있는 것**은 무엇인가 (Asset Store 링크, 문서 링크)
3. **누가** 만드는가 (스튜디오·연혁·연락)

---

## 2. 정보 구조 (IA)

```
/                     Home — 스튜디오 랜딩 (전 섹션 요약)
/products             Unity 에셋 카탈로그
  /products/:slug     개별 제품 상세 (선택 — 2차)
/games                Games & Apps
/about                About / Studio
/goods                굿즈 — Coming soon (판매 없음, 결제 미구현)
/blog                 News (선택 — 3차)
  /blog/:slug
/contact              문의 (섹션 or 페이지)
/privacy-policy       개인정보처리방침
/terms-of-service     이용약관
```

### 홈 섹션 순서

| # | 섹션 | 역할 |
|---|---|---|
| 1 | **Hero** | 스튜디오 한 줄 정의 + CTA 2개 (Products / Games) |
| 2 | **Numbers** | 신뢰 지표 (Asset Store 출시작 수, 다운로드, 활동 연차) |
| 3 | **What We Do** | 3축 카드: Developer Tools / Games / Apps |
| 4 | **Products** | Unity 에셋 그리드 (AIDevKit 라인 + 모바일 플러그인) |
| 5 | **Games & Apps** | ROUTiNA, CityChat 등 쇼케이스 |
| 6 | **About** | 스튜디오 소개 + 연혁 타임라인 |
| 7 | **News** | 최신 글 3개 (없으면 섹션 자동 숨김) |
| 8 | **Contact** | 문의 폼 + Discord / GitHub / Email |
| 9 | **Footer** | 사이트맵 · 법적고지 · 소셜 |

### /goods (별도 페이지)

| # | 섹션 | 역할 |
|---|---|---|
| 1 | **Masthead** | 07 마커 + 대형 헤드라인 + Coming soon 뱃지 + 설명 |
| 2 | **Marquee** | "COMING SOON" 반복 티커 |
| 3 | **Slots** | 상품 자리표시자 3개 (빈 프레임 + TBA) |
| 4 | **Notify** | 디스코드로 유도 (메일링 리스트 없음) |

> 결제·장바구니는 **의도적으로 미구현**. 실물 상품이 나오기 전까지 스토어를 열지 않는다.
> 기존 WooCommerce의 Cart/Checkout/My account 페이지는 이관하지 않음.

---

## 3. 콘텐츠 인벤토리

### Unity 에셋 (Asset Store, 퍼블리셔 ID 55731)

| 제품 | 카테고리 | 가격 | 비고 |
|---|---|---|---|
| AI DevKit PRO | AI/ML Integration | $39.99 | 플래그십 |
| AI DevKit RESEARCH LAB | AI/ML Integration | $79.99 | 상위 티어 |
| AI DevKit (Free) | AI/ML Integration | Free | 진입점 |
| AI Sheets | Generative AI | $25 | DB·현지화 |
| AI Image Studio | Generative AI | $29.99 | |
| Native Media Player | Integration | $39.99 | 최다 평점 (21) |
| Background Audio Timer | Integration | $14.99 | |
| Status & Navigation Bar | Integration | $14.99 | |
| Lock Task (Android) | Integration | $4.99 | |
| Serialization Saver | Utilities | Free | |
| Commit Gen | — | — | 문서만 존재 |

**제품 그룹핑 (홈에서는 2그룹으로 압축)**
- **AI Toolkits** — AIDevKit 라인 3종 + AI Sheets + AI Image Studio
- **Mobile Plugins** — Native Media Player, Background Audio Timer, Status & Navigation Bar, Lock Task
- *(Utilities는 Products 페이지에서만)*

### 외부 링크
- 문서: `https://glitch9.gitbook.io/docs`
- API 레퍼런스: `https://glitch9inc.github.io/DocFx.AIDevKit/`
- 제품 사이트: `https://aidevkit.dev`
- GitHub: `https://github.com/brainfrags`
- Discord: `https://discord.gg/hgajxPpJYf`
- Email: `munchkin@brainfrags.com`

### Games & Apps
- **ROUTiNA** — Flutter 기반 AI 컴패니언 앱 (개발 중)
- **CityChat** — 컨셉 단계
- *(추가 항목은 WordPress export 확인 후 반영)*

> **Galaxxy Idols는 이 사이트에 절대 넣지 않는다.** 전 회사(Munchkin
> Production) 작품이며 BrainFrags 포트폴리오가 아니다. 관련 수치(50만 다운로드
> 등)도 마찬가지로 사용 금지.

---

## 4. 디자인 시스템

### 컬러 토큰

```css
/* Base — 푸른기 도는 근사 블랙 */
--color-void:     #07070C;   /* page background */
--color-surface:  #0F0F17;   /* card background */
--color-elevated: #1A1A26;   /* hover / raised */
--color-line:     #262636;   /* borders */

/* Text */
--color-ink:      #F4F4F8;
--color-muted:    #9A9AB0;
--color-faint:    #5A5A72;

/* Accents — 서브컬처 네온 */
--color-neon:     #FF2E88;   /* primary  — magenta */
--color-cyan:     #22E0FF;   /* secondary — cyan   */
--color-violet:   #8B5CF6;   /* tertiary  — violet */
```

**사용 규칙**
- 네온 마젠타 = 주 CTA, 활성 상태, 브랜드 강조 (면적 5% 이내)
- 시안 = 보조 강조, 링크 hover, 데이터 시각화
- 바이올렛 = 그라데이션 연결색 (마젠타 → 바이올렛 → 시안)
- 그라데이션은 텍스트/보더에만. 큰 면적 그라데이션 금지

### 타이포그래피

| 역할 | 폰트 | 비고 |
|---|---|---|
| Display / Heading | **Space Grotesk** | 기하학적 + 약간의 기술적 인상 |
| Body / UI | **Inter** | |
| 한국어 | **Pretendard** | 폴백 체인에 포함 |
| 일본어 | **Noto Sans JP** | 폴백 체인에 포함 |
| Mono / 라벨 | **JetBrains Mono** | 섹션 넘버, 태그, 코드 |

스케일: `text-xs 12 / sm 14 / base 16 / lg 18 / xl 20 / 2xl 24 / 3xl 30 / 4xl 36 / 5xl 48 / 6xl 60 / 7xl 72`

### 모션
- 라이브러리: `framer-motion` + `lenis` (스무스 스크롤) — AIDevKit2와 동일
- 진입: `y: 40 → 0`, `opacity: 0 → 1`, spring(stiffness 260, damping 30)
- **글리치 모티프**: 로고와 Hero 헤드라인에만 RGB 스플릿 hover 효과. 남용 금지
- `prefers-reduced-motion` 존중 — 모든 모션 비활성 경로 확보

### 컴포넌트 목록
```
components/
  Navbar          — sticky, backdrop-blur, 언어 스위처 내장
  Footer          — 4열 사이트맵 + 법적고지
  SectionHeader   — 섹션 넘버(mono) + 타이틀 + 설명
  ProductCard     — 썸네일, 이름, 한 줄 설명, 가격 뱃지, Asset Store 링크
  ShowcaseCard    — 게임/앱용 대형 카드
  GlitchText      — RGB 스플릿 텍스트 효과
  NeonButton      — primary / ghost 변형
  LanguageSwitcher
  Reveal          — 스크롤 진입 애니메이션 래퍼
```

---

## 5. i18n 전략

AIDevKit2의 `LanguageContext` 패턴을 그대로 가져오되 개선:

```
src/i18n/
  index.js          — LanguageProvider, useLanguage, t()
  locales/en.js
  locales/ko.js
  locales/ja.js
```

- 언어별 **파일 분리** (AIDevKit2는 62KB 단일 파일 → 유지보수 어려움)
- 초기 언어: `localStorage` → `navigator.language` → `en`
- `<html lang>` 동기화 (SEO)
- 누락 키는 EN으로 폴백 + dev 콘솔 경고

---

## 6. 배포

```
GitHub repo: https://github.com/brainfrags/tailwind_brainfrags
빌드: vite build → dist/
배포: GitHub Actions (main push 시 자동)
도메인: public/CNAME = brainfrags.com
```

### DNS 전환 (구 glitch9.dev → brainfrags.com, GitHub Pages)
`brainfrags.com`의 DNS 레코드를 등록하고, 기존 `glitch9.dev`는 이 도메인으로 리다이렉트:

| 타입 | 호스트 | 값 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | brainfrags.github.io |

> ⚠️ **전환 순서**: GitHub Pages에서 빌드 확인 → DNS 변경 → 전파(최대 24h) 대기 → HTTPS(Let's Encrypt) 자동 발급 확인 → 그 다음 카페24 워드프레스 정리. 기존 사이트는 백업 후 최소 1개월 유지 권장.

### SEO / 마이그레이션 체크리스트
- [ ] 기존 URL 목록 확보 (WordPress export XML)
- [ ] 변경된 URL은 정적 리다이렉트 페이지 or `404.html` 처리
- [ ] `sitemap.xml`, `robots.txt` 생성
- [ ] OG 이미지 / 메타태그 (언어별)
- [ ] Google Search Console 도메인 재등록 + 사이트맵 제출

---

## 7. 작업 단계

| 단계 | 내용 | 상태 |
|---|---|---|
| 0 | 기존 사이트 콘텐츠 확보 (WP export) | ⏳ 진행 중 |
| 1 | 설계 문서 | ✅ |
| 2 | 프로젝트 스캐폴드 + 디자인 토큰 | → |
| 3 | 랜딩 페이지 프로토타입 (홈 1페이지) | → |
| 4 | 방향 확인 후 나머지 페이지 | 대기 |
| 5 | 콘텐츠 채우기 (3개국어) | 대기 |
| 6 | 배포 + DNS 전환 | 대기 |

---

## 8. 미결정 사항

- [ ] 기존 WordPress 콘텐츠 중 이관할 항목 (export 확인 후)
- [ ] 로고 에셋 — 기존 로고 재사용 vs 리디자인
- [ ] Blog/News를 마크다운 파일 기반으로 할지, 외부(GitBook/Notion) 임베드로 할지
- [ ] 문의 폼 백엔드 — EmailJS (AIDevKit2에서 사용 중) 재사용 여부
- [ ] Munchkin Production 브랜드를 사이트에 노출할지
