import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Computer } from "@/data/computers";

interface Props {
  computer: Computer;
  index: number;
}

export default function ComputerCard({ computer, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`opacity-0-init animate-slide-up stagger-${Math.min(index + 1, 6)} card-hover relative rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br ${computer.color} border border-white/5 backdrop-blur-sm`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="absolute inset-0 bg-card/80" />
      
      <div className="relative p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{computer.emoji}</span>
            <div>
              <div className="mono text-xs text-muted-foreground mb-0.5">{computer.country} · {computer.year}</div>
              <h3 className="font-oswald text-xl font-semibold text-foreground leading-tight">{computer.name}</h3>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground mono whitespace-nowrap">
            {computer.era}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {computer.description}
        </p>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-white/5 pt-3 mb-3">
            <div className="text-xs text-muted-foreground mb-2 mono uppercase tracking-widest">Характеристики</div>
            <div className="grid grid-cols-2 gap-1.5">
              {computer.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/60 flex-shrink-0" />
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {computer.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neon-cyan/80 mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-1 text-xs text-neon-cyan/60 hover:text-neon-cyan transition-colors mt-2 mono">
          <Icon name={expanded ? "ChevronUp" : "ChevronDown"} size={14} />
          {expanded ? "Свернуть" : "Подробнее"}
        </button>
      </div>
    </div>
  );
}
