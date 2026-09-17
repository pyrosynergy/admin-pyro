# PyroSynergy Codebase Style Guide & Conventions

This document records the actual architectural, styling, and code conventions used across the PyroSynergy codebase. It serves as an authoritative reference for human developers and AI coding agents when maintaining, extending, or refactoring the project.

---

## 1. Project Structure

The repository is structured as a monorepo containing a React/Vite frontend and a Node.js/Express backend under the `admin-pyro/` directory:

```text
pyrosynergy/
├── package.json                   # Root package metadata
├── admin-pyro/
│   ├── backend/                   # Node.js + Express API server
│   │   ├── config/                # Database connection and CORS origins
│   │   ├── middleware/            # JWT authentication, Multer/Cloudinary file upload
│   │   ├── models/                # Mongoose database models (User, Employee, Questionnaire)
│   │   ├── routes/                # API route handlers (auth, adminEmployees, questionnaire, verify)
│   │   ├── scripts/               # Migration and seed scripts
│   │   ├── utils/                 # Emailing and helper utilities
│   │   ├── server.js              # Express app entry point
│   │   └── package.json
│   └── frontend/                  # React 19 + Vite client application
│       ├── public/                # Static public assets (favicons, manifests, robots.txt)
│       ├── src/
│       │   ├── assets/            # Images (WebP/PNG), SVGs, and local font files
│       │   │   ├── flobites/      # Assets scoped to FloBites case study
│       │   │   ├── viali/         # Assets scoped to Viali case study
│       │   │   └── fonts/         # Local font files (e.g. arlette-heavy.otf)
│       │   ├── components/        # Feature & UI components (each in its own folder)
│       │   │   ├── Admin/         # Internal admin console and employee manager
│       │   │   ├── BackToTop/     # Floating back-to-top scroll trigger
│       │   │   ├── CookieConsent/ # GDPR/cookie banner integration
│       │   │   ├── DecodeQuestionnaire/ # /decode multi-step interactive pipeline
│       │   │   ├── EmpathyBanner/ # Mid-page narrative banner
│       │   │   ├── FAQ/           # Collapsible FAQ accordion with JSON-LD schema
│       │   │   ├── Footer/        # Global multi-column responsive footer
│       │   │   ├── Founder/       # "Behind the Scenes" founder spotlight
│       │   │   ├── Header/        # Floating glassmorphic top navbar
│       │   │   ├── Hero/          # Animated above-the-fold hero section
│       │   │   ├── Hiring/        # Careers overview and role-specific intern postings
│       │   │   ├── Loading/       # Splash loading screen
│       │   │   ├── NotFound/      # 404 error page
│       │   │   ├── PolicyPages/   # Legal documents (Privacy, Refund, Terms, Cookies)
│       │   │   ├── Questionnaire/ # /realitycheck interactive pipeline
│       │   │   ├── RouteErrorBoundary/ # React Error Boundary catching chunk failures
│       │   │   ├── SEO/           # Route metadata (title, meta, OpenGraph, canonical)
│       │   │   ├── ScrollToTop/   # Manual scroll restoration keyed on location.key
│       │   │   ├── Verify/        # Certificate/employee verification route
│       │   │   ├── Welcome/       # Onboarding / post-submission splash
│       │   │   ├── banner/        # Multi-row infinite scrolling service pill marquee
│       │   │   ├── case-studies/  # Case study directory and sub-studies (Flobites, Viali)
│       │   │   │   ├── flobites/sections/  # Decomposed modular sections
│       │   │   │   └── viali/sections/     # Decomposed modular sections
│       │   │   ├── pyrostack/     # Interactive timeline & framework showcase
│       │   │   ├── testimonials/  # Founder reviews (desktop bento / mobile carousel)
│       │   │   └── why-us/        # Value proposition carousel with interactive cursor
│       │   ├── hooks/             # Custom React hooks (e.g. useIsMobile.js)
│       │   ├── lib/               # Shared non-React utilities (calendar, cookieConsent)
│       │   ├── App.css            # Global resets, keyframes, scrollbar, route error styling
│       │   ├── App.jsx            # Route registry, chrome layout, code splitting
│       │   ├── index.css          # Minimal browser base reset and system font fallback
│       │   └── main.jsx           # App bootstrapping and chunk reload recovery handler
│       ├── eslint.config.js       # ESLint 9 flat configuration
│       ├── index.html             # Document head, preconnected Google Fonts, root div
│       ├── package.json           # Frontend dependencies and scripts
│       ├── vercel.json            # Deployment routing and immutable cache headers
│       └── vite.config.js         # Vite configuration, dev proxy, vendor chunk splitting
```

