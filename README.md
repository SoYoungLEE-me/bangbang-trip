# 전국: 방방곡곡

## 국내 여행 정보 조회 & AI 여행 플래너

한국관광공사 **Tour API**와 **AI(Gemini 예정)** 를 활용한  
국내 여행 정보 조회 및 여행 일정 생성 서비스입니다.

<br>

## 🛠 기술 스택

### Frontend

- React
- TypeScript
- Vite

### UI / Styling

- MUI (Material UI)
- Inline 스타일 방식 (MUI `sx` prop 중심)

### Data Fetching & State

- @tanstack/react-query

### Routing

- react-router-dom

### Backend (BaaS)

- Supabase (Auth / Database)

### API

- 한국관광공사 Tour API
- AI API (Gemini 예정, 변경 가능)

<br>

## 📦 설치된 패키지

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install react-router-dom
npm install @tanstack/react-query
npm install @supabase/supabase-js
npm install lucide-react
```

<br>

## 📁 폴더 구조

```bash

├── node_modules
├── public
│   └── # 정적 리소스
│
├── src
│   ├── apis          # 외부 API 호출
│   ├── assets        # 이미지, 아이콘 등 정적 리소스
│   ├── common        # 공통 컴포넌트
│   ├── configs       # 환경설정 및 API 설정
│   ├── hooks         # 커스텀 훅 (API 로직)
│   ├── layouts       # 레이아웃 컴포넌트
│   ├── lib           # Supabase client 및 공통 라이브러리
│   ├── models        # TypeScript 타입 및 인터페이스
│   ├── pages         # 라우트 단위 페이지
│   ├── services      # Supabase 서비스 로직
│   ├── stores        # 전역 상태 관리 스토어
│   ├── utils         # 유틸 함수
│   │
│   ├── theme.ts      # MUI 테마 설정
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

<br>

## 📏 코드 컨벤션

- 상수명: 대문자 + 스네이크 케이스

- 파일명: PascalCase

- 클래스명: camelCase

<br>

## 🔀 커밋 컨벤션

| 타입   | 설명                           |
| ------ | ------------------------------ |
| feat   | 새로운 기능 / 컴포넌트 개발    |
| fix    | 버그 수정                      |
| design | 스타일 관련 코드               |
| chore  | 기타 수정 (설정, 구조 변경 등) |

#### 예시

```bash
feat: 기본 레이아웃 세팅
fix: 여행 리스트 렌더링 오류 수정
design: 메인 페이지 스타일 수정
```

<br>

## 🌿 브랜치 전략

- 이니셜-페이지명/기능명

#### 예시

```bash
feat-layout
feat-home
feat-planner
```
