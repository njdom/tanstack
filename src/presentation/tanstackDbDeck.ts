import type { PresentationSlide } from './tanstackStartDeck';
export type {
  PresentationSlide,
  PresentationSlideImage,
  PresentationChecklistItem,
  PresentationTable,
  PresentationLink,
} from './tanstackStartDeck';

export const tanstackDbDeckId = 'tanstack-db-ecommerce-demo.v1';

export const tanstackDbDeckTitle = 'TanStack DB — Demo en Vivo con una App de E-Commerce';

export const tanstackDbSlides: PresentationSlide[] = [
  // ─────────────────────────────────────────────────────────────────
  // SLIDE 1 — GANCHO  (0:00 – 0:30)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'hook',
    title: 'El Problema: Los Datos en el Cliente son un Caos',
    timebox: '0:30',
    goal: 'Establecer el dolor antes de presentar la solución.',
    onScreen: [
      'Toda app React termina siendo: useState + useEffect + fetch + loading + error + refetch + caché + actualización optimista…',
      '¿Y si tu cliente tuviera una base de datos real?',
      'Es como Tanstack Query + Live Queries + Optimistic Mutations',
    ],
    say: [
      'Si alguna vez has construido una app React con datos reales del servidor, ya conoces la historia.',
      'Empiezas con un fetch simple. Después añades estado de carga. Después estado de error.',
      'Luego necesitas volver a pedir datos después de una mutación. Después quieres una actualización optimista para que se sienta instantáneo.',
      'Después necesitas filtrar los datos en el cliente sin un viaje de ida y vuelta al servidor.',
      'Antes de darte cuenta, una sola funcionalidad tiene cincuenta líneas de código de fontanería.',
      'TanStack DB pregunta: ¿y si el cliente simplemente tuviera una base de datos real, con todas las queries y mutaciones del CRUD centralizadas y cero boilerplate?',
      'Vamos a ver exactamente cómo se ve eso en una app real.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 2 — QUÉ ES TANSTACK DB  (0:30 – 1:15)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'what-is-tanstack-db',
    title: '¿Qué es TanStack DB?',
    timebox: '0:45',
    goal: 'Definir los tres primitivos en lenguaje simple.',
    onScreen: [
      '1. Collections  — tablas en memoria tipadas que sincronizan con cualquier backend',
      '2. useLiveQuery — queries tipo SQL reactivas; la UI se actualiza sola cuando cambian los datos',
      '3. Mutaciones Optimistas — escribes localmente primero, sincronizas con el servidor en segundo plano',
    ],
    say: [
      'TanStack DB te da tres primitivos.',
      'Primero: Collections. Piénsalas como tablas en memoria tipadas. Las defines una vez con un schema y una función de query, y TanStack DB las mantiene sincronizadas con tu servidor automáticamente.',
      'Segundo: useLiveQuery. Aquí está la magia. Escribes queries que parecen SQL — con cláusulas where, order by, e incluso joins entre collections — pero son reactivas. Cualquier cambio de filtro, cualquier nuevo ítem en la colección, y la UI se actualiza al instante sin código extra.',
      'Tercero: Mutaciones Optimistas. Modificas la colección local y la UI reacciona de inmediato, sin esperar al servidor. TanStack DB sincroniza en segundo plano y hace rollback automático si el servidor falla.',
      'Vamos con las demos en una app de e-commerce real corriendo ahora mismo.',
    ],
    links: [
      { label: 'TanStack DB docs', href: 'https://tanstack.com/db/latest' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 3 — TOUR DEL STACK  (1:15 – 2:00)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'stack-tour',
    title: 'El Stack de la App',
    timebox: '0:45',
    goal: 'Orientar a la audiencia al repo antes de entrar al código.',
    onScreen: [
      'Framework:  TanStack Start (React, Vite, SSR)',
      'Routing:    TanStack Router (basado en archivos, type-safe)',
      'Client DB:  TanStack DB  ← el foco de hoy',
      'Estado:     TanStack Store',
      'Backend:    Server Functions → MongoDB',
      'Estilos:    Tailwind CSS',
    ],
    say: [
      'Aquí está el stack de la app de un vistazo. El framework es TanStack Start — un framework React full-stack construido sobre Vite que nos da SSR y server functions.',
      'El routing es TanStack Router — completamente type-safe con rutas basadas en archivos.',
      'La gestión de estado es TanStack Store — un primitivo reactivo muy liviano.',
      'Nuestro backend es MongoDB, accedido mediante Server Functions tipadas, sin boilerplate REST.',
      'Y el protagonista del video de hoy: TanStack DB en el cliente, conectando ese backend de MongoDB con la UI reactiva en vivo.',
      'Abro el navegador y recorremos la app corriendo.',
    ],
    demoChecklist: [
      { id: 'open-ide', label: 'Mostrar la estructura de carpetas del repo en el IDE' },
      { id: 'open-browser', label: 'Cambiar al navegador en localhost:3000' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 4 — DEMO 1: LIVE QUERIES  (2:00 – 4:00)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'demo-live-queries',
    title: 'Demo 1: useLiveQuery — Filtrado Reactivo Tipo SQL',
    timebox: '2:00',
    goal: 'Mostrar el DSL SQL y la reactividad instantánea sin re-fetches adicionales.',
    onScreen: [
      'src/hooks/useProductSearch.ts',
      'useLiveQuery((q) => q.from(...).where(ilike).orderBy(...))',
      'Operadores: eq, ilike, gte, lte, inArray',
    ],
    say: [
      'Empezamos con la funcionalidad principal de TanStack DB: useLiveQuery.',
      'Abre useProductSearch.ts. Este es todo el motor de filtrado de la tienda — y es solo una llamada a useLiveQuery.',
      'Mira el query builder. Empezamos con q.from, pasándole la colección de productos.',
      'Luego encadenamos cláusulas where con operadores tipo SQL: ilike para búsqueda de texto sin distinción de mayúsculas en el nombre del producto, eq para coincidencia exacta de categoría, inArray para filtrado multi-marca, gte y lte para el rango de precios, y otro eq para el flag de stock.',
      'Finalmente orderBy para el ordenamiento.',
      'Ahora mira lo que pasa en el navegador. Escribo "apex" en el buscador.',
      'La cuadrícula se actualiza al instante. Sin fetch. Sin estado de carga. Sin hack de debounce. La live query se re-evalúa contra la colección local y React re-renderiza.',
      'Agrego un filtro de marca encima. Los dos filtros se componen — lógica AND — completamente de forma declarativa.',
      'Cambio el orden a Precio: Menor a Mayor. Re-ordenamiento instantáneo.',
      'El punto clave: cada interacción de filtro es una query pura del lado del cliente contra la colección en memoria. Cero peticiones de red. Es el rendimiento de una app nativa con la simplicidad de una query SQL.',
    ],
    demoChecklist: [
      { id: 'open-hook', label: 'Abrir src/hooks/useProductSearch.ts — recorrer useLiveQuery' },
      { id: 'live-filter-text', label: 'En el navegador: escribir un término de búsqueda, mostrar filtrado instantáneo' },
      { id: 'live-filter-brand', label: 'Marcar un filtro de marca, mostrar composición (AND)' },
      { id: 'live-filter-price', label: 'Establecer un rango de precios, mostrar actualización en vivo' },
      { id: 'live-sort', label: 'Cambiar el orden, mostrar re-ordenamiento instantáneo' },
      { id: 'reset', label: 'Hacer clic en RESET ALL — los filtros se limpian, se restaura la lista completa' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 5 — DEMO 2: MUTACIÓN OPTIMISTA  (4:00 – 5:30)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'demo-optimistic-mutation',
    title: 'Demo 2: Mutación Optimista — La UI no Espera al Servidor',
    timebox: '1:30',
    goal: 'Mostrar la actualización optimista exitosa y luego el rollback automático ante un fallo del servidor — todo en la misma página.',
    image: {
      src: '/presentation/tanstack-db-flow.png',
      alt: 'Diagrama TanStack DB: flujo entre Componentes, Collections y Servidor — estado optimista, actualización de UI, persistencia de mutación y sincronización',
      caption:
        'Así encajan las mutaciones optimistas: el componente escribe primero en la colección (estado optimista) → la UI se actualiza al instante → la mutación se persiste en el servidor → el servidor confirma y mantiene la colección sincronizada.',
      sectionTitle: 'Flujo de mutaciones optimistas',
    },
    onScreen: [
      'localhost:3000/shop/$productId   — botón "Edit Price" bajo el precio',
      'src/routes/shop/$productId.tsx   — EditPriceInline + useLiveQuery',
      'src/db/products.db.ts            — onUpdate → updateProduct() / simulación de fallo',
      'src/server/product.functions.ts  — updateProduct (Server Function)',
    ],
    say: [
      'Ahora las mutaciones optimistas — el segundo gran primitivo de TanStack DB. El diagrama resume el ciclo: optimistic state en la colección, la UI reacciona, persistes la mutación al servidor y el sync mantiene todo alineado.',
      'Estamos en el detalle de un producto. Justo debajo del precio verás un pequeño botón "Edit Price".',
      'Haz clic. Se abre un formulario inline. Cambia el precio — digamos de $499 a $999.',
      'Observa la línea que dice "Simulate Server Failure" — por ahora está OFF. Dale a Save.',
      'El precio se actualiza INSTANTÁNEAMENTE en el título antes de que yo termine de hablar. No hay spinner. No hay petición de red visible. Eso es optimistic-first: el cliente escribe en la colección local y la UI reacciona al instante.',
      'Abajo aparece: "Optimistic update applied — syncing with server…". Unos milisegundos después: "Server confirmed!". El callback onUpdate envió la mutación a MongoDB en background.',
      'Ahora vamos a la parte dramática. Abre el formulario otra vez. Esta vez activa el toggle "Simulate Server Failure" — se pone rojo.',
      'Cambia el precio a otro valor cualquiera. Dale a Save. El precio cambia de inmediato — la mutación optimista se aplica igual.',
      'Pero mira… 1,5 segundos después el precio VUELVE al valor anterior. "Server rejected — price rolled back". TanStack DB detectó el error del servidor, deshizo el cambio en la colección y la UI reflejó el rollback automáticamente.',
      'Cero código de rollback manual. Cero gestión de estado de error. La colección hace todo.',
      'Abre products.db.ts. El callback onUpdate tiene una sola condición: si la flag de fallo está activa, espera 1,5s y lanza un error. TanStack DB captura ese throw y revierte la mutación. Si no falla, llama a updateProduct y persiste en MongoDB.',
    ],
    demoChecklist: [
      { id: 'navigate-product', label: 'Navegar a localhost:3000/shop — hacer clic en cualquier producto' },
      { id: 'show-edit-price-btn', label: 'Señalar el botón "Edit Price" bajo el precio del producto' },
      { id: 'show-live-query', label: 'Abrir src/routes/shop/$productId.tsx — resaltar useLiveQuery + EditPriceInline' },
      { id: 'show-on-update', label: 'Abrir src/db/products.db.ts — resaltar el callback onUpdate con el bloque de fallo' },
      { id: 'show-server-fn', label: 'Abrir src/server/product.functions.ts — resaltar updateProduct + updateProductSchema' },
      { id: 'demo-success', label: 'Navegador: clic en "Edit Price", cambiar precio, Save sin fallo → ver "Server confirmed!"' },
      { id: 'demo-failure', label: 'Clic en "Edit Price", activar "Simulate Server Failure", cambiar precio, Save → ver rollback en 1,5s' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 6 — DEMO 3: AGREGADOS CON groupBy  (5:30 – 7:00)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'demo-aggregates',
    title: 'Demo 3: Agregados Eficientes — groupBy + count en el Filtro de Categorías',
    timebox: '1:30',
    goal: 'Mostrar groupBy + count en vivo: el filtro de categorías calcula conteos sin re-fetch.',
    onScreen: [
      'localhost:3000/shop  — sidebar: filtro "CATEGORY" con badges de conteo',
      'src/hooks/useProductCountByCategory.ts   — groupBy + count',
      'src/components/shop/filters/CategoryFilter.tsx',
      'Funciones disponibles: count · avg · sum · min · max',
    ],
    say: [
      'Tercer primitivo que quiero mostrar: las queries con agregados.',
      'Miremos la barra lateral de la tienda. Ves un nuevo filtro: CATEGORY, y cada categoría tiene un número — el conteo de productos.',
      'Ese número no viene de una llamada adicional al servidor. Viene de un useLiveQuery con groupBy.',
      'Abre useProductCountByCategory.ts. La query empieza igual que siempre: q.from con la colección de productos.',
      'Luego groupBy por category — análogo al GROUP BY de SQL.',
      'Y en el select, en lugar de devolver campos simples, usamos count: una función de agregado que cuenta las filas de cada grupo.',
      'El resultado es un array de objetos { category, total } — perfectamente tipado.',
      'Lo importante: cuando añado un producto o cambio su categoría, los conteos se actualizan al instante sin ninguna lógica extra. Eso es la reactividad del differential data flow aplicada a agregados.',
      'Además de count tenemos avg, sum, min y max. Podemos calcular el precio medio por categoría, el rating máximo, el total de stock disponible… todo con el mismo patrón.',
    ],
    demoChecklist: [
      { id: 'open-shop-sidebar', label: 'Navegador: mostrar sidebar con filtro CATEGORY y sus badges de conteo' },
      { id: 'show-hook', label: 'Abrir src/hooks/useProductCountByCategory.ts — recorrer groupBy + count' },
      { id: 'show-component', label: 'Abrir src/components/shop/filters/CategoryFilter.tsx — mostrar cómo se renderizan los badges' },
      { id: 'click-category', label: 'En el navegador: clic en una categoría — ver que la grid se filtra y el badge permanece reactivo' },
      { id: 'compare-with-select', label: 'Comparar con useProductCategories.ts (solo .distinct()) vs el nuevo groupBy con count' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 7 — DEMO 4: SSR + HIDRATACIÓN DE COLECCIÓN  (7:00 – 8:30)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'demo-ssr-collection',
    title: 'Demo 4: Hidratación SSR — La Colección se Puebla sin Fetch Extra',
    timebox: '1:30',
    goal: 'Mostrar cómo los datos del servidor llegan a la colección en la primera carga.',
    onScreen: [
      'localhost:3000/shop  — sin spinner, productos en el HTML inicial',
      'src/routes/shop/index.tsx  — loader()',
      'src/db/products.db.ts       — createCollection() + setQueryData',
    ],
    say: [
      'Hemos visto live queries, mutaciones y agregados — los tres primitivos principales.',
      'Ahora una característica que hace especialmente potente combinarlo con TanStack Start: la hidratación SSR.',
      'Abre DevTools > Network y haz un hard refresh en localhost:3000/shop. Fíjate en que los productos ya están en la primera respuesta HTML — sin spinner de carga, sin flash de contenido vacío.',
      'Mira el archivo de ruta. El loader llama a getAllProducts — una Server Function tipada que consulta MongoDB — y devuelve el array.',
      'Abre products.db.ts. En el cliente, los datos del loader se inyectan directamente en el QueryClient mediante setQueryData.',
      'Esa una sola línea hidrata toda la colección desde los datos SSR. Sin segunda petición de red. La colección de TanStack DB está completamente poblada en el momento en que la página se renderiza.',
      'A diferencia de TanStack Query, que también soporta SSR, aquí los datos hidratados alimentan directamente las live queries — cualquier filtro o mutación posterior opera sobre esa colección ya poblada.',
    ],
    demoChecklist: [
      { id: 'open-shop', label: 'Navegar a localhost:3000/shop' },
      { id: 'network-tab', label: 'Abrir pestaña Network de DevTools, hard-reload, mostrar que la respuesta HTML contiene los productos' },
      { id: 'show-loader', label: 'Abrir src/routes/shop/index.tsx — resaltar loader()' },
      { id: 'show-collection', label: 'Abrir src/db/products.db.ts — resaltar createCollection + queryCollectionOptions' },
      { id: 'show-hydration', label: 'Abrir src/hooks/useProductSearch.ts — resaltar la llamada a queryClient.setQueryData' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 8 — NOVEDADES EN v0.5  (8:30 – 9:30)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'v05-problems-solved',
    title: 'Novedades en v0.5 — Los Dos Problemas Resueltos',
    timebox: '1:00',
    goal: 'Explicar qué bloqueaba el uso en producción antes de v0.5 y cómo se resolvió.',
    onScreen: [
      'TanStack DB v0.5 (core @tanstack/db) — antesala de la v1',
      'Problema 1 → Solución: Carga completa al inicio → Modos de sincronización (Eager / On Demand / Progresivo)',
      'Problema 2 → Solución: Sin paginación ni filtrado dinámico → On Demand carga solo lo que la query pide',
      'Bonus: Agregados eficientes con groupBy (count, avg, sum, min, max)',
    ],
    say: [
      'Antes de v0.5 había dos problemas que impedían usar TanStack DB en producción real.',
      'El primero: la colección cargaba TODOS los datos al iniciar. Con 100 productos está bien; con 100.000, no.',
      'El segundo: no había paginación ni filtrado dinámico del lado del servidor. Todo se filtraba en el cliente sobre los datos ya cargados.',
      'La versión 0.5 introduce los modos de sincronización para resolver exactamente eso.',
      'También llegan los agregados eficientes: groupBy con count, avg, sum, min y max directamente en el query builder.',
      'Vamos a ver ambas cosas en detalle.',
    ],
    table: {
      headers: ['Problema', 'Antes de v0.5', 'Solución en v0.5'],
      rows: [
        {
          aspect: 'Carga inicial',
          start: 'Toda la colección de golpe',
          next: 'Modo On Demand: carga solo lo que la query necesita',
        },
        {
          aspect: 'Paginación / Filtrado',
          start: 'Imposible en el servidor',
          next: 'parseLoadSubsetOptions convierte la query en params REST',
        },
        {
          aspect: 'Agregados (conteos, medias…)',
          start: 'Calcular manualmente con reduce',
          next: 'groupBy + count / avg / sum / min / max en el query builder',
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 9 — MODOS DE SINCRONIZACIÓN  (9:30 – 10:30)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'sync-modes',
    title: 'Modos de Sincronización: Eager, On Demand y Progresivo',
    timebox: '1:00',
    goal: 'Explicar los tres syncMode y cuándo usar cada uno, con el código clave.',
    onScreen: [
      'syncMode: "eager"     — carga toda la colección (por defecto, ideal < 10 k filas)',
      'syncMode: "on-demand" — carga solo lo que la query pide (ideal > 50 k filas, búsquedas, catálogos)',
      'syncMode: "progressive" — carga inmediata de un subconjunto + el resto en background (apps colaborativas)',
      '→ parseLoadSubsetOptions(ctx.meta?.loadSubsetOptions)  convierte filtros/orden/paginación en params de API',
      '→ Esta demo usa "eager" (SSR hidrata la colección completa en la primera carga)',
    ],
    say: [
      'TanStack DB introduce tres modos de sincronización que defines al crear la colección.',
      'Eager es el modo por defecto — el que usa esta app. Carga toda la colección de una vez. Funciona muy bien cuando hidratas desde SSR o cuando el dataset es pequeño.',
      'On Demand es el modo para catálogos grandes. La colección NO carga nada al arrancar. Cada vez que un componente ejecuta una live query con filtros o paginación, esos parámetros se pasan automáticamente al queryFn vía ctx.meta.loadSubsetOptions.',
      'Ahí entra parseLoadSubsetOptions: convierte esas opciones en parámetros de URL listos para mandar al backend — category, sort, limit, offset, etc.',
      'Y si dos componentes hacen la misma query, TanStack DB hace UNA sola llamada de red. Si amplías de 10 a 20 resultados, solo pide los 10 que faltan — subset matching.',
      'Progressive combina lo mejor: renderiza inmediatamente con un subconjunto y sincroniza el resto en background. Ideal para apps colaborativas tipo Notion o Linear.',
      'El código de cambio es mínimo: solo añades syncMode a queryCollectionOptions.',
    ],
    demoChecklist: [
      { id: 'show-products-db', label: 'Abrir src/db/products.db.ts — señalar la ausencia de syncMode (eager por defecto)' },
      { id: 'show-on-demand-snippet', label: 'Mostrar snippet de on-demand: syncMode + parseLoadSubsetOptions en queryFn' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 10 — RECAPITULACIÓN DE TIPOS  (10:30 – 11:15)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'type-safety',
    title: 'Seguridad de Tipos de Punta a Punta',
    timebox: '0:45',
    goal: 'Hacer zoom out y mostrar la cadena de tipos desde el schema de DB hasta la UI.',
    onScreen: [
      'productSchema (Zod)  →  tipo Product',
      'createServerFn .inputValidator(productSchema)  → tipea el handler + la llamada del cliente',
      'createCollection({ schema: productSchema })    → tipea cada resultado de useLiveQuery',
      'useProductSearch → products: Product[]         → completamente tipado en JSX',
    ],
    say: [
      'Hagamos zoom out un momento para apreciar la historia de seguridad de tipos.',
      'Definimos un solo schema Zod — productSchema. Ese schema fluye en dos direcciones simultáneamente.',
      'Hacia arriba, en las Server Functions: inputValidator vincula el schema al handler Y al sitio de llamada del cliente. Si pasas una forma incorrecta, TypeScript falla en tiempo de compilación, no en runtime.',
      'Hacia abajo, en la Colección: el schema tipea cada fila devuelta por useLiveQuery. Los operadores del query builder, el tipo del resultado, el JSX que lo renderiza — todo inferido desde ese único schema.',
      'Sin anotaciones de tipo manuales en tus llamadas a fetch. Sin tipos any en los límites. Sin sorpresas en runtime.',
      'Esto es lo que "type-first" realmente significa en la práctica.',
    ],
    demoChecklist: [
      { id: 'open-schema', label: 'Abrir src/schemas/index.ts — mostrar productSchema' },
      { id: 'show-server-fn-types', label: 'En product.functions.ts — hover sobre el parámetro data del handler, mostrar tipo Product inferido' },
      { id: 'show-collection-types', label: 'En products.db.ts — hover sobre el genérico de createCollection, mostrar tipo Product' },
      { id: 'show-query-types', label: 'En useProductSearch.ts — hover sobre query.data, mostrar Product[]' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 11 — CONCLUSIONES + CIERRE  (11:15 – 12:00)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'takeaways',
    title: 'Conclusiones Clave',
    timebox: '0:45',
    goal: 'Dejar al espectador con un modelo mental memorable.',
    onScreen: [
      '1. useLiveQuery = SQL para tus componentes React — reactivo, composable, cero re-fetches',
      '2. Mutaciones = optimistic-first → UI instantánea → servidor en background → rollback automático si falla',
      '3. groupBy + count / avg / sum / min / max — agregados reactivos sin llamada extra al servidor',
      '4. SSR opcional: una línea (setQueryData) hidrata la colección desde el loader, sin fetch duplicado',
      '5. SyncMode: eager | on-demand | progressive — escala de 100 a 100.000+ filas',
      '6. Tipos de punta a punta: un schema Zod → Server Fn → Colección → JSX',
      '7. Funciona con cualquier backend — MongoDB, PostgreSQL, REST, lo que sea',
    ],
    say: [
      'Repasemos las siete cosas para llevarse de esta demo.',
      'useLiveQuery reemplaza useState, useEffect y la lógica de filtrado con una única query reactiva tipo SQL.',
      'Las mutaciones son optimistas por defecto — la UI se actualiza de inmediato, el servidor confirma en background, y si falla hace rollback sin ningún código extra.',
      'Los agregados con groupBy — count, avg, sum, min, max — te dan estadísticas reactivas en tiempo real sin ningún endpoint adicional.',
      'La integración SSR es una característica bonus que complementa muy bien con TanStack Start: una sola línea hidrata la colección desde el loader, sin duplicar la lógica de fetching.',
      'Y las novedades de v0.5: los modos de sincronización resuelven el problema de escala. Puedes pasar de eager a on-demand con una sola línea y parseLoadSubsetOptions hace el puente con tu API.',
      'La seguridad de tipos es de punta a punta y automática — un schema Zod fluye por todo el stack.',
      'Y TanStack DB es agnóstico al backend — MongoDB, PostgreSQL, REST, cualquier fuente.',
      'Si quieres explorar esta app tú mismo, todo el código que hemos visto está en este repositorio.',
      'Deja tus preguntas en los comentarios, y nos vemos en el próximo vídeo donde profundizamos en TanStack Router.',
    ],
    links: [
      { label: 'TanStack DB GitHub', href: 'https://github.com/TanStack/db' },
      { label: 'TanStack DB docs', href: 'https://tanstack.com/db/latest' },
      { label: 'queryCollectionOptions (adaptador Query DB)', href: 'https://tanstack.com/db/latest/docs/adapters/query-collection' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GUÍA DE TIEMPOS
// ─────────────────────────────────────────────────────────────────────────────
//  0:00 –  0:30  Gancho: El Problema
//  0:30 –  1:15  ¿Qué es TanStack DB?
//  1:15 –  2:00  El Stack de la App
//  2:00 –  4:00  Demo 1: useLiveQuery — Filtrado Reactivo Tipo SQL
//  4:00 –  5:30  Demo 2: Mutación Optimista — La UI no Espera al Servidor
//  5:30 –  7:00  Demo 3: Agregados con groupBy — Conteos de Categorías
//  7:00 –  8:30  Demo 4: Hidratación SSR — La Colección se Puebla sin Fetch Extra
//  8:30 –  9:30  Novedades v0.5 — Los Dos Problemas Resueltos
//  9:30 – 10:30  Modos de Sincronización: Eager / On Demand / Progresivo
// 10:30 – 11:15  Seguridad de Tipos de Punta a Punta
// 11:15 – 12:00  Conclusiones + Cierre
// ─────────────────────────────────────────────────────────────────────────────