---

## 2. Naming Conventions

### 2.1 Components
- **PascalCase** for component names and their primary files:
  - `Header.jsx`, `WhyUs.jsx`, `RouteErrorBoundary.jsx`, `AddEmployeeTab.jsx`.
- **Co-located stylesheets** share the component's name:
  - `Header.jsx` imports `./Header.css`.
  - `WhyUs.jsx` imports `./WhyUs.css`.
- *Inconsistency Note:* Folders under `src/components/` mostly use PascalCase (`Header`, `PolicyPages`, `DecodeQuestionnaire`), but some legacy folders use kebab-case or lower-case: `banner/`, `case-studies/`, `why-us/`, `pyrostack/`, `testimonials/`. New components should use PascalCase.

### 2.2 Files and Directories
- Component files: `ComponentName.jsx`
- Stylesheets: `ComponentName.css` or `SectionName.css`
- Utilities and helper modules: `camelCase.js` (e.g., `calendar.js`, `cookieConsent.js`, `api.js`, `testimonialsData.js`).
- Hooks: `camelCase.js` prefixed with `use` (e.g., `useIsMobile.js`).
- Backend files:
  - Routes: `camelCase.js` (e.g., `adminEmployees.js`, `questionnaire.js`, `auth.js`).
  - Models: `PascalCase.js` (e.g., `Employee.js`, `Questionnaire.js`, `User.js`).
  - Middleware & configs: `camelCase.js` (e.g., `origins.js`, `db.js`, `upload.js`).

### 2.3 Variables and Functions
- **Variables**: `camelCase` for instances, primitives, and state (e.g., `isMenuOpen`, `currentScrollY`, `activeIndex`, `logosRef`).
- **Constants / Configs**: `UPPER_SNAKE_CASE` for file-level constants, timeouts, and route maps (e.g., `ADMIN_PATH`, `RELOAD_KEY`, `INTERVAL_MS`, `RESTORE_TIMEOUT_MS`, `ROUTES`, `VALIDITY_OPTIONS`).
- **Functions / Handlers**:
  - Event handlers: `handle` prefix (e.g., `handleNavClick`, `handleLinkClick`, `handleOverlayClick`, `handleKeyDown`).
  - Action / Helper functions: Imperative verbs in `camelCase` (e.g., `openCalendarPopup`, `formatDate`, `toInputDate`, `apiFetch`).

### 2.4 CSS Classes
Three conventions are present across the codebase:
1. **Feature-prefixed kebab-case** (Most common):
   - Hero: `.hero-heading`, `.hero-desc`, `.hero-stats`, `.hero-button`, `.discovery-button`.
   - FAQ: `.faq-section`, `.faq-title`, `.faq-cta-box`, `.faq-question`, `.faq-answer`.
   - Header: `.top-nav`, `.main-navigation`, `.brand-logo-link`, `.nav-links`.
2. **BEM-like abbreviated prefixes** (Testimonials and Case Studies):
   - Testimonials: `.pt-card`, `.pt-card--a`, `.pt-card--b`, `.pt-b-metric`, `.pt-bento-columns`.
   - Case Studies: `.cs-section`, `.cs-card`, `.cs-card--viali`, `.cs-card-media`.
3. **Design-system namespace prefix** (Questionnaires):
   - `.ds-section`, `.ds-card`, `.ds-option`, `.ds-option-selected`.
- *Inconsistency to avoid:* Avoid typo class names such as `.-button:hover` (found in `Hero.css`). Always ensure the class name matches its declaration.

### 2.5 IDs
- **kebab-case or lower-case** used for in-page smooth-scrolling anchors:
  - `id="home"`, `id="work"`, `id="howitworks"`, `id="founder"`, `id="faq"`, `id="contact"`.

---

## 3. React / Frontend Patterns

