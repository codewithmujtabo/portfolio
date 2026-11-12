const items = ['Full-Stack Development', 'Web Applications', 'Landing Pages', 'Interactive UI', 'Hackathon Winner', 'APIs & Databases'];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    // overflow wrapper: the rotated, w-max track is far wider than the screen
    <div className="relative z-10 overflow-hidden py-10">
    <div className="relative -mx-[5%] w-[110%] -rotate-2 border-y border-crimson/60 bg-crimson py-5 shadow-[0_0_80px_-10px_rgba(139,37,59,0.7)]">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-bold uppercase tracking-tight md:text-4xl" aria-hidden={i >= items.length}>
            {t}
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-bone/80" aria-hidden>
              <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
    </div>
  );
}
