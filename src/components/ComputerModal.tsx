import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { Computer } from "@/data/computers";

interface Props {
  computer: Computer | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ComputerModal({ computer, onClose, onPrev, onNext }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (computer) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [computer]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  if (!computer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: visible ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${computer.color}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-card/92 backdrop-blur-sm pointer-events-none" />

        {/* Accent line top */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${computer.accentColor}, transparent)` }}
        />

        <div className="relative p-7">
          {/* Close + nav */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                title="← Предыдущий"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={onNext}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                title="→ Следующий"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
              <span className="mono text-xs text-muted-foreground/50 ml-1">← → клавиши</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all hover:rotate-90 duration-300"
            >
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Header */}
          <div className="flex items-start gap-5 mb-6">
            <div
              className="text-6xl flex-shrink-0 animate-float"
              style={{ filter: `drop-shadow(0 0 16px ${computer.accentColor}60)` }}
            >
              {computer.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="mono text-sm mb-1" style={{ color: `${computer.accentColor}` }}>
                {computer.country} · {computer.year}
              </div>
              <h2 className="font-oswald text-4xl font-bold text-foreground leading-none mb-2">
                {computer.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground mono">
                  {computer.era}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground mono">
                  <Icon name="User" size={11} />
                  {computer.creator}
                </span>
              </div>
            </div>
          </div>

          {/* Significance */}
          <div
            className="text-sm px-4 py-3 rounded-xl mb-5 border font-medium"
            style={{
              background: `${computer.accentColor}12`,
              borderColor: `${computer.accentColor}30`,
              color: computer.accentColor,
            }}
          >
            ✦ {computer.significance}
          </div>

          {/* Full Story */}
          <div className="mb-6">
            <div className="mono text-xs text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-4 h-px" style={{ background: computer.accentColor }} />
              История
            </div>
            <p className="text-foreground/80 leading-relaxed text-sm">
              {computer.fullStory}
            </p>
          </div>

          {/* Specs */}
          <div className="mb-6">
            <div className="mono text-xs text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-4 h-px" style={{ background: computer.accentColor }} />
              Характеристики
            </div>
            <div className="grid grid-cols-2 gap-2">
              {computer.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 border border-white/5 bg-white/[0.03]"
                  style={{
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: computer.accentColor, opacity: 0.7 }}
                  />
                  <span className="text-xs text-foreground/75 mono">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {computer.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border mono transition-transform hover:scale-105"
                style={{
                  background: `${computer.accentColor}10`,
                  borderColor: `${computer.accentColor}25`,
                  color: `${computer.accentColor}CC`,
                }}
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
