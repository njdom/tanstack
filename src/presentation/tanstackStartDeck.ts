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

export type PresentationSlideImage = {
  /** Public URL path, e.g. /presentation/tanstack-db-flow.png */
  src: string;
  alt: string;
  caption?: string;
  /** Sidebar section title in presenter view (default: "Diagram") */
  sectionTitle?: string;
};

export type PresentationSlide = {
  id: string;
  title: string;
  timebox?: string;
  goal?: string;
  onScreen?: string[];
  /** Optional diagram or screenshot shown above on-screen bullets */
  image?: PresentationSlideImage;
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
    title: 'Título / Preparación',
    timebox: '0:15',
    goal: 'Establecer expectativas: Solo framework Start, profundización en Router más tarde.',
    onScreen: [
      'Hoy: TanStack Start — pros/contras vs Next.js',
      'Hoy NO: Profundización en TanStack Router (video separado)',
      'Objetivo: salir con un modelo mental claro + plan de demo',
    ],
    say: [
      'Hoy nos enfocaremos en TanStack Start como framework React full-stack y lo compararemos con Next.js a nivel de decisión.',
      'Usaremos funciones de Router según sea necesario, pero guardaremos la profundización en Router para un video separado.',
    ],
  },
  {
    id: 'what-is-start',
    title: '¿Qué es TanStack Start?',
    timebox: '0:45',
    goal: 'Definir Start en 2 oraciones y listar las características del framework.',
    onScreen: [
      'Framework React full-stack potenciado por TanStack ROUTER + Vite',
      'Arquitectura Type-First (tipos primero)',
      'SSR de documento completo + streaming',
      'Funciones de Servidor (RPC tipado)',
      'Rutas Server/API, Middleware, Context',
      'Mentalidad de "despliegue universal"',
    ],
    say: [
      'TanStack Start es un framework React full-stack potenciado por TanStack Router y Vite.',
      'Busca control explícito, seguridad de tipos y libertad de despliegue, mientras te brinda SSR/streaming y una capa de servidor.',
    ],
    links: [
      { label: 'Start Overview (docs)', href: 'https://tanstack.com/start/latest/docs/framework/react/overview' },
    ],
  },
  {
    id: 'mental-model',
    title: 'TanStack Start vs Next.js',
    timebox: '1:30',
    goal: 'Enmarcar la comparación como valores predeterminados + modelo mental, no una guerra de checklists.',
    onScreen: [
      'Next.js: plataforma primero, convenciones pesadas, valores predeterminados RSC primero',
      'Start: desarrollador primero, primitivas explícitas, React interactivo por defecto',
      // 'Ambos pueden SSR; la diferencia es cómo lo controlas y qué tan predecible se siente',
    ],
    say: [
      'Elegir Start vs Next es menos sobre si puede hacer X y más sobre valores predeterminados y modelo mental.',
      'Start se inclina hacia primitivas explícitas y seguridad de tipos end-to-end; Next se inclina hacia convenciones, integración de plataforma y ergonomía RSC por defecto.',
    ],
    table: {
      headers: ['Aspecto', 'TanStack Start', 'Next.js'],
      rows: [
        {
          aspect: 'Filosofía',
          start: 'Control del desarrollador, patrones explícitos',
          next: 'Integración de plataforma, convenciones',
        },
        {
          aspect: 'Componentes',
          start: 'Interactivos por defecto, optar por RSC',
          next: 'Server Components por defecto',
        },
        {
          aspect: 'Seguridad de tipos',
          start: 'End-to-end, tiempo de compilación',
          next: 'Soporte TypeScript con brechas en límites',
        },
        {
          aspect: 'Funciones servidor',
          start: 'Tipadas, validadas, soporte middleware',
          next: 'Límite sin tipos, sin middleware',
        },
        { aspect: 'Caché', start: 'Primitivas SWR explícitas', next: 'Caché implícito multi-capa' },
        { aspect: 'Build tool', start: 'Vite', next: 'Turbopack/Webpack' },
        { aspect: 'Despliegue', start: 'Soporte igual en todos lados', next: 'Optimizado para Vercel' },
        { aspect: 'Routing', start: 'Seguridad de tipos de primera clase', next: 'Basado en archivos, tipos básicos' },
        { aspect: 'RSC', start: 'Soportado', next: 'Soportado' },
        { aspect: 'Madurez', start: '2+ años, acercándose a 1.0', next: '8+ años, APIs históricamente inestables' },
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
    title: 'Pros / Contras (Start vs Next) — opinión honesto',
    timebox: '2:00',
    goal: 'Dejar a la audiencia con un marco de decisión justo.',
    onScreen: [
      'Pros: Control del ssr, seguridad de tipos, DX de Vite, capacidades del router, modelo de caché predecible, adaptación con librerías tanstack',
      'Contras: ecosistema/mindshare más pequeño, trade-offs de madurez RC, documentación',
      "migrar a next: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js"
    ],
  },
  {
    id: 'close',
    title: 'Cierre / Próximos pasos',
    timebox: '0:15',
    goal: 'Apuntar al próximo video: profundización en Router.',
    onScreen: ['Próximo video: Profundización en TanStack Router', 'Esta presentación es tu checklist recurrente'],
  },
];
