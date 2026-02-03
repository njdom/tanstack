export type PresentationLink = {
  label: string;
  href: string;
};

export type PresentationChecklistItem = {
  id: string;
  label: string;
  hint?: string;
};

export type PresentationTableRow = {
  aspect: string;
  start: string;
  next: string;
};

export type PresentationTable = {
  headers: [string, string, string]; // Aspect, Start, Next
  rows: PresentationTableRow[];
};

export type PresentationSlide = {
  id: string;
  title: string;
  timebox?: string;
  goal?: string;
  onScreen?: string[];
  table?: PresentationTable;
  say?: string[];
  demoChecklist?: PresentationChecklistItem[];
  links?: PresentationLink[];
};

export const tanstackStartDeckId = 'tanstack-start-vs-nextjs.v1';

export const tanstackStartDeckTitle = 'TanStack Start (vs Next.js)';

export const tanstackStartSlides: PresentationSlide[] = [
  {
    id: 'title',
    title: 'Title / Setup',
    timebox: '0:15',
    goal: 'Set expectations: Start framework only, Router deep-dive later.',
    onScreen: [
      'Today: TanStack Start — pros/cons vs Next.js',
      'Not today: TanStack Router deep dive (separate video)',
      'Goal: leave with a clear mental model + demo plan',
    ],
    say: [
      'Today we’ll focus on TanStack Start as a full-stack React framework and compare it to Next.js at the decision level.',
      'We will use Router features as needed, but we’ll save the Router deep dive for a separate video.',
    ],
  },
  {
    id: 'what-is-start',
    title: 'What is TanStack Start?',
    timebox: '0:45',
    goal: 'Define Start in 2 sentences and list the “framework” features.',
    onScreen: [
      'Full-stack React framework powered by TanStack Router + Vite',
      'Full-document SSR + streaming',
      'Server Functions (typed RPC)',
      'Server/API Routes, Middleware, Context',
      'Full-stack bundling + “universal deployment” mindset',
    ],
    say: [
      'TanStack Start is a full-stack React framework powered by TanStack Router and Vite.',
      'It aims for explicit control, type safety, and deployment freedom, while still giving you SSR/streaming and a server layer.',
    ],
    links: [
      { label: 'Start Overview (docs)', href: 'https://tanstack.com/start/latest/docs/framework/react/overview' },
    ],
  },
  {
    id: 'mental-model',
    title: 'TanStack Start vs Next.js',
    timebox: '1:30',
    goal: 'Frame the comparison as defaults + mental model, not a checklist war.',
    onScreen: [
      'Next.js: platform-first, convention-heavy, RSC-first defaults',
      'Start: developer-first, explicit primitives, interactive-by-default React',
      // 'Both can SSR; difference is how you control it and how predictable it feels',
    ],
    say: [
      'Choosing Start vs Next is less about “can it do X” and more about defaults and mental model.',
      'Start leans into explicit primitives and end-to-end type safety; Next leans into conventions, platform integration, and RSC-by-default ergonomics.',
    ],
    table: {
      headers: ['Aspect', 'TanStack Start', 'Next.js'],
      rows: [
        {
          aspect: 'Philosophy',
          start: 'Developer control, explicit patterns',
          next: 'Platform integration, conventions',
        },
        { aspect: 'Components', start: 'Interactive by default, opt into RSC', next: 'Server Components by default' },
        { aspect: 'Type safety', start: 'End-to-end, compile-time', next: 'TypeScript support with boundary gaps' },
        {
          aspect: 'Server functions',
          start: 'Typed, validated, middleware support',
          next: 'Untyped boundary, no middleware',
        },
        { aspect: 'Caching', start: 'Explicit SWR primitives', next: 'Multi-layer implicit caching' },
        { aspect: 'Build tool', start: 'Vite', next: 'Turbopack/Webpack' },
        { aspect: 'Deployment', start: 'Equal support everywhere', next: 'Optimized for Vercel' },
        { aspect: 'Routing', start: 'Best-in-class type safety', next: 'File-based, basic types' },
        { aspect: 'RSC', start: 'Supported', next: 'Supported' },
        { aspect: 'Maturity', start: '2+ years, approaching 1.0', next: '8+ years, historically unstable APIs' },
      ],
    },
    links: [
      {
        label: 'Start vs Next.js (docs)',
        href: 'https://tanstack.com/start/latest/docs/framework/react/start-vs-nextjs',
      },
    ],
  },
  {
    id: 'demo-from-scratch-plan',
    title: 'Demo 1 — From scratch: what to show',
    timebox: '0:30',
    goal: 'Align the audience: we’ll do minimal code to understand Start.',
    onScreen: [
      '1) `__root.tsx` as the root layout',
      '2) `index.tsx` like the home page',
      '3) File-based routing matches folders',
      '4) Typesafe `Link` demo (quick)',
      '5) `loader` + `Route.useLoaderData()`',
      '6) First look at Server Functions (client ↔ server)',
    ],
  },
  {
    id: 'root-layout',
    title: '`__root.tsx` = root layout',
    timebox: '0:45',
    goal: 'Show where document shell and global layout live.',
    onScreen: [
      'Open: `src/routes/__root.tsx`',
      'Explain: document shell + where children render',
      'Point out devtools if useful',
    ],
    demoChecklist: [
      { id: 'open-root', label: 'Open `src/routes/__root.tsx`' },
      { id: 'callout-shell', label: 'Call out document shell (HeadContent/Scripts)' },
      { id: 'callout-children', label: 'Show where `{children}` renders' },
    ],
  },
  {
    id: 'index-page',
    title: '`index.tsx` = home page',
    timebox: '0:45',
    goal: 'Show the default route file and where data loads.',
    onScreen: ['Open: `src/routes/index.tsx`', 'Call out: `loader` returning data', 'Use: `Route.useLoaderData()`'],
    demoChecklist: [
      { id: 'open-index', label: 'Open `src/routes/index.tsx`' },
      { id: 'show-loader', label: 'Highlight the `loader` function' },
      { id: 'show-useLoaderData', label: 'Highlight `Route.useLoaderData()` usage' },
    ],
  },
  {
    id: 'file-routing',
    title: 'File-based routing: URL matches folders',
    timebox: '0:45',
    goal: 'Make routing feel “automatic” without deep router theory.',
    onScreen: ['Show: `src/routes/...` structure', 'Create/mention a new route file and navigate to it'],
    say: ['The route tree is inferred from files. You don’t register routes manually; you organize files.'],
  },
  {
    id: 'typesafe-link',
    title: 'Typesafe Links (quick win)',
    timebox: '0:45',
    goal: 'Demonstrate compile-time guarantees (no broken links).',
    onScreen: ['Show a working `<Link to="...">`', 'Trigger a TS error by changing the path (brief)'],
    say: ['This is one of the underrated benefits: broken links become type errors instead of runtime surprises.'],
  },
  {
    id: 'server-functions',
    title: 'Server Functions (Start) vs Server Actions (Next)',
    timebox: '1:30',
    goal: 'Explain the “typed RPC” value and why it matters in teams/AI coding.',
    onScreen: [
      'Server Functions: explicit RPC calls',
      'Type inference end-to-end (inputs + outputs)',
      'Validation + middleware as first-class',
      'Clear mental model: call server code, get typed result',
    ],
    demoChecklist: [
      {
        id: 'show-server-fn',
        label: 'Open a server function file (e.g. `src/server/product.functions.ts`)',
        hint: 'Pick the simplest function.',
      },
      { id: 'call-from-ui', label: 'Show it being used from a loader or component' },
      { id: 'emphasize-types', label: 'Say: “types are correctness, not just DX”' },
    ],
  },
  {
    id: 'ssr-default',
    title: 'Demo 2 — SSR by default (interactive React)',
    timebox: '1:00',
    goal: 'Explain Start’s “interactive by default” approach.',
    onScreen: ['Start SSRs the document and hydrates', 'Components are interactive by default (classic React SSR)'],
  },
  {
    id: 'hydration-error',
    title: 'Hydration errors (teach the pitfall)',
    timebox: '1:15',
    goal: 'Show a real mismatch and explain common causes.',
    onScreen: [
      'Mismatch: server HTML differs from client render',
      'Common causes: locale/timezone, Date.now, random IDs',
    ],
    demoChecklist: [
      { id: 'show-hydration-warning', label: 'Trigger/show a hydration warning in `/shop`' },
      { id: 'explain-why', label: 'Explain: non-deterministic rendering between server and client' },
    ],
    links: [
      {
        label: 'Hydration Errors (docs)',
        href: 'https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors',
      },
    ],
  },
  {
    id: 'fix-hydration',
    title: 'Fixes: `<ClientOnly>` + Selective SSR',
    timebox: '1:30',
    goal: 'Show the pragmatic tools: isolate instability or change SSR mode.',
    onScreen: ['Use `<ClientOnly>` for unstable UI parts', "Use route `ssr: 'data-only'` (or `false`) when needed"],
    demoChecklist: [
      { id: 'client-only', label: 'Wrap unstable UI with `<ClientOnly>`' },
      { id: 'data-only', label: "Toggle route `ssr: 'data-only'` and explain the trade-off" },
    ],
  },
  {
    id: 'api-routes',
    title: 'API Routes / Server Routes',
    timebox: '1:00',
    goal: 'Explain the “HTTP endpoints in the same project” story.',
    onScreen: ['Server/API routes for classic HTTP', 'Server Functions for typed RPC'],
    demoChecklist: [
      { id: 'open-api-route', label: 'Open `src/routes/api/...` and show an endpoint' },
      { id: 'hit-endpoint', label: 'Call it (browser/fetch) and show the response' },
    ],
  },
  {
    id: 'deployment',
    title: 'Universal deployment (the pitch)',
    timebox: '0:45',
    goal: 'Emphasize “deployment target is your decision.”',
    onScreen: ['Built on Vite ecosystem', 'Aim: run on many providers/runtimes without lock-in'],
  },
  {
    id: 'pros-cons',
    title: 'Pros / Cons (Start vs Next) — the honest slide',
    timebox: '2:00',
    goal: 'Leave the audience with a fair decision framework.',
    onScreen: [
      'Pros: explicit primitives, type safety, Vite DX, router capabilities, predictable caching model',
      'Cons: smaller ecosystem/mindshare, fewer “copy-paste” answers, RC maturity trade-offs',
      'Rule of thumb: interactive apps + types/control → Start; content platform + ecosystem inertia → Next',
    ],
  },
  {
    id: 'close',
    title: 'Close / Next steps',
    timebox: '0:15',
    goal: 'Point to the next video: Router deep dive.',
    onScreen: ['Next video: TanStack Router deep dive', 'This deck is your recurring checklist'],
  },
];
