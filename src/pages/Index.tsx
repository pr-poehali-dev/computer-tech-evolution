import { useState, useMemo, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import Timeline from "@/components/Timeline";
import ComputerCard from "@/components/ComputerCard";
import ComputerModal from "@/components/ComputerModal";
import { computers, eras } from "@/data/computers";
import { useInView } from "@/hooks/useInView";

function AnimatedCounter({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.5);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}</span>;
}

export default function Index() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState("Все");
  const [search, setSearch] = useState("");
  const [modalId, setModalId] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return computers.filter((c) => {
      const matchEra = activeEra === "Все" || c.era === activeEra;
      const matchSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchEra && matchSearch;
    });
  }, [activeEra, search]);

  const currentIndex = computers.findIndex((c) => c.id === modalId);
  const modalComputer = currentIndex >= 0 ? computers[currentIndex] : null;

  const handlePrev = () => {
    const prev = (currentIndex - 1 + computers.length) % computers.length;
    setModalId(computers[prev].id);
    setSelectedId(computers[prev].id);
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % computers.length;
    setModalId(computers[next].id);
    setSelectedId(computers[next].id);
  };

  const handleTimelineSelect = (id: string) => {
    setSelectedId(id);
    setModalId(id);
    setActiveEra("Все");
    setSearch("");
  };

  const handleCardClick = (id: string) => {
    setModalId(id);
    setSelectedId(id);
  };

  const { ref: sectionRef, inView: sectionInView } = useInView();
  const { ref: filtersRef, inView: filtersInView } = useInView();

  return (
    <div className="min-h-screen bg-background grid-bg relative overflow-x-hidden">
      {/* Ambient orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 rounded-full bg-neon-cyan/[0.06] blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-40 right-10 w-80 h-80 rounded-full bg-neon-purple/[0.06] blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-neon-purple/[0.03] blur-3xl pointer-events-none" />

      {/* Header */}
      <header
        className="relative z-10 border-b border-white/5 backdrop-blur-sm sticky top-0 bg-background/80"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <Icon name="Cpu" size={16} className="text-background" />
            </div>
            <div>
              <div className="font-oswald text-lg font-bold text-foreground leading-none">
                ХРОНИКИ ВЫЧИСЛЕНИЙ
              </div>
              <div className="mono text-[10px] text-muted-foreground">
                История компьютеров
              </div>
            </div>
          </div>

          <div className="relative">
            <Icon
              name="Search"
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/40 mono w-48 transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">

        {/* Hero */}
        <div ref={heroRef} className="text-center mb-20">
          <div
            className="mono text-xs text-neon-cyan/60 uppercase tracking-[0.3em] mb-5"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            ∿ От вакуумных ламп до кремниевых чипов
          </div>

          <h1
            className="font-oswald text-7xl md:text-9xl font-bold mb-5 leading-none"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              background: "linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            80 ЛЕТ<br />ПРОГРЕССА
          </h1>

          <p
            className="text-muted-foreground max-w-lg mx-auto leading-relaxed text-base"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
            }}
          >
            Интерактивная галерея ключевых машин, изменивших мир — от Z3 1941 года до Apple Silicon
          </p>

          {/* Stats */}
          <div
            className="flex items-center justify-center gap-12 mt-10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
            }}
          >
            {[
              { to: computers.length, suffix: "", label: "компьютеров" },
              { to: 80, suffix: "+", label: "лет истории" },
              { to: 6, suffix: "", label: "эпох" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-oswald text-4xl text-neon-cyan">
                  <AnimatedCounter to={stat.to} />{stat.suffix}
                </div>
                <div className="mono text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <section
          ref={sectionRef}
          className="mb-12"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-neon-cyan to-neon-purple rounded-full" />
            <h2 className="font-oswald text-xl text-foreground">Временная шкала</h2>
            <div className="mono text-xs text-muted-foreground">— нажмите на точку</div>
          </div>
          <div className="bg-card/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <Timeline selectedId={selectedId} onSelect={handleTimelineSelect} />
          </div>
        </section>

        {/* Filters */}
        <section
          ref={filtersRef}
          className="mb-6"
          style={{
            opacity: filtersInView ? 1 : 0,
            transform: filtersInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          <div className="flex flex-wrap gap-2">
            {eras.map((era, i) => (
              <button
                key={era}
                onClick={() => setActiveEra(era)}
                style={{ transitionDelay: `${i * 30}ms` }}
                className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 mono
                  ${activeEra === era
                    ? "bg-neon-cyan/15 border-neon-cyan/40 text-neon-cyan scale-105"
                    : "bg-white/[0.03] border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground hover:scale-105"
                  }`}
              >
                {era}
                {activeEra === era && era !== "Все" && (
                  <span className="ml-2 text-xs opacity-60">
                    {computers.filter((c) => c.era === era).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Count */}
        <div className="mono text-xs text-muted-foreground mb-5 flex items-center gap-2">
          <Icon name="Grid3x3" size={12} />
          Показано {filtered.length} из {computers.length} экспонатов
          {search && (
            <button
              onClick={() => setSearch("")}
              className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-foreground/60 hover:text-foreground flex items-center gap-1"
            >
              <Icon name="X" size={10} /> очистить
            </button>
          )}
        </div>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {filtered.map((computer, index) => (
            <ComputerCard
              key={computer.id}
              computer={computer}
              index={index}
              onExpand={() => handleCardClick(computer.id)}
            />
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-24">
              <div className="text-5xl mb-4 animate-float">🔍</div>
              <div className="font-oswald text-2xl text-muted-foreground mb-2">Ничего не найдено</div>
              <div className="mono text-sm text-muted-foreground/50">Попробуйте изменить запрос</div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 pt-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <Icon name="Cpu" size={12} className="text-background" />
            </div>
            <div className="font-oswald text-sm text-muted-foreground/50">ХРОНИКИ ВЫЧИСЛЕНИЙ</div>
          </div>
          <div className="mono text-xs text-muted-foreground/30">
            История компьютерных технологий · 1941 — 2024
          </div>
        </footer>
      </main>

      {/* Modal */}
      {modalId && (
        <ComputerModal
          computer={modalComputer}
          onClose={() => setModalId(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
