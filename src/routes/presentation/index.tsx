import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  tanstackStartDeckId,
  tanstackStartDeckTitle,
  tanstackStartSlides,
  type PresentationChecklistItem,
  type PresentationSlide,
  type PresentationTable,
} from '@/presentation/tanstackStartDeck';

type PresentationProgress = {
  activeSlideId: string;
  showNotes: boolean;
  checkedBySlideId: Record<string, Record<string, boolean>>;
};

function storageKey(suffix: string) {
  return `presentation.${tanstackStartDeckId}.${suffix}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getSlideIndexById(slides: PresentationSlide[], id: string) {
  const idx = slides.findIndex((s) => s.id === id);
  return idx === -1 ? 0 : idx;
}

function getDefaultProgress(): PresentationProgress {
  return {
    activeSlideId: tanstackStartSlides[0]?.id ?? 'title',
    showNotes: true,
    checkedBySlideId: {},
  };
}

function safeParseJSON<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export const Route = createFileRoute('/presentation/')({
  component: PresentationRoute,
});

function PresentationRoute() {
  const slides = tanstackStartSlides;

  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState<PresentationProgress>(getDefaultProgress);

  // Load persisted state
  useEffect(() => {
    const saved = safeParseJSON<PresentationProgress>(localStorage.getItem(storageKey('progress')));
    if (!saved) return;

    // Basic shape guard + slide id validation
    const slideExists = slides.some((s) => s.id === saved.activeSlideId);
    setProgress({
      activeSlideId: slideExists ? saved.activeSlideId : getDefaultProgress().activeSlideId,
      showNotes: typeof saved.showNotes === 'boolean' ? saved.showNotes : true,
      checkedBySlideId: saved.checkedBySlideId ?? {},
    });
  }, [slides]);

  // Persist state
  useEffect(() => {
    localStorage.setItem(storageKey('progress'), JSON.stringify(progress));
  }, [progress]);

  const filteredSlides = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return slides;

    return slides.filter((s) => {
      const haystack = [
        s.title,
        s.goal,
        ...(s.onScreen ?? []),
        ...(s.say ?? []),
        ...(s.demoChecklist?.map((i) => i.label) ?? []),
      ]
        .filter(Boolean)
        .join('\n')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, slides]);

  const activeIndex = useMemo(() => getSlideIndexById(slides, progress.activeSlideId), [slides, progress.activeSlideId]);
  const activeSlide = slides[activeIndex] ?? slides[0];

  const totalChecklist = useMemo(() => {
    let total = 0;
    let done = 0;
    for (const s of slides) {
      for (const item of s.demoChecklist ?? []) {
        total += 1;
        if (progress.checkedBySlideId[s.id]?.[item.id]) done += 1;
      }
    }
    return { total, done };
  }, [slides, progress.checkedBySlideId]);

  const progressPercent = totalChecklist.total === 0 ? 0 : Math.round((totalChecklist.done / totalChecklist.total) * 100);

  const goToIndex = (idx: number) => {
    const next = slides[clamp(idx, 0, slides.length - 1)];
    if (!next) return;
    setProgress((p) => ({ ...p, activeSlideId: next.id }));
  };

  const goPrev = () => goToIndex(activeIndex - 1);
  const goNext = () => goToIndex(activeIndex + 1);

  const toggleNotes = () => setProgress((p) => ({ ...p, showNotes: !p.showNotes }));

  const reset = () => {
    localStorage.removeItem(storageKey('progress'));
    setQuery('');
    setProgress(getDefaultProgress());
  };

  // Keyboard shortcuts
  const helpRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        (target?.getAttribute('contenteditable') ?? 'false') === 'true';
      if (isTyping) return;

      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'p') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n' || e.key === ' ') {
        e.preventDefault();
        goNext();
      }
      if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        goPrev();
      }
      if (e.key.toLowerCase() === 'j') {
        e.preventDefault();
        goNext();
      }
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleNotes();
      }
      if (e.key === '?') {
        e.preventDefault();
        helpRef.current?.showModal();
      }
      if (e.key === 'Escape') {
        helpRef.current?.open && helpRef.current?.close();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const setChecklistItem = (slideId: string, itemId: string, value: boolean) => {
    setProgress((p) => ({
      ...p,
      checkedBySlideId: {
        ...p.checkedBySlideId,
        [slideId]: {
          ...(p.checkedBySlideId[slideId] ?? {}),
          [itemId]: value,
        },
      },
    }));
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage:
          'radial-gradient(60% 60% at 20% 30%, rgba(0,163,136,0.20) 0%, rgba(13,18,23,0.92) 55%, rgba(0,0,0,1) 100%)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] min-h-screen">
        {/* Sidebar */}
        <aside className="glass-panel border-r border-white/10 lg:sticky lg:top-0 lg:h-screen">
          <div className="p-5 border-b border-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                {/* <div className="text-xs uppercase t racking-[0.2em] text-white/60">Presenter Aid</div> */}
                <h1 className="text-lg font-bold leading-tight">{tanstackStartDeckTitle}</h1>
              </div>
              <button
                className="shrink-0 text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10"
                onClick={reset}
                title="Reset saved progress"
                type="button"
              >
                Reset
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search slides…"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00a388]/40"
                type="text"
              />
              <button
                className="text-xs px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10"
                onClick={() => helpRef.current?.showModal()}
                type="button"
                title="Shortcuts"
              >
                ?
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-white/70">
              <div>
                Slide <span className="text-white font-semibold">{activeIndex + 1}</span> / {slides.length}
              </div>
              <div>
                Checklist: <span className="text-white font-semibold">{progressPercent}%</span>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="/presentation/audience"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full text-xs px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10"
                title="Open audience view in new tab"
              >
                Open Audience View
              </a>
            </div>
          </div>

          <nav className="p-3 overflow-auto custom-scrollbar lg:h-[calc(100vh-140px)]">
            <div className="space-y-1">
              {filteredSlides.map((s) => {
                const isActive = s.id === progress.activeSlideId;
                const slideChecklist = s.demoChecklist ?? [];
                const doneCount = slideChecklist.reduce((acc, item) => acc + (progress.checkedBySlideId[s.id]?.[item.id] ? 1 : 0), 0);
                const badge =
                  slideChecklist.length > 0 ? (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/80">
                      {doneCount}/{slideChecklist.length}
                    </span>
                  ) : null;

                return (
                  <button
                    key={s.id}
                    onClick={() => setProgress((p) => ({ ...p, activeSlideId: s.id }))}
                    className={[
                      'w-full text-left px-3 py-2 rounded-lg border transition-colors',
                      isActive
                        ? 'bg-[#00a388]/15 border-[#00a388]/35'
                        : 'bg-white/0 hover:bg-white/5 border-white/0 hover:border-white/10',
                    ].join(' ')}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold truncate">{s.title}</div>
                      {badge}
                    </div>
                    <div className="mt-0.5 text-xs text-white/60 line-clamp-2">
                      {s.goal ?? (s.onScreen?.[0] ?? '')}
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main */}
        <main className="p-5 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  {activeSlide.timebox ? `Timebox: ${activeSlide.timebox}` : 'Timebox: —'}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">{activeSlide.title}</h2>
                {activeSlide.goal && <p className="text-white/70 mt-2">{activeSlide.goal}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-semibold"
                  type="button"
                >
                  Prev
                </button>
                <button
                  onClick={goNext}
                  className="px-4 py-2 rounded-lg bg-[#00a388] hover:bg-[#00a388]/90 border border-[#00a388]/40 text-sm font-semibold"
                  type="button"
                >
                  Next
                </button>
                <button
                  onClick={toggleNotes}
                  className={[
                    'px-4 py-2 rounded-lg border text-sm font-semibold',
                    progress.showNotes ? 'bg-white/10 hover:bg-white/15 border-white/10' : 'bg-white/0 hover:bg-white/5 border-white/10',
                  ].join(' ')}
                  type="button"
                  title="Toggle speaker notes (T)"
                >
                  Notes: {progress.showNotes ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6">
              {activeSlide.onScreen?.length ? <Section title="On screen">{renderBullets(activeSlide.onScreen)}</Section> : null}

              {activeSlide.table ? (
                <Section title="Comparison table">
                  <ComparisonTable table={activeSlide.table} />
                </Section>
              ) : null}

              {activeSlide.demoChecklist?.length ? (
                <Section title="Demo checklist">
                  <Checklist
                    items={activeSlide.demoChecklist}
                    checked={progress.checkedBySlideId[activeSlide.id] ?? {}}
                    onChange={(itemId, value) => setChecklistItem(activeSlide.id, itemId, value)}
                  />
                </Section>
              ) : null}

              {progress.showNotes && activeSlide.say?.length ? (
                <Section title="Speaker notes">{renderNotes(activeSlide.say)}</Section>
              ) : null}

              {activeSlide.links?.length ? (
                <Section title="References">
                  <ul className="space-y-2">
                    {activeSlide.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#7cf0df] hover:underline break-all"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : null}
            </div>

            <div className="mt-10 text-xs text-white/50">
              Shortcuts: <span className="text-white/70">←/→</span>, <span className="text-white/70">J/K</span>,{' '}
              <span className="text-white/70">N/P</span>, <span className="text-white/70">Space</span>,{' '}
              <span className="text-white/70">T</span> notes, <span className="text-white/70">?</span> help
            </div>
          </div>
        </main>
      </div>

      <dialog
        ref={(el) => {
          helpRef.current = el;
        }}
        className="backdrop:bg-black/70 bg-[#0d1217] text-white border border-white/10 rounded-xl p-0 w-[min(720px,calc(100vw-24px))]"
      >
        <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Help</div>
            <div className="text-xl font-bold">Keyboard shortcuts</div>
          </div>
          <button
            className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10"
            onClick={() => helpRef.current?.close()}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Shortcut k="→ / N / Space / J" v="Next slide" />
            <Shortcut k="← / P / K" v="Previous slide" />
            <Shortcut k="T" v="Toggle speaker notes" />
            <Shortcut k="?" v="Open this help" />
            <Shortcut k="Esc" v="Close help" />
          </div>
          <div className="mt-6 text-xs text-white/60">
            Progress is saved automatically in <span className="text-white/80">localStorage</span>.
          </div>
        </div>
      </dialog>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-panel rounded-xl border border-white/10 p-5">
      <div className="text-xs uppercase tracking-[0.2em] text-white/60">{title}</div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function renderBullets(lines: string[]) {
  return (
    <ul className="space-y-2">
      {lines.map((line, idx) => (
        <li key={idx} className="flex gap-3">
          <span className="mt-2 size-1.5 rounded-full bg-[#00a388]" />
          <span className="text-white/90">{line}</span>
        </li>
      ))}
    </ul>
  );
}

function renderNotes(lines: string[]) {
  return (
    <div className="space-y-3">
      {lines.map((line, idx) => (
        <p key={idx} className="text-white/85 leading-relaxed">
          {line}
        </p>
      ))}
    </div>
  );
}

function Checklist({
  items,
  checked,
  onChange,
}: {
  items: PresentationChecklistItem[];
  checked: Record<string, boolean>;
  onChange: (itemId: string, value: boolean) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isChecked = !!checked[item.id];
        return (
          <label
            key={item.id}
            className={[
              'flex items-start gap-3 rounded-lg border px-3 py-2 cursor-pointer transition-colors',
              isChecked ? 'bg-[#00a388]/10 border-[#00a388]/30' : 'bg-white/0 hover:bg-white/5 border-white/10',
            ].join(' ')}
          >
            <input
              checked={isChecked}
              onChange={(e) => onChange(item.id, e.target.checked)}
              type="checkbox"
              className="mt-1 accent-[#00a388]"
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white/95">{item.label}</div>
              {item.hint && <div className="text-xs text-white/60 mt-0.5">{item.hint}</div>}
            </div>
          </label>
        );
      })}
    </div>
  );
}

function Shortcut({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
      <div className="font-mono text-xs text-white/90">{k}</div>
      <div className="text-white/70">{v}</div>
    </div>
  );
}

function ComparisonTable({ table }: { table: PresentationTable }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/20">
            {table.headers.map((header, idx) => (
              <th
                key={idx}
                className={[
                  'px-3 py-2 text-left text-xs font-bold uppercase tracking-wider',
                  idx === 0 ? 'text-white/70 w-[140px]' : '',
                  idx === 1 ? 'text-[#00a388]' : '',
                  idx === 2 ? 'text-white/50' : '',
                ].join(' ')}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
              <td className="px-3 py-2 text-white/80 font-medium border-b border-white/10">{row.aspect}</td>
              <td className="px-3 py-2 text-[#7cf0df] border-b border-white/10">{row.start}</td>
              <td className="px-3 py-2 text-white/50 border-b border-white/10">{row.next}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

