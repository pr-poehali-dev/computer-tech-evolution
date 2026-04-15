import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Computer } from "@/data/computers";
import { useInView } from "@/hooks/useInView";

interface Props {
  computer: Computer;
  index: number;
  onExpand: () => void;
}

export default function ComputerCard({ computer, index, onExpand }: Props) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();

  const delay = (index % 6) * 80;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
      className={`relative rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br ${computer.color} border border-white/5`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onExpand}
    >
      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${computer.accentColor}40, 0 8px 40px ${computer.accentColor}20`,
        }}
      />

      <div className="absolute inset-0 bg-card/80" />

      <div className="relative p-5">
        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="text-3xl transition-transform duration-300"
              style={{ transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1)" }}
            >
              {computer.emoji}
            </div>
            <div>
              <div className="mono text-xs text-muted-foreground mb-0.5">
                {computer.country} · {computer.year}
              </div>
              <h3 className="font-oswald text-xl font-semibold text-foreground leading-tight">
                {computer.name}
              </h3>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground mono whitespace-nowrap">
            {computer.era}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {computer.description}
        </p>

        {/* Significance badge */}
        <div
          className="text-xs px-3 py-1.5 rounded-lg mb-3 border transition-opacity duration-300"
          style={{
            background: `${computer.accentColor}10`,
            borderColor: `${computer.accentColor}25`,
            color: computer.accentColor,
          }}
        >
          ✦ {computer.significance}
        </div>

        {/* Creator */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mono mb-3">
          <Icon name="User" size={11} />
          {computer.creator}
        </div>

        {/* Expand hint */}
        <div
          className="flex items-center gap-1 text-xs mono transition-all duration-300"
          style={{ color: `${computer.accentColor}99` }}
        >
          <Icon name="Maximize2" size={11} />
          Нажмите для подробностей
        </div>
      </div>
    </div>
  );
}