### 3.1 Component Declarations
- Functional components written with arrow functions are preferred for all standard components:
  ```jsx
  const ComponentName = ({ propA, propB = defaultValue }) => {
    // Hooks & logic
    return (
      <section className="component-class">
        {/* JSX */}
      </section>
    );
  };

  export default ComponentName;
  ```
- Top-level `App` uses a function declaration: `function App() { ... }`.
- Class components are used **only** when mandatory by React (specifically `RouteErrorBoundary.jsx` which requires `componentDidCatch` and `getDerivedStateFromError`).

### 3.2 Props & State Management
- **Destructured Props**: Destructure props directly in the function signature with default values when appropriate (`const FAQ = ({ openCalendarPopup = () => {} }) => { ... }`).
- **Local State**: State is localized using `useState` and `useRef`. No global state manager (Redux, Zustand) is installed; state is shared via prop passing or URL state (`react-router-dom`).
- **Ref Synchronization**: Synchronize mutable state in refs when accessed inside async timeouts or event listeners (e.g., `logosRef.current = logos;`).

### 3.3 Routing and Code Splitting
- **Route Definitions**: Managed in `App.jsx` using `react-router-dom` v7.
- **Route Metadata Map**: Centralized `ROUTES` object in `App.jsx` configures page metadata and chrome visibility:
  ```javascript
  const ROUTES = {
    '/': { header: true, footer: true },
    '/decode': {
      header: true,
      footer: false,
      meta: {
        title: 'Decode Your Business | PyroSynergy',
        description: '...'
      }
    }
  };
  ```
- **Code Splitting Strategy**:
  - Above-the-fold & critical chrome (`Header`, `Hero`, `Footer`, `SEO`, `ScrollToTop`, `CookieConsent`, `RouteErrorBoundary`) are imported **eagerly**.
  - Below-the-fold sections and individual routes are loaded via **`React.lazy()`** inside a single `<Suspense>` wrapper:
    ```jsx
    const WhyUs = lazy(() => import("./components/why-us/WhyUs.jsx"));
    ```
- **Chunk Failure Recovery**:
  - `main.jsx` listens to the `vite:preloadError` event and executes a single guarded `window.location.reload()` using `sessionStorage`.
  - `RouteErrorBoundary.jsx` wraps `<Routes>` to present a user-facing retry button if chunks fail completely.

### 3.4 SEO and Metadata
- React 19 natively hoists `<title>`, `<meta>`, and `<link>` elements placed anywhere in the render tree into `document.head`.
- All routes use the custom `<SEO>` component (`src/components/SEO/SEO.jsx`) rather than third-party libraries (no `react-helmet`).
- Structured data (`schema.org` JSON-LD) is rendered as `<script type="application/ld+json">` directly inside JSX (as seen in `FAQ.jsx` and `index.html`).

### 3.5 Scroll Restoration
- Smooth scrolling between anchor targets uses `element.scrollIntoView({ behavior: 'smooth' })`.
- Cross-route scroll position is managed by `ScrollToTop.jsx`, which sets `window.history.scrollRestoration = 'manual'` and manages scroll resets on `PUSH` vs position restorations on `POP` (back/forward).

---

## 4. CSS & UI Style

### 4.1 Technology Choice
- **Vanilla CSS** is used exclusively. No CSS preprocessors (SASS/SCSS), CSS Modules, or utility frameworks (TailwindCSS) are used.
- Component styles are co-located in individual `.css` files imported directly into JSX.

### 4.2 Color Palette

#### Dark Backgrounds & Neutrals
- Primary Dark Background: `#0d0b02` (body, root, main canvas)
- Deep Black: `#000000` (footer, hero top pill)
- Section Contrast Black: `#050505` (Founder & PyroStack dark panels)
- Dark Purple Wash: `#1a1a2e`, `#16213e`, `#0f0f23` (used in pipeline radial gradients)

#### Light Sections & Washes
- Lilac Wash Panel: `linear-gradient(290.63deg, #ECCEFF 0.93%, #FCF7FF 46.2%, #ECCEFF 100%)` (shared Empathy + FAQ panel)
- WhyUs Section: `linear-gradient(180deg, #fafafe 0%, #f3eef8 50%, #eee8f5 100%)`
- Banner Background: `#eee8f5`
- Case Study Light Background: `#fbf8f5`

