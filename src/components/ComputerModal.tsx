import Icon from "@/components/ui/icon";
import { Computer } from "@/data/computers";

interface Props {
  computer: Computer | null;
  onClose: () => void;
}

export default function ComputerModal({ computer, onClose }: Props) {
  if (!computer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${computer.color} animate-slide-up`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-card/90 backdrop-blur-sm" />

        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl animate-float">{computer.emoji}</div>
              <div>
                <div className="mono text-sm text-neon-cyan/70 mb-1">{computer.country} · {computer.year}</div>
                <h2 className="font-oswald text-4xl font-bold text-gradient-cyan">{computer.name}</h2>
                <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground mono">
                  {computer.era}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Description */}
          <p className="text-foreground/80 leading-relaxed mb-6 text-base">
            {computer.description}
          </p>

          {/* Specs */}
          <div className="mb-6">
            <div className="mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
              — Характеристики
            </div>
            <div className="grid grid-cols-2 gap-3">
              {computer.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/5"
                >
                  <div className="w-2 h-2 rounded-full bg-neon-cyan/60 flex-shrink-0 animate-pulse-glow" />
                  <span className="text-sm text-foreground/80 mono">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {computer.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan/80 mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
