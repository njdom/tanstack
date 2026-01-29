export default function HeroHeading() {
  return (
    <div className="relative mb-12 p-8 rounded-3xl overflow-hidden bg-linear-to-br from-[#161b22] to-[#0d1217] border border-white/5">
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, #00a388 0%, transparent 70%)',
        }}
      ></div>
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">
          Shop <span className="text-[#00a388]">All</span>
        </h1>
        <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
          Uncompromising performance for the digital vanguard. Explore our curated selection of high-end hardware
          and peripherals.
        </p>
      </div>
    </div>
  );
}