#### Text Colors
- Dark mode primary: `#E8E4E4`, `#ffffff`
- Dark mode secondary: `#ccc`, `rgba(255, 255, 255, 0.85)`, `rgba(255, 255, 255, 0.65)`
- Light mode primary: `#1E102B`, `#000000`, `#1e1e1e`
- Light mode secondary: `#333333`, `#888888`

#### Accent & Gradient Colors
- Primary Brand Gradient: `linear-gradient(90deg, #D6C7F5 0%, #9279C3 100%)` (Hero CTA buttons, badges)
- Electric Neon Text Gradient: `linear-gradient(90deg, #d904ff 42.35%, #003cff 56.08%)`
- Multi-stop Brand Highlight: `linear-gradient(90deg, #d84aee 0%, #af3cc1 20%, #875ceb 45%, #6d49c2 60%, #1c4fbd 80%, #2563e8 100%)`
- Soft Violet / Italic: `linear-gradient(90deg, #c7b2ff 0%, #9d79ea 100%)`
- Primary Blue CTA: `linear-gradient(90deg, #0043F4 0%, #00278E 100%)` or solid `#0051ff`

### 4.3 Typography

#### Font Loading Rule (Critical)
- **Never `@import` fonts in CSS files.**
- All web fonts are loaded in a single non-blocking `<link>` tag in `index.html` with preconnect headers:
  - *Albert Sans*, *Bricolage Grotesque*, *Plus Jakarta Sans*, *DM Sans*, *Space Grotesk*, *Inter*, *Libre Baskerville*, *Architects Daughter*, *Caveat*, *Playfair Display*.
- Local font `@font-face` is registered in `App.css`:
  - `Arlette Heavy` (`./assets/fonts/arlette-heavy.otf`).

#### Font Families & Hierarchy
- **Base / UI font**: `"Albert Sans", sans-serif` (applied to `#root`)
- **Display / Heading accents**: `"Bricolage Grotesque", sans-serif`
- **Technical / Metric accents**: `"Space Grotesk", sans-serif`
- **Case studies & Framework**: `'Plus Jakarta Sans', sans-serif`
- **Value cards & Editorial**: `'DM Sans', sans-serif`

#### Text Clipping Pattern
Used extensively for vibrant gradient text across sections:
```css
.highlight-text {
  background: linear-gradient(90deg, #d84aee 0%, #af3cc1 20%, #875ceb 45%, #6d49c2 60%, #1c4fbd 80%, #2563e8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
```

### 4.4 Glassmorphism & Borders
- Floating navbars and cards use frosted-glass techniques:
  ```css
  background: rgba(73, 54, 105, 0.72);
  backdrop-filter: blur(12px) saturate(1.4);
  -webkit-backdrop-filter: blur(22px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 8px 32px rgba(42, 24, 70, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  ```

### 4.5 Buttons & Interactive Elements
- **Pill Buttons**: Rounded corners (`border-radius: 999px` or `border-radius: 50px`).
- **Primary Action CTA**:
  - Gradient: `linear-gradient(90deg, #D6C7F5 0%, #9279C3 100%)`
  - Text color: `#0d0b02`
  - Hover: subtle lightness lift (`#e3d8fa` -> `#a894d4`) and `transform: translateY(-1px)`.
- **Secondary / Ghost CTA**:
  - Background: `rgba(56, 32, 92, 0.4)`
  - Border: `1px solid rgba(255, 255, 255, 0.2)`
  - Text color: `#E8E4E4`

### 4.6 Body Scroll and Overflow Lock
- Global `html` and `body` overflow-x is constrained using `overflow-x: clip` in `App.css`:
  - *Do NOT use `overflow-x: hidden` or `overflow-y: auto` on `body`*, as that creates a phantom scroll container that breaks `position: sticky`.
- When locking scroll for overlays or modal dialogs:
  - Set `document.body.style.overflow = "hidden";`
  - Restore with `document.body.style.overflow = "";` (never set to `"auto"`).

---

## 5. Code Style

### 5.1 Formatting Conventions
- **Indentation**: 2 spaces.
- **Quotes**:
  - Single quotes (`'`) for JS imports, string literals, and CSS font names.
  - Double quotes (`"`) are used in JSX attributes (`className="top-nav"`), though single quotes appear in some files. Single quotes for JS, double quotes for JSX is preferred.
