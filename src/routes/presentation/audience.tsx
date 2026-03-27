import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import {
  tanstackDbDeckId,
  tanstackDbSlides,
  type PresentationSlide,
  type PresentationSlideImage,
  type PresentationTable,
} from '@/presentation/tanstackDbDeck';

type PresentationProgress = {
  activeSlideId: string;
};

function storageKey(suffix: string) {
  return `presentation.${tanstackDbDeckId}.${suffix}`;
}

function safeParseJSON<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getSlideIndexById(slides: PresentationSlide[], id: string) {
  const idx = slides.findIndex((s) => s.id === id);
  return idx === -1 ? 0 : idx;
}

export const Route = createFileRoute('/presentation/audience')({
  component: AudienceRoute,
});

function AudienceRoute() {
  const slides = tanstackDbSlides;
  const [activeSlideId, setActiveSlideId] = useState<string>(slides[0]?.id ?? 'hook');

  // Initial read + sync on storage events (multi-tab)
  useEffect(() => {
    const read = () => {
      const saved = safeParseJSON<PresentationProgress>(localStorage.getItem(storageKey('progress')));
      if (saved?.activeSlideId && slides.some((s) => s.id === saved.activeSlideId)) {
        setActiveSlideId(saved.activeSlideId);
      }
    };

    read();

    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey('progress')) return;
      read();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [slides]);

  // Navigate to a specific slide and persist to localStorage
  const goToSlide = (slideId: string) => {
    setActiveSlideId(slideId);
    localStorage.setItem(storageKey('progress'), JSON.stringify({ activeSlideId: slideId }));
  };

  // Keyboard navigation: ArrowRight = next, ArrowLeft = previous
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = getSlideIndexById(slides, activeSlideId);

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < slides.length - 1) {
          goToSlide(slides[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          goToSlide(slides[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides, activeSlideId]);

  const activeIndex = useMemo(() => getSlideIndexById(slides, activeSlideId), [slides, activeSlideId]);
  const slide = slides[activeIndex] ?? slides[0];

  return (
    <div
      className="min-h-screen text-white flex"
      style={{
        background: '#0d1217',
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 py-10 flex flex-col">
        <header className="flex items-baseline justify-between gap-6">
          <div className="min-w-0">
            {/* <div className="text-xs uppercase tracking-[0.25em] text-white/60 truncate">{tanstackStartDeckTitle}</div> */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-2">{slide?.title ?? '—'}</h1>
          </div>
          {/* <div className="text-sm text-white/60 whitespace-nowrap">
            {activeIndex + 1} / {slides.length}
          </div> */}
        </header>

        <main className="flex-1 mt-10 space-y-8">
          {slide?.image ? <AudienceSlideImage image={slide.image} /> : null}

          {slide?.onScreen?.length ? (
            <ul className="space-y-6">
              {slide.onScreen.map((line, idx) => (
                <li key={idx} className="flex gap-5 items-start">
                  <span className="mt-4 size-3 rounded-full bg-[#00a388] shrink-0" />
                  <span className="text-2xl md:text-3xl leading-snug text-white/95">{line}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {slide?.table ? <ComparisonTable table={slide.table} /> : null}

          {!slide?.onScreen?.length && !slide?.table && !slide?.image ? (
            <div className="glass-panel border border-white/10 rounded-2xl p-10">
              <div className="text-white/70 text-xl">No content for this slide.</div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function AudienceSlideImage({ image }: { image: PresentationSlideImage }) {
  return (
    <div className="space-y-3">
      {image.sectionTitle ? (
        <p className="text-sm uppercase tracking-[0.2em] text-white/55">{image.sectionTitle}</p>
      ) : null}
      <div className="rounded-2xl border border-white/10 bg-black/25 overflow-hidden">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-auto object-contain max-h-[min(520px,55vh)] mx-auto"
        loading="lazy"
      />
      {image.caption ? (
        <p className="px-6 py-4 text-lg md:text-xl text-white/70 border-t border-white/10">{image.caption}</p>
      ) : null}
      </div>
    </div>
  );
}

function ComparisonTable({ table }: { table: PresentationTable }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 glass-panel">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-white/20">
            {table.headers.map((header, idx) => (
              <th
                key={idx}
                className={[
                  'px-5 py-4 text-left text-base font-bold uppercase tracking-wider',
                  idx === 0 ? 'text-white/70 w-[180px]' : '',
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
              <td className="px-5 py-3 text-white/80 font-semibold border-b border-white/10">{row.aspect}</td>
              <td className="px-5 py-3 text-[#7cf0df] border-b border-white/10">{row.start}</td>
              <td className="px-5 py-3 text-white/50 border-b border-white/10">{row.next}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
