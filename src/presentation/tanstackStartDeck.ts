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
      'Today we will focus on TanStack Start as a full-stack React framework and compare it to Next.js at the decision level.',
      'We will use Router features as needed, but we will save the Router deep dive for a separate video.',
    ],
  },
  {
    id: 'what-is-start',
    title: 'What is TanStack Start?',
    timebox: '0:45',
    goal: 'Define Start in 2 sentences and list the "framework" features.',
    onScreen: [
      'Full-stack React framework powered by TanStack ROUTER + Vite',
      'Type-First Architecture',
      'Full-document SSR + streaming',
      'Server Functions (typed RPC)',
      'Server/API Routes, Middleware, Context',
      '"universal deployment" mindset',
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
      'Choosing Start vs Next is less about whether it can do X and more about defaults and mental model.',
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
    id: 'pros-cons',
    title: 'Pros / Cons (Start vs Next) — the honest slide',
    timebox: '2:00',
    goal: 'Leave the audience with a fair decision framework.',
    onScreen: [
      'Pros: explicit primitives, type safety, Vite DX, router capabilities, predictable caching model',
      'Cons: smaller ecosystem/mindshare, RC maturity trade-offs',
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
