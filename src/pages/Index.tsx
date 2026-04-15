import { useState, useMemo, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Timeline from "@/components/Timeline";
import ComputerCard from "@/components/ComputerCard";
import ComputerModal from "@/components/ComputerModal";
import { computers, eras } from "@/data/computers";

export default function Index() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState("Все");
  const [search, setSearch] = useState("");
  const [modalId, setModalId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const modalComputer = computers.find((c) => c.id === modalId) || null;

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

  return (
    <div className="min-h-screen bg-background grid-bg relative">
      {/* Ambient glow blobs */}
      <div className="fixed top-20 left-10 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none" />
      <div className="fixed bottom-40 right-10 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-neon-purple/[0.03] blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-sm sticky top-0 bg-background/80">
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

          <div className="flex items-center gap-2">
            <div className="relative">
              <Icon
                name="Search"
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Hero */}
        <div
          className={`text-center mb-16 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <div className="mono text-xs text-neon-cyan/60 uppercase tracking-widest mb-4 animate-fade-in-left">
            ∿ От вакуумных ламп до кремниевых чипов
          </div>
          <h1 className="font-oswald text-6xl md:text-8xl font-bold text-gradient-cyan mb-4 animate-slide-up">
            80 ЛЕТ
            <br />
            ПРОГРЕССА
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed animate-slide-up stagger-2">
            Интерактивная галерея ключевых машин, изменивших мир — от Z3 1941
            года до Apple Silicon
          </p>

          <div className="flex items-center justify-center gap-8 mt-8 animate-slide-up stagger-3">
            {[
              { val: computers.length, label: "компьютеров" },
              { val: "80+", label: "лет истории" },
              { val: "6", label: "эпох" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-oswald text-3xl text-neon-cyan">
                  {stat.val}
                </div>
                <div className="mono text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-neon-cyan to-neon-purple rounded-full" />
            <h2 className="font-oswald text-xl text-foreground">
              Временная шкала
            </h2>
            <div className="mono text-xs text-muted-foreground">
              — нажмите на точку
            </div>
          </div>
          <div className="bg-card/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <Timeline selectedId={selectedId} onSelect={handleTimelineSelect} />
          </div>
        </section>

        {/* Era filters */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setActiveEra(era)}
                className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 mono
                  ${
                    activeEra === era
                      ? "bg-neon-cyan/15 border-neon-cyan/40 text-neon-cyan"
                      : "bg-white/[0.03] border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
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
        <div className="mono text-xs text-muted-foreground mb-6">
          Показано {filtered.length} из {computers.length} экспонатов
        </div>

        {/* Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {filtered.map((computer, index) => (
            <div
              key={computer.id}
              onClick={() => handleCardClick(computer.id)}
            >
              <ComputerCard computer={computer} index={index} />
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <div className="font-oswald text-xl text-muted-foreground">
                Ничего не найдено
              </div>
              <div className="mono text-sm text-muted-foreground/60 mt-2">
                Попробуйте изменить запрос
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 pt-8 pb-6 text-center">
          <div className="font-oswald text-sm text-muted-foreground/50 mb-1">
            ХРОНИКИ ВЫЧИСЛЕНИЙ
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
        />
      )}
    </div>
  );
}