- **Semicolons**: Consistently used at the end of statements (`semi: true`).
- **Trailing Commas**: Used in multi-line object and array literals.

### 5.2 Import Order
Imports in components generally follow this order:
1. React core hooks & libraries (`React`, `useState`, `useEffect`, `useRef`, etc.)
2. Third-party packages (`react-router-dom`, `react-icons`, `lenis`)
3. Co-located component stylesheet (`import './ComponentName.css'`)
4. Child or sibling components (`import Header from '../Header/Header.jsx'`)
5. Custom hooks & local libraries (`import useIsMobile from '../../hooks/useIsMobile'`)
6. Static assets (images, logos, SVGs)

### 5.3 Error Handling
- **API calls**: Enclose network requests in `try/catch`. Throw descriptive errors containing response status codes or backend messages:
  ```javascript
  if (!res.ok) {
    const error = new Error((data && data.message) || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  ```
- **Storage guards**: Wrap calls to `sessionStorage` or `localStorage` in `try/catch` to avoid crashes in private browsing or constrained environments.

### 5.4 Comments
- High-level architectural context and rationale are heavily documented with multi-line block comments explaining *why* a particular fix was implemented (e.g., explaining Safari quirks, layout shifts, or chunk loading).
- Section header dividers in CSS files:
  ```css
  /* ── 1. GLOBAL & ROOT STYLES ── */
  ```

---

## 6. Responsive Design

### 6.1 Breakpoints

The project uses the following responsive thresholds:

| Breakpoint | Target Screen | Primary Behavior |
|---|---|---|
| `> 1024px` | Desktop / Wide Laptop | Full horizontal nav, bento grids, hover transitions, max container widths |
| `768px` / `767px` | Tablet / Mobile breakpoint | Nav collapses to hamburger pill, bento switches to mobile view, stats stack |
| `600px` | Small Tablet / Phablet | Custom cursors disabled, multi-step questionnaires adjust padding |
| `480px` / `380px` | Mobile (iPhone SE, Galaxy S8) | Pill padding reduced, logo resized, font sizes clamped to narrow viewport |

#### Inconsistency Notice
- `Header.css` has a breakpoint written as `@media (max-width: 786px)`. This is an accidental transposition of `768px`. Standard mobile media queries should target `max-width: 768px` (or `max-width: 767px`).

### 6.2 Mobile Layout Conventions
1. **Fluid Typography & Spacing via `clamp()`**:
   - Headers and margins adapt smoothly across screen sizes without abrupt steps:
     ```css
     font-size: clamp(2.15rem, 4.65vw, 4.65rem);
     width: clamp(700px, 88vw, 1200px);
     ```
2. **Global Flex / Grid Reordering via `display: contents`**:
   - On mobile, parent wrappers are set to `display: contents`, allowing children to be reordered across visual columns using CSS `order` (`FAQ.css`, `Footer.css`).
3. **`text-wrap: balance`**:
   - Applied to headings, subtitles, and footer descriptions to prevent single-word line wraps on mobile.
4. **Conditional Mobile Rendering**:
   - Complex sections render a specialized mobile sub-component rather than overwhelming CSS with overrides (e.g. `isMobile ? <TestimonialsMobile /> : <TestimonialGrid />`).

---

## 7. Reusable Patterns

### 7.1 Centralized Booking / Calendar Action
Every "Book a Call" CTA across the entire application triggers a centralized opener:
```javascript
import { openCalendarPopup } from './lib/calendar.js';

// Passed as prop or invoked directly in onClick:
<button onClick={openCalendarPopup}>Book a Call</button>
```

### 7.2 Custom Hook: `useIsMobile`
Standard pattern for viewport detection using `matchMedia` (fires only on threshold change, not every frame):
```javascript
import useIsMobile from '../hooks/useIsMobile';

const MyComponent = () => {
  const isMobile = useIsMobile(768); // default breakpoint is 768
  return isMobile ? <MobileView /> : <DesktopView />;
};
```

### 7.3 Infinite Marquee Pill Animation
Used in `banner.jsx` and `Hero.jsx`:
- Dynamic calculation of track step via `useLayoutEffect` and `ResizeObserver`.
- Sets inline CSS variable `--pill-step` to ensure seamless looping without visual jumps.

### 7.4 Design Tokens via CSS Variables
Questionnaire components scope tokens under `:root` or a scoped `.ds-*` class:
```css
:root {
  --ds-bg: #0d0b02;
  --ds-card-bg: rgba(255, 255, 255, 0.05);
  --ds-card-border: rgba(255, 255, 255, 0.10);
  --ds-btn-primary-bg: #0051ff;
  --ds-text: #ffffff;
  --ds-body: #cccccc;
}
```

---

## 8. Do's and Don'ts

### DO's
- **DO** use `import.meta.env.VITE_*` and `import.meta.env.PROD` for client-side environment variables in Vite.
- **DO** load all Google Fonts via the single `<link>` in `index.html`.
- **DO** convert production imagery to `.webp` format and supply width/height or `decoding="async"`.
- **DO** use the `<SEO>` component to define per-route `<title>` and `<meta>` tags.
- **DO** use `overflow-x: clip` when preventing horizontal page overflow on `html` and `body`.
- **DO** use `openCalendarPopup` from `src/lib/calendar.js` for scheduling links.
- **DO** use `useIsMobile()` from `src/hooks/useIsMobile.js` when conditional JSX is needed based on viewport width.
- **DO** use `clamp()` for responsive font sizes and padding instead of managing dozens of rigid media queries.

### DON'Ts
- **DON'T** `@import` fonts inside component CSS files.
- **DON'T** use `process.env.NODE_ENV` in frontend Vite code (it will throw `process is not defined` unless polyfilled; use `import.meta.env.PROD` instead).
- **DON'T** set `overflow-y: auto` or `overflow-x: hidden` on `body` (breaks `position: sticky`).
- **DON'T** use TailwindCSS or CSS Modules unless explicitly instructed.
- **DON'T** create new hand-rolled `window.matchMedia` listeners in components when `useIsMobile()` can be imported.
- **DON'T** install React Helmet or external title-management packages; React 19 natively hoists `<title>` and `<meta>`.
- **DON'T** inline raw Cal.com or Calendly URLs in component files; import `CALENDAR_URL` or `openCalendarPopup` from `src/lib/calendar.js`.

---

## 9. Code Examples

### 9.1 Preferred Component Pattern
```jsx
import React, { useState } from 'react';
import './FeatureCard.css';
import useIsMobile from '../../hooks/useIsMobile';
import { openCalendarPopup } from '../../lib/calendar';

const FeatureCard = ({ title, subtitle, metric, badgeText = 'Featured' }) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="feature-card">
      <div className="feature-card-header">
        <span className="feature-badge">{badgeText}</span>
        {metric && <span className="feature-metric">{metric}</span>}
      </div>

      <h3 className="feature-title">{title}</h3>
      <p className="feature-subtitle">{subtitle}</p>

      <button
        type="button"
        className="feature-cta-btn"
        onClick={openCalendarPopup}
      >
        Book a Call
      </button>
    </article>
  );
};

export default FeatureCard;
```

### 9.2 Preferred CSS Stylesheet Pattern
```css
/* ── Feature Card ── */
.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: clamp(20px, 3vw, 36px);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-sizing: border-box;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.28);
}

.feature-title {
  font-family: 'Albert Sans', sans-serif;
  font-size: clamp(1.4rem, 2vw, 1.85rem);
  font-weight: 500;
  color: #E8E4E4;
  margin: 0 0 12px 0;
  line-height: 1.25;
  letter-spacing: -0.5px;
  text-wrap: balance;
}

.feature-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: linear-gradient(90deg, #D6C7F5 0%, #9279C3 100%);
  color: #0d0b02;
  font-family: 'Albert Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 24px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.feature-cta-btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .feature-card {
    border-radius: 18px;
    padding: 20px 16px;
  }
}
```

### 9.3 Preferred API Client Pattern
```javascript
// src/components/Admin/api.js
const API_BASE = import.meta.env.PROD
  ? 'https://admin-pyro-backend.vercel.app'
  : 'http://localhost:5000';

export async function apiFetch(path, { method = 'GET', body } = {}) {
  const isFormData = body instanceof FormData;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON response body
  }

  if (!res.ok) {
    const error = new Error((data && data.message) || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}
```
